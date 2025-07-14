import UserContributions from '@/features/user-contributions/components/UserContributions';

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  return <UserContributions username={username} />;
}
