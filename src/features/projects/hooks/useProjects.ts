import { useQuery } from '@tanstack/react-query';
import { projectService } from '../services/projectService';
import { GitHubProject } from '../types/project.types';

export const useProjects = () => {
  return useQuery<GitHubProject[]>({
    queryKey: ['projects'],
    queryFn: projectService.getProjects,
    staleTime: 3600 * 1000,
  });
};
