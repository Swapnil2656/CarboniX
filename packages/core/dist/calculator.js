"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCarbon = calculateCarbon;
const gridCache_1 = require("./gridCache");
const instance_coefficients_json_1 = __importDefault(require("../data/instance-coefficients.json"));
async function calculateCarbon(input) {
    const provider = input.provider.toUpperCase();
    const instance = instance_coefficients_json_1.default.find((i) => i.name === input.instanceType && i.provider === provider);
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
    const pue = (0, gridCache_1.getProviderPue)(provider, input.region);
    const totalFinalEnergyKwh = totalItEnergyKwh * pue;
    const gridIntensity = await (0, gridCache_1.getGridIntensity)(input.region);
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
