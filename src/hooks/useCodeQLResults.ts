import { useState, useEffect } from 'react';
import { codeqlService } from '../services/api';
import type { CodeQLResults } from '../types';
import { notify } from '../utils/notifications';

export function useCodeQLResults() {
  const [results, setResults] = useState<CodeQLResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await codeqlService.getResults();
        setResults(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch CodeQL results');
        notify.error('Failed to load CodeQL results');
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, []);

  return { results, isLoading, error };
}