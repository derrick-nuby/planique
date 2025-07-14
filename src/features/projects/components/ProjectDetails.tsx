"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { exportToPdf, exportToXlsx } from "@/lib/exportUtils";
import { useProject } from "../hooks/useProject";

interface Props {
  projectId: string;
}

export default function ProjectDetails({ projectId }: Props) {
  const { data: project, isLoading, error } = useProject(projectId);

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error || !project) return <div className="p-6 text-red-600">Error loading project</div>;

  return (
    <div className="p-6 space-y-4">
      <Card className="rounded-none border-2 border-gray-300 shadow-lg">
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>{project.shortDescription || "No description"}</p>
          <div className="text-sm text-gray-600">Status: {project.status}</div>
          <div className="text-sm text-gray-600">Last updated: {new Date(project.updatedAt).toLocaleDateString()}</div>
        </CardContent>
      </Card>

      <Card className="rounded-none border-2 border-gray-300 shadow-lg">
        <CardHeader>
          <CardTitle>Columns</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {project.columns.map(column => (
            <div key={column.name} className="space-y-2">
              <h3 className="font-semibold">{column.name}</h3>
              <ul className="list-disc ml-4 space-y-1">
                {column.items.map(item => (
                  <li key={item.id} className="text-sm">
                    {item.title} - {item.type}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => exportToXlsx([project], "project")}>Export Excel</Button>
        <Button variant="outline" size="sm" onClick={() => exportToPdf(project, "project")}>Export PDF</Button>
      </div>
    </div>
  );
}
