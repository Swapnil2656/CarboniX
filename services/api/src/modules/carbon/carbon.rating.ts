export type CarbonRating = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export function getCarbonRating(co2KgMonth: number): CarbonRating {
  if (co2KgMonth < 5) return 'LOW';
  if (co2KgMonth < 20) return 'MEDIUM';
  if (co2KgMonth <= 50) return 'HIGH';
  return 'CRITICAL';
}
