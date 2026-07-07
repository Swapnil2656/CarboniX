import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from "next/dynamic";
import { Navbar } from './components/Navbar';
import { AnimatedFooter } from './components/AnimatedFooter';
import { RegionsTable } from './components/RegionsTable';
import { auth } from '@/auth';
import { SignOutButton } from './components/SignOutButton';

import { MagicDust } from '@/components/ui/magic-dust-shader';

export const metadata: Metadata = {
  title: 'CarboniX | The Carbon Cost of Your Cloud',
  description:
    'Quantify, monitor, and gate your infrastructure\'s environmental impact directly in the IDE and CI/CD pipelines. Industrial-grade carbon intelligence for modern dev teams.',
};

export default async function LandingPage() {
  const session = await auth();

  return (
    <div className="bg-orange-50 dark:bg-background text-on-surface font-body-md overflow-x-hidden selection:bg-primary-container selection:text-on-primary-fixed">
      {/* ── Ambient 3D Background ───────────────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none flex justify-center items-center opacity-80 overflow-hidden">
        <MagicDust />
      </div>
      <Navbar session={session} />

      <main className="pt-[80px] relative z-10 rounded-b-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section id="platform" className="relative overflow-hidden min-h-[90vh] flex items-center py-3xl w-full">
          {/* Subtle background glow for extra visual appeal in light mode */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-amber-500/10 dark:bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />
          
          {/* Content Wrapper */}
          <div className="max-w-[1440px] mx-auto px-margin w-full flex flex-col items-center text-center relative z-10">
            {/* Center col */}
            <div className="flex flex-col items-center">
              <h1 className="font-display text-display mb-lg leading-[1.05]">
                The carbon cost of{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-400 dark:from-primary dark:to-primary-fixed">your cloud</span>.{' '}
                <br />In 5 lines of code.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl max-w-[540px]">
                Quantify, monitor, and gate your infrastructure&apos;s environmental impact
                directly in the IDE and CI/CD pipelines. Industrial-grade carbon
                intelligence for modern dev teams.
              </p>
              <div className="flex justify-center gap-md flex-wrap">
                <Link
                  href="/signup"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 dark:from-primary dark:to-primary-fixed text-white dark:text-on-primary-fixed px-xl py-md rounded-lg font-bold text-body-lg hover:shadow-lg hover:shadow-amber-500/25 transition-all transform hover:-translate-y-0.5"
                >
                  Connect Provider
                </Link>
                <Link
                  href="/docs"
                  className="border-2 border-amber-500/20 dark:border-primary-container text-amber-700 dark:text-primary-container px-xl py-md rounded-lg font-bold text-body-lg hover:bg-amber-500/10 dark:hover:bg-primary-container/10 transition-all"
                >
                  Read SDK Docs
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Carbon Intelligence on the Go (Mobile App) ───────── */}
        <section className="px-margin py-3xl bg-transparent max-w-[800px] mx-auto flex flex-col items-center text-center space-y-xl">
          <div>
            <div className="w-16 h-16 rounded-2xl bg-primary-container/20 flex items-center justify-center text-primary-container mb-lg mx-auto">
              <span className="material-symbols-outlined text-[32px]">smartphone</span>
            </div>
            <h2 className="font-display text-headline mb-lg text-on-surface">
              Carbon Intelligence <span className="text-primary-container">On The Go</span>
            </h2>
            <div className="font-body-lg text-body-lg text-on-surface-variant mb-xl space-y-md">
              <p>
                Take your infrastructure's environmental metrics with you anywhere. The <strong>CarboniX Mobile App</strong> provides real-time alerts, live grid intensity tracking, and fleet-wide carbon monitoring right from your pocket.
              </p>
              <p>
                Whether you're commuting or away from your desk, instantly monitor high-emission deployments and track your monthly carbon budget on the fly.
              </p>
            </div>
          </div>
          
          <a
            href="/carbonix.apk"
            download
            className="bg-primary-container text-on-primary-fixed px-2xl py-lg rounded-full font-bold text-body-lg hover:opacity-90 transition-all flex items-center gap-md shadow-lg shadow-primary-container/20 hover:shadow-primary-container/40"
          >
            <span className="material-symbols-outlined text-[24px]">android</span>
            Download Android APK
          </a>
        </section>

        {/* ── Problem Strip (marquee) ──────────────────────── */}
        <section className="py-md overflow-hidden flex items-center">
          <div className="flex whitespace-nowrap animate-scroll gap-xl">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-xl">
                {[
                  { region: 'ap-south-1',  value: '750 gCO2/kWh', critical: true },
                  { region: 'eu-north-1',  value: '12 gCO2/kWh',  critical: false },
                  { region: 'us-east-1',   value: '380 gCO2/kWh', critical: true },
                  { region: 'ca-central-1',value: '28 gCO2/kWh',  critical: false },
                  { region: 't3.large',    value: '~ 0.4kg/hr',   critical: false },
                ].map((chip) => (
                  <div
                    key={chip.region + i}
                    className="flex items-center gap-md bg-surface-container border border-outline-variant px-lg py-sm rounded-full"
                  >
                    <span className={`font-code text-label-caps ${chip.critical ? 'text-error' : 'text-primary-container'}`}>
                      {chip.region}
                    </span>
                    <span className="font-code text-label-caps text-on-surface-variant">= {chip.value}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ── How It Works ─────────────────────────────────── */}
        <section id="solutions" className="px-margin py-3xl max-w-[1440px] mx-auto">
          <div className="text-center mb-3xl">
            <h2 className="font-display text-headline text-primary mb-md">How It Works</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[600px] mx-auto">
              From raw server metrics to actionable carbon intelligence in three steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
            {[
              {
                step: '1',
                icon: 'memory',
                title: 'Telemetry Collection',
                desc: 'Our Collector agent runs in your cluster, silently gathering CPU, RAM, and Storage utilization data from your cloud instances.',
                code: (
                  <p className="font-code text-code text-on-surface-variant leading-relaxed">
                    <span className="code-keyword text-primary-container">[Agent: Collector]</span><br/>
                    Instance: <span className="text-on-surface">t3.large</span><br/>
                    CPU_Util: <span className="text-on-surface">42.5%</span><br/>
                    Status: <span className="text-on-surface">ACTIVE</span>
                  </p>
                ),
              },
              {
                step: '2',
                icon: 'functions',
                title: 'Core Math Engine',
                desc: 'Utilization metrics are cross-referenced with live regional power grid carbon intensity and data center PUE to calculate exact CO2e.',
                code: (
                  <p className="font-code text-code text-on-surface-variant leading-relaxed">
                    <span className="code-keyword text-primary-container">[GridCache Engine]</span><br/>
                    GridIntensity: <span className="text-on-surface">255 gCO2/kWh</span><br/>
                    PUE: <span className="text-on-surface">1.2</span><br/>
                    Calc: <span className="text-on-surface">(E * Grid * PUE)</span>
                  </p>
                ),
              },
              {
                step: '3',
                icon: 'auto_awesome',
                title: 'Actionable Insights',
                desc: 'AI Agents transform raw math into action. The Analyst finds inefficiencies, while the GateAgent blocks carbon-heavy deployments.',
                code: (
                  <>
                    <p className="font-code text-code text-error leading-relaxed">&gt; GateAgent: BLOCK DEPLOY</p>
                    <p className="font-code text-code text-on-surface-variant leading-relaxed">&gt; Reason: Budget Exceeded (+12kg)</p>
                  </>
                ),
              },
            ].map((card) => (
              <div
                key={card.step}
                className="bg-surface-container border border-outline-variant p-lg rounded-xl relative overflow-hidden group hover:border-primary transition-colors"
              >
                <div className="absolute -right-4 -top-4 font-display text-[120px] text-outline-variant/10 font-black select-none">
                  {card.step}
                </div>
                <div className="mb-lg">
                  <div className="w-12 h-12 rounded-lg bg-primary-container/20 flex items-center justify-center text-primary-container mb-md">
                    <span className="material-symbols-outlined">{card.icon}</span>
                  </div>
                  <h3 className="font-display text-section-header mb-sm text-on-surface">{card.title}</h3>
                  <p className="font-body-md text-on-surface-variant">{card.desc}</p>
                </div>
                <div className="bg-surface-container-lowest p-md rounded border border-outline-variant">
                  {card.code}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SDK Demo / Predictive Observability ──────────── */}
        <section className="px-margin py-3xl">
          <div className="max-w-[800px] mx-auto flex flex-col items-center text-center space-y-xl">
            <div>
              <h2 className="font-display text-headline mb-md leading-tight text-on-surface">
                Predictive <span className="text-primary-container">Observability</span>
              </h2>
              <div className="font-body-lg text-body-lg text-on-surface-variant max-w-[700px] mx-auto space-y-md">
                <p>
                  Don&apos;t wait for the monthly bill to see your impact. <strong>Predictive Observability</strong> shifts carbon awareness left by intercepting your infrastructure-as-code (Terraform, Kubernetes) during the Pull Request phase.
                </p>
                <p>
                  CarboniX mathematically models the exact CO2e cost of your proposed architecture changes against live regional grid intensities. Set hard carbon budgets for your teams and let our GateAgent automatically block deployments that exceed them, empowering developers to make greener routing decisions before a single server is provisioned.
                </p>
              </div>
            </div>
            
            <div className="bg-surface p-lg rounded-xl border border-outline-variant space-y-md text-left w-full max-w-[500px]">
              <div className="flex justify-between items-end">
                <span className="font-label-caps text-label-caps text-on-surface-variant">PROJECTED IMPACT</span>
                <span className="font-display text-[32px] font-black text-error leading-none">33.8kg</span>
              </div>
              <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="w-[85%] h-full bg-error" />
              </div>
              <div className="flex items-center gap-md bg-error/10 p-md rounded-lg border border-error/30">
                <span className="material-symbols-outlined text-error">priority_high</span>
                <p className="font-body-md text-error text-[14px]">
                  <strong>Warning:</strong> Mumbai grid is currently 78% coal-powered. Switching to{' '}
                  <strong>Stockholm</strong> could save 33.1kg CO2e.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Regional Carbon Intensity ─────────────────────── */}
        <section id="network" className="px-margin py-3xl max-w-[1440px] mx-auto">
          <h2 className="font-display text-headline text-center mb-2xl text-on-surface">Regional Carbon Intensity</h2>
          <RegionsTable />
        </section>

        {/* ── Automated Carbon Gates ───────────────────────── */}
        <section className="px-margin py-3xl">
          <div className="max-w-[800px] mx-auto flex flex-col items-center text-center space-y-xl">
            <div>
              <h2 className="font-display text-headline mb-lg text-on-surface">
                Automated <span className="text-primary-container">Carbon Gates</span>
              </h2>
              <div className="font-body-lg text-body-lg text-on-surface-variant mb-xl space-y-md">
                <p>
                  Treat carbon like a security vulnerability. CarboniX introduces the <strong>GateAgent</strong>, an AI-driven sentinel that resides in your CI/CD pipelines (GitHub Actions, GitLab CI).
                </p>
                <p>
                  Before any code is merged, the GateAgent analyzes the proposed infrastructure changes, calculates the net-new CO2e emissions, and automatically blocks the deployment if it exceeds your pre-defined carbon budget. It ensures that &quot;Dirty&quot; regional drift never makes it to production, keeping your infrastructure green and compliant by design.
                </p>
              </div>
            </div>
            
            <div className="bg-surface-container border border-outline-variant rounded-xl p-xl shadow-lg w-full text-left">
              <h3 className="font-display font-bold text-on-surface mb-md text-section-header">Key Capabilities</h3>
              <ul className="space-y-md">
                {[
                  'Intercepts Terraform & Kubernetes manifests in PRs.',
                  'Prevents "Dirty" Region drift in production environments.',
                  'Auto-suggests cleaner instance alternatives automatically.',
                  'Standardizes automated reporting for CSRD compliance.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-md">
                    <span className="material-symbols-outlined text-primary-container mt-1">check_circle</span>
                    <span className="font-body-md text-on-surface">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>


      </main>

      <AnimatedFooter />
    </div>
  );
}
