'use client';

import React, { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { ErrorBanner } from '@/components/ui/ErrorBanner';
import { Skeleton } from '@/components/ui/Skeleton';
import { Pagination } from '@/components/ui/Pagination';
import { adminApi } from '@/services/api/endpoints';
import type { ApiKey, ApiKeysResponse, CreateApiKeyPayload } from '@/types/admin';

export default function ApiKeysPage() {
  const [data, setData] = useState<ApiKeysResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 20;
  
  // Revoke Modal State
  const [revokeModalOpen, setRevokeModalOpen] = useState(false);
  const [targetKey, setTargetKey] = useState<ApiKey | null>(null);

  // Create Modal State
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyPermissions, setNewKeyPermissions] = useState<string[]>([]);
  const [newKeyExpiration, setNewKeyExpiration] = useState('30d');
  const [creating, setCreating] = useState(false);
  
  // New Key Display State
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<{ name: string, key: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await adminApi.getApiKeys(page, pageSize);
      setData(res);
    } catch (err) {
      console.error(err);
      setError('Failed to load API keys. The backend endpoint might not be wired up yet.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleRevokeClick = (key: ApiKey) => {
    setTargetKey(key);
    setRevokeModalOpen(true);
  };

  const executeRevoke = async () => {
    if (!targetKey) return;
    try {
      // Optimistic update
      if (data) {
        setData({
          ...data,
          keys: data.keys.map(k => k.id === targetKey.id ? { ...k, status: 'REVOKED' } : k)
        });
      }
      await adminApi.revokeApiKey(targetKey.id);
      window.dispatchEvent(new Event('dataUpdated'));
    } catch (err) {
      console.error(err);
      // Let it fail silently on UI for now or show toast
    } finally {
      setRevokeModalOpen(false);
      setTargetKey(null);
    }
  };

  const executeDelete = async (id: string) => {
    try {
      if (data) {
        setData({
          ...data,
          keys: data.keys.filter(k => k.id !== id)
        });
      }
      // Use hard delete endpoint
      await adminApi.deleteApiKey(id); 
      window.dispatchEvent(new Event('dataUpdated'));
    } catch (err) {
      console.error(err);
    }
  };

  const togglePermission = (perm: string) => {
    setNewKeyPermissions(prev => 
      prev.includes(perm) ? prev.filter(p => p !== perm) : [...prev, perm]
    );
  };

  const executeCreate = async () => {
    if (!newKeyName.trim() || newKeyPermissions.length === 0) return;
    
    try {
      setCreating(true);
      const payload: CreateApiKeyPayload = {
        name: newKeyName,
        permissions: newKeyPermissions,
        expiration: newKeyExpiration,
      };
      
      const res = await adminApi.createApiKey(payload);
      
      setNewlyCreatedKey({ name: newKeyName, key: res.key });
      setCreateModalOpen(false);
      window.dispatchEvent(new Event('dataUpdated'));
      
      // Refresh list to show new key (masked)
      fetchData();
      
      // Reset form
      setNewKeyName('');
      setNewKeyPermissions([]);
      setNewKeyExpiration('30d');
    } catch (err) {
      console.error(err);
      // Could set modal error here
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-section-header text-on-surface">API Keys</h1>
          <p className="text-on-surface-variant mt-1">Manage authentication tokens for programmatic access.</p>
        </div>
        <button 
          onClick={() => setCreateModalOpen(true)}
          className="bg-primary text-on-primary hover:bg-primary-container px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Generate New Key
        </button>
      </div>

      {error && <ErrorBanner message={error} onRetry={fetchData} />}

      {newlyCreatedKey && (
        <div className="bg-[rgba(80,250,123,0.1)] border border-[#50FA7B]/30 rounded-xl p-6 relative">
          <button 
            onClick={() => setNewlyCreatedKey(null)}
            className="absolute top-4 right-4 text-[#50FA7B] hover:text-[#3ad86e]"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="flex items-center gap-3 text-[#50FA7B] mb-4">
            <span className="material-symbols-outlined text-3xl">check_circle</span>
            <h3 className="text-lg font-semibold">Key Generated Successfully</h3>
          </div>
          <p className="text-on-surface-variant mb-4 text-sm">
            Please copy your new API key for <strong>{newlyCreatedKey.name}</strong> now. You won&apos;t be able to see it again!
          </p>
          <div className="flex items-center gap-3">
            <code className="flex-1 bg-surface-container-high border border-outline-variant px-4 py-3 rounded-lg text-primary font-code select-all">
              {newlyCreatedKey.key}
            </code>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(newlyCreatedKey.key);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="bg-surface-container hover:bg-surface-container-high border border-outline-variant px-4 py-3 rounded-lg text-on-surface transition-colors flex items-center gap-2 min-w-[100px] justify-center"
            >
              <span className="material-symbols-outlined text-[18px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="glass-card rounded-xl border border-outline-variant p-6">
                <Skeleton className="h-6 w-1/3 mb-4" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))
          ) : data && data.keys && data.keys.length > 0 ? (
            data.keys.map(key => (
              <div key={key.id} className="glass-card rounded-xl border border-outline-variant p-6 flex flex-col sm:flex-row sm:items-center gap-6 group">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-surface-container text-on-surface-variant border border-outline-variant group-hover:border-primary/50 group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[24px]">vpn_key</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-base font-semibold text-on-surface">{key.name}</h3>
                    <Badge variant={key.status === 'ACTIVE' ? 'success' : 'default'}>
                      {key.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <code className="text-sm text-outline font-code tracking-widest">{key.maskedKey}</code>
                    <button className="text-on-surface-variant hover:text-on-surface ml-2">
                      <span className="material-symbols-outlined text-[16px]">content_copy</span>
                    </button>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                  <div className="text-sm text-on-surface-variant">
                    <span className="font-medium text-on-surface">{key.usageLast24h.toLocaleString()}</span> calls / 24h
                  </div>
                  <div className="text-xs text-outline">Created {new Date(key.createdAt).toLocaleDateString()}</div>
                </div>

                {key.status === 'ACTIVE' && (
                  <div className="sm:pl-4 sm:border-l border-outline-variant flex justify-end">
                    <button 
                      onClick={() => handleRevokeClick(key)}
                      className="text-on-surface-variant hover:text-error p-2 rounded-full hover:bg-[rgba(248,113,113,0.1)] transition-colors"
                      title="Revoke Key"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                )}

                {key.status === 'REVOKED' && (
                  <div className="sm:pl-4 sm:border-l border-outline-variant flex justify-end">
                    <button 
                      onClick={() => executeDelete(key.id)}
                      className="text-on-surface-variant hover:text-error p-2 rounded-full hover:bg-[rgba(248,113,113,0.1)] transition-colors"
                      title="Delete Key Forever"
                    >
                      <span className="material-symbols-outlined">delete_forever</span>
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="glass-card rounded-xl border border-outline-variant p-12 flex flex-col items-center text-center">
              <span className="material-symbols-outlined text-[48px] text-outline mb-4">key_off</span>
              <h3 className="text-lg font-medium text-on-surface mb-2">No API Keys</h3>
              <p className="text-on-surface-variant text-sm max-w-md">Generate your first API key to start authenticating requests to the CarboniX API.</p>
            </div>
          )}
        </div>
        
        {data && data.total !== undefined && (
          <div className="glass-card rounded-xl border border-outline-variant overflow-hidden mt-4">
            <Pagination 
              currentPage={page} 
              pageSize={pageSize} 
              totalItems={data.total || 0} 
              onPageChange={setPage} 
            />
          </div>
        )}
      </div>

      {/* Revoke Modal */}
      <ConfirmModal 
        isOpen={revokeModalOpen}
        title="Revoke API Key?"
        description={
          <>
            Are you sure you want to revoke <strong>{targetKey?.name}</strong>? Any applications using this key will immediately lose access and start receiving 401 Unauthorized errors. This action cannot be undone.
          </>
        }
        confirmText="Revoke Key"
        onConfirm={executeRevoke}
        onCancel={() => {
          setRevokeModalOpen(false);
          setTargetKey(null);
        }}
        isDestructive={true}
      />

      {/* Create Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-card w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border-outline-variant flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center">
              <h3 className="text-xl font-semibold text-on-surface">Generate New Key</h3>
              <button onClick={() => setCreateModalOpen(false)} className="text-outline hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-2">Key Name</label>
                <input 
                  type="text" 
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g. Production Backend App" 
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2.5 text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-3">Permissions</label>
                <div className="flex flex-col gap-3">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded flex items-center justify-center border mt-0.5 transition-colors ${newKeyPermissions.includes('read:analytics') ? 'bg-primary border-primary' : 'border-outline-variant bg-surface group-hover:border-primary/50'}`}>
                      {newKeyPermissions.includes('read:analytics') && <span className="material-symbols-outlined text-[14px] text-on-primary">check</span>}
                    </div>
                    <input type="checkbox" className="sr-only" checked={newKeyPermissions.includes('read:analytics')} onChange={() => togglePermission('read:analytics')} />
                    <div>
                      <div className="text-sm font-medium text-on-surface">Read Analytics</div>
                      <div className="text-xs text-on-surface-variant mt-0.5">Allow querying dashboard metrics and usage data.</div>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded flex items-center justify-center border mt-0.5 transition-colors ${newKeyPermissions.includes('write:assets') ? 'bg-primary border-primary' : 'border-outline-variant bg-surface group-hover:border-primary/50'}`}>
                      {newKeyPermissions.includes('write:assets') && <span className="material-symbols-outlined text-[14px] text-on-primary">check</span>}
                    </div>
                    <input type="checkbox" className="sr-only" checked={newKeyPermissions.includes('write:assets')} onChange={() => togglePermission('write:assets')} />
                    <div>
                      <div className="text-sm font-medium text-on-surface">Write Assets</div>
                      <div className="text-xs text-on-surface-variant mt-0.5">Allow registering new devices and calculating emissions.</div>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-2">Expiration</label>
                <select 
                  value={newKeyExpiration}
                  onChange={(e) => setNewKeyExpiration(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2.5 text-on-surface focus:outline-none focus:border-primary transition-all appearance-none"
                >
                  <option value="7d">7 Days</option>
                  <option value="30d">30 Days</option>
                  <option value="90d">90 Days</option>
                  <option value="never">Never (Not Recommended)</option>
                </select>
              </div>

              {newKeyExpiration === 'never' && (
                <div className="bg-[rgba(245,197,24,0.1)] border border-[rgba(245,197,24,0.3)] rounded-lg p-3 flex gap-3 text-[#f5c518]">
                  <span className="material-symbols-outlined mt-0.5 text-[20px]">warning</span>
                  <p className="text-xs font-medium leading-relaxed">
                    Keys that never expire pose a security risk. We highly recommend setting an expiration date and rotating keys periodically.
                  </p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-outline-variant flex justify-end gap-3 bg-surface-container-lowest">
              <button
                onClick={() => setCreateModalOpen(false)}
                className="px-4 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={executeCreate}
                disabled={creating || !newKeyName.trim() || newKeyPermissions.length === 0}
                className="px-4 py-2 rounded-lg bg-primary text-on-primary hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm flex items-center gap-2"
              >
                {creating ? 'Generating...' : 'Generate Key'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
