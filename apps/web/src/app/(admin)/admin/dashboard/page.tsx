'use client';

import React, { useEffect, useState } from 'react';
import { StatCard } from '@/components/ui/StatCard';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { Skeleton } from '@/components/ui/Skeleton';
import { adminApi } from '@/services/api/endpoints';
import type { DashboardData, LiveApiEvent } from '@/types/admin';

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await adminApi.getDashboard();
      setData(res);
    } catch (err) {
      console.error(err);
      setError('Failed to load dashboard data. The backend endpoint might not be wired up yet.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-section-header text-on-surface">Dashboard</h1>
          <p className="text-on-surface-variant mt-1">Platform overview and real-time telemetry.</p>
        </div>
        <button className="flex items-center gap-2 bg-surface-container hover:bg-surface-container-high px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-outline-variant">
          <span className="material-symbols-outlined text-[18px]">download</span>
          Export Report
        </button>
      </div>

      {error && (
        <ErrorBanner message={error} onRetry={fetchData} />
      )}

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total API Calls" 
          value={data ? data.totalApiCalls.toLocaleString() : '0'} 
          icon="api" 
          trend={{ value: 12.5, direction: 'up' }}
          isLoading={loading}
        />
        <StatCard 
          title="Active Sessions" 
          value={data ? data.activeSessions.toLocaleString() : '0'} 
          icon="sensors" 
          trend={{ value: 3.2, direction: 'up' }}
          isLoading={loading}
        />
        <StatCard 
          title="Avg CO₂ Intensity" 
          value={data ? `${data.avgCo2Kg} g/kWh` : '0 g/kWh'} 
          icon="co2" 
          trend={{ value: 1.4, direction: 'down' }}
          isLoading={loading}
        />
        <StatCard 
          title="SDK Installs" 
          value={data ? data.sdkInstalls.toLocaleString() : '0'} 
          icon="download" 
          trend={{ value: 8.7, direction: 'up' }}
          isLoading={loading}
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card rounded-xl border border-outline-variant p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-on-surface">API Calls Over Time</h2>
            <div className="flex items-center gap-2 text-xs font-medium bg-surface-container rounded-lg p-1">
              <button className="px-3 py-1 rounded bg-surface border border-outline-variant text-on-surface shadow-sm">24h</button>
              <button className="px-3 py-1 rounded text-on-surface-variant hover:text-on-surface">7d</button>
              <button className="px-3 py-1 rounded text-on-surface-variant hover:text-on-surface">30d</button>
            </div>
          </div>
          <div className="flex-1 min-h-[250px] relative">
            {loading ? (
              <Skeleton className="w-full h-full" />
            ) : data && data.apiCallsOverTime && data.apiCallsOverTime.length > 0 ? (
              <div className="absolute inset-0 flex items-end gap-2 px-2 chart-container">
                {data.apiCallsOverTime.map((pt, i) => {
                  const max = Math.max(...data.apiCallsOverTime.map(d => d.calls));
                  const height = `${(pt.calls / max) * 100}%`;
                  return (
                    <div key={i} className="flex-1 flex flex-col justify-end group">
                      <div 
                        className="w-full bg-primary/20 hover:bg-primary transition-colors rounded-t-sm"
                        style={{ height }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant text-sm">
                No data available
              </div>
            )}
          </div>
        </div>

        <div className="glass-card rounded-xl border border-outline-variant p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-on-surface mb-6">Top Endpoints</h2>
          <div className="flex-1 flex flex-col gap-4">
            {loading ? (
              Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)
            ) : data && data.topEndpoints && data.topEndpoints.length > 0 ? (
              data.topEndpoints.map((ep, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-on-surface">{ep.path}</span>
                    <span className="text-on-surface-variant">{ep.calls.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${(ep.calls / data.topEndpoints[0].calls) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex-1 flex items-center justify-center text-on-surface-variant text-sm">
                No data available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LiveStream loading={loading} initialData={data?.liveApiStream || []} />

        <div className="glass-card rounded-xl border border-outline-variant p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-on-surface mb-6">Provider Distribution</h2>
          <div className="flex-1 flex items-center justify-center relative">
            {loading ? (
              <Skeleton className="w-48 h-48 rounded-full" />
            ) : data && data.providerDistribution && data.providerDistribution.length > 0 ? (
              <div className="relative w-48 h-48">
                {/* Mocked Donut Chart */}
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#231f15" strokeWidth="16" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f5c518" strokeWidth="16" strokeDasharray={`${data.providerDistribution.find(d => d.provider === 'AWS')?.percent || 45} 100`} />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#49dbff" strokeWidth="16" strokeDasharray={`${data.providerDistribution.find(d => d.provider === 'GCP')?.percent || 35} 100`} strokeDashoffset={`-${data.providerDistribution.find(d => d.provider === 'AWS')?.percent || 45}`} />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#4ade80" strokeWidth="16" strokeDasharray={`${data.providerDistribution.find(d => d.provider === 'Azure')?.percent || 20} 100`} strokeDashoffset={`-${(data.providerDistribution.find(d => d.provider === 'AWS')?.percent || 45) + (data.providerDistribution.find(d => d.provider === 'GCP')?.percent || 35)}`} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-on-surface">100%</span>
                  <span className="text-xs text-on-surface-variant font-label-caps">Total</span>
                </div>
              </div>
            ) : (
              <div className="text-on-surface-variant text-sm">No data available</div>
            )}
          </div>
          {data && data.providerDistribution && !loading && (
            <div className="flex justify-center gap-6 mt-4">
              {data.providerDistribution.map((p, i) => {
                const colors = { AWS: 'bg-[#f5c518]', GCP: 'bg-[#49dbff]', Azure: 'bg-[#4ade80]' };
                return (
                  <div key={i} className="flex items-center gap-2 text-sm font-medium text-on-surface-variant">
                    <div className={`w-3 h-3 rounded-full ${colors[p.provider]}`}></div>
                    {p.provider} ({p.percent}%)
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Separate component for Live Stream to handle its own polling interval
function LiveStream({ loading, initialData }: { loading: boolean, initialData: LiveApiEvent[] }) {
  const [stream, setStream] = useState<LiveApiEvent[]>(initialData);

  useEffect(() => {
    if (initialData.length > 0) {
      setStream(initialData);
    }
  }, [initialData]);

  // Polling simulation if no backend
  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      const methods: LiveApiEvent['method'][] = ['GET', 'POST', 'PUT', 'DELETE'];
      const endpoints = ['/v1/carbon/calculate', '/v1/agents/runs', '/v1/reference/regions', '/v1/users/profile'];
      
      const newEvent: LiveApiEvent = {
        timestamp: new Date().toISOString(),
        method: methods[Math.floor(Math.random() * methods.length)],
        endpoint: endpoints[Math.floor(Math.random() * endpoints.length)],
        status: Math.random() > 0.9 ? 500 : (Math.random() > 0.8 ? 404 : 200),
        latencyMs: Math.floor(Math.random() * 500) + 20,
      };

      setStream(prev => [newEvent, ...prev].slice(0, 5)); // Keep last 5
    }, 10000); // 10s poll

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <div className="glass-card rounded-xl border border-outline-variant p-6 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-on-surface flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
          Live API Stream
        </h2>
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface/90 pointer-events-none z-10"></div>
        {loading ? (
          <div className="flex flex-col gap-3">
            {Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
          </div>
        ) : stream.length > 0 ? (
          <div className="flex flex-col gap-3">
            {stream.map((event, i) => (
              <div key={event.timestamp + i} className="flex items-center gap-4 bg-surface-container-low px-4 py-3 rounded-lg border border-surface-container-high text-sm font-code animate-fade-in">
                <span className="text-outline w-16">{new Date(event.timestamp).toLocaleTimeString([], { hour12: false })}</span>
                <span className={`w-12 font-bold ${
                  event.method === 'GET' ? 'text-[#49dbff]' : 
                  event.method === 'POST' ? 'text-[#4ade80]' : 
                  event.method === 'DELETE' ? 'text-[#ffb4ab]' : 'text-[#f5c518]'
                }`}>{event.method}</span>
                <span className="flex-1 text-on-surface-variant truncate">{event.endpoint}</span>
                <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                  event.status === 200 ? 'bg-[rgba(74,222,128,0.1)] text-[#4ade80]' : 'bg-[rgba(248,113,113,0.1)] text-[#f87171]'
                }`}>{event.status}</span>
                <span className="text-outline w-16 text-right">{event.latencyMs}ms</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-on-surface-variant text-sm">
            Waiting for events...
          </div>
        )}
      </div>
    </div>
  );
}
