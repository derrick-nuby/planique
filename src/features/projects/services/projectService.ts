import axios from 'axios';
import { GitHubProject, GitHubProjectDetails } from '../types/project.types';

const getProjects = async (): Promise<GitHubProject[]> => {
  console.debug('Requesting /api/projects');
  const response = await axios.get<GitHubProject[]>('/api/projects');
  console.debug('Projects fetched', response.data);
  return response.data;
};

const getProject = async (id: string): Promise<GitHubProjectDetails> => {
  const response = await axios.get<GitHubProjectDetails>(`/api/projects/${id}`);
  return response.data;
};

export const projectService = { getProjects, getProject };
