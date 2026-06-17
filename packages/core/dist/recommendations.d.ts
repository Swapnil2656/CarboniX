export interface RecommendationResult {
    recommendedRegion?: string;
    recommendedCo2Kg?: number;
    reductionPercent?: number;
    recommendation?: string;
}
export declare function getRecommendation(provider: string, currentRegion: string, currentCo2KgMonth: number, totalFinalEnergyKwh: number): Promise<RecommendationResult>;
