import { NextRequest, NextResponse } from 'next/server';
import { GitHubProjectDetails } from '@/features/projects/types/project.types';

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split('/').pop() ?? '';

  // TODO: Replace with real GitHub API call
  const sample: GitHubProjectDetails = {
    id,
    title: 'Sample Project',
    shortDescription: 'Demo project details',
    url: 'https://github.com',
    updatedAt: new Date().toISOString(),
    status: 'active',
    columns: [
      { name: 'To Do', items: [] },
      { name: 'In Progress', items: [] },
      { name: 'Done', items: [] },
    ],
    milestones: [],
    metrics: {
      totalIssues: 0,
      completed: 0,
      pending: 0,
      overdue: 0,
      contributors: 0,
    },
  };

  return NextResponse.json(sample);
}
