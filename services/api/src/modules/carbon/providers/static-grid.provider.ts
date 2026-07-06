import { GridProvider, GridResponse } from '../interfaces/grid-provider.interface';

export const GRID_INTENSITY: Record<string, { country: string; value: number; source: string }> = {
  IN: {
    country: "India",
    value: 708,
    source: "CEA India 2023-24"
  },
  US: {
    country: "United States",
    value: 370,
    source: "2023 National Average"
  },
  UK: {
    country: "United Kingdom",
    value: 182,
    source: "Static Grid Dataset"
  },
  DE: {
    country: "Germany",
    value: 380,
    source: "Static Grid Dataset"
  },
  IE: {
    country: "Ireland",
    value: 255,
    source: "Irish EPA 2023"
  },
  SE: {
    country: "Sweden",
    value: 20,
    source: "2023 National Average"
  },
  FI: {
    country: "Finland",
    value: 38,
    source: "Fingrid 2023"
  }
};

export class StaticGridProvider implements GridProvider {
  async getGridIntensity(countryCode: string): Promise<GridResponse> {
    const data = GRID_INTENSITY[countryCode] || {
      country: "Global Average",
      value: 400,
      source: "Static Grid Dataset - Global Fallback"
    };

    return {
      gridIntensity: data.value,
      source: data.source,
      liveData: false,
      country: data.country
    };
  }
}
