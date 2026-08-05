/**
 * CarboniX Analyst Agent (Gemini-Powered)
 *
 * Analyzes emission records from the Collector and generates
 * AI-powered optimization recommendations using Gemini Flash.
 * Falls back to rule-based recommendations if Gemini is unavailable.
 */
import { EmissionRecordData } from './collector';
export interface Recommendation {
    projectId?: string;
    deploymentId?: string;
    instanceId: string;
    instanceName: string;
    currentType: string;
    recommendedAction: string;
    currentCarbonKg: number;
    projectedCarbonKg: number;
    reductionPercent: number;
    reasoning: string;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
}
export interface AnalystResult {
    recommendations: Recommendation[];
    idleInstances: EmissionRecordData[];
    oversizedInstances: EmissionRecordData[];
    totalCurrentKg: number;
    totalProjectedKg: number;
    totalSavingsKg: number;
    summary: string;
}
/**
 * Run the Analyst Agent
 */
export declare function runAnalyst(records: EmissionRecordData[], nvidiaApiKey?: string): Promise<AnalystResult>;
