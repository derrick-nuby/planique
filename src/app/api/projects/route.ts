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

  const query = {
    query: `
      query ($login: String!) {
        organization(login: $login) {
          projectsV2(first: 20) {
            nodes {
              id
              title
              shortDescription
              url
              updatedAt
            }
          }
        }
      }
    `,
    variables: { login: org },
  };

  console.debug('Fetching projects via GraphQL for org', org);
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(query),
    next: { revalidate: 3600 },
  });

  console.debug('Projects GraphQL response status', res.status);

  if (!res.ok) {
    const errorText = await res.text();
    console.error('GitHub projects GraphQL request failed', res.status, errorText);
    return NextResponse.json(
      { error: 'Failed to fetch projects', details: errorText },
      { status: res.status }
    );
  }

  const data = await res.json();
  if (data.errors) {
    console.error('GitHub projects GraphQL errors', data.errors);
    return NextResponse.json(
      { error: 'Failed to fetch projects', details: data.errors },
      { status: 500 }
    );
  }

  return NextResponse.json(data.data.organization.projectsV2.nodes);
}
