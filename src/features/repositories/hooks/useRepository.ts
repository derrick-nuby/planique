import { useQuery } from '@tanstack/react-query';
import { repositoryService } from '../services/repositoryService';
import { GitHubRepoDetails } from '../types/repository.types';

export const useRepository = (name: string) => {
  return useQuery<GitHubRepoDetails>({
    queryKey: ['repository', name],
    queryFn: () => repositoryService.getRepository(name),
    enabled: !!name,
    staleTime: 3600 * 1000,
  });
};
