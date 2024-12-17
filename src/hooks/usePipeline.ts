import { useState } from 'react';
import { webhookService } from '../services/api';
import { notify } from '../utils/notifications';

export function usePipeline() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const triggerPipeline = async (repoName: string, branch: string) => {
    const toastId = notify.loading('Triggering pipeline...');
    setIsLoading(true);
    setError(null);

    try {
      const result = await webhookService.triggerPipeline(repoName, branch);
      notify.dismiss(toastId);
      notify.success('Pipeline triggered successfully');
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to trigger pipeline';
      setError(errorMessage);
      notify.dismiss(toastId);
      notify.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    triggerPipeline,
    isLoading,
    error,
  };
}