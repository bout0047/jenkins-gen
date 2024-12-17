import React from 'react';
import { Terminal, Clock, GitBranch } from 'lucide-react';
import StatusBadge from '../StatusBadge';
import type { Pipeline } from '../../types';

interface PipelineListProps {
  pipelines: Pipeline[];
  isLoading?: boolean;
}

export default function PipelineList({ pipelines, isLoading }: PipelineListProps) {
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
        {pipelines.map((pipeline) => (
          <div key={pipeline.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Terminal className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{pipeline.name}</h3>
                  <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <GitBranch className="w-4 h-4" />
                      <span>{pipeline.branch}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(pipeline.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <StatusBadge status={pipeline.status} />
                <button 
                  onClick={() => window.open(pipeline.logsUrl, '_blank')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  View Logs
                </button>
              </div>
            </div>
            {pipeline.stages && (
              <div className="mt-4 flex items-center space-x-2">
                {pipeline.stages.map((stage, index) => (
                  <React.Fragment key={stage.name}>
                    <div className={`px-3 py-1 rounded text-xs font-medium
                      ${stage.status === 'success' ? 'bg-green-100 text-green-800' :
                        stage.status === 'failed' ? 'bg-red-100 text-red-800' :
                          stage.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'}`}>
                      {stage.name}
                    </div>
                    {index < pipeline.stages.length - 1 && (
                      <div className="w-2 h-0.5 bg-gray-300"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}