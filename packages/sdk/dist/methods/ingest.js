"use strict";
/**
 * CarboniX SDK — ingest()
 *
 * Pushes live infrastructure telemetry from your server to CarboniX.
 * Call this from a background job (e.g., every 5 minutes) to give
 * the Analyst Agent real data to flag idle / oversized instances.
 *
 * @example
 * ```ts
 * const record = await cx.ingest({
 *   instanceId: 'i-0abc123def456',
 *   instanceType: 'm5.xlarge',
 *   provider: 'aws',
 *   region: 'ap-south-1',
 *   cpuUtilization: 0.04,   // 4% CPU → will be flagged as idle
 *   storageGb: 500,
 *   projectName: 'payments-api',
 * });
 * console.log(`Recorded ${record.carbonKg} kg CO₂`);
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingest = ingest;
async function ingest(client, input) {
    return client.post('/api/v1/carbon/telemetry/ingest', input);
}
//# sourceMappingURL=ingest.js.map