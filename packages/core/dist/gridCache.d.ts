export declare const DEFAULT_GRID_INTENSITIES: Record<string, number>;
export declare const DEFAULT_PUE: Record<string, number>;
export declare const REGION_PUE_OVERRIDES: Record<string, number>;
export declare function getGridIntensity(region: string): Promise<number>;
export declare function getProviderPue(provider: string, region: string): number;
