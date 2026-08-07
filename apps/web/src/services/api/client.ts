import { getSession } from 'next-auth/react';

// 1. Fetch wrapper for API calls to the Express backend (services/api)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
const FALLBACK_APIS = (process.env.NEXT_PUBLIC_FALLBACK_API_URLS || '').split(',').filter(Boolean);
const ALL_API_URLS = [API_BASE_URL, ...FALLBACK_APIS];

let currentApiIndex = 0;

/**
 * Standard fetch client that automatically attaches headers and handles errors.
 */
export async function fetchClient(endpoint: string, options: RequestInit = {}) {
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Attach a JWT token for the backend from NextAuth session
  const session = await getSession();
  const token = (session as any)?.accessToken || (session as any)?.user?.accessToken;
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  let lastError;
  for (let i = currentApiIndex; i < ALL_API_URLS.length; i++) {
    const baseUrl = ALL_API_URLS[i];
    const url = `${baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, config);
      
      // Fallback if provider returns offline/quota errors
      if (response.status === 502 || response.status === 503 || response.status === 429) {
        throw new Error(`Provider at ${baseUrl} returned ${response.status}`);
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || `API Error: ${response.status}`);
      }

      currentApiIndex = i; // Stick to the working API
      
      // Some endpoints might return empty responses
      const text = await response.text();
      return text ? JSON.parse(text) : {};
    } catch (err: any) {
      console.warn(`[Fallback System] Request to ${baseUrl} failed:`, err);
      // We only fallback for certain errors. If it's a 4xx error (other than 429), it's probably a real API error.
      if (err.message && err.message.includes('API Error:') && !err.message.includes('502') && !err.message.includes('503') && !err.message.includes('429')) {
        throw err;
      }
      lastError = err;
    }
  }

  currentApiIndex = 0;
  throw lastError || new Error("All backend providers are currently offline.");
}
