import axios from 'axios';
import { GitHubProject } from '../types/project.types';

const getProjects = async (): Promise<GitHubProject[]> => {
  const response = await axios.get<GitHubProject[]>('/api/projects');
  return response.data;
};

export const projectService = { getProjects };
