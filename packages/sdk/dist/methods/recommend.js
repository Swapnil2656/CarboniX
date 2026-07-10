"use strict";
/**
 * CarboniX SDK — recommend()
 *
 * Returns the single best region to move to in order to minimize
 * carbon footprint for your current infrastructure setup.
 *
 * @example
 * ```ts
 * const rec = await cx.recommend({
 *   provider: 'aws',
 *   region: 'ap-south-1',
 *   instanceType: 'm5.xlarge',
 *   instanceCount: 2,
 *   hoursPerMonth: 730,
 *   cpuUtilization: 0.6,
 *   storageGb: 200,
 * });
 *
 * if (rec.recommended) {
 *   console.log(`Switch to ${rec.recommended.region} to save ${rec.recommended.reductionPercent}%`);
 * } else {
 *   console.log(rec.message); // 'Already in the greenest region!'
 * }
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.recommend = recommend;
async function recommend(client, input) {
    return client.post('/api/v1/carbon/recommend', input);
}
//# sourceMappingURL=recommend.js.map