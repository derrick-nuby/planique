import { useQuery } from '@tanstack/react-query';
import { projectService } from '../services/projectService';
import { GitHubProject } from '../types/project.types';

export const useProjects = (repo?: string) => {
  return useQuery<GitHubProject[]>({
    queryKey: repo ? ['repoProjects', repo] : ['projects'],
    queryFn: () =>
      repo
        ? projectService.getRepoProjects(repo)
        : projectService.getProjects(),
    enabled: repo ? !!repo : true,
    staleTime: 3600 * 1000,
  });
};
