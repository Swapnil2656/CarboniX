"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carbonix = exports.CarbonixTimeoutError = exports.CarbonixNetworkError = exports.CarbonixApiError = void 0;
const client_js_1 = require("./http/client.js");
const calculate_js_1 = require("./methods/calculate.js");
const ingest_js_1 = require("./methods/ingest.js");
const compare_js_1 = require("./methods/compare.js");
const recommend_js_1 = require("./methods/recommend.js");
var index_js_1 = require("./errors/index.js");
Object.defineProperty(exports, "CarbonixApiError", { enumerable: true, get: function () { return index_js_1.CarbonixApiError; } });
Object.defineProperty(exports, "CarbonixNetworkError", { enumerable: true, get: function () { return index_js_1.CarbonixNetworkError; } });
Object.defineProperty(exports, "CarbonixTimeoutError", { enumerable: true, get: function () { return index_js_1.CarbonixTimeoutError; } });
// ─── Main SDK Class ───────────────────────────────────────────────────────────
class Carbonix {
    client;
    /**
     * Create a new CarboniX SDK instance.
     *
     * @param config.apiKey   - Your CarboniX API key (required)
     * @param config.baseUrl  - Override the API URL (default: http://localhost:4000)
     * @param config.timeoutMs - Request timeout in ms (default: 10_000)
     */
    constructor(config) {
        if (!config.apiKey) {
            throw new Error('[CarboniX SDK] apiKey is required. Get yours at app.carbonix.dev');
        }
        this.client = new client_js_1.HttpClient(config);
    }
    // ─── Carbon Calculation ───────────────────────────────────────────────────
    /**
     * Calculate the monthly carbon footprint of a cloud workload.
     *
     * Returns a full breakdown: CPU / Memory / Storage energy (kWh),
     * total CO₂ in grams and kg, a carbon rating (LOW → CRITICAL),
     * a real-world equivalent (e.g. "equivalent to 12 car trips"),
     * and a greener-region recommendation if one exists.
     */
    calculate(input) {
        return (0, calculate_js_1.calculate)(this.client, input);
    }
    // ─── Region Comparison ────────────────────────────────────────────────────
    /**
     * Compare the carbon footprint of your workload across multiple
     * cloud providers and regions simultaneously.
     *
     * Returns your current setup as `base` and a ranked list of
     * greener `options` across AWS eu-west-1, GCP eu-north-1, and Azure northeurope.
     */
    compare(input) {
        return (0, compare_js_1.compare)(this.client, input);
    }
    // ─── Green Region Recommendation ─────────────────────────────────────────
    /**
     * Get the single best alternative region for your workload.
     *
     * Only returns a recommendation if switching would save >10% of emissions —
     * otherwise returns a message confirming you are already optimally placed.
     */
    recommend(input) {
        return (0, recommend_js_1.recommend)(this.client, input);
    }
    // ─── Live Telemetry Ingestion ─────────────────────────────────────────────
    /**
     * Push live server telemetry into CarboniX for AI analysis.
     *
     * Call this periodically (e.g. every 5 minutes) from a background job
     * on each server. The Analyst Agent will automatically detect idle
     * instances (CPU < 5%) and oversized instances (CPU < 20%) and
     * surface actionable recommendations on your Dashboard.
     */
    ingest(input) {
        return (0, ingest_js_1.ingest)(this.client, input);
    }
}
exports.Carbonix = Carbonix;
// Default export for ergonomic `import Carbonix from 'carbonix'` usage
exports.default = Carbonix;
//# sourceMappingURL=index.js.map