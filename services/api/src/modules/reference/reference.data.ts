export const regions = [
  {
    id: 'region-1',
    provider: 'AWS',
    code: 'ap-south-1',
    name: 'Asia Pacific (Mumbai)',
    country: 'IN',
    continent: 'Asia',
    gridIntensity: 708, // gCO2/kWh
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
    gridIntensity: 370,
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
    gridIntensity: 255,
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
    gridIntensity: 206, 
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
    gridIntensity: 20, // Very clean
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
    gridIntensity: 38,
    pue: 1.1,
    isPopular: false
  },
  {
    id: 'region-gcp-2',
    provider: 'GCP',
    code: 'us-central1',
    name: 'Iowa',
    country: 'US',
    continent: 'North America',
    gridIntensity: 350,
    pue: 1.1,
    isPopular: true
  },
  {
    id: 'region-gcp-3',
    provider: 'GCP',
    code: 'asia-south1',
    name: 'Mumbai',
    country: 'IN',
    continent: 'Asia',
    gridIntensity: 700,
    pue: 1.1,
    isPopular: false
  },
  {
    id: 'region-azure-1',
    provider: 'AZURE',
    code: 'northeurope',
    name: 'Ireland',
    country: 'IE',
    continent: 'Europe',
    gridIntensity: 300,
    pue: 1.125,
    isPopular: true
  },
  {
    id: 'region-azure-2',
    provider: 'AZURE',
    code: 'swedencentral',
    name: 'Sweden',
    country: 'SE',
    continent: 'Europe',
    gridIntensity: 15,
    pue: 1.125,
    isPopular: false
  },
  {
    id: 'region-azure-3',
    provider: 'AZURE',
    code: 'westus2',
    name: 'Washington',
    country: 'US',
    continent: 'North America',
    gridIntensity: 150,
    pue: 1.125,
    isPopular: true
  },
  {
    id: 'region-aws-6',
    provider: 'AWS',
    code: 'ap-southeast-1',
    name: 'Singapore',
    country: 'SG',
    continent: 'Asia',
    gridIntensity: 408,
    pue: 1.2,
    isPopular: true
  },
  {
    id: 'region-aws-7',
    provider: 'AWS',
    code: 'eu-central-1',
    name: 'Frankfurt',
    country: 'DE',
    continent: 'Europe',
    gridIntensity: 338,
    pue: 1.2,
    isPopular: true
  }
];

export const instanceTypes = [
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
    id: 'instance-5',
    provider: 'AWS',
    name: 't3.small',
    category: 'GENERAL',
    vcpu: 2,
    memoryGb: 2,
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

export const providers = [
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
