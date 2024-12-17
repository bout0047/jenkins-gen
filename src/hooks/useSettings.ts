import { useState, useEffect } from 'react';
import { settingsService } from '../services/api';
import { notify } from '../utils/notifications';

interface Settings {
  github: {
    token: string;
    webhookUrl: string;
  };
  jenkins: {
    url: string;
    username: string;
    token: string;
  };
  codeql: {
    scanFrequency: 'every-push' | 'daily' | 'weekly';
    minSeverity: 'low' | 'medium' | 'high';
  };
  notifications: {
    pipelineStatus: boolean;
    securityVulnerabilities: boolean;
    repositoryUpdates: boolean;
  };
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await settingsService.getSettings();
        setSettings(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch settings');
        notify.error('Failed to load settings');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const updateSettings = async (newSettings: Partial<Settings>) => {
    try {
      setIsLoading(true);
      await settingsService.updateSettings(newSettings);
      setSettings(prev => ({ ...prev!, ...newSettings }));
      notify.success('Settings updated successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update settings');
      notify.error('Failed to update settings');
    } finally {
      setIsLoading(false);
    }
  };

  return { settings, updateSettings, isLoading, error };
}