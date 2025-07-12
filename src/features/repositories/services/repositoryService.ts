import axios from 'axios';
import { GitHubRepo } from '../types/repository.types';

const getRepositories = async (): Promise<GitHubRepo[]> => {
  const response = await axios.get<GitHubRepo[]>('/api/repos');
  return response.data;
};

export const repositoryService = { getRepositories };
