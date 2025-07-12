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
