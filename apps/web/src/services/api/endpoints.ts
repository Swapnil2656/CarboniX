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
  getEmissions: async (provider = 'All', region = 'All'): Promise<import('@/types/admin').EmissionsResponse> => {
    return fetchClient(`/admin/emissions?provider=${provider}&region=${region}`, {
      method: 'GET',
    });
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

  getAuditLogs: async (page = 1, pageSize = 20): Promise<any> => {
    return fetchClient(`/admin/audit-logs?page=${page}&pageSize=${pageSize}`, {
      method: 'GET',
    });
  },

  getDashboard: async (): Promise<DashboardData> => {
    return fetchClient('/admin/dashboard', {
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
