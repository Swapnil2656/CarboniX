"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.providers = exports.instanceTypes = exports.regions = void 0;
exports.regions = [
    {
        id: 'region-1',
        provider: 'AWS',
        code: 'ap-south-1',
        name: 'Asia Pacific (Mumbai)',
        country: 'IN',
        continent: 'Asia',
        gridIntensity: 750, // gCO2/kWh
        pue: 1.2,
        isPopular: false
    },
    {
        id: 'region-2',
        provider: 'AWS',
        code: 'us-east-1',
        name: 'US East (N. Virginia)',
        country: 'US',
        continent: 'North America',
        gridIntensity: 415,
        pue: 1.2,
        isPopular: true
    },
    {
        id: 'region-3',
        provider: 'AWS',
        code: 'eu-west-1',
        name: 'Europe (Ireland)',
        country: 'IE',
        continent: 'Europe',
        gridIntensity: 316,
        pue: 1.2,
        isPopular: false
    },
    {
        id: 'region-4',
        provider: 'AWS',
        code: 'us-west-2',
        name: 'US West (Oregon)',
        country: 'US',
        continent: 'North America',
        gridIntensity: 130,
        pue: 1.2,
        isPopular: true
    },
    {
        id: 'region-5',
        provider: 'AWS',
        code: 'eu-north-1',
        name: 'Europe (Stockholm)',
        country: 'SE',
        continent: 'Europe',
        gridIntensity: 8, // Very clean
        pue: 1.07,
        isPopular: true
    },
    {
        id: 'region-6',
        provider: 'GCP',
        code: 'europe-north1',
        name: 'Finland',
        country: 'FI',
        continent: 'Europe',
        gridIntensity: 10,
        pue: 1.1,
        isPopular: false
    }
];
exports.instanceTypes = [
    {
        id: 'instance-1',
        provider: 'AWS',
        name: 't3.micro',
        category: 'GENERAL',
        vcpu: 2,
        memoryGb: 1,
        cpuTdpWatts: 55,
        isPopular: true
    },
    {
        id: 'instance-2',
        provider: 'AWS',
        name: 't3.medium',
        category: 'GENERAL',
        vcpu: 2,
        memoryGb: 4,
        cpuTdpWatts: 55,
        isPopular: true
    },
    {
        id: 'instance-3',
        provider: 'AWS',
        name: 'm5.xlarge',
        category: 'GENERAL',
        vcpu: 4,
        memoryGb: 16,
        cpuTdpWatts: 130, // Example wattage
        isPopular: false
    },
    {
        id: 'instance-4',
        provider: 'GCP',
        name: 'e2-medium',
        category: 'GENERAL',
        vcpu: 2,
        memoryGb: 4,
        cpuTdpWatts: 55,
        isPopular: true
    }
];
exports.providers = [
    {
        id: 'provider-1',
        key: 'AWS',
        name: 'Amazon Web Services',
        defaultPue: 1.2
    },
    {
        id: 'provider-2',
        key: 'GCP',
        name: 'Google Cloud Platform',
        defaultPue: 1.1
    },
    {
        id: 'provider-3',
        key: 'AZURE',
        name: 'Microsoft Azure',
        defaultPue: 1.18
    }
];
