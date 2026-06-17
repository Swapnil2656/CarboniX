export interface GridResponse {
  gridIntensity: number;
  source: string;
  liveData: boolean;
  country?: string;
}

export interface GridProvider {
  getGridIntensity(countryCode: string): Promise<GridResponse>;
}
