import axios from 'axios';
import { API_CONFIG } from './config';
import type { Pipeline } from '../../types';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: API_CONFIG.HEADERS,
});

export const pipelineService = {
  getPipelines: async (): Promise<Pipeline[]> => {
    const response = await api.get('/pipelines');
    return response.data;
  },

  getPipelineLogs: async (pipelineId: string): Promise<string> => {
    const response = await api.get(`/pipelines/${pipelineId}/logs`);
    return response.data;
  },
};