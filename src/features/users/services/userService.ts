import axios from 'axios';
import { GitHubUser } from '../types/user.types';

const getUsers = async (): Promise<GitHubUser[]> => {
  console.debug('Requesting /api/users');
  const response = await axios.get<GitHubUser[]>('/api/users');
  console.debug('Users fetched', response.data);
  return response.data;
};

export const userService = { getUsers };
