import axios from 'axios';
import { GitHubProject } from '../types/project.types';

const getProjects = async (): Promise<GitHubProject[]> => {
  console.debug('Requesting /api/projects');
  const response = await axios.get<GitHubProject[]>('/api/projects');
  console.debug('Projects fetched', response.data);
  return response.data;
};

export const projectService = { getProjects };
