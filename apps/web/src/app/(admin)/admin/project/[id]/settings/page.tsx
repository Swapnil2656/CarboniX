'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi, connectApi } from '@/services/api/endpoints';

type Platform = 'VERCEL' | 'NETLIFY' | 'RAILWAY' | 'RENDER';

interface PlatformConfig {
  id: Platform;
  name: string;
  icon: string;
  description: string;
  docsUrl: string;
  needsProjectSlug: boolean;
}

const PLATFORMS: PlatformConfig[] = [
  {
    id: 'VERCEL',
    name: 'Vercel',
    icon: 'change_history',
    description: 'Connect via Vercel Access Token to read deployments and usage metrics.',
    docsUrl: 'https://vercel.com/account/tokens',
    needsProjectSlug: true,
  },
  {
    id: 'NETLIFY',
    name: 'Netlify',
    icon: 'diamond',
    description: 'Connect via Netlify Personal Access Token to read site analytics.',
    docsUrl: 'https://app.netlify.com/user/applications#personal-access-tokens',
    needsProjectSlug: true,
  },
  {
    id: 'RAILWAY',
    name: 'Railway',
    icon: 'train',
    description: 'Connect via Railway Project Token.',
    docsUrl: 'https://docs.railway.app/reference/public-api#project-tokens',
    needsProjectSlug: false,
  },
  {
    id: 'RENDER',
    name: 'Render',
    icon: 'cloud',
    description: 'Connect via Render API Key.',
    docsUrl: 'https://dashboard.render.com/user/settings#api-keys',
    needsProjectSlug: false,
  }
];

export default function ProjectSettingsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [tokenValue, setTokenValue] = useState('');
  const [projectSlug, setProjectSlug] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectError, setConnectError] = useState<string | null>(null);
  const [connectSuccess, setConnectSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchProject();
  }, [params.id]);

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
      .map((pt: any) => pt.platform as Platform);
  }, [project]);

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

  const handleRevoke = async (platform: Platform) => {
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

      {/* Platform Integrations Section */}
      <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden">
        <div className="px-6 py-5 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-on-surface text-lg">Platform Integrations</h2>
            <p className="text-sm text-on-surface-variant">Connect your cloud providers to enable live carbon data collection.</p>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {PLATFORMS.map((platform) => {
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
                      <p className="text-sm text-on-surface-variant mt-1 max-w-lg">{platform.description}</p>
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
          })}
        </div>
      </div>
    </div>
  );
}
