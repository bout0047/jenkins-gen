import axios from 'axios';
import { API_CONFIG } from './config';
import type { CodeQLResults } from '../../types';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: API_CONFIG.HEADERS,
});

export const codeqlService = {
  getResults: async (): Promise<CodeQLResults> => {
    const response = await api.get('/codeql/results');
    return response.data;
  },
  
  runAnalysis: async (repoId: string) => {
    const response = await api.post(`/codeql/analyze/${repoId}`);
    return response.data;
  }
};