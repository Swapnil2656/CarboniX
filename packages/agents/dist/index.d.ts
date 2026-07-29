/**
 * CarboniX Agents — Public API
 *
 * Exports all four agents for use by the Express API orchestration layer.
 */
export { runCollector, CollectorResult, EmissionRecordData } from './collector';
export { runAnalyst, AnalystResult, Recommendation } from './analyst';
export { runGateAgent, GateResult, ParsedResource } from './cicdGate';
export { runReporter, BRSRReport } from './reporter';
export { runOrchestrator, OrchestratorResult, MigrationPlan, MigrationStep } from './orchestrator';
export { generateMockInstances } from './mockData';
export { enactRegionSwitch, EnactResult, PlatformCredentialData } from './platform-agents';
