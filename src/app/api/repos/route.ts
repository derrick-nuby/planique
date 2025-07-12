import { NextResponse } from 'next/server';

export async function GET() {
  const org = process.env.GITHUB_ORG;
  const token = process.env.GITHUB_TOKEN;

  if (!org || !token) {
    return NextResponse.json(
      { error: 'GitHub configuration missing' },
      { status: 500 }
    );
  }

  const res = await fetch(`https://api.github.com/orgs/${org}/repos`, {
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
  return NextResponse.json(data);
}
