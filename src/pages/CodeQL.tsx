import React from 'react';
import { Shield, AlertTriangle, Info } from 'lucide-react';
import CodeQLTable from '../components/codeql/CodeQLTable';
import { useCodeQLResults } from '../hooks/useCodeQLResults';

export default function CodeQL() {
  const { results, isLoading } = useCodeQLResults();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">CodeQL Analysis</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <div>
              <p className="text-sm font-medium text-red-600">High Severity</p>
              <p className="text-2xl font-semibold text-red-700">{results?.high || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-yellow-600" />
            <div>
              <p className="text-sm font-medium text-yellow-600">Medium Severity</p>
              <p className="text-2xl font-semibold text-yellow-700">{results?.medium || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-3">
            <Info className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-600">Low Severity</p>
              <p className="text-2xl font-semibold text-blue-700">{results?.low || 0}</p>
            </div>
          </div>
        </div>
      </div>

      <CodeQLTable results={results?.vulnerabilities || []} isLoading={isLoading} />
    </div>
  );
}