"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProviders = exports.getInstances = exports.getRegions = void 0;
const reference_data_1 = require("./reference.data");
const getRegions = (req, res) => {
    const { provider } = req.query;
    let filteredRegions = reference_data_1.regions;
    if (provider) {
        filteredRegions = reference_data_1.regions.filter(r => r.provider === provider.toUpperCase());
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
