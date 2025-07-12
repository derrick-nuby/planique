import RepositoryDetails from '@/features/repositories/components/RepositoryDetails';

export default async function RepoPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  return <RepositoryDetails repoName={name} />;
}
