import { apiClient } from './client';

// Carbon API Endpoints
export const carbonApi = {
  calculate: async (payload: Record<string, unknown>) => {
    const response = await apiClient.post('/carbon/calculate', payload);
    return response.data;
  },
  compare: async (payload: Record<string, unknown>) => {
    const response = await apiClient.post('/carbon/compare', payload);
    return response.data;
  },
  recommend: async (payload: Record<string, unknown>) => {
    const response = await apiClient.post('/carbon/recommend', payload);
    return response.data;
  },
  getHistory: async (params?: { from?: string; to?: string; provider?: string }) => {
    const response = await apiClient.get('/carbon/history', { params });
    return response.data;
  },
  deleteHistory: async (id: string) => {
    const response = await apiClient.delete(`/carbon/history/${id}`);
    return response.data;
  },
  getDashboard: async () => {
    const response = await apiClient.get('/carbon/dashboard');
    return response.data;
  },
  getNotifications: async () => {
    const response = await apiClient.get('/carbon/notifications');
    return response.data;
  },
  markNotificationRead: async (id: string) => {
    const response = await apiClient.patch(`/carbon/notifications/${id}/read`);
    return response.data;
  }
};

// Agents API Endpoints
export const agentsApi = {
  getAgentRuns: async (params?: { limit?: number; offset?: number; type?: string }) => {
    const response = await apiClient.get('/agents/runs', { params });
    return response.data;
  },
  getLatestBRSR: async () => {
    const response = await apiClient.get('/agents/report/brsr');
    return response.data;
  },
  triggerReporter: async (projectId: string) => {
    const response = await apiClient.post(`/agents/trigger/reporter?projectId=${projectId}`);
    return response.data;
  }
};

// Admin API Endpoints
export const adminApi = {
  getAuditLogs: async (params?: { page?: number; pageSize?: number }) => {
    const response = await apiClient.get('/admin/audit-logs', { params });
    return response.data;
  },
  deleteAuditLog: async (id: string) => {
    const response = await apiClient.delete(`/admin/audit-logs/${id}`);
    return response.data;
  },
  getDashboardStats: async () => {
    const response = await apiClient.get('/admin/dashboard');
    return response.data;
  },
  getUsers: async (params?: { page?: number; limit?: number }) => {
    const response = await apiClient.get('/admin/users', { params });
    return response.data;
  },
  getEmissions: async (provider = 'All', region = 'All', project = 'All') => {
    const response = await apiClient.get('/admin/emissions', { params: { provider, region, project } });
    return response.data;
  },
  deleteProject: async (id: string) => {
    const response = await apiClient.delete(`/admin/projects/${id}`);
    return response.data;
  },
  disconnectProject: async (id: string) => {
    const response = await apiClient.post(`/admin/projects/${id}/disconnect`);
    return response.data;
  },
  getProjectStats: async (id: string) => {
    const response = await apiClient.get(`/admin/projects/${id}/stats`);
    return response.data;
  },
  addDeployment: async (projectId: string, payload: { role?: string; label?: string }) => {
    const response = await apiClient.post(`/admin/projects/${projectId}/deployments`, payload);
    return response.data;
  },
  deleteDeployment: async (projectId: string, deploymentId: string) => {
    const response = await apiClient.delete(`/admin/projects/${projectId}/deployments/${deploymentId}`);
    return response.data;
  },
  getApiKeys: async () => {
    const response = await apiClient.get('/admin/api-keys');
    return response.data;
  },
  getFeatureFlags: async () => {
    const response = await apiClient.get('/admin/feature-flags');
    return response.data;
  },
  toggleFeatureFlag: async (id: string, enabled: boolean) => {
    const response = await apiClient.patch(`/admin/feature-flags/${id}`, { enabled });
    return response.data;
  },
  createApiKey: async (payload: { name: string; permissions?: string[]; expiration?: string; projectId?: string }) => {
    const response = await apiClient.post('/admin/api-keys', payload);
    return response.data;
  },
  revokeApiKey: async (id: string) => {
    const response = await apiClient.delete(`/admin/api-keys/${id}`);
    return response.data;
  },
  deleteApiKey: async (id: string) => {
    const response = await apiClient.delete(`/admin/api-keys/${id}/hard`);
    return response.data;
  },
  removeUser: async (id: string) => {
    const response = await apiClient.delete(`/admin/users/${id}`);
    return response.data;
  }
};

// Auth Endpoints (if you are using the separate express backend for mobile auth)
export const authApi = {
  login: async (credentials: Record<string, unknown>) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },
  signup: async (credentials: Record<string, unknown>) => {
    const response = await apiClient.post('/auth/signup', credentials);
    return response.data;
  },
  getProfile: async () => {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },
  updateProfile: async (data: Record<string, unknown>) => {
    const response = await apiClient.patch('/auth/me', data);
    return response.data;
  },
  registerPushToken: async (token: string, platform: string) => {
    const response = await apiClient.post('/auth/push-token', { token, platform });
    return response.data;
  },
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  }
};

// Reference Data Endpoints
export const referenceApi = {
  getRegions: async () => {
    const response = await apiClient.get('/reference/regions');
    return response.data;
  },
  getInstances: async () => {
    const response = await apiClient.get('/reference/instances');
    return response.data;
  },
  getRegionsRanked: async (provider: string) => {
    const response = await apiClient.get('/reference/regions/ranked', { params: { provider } });
    return response.data;
  }
};

// AI Agent Endpoints
export const aiApi = {
  getHistory: async () => {
    const response = await apiClient.get('/ai/history');
    return response.data;
  },
  clearHistory: async () => {
    const response = await apiClient.delete('/ai/history');
    return response.data;
  },
  chat: async (message: string, history: any[]) => {
    const response = await apiClient.post('/ai/chat', { message, history });
    return response.data;
  }
};

// Connect API Endpoints
export const connectApi = {
  getPlatforms: async () => {
    const response = await apiClient.get('/connect/platforms');
    return response.data;
  },
  connectPlatform: async (payload: { projectId: string; platform: string; token: string; projectSlug?: string }) => {
    const response = await apiClient.post('/connect/connect', payload);
    return response.data;
  },
  revokePlatform: async (projectId: string, platform: string) => {
    const response = await apiClient.post('/connect/revoke', { projectId, platform });
    return response.data;
  }
};
