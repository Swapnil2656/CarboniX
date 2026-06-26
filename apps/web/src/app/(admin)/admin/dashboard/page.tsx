'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { StatCard } from '@/components/ui/StatCard';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { Skeleton } from '@/components/ui/Skeleton';
import AgentChat from '@/components/admin/AgentChat';
import { getProjects } from '@/app/actions/dashboard-actions';
import { adminApi } from '@/services/api/endpoints';
import type { DashboardData } from '@/types/admin';
import { useRouter } from 'next/navigation';

interface Project {
  id: string;
  name: string;
  region: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchProjectsData = useCallback(async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      setError(null);
      
      const [res, statsRes] = await Promise.all([
        getProjects(),
        adminApi.getDashboard().catch(() => null)
      ]);
      
      if (res.success) {
        setProjects(res.projects || []);
      } else {
        setError(res.error || 'Failed to fetch projects.');
      }
      
      if (statsRes) {
        setStats(statsRes);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load dashboard data.');
    } finally {
      if (isInitial) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjectsData(true);
    
    // Auto refresh every 5 seconds to catch AI region switches
    const interval = setInterval(() => fetchProjectsData(false), 5000);
    return () => clearInterval(interval);
  }, [fetchProjectsData]);

  // Derived data for projects
  const activeDeployments = projects.length;

  return (
    <div className="flex flex-col gap-6 relative min-h-screen">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-section-header text-on-surface">Dashboard</h1>
          <p className="text-on-surface-variant mt-1">Track your deployments and carbon footprint.</p>
        </div>
      </div>

      {error && <ErrorBanner message={error} onRetry={fetchProjectsData} />}

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Active Deployments" 
          value={loading ? '-' : activeDeployments.toString()} 
          icon="cloud" 
          trend={{ value: 100, direction: 'up' }}
          isLoading={loading}
        />
        <StatCard 
          title="Avg CO₂ Intensity" 
          value={loading ? '-' : `${stats?.avgCo2Kg || 0} g/kWh`} 
          icon="co2" 
          trend={{ value: 1.4, direction: 'down' }}
          isLoading={loading}
        />
        <StatCard 
          title="Carbon Saved" 
          value={loading ? '-' : `${stats?.avgCo2Kg ? (stats.avgCo2Kg * 0.1).toFixed(1) : 0} kg`} 
          icon="eco" 
          trend={{ value: 8.7, direction: 'up' }}
          isLoading={loading}
        />
        <StatCard 
          title="System Health" 
          value={loading ? '-' : '99.9%'} 
          icon="monitor_heart" 
          isLoading={loading}
        />
      </div>

      {/* Projects Section */}
      <div className="glass-card rounded-xl border border-outline-variant p-6 flex flex-col mt-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined">deployed_code</span>
            Connected Codebases
          </h2>
          <button onClick={() => router.push('/onboarding')} className="bg-primary hover:bg-primary-hover text-on-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Deploy Codebase
          </button>
        </div>
        
        {loading && projects.length === 0 ? (
          <div className="flex flex-col gap-3">
            {Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-16 w-full rounded-lg" />)}
          </div>
        ) : projects.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/50">
                  <th className="pb-3 text-sm font-medium text-on-surface-variant font-code">PROJECT ID</th>
                  <th className="pb-3 text-sm font-medium text-on-surface-variant font-code">NAME</th>
                  <th className="pb-3 text-sm font-medium text-on-surface-variant font-code">REGION</th>
                  <th className="pb-3 text-sm font-medium text-on-surface-variant font-code">STATUS</th>
                  <th className="pb-3 text-sm font-medium text-on-surface-variant font-code text-right">DEPLOYED</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id} className="border-b border-outline-variant/30 hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-4 text-sm text-on-surface-variant font-code truncate max-w-[120px]">{p.id}</td>
                    <td className="py-4 text-sm font-medium text-on-surface">{p.name}</td>
                    <td className="py-4 text-sm">
                      <span className="bg-surface-container border border-outline-variant text-on-surface-variant px-2 py-1 rounded text-xs">
                        {p.region}
                      </span>
                    </td>
                    <td className="py-4 text-sm">
                      <span className="flex items-center gap-1.5 text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                        Active
                      </span>
                    </td>
                    <td className="py-4 text-sm text-on-surface-variant text-right">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-surface-container-low/30 rounded-xl border border-dashed border-outline-variant">
            <div className="bg-surface-container p-4 rounded-full mb-4">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant">rocket_launch</span>
            </div>
            <h3 className="text-lg font-medium text-on-surface mb-2">No Deployments Found</h3>
            <p className="text-on-surface-variant text-sm max-w-md mb-6">
              Connect your codebase to start tracking carbon emissions, receive regional recommendations, and let AI optimize your infrastructure.
            </p>
            <button onClick={() => router.push('/onboarding')} className="bg-primary hover:bg-primary-hover text-on-primary px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg">
              Deploy Your First Codebase
            </button>
          </div>
        )}
      </div>

      {/* Floating Agent Chat */}
      <AgentChat />
    </div>
  );
}
