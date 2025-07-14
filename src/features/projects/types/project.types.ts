export interface GitHubProject {
  id: number;
  name: string;
  body: string | null;
  html_url: string;
  state: string;
  created_at: string;
  updated_at: string;
}
