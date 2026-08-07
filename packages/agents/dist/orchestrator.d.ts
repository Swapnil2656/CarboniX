/**
 * CarboniX Orchestrator Agent
 *
 * Execute physical region switches for cloud instances that
 * have been flagged by the Analyst Agent for region migration.
 *
 * Strategy:
 *  1. Execute applyRegionFn which interfaces with physical platform adapters (Vercel, Railway, etc).
 *  2. Track success/failures.
 */
import { Recommendation } from './analyst';
export type MigrationStatus = 'PROVISIONING' | 'HEALTH_CHECK' | 'TRAFFIC_SHIFTING' | 'DRAINING' | 'TERMINATING' | 'COMPLETE' | 'FAILED';
export interface MigrationStep {
    step: MigrationStatus;
    timestamp: string;
    message: string;
    durationMs: number;
    success: boolean;
}
export interface MigrationPlan {
    instanceId: string;
    instanceName: string;
    currentType: string;
    sourceRegion: string;
    targetRegion: string;
    currentCarbonKg: number;
    projectedCarbonKg: number;
    reductionPercent: number;
    reasoning: string;
    steps: MigrationStep[];
    finalStatus: 'COMPLETE' | 'FAILED' | 'FALLBACK_REQUIRED';
    totalDurationMs: number;
    carbonSavedKg: number;
    errorCategory?: string;
}
export interface OrchestratorResult {
    migrations: MigrationPlan[];
    totalMigrations: number;
    successfulMigrations: number;
    failedMigrations: number;
    fallbackMigrations?: number;
    totalCarbonSavedKg: number;
    summary: string;
}
export type ApplyRegionFn = (instanceId: string, targetRegion: string) => Promise<{
    success: boolean;
    error?: string;
    requiresRedeploy?: boolean;
    fallbackRequired?: boolean;
    errorCategory?: string;
}>;
/**
 * Runs the Orchestrator Agent against a set of Analyst recommendations.
 *
 * @param recommendations  - Array from the Analyst Agent. Only MIGRATE_REGION
 *                           actions are executed; TERMINATE/DOWNGRADE are skipped
 *                           (those are handled by the Analyst Agent itself).
 * @param applyRegionFn    - The callback to trigger the physical infrastructure change.
 * @param maxConcurrent    - How many migrations to run in parallel (default: 3).
 */
export declare function runOrchestrator(recommendations: Recommendation[], applyRegionFn: ApplyRegionFn, maxConcurrent?: number): Promise<OrchestratorResult>;
