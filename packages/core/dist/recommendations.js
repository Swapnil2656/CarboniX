"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecommendation = getRecommendation;
const gridCache_1 = require("./gridCache");
async function getRecommendation(provider, currentRegion, currentCo2KgMonth, totalFinalEnergyKwh) {
    // Find all regions for this provider (from our hardcoded list or DB later)
    // For now, we use the keys in DEFAULT_GRID_INTENSITIES as a proxy for available regions
    const allRegions = Object.keys(gridCache_1.DEFAULT_GRID_INTENSITIES);
    // Find the cleanest region
    let cleanestRegion = currentRegion;
    let lowestIntensity = await (0, gridCache_1.getGridIntensity)(currentRegion);
    for (const region of allRegions) {
        const intensity = await (0, gridCache_1.getGridIntensity)(region);
        if (intensity < lowestIntensity) {
            lowestIntensity = intensity;
            cleanestRegion = region;
        }
    }
    if (cleanestRegion !== currentRegion) {
        const cleanCo2GramsMonth = totalFinalEnergyKwh * lowestIntensity;
        const cleanCo2KgMonth = cleanCo2GramsMonth / 1000;
        const reductionPercent = ((currentCo2KgMonth - cleanCo2KgMonth) / currentCo2KgMonth) * 100;
        if (reductionPercent > 10) {
            return {
                recommendedRegion: cleanestRegion,
                recommendedCo2Kg: cleanCo2KgMonth,
                reductionPercent: parseFloat(reductionPercent.toFixed(1)),
                recommendation: `Switch to ${cleanestRegion} to reduce emissions by ~${Math.round(reductionPercent)}%`
            };
        }
    }
    return {};
}
