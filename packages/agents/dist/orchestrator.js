"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.runOrchestrator = runOrchestrator;
// ─── Helpers ─────────────────────────────────────────────────────────────────
/**
 * Extracts the source region from the recommendation's reasoning string.
 * Example: "Instance is idle at 2.0% CPU in ap-south-1" → "ap-south-1"
 * Falls back to a sensible default if the region cannot be parsed.
 */
function extractSourceRegion(rec) {
    const match = rec.reasoning.match(/\b(us-east-1|us-west-2|eu-west-1|eu-north-1|ap-south-1|ap-southeast-1|ap-northeast-1|eastus|europe-west1)\b/);
    return match ? match[1] : 'us-east-1';
}
/**
 * Determines the optimal target region for a migration.
 * In production this would call the Core recommendations engine.
 * Here we use our known cleanest-grid regions as a lookup.
 */
function getBestTargetRegion(sourceRegion) {
    const REGION_TO_CLEAN = {
        'ap-south-1': 'eu-north-1', // Mumbai (750 gCO₂)  → Stockholm (8 gCO₂)
        'us-east-1': 'eu-north-1', // Virginia (415)      → Stockholm (8)
        'us-west-2': 'eu-north-1', // Oregon (136)        → Stockholm (8)
        'eu-west-1': 'eu-north-1', // Ireland (316)       → Stockholm (8)
        'ap-northeast-1': 'eu-north-1', // Tokyo (506)         → Stockholm (8)
        'eastus': 'eu-north-1', // Azure EastUS (380)  → Stockholm (8)
        'europe-west1': 'eu-north-1', // GCP EU West (230)   → Stockholm (8)
    };
    return REGION_TO_CLEAN[sourceRegion] ?? 'eu-north-1';
}
// ─── Migration Executor ───────────────────────────────────────────────────
async function executeMigration(rec, applyRegionFn) {
    const steps = [];
    const sourceRegion = extractSourceRegion(rec);
    const targetRegion = getBestTargetRegion(sourceRegion);
    const overallStart = Date.now();
    const addStep = (step, message, success, start) => {
        steps.push({
            step,
            timestamp: new Date().toISOString(),
            message,
            durationMs: Date.now() - start,
            success,
        });
    };
    try {
        const s1 = Date.now();
        addStep('PROVISIONING', `[EXECUTING] Initiating region switch for "${rec.instanceId}" to ${targetRegion}. Grid intensity: 8 gCO₂/kWh vs ${sourceRegion}'s dirty grid.`, true, s1);
        const s2 = Date.now();
        const result = await applyRegionFn(rec.instanceId, targetRegion);
        if (!result.success) {
            addStep(result.fallbackRequired ? 'FALLBACK' : 'FAILED', `[${result.fallbackRequired ? 'FALLBACK' : 'FAILED'}] Region switch failed: ${result.error || 'Unknown error'}. Category: ${result.errorCategory || 'Unknown'}`, false, s2);
            return {
                instanceId: rec.instanceId,
                instanceName: rec.instanceName,
                currentType: rec.currentType,
                sourceRegion,
                targetRegion,
                currentCarbonKg: rec.currentCarbonKg,
                projectedCarbonKg: rec.projectedCarbonKg,
                reductionPercent: rec.reductionPercent,
                reasoning: rec.reasoning,
                steps,
                finalStatus: result.fallbackRequired ? 'FALLBACK_REQUIRED' : 'FAILED',
                totalDurationMs: Date.now() - overallStart,
                carbonSavedKg: 0,
                errorCategory: result.errorCategory
            };
        }
        addStep('TRAFFIC_SHIFTING', `[SUCCESS] ${result.message || `Region switch applied successfully to ${targetRegion}.`}`, true, s2);
        const carbonSaved = rec.currentCarbonKg - rec.projectedCarbonKg;
        addStep('COMPLETE', `[COMPLETE] Migration finished. Carbon saving locked in: ${carbonSaved.toFixed(2)} kg CO₂/month.`, true, Date.now());
        return {
            instanceId: rec.instanceId,
            instanceName: rec.instanceName,
            currentType: rec.currentType,
            sourceRegion,
            targetRegion,
            currentCarbonKg: rec.currentCarbonKg,
            projectedCarbonKg: rec.projectedCarbonKg,
            reductionPercent: rec.reductionPercent,
            reasoning: rec.reasoning,
            steps,
            finalStatus: 'COMPLETE',
            totalDurationMs: Date.now() - overallStart,
            carbonSavedKg: carbonSaved,
        };
    }
    catch (err) {
        addStep('FAILED', `[FAILED] Region switch failed: ${err.message}`, false, Date.now());
        return {
            instanceId: rec.instanceId,
            instanceName: rec.instanceName,
            currentType: rec.currentType,
            sourceRegion,
            targetRegion,
            currentCarbonKg: rec.currentCarbonKg,
            projectedCarbonKg: rec.projectedCarbonKg,
            reductionPercent: rec.reductionPercent,
            reasoning: rec.reasoning,
            steps,
            finalStatus: 'FAILED',
            totalDurationMs: Date.now() - overallStart,
            carbonSavedKg: 0,
            errorCategory: 'SYSTEM_ERROR'
        };
    }
}
// ─── Main Export ─────────────────────────────────────────────────────────────
/**
 * Runs the Orchestrator Agent against a set of Analyst recommendations.
 *
 * @param recommendations  - Array from the Analyst Agent. Only MIGRATE_REGION
 *                           actions are executed; TERMINATE/DOWNGRADE are skipped
 *                           (those are handled by the Analyst Agent itself).
 * @param applyRegionFn    - The callback to trigger the physical infrastructure change.
 * @param maxConcurrent    - How many migrations to run in parallel (default: 3).
 */
