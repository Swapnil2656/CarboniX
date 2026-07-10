/**
 * CarboniX SDK — calculate()
 *
 * Calculates the monthly carbon footprint of a cloud workload,
 * including energy breakdown, CO₂ rating, real-world equivalent,
 * and a greener-region recommendation.
 *
 * @example
 * ```ts
 * import Carbonix from 'carbonix';
 *
 * const cx = new Carbonix({ apiKey: 'cx_your_key_here' });
 *
 * const result = await cx.calculate({
 *   provider: 'aws',
 *   region: 'ap-south-1',
 *   instanceType: 'm5.xlarge',
 *   instanceCount: 3,
 *   hoursPerMonth: 730,
 *   cpuUtilization: 0.45,
 *   storageGb: 200,
 * });
 *
 * console.log(`${result.co2KgMonth} kg CO₂/month`);
 * console.log(result.recommendation);
 * ```
 */

import { HttpClient } from '../http/client.js';
import { CalculateInput, CalculateResult } from '../types/index.js';

export async function calculate(
  client: HttpClient,
  input: CalculateInput
): Promise<CalculateResult> {
  return client.post<CalculateResult>('/api/v1/carbon/calculate', input);
}
