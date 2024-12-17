import axios from 'axios';
import type { Metrics, Activity, SecurityStats } from '../types';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const webhookService = {
  triggerPipeline: async (repoName: string, branch: string) => {
    const response = await api.post('/webhook', {
      ref: `refs/heads/${branch}`,
      repository: {
        full_name: repoName
      }
    }, {
      headers: {
        'X-GitHub-Event': 'push'
      }
    });
    return response.data;
  }
};

export const metricsService = {
  getMetrics: async (): Promise<Metrics> => {
    const response = await api.get('/metrics');
    return response.data;
  }
};

export const activityService = {
  getRecentActivities: async (): Promise<Activity[]> => {
    const response = await api.get('/activities');
    return response.data;
  }
};

export const securityService = {
  getSecurityStats: async (): Promise<SecurityStats> => {
    const response = await api.get('/security/stats');
    return response.data;
  }
};