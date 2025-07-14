import { useQuery } from '@tanstack/react-query';
import { projectService } from '../services/projectService';
import { GitHubProjectDetails } from '../types/project.types';

export const useProject = (id: string) => {
  return useQuery<GitHubProjectDetails>({
    queryKey: ['project', id],
    queryFn: () => projectService.getProject(id),
    enabled: !!id,
    staleTime: 3600 * 1000,
    gcTime: 7200 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
