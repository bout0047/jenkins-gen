import React from 'react';
import { Activity, GitBranch, Shield, Terminal } from 'lucide-react';
import MetricCard from '../components/MetricCard';
import ActivityList from '../components/dashboard/ActivityList';
import SecurityOverview from '../components/dashboard/SecurityOverview';
import QuickActions from '../components/dashboard/QuickActions';
import { useMetrics } from '../hooks/useMetrics';
import { useActivities } from '../hooks/useActivities';
import { useSecurityStats } from '../hooks/useSecurityStats';

export default function Dashboard() {
  const { metrics, isLoading: metricsLoading } = useMetrics();
  const { activities, isLoading: activitiesLoading } = useActivities();
  const { stats, isLoading: statsLoading } = useSecurityStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <QuickActions />
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Connected Repositories"
          value={metrics?.repositories ?? '-'}
          icon={GitBranch}
          trend={metrics?.repositoryTrend}
          isLoading={metricsLoading}
        />
        <MetricCard
          title="Active Pipelines"
          value={metrics?.activePipelines ?? '-'}
          icon={Terminal}
          trend={metrics?.pipelineTrend}
          isLoading={metricsLoading}
        />
        <MetricCard
          title="Security Issues"
          value={metrics?.securityIssues ?? '-'}
          icon={Shield}
          trend={metrics?.securityTrend}
          isLoading={metricsLoading}
        />
        <MetricCard
          title="Total Scans"
          value={metrics?.totalScans ?? '-'}
          icon={Activity}
          trend={metrics?.scansTrend}
          isLoading={metricsLoading}
        />
      </div>

      {/* Activity and Security Overview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ActivityList activities={activities} isLoading={activitiesLoading} />
        <SecurityOverview stats={stats} isLoading={statsLoading} />
      </div>
    </div>
  );
}