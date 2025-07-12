export interface GitHubRepo {
  id: number;
  name: string;
  private: boolean;
  description: string | null;
  html_url: string;
  language: string | null;
  created_at: string;
  updated_at: string;
}

export interface GitHubRepoDetails extends GitHubRepo {
  full_name: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  default_branch: string;
}
