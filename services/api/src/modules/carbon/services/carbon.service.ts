import { GridService } from './grid.service';

export interface CarbonCalculationRequest {
  energyKwh: number;
  countryCode: string;
}

export interface CarbonCalculationResult {
  energyKwh: number;
  gridIntensity: number;
  carbonKg: number;
  source: string;
  liveData: boolean;
}

export class CarbonService {
  private gridService: GridService;

  constructor() {
    this.gridService = new GridService();
  }

  async calculateCarbon(request: CarbonCalculationRequest): Promise<CarbonCalculationResult> {
    const gridData = await this.gridService.getGridIntensity(request.countryCode);
    
    // Calculate carbon footprint in Kg
    // carbonKg = (energyKwh * gridIntensity) / 1000
    const carbonKg = (request.energyKwh * gridData.gridIntensity) / 1000;

    return {
      energyKwh: request.energyKwh,
      gridIntensity: gridData.gridIntensity,
      carbonKg: Number(carbonKg.toFixed(2)),
      source: gridData.source,
      liveData: gridData.liveData
    };
  }
}
