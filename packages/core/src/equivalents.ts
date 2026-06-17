// Master doc equivalents:
// 1 kg CO₂ = driving 4.3 km in average car
// 1 kg CO₂ = 121 smartphone full charges
// 1 kg CO₂ = streaming 600 hours of Netflix (4K)

export function getEquivalent(co2KgMonth: number): string {
  const kmDriven = (co2KgMonth * 4.3).toFixed(1);
  const phoneCharges = Math.round(co2KgMonth * 121);
  const netflixHours = Math.round(co2KgMonth * 600);

  // Return a random or prioritized equivalent. We'll pick one based on scale for variety.
  if (co2KgMonth > 20) {
    return `≈ driving ${kmDriven} km in a car`;
  } else if (co2KgMonth > 5) {
    return `≈ streaming ${netflixHours} hours of 4K Netflix`;
  } else {
    return `≈ charging your phone ${phoneCharges.toLocaleString()} times`;
  }
}
