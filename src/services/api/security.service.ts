import axios from 'axios';
import { API_CONFIG } from './config';
import type { SecurityStats } from '../../types';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: API_CONFIG.HEADERS,
});

export const securityService = {
  getSecurityStats: async (): Promise<SecurityStats> => {
    const response = await api.get('/security/stats');
    return response.data;
  },
};