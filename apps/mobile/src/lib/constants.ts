/**
 * App Constants
 *
 * API URLs, timing values, and configuration constants.
 */

export const APP_NAME = 'Carbonix';

export const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

// Feature flag polling interval (ms)
export const FEATURE_FLAG_POLL_INTERVAL = 5 * 60 * 1000; // 5 minutes

// Stale time for React Query caches (ms)
export const STALE_TIMES = {
  regions: 24 * 60 * 60 * 1000,     // 24 hours — rarely changes
  instances: 24 * 60 * 60 * 1000,   // 24 hours
  providers: 24 * 60 * 60 * 1000,   // 24 hours
  history: 30 * 1000,                // 30 seconds
  featureFlags: 5 * 60 * 1000,      // 5 minutes
} as const;

// Deep link scheme
export const DEEP_LINK_SCHEME = 'carbonix';
