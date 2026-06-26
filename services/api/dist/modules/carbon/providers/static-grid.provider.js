"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticGridProvider = exports.GRID_INTENSITY = void 0;
exports.GRID_INTENSITY = {
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
class StaticGridProvider {
    async getGridIntensity(countryCode) {
        const data = exports.GRID_INTENSITY[countryCode] || {
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
exports.StaticGridProvider = StaticGridProvider;
