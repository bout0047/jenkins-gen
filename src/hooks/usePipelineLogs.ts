import { useState, useEffect } from 'react';
import { pipelineService } from '../services/api';
import type { Pipeline } from '../types';
import { notify } from '../utils/notifications';

export function usePipelineLogs() {
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPipelines = async () => {
      try {
        const data = await pipelineService.getPipelines();
        setPipelines(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch pipelines');
        notify.error('Failed to load pipeline logs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPipelines();
  }, []);

  return { pipelines, isLoading, error };
}