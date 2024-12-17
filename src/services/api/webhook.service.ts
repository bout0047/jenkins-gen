import axios from 'axios';
import { API_CONFIG } from './config';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: API_CONFIG.HEADERS,
});

export const webhookService = {
  triggerPipeline: async (repoName: string, branch: string) => {
    const response = await api.post('/webhook', {
      ref: `refs/heads/${branch}`,
      repository: {
        full_name: repoName,
      },
    }, {
      headers: {
        'X-GitHub-Event': 'push',
      },
    });
    return response.data;
  },
};