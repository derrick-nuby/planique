'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useRepositories } from '../hooks/useRepositories';
import { GitHubRepo } from '../types/repository.types';

export default function RepositoryTable() {
  const { data: repos, isLoading, error } = useRepositories();
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo<ColumnDef<GitHubRepo>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => (
          <a
            href={row.original.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {row.original.name}
          </a>
        ),
      },
      {
        accessorKey: 'description',
        header: 'Description',
        cell: (info) => info.getValue<string>() ?? '-',
      },
      {
        accessorKey: 'language',
        header: 'Language',
        cell: (info) => info.getValue<string>() ?? '-',
      },
      {
        accessorKey: 'private',
        header: 'Visibility',
        cell: (info) => (info.getValue<boolean>() ? 'Private' : 'Public'),
      },
    ],
    []
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading repositories</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Repositories</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="Search..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="mb-4"
        />
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer select-none"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() === 'asc'
                      ? ' \u2191'
                      : header.column.getIsSorted() === 'desc'
                        ? ' \u2193'
                        : ''}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>No results.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
