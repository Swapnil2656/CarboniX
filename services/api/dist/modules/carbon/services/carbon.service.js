"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarbonService = void 0;
const grid_service_1 = require("./grid.service");
class CarbonService {
    gridService;
    constructor() {
        this.gridService = new grid_service_1.GridService();
    }
    async calculateCarbon(request) {
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
exports.CarbonService = CarbonService;
