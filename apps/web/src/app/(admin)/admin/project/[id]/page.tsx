'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
  const [isGlobalAnalyzing, setIsGlobalAnalyzing] = useState(false);
  const [globalMigrating, setGlobalMigrating] = useState(false);
  const [migratingInstance, setMigratingInstance] = useState<string | null>(null);
  const [globalRecommendation, setGlobalRecommendation] = useState<any>(null);
  const [manualMigrateModal, setManualMigrateModal] = useState<{ open: boolean; record: any | null; targetRegion: string }>({ open: false, record: null, targetRegion: '' });

  // Deployment management states
  const [isDeletingDeployment, setIsDeletingDeployment] = useState<string | null>(null); // deploymentId being deleted
  const [addDeploymentModal, setAddDeploymentModal] = useState<{ open: boolean; label: string; role: string }>({ open: false, label: '', role: 'OTHER' });
  const [isAddingDeployment, setIsAddingDeployment] = useState(false);

  // Danger zone states
  const [confirmNameDisconnect, setConfirmNameDisconnect] = useState('');
  const [confirmNameDelete, setConfirmNameDelete] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  
  // Reporter State
  const [isExporting, setIsExporting] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<string>('OVERALL');

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

  const handleGlobalAnalyze = async () => {
    setIsGlobalAnalyzing(true);
    setGlobalRecommendation(null);
    try {
      const res = await agentsApi.triggerAnalyst(params.id);
      
      if (res.success && res.data) {
        setGlobalRecommendation(res.data);
      } else {
        alert(res.error || 'No recommendations generated.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to analyze: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsGlobalAnalyzing(false);
    }
  };

  const handleGlobalMigrate = async () => {
    if (!globalRecommendation || !globalRecommendation.recommendations || globalRecommendation.recommendations.length === 0) return;
    setGlobalMigrating(true);
    try {
      const res = await agentsApi.triggerOrchestrator(params.id);
      if (res.success) {
        setGlobalRecommendation({
          ...globalRecommendation,
          recommendations: [],
          summary: 'All recommended migrations successfully orchestrated.',
        });
        
        // Refresh stats
        const statsRes = await adminApi.getProjectStats(params.id);
        if (statsRes.success) {
          setData(statsRes.data);
          setLocalInstances(statsRes.data.instances || []);
        }
      } else {
        alert(res.error || 'Failed to orchestrate migrations.');
      }
    } catch (err) {
      console.error(err);
      alert('Migration failed: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setGlobalMigrating(false);
    }
  };

  const handleInstanceMigrate = async (instanceId: string) => {
    if (!globalRecommendation || !globalRecommendation.recommendations) return;
    setMigratingInstance(instanceId);
    try {
      const res = await agentsApi.triggerOrchestrator(params.id, instanceId);
      if (res.success) {
        setGlobalRecommendation({
          ...globalRecommendation,
          recommendations: globalRecommendation.recommendations.filter((r: any) => r.instanceId !== instanceId),
        });
        
        // Refresh stats
        const statsRes = await adminApi.getProjectStats(params.id);
        if (statsRes.success) {
          setData(statsRes.data);
          setLocalInstances(statsRes.data.instances || []);
        }
      } else {
        alert(res.error || 'Failed to orchestrate migration.');
      }
    } catch (err) {
      console.error(err);
      alert('Migration failed: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setMigratingInstance(null);
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
        alert('Failed to generate report');
      }
    } catch (e: any) {
      alert('Export failed: ' + e.message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleRevokeKey = async (keyId: string) => {
    if (!confirm('Are you sure you want to revoke this API key?')) return;
    try {
      await adminApi.revokeApiKey(keyId);
      window.location.reload();
    } catch (e: any) {
      alert('Revoke failed: ' + e.message);
    }
  };

  const handleRotateKey = async (key: any) => {
    if (!confirm('Are you sure you want to rotate this key? The old key will be revoked immediately.')) return;
    try {
      await adminApi.revokeApiKey(key.id);
      const res = await adminApi.createApiKey({
        name: key.name,
        permissions: key.permissions || ['agent_control'],
        expiration: 'never',
        projectId: params.id
      });
      alert(`New Key Generated:\n\n${res.key}\n\nPlease copy this now. It won't be shown again.`);
      window.location.reload();
    } catch (e: any) {
      alert('Rotate failed: ' + e.message);
    }
  };

  const handleDeleteKey = async (keyId: string) => {
    if (!confirm('Are you sure you want to permanently delete this API key? This action cannot be undone.')) return;
    try {
      await adminApi.deleteApiKey(keyId);
      window.location.reload();
    } catch (e: any) {
      alert('Delete failed: ' + e.message);
    }
  };

  const handleDeleteDeployment = async (deploymentId: string, deploymentLabel: string) => {
    if (!confirm(`Delete deployment "${deploymentLabel}"? Historical emission data will be preserved at the project level, but attribution to this deployment will be removed.`)) return;
    try {
      setIsDeletingDeployment(deploymentId);
      await adminApi.deleteDeployment(params.id, deploymentId);
      setData((prev: any) => ({
        ...prev,
        deployments: prev.deployments.filter((d: any) => d.id !== deploymentId),
      }));
    } catch (e: any) {
      alert('Delete deployment failed: ' + e.message);
    } finally {
      setIsDeletingDeployment(null);
    }
  };

  const handleAddDeployment = async () => {
    if (!addDeploymentModal.label.trim()) {
      alert('Please enter a label for the deployment.');
      return;
    }
    try {
      setIsAddingDeployment(true);
      const res = await adminApi.addDeployment(params.id, {
        role: addDeploymentModal.role,
        label: addDeploymentModal.label.trim(),
      });
      if (res.success) {
        setData((prev: any) => ({
          ...prev,
          deployments: [...(prev.deployments || []), { ...res.data, totalMonthKg: 0, platformToken: null }],
        }));
        setAddDeploymentModal({ open: false, label: '', role: 'OTHER' });
      } else {
        alert('Failed to add deployment: ' + (res.error || 'Unknown error'));
      }
    } catch (e: any) {
      alert('Failed to add deployment: ' + e.message);
    } finally {
      setIsAddingDeployment(false);
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

  const { project, idleInstances, oversizedInstances, deployCount, carbonTrend, history7d, history30d, totalMonthKg, apiKeys, greenerRegion, isStale, instances, checklist, estimateAssumptions, top3Regions, manualInstructions } = data;
  const deployments: any[] = data.deployments || [];

  const activeAnalytics = activeTab === 'OVERALL'
    ? { carbonTrend, history7d, history30d, idleInstances, deployCount, totalMonthKg }
    : (deployments.find((d: any) => d.id === activeTab)?.analytics || {
        carbonTrend: { todayKg: 0, yesterdayKg: 0, trendPercent: null, isNew: true },
        history7d: [],
        history30d: [],
        idleInstances: 0,
        deployCount: 0,
        totalMonthKg: 0
      });

  const activeOversized = activeTab === 'OVERALL'
    ? oversizedInstances
    : (deployments.find((d: any) => d.id === activeTab)?.oversizedCount || 0);

  const chartData = chartDays === '7d' ? activeAnalytics.history7d : activeAnalytics.history30d;

  const platformKeys = (activeAnalytics?.deployments || deployments)
    .filter((d: any) => d.platformToken)
    .map((d: any) => ({
      id: d.platformToken.id,
      name: `${d.platformToken.platform} Token (PaaS)`,
      status: d.platformToken.status,
      prefix: '****',
      lastUsedAt: d.platformToken.updatedAt || d.platformToken.createdAt,
      isPlatformToken: true
    }));

  const normalKeys = (apiKeys || []).map((k: any) => ({
    ...k,
    status: k.status
  }));

  const allKeys = [...normalKeys, ...platformKeys];
  const activePaaSDeployments = deployments.filter((d: any) => d.platformToken && d.platformToken.status === 'ACTIVE');
  const hasActivePaaS = activePaaSDeployments.length > 0;
  
  const connectedPlatforms = Array.from(new Set(activePaaSDeployments.map((d: any) => d.platformToken.platform))).join(' & ');

  let deploymentStatusLabel = 'Deployed';
  if (project.isDeployed && deployments.length > 0) {
     const hasFrontend = deployments.some((d: any) => d.role === 'FRONTEND' || d.platformToken?.platform === 'VERCEL' || d.platformToken?.platform === 'NETLIFY');
     const hasBackend = deployments.some((d: any) => d.role === 'BACKEND' || d.platformToken?.platform === 'RENDER' || d.platformToken?.platform === 'RAILWAY');
     const hasFullstack = deployments.some((d: any) => d.role === 'FULLSTACK');

     if (hasFullstack || (hasFrontend && hasBackend)) {
       deploymentStatusLabel = 'Fullstack Deployed';
     } else if (hasFrontend) {
       deploymentStatusLabel = 'Frontend Deployed';
     } else if (hasBackend) {
       deploymentStatusLabel = 'Backend Deployed';
     } else if (deployments.length === 1 && deployments[0].platformToken) {
       deploymentStatusLabel = `${deployments[0].platformToken.platform} Connected`;
     }
  }

  const dataSource: 'NO_CREDS' | 'MOCK_DEMO' | 'LIVE' = project.dataSource || 'NO_CREDS';

  const ROLE_LABELS: Record<string, { label: string; color: string }> = {
    FRONTEND: { label: 'Frontend', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30' },
    BACKEND:  { label: 'Backend',  color: 'bg-purple-500/15 text-purple-400 border-purple-500/30' },
    FULLSTACK: { label: 'Fullstack', color: 'bg-teal-500/15 text-teal-400 border-teal-500/30' },
    OTHER:    { label: 'Other',    color: 'bg-surface-container-high text-on-surface-variant border-outline-variant' },
  };


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
    if (activeAnalytics.carbonTrend?.isNew) {
      return { value: 0, direction: 'up', isNew: true };
    }
    return {
      value: activeAnalytics.carbonTrend?.trendPercent ? Math.round(Math.abs(activeAnalytics.carbonTrend.trendPercent)) : 0,
      direction: activeAnalytics.carbonTrend?.trendPercent >= 0 ? 'up' : 'down'
    };
  };

  const renderCapabilityBadge = () => {
    switch (project.capabilityTier) {
      case 'AUTO_APPLY':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-500/15 text-emerald-400 text-xs px-2 py-0.5 rounded-full border border-emerald-500/30">
            <span className="material-symbols-outlined text-[14px]">bolt</span>
            Auto-apply available
          </span>
        );
      case 'MANUAL_APPLY':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-500/15 text-amber-400 text-xs px-2 py-0.5 rounded-full border border-amber-500/30">
            <span className="material-symbols-outlined text-[14px]">construction</span>
            Manual apply required
          </span>
        );
      case 'DATA_ONLY':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-500/15 text-blue-400 text-xs px-2 py-0.5 rounded-full border border-blue-500/30">
            <span className="material-symbols-outlined text-[14px]">bar_chart</span>
            Data collection only
          </span>
        );
      case 'NOT_CONNECTED':
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-surface-container-high text-on-surface-variant text-xs px-2 py-0.5 rounded-full border border-outline-variant">
            <span className="material-symbols-outlined text-[14px]">link_off</span>
            Not connected
          </span>
        );
    }
  };

  // Filter instances by active tab
  const activeInstances = activeTab === 'OVERALL' 
    ? localInstances 
    : localInstances.filter(inst => inst.deploymentId === activeTab);

  const paginatedInstances = activeInstances.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(activeInstances.length / itemsPerPage);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 relative min-h-screen animate-fade-in">
      {/* Floating Project Settings Button (below global admin header) */}
      <Link
        href={`/admin/project/${params.id}/settings`}
        className="fixed top-[260px] right-6 z-10 w-10 h-10 rounded-full flex items-center justify-center bg-surface border border-outline-variant shadow-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
        title="Project Settings"
      >
        <span className="material-symbols-outlined text-[20px]">tune</span>
      </Link>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center p-2 rounded-full hover:bg-surface-container-high">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <h1 className="text-section-header text-on-surface flex items-center gap-2 flex-wrap">
              {project.name}
              {project.isDeployed ? (
                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded border border-green-500/30">{deploymentStatusLabel}</span>
              ) : (
                <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded border border-amber-500/30">Not Deployed</span>
              )}
              {/* Capability Tier Badge */}
              {renderCapabilityBadge()}
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
        <div className="text-xs text-on-surface-variant mb-1">
          Total across <span className="font-medium text-on-surface">{deployments.length}</span> deployment{deployments.length !== 1 ? 's' : ''}
        </div>
        <div className="w-full bg-surface-container-highest rounded-full h-2.5 overflow-hidden">
          <div 
            className={`h-2.5 rounded-full ${totalMonthKg > (project.carbonBudgetKg || 100) ? 'bg-error' : totalMonthKg > (project.carbonBudgetKg || 100) * 0.8 ? 'bg-warning' : 'bg-primary'}`} 
            style={{ width: `${Math.min(((totalMonthKg || 0) / (project.carbonBudgetKg || 100)) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* ─── Deployment Cards ─────────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-on-surface">Deployments</h2>
          <button
            onClick={() => setAddDeploymentModal({ open: true, label: '', role: 'OTHER' })}
            className="flex items-center gap-1.5 bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            Add Deployment
          </button>
        </div>

        {deployments.length === 0 && (
          <div className="text-sm text-on-surface-variant italic p-4 bg-surface-container rounded-lg border border-outline-variant">
            No deployments yet. Click "Add Deployment" to get started.
          </div>
        )}

        {deployments.map((dep: any) => {
          const roleInfo = ROLE_LABELS[dep.role] ?? ROLE_LABELS.OTHER;
          const platformName = dep.platformToken?.platform ?? null;
          const tokenStatus = dep.platformToken?.status ?? null;
          const depLabel = dep.label || platformName || dep.role;
          return (
            <div key={dep.id} className="bg-surface border border-outline-variant rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className={`inline-flex items-center text-xs px-2 py-0.5 rounded-full border font-medium ${roleInfo.color}`}>
                    {roleInfo.label}
                  </span>
                  <span className="font-medium text-on-surface truncate">{depLabel}</span>
                  {platformName && (
                    <span className="text-xs bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded border border-outline-variant">
                      {platformName}
                      {tokenStatus === 'ACTIVE' ? (
                        <span className="ml-1 w-1.5 h-1.5 rounded-full bg-green-500 inline-block align-middle"></span>
                      ) : tokenStatus ? (
                        <span className="ml-1 w-1.5 h-1.5 rounded-full bg-error inline-block align-middle"></span>
                      ) : null}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-on-surface-variant flex-wrap">
                  {dep.region && <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[13px]">location_on</span>{dep.region}</span>}
                  {dep.provider && <span>{dep.provider}</span>}
                  {!dep.region && !dep.provider && <span className="italic">Region & provider not yet detected</span>}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xs text-on-surface-variant">This month</div>
                  <div className="font-mono font-semibold text-on-surface">{(dep.analytics?.totalMonthKg || 0).toFixed(2)} kg</div>
                </div>
                <button
                  onClick={() => handleDeleteDeployment(dep.id, depLabel)}
                  disabled={isDeletingDeployment === dep.id}
                  className="flex items-center gap-1 bg-error/10 hover:bg-error/20 text-error px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
                  title="Disconnect this deployment"
                >
                  {isDeletingDeployment === dep.id ? (
                    <span className="material-symbols-outlined text-[14px] animate-spin">refresh</span>
                  ) : (
                    <span className="material-symbols-outlined text-[14px]">link_off</span>
                  )}
                  Disconnect
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Deployment Modal */}
      {addDeploymentModal.open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface border border-outline-variant rounded-xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-semibold text-on-surface mb-1">Add Deployment</h3>
            <p className="text-sm text-on-surface-variant mb-4">Create a new named deployment within this project. You can connect a platform token to it afterward in Project Settings.</p>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-label-caps text-on-surface-variant mb-1 block">Label</label>
                <input
                  type="text"
                  placeholder='e.g. "Render (Backend)" or "Vercel (Frontend)"'
                  value={addDeploymentModal.label}
                  onChange={e => setAddDeploymentModal(m => ({ ...m, label: e.target.value }))}
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-sm text-on-surface focus:border-primary outline-none"
                />
                <p className="text-xs text-on-surface-variant mt-1">This label appears in the platform connect UI when you have multiple deployments on the same platform (e.g. two Render services).</p>
              </div>
              <div>
                <label className="text-xs font-label-caps text-on-surface-variant mb-1 block">Role</label>
                <select
                  value={addDeploymentModal.role}
                  onChange={e => setAddDeploymentModal(m => ({ ...m, role: e.target.value }))}
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-3 py-2 text-sm text-on-surface focus:border-primary outline-none"
                >
                  <option value="FRONTEND">Frontend</option>
                  <option value="BACKEND">Backend</option>
                  <option value="FULLSTACK">Fullstack</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setAddDeploymentModal({ open: false, label: '', role: 'OTHER' })}
                className="px-4 py-2 text-sm font-medium text-on-surface hover:bg-surface-container-high rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDeployment}
                disabled={isAddingDeployment || !addDeploymentModal.label.trim()}
                className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-on-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                {isAddingDeployment ? (
                  <><span className="material-symbols-outlined text-[16px] animate-spin">refresh</span> Creating...</>
                ) : (
                  'Create Deployment'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {!project.isDeployed ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-low rounded-xl border border-outline-variant p-6">
              <h2 className="text-lg font-semibold text-on-surface mb-2">Estimate Assumptions</h2>
              {estimateAssumptions?.reasoning && (
                <div className="bg-primary/10 text-primary px-3 py-2 rounded-lg text-xs mb-4">
                  <span className="font-semibold">AI Reasoning:</span> {estimateAssumptions.reasoning}
                </div>
              )}
              <p className="text-on-surface-variant text-sm mb-4">
                This project has not been deployed yet. The carbon estimates are based on:
              </p>
              <ul className="space-y-2 text-sm text-on-surface">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-primary">memory</span> Instance Type: {estimateAssumptions?.instanceType || 't3.medium'}</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-primary">speed</span> CPU Utilization: {estimateAssumptions?.cpuUtilization || 15}%</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-primary">schedule</span> Running Hours: {estimateAssumptions?.runningHours || 730} hrs/month</li>
              </ul>
            </div>
            
            <div className="bg-surface-container-low rounded-xl border border-outline-variant p-6">
              <h2 className="text-lg font-semibold text-on-surface mb-2">Launch Checklist</h2>
              <div className="space-y-3">
                <div className={`flex items-center gap-3 ${!checklist?.projectCreated ? 'opacity-50' : ''}`}>
                  <span className={`material-symbols-outlined ${checklist?.projectCreated ? 'text-green-400' : ''}`}>
                    {checklist?.projectCreated ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                  <span className="text-sm text-on-surface">Project Created</span>
                </div>
                <div className={`flex items-center gap-3 ${!checklist?.apiKeyGenerated ? 'opacity-50' : ''}`}>
                  <span className={`material-symbols-outlined ${checklist?.apiKeyGenerated ? 'text-green-400' : ''}`}>
                    {checklist?.apiKeyGenerated ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                  <span className="text-sm text-on-surface">{hasActivePaaS && (!apiKeys || apiKeys.length === 0) ? `${connectedPlatforms} Connected` : 'API Key Generated'}</span>
                </div>
                <div className={`flex items-center gap-3 ${!checklist?.configInitialized ? 'opacity-50' : ''}`}>
                  <span className={`material-symbols-outlined ${checklist?.configInitialized ? 'text-green-400' : ''}`}>
                    {checklist?.configInitialized ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                  <span className="text-sm text-on-surface">{hasActivePaaS && !project.configInitializedAt ? `Configuration Synced via ${connectedPlatforms}` : 'Config Initialized (npx @carbonix/cli init)'}</span>
                </div>
                <div className={`flex items-center gap-3 ${!checklist?.sdkConnected ? 'opacity-50' : ''}`}>
                  <span className={`material-symbols-outlined ${checklist?.sdkConnected ? 'text-green-400' : ''}`}>
                    {checklist?.sdkConnected ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                  <span className="text-sm text-on-surface">{hasActivePaaS && !project.lastPingAt ? `${connectedPlatforms} Telemetry Active` : 'Telemetry Flowing (Connected)'}</span>
                </div>
              </div>
              {!checklist?.apiKeyGenerated && (
                <div className="mt-6 pt-4 border-t border-outline-variant">
                  <Link href={`/admin/project/${params.id}/settings`} className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium text-sm hover:bg-primary/20 transition-all inline-flex items-center gap-2">
                    Go to project settings
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl border border-outline-variant p-6">
             <h2 className="text-lg font-semibold text-on-surface mb-4">Top 3 Recommended Regions</h2>
             <div className="space-y-3">
                {top3Regions && top3Regions.length > 0 ? top3Regions.map((reg: any, i: number) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-surface border border-outline-variant">
                    <div>
                      <div className="font-medium text-on-surface">{reg.name} ({reg.provider})</div>
                      <div className="text-xs text-on-surface-variant">Grid Intensity: {reg.gridIntensity} gCO2/kWh • Renewable: {reg.renewablePercentage}%</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm text-primary">~{reg.projectedCarbonKg?.toFixed(2)} kg CO2/mo</div>
                      <div className="text-xs text-on-surface-variant">Est. ${reg.costEstimateUsd?.toFixed(2)}/mo</div>
                    </div>
                  </div>
                )) : (
                  <div className="text-sm text-on-surface-variant p-3 bg-surface border border-outline-variant rounded-lg">
                    Loading regions...
                  </div>
                )}
             </div>
          </div>
        </div>
      ) : project.capabilityTier === 'NOT_CONNECTED' ? (
        /* NOT_CONNECTED: No platform connected — show empty state, hide all data panels */
        <div className="flex flex-col items-center justify-center py-20 space-y-6">
          <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-amber-500 text-4xl">link_off</span>
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-on-surface">No Platform Account Connected</h2>
            <p className="text-on-surface-variant text-sm max-w-md">
              Connect your project to a cloud provider or setup a self-hosted agent to start collecting real carbon emission data.
            </p>
          </div>
          <button
            onClick={() => window.location.href = `/admin/project/${params.id}/settings`}
            className="bg-primary text-on-primary hover:bg-primary/90 px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">settings</span>
            Go to Project Settings
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* MOCK_DEMO: Persistent banner across ALL data panels */}
          {dataSource === 'MOCK_DEMO' && (
            <div className="flex items-center gap-3 bg-orange-500/10 border border-orange-500/30 rounded-xl px-4 py-3">
              <span className="material-symbols-outlined text-orange-400 text-[20px]">science</span>
              <div className="flex-1">
                <span className="font-medium text-orange-400 text-sm">Demo Data Mode</span>
                <p className="text-xs text-orange-400/80 mt-0.5">
                  All numbers below are simulated. Connect a real platform account in Project Settings to see live data.
                </p>
              </div>
            </div>
          )}

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

          {deployments.length > 0 && (
            <div className="flex bg-surface-container rounded-lg p-1 w-max border border-outline-variant">
              <button
                onClick={() => setActiveTab('OVERALL')}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'OVERALL'
                    ? 'bg-surface text-on-surface shadow-sm border border-outline-variant/50'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                Fullstack
              </button>
              {deployments.map((d: any) => {
                let tabLabel = d.platformToken?.platform || d.role.toUpperCase();
                if (tabLabel === 'VERCEL') tabLabel = 'Frontend';
                if (tabLabel === 'RAILWAY') tabLabel = 'Backend';
                if (tabLabel === 'DATABASE') tabLabel = 'Database';
                if (tabLabel === 'RENDER') tabLabel = 'Backend';
                if (tabLabel === 'NETLIFY') tabLabel = 'Frontend';

                return (
                  <button
                    key={d.id}
                    onClick={() => setActiveTab(d.id)}
                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${
                      activeTab === d.id
                        ? 'bg-surface text-on-surface shadow-sm border border-outline-variant/50'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    {tabLabel}
                  </button>
                );
              })}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard
              title="Overall Carbon"
              value={`${Number(activeAnalytics.totalMonthKg || 0).toFixed(2)} kg`}
              icon="public"
            />
            <StatCard
              title="Today's Carbon"
              value={`${Number(activeAnalytics.carbonTrend?.todayKg || 0).toFixed(2)} kg`}
              icon="co2"
              trend={activeAnalytics.carbonTrend?.isNew ? undefined : renderTrend() as any}
            />
            <StatCard
              title="Est. Daily Cost"
              value={`$${(activeAnalytics.history30d && activeAnalytics.history30d.length > 0 ? activeAnalytics.history30d[activeAnalytics.history30d.length - 1]?.costUsd || 0 : 0).toFixed(2)}`}
              icon="payments"
            />
            <StatCard
              title="Idle / Oversized"
              value={`${activeAnalytics.idleInstances || 0} / ${activeOversized || 0}`}
              icon="snooze"
            />
            <StatCard
              title="Redeploys (30d)"
              value={activeAnalytics.deployCount?.toString() || '0'}
              icon="update"
            />
            <div className={`border rounded-xl p-5 ${isStale ? 'bg-error/5 border-error/30' : 'bg-surface border-outline-variant'}`}>
              <div className="text-sm font-label-caps text-on-surface-variant mb-2">{hasActivePaaS && !project.lastPingAt ? `${connectedPlatforms} Sync` : 'SDK Status'}</div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isStale ? 'bg-error' : 'bg-green-500 animate-pulse'}`}></div>
                <div className="text-lg font-medium text-on-surface">
                  {isStale ? 'Stale' : 'Healthy'}
                </div>
              </div>
              <p className="text-xs text-on-surface-variant mt-1">
                {hasActivePaaS && !project.lastPingAt ? (
                  `Telemetry synced via ${connectedPlatforms}`
                ) : (
                  `Last Ping: ${project.lastPingAt ? new Date(project.lastPingAt).toLocaleString() : 'Never'}`
                )}
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

          {/* Global AI Recommendation Card */}
          {globalRecommendation && (
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 relative overflow-hidden mb-6">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-2xl">auto_awesome</span>
                    <div>
                      <h4 className="text-on-surface font-semibold mb-1">AI Analyst Recommendation</h4>
                      <p className="text-sm text-primary-light max-w-2xl font-medium">
                        {globalRecommendation.summary}
                      </p>
                      
                      {globalRecommendation.totalSavingsKg > 0 && (
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/20 text-success text-xs font-semibold">
                          <span className="material-symbols-outlined text-[14px]">eco</span>
                          Save {globalRecommendation.totalSavingsKg.toFixed(2)} kg CO₂e
                        </div>
                      )}
                    </div>
                  </div>
                  {globalRecommendation.recommendations?.some((r: any) => r.recommendedAction === 'MIGRATE_REGION') && (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleGlobalMigrate}
                        disabled={globalMigrating}
                        className="bg-primary hover:bg-primary-dark text-on-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-primary/20 shrink-0"
                      >
                        {globalMigrating ? (
                          <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                        ) : (
                          <span className="material-symbols-outlined text-sm">flight_takeoff</span>
                        )}
                        Auto Migrate Recommended
                      </button>
                    </div>
                  )}
                </div>
                
                {globalRecommendation.recommendations?.length > 0 && (
                  <div className="mt-2 pl-9">
                    <div className="space-y-3">
                      {globalRecommendation.recommendations.map((rec: any, idx: number) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <span className="material-symbols-outlined text-on-surface-variant text-base mt-0.5">subdirectory_arrow_right</span>
                          <div>
                            <span className="font-medium text-on-surface mr-2">{rec.instanceId}:</span>
                            <span className="text-on-surface-variant">{rec.reasoning}</span>
                            {rec.targetRegion && (
                              <span className="ml-2 text-[10px] border border-outline-variant rounded px-2 py-0.5 bg-transparent text-inherit">
                                Target: {rec.targetRegion}
                              </span>
                            )}
                            {rec.recommendedAction && (
                              <button
                                onClick={() => handleInstanceMigrate(rec.instanceId)}
                                disabled={migratingInstance === rec.instanceId || globalMigrating}
                                className="ml-3 text-xs bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1 rounded transition-colors disabled:opacity-50"
                              >
                                {migratingInstance === rec.instanceId ? 'Applying...' : (rec.recommendedAction === 'MIGRATE_REGION' ? 'Migrate' : 'Apply')}
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Instances Table */}
          <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden relative">
            <div className="px-5 py-4 border-b border-outline-variant bg-surface-container-low flex items-center justify-between">
              <h3 className="font-semibold text-on-surface">Recent Telemetry Logs</h3>
              
              <button
                onClick={handleGlobalAnalyze}
                disabled={isGlobalAnalyzing || localInstances.length === 0}
                className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isGlobalAnalyzing ? (
                  <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                ) : (
                  <span className="material-symbols-outlined text-sm">auto_awesome</span>
                )}
                Run AI Analysis
              </button>
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
                      </tr>
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
                <div className="text-on-surface-variant">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, activeInstances.length)} of {activeInstances.length} instances
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
        {allKeys?.length > 0 ? (
          <div className="space-y-3">
            {allKeys.map((key: any) => (
              <div key={key.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low border border-outline-variant">
                <div>
                  <div className="font-medium text-on-surface flex items-center gap-2">
                    {key.name}
                    {key.status !== 'ACTIVE' && <Badge variant="error">Revoked</Badge>}
                  </div>
                  <div className="text-xs text-on-surface-variant mt-1">
                    {key.isPlatformToken 
                      ? `Token Masked • Connected: ${key.lastUsedAt ? new Date(key.lastUsedAt).toLocaleDateString() : 'Unknown'}` 
                      : `Prefix: ${key.prefix} • Last Used: ${key.lastUsedAt ? new Date(key.lastUsedAt).toLocaleDateString() : 'Never'}`
                    }
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!key.isPlatformToken ? (
                    <>
                      <button onClick={() => handleRotateKey(key)} className="bg-surface-container-highest hover:bg-surface-bright px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">Rotate</button>
                      <button onClick={() => handleRevokeKey(key.id)} disabled={key.status !== 'ACTIVE'} className="bg-error/10 text-error hover:bg-error/20 disabled:opacity-50 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">Revoke</button>
                      <button onClick={() => handleDeleteKey(key.id)} className="bg-error/20 text-error hover:bg-error/30 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">Delete</button>
                    </>
                  ) : (
                    <Link href={`/admin/project/${params.id}/settings`} className="bg-surface-container-highest hover:bg-surface-bright px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                      Manage Settings
                    </Link>
                  )}
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
