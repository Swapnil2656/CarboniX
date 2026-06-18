import axios from 'axios';
import { useAuthStore } from '../store/authStore';

// For local testing: if using Android emulator, use 10.0.2.2. If iOS/web, use localhost.
// Alternatively, process.env.EXPO_PUBLIC_API_URL could be used.
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
