import { fetchClient } from './client';

// Carbon API Endpoints
export const carbonApi = {
  calculate: async (payload: Record<string, unknown>) => {
    return fetchClient('/calculate', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  compare: async (payload: Record<string, unknown>) => {
    return fetchClient('/compare', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  recommend: async (payload: Record<string, unknown>) => {
    return fetchClient('/recommend', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  getHistory: async () => {
    return fetchClient('/history', {
      method: 'GET',
    });
  }
};

// Reference Data Endpoints
export const referenceApi = {
  getRegions: async () => {
    return fetchClient('/regions', {
      method: 'GET',
    });
  },
  getInstances: async () => {
    return fetchClient('/instances', {
      method: 'GET',
    });
  }
};

// Admin Endpoints
export const adminApi = {
  getDashboard: async () => {
    return fetchClient('/admin/dashboard', {
      method: 'GET',
    });
  },
  getUsers: async () => {
    return fetchClient('/admin/users', {
      method: 'GET',
    });
  }
};
