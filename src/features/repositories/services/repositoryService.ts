import axios from 'axios';
import { GitHubRepo, GitHubRepoDetails } from '../types/repository.types';

const getRepositories = async (): Promise<GitHubRepo[]> => {
  const response = await axios.get<GitHubRepo[]>('/api/repos');
  console.debug('Repositories fetched', response.data);
  return response.data;
};

const getRepository = async (name: string): Promise<GitHubRepoDetails> => {
  const response = await axios.get<GitHubRepoDetails>(`/api/repos/${name}`);
  console.debug('Repository fetched', response.data);
  return response.data;
};

export const repositoryService = { getRepositories, getRepository };
