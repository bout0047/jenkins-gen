import React from 'react';
import { Plus, Search } from 'lucide-react';
import RepositoryList from '../components/repositories/RepositoryList';
import { useRepositories } from '../hooks/useRepositories';

export default function Repositories() {
  const { repositories, isLoading } = useRepositories();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Repositories</h1>
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Repository</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search repositories..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          <option value="all">All Branches</option>
          <option value="main">Main</option>
          <option value="develop">Develop</option>
        </select>
      </div>

      <RepositoryList repositories={repositories} isLoading={isLoading} />
    </div>
  );
}