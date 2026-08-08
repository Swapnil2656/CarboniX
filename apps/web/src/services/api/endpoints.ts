import { fetchClient } from './client';
import type {
  DashboardData,
  UsersResponse,
  FeatureFlagsResponse,
  ApiKeysResponse,
  CreateApiKeyPayload,
} from '@/types/admin';

// ─── Carbon API Endpoints ─────────────────────────────────────────────────────
export const carbonApi = {
  calculate: async (payload: Record<string, unknown>) => {
    return fetchClient('/carbon/calculate', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  compare: async (payload: Record<string, unknown>) => {
    return fetchClient('/carbon/compare', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  recommend: async (payload: Record<string, unknown>) => {
    return fetchClient('/carbon/recommend', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  getHistory: async () => {
    return fetchClient('/carbon/history', {
      method: 'GET',
    });
  },
};

// ─── Reference Data Endpoints ─────────────────────────────────────────────────
export const referenceApi = {
  getRegions: async () => {
    return fetchClient('/reference/regions', {
      method: 'GET',
    });
  },
  getInstances: async () => {
    return fetchClient('/reference/instances', {
      method: 'GET',
    });
  },
};

// ─── Admin Endpoints ─────────────────────────────────────────────────────────
export const adminApi = {
  getEmissions: async (provider = 'All', region = 'All', project = 'All'): Promise<any> => {
    return fetchClient(`/admin/emissions?provider=${encodeURIComponent(provider)}&region=${encodeURIComponent(region)}&project=${encodeURIComponent(project)}`, {
      method: 'GET',
    });
  },

  deleteProject: async (id: string): Promise<any> => {
    return fetchClient(`/admin/projects/${id}`, { method: 'DELETE' });
  },

  disconnectProject: async (id: string): Promise<any> => {
    return fetchClient(`/admin/projects/${id}/disconnect`, { method: 'POST' });
  },

  addDeployment: async (projectId: string, payload: { role?: string; label?: string }): Promise<any> => {
    return fetchClient(`/admin/projects/${projectId}/deployments`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  deleteDeployment: async (projectId: string, deploymentId: string): Promise<any> => {
    return fetchClient(`/admin/projects/${projectId}/deployments/${deploymentId}`, {
      method: 'DELETE',
    });
  },

  getProjectStats: async (id: string): Promise<any> => {
    return fetchClient(`/admin/projects/${id}/stats`, { method: 'GET' });
  },

  migrateEmission: async (id: string, targetRegion: string): Promise<any> => {
    return fetchClient(`/admin/emissions/${id}/migrate`, {
      method: 'POST',
      body: JSON.stringify({ targetRegion }),
    });
  },

  getNotifications: async (): Promise<any> => {
    return fetchClient('/admin/notifications', {
      method: 'GET',
    });
  },

  deleteNotification: async (id: string): Promise<any> => {
    return fetchClient(`/admin/notifications/${id}`, { method: 'DELETE' });
  },

  getAuditLogs: async (page = 1, pageSize = 20): Promise<any> => {
    return fetchClient(`/admin/audit-logs?page=${page}&pageSize=${pageSize}`, {
      method: 'GET',
    });
  },

  deleteAuditLog: async (id: string): Promise<any> => {
    return fetchClient(`/admin/audit-logs/${id}`, { method: 'DELETE' });
  },

  getDashboard: async (projectId?: string, projectName?: string): Promise<DashboardData> => {
    const params = new URLSearchParams();
    if (projectId && projectId !== 'all') params.append('projectId', projectId);
    if (projectName && projectName !== 'all') params.append('projectName', projectName);
    const qs = params.toString();
    return fetchClient(`/admin/dashboard${qs ? `?${qs}` : ''}`, {
      method: 'GET',
    });
  },

  getUsers: async (page = 1, pageSize = 20): Promise<UsersResponse> => {
    return fetchClient(`/admin/users?page=${page}&pageSize=${pageSize}`, {
      method: 'GET',
    });
  },


  getFeatureFlags: async (): Promise<FeatureFlagsResponse> => {
    return fetchClient('/admin/feature-flags', {
      method: 'GET',
    });
  },

  toggleFeatureFlag: async (id: string, enabled: boolean): Promise<void> => {
    return fetchClient(`/admin/feature-flags/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ enabled }),
    });
  },

  getApiKeys: async (page = 1, pageSize = 20): Promise<ApiKeysResponse> => {
    return fetchClient(`/admin/api-keys?page=${page}&pageSize=${pageSize}`, {
      method: 'GET',
    });
  },

  createApiKey: async (payload: CreateApiKeyPayload): Promise<{ key: string; id: string }> => {
    return fetchClient('/admin/api-keys', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  revokeApiKey: async (id: string): Promise<void> => {
    return fetchClient(`/admin/api-keys/${id}`, {
      method: 'DELETE',
    });
  },

  deleteApiKey: async (id: string): Promise<void> => {
    return fetchClient(`/admin/api-keys/${id}/hard`, {
      method: 'DELETE',
    });
  },

  inviteUser: async (payload: { name: string; email: string; role?: string; projectName?: string }): Promise<{ success: boolean; message: string }> => {
    return fetchClient('/admin/users/invite', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  removeUser: async (id: string): Promise<{ success: boolean; message: string }> => {
    return fetchClient(`/admin/users/${id}`, {
      method: 'DELETE',
    });
  },
};

// ─── Agents Endpoints ────────────────────────────────────────────────────────
export const agentsApi = {
  triggerReporter: async (projectId: string): Promise<any> => {
    return fetchClient(`/agents/trigger/reporter?projectId=${projectId}`, {
      method: 'POST',
    });
  },
  triggerOrchestrator: async (projectId: string, instanceId?: string): Promise<any> => {
    let url = `/agents/trigger/orchestrator?projectId=${projectId}`;
    if (instanceId) {
      url += `&instanceId=${encodeURIComponent(instanceId)}`;
    }
    return fetchClient(url, { method: 'POST' });
  },
  triggerAnalyst: async (projectId: string): Promise<any> => {
    return fetchClient(`/agents/trigger/analyst?projectId=${projectId}`, {
      method: 'POST',
    });
  },
};

// ─── Connect Endpoints ───────────────────────────────────────────────────────
export const connectApi = {
  getPlatforms: async (): Promise<any> => {
    return fetchClient('/connect/platforms');
  },
  connectPlatformToken: async (payload: { projectId: string; platform: string; token: string; projectSlug?: string }): Promise<any> => {
    return fetchClient('/connect/platform-token', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  revokePlatformToken: async (projectId: string, platform: string): Promise<any> => {
    return fetchClient(`/connect/platform-token/${encodeURIComponent(platform)}?projectId=${encodeURIComponent(projectId)}`, {
      method: 'DELETE',
    });
  },
};
