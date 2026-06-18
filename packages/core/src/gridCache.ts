// Fallback grid intensities in gCO2/kWh
export const DEFAULT_GRID_INTENSITIES: Record<string, number> = {
  'ap-south-1': 750,
  'us-east-1': 415,
  'eu-west-1': 316,
  'ap-southeast-1': 408,
  'us-west-2': 130,
  'eu-north-1': 8,
  'eu-central-1': 338,
  'europe-north1': 10 // GCP Finland
};

export const DEFAULT_PUE: Record<string, number> = {
  'AWS': 1.2,
  'GCP': 1.1,
  'AZURE': 1.18
};

// Exception for specific green regions
export const REGION_PUE_OVERRIDES: Record<string, number> = {
  'eu-north-1': 1.07 // Stockholm
};

interface CacheEntry {
  intensity: number;
  timestamp: number;
}

// In-memory cache
const cache: Record<string, CacheEntry> = {};

// 1 hour cache TTL
const CACHE_TTL_MS = 60 * 60 * 1000;

export async function getGridIntensity(region: string): Promise<number> {
  const now = Date.now();
  
  if (cache[region] && (now - cache[region].timestamp < CACHE_TTL_MS)) {
    return cache[region].intensity;
  }

  // TODO: Add Electricity Maps API call here.
  // For now, if no API key is set or the call fails, we rely on the robust static fallback.
  
  const fallback = DEFAULT_GRID_INTENSITIES[region] || 400; // global average fallback
  
  cache[region] = {
    intensity: fallback,
    timestamp: now
  };

  return fallback;
}

export function getProviderPue(provider: string, region: string): number {
  if (REGION_PUE_OVERRIDES[region]) {
    return REGION_PUE_OVERRIDES[region];
  }
  return DEFAULT_PUE[provider.toUpperCase()] || 1.2;
}
