import axios from 'axios';
import { API_CONFIG } from './config';
import type { Metrics } from '../../types';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: API_CONFIG.HEADERS,
});

export const metricsService = {
  getMetrics: async (): Promise<Metrics> => {
    const response = await api.get('/metrics');
    return response.data;
  },
};