"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCarbonRating = getCarbonRating;
function getCarbonRating(co2KgMonth) {
    if (co2KgMonth < 5) {
        return { rating: 'LOW', color: '#50FA7B' };
    }
    else if (co2KgMonth <= 20) {
        return { rating: 'MEDIUM', color: '#FFB86C' };
    }
    else if (co2KgMonth <= 50) {
        return { rating: 'HIGH', color: '#FF5555' };
    }
    else {
        return { rating: 'CRITICAL', color: '#FF5555' };
    }
}
