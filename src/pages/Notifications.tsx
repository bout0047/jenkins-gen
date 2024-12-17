import React from 'react';
import { Bell, Check } from 'lucide-react';
import NotificationList from '../components/notifications/NotificationList';
import { useNotifications } from '../hooks/useNotifications';

export default function Notifications() {
  const { notifications, isLoading, markAllAsRead } = useNotifications();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
        <button
          onClick={markAllAsRead}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Check className="w-4 h-4" />
          <span>Mark All as Read</span>
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="bg-blue-50 p-4 rounded-lg flex items-center space-x-3">
          <Bell className="w-6 h-6 text-blue-600" />
          <div>
            <p className="text-sm font-medium text-blue-600">Unread Notifications</p>
            <p className="text-2xl font-semibold text-blue-700">
              {notifications?.filter(n => !n.read).length || 0}
            </p>
          </div>
        </div>
      </div>

      <NotificationList notifications={notifications} isLoading={isLoading} />
    </div>
  );
}