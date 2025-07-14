"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import Image from "next/image";
import { useMemo } from "react";
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import { useUsers } from "../hooks/useUsers";
import type { GitHubUser } from "../types/user.types";
import { exportToCsv, exportToXlsx } from "@/lib/exportUtils";

export default function UserTable() {
  const { data: users, isLoading, error } = useUsers();

  const columns = useMemo<MRT_ColumnDef<GitHubUser>[]>(
    () => [
      {
        accessorKey: "avatar_url",
        header: "",
        size: 60,
        Cell: ({ cell }) => (
          <Avatar className="h-8 w-8">
            <Image src={cell.getValue<string>()} alt="avatar" width={32} height={32} className="rounded-full" />
          </Avatar>
        ),
        enableSorting: false,
        enableColumnFilter: false,
      },
      {
        accessorKey: "login",
        header: "Username",
        size: 200,
        Cell: ({ row }) => (
          <a href={row.original.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
            {row.original.login}
          </a>
        ),
      },
      {
        accessorKey: "type",
        header: "Type",
        size: 120,
      },
      {
        accessorKey: "site_admin",
        header: "Admin",
        size: 80,
        Cell: ({ cell }) => (
          <span className="text-sm">{cell.getValue<boolean>() ? "Yes" : "No"}</span>
        ),
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: users ?? [],
    enablePagination: true,
    enableSorting: true,
    initialState: { pagination: { pageSize: 10, pageIndex: 0 } },
    state: { isLoading, showAlertBanner: !!error },
    renderTopToolbarCustomActions: ({ table }) => (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-8 bg-blue-600 rounded-none"></div>
          <span className="text-xl font-bold text-gray-800">Organization Users</span>
        </div>
        <span className="text-sm font-normal text-gray-500 bg-white px-3 py-1 border-2 border-gray-300 rounded-none">
          {users?.length || 0} users
        </span>
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="outline" size="sm" onClick={() => exportToCsv(table.getRowModel().rows.map(r => r.original), 'users')}>
            Export CSV
          </Button>
          <Button variant="outline" size="sm" onClick={() => exportToXlsx(table.getRowModel().rows.map(r => r.original), 'users')}>
            Export XLSX
          </Button>
        </div>
      </div>
    ),
  });

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-600">Error loading users</div>
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
