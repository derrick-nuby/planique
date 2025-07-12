export interface GitHubProject {
  id: number;
  name: string;
  body: string | null;
  state: string;
  html_url: string;
  created_at: string;
  updated_at: string;
}
