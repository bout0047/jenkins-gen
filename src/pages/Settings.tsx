import React from 'react';
import { Github, Jenkins, Shield, Bell } from 'lucide-react';
import SettingsSection from '../components/settings/SettingsSection';
import { useSettings } from '../hooks/useSettings';

export default function Settings() {
  const { settings, updateSettings, isLoading } = useSettings();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      </div>

      <div className="space-y-6">
        <SettingsSection
          title="GitHub Integration"
          icon={Github}
          description="Configure your GitHub connection and webhook settings."
          isLoading={isLoading}
        >
          {/* GitHub settings form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">GitHub Token</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="••••••••••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Webhook URL</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value="https://your-webhook-url.com/webhook"
                readOnly
              />
            </div>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Jenkins Configuration"
          icon={Jenkins}
          description="Set up your Jenkins server connection details."
          isLoading={isLoading}
        >
          {/* Jenkins settings form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Jenkins URL</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="https://jenkins.example.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">API Token</label>
                <input
                  type="password"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="••••••••••••••••"
                />
              </div>
            </div>
          </div>
        </SettingsSection>

        <SettingsSection
          title="CodeQL Settings"
          icon={Shield}
          description="Configure CodeQL analysis settings and scan frequency."
          isLoading={isLoading}
        >
          {/* CodeQL settings form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Scan Frequency</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>Every Push</option>
                <option>Daily</option>
                <option>Weekly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Minimum Severity Level
              </label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Notification Preferences"
          icon={Bell}
          description="Manage your notification settings and alerts."
          isLoading={isLoading}
        >
          {/* Notification settings form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                <span className="ml-2 text-sm text-gray-700">Pipeline Status Changes</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                <span className="ml-2 text-sm text-gray-700">New Security Vulnerabilities</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                <span className="ml-2 text-sm text-gray-700">Repository Updates</span>
              </label>
            </div>
          </div>
        </SettingsSection>
      </div>
    </div>
  );
}