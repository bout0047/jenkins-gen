import React from 'react';
import { Shield } from 'lucide-react';
import type { SecurityStats } from '../../types';

interface SecurityOverviewProps {
  stats: SecurityStats | null;
  isLoading?: boolean;
}

export default function SecurityOverview({ stats, isLoading }: SecurityOverviewProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3 animate-pulse">
                <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Security Overview</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-3 gap-6">
          {[
            { label: 'High', value: stats.high, color: 'red' },
            { label: 'Medium', value: stats.medium, color: 'yellow' },
            { label: 'Low', value: stats.low, color: 'green' },
          ].map(({ label, value, color }) => (
            <div key={label} className="text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-${color}-100 mb-3`}>
                <Shield className={`w-6 h-6 text-${color}-600`} />
              </div>
              <div className="text-2xl font-semibold text-gray-900">{value}</div>
              <div className="text-sm text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}