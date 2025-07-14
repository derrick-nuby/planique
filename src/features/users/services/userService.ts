import axios from 'axios';
import { GitHubUser } from '../types/user.types';

const getUsers = async (): Promise<GitHubUser[]> => {
  const response = await axios.get<GitHubUser[]>('/api/users');
  return response.data;
};

export const userService = { getUsers };
