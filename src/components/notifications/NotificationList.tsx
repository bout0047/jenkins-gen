import React from 'react';
import { Bell, Check } from 'lucide-react';
import type { Notification } from '../../types';

interface NotificationListProps {
  notifications: Notification[];
  isLoading?: boolean;
}

export default function NotificationList({ notifications, isLoading }: NotificationListProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="divide-y divide-gray-200">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 animate-pulse">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="divide-y divide-gray-200">
        {notifications.map((notification) => (
          <div key={notification.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${notification.read ? 'bg-gray-100' : 'bg-blue-50'}`}>
                  <Bell className={`w-5 h-5 ${notification.read ? 'text-gray-600' : 'text-blue-600'}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                  <p className="text-sm text-gray-500">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(notification.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              {!notification.read && (
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Check className="w-5 h-5 text-gray-400" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}