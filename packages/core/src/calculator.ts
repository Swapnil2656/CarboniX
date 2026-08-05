import { getGridIntensity, getProviderPue } from './gridCache';
import instanceCoefficients from '../data/instance-coefficients.json';

export interface CalculationInput {
  provider: string;
  region: string;
  instanceType: string;
  instanceCount: number;
  hoursPerMonth: number;
  cpuUtilization: number; // 0.0 to 1.0
  storageGb: number;
  ramGb?: number; // Override
}

export interface CalculationResult {
  cpuEnergyKwh: number;
  memoryEnergyKwh: number;
  storageEnergyKwh: number;
  totalItEnergyKwh: number;
  pue: number;
  totalFinalEnergyKwh: number;
  gridIntensity: number; // gCO2/kWh
  co2GramsMonth: number;
  co2KgMonth: number;
  co2GramsHour: number;
  computePercentage: number;
  memoryPercentage: number;
  storagePercentage: number;
}

export async function calculateCarbon(input: CalculationInput): Promise<CalculationResult> {
  const provider = input.provider.toUpperCase();
  
  const underlyingProviderMap: Record<string, string> = {
    VERCEL: 'AWS',
    NETLIFY: 'AWS',
    RENDER: 'AWS',
    HEROKU: 'AWS',
    SUPABASE: 'AWS',
    DIGITALOCEAN: 'AWS',
    CLOUDFLARE_WORKERS: 'AWS',
    CLOUDFLARE_PAGES: 'AWS',
    DENO_DEPLOY: 'GCP',
    RAILWAY: 'GCP'
  };
  const actualProvider = underlyingProviderMap[provider] || provider;

  const instance = instanceCoefficients.find(
    (i) => i.name === input.instanceType && i.provider === actualProvider
  );

  if (!instance) {
    throw new Error(`Instance type ${input.instanceType} not found for provider ${provider}`);
  }

  const cpuTdpWatts = instance.cpuTdpWatts;
  const memoryGb = input.ramGb || instance.memoryGb;

  // Fallbacks to prevent NaN
  const cpuUtil = input.cpuUtilization ?? 1.0;
  const storage = input.storageGb || 0;
  const count = input.instanceCount || 1;
  const hours = input.hoursPerMonth || 730;

  // Master Formulas:
  // CPU Energy = CPU TDP (Watts) × utilization% × hours × instance_count / 1000
  const cpuEnergyKwh = (cpuTdpWatts * cpuUtil * hours * count) / 1000;

  // Memory Energy = RAM (GB) × 0.00038 kW/GB × hours × instance_count
  const memoryEnergyKwh = memoryGb * 0.00038 * hours * count;

  // Storage Energy = Disk (GB) × 0.0016 W/GB × hours × instance_count / 1000
  // 0.0016 W/GB / 1000 = 0.0000016 kW/GB
  const storageEnergyKwh = storage * 0.0000016 * hours * count;

  const totalItEnergyKwh = cpuEnergyKwh + memoryEnergyKwh + storageEnergyKwh;
  
  const region = input.region.toLowerCase();
  const gridIntensity = await getGridIntensity(region);
  const pue = getProviderPue(actualProvider, region);
  const totalFinalEnergyKwh = totalItEnergyKwh * pue;
  
  const co2GramsMonth = totalFinalEnergyKwh * gridIntensity;
  const co2KgMonth = co2GramsMonth / 1000;
  
  const co2GramsHour = co2GramsMonth / hours;

  return {
    cpuEnergyKwh,
    memoryEnergyKwh,
    storageEnergyKwh,
    totalItEnergyKwh,
    pue,
    totalFinalEnergyKwh,
    gridIntensity,
    co2GramsMonth,
    co2KgMonth,
    co2GramsHour,
    computePercentage: (cpuEnergyKwh / totalItEnergyKwh) * 100,
    memoryPercentage: (memoryEnergyKwh / totalItEnergyKwh) * 100,
    storagePercentage: (storageEnergyKwh / totalItEnergyKwh) * 100
  };
}
