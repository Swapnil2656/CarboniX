"use strict";
/**
 * CarboniX SDK — compare()
 *
 * Compares the carbon footprint of your current infrastructure setup
 * against alternative providers and greener regions.
 * Useful for making informed "should we switch?" decisions.
 *
 * @example
 * ```ts
 * const comparison = await cx.compare({
 *   provider: 'aws',
 *   region: 'ap-south-1',
 *   instanceType: 'm5.xlarge',
 *   instanceCount: 1,
 *   hoursPerMonth: 730,
 *   cpuUtilization: 0.5,
 *   storageGb: 100,
 * });
 *
 * console.log('Base:', comparison.base.co2KgMonth, 'kg');
 * comparison.options.forEach(opt => {
 *   console.log('Option:', opt.co2KgMonth, 'kg');
 * });
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = compare;
async function compare(client, input) {
    return client.post('/api/v1/carbon/compare', input);
}
//# sourceMappingURL=compare.js.map