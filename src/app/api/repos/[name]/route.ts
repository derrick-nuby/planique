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

  const name = request.nextUrl.pathname.split('/').pop() ?? '';
  const endpoint = `${apiUrl}/repos/${org}/${name}`;
  const res = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch repository' },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
