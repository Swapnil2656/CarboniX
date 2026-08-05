'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi, connectApi } from '@/services/api/endpoints';

interface PlatformConfig {
  id: string;
  name: string;
  icon: string;
  description: string;
  docsUrl: string;
  needsProjectSlug: boolean;
}

export default function ProjectSettingsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [tokenValue, setTokenValue] = useState('');
  const [projectSlug, setProjectSlug] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectError, setConnectError] = useState<string | null>(null);
  const [connectSuccess, setConnectSuccess] = useState<string | null>(null);

  // Platform Discovery
  const [availablePlatforms, setAvailablePlatforms] = useState<PlatformConfig[]>([]);

  // Agent State
  const [isGeneratingAgent, setIsGeneratingAgent] = useState(false);
  const [newAgentKey, setNewAgentKey] = useState<string | null>(null);

  // Category State
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    FRONTEND: false,
    BACKEND: false,
    SELF_HOSTED: false
  });

  useEffect(() => {
    fetchProject();
    fetchPlatforms();
  }, [params.id]);

  const fetchPlatforms = async () => {
    try {
      const res = await connectApi.getPlatforms();
      if (res.success) {
        setAvailablePlatforms(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch platforms', err);
    }
  };

  const fetchProject = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getProjectStats(params.id);
      if (res.success) {
        setProject(res.data.project);
      } else {
        setError(res.error || 'Failed to fetch project');
      }
    } catch (err: any) {
      setError(err.message || 'Internal error');
    } finally {
      setLoading(false);
    }
  };

  const connectedPlatforms = React.useMemo(() => {
    if (!project?.platformTokens) return [];
    return project.platformTokens
      .filter((pt: any) => pt.status === 'ACTIVE')
      .map((pt: any) => pt.platform as string);
  }, [project]);

  // Set initial expanded state once platforms are fetched
  useEffect(() => {
    if (availablePlatforms.length > 0 && connectedPlatforms.length > 0) {
      const newExpanded = { FRONTEND: false, BACKEND: false, SELF_HOSTED: false };
      connectedPlatforms.forEach(cp => {
        const platform = availablePlatforms.find(p => p.id === cp);
        if (platform && platform.category) {
          newExpanded[platform.category as keyof typeof newExpanded] = true;
        }
      });
      // If sdkConnected is true, self-hosted should be open (or we can just check if lastPingAt exists)
      if (project?.sdkConnected) {
        newExpanded.SELF_HOSTED = true;
      }
      setExpandedCategories(newExpanded);
    }
  }, [availablePlatforms, connectedPlatforms, project?.sdkConnected]);

  const toggleCategory = (cat: string) => {
    setExpandedCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlatform || !tokenValue.trim()) return;

    try {
      setIsConnecting(true);
      setConnectError(null);
      setConnectSuccess(null);

      const res = await connectApi.connectPlatformToken({
        projectId: params.id,
        platform: selectedPlatform,
        token: tokenValue.trim(),
        projectSlug: projectSlug.trim() || undefined,
      });

      if (res.success) {
        setConnectSuccess(`Successfully connected ${selectedPlatform}`);
        setTokenValue('');
        setProjectSlug('');
        setSelectedPlatform(null);
        await fetchProject(); // Refresh the list
      } else {
        setConnectError(res.error || 'Failed to connect');
      }
    } catch (err: any) {
      setConnectError(err.message || 'Connection failed');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleRevoke = async (platform: string) => {
    if (!confirm(`Are you sure you want to revoke the ${platform} connection?`)) return;
    try {
      setConnectError(null);
      setConnectSuccess(null);
      const res = await connectApi.revokePlatformToken(params.id, platform);
      if (res.success) {
        setConnectSuccess(`Revoked ${platform} connection`);
        await fetchProject();
      } else {
        setConnectError(res.error || 'Failed to revoke');
      }
    } catch (err: any) {
      setConnectError(err.message || 'Failed to revoke');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="p-6 bg-error/10 border border-error/20 rounded-xl">
        <h3 className="text-error font-medium">Error</h3>
        <p className="text-sm text-error/80">{error || 'Project not found'}</p>
        <button onClick={() => router.back()} className="mt-4 text-primary hover:underline text-sm">
          Go Back
        </button>
      </div>
    );
  }

  const renderPlatformCard = (platform: any) => {
    const isConnected = connectedPlatforms.includes(platform.id);
    const isSelected = selectedPlatform === platform.id;

    return (
      <div key={platform.id} className={`border rounded-xl p-5 transition-all ${isSelected ? 'border-primary bg-primary/5' : 'border-outline-variant bg-surface-container'}`}>
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isConnected ? 'bg-emerald-500/10 text-emerald-500' : 'bg-surface border border-outline-variant text-on-surface-variant'}`}>
              <span className="material-symbols-outlined">{platform.icon}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-on-surface">{platform.name}</h3>
                {isConnected && (
                  <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    Connected
                  </span>
                )}
              </div>
              <p className="text-sm text-on-surface-variant mt-1 max-w-lg">
                {platform.description}
                {platform.id === 'SUPABASE' && <span className="block mt-1 italic opacity-80">Database project — carbon tracked, region cannot be changed after creation.</span>}
                {platform.regionSwitchSupport === 'NOT_SUPPORTED' && platform.id.startsWith('CLOUDFLARE') && <span className="block mt-1 italic opacity-80">Runs globally across edge network and cannot be pinned to a single region.</span>}
                {platform.regionSwitchSupport === 'NOT_SUPPORTED' && platform.id === 'DENO_DEPLOY' && <span className="block mt-1 italic opacity-80">Classic project: runs globally across edge network.</span>}
              </p>
              <a href={platform.docsUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-2 inline-block">
                Get your token here ↗
              </a>
            </div>
          </div>

          <div>
            {isConnected ? (
              <button 
                onClick={() => handleRevoke(platform.id)}
                className="px-4 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-lg text-sm font-medium transition-colors"
              >
                Revoke
              </button>
            ) : (
              <button 
                onClick={() => setSelectedPlatform(isSelected ? null : platform.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isSelected ? 'bg-surface-container border border-outline-variant text-on-surface' : 'bg-primary text-on-primary hover:bg-primary/90'}`}
              >
                {isSelected ? 'Cancel' : 'Connect'}
              </button>
            )}
          </div>
        </div>

        {isSelected && !isConnected && (
          <form onSubmit={handleConnect} className="mt-6 pt-6 border-t border-outline-variant space-y-4 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-on-surface mb-2">
                {platform.name} Access Token
              </label>
              <input
                type="password"
                value={tokenValue}
                onChange={(e) => setTokenValue(e.target.value)}
                placeholder={`Paste your ${platform.name} token here`}
                className="w-full bg-surface-container border border-outline focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-on-surface outline-none transition-all"
                required
              />
            </div>

            {platform.needsProjectSlug && (
              <div>
                <label className="block text-sm font-medium text-on-surface mb-2">
                  Project Slug <span className="text-on-surface-variant font-normal text-xs">(optional)</span>
                </label>
                <input
                  type="text"
                  value={projectSlug}
                  onChange={(e) => setProjectSlug(e.target.value)}
                  placeholder={`e.g. my-awesome-app`}
                  className="w-full bg-surface-container border border-outline focus:border-primary focus:ring-1 focus:ring-primary rounded-lg px-4 py-2.5 text-on-surface outline-none transition-all"
                />
                <p className="text-xs text-on-surface-variant mt-1">If provided, we will only collect data for this specific project.</p>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isConnecting || !tokenValue.trim()}
                className="bg-primary text-on-primary px-6 py-2.5 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isConnecting && <span className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />}
                {isConnecting ? 'Connecting...' : 'Save & Verify'}
              </button>
            </div>
          </form>
        )}
      </div>
    );
  };

  const frontendPlatforms = availablePlatforms.filter(p => p.category === 'FRONTEND');
  const backendPlatforms = availablePlatforms.filter(p => p.category === 'BACKEND');

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.push(`/admin/project/${params.id}`)} className="text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center p-2 rounded-full hover:bg-surface-container-high">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <h1 className="text-section-header text-on-surface">Project Settings</h1>
          <p className="text-sm text-on-surface-variant mt-1">Manage configurations for {project.name}</p>
        </div>
      </div>

      {(connectSuccess || connectError) && (
        <div className={`p-4 rounded-xl border flex items-center gap-3 ${connectSuccess ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
          <span className="material-symbols-outlined">
            {connectSuccess ? 'check_circle' : 'error'}
          </span>
          <p className="text-sm">{connectSuccess || connectError}</p>
        </div>
      )}

      {/* Settings Categories */}
      <div className="space-y-6">
        {/* FRONTEND DEPLOYMENTS */}
        <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden">
          <button 
            onClick={() => toggleCategory('FRONTEND')}
            className="w-full px-6 py-5 bg-surface-container-low hover:bg-surface-container transition-colors flex justify-between items-center text-left"
          >
            <div>
              <div className="flex items-center gap-3">
                <h2 className="font-semibold text-on-surface text-lg">Frontend Deployments</h2>
                <span className="bg-surface-container-highest text-on-surface-variant text-xs px-2.5 py-0.5 rounded-full font-medium">
                  {frontendPlatforms.length}
                </span>
              </div>
              <p className="text-sm text-on-surface-variant mt-1">Connect static sites, edge compute, and frontend frameworks.</p>
            </div>
            <span className={`material-symbols-outlined text-on-surface-variant transition-transform ${expandedCategories.FRONTEND ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </button>

          {expandedCategories.FRONTEND && (
            <div className="p-6 space-y-6 border-t border-outline-variant">
              {availablePlatforms.length === 0 ? (
                <div className="text-sm text-on-surface-variant flex items-center justify-center py-4">
                  <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
                  Loading platforms...
                </div>
              ) : (
                frontendPlatforms.map(renderPlatformCard)
              )}
            </div>
          )}
        </div>

        {/* BACKEND DEPLOYMENTS */}
        <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden">
          <button 
            onClick={() => toggleCategory('BACKEND')}
            className="w-full px-6 py-5 bg-surface-container-low hover:bg-surface-container transition-colors flex justify-between items-center text-left"
          >
            <div>
              <div className="flex items-center gap-3">
                <h2 className="font-semibold text-on-surface text-lg">Backend Deployments</h2>
                <span className="bg-surface-container-highest text-on-surface-variant text-xs px-2.5 py-0.5 rounded-full font-medium">
                  {backendPlatforms.length}
                </span>
              </div>
              <p className="text-sm text-on-surface-variant mt-1">Connect your PaaS, serverless functions, and managed databases.</p>
            </div>
            <span className={`material-symbols-outlined text-on-surface-variant transition-transform ${expandedCategories.BACKEND ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </button>

          {expandedCategories.BACKEND && (
            <div className="p-6 space-y-6 border-t border-outline-variant">
              {availablePlatforms.length === 0 ? (
                <div className="text-sm text-on-surface-variant flex items-center justify-center py-4">
                  <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
                  Loading platforms...
                </div>
              ) : (
                backendPlatforms.map(renderPlatformCard)
              )}
            </div>
          )}
        </div>

        {/* SELF-HOSTED */}
        <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden">
          <button 
            onClick={() => toggleCategory('SELF_HOSTED')}
            className="w-full px-6 py-5 bg-surface-container-low hover:bg-surface-container transition-colors flex justify-between items-center text-left"
          >
            <div>
              <h2 className="font-semibold text-on-surface text-lg">Self-Hosted Server Agent</h2>
              <p className="text-sm text-on-surface-variant mt-1">Hosting your own servers? Run the CarboniX agent daemon.</p>
            </div>
            <span className={`material-symbols-outlined text-on-surface-variant transition-transform ${expandedCategories.SELF_HOSTED ? 'rotate-180' : ''}`}>
              expand_more
            </span>
          </button>

          {expandedCategories.SELF_HOSTED && (
            <div className="p-6 border-t border-outline-variant">
              {!newAgentKey ? (
                <div>
                  <p className="text-on-surface-variant text-sm mb-4">
                    Generate a secure API key to authenticate your server. You will use this key when starting the agent on your machine.
                  </p>
                  <button 
                    onClick={async () => {
                      try {
                        setIsGeneratingAgent(true);
                        const res = await adminApi.createApiKey({
                          name: `Agent Key for ${project?.name}`,
                          permissions: ['agent_control'],
                          expiration: 'never',
                          projectId: params.id
                        });
                        setNewAgentKey(res.key);
                        await fetchProject(); // Refresh api keys list if needed
                      } catch (err: any) {
                        setConnectError(err.message || 'Failed to generate agent key');
                      } finally {
                        setIsGeneratingAgent(false);
                      }
                    }}
                    disabled={isGeneratingAgent}
                    className="bg-primary text-on-primary hover:bg-primary/90 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">key</span>
                    {isGeneratingAgent ? 'Generating...' : 'Generate Agent Key'}
                  </button>
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <h3 className="font-medium text-emerald-400 flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined">check_circle</span>
                      Agent Key Generated
                    </h3>
                    <p className="text-sm text-emerald-400/80 mb-4">
                      Copy this key now. You won't be able to see it again!
                    </p>
                    <code className="block w-full bg-surface border border-outline-variant rounded-lg p-3 text-on-surface font-mono text-sm break-all">
                      {newAgentKey}
                    </code>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-medium text-on-surface mb-2">How to run the agent</h4>
                    <p className="text-sm text-on-surface-variant mb-3">Run this command on your server to start the background telemetry agent:</p>
                    <div className="bg-surface-container-high border border-outline-variant rounded-lg p-4 font-mono text-xs text-on-surface-variant relative">
                      CARBONIX_API_KEY={newAgentKey} npx @carbonix/cli start
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
