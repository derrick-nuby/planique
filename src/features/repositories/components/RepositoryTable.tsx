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
import { useRepositories } from '../hooks/useRepositories';

export default function RepositoryTable() {
  const { data, isLoading, error } = useRepositories();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading repositories</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Repositories</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Visibility</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((repo) => (
              <TableRow key={repo.id}>
                <TableCell>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {repo.name}
                  </a>
                </TableCell>
                <TableCell>{repo.description ?? '-'}</TableCell>
                <TableCell>{repo.language ?? '-'}</TableCell>
                <TableCell>{repo.private ? 'Private' : 'Public'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
