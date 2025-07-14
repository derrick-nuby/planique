import { NextResponse } from 'next/server';

export async function GET() {
  console.log('=== Starting GitHub Projects API request ===');

  const org = process.env.GITHUB_ORG;
  const token = process.env.GITHUB_TOKEN;

  console.log('Environment variables check:');
  console.log('- GITHUB_ORG:', org ? `"${org}"` : 'NOT SET');
  console.log('- GITHUB_TOKEN:', token ? `"${token.substring(0, 8)}..."` : 'NOT SET');

  if (!org || !token) {
    console.error('Missing required environment variables');
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

  console.log('GraphQL query prepared:');
  console.log('- Query variables:', JSON.stringify(query.variables, null, 2));
  console.log('- Full query:', JSON.stringify(query, null, 2));

  console.debug('Fetching projects via GraphQL for org', org);

  try {
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
    console.log('Response headers:', Object.fromEntries(res.headers.entries()));

    if (!res.ok) {
      const errorText = await res.text();
      console.error('GitHub projects GraphQL request failed', res.status, errorText);
      console.error('Request details:', {
        url: 'https://api.github.com/graphql',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.substring(0, 8)}...`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(query, null, 2)
      });
      return NextResponse.json(
        { error: 'Failed to fetch projects', details: errorText },
        { status: res.status }
      );
    }

    const data = await res.json();
    console.log('Raw GraphQL response:', JSON.stringify(data, null, 2));

    if (data.errors) {
      console.error('GitHub projects GraphQL errors', data.errors);
      return NextResponse.json(
        { error: 'Failed to fetch projects', details: data.errors },
        { status: 500 }
      );
    }

    console.log('Successfully fetched projects:');
    console.log('- Organization data:', data.data.organization ? 'Found' : 'Not found');
    console.log('- Projects count:', data.data.organization?.projectsV2?.nodes?.length || 0);
    console.log('- Projects data:', JSON.stringify(data.data.organization.projectsV2.nodes, null, 2));

    return NextResponse.json(data.data.organization.projectsV2.nodes);
  } catch (error) {
    console.error('Unexpected error during GraphQL request:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json(
      { error: 'Unexpected error occurred', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
