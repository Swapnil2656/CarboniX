import { CarbonService } from './services/api/src/modules/carbon/services/carbon.service';
import { config } from './services/api/src/config/env.config';

config.USE_STATIC_GRID_DATA = true;

async function run() {
  const service = new CarbonService();
  const res = await service.calculateCarbon({ energyKwh: 120, countryCode: 'IN' });
  console.log("Static result:", res);

  config.USE_STATIC_GRID_DATA = false;
  config.EMISSIONS_API_KEY = "test_key";
  
  // The fetch will fail and fall back to static
  const res2 = await service.calculateCarbon({ energyKwh: 120, countryCode: 'IN' });
  console.log("Live fallback result:", res2);
}

run();
