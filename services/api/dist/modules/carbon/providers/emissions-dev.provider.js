"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmissionsDevProvider = void 0;
const env_config_1 = require("../../../config/env.config");
class EmissionsDevProvider {
    async getGridIntensity(countryCode) {
        if (!env_config_1.config.EMISSIONS_API_KEY) {
            throw new Error("EMISSIONS_API_KEY is not configured.");
        }
        const response = await fetch(`https://api.emissions.dev/v1/electricity/grid?country=${countryCode}`, {
            headers: {
                'Authorization': `Bearer ${env_config_1.config.EMISSIONS_API_KEY}`
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
exports.EmissionsDevProvider = EmissionsDevProvider;
