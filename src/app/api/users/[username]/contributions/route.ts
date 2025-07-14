import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const token = process.env.GITHUB_TOKEN;
  const org = process.env.GITHUB_ORG;
  const apiUrl = 'https://api.github.com/graphql';

  if (!token || !org) {
    return NextResponse.json({ error: 'GitHub configuration missing' }, { status: 500 });
  }

  const username = request.nextUrl.pathname.split('/').filter(Boolean).pop() || '';
  const searchParams = request.nextUrl.searchParams;
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  // Get organization ID
  const orgQuery = {
    query: `query($login: String!) { organization(login: $login) { id } }`,
    variables: { login: org },
  };

  const orgRes = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orgQuery),
  });

  if (!orgRes.ok) {
    return NextResponse.json({ error: 'Failed to fetch organization' }, { status: orgRes.status });
  }

  const orgData = await orgRes.json();
  const orgId = orgData.data.organization.id;

  const contributionsQuery = {
    query: `
      query($login: String!, $orgId: ID!, $from: DateTime, $to: DateTime) {
        user(login: $login) {
          avatarUrl
          url
          contributionsCollection(organizationID: $orgId, from: $from, to: $to) {
            commitContributionsByRepository(maxRepositories: 100) {
              repository { name url }
              contributions(first: 1) { totalCount }
            }
            issueContributions(first: 1) { totalCount }
            pullRequestContributions(first: 1) { totalCount }
            pullRequestReviewContributions(first: 1) { totalCount }
            contributionCalendar {
              weeks {
                contributionDays { date contributionCount }
              }
            }
          }
        }
      }
    `,
    variables: { login: username, orgId, from, to },
  };

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contributionsQuery),
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch contributions' }, { status: res.status });
  }

  const data = await res.json();
  const user = data.data.user;
  return NextResponse.json(user);
}
