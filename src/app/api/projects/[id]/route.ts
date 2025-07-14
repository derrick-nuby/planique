import { NextRequest, NextResponse } from 'next/server';
import {
  GitHubProjectDetails,
  ProjectItem,
  ProjectColumn,
  ProjectMilestone,
  ProjectMetrics,
} from '@/features/projects/types/project.types';

interface FieldValue {
  __typename: string;
  name?: string;
  text?: string;
  date?: string;
  field: { name: string };
  milestone?: {
    id: string;
    title: string;
    description: string | null;
    dueOn: string | null;
  };
}

interface ItemNode {
  id: string;
  content?: {
    __typename: string;
    title?: string;
    url?: string;
    state?: string;
    labels?: { nodes: { name: string }[] };
    assignees?: { nodes: { login: string }[] };
    createdAt?: string;
    closedAt?: string | null;
    mergedAt?: string | null;
  };
  fieldValues: { nodes: FieldValue[] };
}

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split('/').pop() ?? '';

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: 'GitHub token not configured' },
      { status: 500 }
    );
  }

  const query = {
    query: `query ($projectId: ID!) {
      node(id: $projectId) {
        ... on ProjectV2 {
          id
          title
          shortDescription
          url
          updatedAt
          items(first: 50) {
            nodes {
              id
              content {
                __typename
                ... on Issue {
                  id
                  title
                  url
                  state
                  labels(first: 10) { nodes { name } }
                  assignees(first: 10) { nodes { login } }
                  createdAt
                  closedAt
                }
                ... on PullRequest {
                  id
                  title
                  url
                  state
                  mergedAt
                  labels(first: 10) { nodes { name } }
                  assignees(first: 10) { nodes { login } }
                  createdAt
                  closedAt
                }
                ... on DraftIssue {
                  id
                  title
                  body
                }
              }
              fieldValues(first: 20) {
                nodes {
                  __typename
                  ... on ProjectV2ItemFieldTextValue {
                    text
                    field {
                      ... on ProjectV2FieldCommon {
                        name
                      }
                    }
                  }
                  ... on ProjectV2ItemFieldSingleSelectValue {
                    name
                    field {
                      ... on ProjectV2FieldCommon {
                        name
                      }
                    }
                  }
                  ... on ProjectV2ItemFieldDateValue {
                    date
                    field {
                      ... on ProjectV2FieldCommon {
                        name
                      }
                    }
                  }
                  ... on ProjectV2ItemFieldMilestoneValue {
                    milestone { id title description dueOn }
                    field {
                      ... on ProjectV2FieldCommon {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`,
    variables: { projectId: id },
  };

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(query),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    const errorText = await res.text();
    return NextResponse.json(
      { error: 'GitHub API error', details: errorText },
      { status: res.status }
    );
  }

  const data = await res.json();
  if (data.errors) {
    return NextResponse.json(
      { error: 'GitHub API error', details: data.errors },
      { status: 500 }
    );
  }

  const projectData = data.data.node;
  if (!projectData) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  const items: ProjectItem[] = [];
  const columnMap: Record<string, ProjectItem[]> = {};
  const milestoneMap: Record<string, ProjectMilestone> = {};

  for (const node of projectData.items.nodes as ItemNode[]) {
    if (!node.content) continue;
    const content = node.content;
    const item: ProjectItem = {
      id: node.id,
      title: content.title ?? 'Untitled',
      type: content.__typename,
      labels:
        'labels' in content && content.labels
          ? content.labels.nodes.map((n: { name: string }) => n.name)
          : [],
      assignee:
        'assignees' in content && content.assignees && content.assignees.nodes.length > 0
          ? content.assignees.nodes[0].login
          : null,
      createdAt: content.createdAt ?? new Date().toISOString(),
    };

    if ('closedAt' in content && content.closedAt) item.closedAt = content.closedAt;
    if ('mergedAt' in content && content.mergedAt) item.closedAt = content.mergedAt;

    let statusValue: string | null = null;
    for (const fv of node.fieldValues.nodes as FieldValue[]) {
      if (fv.__typename === 'ProjectV2ItemFieldDateValue' && fv.field.name.toLowerCase().includes('due')) {
        item.dueDate = fv.date;
      }
      if (fv.__typename === 'ProjectV2ItemFieldSingleSelectValue' && fv.field.name.toLowerCase().includes('status')) {
        statusValue = fv.name ?? null;
      }
      if (fv.__typename === 'ProjectV2ItemFieldMilestoneValue' && fv.milestone) {
        const m = milestoneMap[fv.milestone.id] || {
          id: fv.milestone.id,
          title: fv.milestone.title,
          description: fv.milestone.description,
          deadline: fv.milestone.dueOn,
          openIssues: 0,
          closedIssues: 0,
        };
        if (content.__typename === 'Issue') {
          if (content.state === 'OPEN') m.openIssues++;
          else m.closedIssues++;
        }
        milestoneMap[fv.milestone.id] = m;
      }
    }

    const column = statusValue || 'Uncategorized';
    if (!columnMap[column]) columnMap[column] = [];
    columnMap[column].push(item);
    items.push(item);
  }

  const columns: ProjectColumn[] = Object.entries(columnMap).map(([name, items]) => ({ name, items }));
  const milestones: ProjectMilestone[] = Object.values(milestoneMap);
  const metrics: ProjectMetrics = {
    totalIssues: items.length,
    completed: items.filter((i) => i.closedAt).length,
    pending: items.filter((i) => !i.closedAt).length,
    overdue: items.filter((i) => i.dueDate && new Date(i.dueDate) < new Date() && !i.closedAt).length,
    contributors: new Set(items.map((i) => i.assignee).filter(Boolean)).size,
  };

  const project: GitHubProjectDetails = {
    id: projectData.id,
    title: projectData.title,
    shortDescription: projectData.shortDescription,
    url: projectData.url,
    updatedAt: projectData.updatedAt,
    status: columns[0]?.name || 'Unknown',
    columns,
    milestones,
    metrics,
  };

  return NextResponse.json(project);
}
