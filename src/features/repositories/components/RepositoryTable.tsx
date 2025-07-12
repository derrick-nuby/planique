"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useMemo } from "react";
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import { useRepositories } from "../hooks/useRepositories";
import type { GitHubRepo } from "../types/repository.types";

export default function RepositoryTable() {
  const { data: repos, isLoading, error } = useRepositories();

  const getLanguageColor = (lang: string | null) => {
    const colors: Record<string, string> = {
      TypeScript: "bg-blue-100 text-blue-800 border-blue-200",
      JavaScript: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Python: "bg-green-100 text-green-800 border-green-200",
      Dart: "bg-cyan-100 text-cyan-800 border-cyan-200",
      Rust: "bg-orange-100 text-orange-800 border-orange-200",
      Vue: "bg-emerald-100 text-emerald-800 border-emerald-200",
      Go: "bg-indigo-100 text-indigo-800 border-indigo-200",
      CSS: "bg-pink-100 text-pink-800 border-pink-200",
      Solidity: "bg-purple-100 text-purple-800 border-purple-200",
    };
    return colors[lang || ""] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const columns = useMemo<MRT_ColumnDef<GitHubRepo>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Repository Name",
        size: 250,
        Cell: ({ row }) => (
          <a
            href={row.original.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-700 hover:text-blue-900 hover:underline transition-colors duration-200"
          >
            {row.original.name}
          </a>
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 400,
        Cell: ({ cell }) => (
          <span className="text-gray-700 text-sm leading-relaxed">
            {cell.getValue<string>() ?? <span className="text-gray-400 italic">No description</span>}
          </span>
        ),
      },
      {
        accessorKey: "language",
        header: "Language",
        size: 150,
        Cell: ({ cell }) => {
          const language = cell.getValue<string>();
          return language ? (
            <span className={`px-3 py-1 rounded-none text-xs font-medium border ${getLanguageColor(language)}`}>
              {language}
            </span>
          ) : (
            <span className="text-gray-400 italic text-sm">Unknown</span>
          );
        },
        filterVariant: "select",
        mantineFilterSelectProps: {
          data: [
            { value: "TypeScript", label: "TypeScript" },
            { value: "JavaScript", label: "JavaScript" },
            { value: "Python", label: "Python" },
            { value: "Dart", label: "Dart" },
            { value: "Rust", label: "Rust" },
            { value: "Vue", label: "Vue" },
            { value: "Go", label: "Go" },
            { value: "CSS", label: "CSS" },
            { value: "Solidity", label: "Solidity" },
          ],
        },
      },
      {
        accessorKey: "private",
        header: "Visibility",
        size: 120,
        Cell: ({ cell }) => {
          const isPrivate = cell.getValue<boolean>();
          return (
            <span
              className={`px-3 py-1 rounded-none text-xs font-semibold border ${isPrivate ? "bg-red-50 text-red-700 border-red-200" : "bg-green-50 text-green-700 border-green-200"
                }`}
            >
              {isPrivate ? "Private" : "Public"}
            </span>
          );
        },
        filterVariant: "select",
        mantineFilterSelectProps: {
          data: [
            { value: "true", label: "Private" },
            { value: "false", label: "Public" },
          ],
        },
        // For export, show the actual text value instead of the component
        accessorFn: (row) => (row.private ? "Private" : "Public"),
      },
      {
        accessorKey: "html_url",
        header: "Repository URL",
        size: 300,
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
        accessorKey: "created_at",
        header: "Created",
        size: 120,
        Cell: ({ cell }) => {
          const date = new Date(cell.getValue<string>());
          return <span className="text-sm text-gray-600">{date.toLocaleDateString()}</span>;
        },
        filterVariant: "date-range",
        sortingFn: "datetime",
      },
      {
        accessorKey: "updated_at",
        header: "Last Updated",
        size: 120,
        Cell: ({ cell }) => {
          const date = new Date(cell.getValue<string>());
          return <span className="text-sm text-gray-600">{date.toLocaleDateString()}</span>;
        },
        filterVariant: "date-range",
        sortingFn: "datetime",
      },
    ],
    [],
  );

  const table = useMantineReactTable({
    columns,
    data: repos ?? [],
    enableColumnFilters: true,
    enableGlobalFilter: true,
    enableSorting: true,
    enablePagination: true,
    enableRowSelection: true,
    enableColumnResizing: true,
    enableDensityToggle: true,
    enableFullScreenToggle: true,
    enableHiding: true,
    // Export functionality can be implemented using custom actions
    // Remove unsupported export properties
    enableRowActions: true,
    renderRowActionMenuItems: () => [
      // You can implement custom export actions here if needed
      // For example using export-to-csv or other libraries
    ],
    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 },
      density: "md",
      columnVisibility: { description: false },
    },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    mantineTopToolbarProps: {
      style: {
        backgroundColor: "#f9fafb",
        borderBottom: "2px solid #d1d5db",
        borderRadius: "0",
      },
    },
    mantineBottomToolbarProps: {
      style: {
        backgroundColor: "#f9fafb",
        borderTop: "2px solid #d1d5db",
        borderRadius: "0",
      },
    },
    mantineTableProps: {
      style: {
        border: "2px solid #d1d5db",
        borderRadius: "0",
      },
    },
    mantineTableHeadProps: {
      style: {
        backgroundColor: "#f3f4f6",
        borderBottom: "2px solid #d1d5db",
      },
    },
    mantineTableHeadCellProps: {
      style: {
        borderRight: "2px solid #d1d5db",
        fontWeight: "bold",
        color: "#374151",
        fontSize: "14px",
        padding: "16px",
      },
    },
    mantineTableBodyProps: {
      style: {
        backgroundColor: "#ffffff",
      },
    },
    mantineTableBodyCellProps: ({ row }) => ({
      style: {
        borderRight: "2px solid #d1d5db",
        borderBottom: "1px solid #e5e7eb",
        padding: "12px 16px",
        backgroundColor: row.index % 2 === 0 ? "#ffffff" : "#f9fafb",
      },
    }),
    mantineTableBodyRowProps: {
      sx: {
        '&:hover': {
          backgroundColor: "#f3f4f6",
        },
      },
    },
    mantinePaginationProps: {
      style: {
        border: "2px solid #d1d5db",
        borderRadius: "0",
        backgroundColor: "#f9fafb",
      },
    },
    state: {
      isLoading,
      showAlertBanner: !!error,
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-8 bg-blue-600 rounded-none"></div>
          <span className="text-xl font-bold text-gray-800">GitHub Repositories</span>
        </div>
        <span className="text-sm font-normal text-gray-500 bg-white px-3 py-1 border-2 border-gray-300 rounded-none">
          {repos?.length || 0} repositories
        </span>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-gray-500">
            {table.getSelectedRowModel().rows.length > 0 && `${table.getSelectedRowModel().rows.length} selected`}
          </span>
        </div>
      </div>
    ),
  });

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error loading repositories</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full mx-auto p-6">
      <Card className="rounded-none border-2 border-gray-300 shadow-lg">
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <MantineReactTable table={table} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
