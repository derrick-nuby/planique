export interface GitHubProject {
  id: string;
  title: string;
  shortDescription: string | null;
  url: string;
  updatedAt: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  type: string;
  labels: string[];
  assignee: string | null;
  dueDate?: string | null;
  createdAt: string;
  closedAt?: string | null;
}

export interface ProjectColumn {
  name: string;
  items: ProjectItem[];
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string | null;
  deadline: string | null;
  openIssues: number;
  closedIssues: number;
}

export interface ProjectMetrics {
  totalIssues: number;
  completed: number;
  pending: number;
  overdue: number;
  contributors: number;
}

export interface GitHubProjectDetails extends GitHubProject {
  status: string;
  columns: ProjectColumn[];
  milestones: ProjectMilestone[];
  metrics: ProjectMetrics;
}
