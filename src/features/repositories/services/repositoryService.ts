import axios from 'axios';
import { GitHubRepo, GitHubRepoDetails } from '../types/repository.types';

const getRepositories = async (): Promise<GitHubRepo[]> => {
  const response = await axios.get<GitHubRepo[]>('/api/repos');
  return response.data;
};

const getRepository = async (name: string): Promise<GitHubRepoDetails> => {
  const response = await axios.get<GitHubRepoDetails>(`/api/repos/${name}`);
  return response.data;
};

export const repositoryService = { getRepositories, getRepository };
