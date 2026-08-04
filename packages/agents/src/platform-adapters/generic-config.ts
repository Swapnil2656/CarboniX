import { z } from 'zod';
import { PlatformAdapter } from './types';

export const GenericPlatformConfigSchema = z.object({
  platform: z.string(),
  capabilities: z.object({
    canFetchUsage: z.boolean(),
    canSetRegion: z.boolean(),
  }),
  baseUrl: z.string().url(),
  authHeaderFormat: z.string(), // e.g. "Bearer {token}"
  verifyEndpoint: z.string(),
  usageEndpoint: z.string().optional(),
  
  // Data extraction paths (dot-notation, e.g., "data.0.metrics.cpu")
  metaPath: z.string().optional(), // Used to extract account/user name during verify
  metricsPath: z.string().optional(), // Used to extract CPU/compute metrics
  durationPath: z.string().optional(), // Used to extract execution duration
  regionPath: z.string().optional(), // Used to extract region string
});

export type GenericPlatformConfig = z.infer<typeof GenericPlatformConfigSchema>;

export const GENERIC_PLATFORMS: Record<string, GenericPlatformConfig> = {
  'SUPABASE': {
    platform: 'SUPABASE',
    capabilities: {
      canFetchUsage: true,
      canSetRegion: false,
    },
    baseUrl: 'https://api.supabase.com/v1',
    authHeaderFormat: 'Bearer {token}',
    verifyEndpoint: '/projects',
    usageEndpoint: '/projects/{projectRef}/metrics',
    metaPath: '0.name', // Assuming first project name acts as account identity if no /me route
    metricsPath: 'data.0.cpu_usage',
    durationPath: 'data.0.disk_io',
  },
  'DIGITALOCEAN': {
    platform: 'DIGITALOCEAN',
    capabilities: {
      canFetchUsage: true, // Note: they have a monitoring API
      canSetRegion: false, // DO droplets are immutable per region usually without snapshot/recreate
    },
    baseUrl: 'https://api.digitalocean.com/v2',
    authHeaderFormat: 'Bearer {token}',
    verifyEndpoint: '/account',
    usageEndpoint: '/monitoring/metrics/droplet/cpu', // Example URL
    metaPath: 'account.email',
    metricsPath: 'data.result.0.value.1', // Example PromQL-like result structure
  },
  'HEROKU': {
    platform: 'HEROKU',
    capabilities: {
      canFetchUsage: true,
      canSetRegion: false,
    },
    baseUrl: 'https://api.heroku.com',
    authHeaderFormat: 'Bearer {token}',
    verifyEndpoint: '/account',
    usageEndpoint: '/apps/{projectRef}/metrics',
    metaPath: 'email',
    metricsPath: 'data.cpu',
  }
};

// Validate on load (fail fast)
Object.values(GENERIC_PLATFORMS).forEach(config => {
  GenericPlatformConfigSchema.parse(config);
});
