// Pipeline types
export interface Pipeline {
  id: string;
  name: string;
  branch: string;
  status: 'success' | 'failed' | 'in-progress' | 'none';
  timestamp: string;
  logsUrl: string;
  stages?: PipelineStage[];
}

export interface PipelineStage {
  name: string;
  status: 'success' | 'failed' | 'in-progress' | 'none';
  duration?: string;
}

// Repository types
export interface Repository {
  id: string;
  name: string;
  branch: string;
  lastPipelineStatus: 'success' | 'failed' | 'in-progress' | 'none';
  lastCodeQLScan: {
    date: string;
    high: number;
    medium: number;
    low: number;
  };
}

// CodeQL types
export interface CodeQLResults {
  high: number;
  medium: number;
  low: number;
  vulnerabilities: CodeQLVulnerability[];
}

export interface CodeQLVulnerability {
  id: string;
  severity: 'high' | 'medium' | 'low';
  filePath: string;
  line: number;
  description: string;
  githubUrl: string;
}

// Notification types
export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

// Security types
export interface SecurityStats {
  high: number;
  medium: number;
  low: number;
}

// Activity types
export interface Activity {
  id: string;
  repo: string;
  event: string;
  status: 'success' | 'failed' | 'in-progress' | 'none';
  time: string;
}

// Metrics types
export interface Metrics {
  repositories: number;
  activePipelines: number;
  securityIssues: number;
  totalScans: number;
  repositoryTrend?: Trend;
  pipelineTrend?: Trend;
  securityTrend?: Trend;
  scansTrend?: Trend;
}

export interface Trend {
  value: number;
  isPositive: boolean;
}