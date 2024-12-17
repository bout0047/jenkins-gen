import React from 'react';
import { Terminal } from 'lucide-react';
import PipelineList from '../components/pipelines/PipelineList';
import { usePipelineLogs } from '../hooks/usePipelineLogs';

export default function PipelineLogs() {
  const { pipelines, isLoading } = usePipelineLogs();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Pipeline Logs</h1>
        <div className="flex items-center space-x-4">
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="in-progress">In Progress</option>
          </select>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
            <Terminal className="w-4 h-4" />
            <span>View Live Logs</span>
          </button>
        </div>
      </div>

      <PipelineList pipelines={pipelines} isLoading={isLoading} />
    </div>
  );
}