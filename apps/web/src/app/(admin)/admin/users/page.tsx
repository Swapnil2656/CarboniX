'use client';

import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { Skeleton } from '@/components/ui/Skeleton';
import { adminApi } from '@/services/api/endpoints';
import type { UsersResponse } from '@/types/admin';

export default function UsersPage() {
  const [data, setData] = useState<UsersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterCloud, setFilterCloud] = useState('All');
  const [filterRating, setFilterRating] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'BANNED'>('ALL');
  const [page, setPage] = useState(1);
  const pageSize = 20;
  
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await adminApi.getUsers(page, pageSize);
      setData(res);
    } catch (err) {
      console.error(err);
      setError('Failed: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const getRatingVariant = (co2: number) => {
    if (co2 < 50) return 'success';
    if (co2 < 150) return 'warning';
    if (co2 < 300) return 'error';
    return 'critical';
  };

  const filteredUsers = data?.users?.filter((user) => {
    if (filterCloud !== 'All' && user.cloud !== filterCloud) return false;
    if (statusFilter !== 'ALL' && user.status !== statusFilter) return false;
    
    if (filterRating !== 'All') {
      const rating = getRatingVariant(user.avgCo2KgPerHour);
      if (filterRating === 'Low' && rating !== 'success') return false;
      if (filterRating === 'Medium' && rating !== 'warning') return false;
      if (filterRating === 'High' && rating !== 'error') return false;
      if (filterRating === 'Critical' && rating !== 'critical') return false;
    }
    return true;
  }) || [];

  const totalPages = data ? Math.ceil(data.total / data.pageSize) : 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-section-header text-on-surface">Users & Assets</h1>
          <p className="text-on-surface-variant mt-1">Manage infrastructure assets and monitor carbon thresholds.</p>
        </div>
        <button className="bg-primary text-on-primary hover:bg-primary-container px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Invite User
        </button>
      </div>

      {error && <ErrorBanner message={error} onRetry={fetchData} />}

      {/* Filter Bar & Summary */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between glass-card p-4 rounded-xl border border-outline-variant">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-on-surface-variant">Cloud:</span>
            <select 
              value={filterCloud}
              onChange={(e) => setFilterCloud(e.target.value)}
              className="bg-surface-container border border-outline-variant rounded-lg px-3 py-1.5 text-sm text-on-surface focus:outline-none focus:border-primary"
            >
              <option>All</option>
              <option>AWS</option>
              <option>GCP</option>
              <option>Azure</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-on-surface-variant">Rating:</span>
            <select 
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="bg-surface-container border border-outline-variant rounded-lg px-3 py-1.5 text-sm text-on-surface focus:outline-none focus:border-primary"
            >
              <option>All</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>
          <div className="h-6 w-px bg-outline-variant mx-2 hidden sm:block"></div>
          <div className="flex bg-surface-container rounded-lg p-1 border border-outline-variant">
            <button 
              onClick={() => setStatusFilter('ALL')}
              className={`px-3 py-1 rounded shadow-sm text-sm font-medium transition-colors ${statusFilter === 'ALL' ? 'bg-surface text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              All
            </button>
            <button 
              onClick={() => setStatusFilter('ACTIVE')}
              className={`px-3 py-1 rounded shadow-sm text-sm font-medium transition-colors ${statusFilter === 'ACTIVE' ? 'bg-surface text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Active
            </button>
            <button 
              onClick={() => setStatusFilter('BANNED')}
              className={`px-3 py-1 rounded shadow-sm text-sm font-medium transition-colors ${statusFilter === 'BANNED' ? 'bg-surface text-on-surface' : 'text-on-surface-variant hover:text-on-surface'}`}
            >
              Banned
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-surface-container px-4 py-2 rounded-lg border border-outline-variant">
          <div className="text-sm text-on-surface-variant">Fleet Avg:</div>
          <div className="text-lg font-semibold text-primary">124 kg/h</div>
          <div className="flex items-center text-xs font-medium text-[#50FA7B]">
            <span className="material-symbols-outlined text-[14px]">trending_down</span>
            2.4%
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="glass-card rounded-xl border border-outline-variant overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="px-6 py-4 text-xs font-label-caps text-on-surface-variant">Device / User</th>
                <th className="px-6 py-4 text-xs font-label-caps text-on-surface-variant">Location</th>
                <th className="px-6 py-4 text-xs font-label-caps text-on-surface-variant">Provider</th>
                <th className="px-6 py-4 text-xs font-label-caps text-on-surface-variant">Avg CO₂</th>
                <th className="px-6 py-4 text-xs font-label-caps text-on-surface-variant">Calculations</th>
                <th className="px-6 py-4 text-xs font-label-caps text-on-surface-variant">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {loading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4"><Skeleton className="h-8 w-32" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-24" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-20" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-16" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-24" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-16" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-6" /></td>
                  </tr>
                ))
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-surface-container-low transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-code text-sm text-on-surface">{user.deviceId}</span>
                        <span className="text-xs text-on-surface-variant">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{user.countryCode === 'US' ? '🇺🇸' : user.countryCode === 'IN' ? '🇮🇳' : user.countryCode === 'EU' ? '🇪🇺' : '🌐'}</span>
                        <span className="text-sm text-on-surface">{user.country}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-on-surface">{user.cloud}</span>
                        <span className="text-xs text-on-surface-variant">{user.region}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={getRatingVariant(user.avgCo2KgPerHour)}>
                        {user.avgCo2KgPerHour} kg
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-on-surface font-code">
                      {user.calculationsOps}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={user.status === 'ACTIVE' ? 'success' : 'error'}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-on-surface-variant">
                    No users or assets found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-outline-variant flex items-center justify-between bg-surface-container-lowest">
          <span className="text-sm text-on-surface-variant">
            Showing {filteredUsers.length} of {data?.total || 0} results
          </span>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1 rounded bg-surface border border-outline-variant text-on-surface-variant hover:text-on-surface disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            
            <button className="px-3 py-1 rounded bg-[rgba(245,197,24,0.1)] text-primary border border-primary font-medium text-sm">
              {page}
            </button>
            
            {page < totalPages && (
              <button 
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 rounded bg-surface border border-outline-variant text-on-surface hover:bg-surface-container font-medium text-sm"
              >
                {page + 1}
              </button>
            )}
            
            {page < totalPages - 1 && (
              <span className="px-2 text-on-surface-variant">...</span>
            )}
            
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
              className="p-1 rounded bg-surface border border-outline-variant text-on-surface-variant hover:text-on-surface disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <h2 className="text-lg font-semibold text-on-surface mt-4">Fleet Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-xl border border-outline-variant">
          <h3 className="text-sm font-label-caps text-on-surface-variant mb-4">Asset Distribution</h3>
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex justify-between text-xs mb-1"><span className="text-on-surface">Compute</span><span className="text-outline">65%</span></div>
              <div className="w-full h-1.5 bg-surface-container rounded-full"><div className="h-full bg-primary rounded-full" style={{width: '65%'}}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1"><span className="text-on-surface">Storage</span><span className="text-outline">25%</span></div>
              <div className="w-full h-1.5 bg-surface-container rounded-full"><div className="h-full bg-tertiary rounded-full" style={{width: '25%'}}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1"><span className="text-on-surface">Network</span><span className="text-outline">10%</span></div>
              <div className="w-full h-1.5 bg-surface-container rounded-full"><div className="h-full bg-secondary rounded-full" style={{width: '10%'}}></div></div>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-6 rounded-xl border border-outline-variant flex flex-col justify-center items-center text-center">
          <span className="material-symbols-outlined text-[32px] text-[#E8904A] mb-2">warning</span>
          <h3 className="text-lg font-semibold text-on-surface mb-1">3 Anomalies Detected</h3>
          <p className="text-sm text-on-surface-variant mb-3">Spike in eu-central-1 compute instances over last 4 hours.</p>
          <button className="text-sm text-primary hover:underline font-medium">View Details</button>
        </div>

        <div className="glass-card p-6 rounded-xl border border-outline-variant flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[rgba(80,250,123,0.1)] flex items-center justify-center text-[#50FA7B] border border-[#50FA7B]/30 mb-3">
            <span className="material-symbols-outlined text-[32px]">check_circle</span>
          </div>
          <h3 className="text-lg font-semibold text-on-surface mb-1">System Healthy</h3>
          <p className="text-sm text-on-surface-variant">All telemetry agents reporting normally.</p>
        </div>
      </div>
    </div>
  );
}
