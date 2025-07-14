import { useQuery } from '@tanstack/react-query';
import { contributionsService } from '../services/contributionsService';
import { UserContributions } from '../types/contributions.types';

export const useUserContributions = (
  username: string,
  from?: string,
  to?: string
) => {
  return useQuery<UserContributions>({
    queryKey: ['userContributions', username, from, to],
    queryFn: () => contributionsService.getUserContributions(username, from, to),
    enabled: !!username,
    staleTime: 3600 * 1000,
    gcTime: 7200 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
