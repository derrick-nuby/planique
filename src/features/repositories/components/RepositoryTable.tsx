"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useRepositories } from "../hooks/useRepositories";
import type { GitHubRepo } from "../types/repository.types";

export default function RepositoryTable() {
  const { data: repos, isLoading, error } = useRepositories();
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo<ColumnDef<GitHubRepo>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Repository Name",
        cell: ({ row }) => (
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
        cell: (info) => (
          <span className="text-gray-700 text-sm leading-relaxed">
            {info.getValue<string>() ?? <span className="text-gray-400 italic">No description</span>}
          </span>
        ),
      },
      {
        accessorKey: "language",
        header: "Language",
        cell: (info) => {
          const language = info.getValue<string>();
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
            };
            return colors[lang || ""] || "bg-gray-100 text-gray-800 border-gray-200";
          };

          return language ? (
            <span className={`px-3 py-1 rounded-none text-xs font-medium border ${getLanguageColor(language)}`}>
              {language}
            </span>
          ) : (
            <span className="text-gray-400 italic text-sm">Unknown</span>
          );
        },
      },
      {
        accessorKey: "private",
        header: "Visibility",
        cell: (info) => {
          const isPrivate = info.getValue<boolean>();
          return (
            <span
              className={`px-3 py-1 rounded-none text-xs font-semibold border ${isPrivate ? "bg-red-50 text-red-700 border-red-200" : "bg-green-50 text-green-700 border-green-200"
                }`}
            >
              {isPrivate ? "Private" : "Public"}
            </span>
          );
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data: repos ?? [],
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _columnId, value) => {
      const search = String(value).toLowerCase();
      return (
        row.original.name.toLowerCase().includes(search) ||
        (row.original.description?.toLowerCase().includes(search) ?? false)
      );
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading repositories...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error loading repositories</div>
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      <Card className="rounded-none border-2 border-gray-300 shadow-lg">
        <CardHeader className="bg-gray-50 border-b-2 border-gray-300 rounded-none">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <div className="w-2 h-8 bg-blue-600 rounded-none"></div>
            GitHub Repositories
            <span className="ml-auto text-sm font-normal text-gray-500 bg-white px-3 py-1 border border-gray-300 rounded-none">
              {table.getFilteredRowModel().rows.length} repositories
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6">
            <Input
              placeholder="Search repositories by name or description..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="rounded-none border-2 border-gray-300 focus:border-blue-500 focus:ring-0 h-12 text-base px-4 bg-white"
            />
          </div>

          <div className="border-2 border-gray-300 rounded-none overflow-hidden">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="bg-gray-100 border-b-2 border-gray-300 hover:bg-gray-100">
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className="cursor-pointer select-none font-bold text-gray-800 h-14 px-6 border-r-2 border-gray-300 last:border-r-0 hover:bg-gray-200 transition-colors duration-150"
                      >
                        <div className="flex items-center gap-2">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          <span className="text-gray-500">
                            {header.column.getIsSorted() === "asc"
                              ? "↑"
                              : header.column.getIsSorted() === "desc"
                                ? "↓"
                                : "↕"}
                          </span>
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row, index) => (
                    <TableRow
                      key={row.id}
                      className={`border-b-2 border-gray-300 hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? "bg-white" : "bg-gray-25"
                        }`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="px-6 py-4 border-r-2 border-gray-300 last:border-r-0 align-top"
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow className="border-b-2 border-gray-300">
                    <TableCell
                      colSpan={columns.length}
                      className="text-center py-12 text-gray-500 text-lg border-r-2 border-gray-300 last:border-r-0"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="text-4xl">📁</div>
                        <div>No repositories found</div>
                        <div className="text-sm text-gray-400">Try adjusting your search criteria</div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
