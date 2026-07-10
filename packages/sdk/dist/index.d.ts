/**
 * CarboniX SDK — Main Entry Point
 *
 * The `Carbonix` class is the single object an end-user instantiates.
 * It receives an API key and exposes all CarboniX capabilities as
 * fully-typed async methods.
 *
 * ─────────────────────────────────────────────────────────────────
 * QUICK START
 * ─────────────────────────────────────────────────────────────────
 *
 * 1. Install (once published):
 *    npm install carbonix
 *
 * 2. Initialize with your API key:
 *    import Carbonix from 'carbonix';
 *    const cx = new Carbonix({ apiKey: 'cx_your_api_key' });
 *
 * 3. Calculate your workload's carbon footprint:
 *    const result = await cx.calculate({
 *      provider: 'aws',
 *      region: 'ap-south-1',
 *      instanceType: 'm5.xlarge',
 *      instanceCount: 2,
 *      hoursPerMonth: 730,
 *      cpuUtilization: 0.45,
 *      storageGb: 200,
 *    });
 *    console.log(`${result.co2KgMonth} kg CO₂/month — Rating: ${result.rating.rating}`);
 *
 * 4. Push live telemetry from your server:
 *    await cx.ingest({
 *      instanceId: 'i-0abc123',
 *      instanceType: 'm5.xlarge',
 *      provider: 'aws',
 *      region: 'ap-south-1',
 *      cpuUtilization: 0.04,
 *    });
 *
 * 5. Get a greener-region recommendation:
 *    const rec = await cx.recommend({ ...same input });
 *    if (rec.recommended) {
 *      console.log(`Switch to ${rec.recommended.region} → save ${rec.recommended.reductionPercent}%`);
 *    }
 *
 * ─────────────────────────────────────────────────────────────────
 */
export type { CarbonixConfig, CloudProvider, CarbonRating, CalculateInput, CalculateResult, TelemetryInput, TelemetryResult, CompareResult, RecommendResult, } from './types/index.js';
export { CarbonixApiError, CarbonixNetworkError, CarbonixTimeoutError, } from './errors/index.js';
import type { CarbonixConfig, CalculateInput, CalculateResult, TelemetryInput, TelemetryResult, CompareResult, RecommendResult } from './types/index.js';
export declare class Carbonix {
    private readonly client;
    /**
     * Create a new CarboniX SDK instance.
     *
     * @param config.apiKey   - Your CarboniX API key (required)
     * @param config.baseUrl  - Override the API URL (default: http://localhost:4000)
     * @param config.timeoutMs - Request timeout in ms (default: 10_000)
     */
    constructor(config: CarbonixConfig);
    /**
     * Calculate the monthly carbon footprint of a cloud workload.
     *
     * Returns a full breakdown: CPU / Memory / Storage energy (kWh),
     * total CO₂ in grams and kg, a carbon rating (LOW → CRITICAL),
     * a real-world equivalent (e.g. "equivalent to 12 car trips"),
     * and a greener-region recommendation if one exists.
     */
    calculate(input: CalculateInput): Promise<CalculateResult>;
    /**
     * Compare the carbon footprint of your workload across multiple
     * cloud providers and regions simultaneously.
     *
     * Returns your current setup as `base` and a ranked list of
     * greener `options` across AWS eu-west-1, GCP eu-north-1, and Azure northeurope.
     */
    compare(input: CalculateInput): Promise<CompareResult>;
    /**
     * Get the single best alternative region for your workload.
     *
     * Only returns a recommendation if switching would save >10% of emissions —
     * otherwise returns a message confirming you are already optimally placed.
     */
    recommend(input: CalculateInput): Promise<RecommendResult>;
    /**
     * Push live server telemetry into CarboniX for AI analysis.
     *
     * Call this periodically (e.g. every 5 minutes) from a background job
     * on each server. The Analyst Agent will automatically detect idle
     * instances (CPU < 5%) and oversized instances (CPU < 20%) and
     * surface actionable recommendations on your Dashboard.
     */
    ingest(input: TelemetryInput): Promise<TelemetryResult>;
}
export default Carbonix;
//# sourceMappingURL=index.d.ts.map