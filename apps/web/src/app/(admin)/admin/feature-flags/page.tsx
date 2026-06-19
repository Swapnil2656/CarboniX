'use client';

import React, { useEffect, useState } from 'react';
import { ToggleSwitch } from '@/components/ui/ToggleSwitch';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { Skeleton } from '@/components/ui/Skeleton';
import { adminApi } from '@/services/api/endpoints';
import type { FeatureFlag } from '@/types/admin';

export default function FeatureFlagsPage() {
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [targetFlag, setTargetFlag] = useState<{ id: string, name: string, enabled: boolean } | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await adminApi.getFeatureFlags();
      setFlags(res.flags || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load feature flags. The backend endpoint might not be wired up yet.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleClick = (flag: FeatureFlag) => {
    if (flag.enabled) {
      // Show modal before disabling
      setTargetFlag({ id: flag.id, name: flag.name, enabled: false });
      setModalOpen(true);
    } else {
      // Enable immediately
      executeToggle(flag.id, true);
    }
  };

  const executeToggle = async (id: string, enabled: boolean) => {
    try {
      // Optimistic update
      setFlags(prev => prev.map(f => f.id === id ? { ...f, enabled } : f));
      await adminApi.toggleFeatureFlag(id, enabled);
    } catch (err) {
      console.error(err);
      // Revert on error
      setFlags(prev => prev.map(f => f.id === id ? { ...f, enabled: !enabled } : f));
      // Optionally show a toast error here
    }
  };

  const confirmDisable = () => {
    if (targetFlag) {
      executeToggle(targetFlag.id, targetFlag.enabled);
    }
    setModalOpen(false);
    setTargetFlag(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-section-header text-on-surface">Feature Flags</h1>
          <p className="text-on-surface-variant mt-1">Control platform capabilities and UI rollouts without deploying.</p>
        </div>
        <div className="flex items-center gap-2 bg-[rgba(74,222,128,0.1)] px-3 py-1.5 rounded-full border border-[#4ade80]/30 text-sm font-medium text-[#4ade80]">
          <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse"></span>
          Live Sync Active
        </div>
      </div>

      {error && <ErrorBanner message={error} onRetry={fetchData} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Table Area */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="glass-card rounded-xl border border-outline-variant overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant">
                  <th className="px-6 py-4 text-xs font-label-caps text-on-surface-variant">Feature Name</th>
                  <th className="px-6 py-4 text-xs font-label-caps text-on-surface-variant">Screen / Scope</th>
                  <th className="px-6 py-4 text-xs font-label-caps text-on-surface-variant">Status</th>
                  <th className="px-6 py-4 text-xs font-label-caps text-on-surface-variant">Last Changed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {loading ? (
                  Array(4).fill(0).map((_, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4"><Skeleton className="h-5 w-32" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-5 w-24" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-6 w-12 rounded-full" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-5 w-28" /></td>
                    </tr>
                  ))
                ) : flags && flags.length > 0 ? (
                  flags.map(flag => (
                    <tr key={flag.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-medium text-on-surface">{flag.name}</span>
                        <div className="text-xs text-on-surface-variant mt-1 font-code text-outline">{flag.id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded bg-surface border border-outline-variant text-xs font-medium text-on-surface-variant">
                          {flag.screen}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <ToggleSwitch 
                          checked={flag.enabled} 
                          onChange={() => handleToggleClick(flag)} 
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-on-surface">{new Date(flag.lastChangedAt).toLocaleDateString()}</span>
                          <span className="text-xs text-on-surface-variant">by {flag.lastChangedBy}</span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-on-surface-variant">
                      No feature flags found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar Area */}
        <div className="flex flex-col gap-6">
          <div className="glass-card rounded-xl border border-outline-variant p-6">
            <h3 className="text-sm font-label-caps text-on-surface-variant mb-6">Propagation Stats</h3>
            <div className="flex flex-col gap-5">
              <div>
                <div className="flex justify-between text-sm mb-2 font-medium">
                  <span className="text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary">dns</span>
                    Node Sync
                  </span>
                  <span className="text-primary">100%</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full w-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2 font-medium">
                  <span className="text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-tertiary">language</span>
                    Edge Delivery
                  </span>
                  <span className="text-tertiary">98%</span>
                </div>
                <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl border border-outline-variant p-6">
            <h3 className="text-sm font-label-caps text-on-surface-variant mb-4">Developer Quick Access</h3>
            <p className="text-sm text-on-surface-variant mb-6">Tools for local testing and configuration management.</p>
            
            <div className="flex flex-col gap-3">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-surface-container border border-outline-variant text-on-surface hover:bg-surface-container-high transition-colors font-medium text-sm">
                <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
                Flush Global Cache
              </button>
              <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-surface border border-outline-variant text-on-surface hover:bg-surface-container transition-colors font-medium text-sm">
                <span className="material-symbols-outlined text-[18px]">data_object</span>
                View JSON Config
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal 
        isOpen={modalOpen}
        title={`Disable ${targetFlag?.name}?`}
        description={
          <>
            Are you sure you want to disable <strong>{targetFlag?.name}</strong>? This change will propagate to all edge nodes within 30 seconds and will immediately affect users on the {flags.find(f => f.id === targetFlag?.id)?.screen} screen.
          </>
        }
        confirmText="Disable Feature"
        onConfirm={confirmDisable}
        onCancel={() => {
          setModalOpen(false);
          setTargetFlag(null);
        }}
        isDestructive={true}
      />
    </div>
  );
}
