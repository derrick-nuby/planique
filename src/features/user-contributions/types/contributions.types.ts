export interface RepoContribution {
  repository: {
    name: string;
    url: string;
  };
  contributions: {
    totalCount: number;
  };
}

export interface ContributionDay {
  date: string;
  contributionCount: number;
}

export interface UserContributions {
  avatarUrl: string;
  url: string;
  contributionsCollection: {
    commitContributionsByRepository: RepoContribution[];
    issueContributions: { totalCount: number };
    pullRequestContributions: { totalCount: number };
    pullRequestReviewContributions: { totalCount: number };
    contributionCalendar: {
      weeks: { contributionDays: ContributionDay[] }[];
    };
  };
}
