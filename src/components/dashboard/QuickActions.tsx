import React from 'react';
import { Play, Shield, Terminal, RefreshCw } from 'lucide-react';
import { usePipeline } from '../../hooks/usePipeline';
import { notify } from '../../utils/notifications';

interface QuickAction {
  icon: typeof Play;
  label: string;
  onClick: () => Promise<void>;
  variant: 'primary' | 'secondary' | 'success' | 'danger';
}

const variantStyles = {
  primary: 'bg-blue-600 hover:bg-blue-700',
  secondary: 'bg-gray-600 hover:bg-gray-700',
  success: 'bg-green-600 hover:bg-green-700',
  danger: 'bg-red-600 hover:bg-red-700',
};

export default function QuickActions() {
  const { triggerPipeline, isLoading } = usePipeline();

  const handleTriggerPipeline = async () => {
    try {
      await triggerPipeline('your-repo-name', 'main');
    } catch (error) {
      console.error('Failed to trigger pipeline:', error);
    }
  };

  const handleRunAnalysis = async () => {
    notify.error('CodeQL analysis feature is not implemented yet');
  };

  const handleRefreshStatus = async () => {
    notify.error('Status refresh feature is not implemented yet');
  };

  const actions: QuickAction[] = [
    {
      icon: Terminal,
      label: isLoading ? 'Triggering...' : 'Trigger Pipeline',
      onClick: handleTriggerPipeline,
      variant: 'primary',
    },
    {
      icon: Shield,
      label: 'Run Analysis',
      onClick: handleRunAnalysis,
      variant: 'success',
    },
    {
      icon: RefreshCw,
      label: 'Refresh Status',
      onClick: handleRefreshStatus,
      variant: 'secondary',
    },
  ];

  return (
    <div className="flex space-x-4">
      {actions.map(({ icon: Icon, label, onClick, variant }) => (
        <button
          key={label}
          onClick={onClick}
          disabled={isLoading}
          className={`px-4 py-2 text-sm font-medium text-white rounded-lg flex items-center space-x-2 ${
            variantStyles[variant]
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Icon className="w-4 h-4" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}