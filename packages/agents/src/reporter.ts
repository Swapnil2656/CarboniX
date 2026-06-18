/**
 * CarboniX Reporter Agent
 * 
 * Aggregates monthly emission data into BRSR (Business Responsibility
 * and Sustainability Reporting) compliant JSON reports.
 * 
 * Can be triggered monthly via cron or on-demand.
 */

import { EmissionRecordData } from './collector';

export interface BRSRReport {
  reportPeriod: {
    month: number;
    year: number;
    label: string; // e.g., "June 2026"
  };
  scope2Emissions: {
    totalKg: number;
    totalTonnes: number;
  };
  breakdown: {
    byCategory: {
      compute: { energyKwh: number; carbonKg: number; percentage: number };
      total: { energyKwh: number; carbonKg: number };
    };
    byRegion: Array<{
      region: string;
      instanceCount: number;
      carbonKg: number;
      percentage: number;
      gridIntensity: number;
    }>;
    byProvider: Array<{
      provider: string;
      instanceCount: number;
      carbonKg: number;
      percentage: number;
    }>;
  };
  insights: {
    topEmittingRegion: string;
    topEmittingInstance: string;
    idleWasteKg: number;
    oversizedWasteKg: number;
    potentialSavingsKg: number;
  };
  monthOverMonth?: {
    previousTotalKg: number;
    changePercent: number;
    trend: 'UP' | 'DOWN' | 'STABLE';
  };
  generatedAt: string;
}

/**
 * Run the Reporter Agent
 * Aggregates emission records into a BRSR-compliant report
 */
export async function runReporter(
  records: EmissionRecordData[],
  month?: number,
  year?: number
): Promise<{ report: BRSRReport; summary: string }> {
  const now = new Date();
  const reportMonth = month || now.getMonth() + 1;
  const reportYear = year || now.getFullYear();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Calculate totals
  const totalCarbonKg = records.reduce((sum, r) => sum + r.carbonKg, 0);
  const totalEnergyKwh = records.reduce((sum, r) => sum + r.energyKwh, 0);

  // Breakdown by region
  const regionMap = new Map<string, { count: number; carbonKg: number; gridIntensity: number }>();
  for (const record of records) {
    const existing = regionMap.get(record.region) || { count: 0, carbonKg: 0, gridIntensity: 0 };
    existing.count += 1;
    existing.carbonKg += record.carbonKg;
    existing.gridIntensity = record.gridIntensity; // last seen
    regionMap.set(record.region, existing);
  }
  const byRegion = Array.from(regionMap.entries())
    .map(([region, data]) => ({
      region,
      instanceCount: data.count,
      carbonKg: Math.round(data.carbonKg * 100) / 100,
      percentage: totalCarbonKg > 0 ? Math.round((data.carbonKg / totalCarbonKg) * 1000) / 10 : 0,
      gridIntensity: data.gridIntensity,
    }))
    .sort((a, b) => b.carbonKg - a.carbonKg);

  // Breakdown by provider
  const providerMap = new Map<string, { count: number; carbonKg: number }>();
  for (const record of records) {
    const existing = providerMap.get(record.provider) || { count: 0, carbonKg: 0 };
    existing.count += 1;
    existing.carbonKg += record.carbonKg;
    providerMap.set(record.provider, existing);
  }
  const byProvider = Array.from(providerMap.entries())
    .map(([provider, data]) => ({
      provider,
      instanceCount: data.count,
      carbonKg: Math.round(data.carbonKg * 100) / 100,
      percentage: totalCarbonKg > 0 ? Math.round((data.carbonKg / totalCarbonKg) * 1000) / 10 : 0,
    }))
    .sort((a, b) => b.carbonKg - a.carbonKg);

  // Insights
  const idleRecords = records.filter(r => r.isIdle);
  const oversizedRecords = records.filter(r => r.isOversized);
  const idleWasteKg = idleRecords.reduce((sum, r) => sum + r.carbonKg, 0);
  const oversizedWasteKg = oversizedRecords.reduce((sum, r) => sum + r.carbonKg * 0.5, 0); // ~50% waste

  // Find top emitters
  const topEmittingRegion = byRegion[0]?.region || 'N/A';
  const topEmittingInstance = [...records].sort((a, b) => b.carbonKg - a.carbonKg)[0]?.instanceName || 'N/A';

  const report: BRSRReport = {
    reportPeriod: {
      month: reportMonth,
      year: reportYear,
      label: `${monthNames[reportMonth - 1]} ${reportYear}`,
    },
    scope2Emissions: {
      totalKg: Math.round(totalCarbonKg * 100) / 100,
      totalTonnes: Math.round(totalCarbonKg / 10) / 100, // kg to tonnes
    },
    breakdown: {
      byCategory: {
        compute: {
          energyKwh: Math.round(totalEnergyKwh * 100) / 100,
          carbonKg: Math.round(totalCarbonKg * 100) / 100,
          percentage: 100,
        },
        total: {
          energyKwh: Math.round(totalEnergyKwh * 100) / 100,
          carbonKg: Math.round(totalCarbonKg * 100) / 100,
        },
      },
      byRegion,
      byProvider,
    },
    insights: {
      topEmittingRegion,
      topEmittingInstance,
      idleWasteKg: Math.round(idleWasteKg * 100) / 100,
      oversizedWasteKg: Math.round(oversizedWasteKg * 100) / 100,
      potentialSavingsKg: Math.round((idleWasteKg + oversizedWasteKg) * 100) / 100,
    },
    generatedAt: new Date().toISOString(),
  };

  const summary = `BRSR Report for ${report.reportPeriod.label}: ` +
    `${report.scope2Emissions.totalKg} kg CO₂ (${report.scope2Emissions.totalTonnes} tonnes). ` +
    `Top region: ${topEmittingRegion}. ` +
    `Potential savings: ${report.insights.potentialSavingsKg} kg CO₂/month.`;

  return { report, summary };
}
