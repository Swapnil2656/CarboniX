"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCarbonRating = getCarbonRating;
function getCarbonRating(co2KgMonth) {
    if (co2KgMonth < 5)
        return 'LOW';
    if (co2KgMonth < 20)
        return 'MEDIUM';
    if (co2KgMonth <= 50)
        return 'HIGH';
    return 'CRITICAL';
}
