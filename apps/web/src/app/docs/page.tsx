export const metadata = {
  title: 'Documentation | CarboniX',
  description: 'Learn about the architecture and usage of the CarboniX platform.',
};

export default function DocsPage() {
  return (
    <>
      <h1 className="text-headline mb-md">CarboniX Documentation</h1>
      <p className="font-body-lg text-body-lg mb-xl">
        Welcome to the official documentation for <strong>CarboniX</strong>. CarboniX is a premium, carbon-aware console designed for high-scale infrastructure management. It allows you to monitor, optimize, and neutralize your digital footprint across modern computing environments.
      </p>

      <h2 className="text-section-header mt-3xl mb-md border-t border-outline-variant/30 pt-xl">System Architecture</h2>
      <p className="mb-md">
        CarboniX is built as a high-performance <strong>Turborepo</strong> monorepo, separating core logic from the orchestration layer and client applications. The architecture is composed of:
      </p>
      <ul className="list-disc pl-md space-y-xs mb-xl">
        <li><strong>apps/web</strong>: The Next.js 14 React web application, featuring a sleek dark-mode UI, secure NextAuth integration, and server-side rendering.</li>
        <li><strong>apps/mobile</strong>: A cross-platform mobile application to monitor carbon metrics on the go.</li>
        <li><strong>services/api</strong>: A robust Node.js/Express backend that handles business logic, database transactions via Prisma, and agent orchestration.</li>
        <li><strong>packages/core</strong>: The math and calculation engine.</li>
        <li><strong>packages/agents</strong>: Specialized AI agents for telemetry, analysis, and reporting.</li>
      </ul>

      <h2 className="text-section-header mt-3xl mb-md border-t border-outline-variant/30 pt-xl">Core Engine (<code className="text-sm bg-black/50 px-2 py-1 rounded">@carbonix/core</code>)</h2>
      <p className="mb-md">
        The core library is a pure TypeScript package containing the primary mathematical models for carbon tracking. It operates independently of the framework to ensure the logic can run identically on the backend, edge workers, and client devices.
      </p>
      <p className="mb-md">Key modules include:</p>
      <ul className="list-disc pl-md space-y-sm mb-xl">
        <li><strong>calculator</strong>: Computes precise energy-to-carbon conversions based on localized power grid emission factors.</li>
        <li><strong>gridCache</strong>: Manages real-time data ingestion and caching of regional grid loads to determine the most "green" time for compute-heavy workloads.</li>
        <li><strong>equivalents</strong>: Translates abstract CO2e grams into relatable metrics (e.g., miles driven, smartphones charged).</li>
        <li><strong>recommendations & rating</strong>: Evaluates infrastructure performance against global benchmarks to generate a sustainability rating.</li>
      </ul>

      <h2 className="text-section-header mt-3xl mb-md border-t border-outline-variant/30 pt-xl">AI Agents (<code className="text-sm bg-black/50 px-2 py-1 rounded">@carbonix/agents</code>)</h2>
      <p className="mb-md">
        CarboniX utilizes four specialized AI Agents to autonomously monitor and act upon infrastructure telemetry:
      </p>
      <div className="space-y-lg mb-xl">
        <div className="bg-black/30 p-md rounded-lg border border-outline-variant/20">
          <h4 className="text-primary-container font-bold mb-xs">1. Collector</h4>
          <p className="text-sm text-on-surface-variant">Continuously polls your cloud providers (AWS, GCP, Azure) and internal clusters to gather raw utilization and telemetry data. It formats this data into standard Emission Records.</p>
        </div>
        <div className="bg-black/30 p-md rounded-lg border border-outline-variant/20">
          <h4 className="text-primary-container font-bold mb-xs">2. Analyst</h4>
          <p className="text-sm text-on-surface-variant">Consumes the telemetry from the Collector. It uses the Core Engine to identify inefficiencies, such as idle instances running during high-emission periods, and outputs actionable recommendations.</p>
        </div>
        <div className="bg-black/30 p-md rounded-lg border border-outline-variant/20">
          <h4 className="text-primary-container font-bold mb-xs">3. GateAgent</h4>
          <p className="text-sm text-on-surface-variant">Integrates directly into your CI/CD pipelines (e.g., GitHub Actions, GitLab CI). It can prevent high-carbon code deployments by parsing infrastructure-as-code and calculating its projected impact before it goes live.</p>
        </div>
        <div className="bg-black/30 p-md rounded-lg border border-outline-variant/20">
          <h4 className="text-primary-container font-bold mb-xs">4. Reporter</h4>
          <p className="text-sm text-on-surface-variant">Automates the generation of compliant BRSR (Business Responsibility and Sustainability Reporting) documents, allowing enterprises to effortlessly meet their ESG regulatory requirements.</p>
        </div>
      </div>

      <h2 className="text-section-header mt-3xl mb-md border-t border-outline-variant/30 pt-xl">Backend API (<code className="text-sm bg-black/50 px-2 py-1 rounded">services/api</code>)</h2>
      <p className="mb-md">
        The orchestration layer is a secure Express application interacting with a PostgreSQL database via Prisma ORM. 
      </p>
      <ul className="list-disc pl-md space-y-xs mb-xl">
        <li><strong>Agent Orchestration</strong>: Manages the scheduling and execution of the AI Agents.</li>
        <li><strong>Auth Layer</strong>: Validates session tokens issued by the Next.js frontend (NextAuth).</li>
        <li><strong>Historical Data</strong>: Stores and retrieves historical carbon tracking data for the dashboard visualizations.</li>
      </ul>

      <h2 className="text-section-header mt-3xl mb-md border-t border-outline-variant/30 pt-xl">System Resilience & Testing</h2>
      <p className="mb-md">
        CarboniX is verified by a comprehensive <strong>49-point Agentic Testing Suite</strong> that ensures all backend services, agent triggers, and external integrations operate flawlessly.
      </p>
      <ul className="list-disc pl-md space-y-xs mb-xl">
        <li><strong>AI Chat Fallbacks</strong>: The AI controller gracefully handles missing history parameters and implements timeouts (e.g., catching 60-second timeouts from the NVIDIA NIM LLM) to prevent service crashes.</li>
        <li><strong>Calculation Payloads</strong>: The Carbon Engine requires precise <code>CalculationInput</code> structures, rigorously validated to prevent faulty carbon mathematics.</li>
        <li><strong>Auth Constraints</strong>: The database layer utilizes strict Prisma constraints (like unique usernames and emails) which the testing suite verifies with timestamped mock data.</li>
      </ul>
    </>
  );
}
