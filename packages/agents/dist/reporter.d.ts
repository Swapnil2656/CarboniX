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
        label: string;
    };
    scope2Emissions: {
        totalKg: number;
        totalTonnes: number;
    };
    breakdown: {
        byCategory: {
            compute: {
                energyKwh: number;
                carbonKg: number;
                percentage: number;
            };
            total: {
                energyKwh: number;
                carbonKg: number;
            };
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
export declare function runReporter(records: EmissionRecordData[], month?: number, year?: number): Promise<{
    report: BRSRReport;
    summary: string;
}>;
