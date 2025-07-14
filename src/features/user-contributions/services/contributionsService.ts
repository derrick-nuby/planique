import axios from 'axios';
import { UserContributions } from '../types/contributions.types';

export const contributionsService = {
  getUserContributions: async (
    username: string,
    from?: string,
    to?: string
  ): Promise<UserContributions> => {
    const params = new URLSearchParams();
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    const url = `/api/users/${username}/contributions?${params.toString()}`;
    const response = await axios.get<UserContributions>(url);
    return response.data;
  },
};
