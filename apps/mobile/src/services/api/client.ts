import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';


// 1. Create an Axios instance pointing to the Express backend (services/api)
// NOTE: During local development, use your machine's local IP address or localhost depending on simulator.
// For physical devices connected via USB, we use 127.0.0.1 with adb reverse
const fallbackUrl = Platform.OS === 'android' ? 'http://10.0.2.2:4000/api/v1' : 'http://localhost:4000/api/v1';
export let API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || fallbackUrl;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function setApiBaseUrl(newUrl: string) {
  API_BASE_URL = newUrl.trim();
  apiClient.defaults.baseURL = API_BASE_URL;
  try {
    await SecureStore.setItemAsync('custom_api_url', API_BASE_URL);
  } catch (e) {
    // ignore
  }
}

// 2. Add interceptors to attach the JWT token (if authenticated) and dynamically use custom_api_url
apiClient.interceptors.request.use(async (config) => {
  try {
    const customUrl = await SecureStore.getItemAsync('custom_api_url');
    if (customUrl) {
      config.baseURL = customUrl;
      apiClient.defaults.baseURL = customUrl;
    }
    const token = await SecureStore.getItemAsync('auth_token');
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token || 'mock-token-for-dev'}`;
    }
  } catch (error) {
    // Ignore store errors
  }
  return config;
});

// 3. Response interceptor for error handling (e.g., token expiration)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Implement token refresh or logout logic here if error.response.status === 401
    return Promise.reject(error);
  }
);
