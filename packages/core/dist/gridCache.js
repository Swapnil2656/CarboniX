"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REGION_PUE_OVERRIDES = exports.DEFAULT_PUE = exports.PROVIDER_REGIONS = exports.DEFAULT_GRID_INTENSITIES = void 0;
exports.getGridIntensity = getGridIntensity;
exports.getProviderPue = getProviderPue;
// Fallback grid intensities in gCO2/kWh
exports.DEFAULT_GRID_INTENSITIES = {
    // AWS Regions
    'ap-south-1': 750,
    'us-east-1': 415,
    'eu-west-1': 316,
    'ap-southeast-1': 408,
    'us-west-2': 130,
    'eu-north-1': 8,
    'eu-central-1': 338,
    // GCP Regions
    'europe-north1': 10,
    'us-central1': 350,
    'asia-south1': 700,
    // Azure Regions
    'northeurope': 300,
    'swedencentral': 15,
    'westus2': 150,
    // Vercel Regions (Mapped to AWS usually)
    'iad1': 415, // US East (N. Virginia)
    'sfo1': 130, // US West (N. California)
    'arn1': 8, // EU North (Stockholm)
    'sin1': 408, // SE Asia (Singapore)
    // Netlify Regions (Uses AWS names natively)
    // 'us-east-1' and 'eu-central-1' are already defined above
    // Railway Regions (Mapped to GCP)
    'us-west1': 350,
    'europe-west4': 12,
    // Render Regions
    'oregon': 130,
    'frankfurt': 338,
    // Other fallback global average
    'global-average': 400
};
exports.PROVIDER_REGIONS = {
    'AWS': ['ap-south-1', 'us-east-1', 'eu-west-1', 'ap-southeast-1', 'us-west-2', 'eu-north-1', 'eu-central-1'],
    'GCP': ['europe-north1', 'us-central1', 'asia-south1'],
    'AZURE': ['northeurope', 'swedencentral', 'westus2'],
    'VERCEL': ['iad1', 'sfo1', 'arn1', 'sin1'],
    'NETLIFY': ['us-east-1', 'eu-central-1'],
    'RAILWAY': ['us-west1', 'europe-west4'],
    'RENDER': ['oregon', 'frankfurt'],
    'OTHER': ['global-average']
};
exports.DEFAULT_PUE = {
    'AWS': 1.2,
    'GCP': 1.1,
    'AZURE': 1.18,
    'VERCEL': 1.2, // Runs mostly on AWS
    'NETLIFY': 1.2, // Runs mostly on AWS
    'RAILWAY': 1.1, // Runs mostly on GCP
    'RENDER': 1.15, // Mix of AWS/GCP
    'OTHER': 1.25 // Generic industry average
};
// Exception for specific green regions
exports.REGION_PUE_OVERRIDES = {
    'eu-north-1': 1.07 // Stockholm
};
// In-memory cache
const cache = {};
// 1 hour cache TTL
const CACHE_TTL_MS = 60 * 60 * 1000;
async function getGridIntensity(region) {
    const now = Date.now();
    if (cache[region] && (now - cache[region].timestamp < CACHE_TTL_MS)) {
        return cache[region].intensity;
    }
    // TODO: Add Electricity Maps API call here.
    // For now, if no API key is set or the call fails, we rely on the robust static fallback.
    const fallback = exports.DEFAULT_GRID_INTENSITIES[region] || 400; // global average fallback
    cache[region] = {
        intensity: fallback,
        timestamp: now
    };
    return fallback;
}
function getProviderPue(provider, region) {
    if (exports.REGION_PUE_OVERRIDES[region]) {
        return exports.REGION_PUE_OVERRIDES[region];
    }
    return exports.DEFAULT_PUE[provider.toUpperCase()] || 1.2;
}
