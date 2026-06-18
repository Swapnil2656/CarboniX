import { GridProvider, GridResponse } from '../interfaces/grid-provider.interface';
import { StaticGridProvider } from '../providers/static-grid.provider';
import { EmissionsDevProvider } from '../providers/emissions-dev.provider';
import { config } from '../../../config/env.config';
import { logger } from '../../../lib/logger';

export class GridService {
  private staticProvider: GridProvider;
  private liveProvider: GridProvider;

  constructor() {
    this.staticProvider = new StaticGridProvider();
    this.liveProvider = new EmissionsDevProvider();
  }

  async getGridIntensity(countryCode: string): Promise<GridResponse> {
    if (config.USE_STATIC_GRID_DATA) {
      logger.info(`[GridService] Using static provider for ${countryCode}`);
      return this.staticProvider.getGridIntensity(countryCode);
    }

    try {
      logger.info(`[GridService] Attempting to use Emissions.dev provider for ${countryCode}`);
      return await this.liveProvider.getGridIntensity(countryCode);
    } catch (error: any) {
      logger.warn(`[GridService] Live provider failed: ${error.message}. Falling back to static data.`);
      return this.staticProvider.getGridIntensity(countryCode);
    }
  }
}
