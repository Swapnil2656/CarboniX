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
  getHistory: async () => {
    const response = await apiClient.get('/carbon/history');
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
  }
};

// Admin API Endpoints
export const adminApi = {
  getDashboardStats: async () => {
    const response = await apiClient.get('/admin/dashboard');
    return response.data;
  },
  getUsers: async (params?: { page?: number; limit?: number }) => {
    const response = await apiClient.get('/admin/users', { params });
    return response.data;
  },
  getApiKeys: async () => {
    const response = await apiClient.get('/admin/api-keys');
    return response.data;
  },
  getFeatureFlags: async () => {
    const response = await apiClient.get('/admin/feature-flags');
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
  }
};
