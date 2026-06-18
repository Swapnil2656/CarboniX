export type CarbonRating = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export interface RatingResult {
    rating: CarbonRating;
    color: string;
}
export declare function getCarbonRating(co2KgMonth: number): RatingResult;
