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

  const endpoint = `${apiUrl}/orgs/${org}/repos`;
  console.debug('Fetching repos from', endpoint);
  const res = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
    },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch repositories' },
      { status: res.status }
    );
  }

  const data = await res.json();
  console.debug('GitHub response status', res.status);
  console.debug('GitHub response body', data);
  return NextResponse.json(data);
}
