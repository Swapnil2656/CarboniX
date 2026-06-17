"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REGION_PUE_OVERRIDES = exports.DEFAULT_PUE = exports.DEFAULT_GRID_INTENSITIES = void 0;
exports.getGridIntensity = getGridIntensity;
exports.getProviderPue = getProviderPue;
// Fallback grid intensities in gCO2/kWh
exports.DEFAULT_GRID_INTENSITIES = {
    'ap-south-1': 750,
    'us-east-1': 415,
    'eu-west-1': 316,
    'ap-southeast-1': 408,
    'us-west-2': 130,
    'eu-north-1': 8,
    'eu-central-1': 338,
    'europe-north1': 10 // GCP Finland
};
exports.DEFAULT_PUE = {
    'AWS': 1.2,
    'GCP': 1.1,
    'AZURE': 1.18
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
