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
const core_1 = require("@carbonix/core");
const zod_1 = require("zod");
// Downgrade mapping: what to recommend when an instance is oversized
const DOWNGRADE_MAP = {
    'm5.2xlarge': 'm5.xlarge',
    'm5.xlarge': 'm5.large',
    'm5.large': 't3.large',
    't3.large': 't3.medium',
    't3.medium': 't3.micro',
    'c5.xlarge': 'c5.large',
};
// ─── Zod schema for Nemotron output validation ────────────────────────────────
const RecommendationSchema = zod_1.z.object({
    projectId: zod_1.z.string().optional(),
    deploymentId: zod_1.z.string().optional(),
    instanceId: zod_1.z.string(),
    instanceName: zod_1.z.string(),
    currentType: zod_1.z.string(),
    recommendedAction: zod_1.z.enum(['TERMINATE', 'DOWNGRADE', 'MIGRATE_REGION', 'SCHEDULE_SHUTDOWN']),
    currentCarbonKg: zod_1.z.number(),
    projectedCarbonKg: zod_1.z.number(),
    reductionPercent: zod_1.z.number(),
    reasoning: zod_1.z.string(),
    priority: zod_1.z.enum(['HIGH', 'MEDIUM', 'LOW']),
});
const RecommendationArraySchema = zod_1.z.array(RecommendationSchema);
/**
 * Call Nvidia NIM API for intelligent recommendations
 */
async function callNvidiaForRecommendations(records, apiKey) {
    const SYSTEM_PROMPT = `You are CarboniX Analyst Agent — an AI carbon optimization advisor for cloud infrastructure.

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
- priority (string: "HIGH", "MEDIUM", or "LOW")`;
    const history = [
        { role: 'user', content: JSON.stringify(records.filter(r => r.isIdle || r.isOversized), null, 2) }
    ];
    /** One call attempt: returns parsed validated array or null on any failure */
    async function attempt(extraInstruction) {
        try {
            // 15-second hard timeout on the Nvidia API call
            const timeoutController = new AbortController();
            const timeoutTimer = setTimeout(() => timeoutController.abort(), 15_000);
            let data;
            try {
                const prompt = extraInstruction ? `${SYSTEM_PROMPT}\n\n${extraInstruction}` : SYSTEM_PROMPT;
                data = await (0, core_1.callNvidiaApi)(apiKey, 'meta/llama-3.1-70b-instruct', prompt, history);
            }
            finally {
                clearTimeout(timeoutTimer);
            }
            const text = data?.choices?.[0]?.message?.content;
            if (!text)
                return null;
            // Extract JSON array from response (Nvidia sometimes wraps in ```json blocks)
            const jsonMatch = text.match(/\[[\s\S]*\]/);
            if (!jsonMatch) {
                console.warn('[Analyst] Nemotron response did not contain a JSON array.');
                return null;
            }
            let parsed;
            try {
                parsed = JSON.parse(jsonMatch[0]);
            }
            catch {
                console.warn('[Analyst] Nemotron response JSON.parse failed.');
                return null;
            }
            // Validate with zod
            const result = RecommendationArraySchema.safeParse(parsed);
            if (!result.success) {
                console.warn('[Analyst] Nemotron output failed zod validation:', result.error.format());
                return null;
            }
            return result.data;
        }
        catch (error) {
            if (error?.name === 'AbortError') {
                console.warn('[Analyst] Nvidia NIM call timed out after 15 s, falling back to rules.');
            }
            else {
                console.warn(`[Analyst] Nvidia NIM call failed: ${error.message}`);
            }
            return null;
        }
    }
    // First attempt
    const first = await attempt();
    if (first !== null)
        return first;
    // Retry once with an explicit "JSON only" reinforcement
    console.warn('[Analyst] Retrying Nvidia NIM with explicit JSON instruction...');
    const second = await attempt('CRITICAL: Your previous response was invalid. Return ONLY a raw JSON array with no markdown, no code fences, no explanation. Start your response with "[" and end with "]".');
    if (second !== null)
        return second;
    console.warn('[Analyst] Both Nvidia NIM attempts failed — falling back to rule-based recommendations.');
    return null;
}
/**
 * Rule-based fallback recommendations (when Gemini is unavailable)
 */
function generateFallbackRecommendations(records) {
    const recommendations = [];
    for (const record of records) {
        if (record.isIdle) {
            recommendations.push({
                projectId: record.projectId,
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
                projectId: record.projectId,
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
                projectId: record.projectId,
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
async function runAnalyst(records, nvidiaApiKey) {
    const idleInstances = records.filter(r => r.isIdle);
    const oversizedInstances = records.filter(r => r.isOversized);
    const flaggedRecords = records.filter(r => r.isIdle || r.isOversized);
    let recommendations;
    // Try Nvidia first, fall back to rules
    if (nvidiaApiKey && flaggedRecords.length > 0) {
        const aiRecs = await callNvidiaForRecommendations(records, nvidiaApiKey);
        recommendations = aiRecs || generateFallbackRecommendations(flaggedRecords);
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
