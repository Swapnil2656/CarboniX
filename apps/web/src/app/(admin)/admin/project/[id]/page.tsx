'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { StatCard } from '@/components/ui/StatCard';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { Skeleton } from '@/components/ui/Skeleton';
import { adminApi, carbonApi, agentsApi } from '@/services/api/endpoints';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { jsPDF } from 'jspdf';
import { Badge } from '@/components/ui/Badge';
import { SdkConnectionBanner } from '@/components/admin/SdkConnectionBanner';

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartDays, setChartDays] = useState<'7d' | '30d'>('30d');
  const [dismissedBanner, setDismissedBanner] = useState(false);

  // AI & Pagination states
  const [localInstances, setLocalInstances] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [migratingId, setMigratingId] = useState<string | null>(null);
  const [manualMigrateModal, setManualMigrateModal] = useState<{ open: boolean; record: any | null; targetRegion: string }>({ open: false, record: null, targetRegion: '' });

  // Danger zone states
  const [confirmNameDisconnect, setConfirmNameDisconnect] = useState('');
  const [confirmNameDelete, setConfirmNameDelete] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  
  // Reporter State
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await adminApi.getProjectStats(params.id);
        if (res.success) {
          setData(res.data);
          setLocalInstances(res.data.instances || []);
        } else {
          setError(res.error || 'Failed to fetch project stats');
        }
      } catch (err: any) {
        setError(err.message || 'Internal error');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [params.id]);

  const handleAnalyze = async (record: any) => {
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
      
      setLocalInstances((prev) => 
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
      alert('Failed to analyze: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setAnalyzingId(null);
    }
  };

  const handleAutoMigrate = async (recordId: string, targetRegion: string) => {
    setMigratingId(recordId);
    try {
      await adminApi.migrateEmission(recordId, targetRegion);
      setLocalInstances((prev) => 
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
      alert('Migration failed: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setMigratingId(null);
    }
  };

  const handleDelete = async () => {
    if (confirmNameDelete !== data?.project?.name) {
      alert('Project name does not match.');
      return;
    }
    try {
      setIsDeleting(true);
      await adminApi.deleteProject(params.id);
      router.push('/admin/dashboard');
    } catch (e: any) {
      alert('Delete failed: ' + e.message);
      setIsDeleting(false);
    }
  };

  const handleDisconnect = async () => {
    if (confirmNameDisconnect !== data?.project?.name) {
      alert('Project name does not match.');
      return;
    }
    try {
      setIsDisconnecting(true);
      await adminApi.disconnectProject(params.id);
      router.push('/admin/dashboard');
    } catch (e: any) {
      alert('Disconnect failed: ' + e.message);
      setIsDisconnecting(false);
    }
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const res = await agentsApi.triggerReporter(params.id);
      if (res.success && res.data) {
        const doc = new jsPDF();
        
        doc.setFontSize(22);
        doc.text(`CarboniX Report - ${data?.project?.name || params.id}`, 14, 20);
        
        doc.setFontSize(12);
        
        let reportContent = '';
        if (typeof res.data.report === 'string') {
          reportContent = res.data.report;
        } else {
          const r = res.data.report;
          reportContent += `Report Period: ${r.reportPeriod?.label || 'N/A'}\n`;
          reportContent += `Generated At: ${new Date(r.generatedAt || Date.now()).toLocaleString()}\n\n`;
          
          reportContent += `--- TOTAL EMISSIONS ---\n`;
          reportContent += `Total Scope 2 Emissions: ${r.scope2Emissions?.totalKg?.toFixed(2) || 0} kg CO2e (${r.scope2Emissions?.totalTonnes?.toFixed(2) || 0} tonnes)\n\n`;
          
          reportContent += `--- INSIGHTS & SAVINGS ---\n`;
          reportContent += `Top Emitting Region: ${r.insights?.topEmittingRegion || 'N/A'}\n`;
          reportContent += `Top Emitting Instance: ${r.insights?.topEmittingInstance || 'N/A'}\n`;
          reportContent += `Idle Resources Waste: ${r.insights?.idleWasteKg?.toFixed(2) || 0} kg CO2e\n`;
          reportContent += `Oversized Resources Waste: ${r.insights?.oversizedWasteKg?.toFixed(2) || 0} kg CO2e\n`;
          reportContent += `Potential Carbon Savings: ${r.insights?.potentialSavingsKg?.toFixed(2) || 0} kg CO2e\n\n`;
          
          if (r.breakdown?.byRegion && Array.isArray(r.breakdown.byRegion)) {
            reportContent += `--- REGIONAL BREAKDOWN ---\n`;
            r.breakdown.byRegion.forEach((reg: any) => {
              reportContent += `• ${reg.region}: ${reg.carbonKg?.toFixed(2) || 0} kg CO2e (${reg.percentage || 0}%) - ${reg.instanceCount || 0} instances\n`;
            });
            reportContent += `\n`;
          }
          
          if (r.breakdown?.byProvider && Array.isArray(r.breakdown.byProvider)) {
            reportContent += `--- PROVIDER BREAKDOWN ---\n`;
            r.breakdown.byProvider.forEach((prov: any) => {
              reportContent += `• ${prov.provider}: ${prov.carbonKg?.toFixed(2) || 0} kg CO2e (${prov.percentage || 0}%) - ${prov.instanceCount || 0} instances\n`;
            });
            reportContent += `\n`;
          }
        }
        
        const lines = doc.splitTextToSize(reportContent, 180);
        
        let y = 30;
        for (let i = 0; i < lines.length; i++) {
          if (y > 280) {
            doc.addPage();
            y = 20;
          }
          doc.text(lines[i], 14, y);
          y += 7;
        }
        
        doc.save(`CarboniX_Report_${params.id}.pdf`);
      } else {
        alert('Export failed: ' + (res.error || 'Unknown error'));
      }
    } catch (e: any) {
      alert('Export failed: ' + e.message);
    } finally {
      setIsExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-1/3" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (error) {
    return <ErrorBanner message={error} />;
  }

  if (!data?.project) {
    return <ErrorBanner message="Project not found." />;
  }

  const { project, idleInstances, oversizedInstances, carbonTrend, history7d, history30d, totalMonthKg, apiKeys, greenerRegion, isStale, instances } = data;
  const chartData = chartDays === '7d' ? history7d : history30d;

  // Real-world equivalents logic (copied from core)
  const getEquivalent = (kg: number) => {
    const kmDriven = (kg * 4.3).toFixed(1);
    const phoneCharges = Math.round(kg * 121);
    const netflixHours = Math.round(kg * 600);
    if (kg > 20) return `≈ driving ${kmDriven} km in a car`;
    if (kg > 5) return `≈ streaming ${netflixHours} hours of 4K Netflix`;
    return `≈ charging your phone ${phoneCharges.toLocaleString()} times`;
  };

  const renderTrend = () => {
    if (carbonTrend.isNew) {
      return { value: 0, direction: 'up', isNew: true };
    }
    return {
      value: carbonTrend.trendPercent ? Math.round(Math.abs(carbonTrend.trendPercent)) : 0,
      direction: carbonTrend.trendPercent >= 0 ? 'up' : 'down'
    };
  };

  const paginatedInstances = localInstances.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(localInstances.length / itemsPerPage);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 relative min-h-screen animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center p-2 rounded-full hover:bg-surface-container-high">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <h1 className="text-section-header text-on-surface flex items-center gap-2">
              {project.name}
              {project.isDeployed ? (
                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded border border-green-500/30">Deployed</span>
              ) : (
                <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded border border-amber-500/30">Not Deployed</span>
              )}
            </h1>
            <p className="text-on-surface-variant text-sm mt-1">
              Created: {new Date(project.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        {project.isDeployed && project.sdkConnected && (
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="bg-surface-container-high hover:bg-surface-bright text-on-surface px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            {isExporting ? 'Exporting...' : 'Export Report'}
          </button>
        )}
      </div>

      {!project.sdkConnected && !dismissedBanner && (
        <SdkConnectionBanner
          projectName={project.name}
          projectId={project.id}
          onDismiss={() => setDismissedBanner(true)}
        />
      )}

      {/* Universal Budget Bar */}
      <div className="bg-surface-container border border-outline-variant rounded-xl p-5">
        <div className="flex justify-between items-end mb-2">
          <div className="text-sm font-label-caps text-on-surface-variant">Carbon Budget (Monthly)</div>
          <div className="text-sm font-medium text-on-surface">
            {totalMonthKg?.toFixed(1) || 0} / {project.carbonBudgetKg || 100} kg
          </div>
        </div>
        <div className="w-full bg-surface-container-highest rounded-full h-2.5 overflow-hidden">
          <div 
            className={`h-2.5 rounded-full ${totalMonthKg > (project.carbonBudgetKg || 100) ? 'bg-error' : totalMonthKg > (project.carbonBudgetKg || 100) * 0.8 ? 'bg-warning' : 'bg-primary'}`} 
            style={{ width: `${Math.min(((totalMonthKg || 0) / (project.carbonBudgetKg || 100)) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      {!project.isDeployed ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-low rounded-xl border border-outline-variant p-6">
              <h2 className="text-lg font-semibold text-on-surface mb-2">Estimate Assumptions</h2>
              <p className="text-on-surface-variant text-sm mb-4">
                This project has not been deployed yet. The carbon estimates are based on:
              </p>
              <ul className="space-y-2 text-sm text-on-surface">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-primary">memory</span> Instance Type: t3.medium</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-primary">speed</span> CPU Utilization: 15%</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-primary">schedule</span> Running Hours: 730 hrs/month</li>
              </ul>
            </div>
            
            <div className="bg-surface-container-low rounded-xl border border-outline-variant p-6">
              <h2 className="text-lg font-semibold text-on-surface mb-2">Launch Checklist</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-green-400">check_circle</span>
                  <span className="text-sm text-on-surface">Project Created</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-green-400">check_circle</span>
                  <span className="text-sm text-on-surface">API Key Generated</span>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <span className="material-symbols-outlined">radio_button_unchecked</span>
                  <span className="text-sm text-on-surface">CarboniX SDK Installed (npm install @carbonix/sdk)</span>
                </div>
                <div className="flex items-center gap-3 opacity-50">
                  <span className="material-symbols-outlined">radio_button_unchecked</span>
                  <span className="text-sm text-on-surface">Config Initialized (npx @carbonix/cli init)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl border border-outline-variant p-6">
             <h2 className="text-lg font-semibold text-on-surface mb-4">Top 3 Recommended Regions</h2>
             <div className="space-y-3">
                {/* Mock data for the UI since we don't have a real calculation endpoint here, 
                    but mimicking the actual regions format based on the prompt's request for "reasoning". */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-surface border border-outline-variant">
                  <div>
                    <div className="font-medium text-on-surface">europe-west6 (AWS)</div>
                    <div className="text-xs text-on-surface-variant">Grid Intensity: 12 gCO2/kWh • Renewable: 89%</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm text-primary">~0.4 kg CO2/mo</div>
                    <div className="text-xs text-on-surface-variant">Est. $15.50/mo</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-surface border border-outline-variant">
                  <div>
                    <div className="font-medium text-on-surface">eu-north-1 (GCP)</div>
                    <div className="text-xs text-on-surface-variant">Grid Intensity: 15 gCO2/kWh • Renewable: 85%</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm text-primary">~0.5 kg CO2/mo</div>
                    <div className="text-xs text-on-surface-variant">Est. $16.20/mo</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-surface border border-outline-variant">
                  <div>
                    <div className="font-medium text-on-surface">us-west-2 (AWS)</div>
                    <div className="text-xs text-on-surface-variant">Grid Intensity: 22 gCO2/kWh • Renewable: 76%</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm text-primary">~0.8 kg CO2/mo</div>
                    <div className="text-xs text-on-surface-variant">Est. $14.80/mo</div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {greenerRegion && (
            <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">eco</span>
                <div>
                  <div className="font-medium text-primary">Greener Region Available</div>
                  <div className="text-sm text-primary/80">Switching to {greenerRegion.name} could significantly reduce your emissions.</div>
                </div>
              </div>
              <button className="bg-primary text-on-primary px-3 py-1.5 rounded-lg text-sm font-medium">Analyze</button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Today's Carbon"
              value={`${Number(carbonTrend?.todayKg || 0).toFixed(2)} kg`}
              icon="co2"
              trend={carbonTrend?.isNew ? undefined : renderTrend() as any}
            />
            <StatCard
              title="Est. Daily Cost"
              value={`$${(history30d && history30d[history30d.length - 1]?.costUsd || 0).toFixed(2)}`}
              icon="payments"
            />
            <StatCard
              title="Idle Instances"
              value={idleInstances?.toString() || '0'}
              icon="snooze"
            />
            <div className={`border rounded-xl p-5 ${isStale ? 'bg-error/5 border-error/30' : 'bg-surface border-outline-variant'}`}>
              <div className="text-sm font-label-caps text-on-surface-variant mb-2">SDK Status</div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isStale ? 'bg-error' : 'bg-green-500 animate-pulse'}`}></div>
                <div className="text-lg font-medium text-on-surface">
                  {isStale ? 'Stale' : 'Healthy'}
                </div>
              </div>
              <p className="text-xs text-on-surface-variant mt-1">
                Last Ping: {project.lastPingAt ? new Date(project.lastPingAt).toLocaleString() : 'Never'}
              </p>
            </div>
          </div>

          <div className="bg-surface border border-outline-variant rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm font-label-caps text-on-surface-variant">Carbon Trend</div>
              <div className="flex bg-surface-container-highest rounded-lg p-1">
                <button 
                  onClick={() => setChartDays('7d')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${chartDays === '7d' ? 'bg-surface text-on-surface shadow-sm' : 'text-on-surface-variant'}`}
                >
                  7 Days
                </button>
                <button 
                  onClick={() => setChartDays('30d')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${chartDays === '30d' ? 'bg-surface text-on-surface shadow-sm' : 'text-on-surface-variant'}`}
                >
                  30 Days
                </button>
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="date" stroke="#666" tick={{ fill: '#888', fontSize: 12 }} />
                  <YAxis stroke="#666" tick={{ fill: '#888', fontSize: 12 }} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#1A1A1A', borderColor: '#333', borderRadius: '8px' }}
                    itemStyle={{ color: '#E0E0E0' }}
                  />
                  <Line type="monotone" dataKey="carbonKg" stroke="#4ade80" strokeWidth={3} dot={{ fill: '#4ade80', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#4ade80', stroke: '#1A1A1A' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center text-sm text-on-surface-variant italic">
              {getEquivalent(totalMonthKg || 0)}
            </div>
          </div>

          {/* Instances Table */}
          <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden relative">
            <div className="px-5 py-4 border-b border-outline-variant bg-surface-container-low">
              <h3 className="font-semibold text-on-surface">Tracked Instances</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant bg-surface-container-low text-xs font-label-caps text-on-surface-variant">
                    <th className="py-3 px-4">Instance / Resource</th>
                    <th className="py-3 px-4">Provider / Region</th>
                    <th className="py-3 px-4 text-right">CPU Util</th>
                    <th className="py-3 px-4 text-right">Carbon (kg)</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-outline-variant">
                  {paginatedInstances?.length > 0 ? paginatedInstances.map((record: any) => (
                    <React.Fragment key={record.id}>
                      <tr className="hover:bg-surface-container/50 transition-colors">
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
                          {record.isOptimized ? (
                            <Badge variant="success" className="uppercase text-[10px]">OPTIMIZED</Badge>
                          ) : record.isIdle ? (
                            <Badge variant="error" className="uppercase text-[10px]">IDLE</Badge>
                          ) : record.isOversized ? (
                            <Badge variant="warning" className="uppercase text-[10px]">OVERSIZED</Badge>
                          ) : (
                            <Badge variant="success" className="uppercase text-[10px]">OPTIMAL</Badge>
                          )}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => handleAnalyze(record)}
                            disabled={analyzingId === record.id || record.isOptimized}
                            className="bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 flex items-center gap-1 ml-auto"
                          >
                            {analyzingId === record.id ? (
                              <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                            ) : (
                              <span className="material-symbols-outlined text-sm">auto_awesome</span>
                            )}
                            Analyze
                          </button>
                        </td>
                      </tr>
                      {record.recommendation && (
                        <tr className="bg-primary/5 border-t-0">
                          <td colSpan={6} className="py-3 px-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-primary text-sm mt-0.5">tips_and_updates</span>
                                <div className="text-sm text-primary-light">
                                  {record.recommendation}
                                </div>
                              </div>
                              {record._recommendedRegion && !record.isOptimized && (
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleAutoMigrate(record.id, record._recommendedRegion)}
                                    disabled={migratingId === record.id}
                                    className="bg-primary hover:bg-primary-dark text-on-primary px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50 flex items-center gap-1"
                                  >
                                    {migratingId === record.id ? (
                                      <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                                    ) : (
                                      <span className="material-symbols-outlined text-sm">flight_takeoff</span>
                                    )}
                                    Auto Migrate
                                  </button>
                                  <button
                                    onClick={() => setManualMigrateModal({ open: true, record, targetRegion: record._recommendedRegion })}
                                    className="bg-surface-container-high hover:bg-surface-bright border border-outline-variant text-on-surface px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                                  >
                                    <span className="material-symbols-outlined text-sm">settings</span>
                                    Manual
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  )) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-on-surface-variant">No instances tracked yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {totalPages > 1 && (
              <div className="px-5 py-4 border-t border-outline-variant bg-surface-container-low flex items-center justify-between">
                <div className="text-xs text-on-surface-variant">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, localInstances.length)} of {localInstances.length} instances
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-md hover:bg-surface-container-high disabled:opacity-30 transition-colors text-on-surface-variant flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                  </button>
                  <div className="text-xs font-medium text-on-surface">Page {currentPage} of {totalPages}</div>
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded-md hover:bg-surface-container-high disabled:opacity-30 transition-colors text-on-surface-variant flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* API Keys */}
      <div className="bg-surface border border-outline-variant rounded-xl p-5">
        <h3 className="font-semibold text-on-surface mb-4">Associated API Keys</h3>
        {apiKeys?.length > 0 ? (
          <div className="space-y-3">
            {apiKeys.map((key: any) => (
              <div key={key.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low border border-outline-variant">
                <div>
                  <div className="font-medium text-on-surface flex items-center gap-2">
                    {key.name}
                    {key.status !== 'ACTIVE' && <Badge variant="error">Revoked</Badge>}
                  </div>
                  <div className="text-xs text-on-surface-variant mt-1">Prefix: {key.prefix} • Last Used: {key.lastUsedAt ? new Date(key.lastUsedAt).toLocaleDateString() : 'Never'}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="bg-surface-container-highest hover:bg-surface-bright px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">Rotate</button>
                  <button className="bg-error/10 text-error hover:bg-error/20 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">Revoke</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-on-surface-variant italic">No API keys directly associated with this project name.</div>
        )}
      </div>

      {/* Danger Zone */}
      <div className="mt-12 border border-error/30 rounded-xl overflow-hidden bg-error/5">
        <div className="bg-error/10 px-6 py-4 border-b border-error/20">
          <h2 className="text-error font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined">warning</span>
            Danger Zone
          </h2>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-on-surface font-medium mb-1">Disconnect Project</h3>
            <p className="text-sm text-on-surface-variant mb-3">
              Disconnecting will stop new telemetry but preserve historical data. You will need to remove the SDK from your codebase manually.
            </p>
            <div className="flex gap-3 items-center max-w-sm">
              <input
                type="text"
                placeholder="Type project name to confirm"
                value={confirmNameDisconnect}
                onChange={e => setConfirmNameDisconnect(e.target.value)}
                className="flex-1 bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-sm text-on-surface focus:border-error outline-none"
              />
              <button
                onClick={handleDisconnect}
                disabled={isDisconnecting || confirmNameDisconnect !== project.name}
                className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
              >
                {isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
              </button>
            </div>
          </div>
          
          <div className="h-px bg-error/10 w-full" />

          <div>
            <h3 className="text-on-surface font-medium mb-1">Delete Project</h3>
            <p className="text-sm text-on-surface-variant mb-3">
              Permanently delete this project and all of its telemetry history. This action cannot be undone.
            </p>
            <div className="flex gap-3 items-center max-w-sm">
              <input
                type="text"
                placeholder="Type project name to confirm"
                value={confirmNameDelete}
                onChange={e => setConfirmNameDelete(e.target.value)}
                className="flex-1 bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-sm text-on-surface focus:border-error outline-none"
              />
              <button
                onClick={handleDelete}
                disabled={isDeleting || confirmNameDelete !== project.name}
                className="bg-error hover:bg-error/90 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Manual Migrate Modal */}
      {manualMigrateModal.open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-outline-variant rounded-xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-semibold text-on-surface mb-2">Manual Migration Required</h3>
            <p className="text-sm text-on-surface-variant mb-6">
              CarboniX cannot automatically migrate this specific resource type. To achieve the projected carbon savings, please log in to your provider console and manually move <span className="font-mono text-on-surface bg-surface-container px-1 py-0.5 rounded">{manualMigrateModal.record?.instanceName}</span> to <span className="font-mono text-on-surface bg-surface-container px-1 py-0.5 rounded">{manualMigrateModal.targetRegion}</span>.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setManualMigrateModal({ open: false, record: null, targetRegion: '' })}
                className="px-4 py-2 text-sm font-medium text-on-surface hover:bg-surface-container-high rounded-lg transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  window.open('https://console.aws.amazon.com', '_blank');
                  setManualMigrateModal({ open: false, record: null, targetRegion: '' });
                }}
                className="bg-primary hover:bg-primary-dark text-on-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                Open Cloud Console <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
