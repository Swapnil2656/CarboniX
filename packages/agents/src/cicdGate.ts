/**
 * CarboniX CI/CD Gate Agent
 * 
 * Parses infrastructure diffs (Terraform, Docker, k8s) and calculates
 * projected carbon impact. Returns a pass/fail verdict with a formatted
 * PR comment for GitHub Actions.
 */

import { calculateCarbon } from '@carbonix/core';
import { DEFAULT_GRID_INTENSITIES } from '@carbonix/core';

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
  resources: Array<ParsedResource & { carbonKgPerDay: number; gridIntensity: number }>;
  comment: string;
  summary: string;
}

/**
 * Parse Terraform diff for aws_instance / google_compute_instance blocks
 */
function parseTerraformResources(diff: string): ParsedResource[] {
  const resources: ParsedResource[] = [];

  // Match aws_instance resource blocks with their properties
  const awsInstanceRegex = /resource\s+"aws_instance"\s+"(\w+)"\s*\{([^}]*)\}/gs;
  let match;

  while ((match = awsInstanceRegex.exec(diff)) !== null) {
    const resourceName = match[1];
    const block = match[2];

    // Extract instance_type
    const typeMatch = block.match(/instance_type\s*=\s*"([^"]+)"/);
    const instanceType = typeMatch ? typeMatch[1] : 't3.medium';

    // Extract region from provider or availability_zone
    const azMatch = block.match(/availability_zone\s*=\s*"([^"]+)"/);
    let region = 'us-east-1'; // default
    if (azMatch) {
      region = azMatch[1].replace(/[a-z]$/, ''); // us-east-1a → us-east-1
    }

    // Extract count
    const countMatch = block.match(/count\s*=\s*(\d+)/);
    const count = countMatch ? parseInt(countMatch[1]) : 1;

    resources.push({
      resourceName,
      instanceType,
      region,
      count,
      provider: 'AWS',
    });
  }

  // Match added lines in diff that mention instance types (simpler heuristic)
  const addedLines = diff.split('\n').filter(line => line.startsWith('+') && !line.startsWith('+++'));
  
  for (const line of addedLines) {
    // Detect instance type references in added lines
    const instanceTypeMatch = line.match(/instance_type\s*[:=]\s*"?(t3\.\w+|m5\.\w+|c5\.\w+|r5\.\w+)"?/);
    const regionMatch = line.match(/(ap-south-1|us-east-1|eu-west-1|eu-north-1|us-west-2|eu-central-1|ap-southeast-1)/);

    if (instanceTypeMatch && !resources.find(r => r.instanceType === instanceTypeMatch[1])) {
      resources.push({
        resourceName: 'inline-resource',
        instanceType: instanceTypeMatch[1],
        region: regionMatch ? regionMatch[1] : 'us-east-1',
        count: 1,
        provider: 'AWS',
      });
    }
  }

  return resources;
}

/**
 * Parse Docker/Compose files for service definitions
 * (heuristic: each service ≈ 1 t3.medium equivalent)
 */
function parseDockerResources(diff: string): ParsedResource[] {
  const resources: ParsedResource[] = [];
  const addedLines = diff.split('\n').filter(line => line.startsWith('+') && !line.startsWith('+++'));

  for (const line of addedLines) {
    // Detect new Docker service definitions
    const serviceMatch = line.match(/^\+\s{2}(\w[\w-]*):\s*$/);
    if (serviceMatch && !['version', 'services', 'volumes', 'networks'].includes(serviceMatch[1])) {
      resources.push({
        resourceName: `docker-${serviceMatch[1]}`,
        instanceType: 't3.medium', // Assume t3.medium per container
        region: 'ap-south-1',      // Default Indian deployment
        count: 1,
        provider: 'AWS',
      });
    }
  }

  return resources;
}

/**
 * Run the CI/CD Gate Agent
 */
export async function runGateAgent(
  diff: string,
  budgetKgPerDay: number = 10
): Promise<GateResult> {
  // Parse infrastructure changes
  const terraformResources = parseTerraformResources(diff);
  const dockerResources = parseDockerResources(diff);
  const allResources = [...terraformResources, ...dockerResources];

  const evaluatedResources: GateResult['resources'] = [];
  let totalDeltaKg = 0;

  for (const resource of allResources) {
    try {
      // Calculate 24h carbon footprint at 50% average utilization
      const result = await calculateCarbon({
        provider: resource.provider,
        region: resource.region,
        instanceType: resource.instanceType,
        instanceCount: resource.count,
        hoursPerMonth: 24, // daily calculation
        cpuUtilization: 0.5,
        storageGb: 50,
      });

      const carbonKgPerDay = result.co2KgMonth; // hoursPerMonth=24 gives daily

      evaluatedResources.push({
        ...resource,
        carbonKgPerDay: Math.round(carbonKgPerDay * 100) / 100,
        gridIntensity: result.gridIntensity,
      });

      totalDeltaKg += carbonKgPerDay;
    } catch (error) {
      // If instance type unknown, estimate using grid intensity
      const gridIntensity = DEFAULT_GRID_INTENSITIES[resource.region] || 400;
      const estimatedKg = (0.05 * 24 * gridIntensity) / 1000; // rough estimate
      
      evaluatedResources.push({
        ...resource,
        carbonKgPerDay: Math.round(estimatedKg * 100) / 100,
        gridIntensity,
      });

      totalDeltaKg += estimatedKg;
    }
  }

  totalDeltaKg = Math.round(totalDeltaKg * 100) / 100;
  const passed = totalDeltaKg <= budgetKgPerDay;

  // Generate markdown PR comment
  const tableRows = evaluatedResources
    .map(r => `| \`${r.instanceType}\` | \`${r.region}\` | ${r.gridIntensity} gCO₂/kWh | **${r.carbonKgPerDay} kg/day** |`)
    .join('\n');

  const greenestRegionTip = evaluatedResources.some(r => r.region === 'ap-south-1')
    ? '\n> 💡 Move workloads from `ap-south-1` to `eu-north-1` to cut emissions by up to 98%.\n'
    : '';

  const comment = `## ${passed ? '✅' : '🚫'} Carbonix Carbon Gate Report

**Status:** ${passed ? 'Within budget ✅' : 'BLOCKED — budget exceeded ❌'}
**Projected addition:** ${totalDeltaKg} kg CO₂/day
**Budget:** ${budgetKgPerDay} kg CO₂/day

| Instance | Region | Grid Intensity | Daily Carbon |
|----------|--------|----------------|--------------|
${tableRows}
${greenestRegionTip}
_Powered by [Carbonix](https://github.com/Swapnil2656/CarboniX) — built for the Indian cloud ecosystem_`;

  const summary = `Gate ${passed ? 'PASSED' : 'BLOCKED'}: ${totalDeltaKg} kg/day vs ${budgetKgPerDay} kg/day budget. ` +
    `${evaluatedResources.length} resources evaluated.`;

  return {
    passed,
    deltaKgPerDay: totalDeltaKg,
    budgetKgPerDay,
    resources: evaluatedResources,
    comment,
    summary,
  };
}
