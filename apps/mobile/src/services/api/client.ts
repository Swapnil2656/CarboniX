import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// 1. Create an Axios instance pointing to the Express backend (services/api)
// NOTE: During local development, use your machine's local IP address or localhost depending on simulator.
// For physical devices connected via USB, we use 127.0.0.1 with adb reverse
const fallbackUrl = Platform.OS === 'android' ? 'http://10.0.2.2:4000/api/v1' : 'http://localhost:4000/api/v1';
export let API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || fallbackUrl;

const FALLBACK_APIS = (process.env.EXPO_PUBLIC_FALLBACK_API_URLS || '').split(',').filter(Boolean);
const ALL_API_URLS = [API_BASE_URL, ...FALLBACK_APIS];
let currentApiIndex = 0;

export const apiClient = axios.create({
  baseURL: ALL_API_URLS[currentApiIndex],
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function setApiBaseUrl(newUrl: string) {
  API_BASE_URL = newUrl.trim();
  apiClient.defaults.baseURL = API_BASE_URL;
  ALL_API_URLS[0] = API_BASE_URL;
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
    // if (customUrl) {
    //   config.baseURL = customUrl;
    //   ALL_API_URLS[0] = customUrl;
    // }
    config.baseURL = ALL_API_URLS[currentApiIndex]; // Ensure we use the current working API

    const token = await SecureStore.getItemAsync('auth_token');
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token || 'mock-token-for-dev'}`;
    }
  } catch (error) {
    // Ignore store errors
  }
  return config;
});

// 3. Response interceptor for error handling and API fallback cascade
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    
    // If the error is network related or server unavailable (502, 503, 429)
    if (
      config && 
      (!error.response || [502, 503, 429].includes(error.response.status))
    ) {
      if (!config._retryCount) {
        config._retryCount = 0;
      }
      
      // Cascade down the fallback list
      if (config._retryCount < ALL_API_URLS.length - 1) {
        config._retryCount += 1;
        currentApiIndex = (currentApiIndex + 1) % ALL_API_URLS.length;
        console.warn(`[Fallback] Switching to API: ${ALL_API_URLS[currentApiIndex]}`);
        
        config.baseURL = ALL_API_URLS[currentApiIndex];
        apiClient.defaults.baseURL = ALL_API_URLS[currentApiIndex];
        
        // Retry request
        return apiClient(config);
      } else {
        // Reset index if all failed, so next requests start fresh
        currentApiIndex = 0;
      }
    }
    
    // Implement token refresh or logout logic here if error.response.status === 401
    return Promise.reject(error);
  }
);
