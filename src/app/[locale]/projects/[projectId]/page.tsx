import ProjectDetails from '@/features/projects/components/ProjectDetails';

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  return <ProjectDetails projectId={projectId} />;
}
