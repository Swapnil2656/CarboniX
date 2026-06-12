import { getCarbonRating, CarbonRating } from './carbon.rating';
import { getEquivalent } from './carbon.equivalents';
import { regions, instanceTypes, providers } from '../reference/reference.data';

export interface CarbonEngineInput {
  provider: string;
  region: string;
  instanceType: string;
  instanceCount: number;
  hoursPerMonth: number;
  cpuUtilization: number; // 0 to 1
  storageGb: number;
  ramGb?: number; // override
}

export interface CarbonEngineOutput {
  cpuEnergyKwh: number;
  memoryEnergyKwh: number;
  storageEnergyKwh: number;
  totalEnergyKwh: number;
  gridIntensity: number;
  co2GramsHour: number;
  co2KgMonth: number;
  co2KgYear: number;
  rating: CarbonRating;
  equivalentString: string;
  recommendedRegion?: string;
  recommendedCo2Kg?: number;
  reductionPercent?: number;
  recommendation?: string;
}

export async function calculateCarbon(input: CarbonEngineInput): Promise<CarbonEngineOutput> {
  const providerData = providers.find(p => p.key === input.provider.toUpperCase());
  const pue = providerData?.defaultPue || 1.2;

  const instance = instanceTypes.find(i => i.name === input.instanceType && i.provider === input.provider.toUpperCase());
  if (!instance) {
    throw new Error(`Instance type ${input.instanceType} not found for provider ${input.provider}`);
  }

  const regionData = regions.find(r => r.code === input.region && r.provider === input.provider.toUpperCase());
  const gridIntensity = regionData?.gridIntensity || 400; // fallback if not found

  const cpuTdp = instance.cpuTdpWatts;
  const ram = input.ramGb || instance.memoryGb;

  const cpuEnergy = (cpuTdp * input.cpuUtilization * input.hoursPerMonth * input.instanceCount) / 1000;
  const memEnergy = (ram * 0.000392 * input.hoursPerMonth * input.instanceCount);
  const diskEnergy = (input.storageGb * 0.0000002 * input.hoursPerMonth * input.instanceCount);

  const totalIT = cpuEnergy + memEnergy + diskEnergy;
  const totalFinal = totalIT * pue;

  const co2GramsMonth = totalFinal * gridIntensity;
  const co2KgMonth = co2GramsMonth / 1000;

  const rating = getCarbonRating(co2KgMonth);
  const equivalentString = getEquivalent(co2KgMonth);

  // Recommendations: Find cleanest region for this provider
  const allProviderRegions = regions.filter(r => r.provider === input.provider.toUpperCase());
  const cleanestRegion = allProviderRegions.reduce((prev, curr) => prev.gridIntensity < curr.gridIntensity ? prev : curr, allProviderRegions[0]);

  let recommendationData = {};
  if (cleanestRegion && cleanestRegion.code !== input.region) {
    const cleanCo2GramsMonth = totalFinal * cleanestRegion.gridIntensity;
    const cleanCo2KgMonth = cleanCo2GramsMonth / 1000;
    const reductionPercent = ((co2KgMonth - cleanCo2KgMonth) / co2KgMonth) * 100;
    
    if (reductionPercent > 10) {
      recommendationData = {
        recommendedRegion: cleanestRegion.code,
        recommendedCo2Kg: cleanCo2KgMonth,
        reductionPercent: parseFloat(reductionPercent.toFixed(1)),
        recommendation: `Switch to ${cleanestRegion.code} to reduce by ~${Math.round(reductionPercent)}%`
      };
    }
  }

  return {
    cpuEnergyKwh: cpuEnergy,
    memoryEnergyKwh: memEnergy,
    storageEnergyKwh: diskEnergy,
    totalEnergyKwh: totalFinal,
    gridIntensity,
    co2GramsHour: co2GramsMonth / input.hoursPerMonth,
    co2KgMonth,
    co2KgYear: co2KgMonth * 12,
    rating,
    equivalentString,
    ...recommendationData
  };
}
