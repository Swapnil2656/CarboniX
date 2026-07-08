import { getGridIntensity, DEFAULT_GRID_INTENSITIES, PROVIDER_REGIONS } from './gridCache';

export interface RecommendationResult {
  recommendedRegion?: string;
  recommendedCo2Kg?: number;
  reductionPercent?: number;
  recommendation?: string;
}

export async function getRecommendation(
  provider: string,
  currentRegion: string,
  currentCo2KgMonth: number,
  totalFinalEnergyKwh: number
): Promise<RecommendationResult> {
  // Find all regions for this provider (from our hardcoded list or DB later)
  const allRegions = PROVIDER_REGIONS[provider.toUpperCase()] || Object.keys(DEFAULT_GRID_INTENSITIES);
  
  // Find the cleanest region
  let cleanestRegion = currentRegion;
  let lowestIntensity = await getGridIntensity(currentRegion);

  for (const region of allRegions) {
    const intensity = await getGridIntensity(region);
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
