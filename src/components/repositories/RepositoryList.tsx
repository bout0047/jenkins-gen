import React from 'react';
import StatusBadge from '../StatusBadge';
import type { Repository } from '../../types';

interface RepositoryListProps {
  repositories: Repository[];
  isLoading?: boolean;
}

export default function RepositoryList({ repositories, isLoading }: RepositoryListProps) {
  if (isLoading) {
    return (
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="divide-y divide-gray-200">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 animate-pulse">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      <div className="divide-y divide-gray-200">
        {repositories.map((repo) => (
          <div key={repo.id} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{repo.name}</h3>
                <p className="text-sm text-gray-500">Branch: {repo.branch}</p>
              </div>
              <div className="flex items-center space-x-4">
                <StatusBadge status={repo.lastPipelineStatus} />
                <div className="text-sm text-gray-500">
                  Last scan: {new Date(repo.lastCodeQLScan.date).toLocaleDateString()}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-red-600 text-sm">{repo.lastCodeQLScan.high}</span>
                  <span className="text-yellow-600 text-sm">{repo.lastCodeQLScan.medium}</span>
                  <span className="text-blue-600 text-sm">{repo.lastCodeQLScan.low}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}