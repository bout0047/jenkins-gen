import axios from 'axios';
import { API_CONFIG } from './config';
import type { Repository } from '../../types';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: API_CONFIG.HEADERS,
});

export const repositoryService = {
  getRepositories: async (): Promise<Repository[]> => {
    const response = await api.get('/repositories');
    return response.data;
  },
  
  addRepository: async (repoUrl: string, branch: string) => {
    const response = await api.post('/repositories', { repoUrl, branch });
    return response.data;
  },
  
  deleteRepository: async (repoId: string) => {
    const response = await api.delete(`/repositories/${repoId}`);
    return response.data;
  }
};