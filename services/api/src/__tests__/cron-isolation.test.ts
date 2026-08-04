import assert from 'assert';

console.log('Running Agentic Cron Recommendation Isolation Test...');

// Mock recommendations from runAnalyst across mixed projects
const mockRecommendations = [
  {
    projectId: 'project-A',
    instanceId: 'inst-1',
    recommendedAction: 'MIGRATE_REGION',
  },
  {
    projectId: 'project-B',
    instanceId: 'inst-2',
    recommendedAction: 'MIGRATE_REGION',
  },
  {
    projectId: 'project-C',
    instanceId: 'inst-3',
    recommendedAction: 'TERMINATE',
  },
];

const agenticProjects = [
  { id: 'project-A', name: 'Project A' },
  { id: 'project-B', name: 'Project B' },
  { id: 'project-C', name: 'Project C' },
];

const enactedSwitches: string[] = [];

// Simulate the cron loop logic in index.ts
for (const project of agenticProjects) {
  const migrationRec = mockRecommendations
    .filter(r => r.projectId === project.id)
    .find(r => r.recommendedAction === 'MIGRATE_REGION');

  if (migrationRec) {
    enactedSwitches.push(project.id);
  }
}

// Verify enactRegionSwitch is called ONLY for the correct projects
try {
  assert.deepStrictEqual(enactedSwitches, ['project-A', 'project-B']);
  assert.ok(!enactedSwitches.includes('project-C'), 'Project C should not migrate');
  console.log('✅ Test Passed: Recommendations isolated correctly.');
} catch (e) {
  console.error('❌ Test Failed:', (e as Error).message);
  process.exit(1);
}
