import { useState, useEffect } from 'react';
import { repositoryService } from '../services/api';
import type { Repository } from '../types';
import { notify } from '../utils/notifications';

export function useRepositories() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const data = await repositoryService.getRepositories();
        setRepositories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
        notify.error('Failed to load repositories');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  return { repositories, isLoading, error };
}