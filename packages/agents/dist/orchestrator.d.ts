/**
 * CarboniX Orchestrator Agent
 *
 * Executes Zero-Downtime Blue/Green migrations for cloud instances that
 * have been flagged by the Analyst Agent for region migration.
 *
 * Strategy:
 *  1. PROVISION  — Spin up a "Green" (new) instance in the target region.
 *  2. HEALTH_CHECK — Wait for the Green instance to pass a health check.
 *  3. TRAFFIC_SHIFT — Update the Load Balancer / DNS to route traffic to Green.
 *  4. DRAIN & VERIFY — Confirm the old "Blue" instance receives zero traffic.
 *  5. TERMINATE — Safely destroy the old Blue instance.
 *
 * NOTE: Phase 7 runs in Simulation Mode — the logic and execution logs are
 * fully real, but cloud provider SDK calls (AWS/GCP API) are mocked until
 * cloud credentials are attached in production.
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
    finalStatus: 'COMPLETE' | 'FAILED';
    totalDurationMs: number;
    carbonSavedKg: number;
}
export interface OrchestratorResult {
    migrations: MigrationPlan[];
    totalMigrations: number;
    successfulMigrations: number;
    failedMigrations: number;
    totalCarbonSavedKg: number;
    summary: string;
}
/**
 * Runs the Orchestrator Agent against a set of Analyst recommendations.
 *
 * @param recommendations  - Array from the Analyst Agent. Only MIGRATE_REGION
 *                           actions are executed; TERMINATE/DOWNGRADE are skipped
 *                           (those are handled by the Analyst Agent itself).
 * @param maxConcurrent    - How many migrations to run in parallel (default: 3).
 */
export declare function runOrchestrator(recommendations: Recommendation[], maxConcurrent?: number): Promise<OrchestratorResult>;
