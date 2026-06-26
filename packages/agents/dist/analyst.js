"use strict";
/**
 * CarboniX Analyst Agent (Gemini-Powered)
 *
 * Analyzes emission records from the Collector and generates
 * AI-powered optimization recommendations using Gemini Flash.
 * Falls back to rule-based recommendations if Gemini is unavailable.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAnalyst = runAnalyst;
// Downgrade mapping: what to recommend when an instance is oversized
const DOWNGRADE_MAP = {
    'm5.2xlarge': 'm5.xlarge',
    'm5.xlarge': 'm5.large',
    'm5.large': 't3.large',
    't3.large': 't3.medium',
    't3.medium': 't3.micro',
    'c5.xlarge': 'c5.large',
};
/**
 * Call Gemini Flash API for intelligent recommendations
 */
async function callGeminiForRecommendations(records, apiKey) {
    try {
        const prompt = `You are CarboniX Analyst Agent — an AI carbon optimization advisor for cloud infrastructure.

Analyze these cloud infrastructure emission records and return ONLY a valid JSON array of optimization recommendations. No markdown, no explanation, ONLY the JSON array.

Each recommendation object must have exactly these fields:
- instanceId (string)
- instanceName (string) 
- currentType (string)
- recommendedAction (string: "TERMINATE", "DOWNGRADE", "MIGRATE_REGION", or "SCHEDULE_SHUTDOWN")
- currentCarbonKg (number)
- projectedCarbonKg (number)
- reductionPercent (number)
- reasoning (string: one sentence)
- priority (string: "HIGH", "MEDIUM", or "LOW")

Infrastructure Data:
${JSON.stringify(records.filter(r => r.isIdle || r.isOversized), null, 2)}

Key context:
- Instances with cpuUtilization < 0.05 are IDLE (waste)
- Instances with cpuUtilization < 0.20 are OVERSIZED
- ap-south-1 (India) has 750 gCO₂/kWh — one of the dirtiest grids
- eu-north-1 (Stockholm) has 8 gCO₂/kWh — one of the cleanest grids
- Migrating from ap-south-1 to eu-north-1 saves ~98% carbon

Return ONLY the JSON array:`;
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-goog-api-key': apiKey,
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.2,
                    maxOutputTokens: 2048,
                },
            }),
        });
        if (!response.ok) {
            console.warn(`[Analyst] Gemini returned ${response.status}, falling back to rules`);
            return null;
        }
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text)
            return null;
        // Extract JSON from response (Gemini sometimes wraps in ```json blocks)
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (!jsonMatch)
            return null;
        return JSON.parse(jsonMatch[0]);
    }
    catch (error) {
        console.warn(`[Analyst] Gemini call failed: ${error.message}, falling back to rules`);
        return null;
    }
}
/**
 * Rule-based fallback recommendations (when Gemini is unavailable)
 */
function generateFallbackRecommendations(records) {
    const recommendations = [];
    for (const record of records) {
        if (record.isIdle) {
            recommendations.push({
                instanceId: record.instanceId,
                instanceName: record.instanceName || record.instanceId,
                currentType: record.instanceType,
                recommendedAction: 'TERMINATE',
                currentCarbonKg: record.carbonKg,
                projectedCarbonKg: 0,
                reductionPercent: 100,
                reasoning: `Instance "${record.instanceName}" is idle at ${(record.cpuUtilization * 100).toFixed(1)}% CPU. Terminate to eliminate ${record.carbonKg.toFixed(1)} kg CO₂/month.`,
                priority: 'HIGH',
            });
        }
        else if (record.isOversized) {
            const downgrade = DOWNGRADE_MAP[record.instanceType] || record.instanceType;
            const estimatedSaving = record.carbonKg * 0.5; // ~50% saving from downgrade
            recommendations.push({
                instanceId: record.instanceId,
                instanceName: record.instanceName || record.instanceId,
                currentType: record.instanceType,
                recommendedAction: 'DOWNGRADE',
                currentCarbonKg: record.carbonKg,
                projectedCarbonKg: record.carbonKg - estimatedSaving,
                reductionPercent: 50,
                reasoning: `Instance "${record.instanceName}" is over-provisioned at ${(record.cpuUtilization * 100).toFixed(1)}% CPU. Downgrade from ${record.instanceType} to ${downgrade}.`,
                priority: 'MEDIUM',
            });
        }
        // Region migration recommendation for high-carbon regions
        if (record.region === 'ap-south-1' && !record.isIdle) {
            const projectedKg = record.carbonKg * (8 / 750); // eu-north-1 ratio
            recommendations.push({
                instanceId: record.instanceId,
                instanceName: record.instanceName || record.instanceId,
                currentType: record.instanceType,
                recommendedAction: 'MIGRATE_REGION',
                currentCarbonKg: record.carbonKg,
                projectedCarbonKg: Math.round(projectedKg * 100) / 100,
                reductionPercent: 98,
                reasoning: `Migrating "${record.instanceName}" from ap-south-1 (750 gCO₂/kWh) to eu-north-1 (8 gCO₂/kWh) would reduce carbon by ~98%.`,
                priority: 'LOW',
            });
        }
    }
    return recommendations;
}
/**
 * Run the Analyst Agent
 */
async function runAnalyst(records, geminiApiKey) {
    const idleInstances = records.filter(r => r.isIdle);
    const oversizedInstances = records.filter(r => r.isOversized);
    const flaggedRecords = records.filter(r => r.isIdle || r.isOversized);
    let recommendations;
    // Try Gemini first, fall back to rules
    if (geminiApiKey && flaggedRecords.length > 0) {
        const geminiRecs = await callGeminiForRecommendations(records, geminiApiKey);
        recommendations = geminiRecs || generateFallbackRecommendations(flaggedRecords);
    }
    else {
        recommendations = generateFallbackRecommendations(flaggedRecords);
    }
    const totalCurrentKg = records.reduce((sum, r) => sum + r.carbonKg, 0);
    const totalSavingsKg = recommendations.reduce((sum, r) => sum + (r.currentCarbonKg - r.projectedCarbonKg), 0);
    const summary = `Analyzed ${records.length} instances. ` +
        `${idleInstances.length} idle, ${oversizedInstances.length} oversized. ` +
        `${recommendations.length} recommendations generated. ` +
        `Potential savings: ${totalSavingsKg.toFixed(1)} kg CO₂/month`;
    return {
        recommendations,
        idleInstances,
        oversizedInstances,
        totalCurrentKg: Math.round(totalCurrentKg * 100) / 100,
        totalProjectedKg: Math.round((totalCurrentKg - totalSavingsKg) * 100) / 100,
        totalSavingsKg: Math.round(totalSavingsKg * 100) / 100,
        summary,
    };
}
