import React from 'react';
import { Navbar } from '../components/Navbar';
import { AnimatedFooter } from '../components/AnimatedFooter';
import { MagicDust } from '@/components/ui/magic-dust-shader';
import { auth } from '@/auth';

export const metadata = {
  title: 'Solutions | CarboniX',
  description: 'Highlighting how CarboniX solves specific business use cases.',
};

export default async function SolutionsPage() {
  const session = await auth();

  return (
    <div className="bg-black text-on-surface font-body-md overflow-x-hidden selection:bg-primary-container selection:text-on-primary-fixed min-h-screen flex flex-col">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <MagicDust />
      </div>

      <Navbar session={session} />

      <main className="flex-grow pt-[120px] pb-3xl relative z-10 w-full mx-auto flex flex-col items-center">
        
        {/* Hero Section */}
        <section className="text-center max-w-[800px] px-margin mb-3xl">
          <h1 className="font-display text-display font-black text-on-surface mb-lg">
            CarboniX <span className="text-primary-container">Solutions</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Built to empower engineering teams and sustainability officers alike. See how CarboniX adapts to your specific organizational needs.
          </p>
        </section>

        {/* Feature Grid */}
        <section className="max-w-[1200px] w-full px-margin grid grid-cols-1 md:grid-cols-2 gap-xl mb-3xl">
          
          {/* Solution 1 */}
          <div className="bg-surface-container/60 backdrop-blur-md p-xl rounded-xl border border-outline-variant/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/10 rounded-bl-full -z-10 group-hover:bg-primary-container/20 transition-colors"></div>
            <h3 className="font-display text-section-header text-on-surface mb-sm">For DevOps Engineers</h3>
            <p className="text-on-surface-variant font-body-sm mb-lg">
              Stop carbon leaks before they hit production. Integrate CarboniX directly into your GitHub Actions or GitLab CI pipelines.
            </p>
            <ul className="list-disc pl-md text-sm text-on-surface-variant space-y-xs">
              <li><strong>GateAgent</strong> blocks deployments that exceed your configured carbon budget.</li>
              <li>Parse Infrastructure-as-Code (Terraform, Pulumi) for projected emission impacts.</li>
              <li>Enforce sustainability policies automatically across all microservices.</li>
            </ul>
          </div>

          {/* Solution 2 */}
          <div className="bg-surface-container/60 backdrop-blur-md p-xl rounded-xl border border-outline-variant/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/10 rounded-bl-full -z-10 group-hover:bg-primary-container/20 transition-colors"></div>
            <h3 className="font-display text-section-header text-on-surface mb-sm">For Data Engineers</h3>
            <p className="text-on-surface-variant font-body-sm mb-lg">
              Data pipelines are notoriously compute-heavy. CarboniX helps you shift these workloads to periods of greener energy.
            </p>
            <ul className="list-disc pl-md text-sm text-on-surface-variant space-y-xs">
              <li>Leverage our <strong>GridCache</strong> to predict periods of low grid carbon intensity.</li>
              <li>Dynamically schedule batch processing and AI training jobs.</li>
              <li>Reduce your pipeline's carbon footprint by up to 40% without sacrificing throughput.</li>
            </ul>
          </div>

          {/* Solution 3 */}
          <div className="bg-surface-container/60 backdrop-blur-md p-xl rounded-xl border border-outline-variant/30 relative overflow-hidden group md:col-span-2">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/10 rounded-bl-full -z-10 group-hover:bg-primary-container/20 transition-colors"></div>
            <div className="max-w-[700px]">
              <h3 className="font-display text-section-header text-on-surface mb-sm">For ESG & Sustainability Officers</h3>
              <p className="text-on-surface-variant font-body-sm mb-lg">
                Translate technical server telemetry into board-ready compliance reports. Automate the arduous process of regulatory sustainability tracking.
              </p>
              <ul className="list-disc pl-md text-sm text-on-surface-variant space-y-xs">
                <li>Automated generation of Business Responsibility and Sustainability Reporting (BRSR) documents.</li>
                <li>Audit-ready trails mapping CO2e metrics directly back to specific cloud billing accounts.</li>
                <li>Set organizational carbon budgets and track team-level adherence in real-time.</li>
              </ul>
            </div>
          </div>

        </section>

      </main>

      <AnimatedFooter />
    </div>
  );
}
