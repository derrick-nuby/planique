import axios from 'axios';
import { GitHubProject } from '../types/project.types';

const getProjects = async (): Promise<GitHubProject[]> => {
  const response = await axios.get<GitHubProject[]>('/api/projects');
  return response.data;
};

const getRepoProjects = async (repo: string): Promise<GitHubProject[]> => {
  const response = await axios.get<GitHubProject[]>(`/api/repos/${repo}/projects`);
  return response.data;
};

export const projectService = { getProjects, getRepoProjects };
