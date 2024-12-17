import { useState, useEffect } from 'react';
import { notificationService } from '../services/api';
import type { Notification } from '../types';
import { notify } from '../utils/notifications';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await notificationService.getNotifications();
        setNotifications(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch notifications');
        notify.error('Failed to load notifications');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      notify.success('All notifications marked as read');
    } catch (err) {
      notify.error('Failed to mark notifications as read');
    }
  };

  return { notifications, isLoading, error, markAllAsRead };
}