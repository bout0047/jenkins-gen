import React from 'react';

type Status = 'success' | 'failed' | 'in-progress' | 'none';

const statusStyles = {
  success: 'bg-green-100 text-green-800 border-green-200',
  failed: 'bg-red-100 text-red-800 border-red-200',
  'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
  none: 'bg-gray-100 text-gray-800 border-gray-200',
};

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        statusStyles[status]
      } ${className}`}
    >
      {status === 'in-progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}