import axios from 'axios';
import { API_CONFIG } from './config';
import type { Activity } from '../../types';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: API_CONFIG.HEADERS,
});

export const activityService = {
  getRecentActivities: async (): Promise<Activity[]> => {
    const response = await api.get('/activities');
    return response.data;
  },
};