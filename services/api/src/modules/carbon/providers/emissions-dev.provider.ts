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
    
    // We expect the API to return something that contains the grid intensity.
    // If the API returns different fields, this would need adjusting.
    // Assuming it returns { carbonIntensity: 708, ... } based on the previous ElectricityMaps pattern.
    // If it returns { gridIntensity: ... }, we use that.
    const intensity = data.gridIntensity || data.carbonIntensity || data.value;

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
