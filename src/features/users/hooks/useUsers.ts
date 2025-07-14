import { useQuery } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { GitHubUser } from '../types/user.types';

export const useUsers = () => {
  return useQuery<GitHubUser[]>({
    queryKey: ['users'],
    queryFn: userService.getUsers,
    staleTime: 3600 * 1000,
  });
};
