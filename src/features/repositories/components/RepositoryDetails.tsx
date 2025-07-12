"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRepository } from "../hooks/useRepository";

interface Props {
  repoName: string;
}

export default function RepositoryDetails({ repoName }: Props) {
  const { data: repo, isLoading, error } = useRepository(repoName);

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error || !repo) {
    return <div className="p-6 text-red-600">Error loading repository</div>;
  }

  return (
    <div className="p-6">
      <Card className="rounded-none border-2 border-gray-300 shadow-lg">
        <CardHeader>
          <CardTitle>{repo.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>{repo.description || "No description"}</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span>
              <strong>Language:</strong> {repo.language || "Unknown"}
            </span>
            <span>
              <strong>Visibility:</strong> {repo.private ? "Private" : "Public"}
            </span>
            <span>
              <strong>Stars:</strong> {repo.stargazers_count}
            </span>
            <span>
              <strong>Forks:</strong> {repo.forks_count}
            </span>
            <span>
              <strong>Watchers:</strong> {repo.watchers_count}
            </span>
            <span>
              <strong>Open Issues:</strong> {repo.open_issues_count}
            </span>
            <span>
              <strong>Default Branch:</strong> {repo.default_branch}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
