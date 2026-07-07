import React from 'react';

export const metadata = {
  title: 'CI/CD Integration | CarboniX',
  description: 'Integrate the CarboniX GateAgent into your CI/CD pipelines.',
};

export default function CiCdPage() {
  return (
    <>
      <h1 className="text-headline mb-md">CI/CD Integration (GateAgent)</h1>
      <p className="font-body-lg text-body-lg mb-xl">
        The CarboniX GateAgent integrates directly into your deployment pipelines (GitHub Actions, GitLab CI, etc.) to analyze infrastructure-as-code (Terraform, CloudFormation) and block deployments that exceed your carbon budget.
      </p>

      <h2 className="text-section-header mt-3xl mb-md border-t border-outline-variant/30 pt-xl">GitHub Actions</h2>
      <p className="mb-md">
        You can use our official GitHub Action to automatically scan your PRs for carbon regressions.
      </p>

      <div className="bg-black/50 border border-outline-variant/30 rounded-lg p-md mb-xl overflow-x-auto">
        <pre className="text-sm font-mono text-gray-300">
          <code className="block"><span className="text-purple-400">name</span>: CarboniX GateAgent</code>
          <code className="block"><span className="text-purple-400">on</span>: [pull_request]</code>
          <code className="block"></code>
          <code className="block"><span className="text-purple-400">jobs</span>:</code>
          <code className="block">  <span className="text-blue-300">carbon_scan</span>:</code>
          <code className="block">    <span className="text-purple-400">runs-on</span>: ubuntu-latest</code>
          <code className="block">    <span className="text-purple-400">steps</span>:</code>
          <code className="block">      - <span className="text-purple-400">uses</span>: actions/checkout@v3</code>
          <code className="block">      </code>
          <code className="block">      - <span className="text-purple-400">name</span>: Run CarboniX GateAgent</code>
          <code className="block">        <span className="text-purple-400">uses</span>: carbonix-io/gate-agent-action@v1</code>
          <code className="block">        <span className="text-purple-400">with</span>:</code>
          <code className="block">          <span className="text-blue-300">api-key</span>: {'${{ secrets.CARBONIX_API_KEY }}'}</code>
          <code className="block">          <span className="text-blue-300">fail-on-regression</span>: true</code>
          <code className="block">          <span className="text-blue-300">budget-co2-grams</span>: 5000</code>
        </pre>
      </div>

      <h2 className="text-section-header mt-3xl mb-md border-t border-outline-variant/30 pt-xl">How it Works</h2>
      <ul className="list-disc pl-md space-y-sm mb-xl">
        <li><strong>Parsing</strong>: The GateAgent parses your Terraform state or plan files to understand the resources being provisioned.</li>
        <li><strong>Estimation</strong>: It uses the Core Engine to estimate the 24-hour carbon footprint of those resources based on their instance types and regions.</li>
        <li><strong>Enforcement</strong>: If the estimated footprint exceeds the `budget-co2-grams` or represents a regression compared to the `main` branch, the CI pipeline fails.</li>
        <li><strong>Reporting</strong>: The Agent automatically posts a beautiful summary comment directly on the Pull Request.</li>
      </ul>
    </>
  );
}
