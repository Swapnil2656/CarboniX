import { PrismaClient, CloudProvider, InstanceCategory, StorageType, FlagCategory } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // 1. Clean existing data
  console.log('Cleaning existing data...');
  await prisma.emissionRecord.deleteMany();
  await prisma.agentRun.deleteMany();
  await prisma.calculation.deleteMany();
  await prisma.session.deleteMany();
  await prisma.apiKey.deleteMany();
  await prisma.featureFlag.deleteMany();
  await prisma.mobileUser.deleteMany();
  await prisma.instanceType.deleteMany();
  await prisma.region.deleteMany();
  await prisma.provider.deleteMany();

  // 2. Providers
  console.log('Seeding Providers...');
  await prisma.provider.createMany({
    data: [
      { key: 'AWS', name: 'Amazon Web Services', shortName: 'AWS' },
      { key: 'GCP', name: 'Google Cloud Platform', shortName: 'GCP' },
      { key: 'AZURE', name: 'Microsoft Azure', shortName: 'Azure' }
    ]
  });

  // 3. Regions
  console.log('Seeding Regions...');
  await prisma.region.createMany({
    data: [
      // AWS
      { provider: 'AWS', code: 'us-east-1', name: 'US East (N. Virginia)', country: 'US', continent: 'North America', gridIntensity: 393.2, renewablePercentage: 12, lat: 38.13, lng: -78.45 },
      { provider: 'AWS', code: 'us-west-2', name: 'US West (Oregon)', country: 'US', continent: 'North America', gridIntensity: 223.1, renewablePercentage: 80, lat: 45.83, lng: -119.70 },
      { provider: 'AWS', code: 'eu-west-1', name: 'Europe (Ireland)', country: 'IE', continent: 'Europe', gridIntensity: 250.0, renewablePercentage: 50, lat: 53.33, lng: -6.25 },
      { provider: 'AWS', code: 'eu-north-1', name: 'Europe (Stockholm)', country: 'SE', continent: 'Europe', gridIntensity: 12.0, renewablePercentage: 98, lat: 59.33, lng: 18.06 },
      { provider: 'AWS', code: 'ap-south-1', name: 'Asia Pacific (Mumbai)', country: 'IN', continent: 'Asia', gridIntensity: 700.0, renewablePercentage: 15, lat: 19.08, lng: 72.88 },
      { provider: 'AWS', code: 'sa-east-1', name: 'South America (São Paulo)', country: 'BR', continent: 'South America', gridIntensity: 120.0, renewablePercentage: 85, lat: -23.55, lng: -46.63 },
      
      // GCP
      { provider: 'GCP', code: 'europe-west1', name: 'Europe West (Belgium)', country: 'BE', continent: 'Europe', gridIntensity: 153.4, renewablePercentage: 60, lat: 50.47, lng: 3.82 },
      { provider: 'GCP', code: 'europe-north1', name: 'Europe North (Finland)', country: 'FI', continent: 'Europe', gridIntensity: 15.0, renewablePercentage: 95, lat: 60.57, lng: 27.19 },
      { provider: 'GCP', code: 'us-central1', name: 'US Central (Iowa)', country: 'US', continent: 'North America', gridIntensity: 450.0, renewablePercentage: 20, lat: 41.26, lng: -95.86 },
      { provider: 'GCP', code: 'us-west1', name: 'US West (Oregon)', country: 'US', continent: 'North America', gridIntensity: 80.0, renewablePercentage: 85, lat: 45.60, lng: -121.18 },
      { provider: 'GCP', code: 'asia-east1', name: 'Asia East (Taiwan)', country: 'TW', continent: 'Asia', gridIntensity: 500.0, renewablePercentage: 10, lat: 24.05, lng: 120.51 },
      { provider: 'GCP', code: 'southamerica-east1', name: 'South America East (Osasco)', country: 'BR', continent: 'South America', gridIntensity: 100.0, renewablePercentage: 80, lat: -23.53, lng: -46.79 },

      // AZURE
      { provider: 'AZURE', code: 'eastus', name: 'East US (Virginia)', country: 'US', continent: 'North America', gridIntensity: 380.0, renewablePercentage: 15, lat: 37.37, lng: -79.81 },
      { provider: 'AZURE', code: 'westus2', name: 'West US 2 (Washington)', country: 'US', continent: 'North America', gridIntensity: 210.0, renewablePercentage: 60, lat: 47.23, lng: -119.85 },
      { provider: 'AZURE', code: 'northeurope', name: 'North Europe (Ireland)', country: 'IE', continent: 'Europe', gridIntensity: 140.0, renewablePercentage: 70, lat: 53.33, lng: -6.25 },
      { provider: 'AZURE', code: 'westeurope', name: 'West Europe (Netherlands)', country: 'NL', continent: 'Europe', gridIntensity: 180.0, renewablePercentage: 50, lat: 52.37, lng: 4.90 },
      { provider: 'AZURE', code: 'japaneast', name: 'Japan East (Tokyo)', country: 'JP', continent: 'Asia', gridIntensity: 500.0, renewablePercentage: 10, lat: 35.68, lng: 139.77 },
      { provider: 'AZURE', code: 'brazilsouth', name: 'Brazil South (São Paulo)', country: 'BR', continent: 'South America', gridIntensity: 110.0, renewablePercentage: 80, lat: -23.55, lng: -46.63 }
    ]
  });

  // 4. Mobile Users
  console.log('Seeding Mobile Users...');
  const users = await Promise.all(
    ['alice', 'bob', 'charlie'].map(async (name) => {
      return prisma.mobileUser.create({
        data: {
          email: `${name}@example.com`,
          passwordHash: 'hashed_password_dummy',
          name: name.charAt(0).toUpperCase() + name.slice(1),
          deviceId: `device_${name}`,
          country: 'US',
          defaultProvider: 'AWS',
          calculationCount: Math.floor(Math.random() * 50) + 10,
          totalCO2Tracked: Math.random() * 100,
          lastActiveAt: new Date(Date.now() - Math.random() * 10000000),
          calculations: {
            create: [
              {
                provider: 'AWS',
                region: 'us-east-1',
                regionName: 'US East',
                instanceType: 't3.medium',
                instanceCount: 1,
                hoursPerMonth: 730,
                cpuUtilization: 0.5,
                ramGB: 4,
                energyComputeKwh: 50,
                energyMemoryKwh: 10,
                energyStorageKwh: 5,
                energyTotalKwh: 65,
                co2GramsMonth: 65 * 393.2,
                co2KgMonth: (65 * 393.2) / 1000,
                co2GramsHour: (65 * 393.2) / 730,
                gridIntensity: 393.2,
                computePercentage: 0.7,
                memoryPercentage: 0.2,
                storagePercentage: 0.1,
                rating: 'MEDIUM',
                ratingColor: '#F59E0B',
                realWorldEquivalent: 'Driving 50 miles',
                recommendation: 'Use arm64 instances',
                responseTimeMs: Math.floor(Math.random() * 200) + 50
              }
            ]
          }
        }
      });
    })
  );

  // 5. API Keys
  console.log('Seeding API Keys...');
  await prisma.apiKey.createMany({
    data: [
      { name: 'Production App Key', prefix: 'cx_prod_abcd', hashedKey: 'hash1', createdBy: 'admin', todayRequests: 12500, totalRequests: 450000 },
      { name: 'Staging App Key', prefix: 'cx_stg_efgh', hashedKey: 'hash2', createdBy: 'admin', todayRequests: 800, totalRequests: 12000 },
      { name: 'Developer Test Key', prefix: 'cx_dev_ijkl', hashedKey: 'hash3', createdBy: 'admin', todayRequests: 54, totalRequests: 800, status: 'REVOKED' }
    ]
  });

  // 6. Feature Flags
  console.log('Seeding Feature Flags...');
  await prisma.featureFlag.createMany({
    data: [
      { key: 'new_dashboard_v2', displayName: 'New Dashboard V2', category: 'FEATURE', enabled: true },
      { key: 'agent_optimizer_auto', displayName: 'Auto-Optimizer Agent', category: 'EXPERIMENT', enabled: false },
      { key: 'mobile_dark_mode', displayName: 'Mobile Dark Mode', category: 'FEATURE', enabled: true },
      { key: 'advanced_analytics', displayName: 'Advanced Analytics', category: 'FEATURE', enabled: true }
    ]
  });

  // 7. Agent Runs & Telemetry (For Dashboard)
  console.log('Seeding Agent Runs & Telemetry...');
  const run1 = await prisma.agentRun.create({
    data: {
      agentType: 'COLLECTOR',
      status: 'SUCCESS',
      summary: 'Collected 150 metrics',
      completedAt: new Date()
    }
  });

  const providers: CloudProvider[] = ['AWS', 'GCP', 'AZURE'];
  const regions = ['us-east-1', 'europe-west1', 'eastus'];
  const telemetryData = Array.from({ length: 150 }).map((_, i) => {
    const provider = providers[Math.floor(Math.random() * providers.length)];
    const region = regions[Math.floor(Math.random() * regions.length)];
    const isIdle = Math.random() < 0.1;
    return {
      agentRunId: run1.id,
      instanceId: `i-${Math.random().toString(36).substring(7)}`,
      instanceType: 't3.large',
      provider,
      region,
      cpuUtilization: isIdle ? 0.02 : Math.random() * 0.8 + 0.1,
      energyKwh: Math.random() * 100,
      gridIntensity: provider === 'AWS' ? 393 : provider === 'GCP' ? 150 : 380,
      carbonKg: Math.random() * 50,
      isIdle,
      isOversized: Math.random() < 0.15,
      timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // spread over 30 days
    };
  });

  await prisma.emissionRecord.createMany({
    data: telemetryData
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
