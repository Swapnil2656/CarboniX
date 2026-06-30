import { GridProvider, GridResponse } from '../interfaces/grid-provider.interface';
import { config } from '../../../config/env.config';

export class EmissionsDevProvider implements GridProvider {
  async getGridIntensity(countryCode: string): Promise<GridResponse> {
    if (!config.EMISSIONS_API_KEY) {
      throw new Error("EMISSIONS_API_KEY is not configured.");
    }

    const response = await fetch(`https://api.emissions.dev/v1/electricity/grid?country=${countryCode}`, {
      headers: {
        'Authorization': `Bearer ${config.EMISSIONS_API_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`Emissions.dev API failed with status ${response.status}`);
    }

    const data = await response.json();
    
    const intensity = data.data?.attributes?.carbon_intensity;

    if (intensity === undefined || intensity === null) {
      throw new Error("Unexpected response format from Emissions.dev API.");
    }

    return {
      gridIntensity: intensity,
      source: "Emissions.dev",
      liveData: true,
      country: countryCode
    };
  }
}
