"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserContributions } from "../hooks/useUserContributions";
import type { RepoContribution, ContributionDay } from "../types/contributions.types";
import { exportToCsv, exportToXlsx, exportToPdf } from "@/lib/exportUtils";

interface Props {
  username: string;
}

export default function UserContributions({ username }: Props) {
  const [range, setRange] = useState<string>("7");
  const [customFrom, setCustomFrom] = useState<string>("");
  const [customTo, setCustomTo] = useState<string>("");

  const now = new Date();
  const fromDate = (() => {
    if (range === "custom" && customFrom) return new Date(customFrom);
    if (range === "30") return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  })();
  const toDate = range === "custom" && customTo ? new Date(customTo) : now;

  const fromIso = fromDate.toISOString();
  const toIso = toDate.toISOString();

  const { data, isLoading, error } = useUserContributions(username, fromIso, toIso);

  const commits = data?.contributionsCollection.commitContributionsByRepository ?? [];
  const columns = [
    {
      accessorKey: "repository.name",
      header: "Repository",
      Cell: ({ row }: { row: { original: RepoContribution } }) => (
        <Link href={row.original.repository.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
          {row.original.repository.name}
        </Link>
      ),
    },
    {
      accessorKey: "contributions.totalCount",
      header: "Commits",
    },
  ] as MRT_ColumnDef<RepoContribution>[];

  const table = useMantineReactTable({
    columns,
    data: commits,
    state: { isLoading, showAlertBanner: !!error },
    enablePagination: true,
    initialState: { pagination: { pageSize: 10, pageIndex: 0 } },
    renderTopToolbarCustomActions: ({ table }) => (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="outline" size="sm" onClick={() => exportToCsv(table.getRowModel().rows.map(r => r.original), `contributions_${username}`)}>CSV</Button>
          <Button variant="outline" size="sm" onClick={() => exportToXlsx(table.getRowModel().rows.map(r => r.original), `contributions_${username}`)}>XLSX</Button>
          <Button variant="outline" size="sm" onClick={() => exportToPdf(table.getRowModel().rows.map(r => r.original), `contributions_${username}`)}>PDF</Button>
        </div>
      </div>
    ),
  });

  const issueCount = data?.contributionsCollection.issueContributions.totalCount ?? 0;
  const prCount = data?.contributionsCollection.pullRequestContributions.totalCount ?? 0;
  const reviewCount = data?.contributionsCollection.pullRequestReviewContributions.totalCount ?? 0;

  const timeline: ContributionDay[] = [];
  data?.contributionsCollection.contributionCalendar.weeks.forEach(w => {
    w.contributionDays.forEach(d => timeline.push(d));
  });

  const timelineColumns = [
    { accessorKey: "date", header: "Date" },
    { accessorKey: "contributionCount", header: "Commits" },
  ] as MRT_ColumnDef<ContributionDay>[];

  const timelineTable = useMantineReactTable({
    columns: timelineColumns,
    data: timeline,
    enablePagination: true,
    initialState: { pagination: { pageSize: 7, pageIndex: 0 } },
  });

  if (error) {
    return <div className="p-6 text-red-600">Error loading contributions</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        {data && (
          <Image src={data.avatarUrl} alt="avatar" width={48} height={48} className="rounded-full" />
        )}
        <Link href={data?.url || `https://github.com/${username}`} target="_blank" className="text-xl font-bold text-blue-600">
          {username}
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <select value={range} onChange={e => setRange(e.target.value)} className="w-40 border rounded-md p-2 text-sm">
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="custom">Custom</option>
        </select>
        {range === "custom" && (
          <div className="flex items-center gap-2">
            <Input type="date" value={customFrom} onChange={e => setCustomFrom(e.target.value)} />
            <Input type="date" value={customTo} onChange={e => setCustomTo(e.target.value)} />
          </div>
        )}
      </div>

      <Card className="rounded-none border-2 border-gray-300 shadow-lg">
        <CardHeader>
          <CardTitle>Contributions Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>Issues: {issueCount}</p>
          <p>Pull Requests: {prCount}</p>
          <p>Code Reviews: {reviewCount}</p>
        </CardContent>
      </Card>

      <Card className="rounded-none border-2 border-gray-300 shadow-lg">
        <CardHeader>
          <CardTitle>Commits by Repository</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <MantineReactTable table={table} />
        </CardContent>
      </Card>

      <Card className="rounded-none border-2 border-gray-300 shadow-lg">
        <CardHeader>
          <CardTitle>Commits Timeline</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <MantineReactTable table={timelineTable} />
        </CardContent>
      </Card>
    </div>
  );
}
