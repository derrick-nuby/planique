"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import { useProjects } from "../hooks/useProjects";
import type { GitHubProject } from "../types/project.types";
import { exportToCsv, exportToXlsx } from "@/lib/exportUtils";

export default function ProjectTable() {
  const { data: projects, isLoading, error } = useProjects();

  const columns = useMemo<MRT_ColumnDef<GitHubProject>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        size: 200,
      },
      {
        accessorKey: "shortDescription",
        header: "Description",
        size: 300,
        Cell: ({ cell }) => (
          <span className="text-sm text-gray-700">{cell.getValue<string>() || "-"}</span>
        ),
      },
      {
        accessorKey: "url",
        header: "URL",
        size: 250,
        Cell: ({ cell }) => (
          <a
            href={cell.getValue<string>()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm truncate block"
          >
            {cell.getValue<string>()}
          </a>
        ),
      },
      {
        accessorKey: "updatedAt",
        header: "Updated",
        size: 120,
        Cell: ({ cell }) => {
          const date = new Date(cell.getValue<string>());
          return <span className="text-sm text-gray-600">{date.toLocaleDateString()}</span>;
        },
        sortingFn: "datetime",
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: projects ?? [],
    enablePagination: true,
    enableColumnFilters: true,
    enableSorting: true,
    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 },
    },
    state: {
      isLoading,
      showAlertBanner: !!error,
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-8 bg-blue-600 rounded-none"></div>
          <span className="text-xl font-bold text-gray-800">GitHub Projects</span>
        </div>
        <span className="text-sm font-normal text-gray-500 bg-white px-3 py-1 border-2 border-gray-300 rounded-none">
          {projects?.length || 0} projects
        </span>
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="outline" size="sm" onClick={() => exportToCsv(table.getRowModel().rows.map(r => r.original), 'projects')}>
            Export CSV
          </Button>
          <Button variant="outline" size="sm" onClick={() => exportToXlsx(table.getRowModel().rows.map(r => r.original), 'projects')}>
            Export XLSX
          </Button>
        </div>
      </div>
    ),
  });

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error loading projects</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full mx-auto p-6">
      <Card className="rounded-none border-2 border-gray-300 shadow-lg">
        <CardContent className="p-0">
          <MantineReactTable table={table} />
        </CardContent>
      </Card>
    </div>
  );
}
