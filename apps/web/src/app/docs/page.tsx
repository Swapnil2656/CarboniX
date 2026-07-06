import React from 'react';
import { Navbar } from '../components/Navbar';
import { AnimatedFooter } from '../components/AnimatedFooter';
import { auth } from '@/auth';

export const metadata = {
  title: 'Documentation | CarboniX',
  description: 'Learn about the architecture and usage of the CarboniX platform.',
};

export default async function DocsPage() {
  const session = await auth();

  return (
    <div className="bg-black text-on-surface font-body-md overflow-x-hidden selection:bg-primary-container selection:text-on-primary-fixed min-h-screen flex flex-col">
      <Navbar session={session} />

      <main className="flex-grow pt-[120px] pb-3xl relative z-10 max-w-[1440px] w-full mx-auto px-margin flex flex-col md:flex-row gap-xl">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 flex-shrink-0 md:sticky top-[120px] self-start mb-xl md:mb-0 hidden md:block">
          <nav className="space-y-sm bg-surface-container/50 p-lg rounded-xl border border-outline-variant/30 backdrop-blur-md">
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-md border-b border-outline-variant/30 pb-xs">CONTENTS</h3>
            <ul className="space-y-xs">
              <li>
                <a href="#introduction" className="text-on-surface hover:text-primary-container transition-colors block py-xs">Introduction</a>
              </li>
              <li>
                <a href="#architecture" className="text-on-surface hover:text-primary-container transition-colors block py-xs">System Architecture</a>
              </li>
              <li>
                <a href="#core-engine" className="text-on-surface hover:text-primary-container transition-colors block py-xs">Core Engine</a>
              </li>
              <li>
                <a href="#ai-agents" className="text-on-surface hover:text-primary-container transition-colors block py-xs">AI Agents</a>
              </li>
              <li>
                <a href="#api" className="text-on-surface hover:text-primary-container transition-colors block py-xs">Backend API</a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <article className="flex-grow bg-surface/50 p-xl md:p-3xl rounded-xl border border-outline-variant/30 backdrop-blur-md prose prose-invert max-w-4xl prose-headings:font-headline prose-headings:text-primary-container prose-p:text-on-surface-variant prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
          <h1 id="introduction" className="text-headline mb-md">CarboniX Documentation</h1>
          <p className="font-body-lg text-body-lg mb-xl">
            Welcome to the official documentation for <strong>CarboniX</strong>. CarboniX is a premium, carbon-aware console designed for high-scale infrastructure management. It allows you to monitor, optimize, and neutralize your digital footprint across modern computing environments.
          </p>

          <h2 id="architecture" className="text-section-header mt-3xl mb-md border-t border-outline-variant/30 pt-xl">System Architecture</h2>
          <p className="mb-md">
            CarboniX is built as a high-performance <strong>Turborepo</strong> monorepo, separating core logic from the orchestration layer and client applications. The architecture is composed of:
          </p>
          <ul className="list-disc pl-md space-y-xs mb-xl">
            <li><strong>apps/web</strong>: The Next.js 14 React web application (what you're viewing now), featuring a sleek dark-mode UI, secure NextAuth integration, and server-side rendering.</li>
            <li><strong>apps/mobile</strong>: A cross-platform mobile application to monitor carbon metrics on the go.</li>
            <li><strong>services/api</strong>: A robust Node.js/Express backend that handles business logic, database transactions via Prisma, and agent orchestration.</li>
            <li><strong>packages/core</strong>: The math and calculation engine.</li>
            <li><strong>packages/agents</strong>: Specialized AI agents for telemetry, analysis, and reporting.</li>
          </ul>

          <h2 id="core-engine" className="text-section-header mt-3xl mb-md border-t border-outline-variant/30 pt-xl">Core Engine (<code className="text-sm bg-black/50 px-2 py-1 rounded">@carbonix/core</code>)</h2>
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

          <h2 id="ai-agents" className="text-section-header mt-3xl mb-md border-t border-outline-variant/30 pt-xl">AI Agents (<code className="text-sm bg-black/50 px-2 py-1 rounded">@carbonix/agents</code>)</h2>
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

          <h2 id="api" className="text-section-header mt-3xl mb-md border-t border-outline-variant/30 pt-xl">Backend API (<code className="text-sm bg-black/50 px-2 py-1 rounded">services/api</code>)</h2>
          <p className="mb-md">
            The orchestration layer is a secure Express application interacting with a PostgreSQL database via Prisma ORM. 
          </p>
          <ul className="list-disc pl-md space-y-xs mb-xl">
            <li><strong>Agent Orchestration</strong>: Manages the scheduling and execution of the AI Agents.</li>
            <li><strong>Auth Layer</strong>: Validates session tokens issued by the Next.js frontend (NextAuth).</li>
            <li><strong>Historical Data</strong>: Stores and retrieves historical carbon tracking data for the dashboard visualizations.</li>
          </ul>

        </article>
      </main>

      <AnimatedFooter />
    </div>
  );
}
