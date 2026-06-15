import { apiClient } from './client';

// Carbon API Endpoints
export const carbonApi = {
  calculate: async (payload: Record<string, unknown>) => {
    const response = await apiClient.post('/calculate', payload);
    return response.data;
  },
  compare: async (payload: Record<string, unknown>) => {
    const response = await apiClient.post('/compare', payload);
    return response.data;
  },
  recommend: async (payload: Record<string, unknown>) => {
    const response = await apiClient.post('/recommend', payload);
    return response.data;
  },
  getHistory: async () => {
    const response = await apiClient.get('/history');
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
    const response = await apiClient.get('/regions');
    return response.data;
  },
  getInstances: async () => {
    const response = await apiClient.get('/instances');
    return response.data;
  }
};
