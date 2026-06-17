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
  const instance = instanceCoefficients.find(
    (i) => i.name === input.instanceType && i.provider === provider
  );

  if (!instance) {
    throw new Error(`Instance type ${input.instanceType} not found for provider ${provider}`);
  }

  const cpuTdpWatts = instance.cpuTdpWatts;
  const memoryGb = input.ramGb || instance.memoryGb;

  // Master Formulas:
  // CPU Energy = CPU TDP (Watts) × utilization% × hours × instance_count / 1000
  const cpuEnergyKwh = (cpuTdpWatts * input.cpuUtilization * input.hoursPerMonth * input.instanceCount) / 1000;

  // Memory Energy = RAM (GB) × 0.00038 kW/GB × hours × instance_count
  // 0.38 W/GB / 1000 = 0.00038
  const memoryEnergyKwh = memoryGb * 0.00038 * input.hoursPerMonth * input.instanceCount;

  // Storage Energy = Disk (GB) × 0.0016 W/GB × hours × instance_count / 1000
  // 0.0016 W/GB / 1000 = 0.0000016 kW/GB
  const storageEnergyKwh = input.storageGb * 0.0000016 * input.hoursPerMonth * input.instanceCount;

  const totalItEnergyKwh = cpuEnergyKwh + memoryEnergyKwh + storageEnergyKwh;
  
  const pue = getProviderPue(provider, input.region);
  const totalFinalEnergyKwh = totalItEnergyKwh * pue;

  const gridIntensity = await getGridIntensity(input.region);
  
  const co2GramsMonth = totalFinalEnergyKwh * gridIntensity;
  const co2KgMonth = co2GramsMonth / 1000;
  
  const co2GramsHour = co2GramsMonth / input.hoursPerMonth;

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
