"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridService = void 0;
const static_grid_provider_1 = require("../providers/static-grid.provider");
const emissions_dev_provider_1 = require("../providers/emissions-dev.provider");
const env_config_1 = require("../../../config/env.config");
const logger_1 = require("../../../lib/logger");
class GridService {
    staticProvider;
    liveProvider;
    constructor() {
        this.staticProvider = new static_grid_provider_1.StaticGridProvider();
        this.liveProvider = new emissions_dev_provider_1.EmissionsDevProvider();
    }
    async getGridIntensity(countryCode) {
        if (env_config_1.config.USE_STATIC_GRID_DATA) {
            logger_1.logger.info(`[GridService] Using static provider for ${countryCode}`);
            return this.staticProvider.getGridIntensity(countryCode);
        }
        try {
            logger_1.logger.info(`[GridService] Attempting to use Emissions.dev provider for ${countryCode}`);
            return await this.liveProvider.getGridIntensity(countryCode);
        }
        catch (error) {
            logger_1.logger.warn(`[GridService] Live provider failed: ${error.message}. Falling back to static data.`);
            return this.staticProvider.getGridIntensity(countryCode);
        }
    }
}
exports.GridService = GridService;
