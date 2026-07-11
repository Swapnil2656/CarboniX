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
// Map cloud regions to ISO 3166-1 alpha-2 country codes for emissions.dev
const getCountryFromRegion = (region) => {
    if (region.startsWith('us-'))
        return 'US';
    if (region.startsWith('eu-west'))
        return 'IE'; // Ireland for AWS eu-west-1
    if (region.startsWith('eu-central'))
        return 'DE'; // Frankfurt
    if (region.startsWith('europe-west'))
        return 'BE'; // GCP Belgium
    if (region.startsWith('ap-south'))
        return 'IN'; // Mumbai
    if (region.startsWith('ap-northeast'))
        return 'JP'; // Tokyo
    if (region.startsWith('ap-southeast'))
        return 'SG'; // Singapore
    return 'US'; // default
};
async function getGridIntensity(region) {
    const now = Date.now();
    if (cache[region] && (now - cache[region].timestamp < CACHE_TTL_MS)) {
        return cache[region].intensity;
    }
    let intensity = exports.DEFAULT_GRID_INTENSITIES[region] || 400; // global average fallback
    const apiKey = process.env.EMISSIONS_DEV_API_KEY || 'em_live_BRnhlaMwNsojVQqErueNPGvS36XXrZ1VV6Eo7S';
    if (apiKey) {
        try {
            const countryCode = getCountryFromRegion(region);
            // Fetch emissions for 1000 kWh. The result in kg CO2e is mathematically equal to g CO2e / kWh
            const res = await fetch(`https://api.emissions.dev/v1/electricity/emissions?kwh=1000&country=${countryCode}`, {
                headers: { 'Authorization': `Bearer ${apiKey}` }
            });
            if (res.ok) {
                const data = await res.json();
                if (data && typeof data.co2e === 'number') {
                    intensity = data.co2e; // 1000 kWh -> kg CO2e == g/kWh
                }
            }
            else {
                const errData = await res.json().catch(() => ({}));
                console.warn(`[GridCache] emissions.dev API failed (Status ${res.status}):`, errData.error?.message || 'Unknown error');
            }
        }
        catch (error) {
            console.warn(`[GridCache] Failed to fetch live intensity for ${region}, using fallback: ${error.message}`);
        }
    }
    cache[region] = {
        intensity,
        timestamp: now
    };
    return intensity;
}
function getProviderPue(provider, region) {
    if (exports.REGION_PUE_OVERRIDES[region]) {
        return exports.REGION_PUE_OVERRIDES[region];
    }
    return exports.DEFAULT_PUE[provider.toUpperCase()] || 1.2;
}