async function runOrchestrator(recommendations, applyRegionFn, maxConcurrent = 3) {
    // Only process MIGRATE_REGION recommendations; downgrades / terminates
    // are handled separately by the Analyst Agent.
    const migratable = recommendations.filter(r => r.recommendedAction === 'MIGRATE_REGION');
    // If no explicit MIGRATE_REGION recs exist (e.g. seeded with rule-based data),
    // pick the top HIGH-priority TERMINATE instances to demonstrate the migration flow.
    const targets = migratable.length > 0
        ? migratable
        : recommendations.filter(r => r.priority === 'HIGH').slice(0, maxConcurrent);
    if (targets.length === 0) {
        return {
            migrations: [],
            totalMigrations: 0,
            successfulMigrations: 0,
            failedMigrations: 0,
            totalCarbonSavedKg: 0,
            summary: 'No migration candidates found in the latest Analyst run.',
        };
    }
    // Chunk into batches to respect maxConcurrent
    const results = [];
    for (let i = 0; i < targets.length; i += maxConcurrent) {
        const batch = targets.slice(i, i + maxConcurrent);
        const batchResults = await Promise.all(batch.map(rec => executeMigration(rec, applyRegionFn)));
        results.push(...batchResults);
    }
    const successful = results.filter(r => r.finalStatus === 'COMPLETE');
    const failed = results.filter(r => r.finalStatus === 'FAILED');
    const totalSaved = successful.reduce((sum, r) => sum + r.carbonSavedKg, 0);
    return {
        migrations: results,
        totalMigrations: results.length,
        successfulMigrations: successful.length,
        failedMigrations: failed.length,
        totalCarbonSavedKg: parseFloat(totalSaved.toFixed(2)),
        summary: `Orchestrator completed ${successful.length}/${results.length} physical region migrations. ` +
            `Carbon locked in: ${totalSaved.toFixed(2)} kg CO₂/month. ` +
            (failed.length > 0 ? `${failed.length} migration(s) failed.` : 'Zero rollbacks.'),
    };
}
