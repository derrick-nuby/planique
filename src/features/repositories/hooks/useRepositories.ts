import { useQuery } from '@tanstack/react-query';
import { repositoryService } from '../services/repositoryService';
import { GitHubRepo } from '../types/repository.types';

export const useRepositories = () => {
  return useQuery<GitHubRepo[]>({
    queryKey: ['repositories'],
    queryFn: repositoryService.getRepositories,
  });
};
