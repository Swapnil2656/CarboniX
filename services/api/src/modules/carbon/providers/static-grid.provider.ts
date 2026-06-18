import { GridProvider, GridResponse } from '../interfaces/grid-provider.interface';

export const GRID_INTENSITY: Record<string, { country: string; value: number; source: string }> = {
  IN: {
    country: "India",
    value: 708,
    source: "CEA India 2023-24"
  },
  US: {
    country: "United States",
    value: 386,
    source: "Static Grid Dataset"
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
