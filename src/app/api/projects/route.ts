import { NextResponse } from 'next/server';

export async function GET() {
  const org = process.env.GITHUB_ORG;
  const token = process.env.GITHUB_TOKEN;
  const apiUrl = process.env.GITHUB_API_URL || 'https://api.github.com';

  if (!org || !token) {
    return NextResponse.json(
      { error: 'GitHub configuration missing' },
      { status: 500 }
    );
  }

  const endpoint = `${apiUrl}/orgs/${org}/projects`;
  const res = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.inertia-preview+json',
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
