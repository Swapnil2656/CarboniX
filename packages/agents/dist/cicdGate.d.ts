/**
 * CarboniX CI/CD Gate Agent
 *
 * Parses infrastructure diffs (Terraform, Docker, k8s) and calculates
 * projected carbon impact. Returns a pass/fail verdict with a formatted
 * PR comment for GitHub Actions.
 */
export interface ParsedResource {
    resourceName: string;
    instanceType: string;
    region: string;
    count: number;
    provider: 'AWS' | 'GCP' | 'AZURE';
}
export interface GateResult {
    passed: boolean;
    deltaKgPerDay: number;
    budgetKgPerDay: number;
    resources: Array<ParsedResource & {
        carbonKgPerDay: number;
        gridIntensity: number;
    }>;
    comment: string;
    summary: string;
}
/**
 * Run the CI/CD Gate Agent
 */
export declare function runGateAgent(diff: string, budgetKgPerDay?: number): Promise<GateResult>;
