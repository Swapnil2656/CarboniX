'use client';

import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { Skeleton } from '@/components/ui/Skeleton';
import { SdkConnectionBanner } from '@/components/admin/SdkConnectionBanner';
import { adminApi, carbonApi } from '@/services/api/endpoints';
import type { EmissionsResponse, EmissionRecord } from '@/types/admin';

function LockedStatCard({ title, valueSuffix = '' }: { title: string; valueSuffix?: string }) {
  return (
    <div className="bg-surface border border-outline-variant rounded-xl p-5 relative overflow-hidden">
      <div className="absolute inset-0 bg-surface-container/80 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center gap-2">
        <span className="material-symbols-outlined text-2xl text-amber-500">lock</span>
      </div>
      <div className="text-sm font-label-caps text-on-surface-variant mb-2 opacity-30">{title}</div>
      <div className="text-3xl font-display font-semibold text-on-surface opacity-30 font-mono">
        0{valueSuffix}
      </div>
    </div>
  );
}

export default function EmissionsPage() {
  const [data, setData] = useState<EmissionsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filterProvider, setFilterProvider] = useState('All');
  const [filterRegion, setFilterRegion] = useState('All');
  const [filterProject, setFilterProject] = useState('All');

  // Actions State
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [migratingId, setMigratingId] = useState<string | null>(null);
  const [manualMigrateModal, setManualMigrateModal] = useState<{ open: boolean; record: EmissionRecord | null; targetRegion: string }>({ open: false, record: null, targetRegion: '' });
  
  // Keep local modifications to records without needing a full re-fetch
  const [localRecords, setLocalRecords] = useState<EmissionRecord[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await adminApi.getEmissions(filterProvider, filterRegion, filterProject);
      setData(res);
      setLocalRecords(res.records || []);
    } catch (err) {
      console.error(err);
      setError('Failed: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterProvider, filterRegion, filterProject]);

  const handleAnalyze = async (record: EmissionRecord) => {
    setAnalyzingId(record.id);
    try {
      const payload = {
        projectName: record.instanceName || 'CarboniX',
        instanceType: record.instanceType,
        provider: record.provider,
        region: record.region,
        cpuUtilization: record.cpuUtilization,
        storageGb: 20
      };
      const res = await carbonApi.recommend(payload);
      
      setLocalRecords((prev) => 
        prev.map((r) => {
          if (r.id === record.id) {
            const recObj = res.data?.recommended;
            const recMessage = recObj 
              ? `AI: ${recObj.message || `Move to ${recObj.region}`}` 
              : 'Already in an optimal region.';
            return {
              ...r,
              recommendation: recMessage,
              _recommendedRegion: recObj?.region,
              _recommendedCarbonKg: recObj?.projectedCarbonKg
            };
          }
          return r;
        })
      );
    } catch (err) {
      console.error(err);
      setError('Failed to analyze: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setAnalyzingId(null);
    }
  };

  const handleAutoMigrate = async (recordId: string, targetRegion: string) => {
    setMigratingId(recordId);
    try {
      await adminApi.migrateEmission(recordId, targetRegion);
      setLocalRecords((prev) => 
        prev.map((r) => {
          if (r.id === recordId) {
            return {
              ...r,
              region: targetRegion,
              carbonKg: r._recommendedCarbonKg || (r.carbonKg * 0.7),
              isOptimized: true,
              recommendation: 'Optimized via Auto Migrate',
              _recommendedRegion: undefined
            };
          }
          return r;
        })
      );
    } catch (err) {
      console.error(err);
      setError('Migration failed: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setMigratingId(null);
    }
  };

  const isConnected = data?.isSdkConnected !== false;

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-section-header text-on-surface">Resource Emissions</h1>
          <p className="text-on-surface-variant mt-1">Granular view of actual cloud infrastructure emissions and resource utilization.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <select
            className="bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-sm text-on-surface outline-none focus:border-primary disabled:opacity-50"
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
            disabled={!isConnected}
          >
            <option value="All">All Codebases</option>
            {data?.projects?.map((p: any) => (
              <option key={p.id} value={p.id}>
                {p.name} {p.sdkConnected ? '' : '(Awaiting SDK)'}
              </option>
            ))}
          </select>

          <select
            className="bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-sm text-on-surface outline-none focus:border-primary disabled:opacity-50"
            value={filterProvider}
            onChange={(e) => setFilterProvider(e.target.value)}
            disabled={!isConnected}
          >
            <option value="All">All Providers</option>
            <option value="AWS">AWS</option>
            <option value="GCP">GCP</option>
            <option value="AZURE">Azure</option>
          </select>
          
          <select
            className="bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-sm text-on-surface outline-none focus:border-primary disabled:opacity-50"
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
            disabled={!isConnected}
          >
            <option value="All">All Regions</option>
            <option value="ap-south-1">ap-south-1</option>
            <option value="us-east-1">us-east-1</option>
            <option value="eu-north-1">eu-north-1</option>
          </select>
        </div>
      </div>

      {error && <ErrorBanner message={error} />}

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {!isConnected ? (
          <>
            <LockedStatCard title="TRACKED RESOURCES" />
            <LockedStatCard title="WASTED CARBON" valueSuffix=" KG" />
            <LockedStatCard title="IDLE INSTANCES" />
            <LockedStatCard title="OVERSIZED INSTANCES" />
          </>
        ) : (
          <>
            <div className="bg-surface border border-outline-variant rounded-xl p-5">
              <div className="text-sm font-label-caps text-on-surface-variant mb-2">TRACKED RESOURCES</div>
              <div className="text-3xl font-display font-semibold text-on-surface">
                {loading ? <Skeleton className="h-8 w-16" /> : data?.metrics.totalInstances || 0}
              </div>
            </div>
            
            <div className="bg-surface border border-outline-variant rounded-xl p-5 relative overflow-hidden">
              <div className="text-sm font-label-caps text-on-surface-variant mb-2">WASTED CARBON</div>
              <div className="text-3xl font-display font-semibold text-error font-mono">
                {loading ? <Skeleton className="h-8 w-24" /> : `${data?.metrics.wastedCarbonKg.toFixed(1) || 0} KG`}
              </div>
            </div>

            <div className="bg-surface border border-outline-variant rounded-xl p-5">
              <div className="text-sm font-label-caps text-on-surface-variant mb-2">IDLE INSTANCES</div>
              <div className="text-3xl font-display font-semibold text-error">
                {loading ? <Skeleton className="h-8 w-16" /> : data?.metrics.idleInstances || 0}
              </div>
              <p className="text-xs text-on-surface-variant mt-1">&lt; 5% CPU Utilization</p>
            </div>
            
            <div className="bg-surface border border-outline-variant rounded-xl p-5">
              <div className="text-sm font-label-caps text-on-surface-variant mb-2">OVERSIZED INSTANCES</div>
              <div className="text-3xl font-display font-semibold text-warning">
                {loading ? <Skeleton className="h-8 w-16" /> : data?.metrics.oversizedInstances || 0}
              </div>
              <p className="text-xs text-on-surface-variant mt-1">&lt; 20% CPU Utilization</p>
            </div>
          </>
        )}
      </div>

      {/* Main Table */}
      <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden relative">
        {!isConnected && (
          <div className="absolute inset-0 bg-surface-container/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center">
            <span className="material-symbols-outlined text-3xl text-amber-500 mb-2">lock</span>
            <span className="text-sm text-on-surface font-medium">Connect SDK to view resources</span>
          </div>
        )}
        <div className={`overflow-x-auto ${!isConnected ? 'opacity-30 pointer-events-none' : ''}`}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-low text-xs font-label-caps text-on-surface-variant">
                <th className="py-3 px-4">Instance / Resource</th>
                <th className="py-3 px-4">Provider / Region</th>
                <th className="py-3 px-4 text-right">CPU Util</th>
                <th className="py-3 px-4 text-right">Carbon (kg)</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 w-64">AI Recommendation</th>
                <th className="py-3 px-4 text-right w-48">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-outline-variant">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="hover:bg-surface-container/50 transition-colors">
                    <td className="py-4 px-4"><Skeleton className="h-5 w-32" /></td>
                    <td className="py-4 px-4"><Skeleton className="h-5 w-24" /></td>
                    <td className="py-4 px-4 text-right"><Skeleton className="h-5 w-12 ml-auto" /></td>
                    <td className="py-4 px-4 text-right"><Skeleton className="h-5 w-16 ml-auto" /></td>
                    <td className="py-4 px-4 text-center"><Skeleton className="h-6 w-20 mx-auto rounded-full" /></td>
                    <td className="py-4 px-4"><Skeleton className="h-10 w-full" /></td>
                    <td className="py-4 px-4"><Skeleton className="h-8 w-20 ml-auto" /></td>
                  </tr>
                ))
              ) : localRecords.length > 0 ? (
                localRecords.map((record: any) => (
                  <tr key={record.id} className="hover:bg-surface-container/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-medium text-on-surface">{record.instanceName || record.instanceId}</div>
                      <div className="text-xs text-on-surface-variant font-mono mt-0.5">{record.instanceType}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-on-surface">{record.provider}</span>
                      </div>
                      <div className="text-xs text-on-surface-variant mt-0.5">{record.region}</div>
                    </td>
                    <td className="py-4 px-4 text-right font-mono text-on-surface">
                      {Math.round(record.cpuUtilization * 100)}%
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-mono font-medium text-on-surface">{record.carbonKg.toFixed(2)}</span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {record.isIdle ? (
                        <Badge variant="error" className="uppercase text-[10px]">IDLE</Badge>
                      ) : record.isOversized ? (
                        <Badge variant="warning" className="uppercase text-[10px]">OVERSIZED</Badge>
                      ) : (
                        <Badge variant="success" className="uppercase text-[10px]">OPTIMAL</Badge>
                      )}
                    </td>
                    <td className="py-4 px-4 text-xs text-on-surface-variant leading-relaxed">
                      {record.recommendation || '-'}
                      {record._recommendedRegion && (
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() => handleAutoMigrate(record.id, record._recommendedRegion)}
                            disabled={migratingId === record.id}
                            className="bg-primary/10 text-primary hover:bg-primary/20 px-2 py-1 rounded text-[10px] font-semibold transition-colors disabled:opacity-50 flex items-center gap-1"
                          >
                            {migratingId === record.id ? (
                              <><span className="material-symbols-outlined text-[12px] animate-spin">refresh</span> Migrating...</>
                            ) : (
                              'Auto Migrate'
                            )}
                          </button>
                          <button
                            onClick={() => setManualMigrateModal({ open: true, record, targetRegion: record._recommendedRegion })}
                            className="border border-outline-variant text-on-surface-variant hover:bg-surface-container px-2 py-1 rounded text-[10px] font-semibold transition-colors"
                          >
                            Manual
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => handleAnalyze(record)}
                        disabled={analyzingId === record.id || !!record._recommendedRegion}
                        className="bg-surface-container border border-outline-variant hover:border-primary text-xs text-on-surface px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ml-auto disabled:opacity-50"
                      >
                        {analyzingId === record.id ? (
                          <span className="material-symbols-outlined text-[14px] animate-spin">refresh</span>
                        ) : (
                          <span className="material-symbols-outlined text-[14px]">psychiatry</span>
                        )}
                        Analyze
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-on-surface-variant">
                    {isConnected ? 'No emission records found matching the current filters.' : 'Waiting for SDK data...'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Migrate Modal */}
      {manualMigrateModal.open && manualMigrateModal.record && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-outline-variant rounded-xl max-w-2xl w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setManualMigrateModal({ open: false, record: null, targetRegion: '' })}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h2 className="text-xl font-display font-semibold text-on-surface mb-2">Manual Migration Instructions</h2>
            <p className="text-on-surface-variant text-sm mb-6">
              To manually migrate this {manualMigrateModal.record.provider} instance from <strong>{manualMigrateModal.record.region}</strong> to <strong>{manualMigrateModal.targetRegion}</strong>, update your Infrastructure-as-Code definitions. Here is the generated Terraform patch:
            </p>
            
            <div className="bg-[#1e1e2e] rounded-lg p-4 font-mono text-sm overflow-x-auto text-[#a6accd]">
              <div className="text-red-400">- region = "{manualMigrateModal.record.region}"</div>
              <div className="text-green-400">+ region = "{manualMigrateModal.targetRegion}"</div>
              <br/>
              <div className="text-[#89ddff]">resource</div> <div className="text-[#c792ea]">"aws_instance"</div> <div className="text-[#c3e88d]">"{manualMigrateModal.record.instanceName || 'app_server'}"</div> {'{'}
              <div className="pl-4">
                ami           <span className="text-[#89ddff]">=</span> <span className="text-[#c3e88d]">"ami-1234567890"</span><br/>
                instance_type <span className="text-[#89ddff]">=</span> <span className="text-[#c3e88d]">"{manualMigrateModal.record.instanceType}"</span><br/>
                <br/>
                <span className="text-[#676e95] italic"># Ensure your load balancers are updated to route to the new region before destroying the old instance.</span>
              </div>
              {'}'}
            </div>

            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => setManualMigrateModal({ open: false, record: null, targetRegion: '' })}
                className="bg-primary text-on-primary px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
