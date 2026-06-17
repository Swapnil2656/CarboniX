export interface CalculationInput {
    provider: string;
    region: string;
    instanceType: string;
    instanceCount: number;
    hoursPerMonth: number;
    cpuUtilization: number;
    storageGb: number;
    ramGb?: number;
}
export interface CalculationResult {
    cpuEnergyKwh: number;
    memoryEnergyKwh: number;
    storageEnergyKwh: number;
    totalItEnergyKwh: number;
    pue: number;
    totalFinalEnergyKwh: number;
    gridIntensity: number;
    co2GramsMonth: number;
    co2KgMonth: number;
    co2GramsHour: number;
    computePercentage: number;
    memoryPercentage: number;
    storagePercentage: number;
}
export declare function calculateCarbon(input: CalculationInput): Promise<CalculationResult>;
