"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEquivalent = getEquivalent;
function getEquivalent(co2KgMonth) {
    // 1 kg CO2 = 4.3 km driving
    // 1 kg CO2 = 121 smartphone charges
    const kmDriving = (co2KgMonth * 4.3).toFixed(1);
    const phoneCharges = Math.round(co2KgMonth * 121);
    return `≈ driving ${kmDriving} km or charging your phone ${phoneCharges.toLocaleString()} times`;
}
