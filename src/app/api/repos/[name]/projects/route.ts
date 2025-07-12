import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const org = process.env.GITHUB_ORG;
  const token = process.env.GITHUB_TOKEN;
  const apiUrl = process.env.GITHUB_API_URL || 'https://api.github.com';

  if (!org || !token) {
    return NextResponse.json(
      { error: 'GitHub configuration missing' },
      { status: 500 }
    );
  }

  const segments = request.nextUrl.pathname.split('/');
  const repo = segments[segments.indexOf('repos') + 1] || '';
  const endpoint = `${apiUrl}/repos/${org}/${repo}/projects`;
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
