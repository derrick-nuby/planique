import ProjectsTable from '@/features/projects/components/ProjectsTable';

export default async function RepoProjectsPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  return <ProjectsTable repoName={name} />;
}
