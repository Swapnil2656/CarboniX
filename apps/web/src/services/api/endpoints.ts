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

  getAuditLogs: async (): Promise<any> => {
    return fetchClient('/admin/audit-logs', {
      method: 'GET',
    });
  },

  // TODO: implement GET /api/v1/admin/dashboard on the backend
  getDashboard: async (): Promise<DashboardData> => {
    return fetchClient('/admin/dashboard', {
      method: 'GET',
    });
  },

  // TODO: implement GET /api/v1/admin/users on the backend
  getUsers: async (page = 1, pageSize = 20): Promise<UsersResponse> => {
    return fetchClient(`/admin/users?page=${page}&pageSize=${pageSize}`, {
      method: 'GET',
    });
  },


  // TODO: implement GET /api/v1/admin/feature-flags on the backend
  getFeatureFlags: async (): Promise<FeatureFlagsResponse> => {
    return fetchClient('/admin/feature-flags', {
      method: 'GET',
    });
  },

  // TODO: implement PATCH /api/v1/admin/feature-flags/:id on the backend
  toggleFeatureFlag: async (id: string, enabled: boolean): Promise<void> => {
    return fetchClient(`/admin/feature-flags/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ enabled }),
    });
  },

  // TODO: implement GET /api/v1/admin/api-keys on the backend
  getApiKeys: async (): Promise<ApiKeysResponse> => {
    return fetchClient('/admin/api-keys', {
      method: 'GET',
    });
  },

  // TODO: implement POST /api/v1/admin/api-keys on the backend
  createApiKey: async (payload: CreateApiKeyPayload): Promise<{ key: string; id: string }> => {
    return fetchClient('/admin/api-keys', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // TODO: implement DELETE /api/v1/admin/api-keys/:id on the backend
  revokeApiKey: async (id: string): Promise<void> => {
    return fetchClient(`/admin/api-keys/${id}`, {
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
