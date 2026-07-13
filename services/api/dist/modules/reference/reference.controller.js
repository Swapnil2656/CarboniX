"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegionsRanked = exports.getProviders = exports.getInstances = exports.getRegions = void 0;
const reference_data_1 = require("./reference.data");
const grid_service_1 = require("../carbon/services/grid.service");
const gridService = new grid_service_1.GridService();
const getRegions = async (req, res) => {
    const { provider } = req.query;
    let filteredRegions = reference_data_1.regions;
    if (provider) {
        filteredRegions = reference_data_1.regions.filter(r => r.provider === provider.toUpperCase());
    }
    try {
        const enrichedRegions = await Promise.all(filteredRegions.map(async (r) => {
            try {
                const liveData = await gridService.getGridIntensity(r.country);
                return { ...r, gridIntensity: liveData.gridIntensity };
            }
            catch (e) {
                return r;
            }
        }));
        return res.json({ success: true, data: enrichedRegions });
    }
    catch (error) {
        console.error('Failed to fetch live grid data', error);
    }
    res.json({ success: true, data: filteredRegions });
};
exports.getRegions = getRegions;
const getInstances = (req, res) => {
    const { provider } = req.query;
    let filteredInstances = reference_data_1.instanceTypes;
    if (provider) {
        filteredInstances = reference_data_1.instanceTypes.filter(i => i.provider === provider.toUpperCase());
    }
    res.json({ success: true, data: filteredInstances });
};
exports.getInstances = getInstances;
const getProviders = (req, res) => {
    res.json({ success: true, data: reference_data_1.providers });
};
exports.getProviders = getProviders;
const getRegionsRanked = async (req, res) => {
    const { provider } = req.query;
    let filteredRegions = reference_data_1.regions;
    if (provider) {
        filteredRegions = reference_data_1.regions.filter(r => r.provider === provider.toUpperCase());
    }
    // Sort by grid intensity (ascending - greenest first)
    filteredRegions = [...filteredRegions].sort((a, b) => a.gridIntensity - b.gridIntensity);
    try {
        const enrichedRegions = await Promise.all(filteredRegions.map(async (r) => {
            let gridIntensity = r.gridIntensity;
            try {
                const liveData = await gridService.getGridIntensity(r.country);
                gridIntensity = liveData.gridIntensity;
            }
            catch (e) {
                // Fallback to static
            }
            let category = 'red';
            if (gridIntensity <= 200)
                category = 'green';
            else if (gridIntensity <= 400)
                category = 'yellow';
            return {
                code: r.code,
                name: r.name,
                country: r.country,
                gridIntensity,
                category,
                // We omit estimatedCo2Kg here as it requires full calculate params 
                // (which can be added later if UI passes them)
            };
        }));
        // Re-sort just in case live data changed order
        enrichedRegions.sort((a, b) => a.gridIntensity - b.gridIntensity);
        // Calculate savings vs current (the worst one, or just relative to max)
        if (enrichedRegions.length > 0) {
            const highestIntensity = enrichedRegions[enrichedRegions.length - 1].gridIntensity;
            enrichedRegions.forEach(r => {
                // Simple heuristic: percentage cleaner than the dirtiest region
                r.savingsVsCurrent = Math.round(((highestIntensity - r.gridIntensity) / highestIntensity) * 100);
            });
        }
        return res.json({ success: true, data: enrichedRegions });
    }
    catch (error) {
        console.error('Failed to fetch ranked regions', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
exports.getRegionsRanked = getRegionsRanked;
