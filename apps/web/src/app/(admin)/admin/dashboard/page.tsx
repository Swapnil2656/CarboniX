'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { StatCard } from '@/components/ui/StatCard';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { Skeleton } from '@/components/ui/Skeleton';
import { SdkConnectionBanner } from '@/components/admin/SdkConnectionBanner';
import { getProjects } from '@/app/actions/dashboard-actions';
import { adminApi, carbonApi } from '@/services/api/endpoints';
import type { DashboardData } from '@/types/admin';
import { useRouter } from 'next/navigation';
import { Pagination } from '@/components/ui/Pagination';

interface Project {
  id: string;
  name: string;
  provider: string;
  region: string | null;
  sdkConnected: boolean;
  connectedAt: string | null;
  lastPingAt: string | null;
  createdAt: string;
}

// ─── Pre-deployment estimate (shown before SDK connection) ──────────────────
// Based on a baseline t3.medium at 720h/month in ap-south-1 (750 gCO₂/kWh)
// CPU: 55W × 0.5 × 720h / 1000 × 1.2 PUE × 750 gCO₂/kWh = ~17.7 kg/month
const BASELINE_ESTIMATE_KG = 17.7;

function LockedStatCard({ title, icon }: { title: string; icon: string }) {
  return (
    <div className="relative rounded-xl border border-outline-variant bg-surface-container p-5 overflow-hidden">
      <div className="absolute inset-0 bg-surface-container/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center gap-2">
        <span className="material-symbols-outlined text-2xl text-amber-500">lock</span>
        <span className="text-xs text-on-surface-variant text-center px-4">Connect SDK to unlock</span>
      </div>
      <div className="flex items-center gap-2 mb-3 opacity-30">
        <span className="material-symbols-outlined text-on-surface-variant">{icon}</span>
        <span className="text-sm text-on-surface-variant">{title}</span>
      </div>
      <div className="h-8 bg-outline-variant/30 rounded opacity-30" />
    </div>
  );
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dismissedBanner, setDismissedBanner] = useState(false);
  const [analyzingProjectId, setAnalyzingProjectId] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const router = useRouter();

  const handleAnalyze = async (project: Project) => {
    setAnalyzingProjectId(project.id);
    try {
      const payload = {
        projectName: project.name,
        instanceType: 't3.medium',
        provider: project.provider || 'aws',
        region: project.region || 'us-east-1',
        cpuUtilization: 0.2,
        storageGb: 20
      };
      const res = await carbonApi.recommend(payload);
      if (res.success && res.data?.recommended) {
        setAnalysisResult({ project, currentRegion: payload.region, currentProvider: payload.provider, recommendation: res.data.recommended });
      } else {
        alert("Your environment is already optimized! No greener region found for this provider.");
      }
    } catch (e: any) {
      alert("Error fetching analysis: " + e.message);
    } finally {
      setAnalyzingProjectId(null);
    }
  };

  const fetchProjectsData = useCallback(async (pageToFetch = currentPage, isInitial = false) => {
    try {
      if (isInitial) {
        setLoading(true);
        setError(null);
      }

      const [res, statsRes] = await Promise.all([
        getProjects(pageToFetch, 5),
        adminApi.getDashboard().catch(() => null)
      ]);

      if (res.success) {
        setProjects(res.projects || []);
        if (res.totalPages) setTotalPages(res.totalPages);
        if (res.total !== undefined) setTotalItems(res.total);
        setError(null);
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
    fetchProjectsData(1, true);
  }, []); // Initial load

  useEffect(() => {
    // Auto refresh every 5 seconds to catch SDK connection pings on the current page
    const interval = setInterval(() => fetchProjectsData(currentPage, false), 5000);
    return () => clearInterval(interval);
  }, [fetchProjectsData, currentPage]);

  // ── Derived state ────────────────────────────────────────────────────────
  const activeDeployments = projects.length;
  const firstProject = projects[0] || null;
  const isConnected = firstProject?.sdkConnected ?? false;
  const showBanner = firstProject && !isConnected && !dismissedBanner;

  // ── Pre-deployment estimate card labels ──────────────────────────────────
  const estimatedCo2 = BASELINE_ESTIMATE_KG;
  const estimatedSavings = (estimatedCo2 * 0.98).toFixed(1); // saving by switching to eu-north-1

  return (
    <div className="flex flex-col gap-6 relative min-h-screen">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-section-header text-on-surface">Dashboard</h1>
          <p className="text-on-surface-variant mt-1">Track your deployments and carbon footprint.</p>
        </div>
      </div>

      {error && <ErrorBanner message={error} onRetry={() => fetchProjectsData(currentPage, true)} />}

      {/* ── SDK Connection Banner ──────────────────────────────────────── */}
      {showBanner && (
        <SdkConnectionBanner
          projectName={firstProject.name}
          projectId={firstProject.id}
          onDismiss={() => setDismissedBanner(true)}
        />
      )}

      {/* ── Stats Row ─────────────────────────────────────────────────── */}
      {isConnected ? (
        /* LIVE stats — only shown when SDK is connected */
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
      ) : firstProject ? (
        /* PRE-DEPLOYMENT ESTIMATES — shown when project exists but SDK not connected yet */
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="material-symbols-outlined text-amber-500 text-sm">analytics</span>
            <span className="text-xs font-semibold text-amber-500 uppercase tracking-widest">
              Pre-Deployment Estimate
            </span>
            <span className="text-xs text-on-surface-variant">
              — Connect SDK for live data
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Estimated CO₂/month"
              value={`~${estimatedCo2} kg`}
              icon="co2"
              isLoading={loading}
            />
            <StatCard
              title="Potential Savings"
              value={`~${estimatedSavings} kg`}
              icon="eco"
              isLoading={loading}
            />
            <LockedStatCard title="Real-time Intensity" icon="bolt" />
            <LockedStatCard title="System Health" icon="monitor_heart" />
          </div>
          <p className="text-xs text-on-surface-variant mt-2 ml-1">
            Baseline: t3.medium equivalent @ ap-south-1 (750 gCO₂/kWh). Connect SDK for accurate, live readings.
          </p>
        </div>
      ) : (
        /* NO PROJECT — just show loading skeletons */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array(4).fill(0).map((_, i) => <LockedStatCard key={i} title="—" icon="cloud" />)}
        </div>
      )}

      {/* ── Projects Table ─────────────────────────────────────────────── */}
      <div className="glass-card rounded-xl border border-outline-variant p-6 flex flex-col mt-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined">deployed_code</span>
            Connected Codebases
          </h2>
          <button
            onClick={() => router.push('/onboarding')}
            className="bg-primary hover:bg-primary-hover text-on-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
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
                  <th className="pb-3 text-sm font-medium text-on-surface-variant font-code">SDK STATUS</th>
                  <th className="pb-3 text-sm font-medium text-on-surface-variant font-code text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id} className="border-b border-outline-variant/30 hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-4 text-sm text-on-surface-variant font-code truncate max-w-[120px]">{p.id}</td>
                    <td className="py-4 text-sm font-medium text-on-surface">{p.name}</td>
                    <td className="py-4 text-sm">
                      <span className="bg-surface-container border border-outline-variant text-on-surface-variant px-2 py-1 rounded text-xs">
                        {p.region || 'AI-assigned'}
                      </span>
                    </td>
                    <td className="py-4 text-sm">
                      {p.sdkConnected ? (
                        <span className="flex items-center gap-1.5 text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full w-fit">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          Connected
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs font-medium text-amber-400 bg-amber-400/10 px-2 py-1 rounded-full w-fit">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                          Awaiting SDK
                        </span>
                      )}
                    </td>
                    <td className="py-4 text-sm text-on-surface-variant text-right">
                      <button
                        onClick={() => handleAnalyze(p)}
                        disabled={analyzingProjectId === p.id}
                        className="bg-surface-container-high hover:bg-outline-variant text-on-surface px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border border-outline-variant disabled:opacity-50"
                      >
                        {analyzingProjectId === p.id ? 'Analyzing...' : 'Analyze'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Pagination Controls */}
            <Pagination 
              currentPage={currentPage}
              pageSize={5}
              totalItems={totalItems}
              onPageChange={(page) => {
                setCurrentPage(page);
                fetchProjectsData(page, true);
              }}
            />
          </div>
        ) : (
          /* Empty state — no projects at all */
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-surface-container-low/30 rounded-xl border border-dashed border-outline-variant">
            <div className="bg-surface-container p-4 rounded-full mb-4">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant">rocket_launch</span>
            </div>
            <h3 className="text-lg font-medium text-on-surface mb-2">No Deployments Found</h3>
            <p className="text-on-surface-variant text-sm max-w-md mb-6">
              Connect your codebase to start tracking carbon emissions, receive regional recommendations, and let AI optimize your infrastructure.
            </p>
            <button
              onClick={() => router.push('/onboarding')}
              className="bg-primary hover:bg-primary-hover text-on-primary px-6 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg"
            >
              Deploy Your First Codebase
            </button>
          </div>
        )}
      </div>

      {/* Analysis Modal */}
      {analysisResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface-container border border-outline-variant rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4 text-primary">
              <span className="material-symbols-outlined text-3xl">auto_awesome</span>
              <h3 className="text-xl font-semibold text-on-surface">AI Optimization Found</h3>
            </div>
            
            <p className="text-on-surface-variant text-sm mb-6">
              CarboniX Agentic AI analyzed <strong>{analysisResult.project.name}</strong> and found a greener region!
            </p>

            <div className="bg-surface-container-low rounded-xl border border-outline-variant p-4 space-y-3 mb-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Current Target:</span>
                <span className="font-code font-medium text-on-surface">{analysisResult.currentProvider.toUpperCase()} ({analysisResult.currentRegion})</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Current Carbon:</span>
                <span className="font-medium text-amber-400">
                  {(analysisResult.recommendation.co2KgMonth + analysisResult.recommendation.savingsKg).toFixed(2)} kg CO₂e / mo
                </span>
              </div>
              <div className="h-px bg-outline-variant/50 w-full my-2"></div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">Recommended:</span>
                <span className="font-code font-medium text-green-400">{analysisResult.currentProvider.toUpperCase()} ({analysisResult.recommendation.region})</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant">New Carbon:</span>
                <span className="font-medium text-green-400">
                  {analysisResult.recommendation.co2KgMonth.toFixed(2)} kg CO₂e / mo
                </span>
              </div>
            </div>

            <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 flex items-start gap-3 mb-6">
              <span className="material-symbols-outlined text-primary mt-0.5">eco</span>
              <div>
                <p className="text-sm font-medium text-primary">Expected Savings</p>
                <p className="text-xs text-primary/80 mt-1">
                  You can save ~{Math.round(analysisResult.recommendation.reductionPercent)}% carbon emissions ({analysisResult.recommendation.savingsKg.toFixed(2)} kg CO₂e) by making this switch.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setAnalysisResult(null)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
