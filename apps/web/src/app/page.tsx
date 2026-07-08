import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from "next/dynamic";
import { Navbar } from './components/Navbar';
import { AnimatedFooter } from './components/AnimatedFooter';
import { CiCdMockup } from './components/features/CiCdMockup';
import { ImpactChart } from './components/features/ImpactChart';
import { IdeSnippet } from './components/features/IdeSnippet';
import { SavingsCalculator } from './components/features/SavingsCalculator';
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

      <main className="pt-[80px] relative z-10 rounded-b-[40px]">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section id="platform" className="relative overflow-hidden min-h-[90vh] flex items-center py-3xl w-full">

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

        {/* ── Predictive Observability (IDE Snippet) ────────── */}
        <section className="px-margin py-3xl max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-2xl items-center">
          <div>
            <h2 className="font-display text-headline mb-md leading-tight text-on-surface">
              Predictive <span className="text-primary-container">Observability</span>
            </h2>
            <div className="font-body-lg text-body-lg text-on-surface-variant space-y-md">
              <p>
                Don&apos;t wait for the monthly bill to see your impact. <strong>Predictive Observability</strong> shifts carbon awareness left right into your IDE.
              </p>
              <p>
                CarboniX mathematically models the exact CO2e cost of your proposed architecture changes against live regional grid intensities before a single server is provisioned.
              </p>
            </div>
          </div>
          <div className="w-full mt-10 lg:mt-0">
            <IdeSnippet />
          </div>
        </section>

        {/* ── Automated Carbon Gates (CI/CD) ───────────────── */}
        <section className="px-margin py-3xl max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-2xl items-center">
          <div className="order-last lg:order-first w-full mt-10 lg:mt-0">
            <CiCdMockup />
          </div>
          <div>
            <h2 className="font-display text-headline mb-md text-on-surface">
              Automated <span className="text-primary-container">Carbon Gates</span>
            </h2>
            <div className="font-body-lg text-body-lg text-on-surface-variant space-y-md">
              <p>
                Treat carbon like a security vulnerability. CarboniX introduces the <strong>GateAgent</strong>, an AI-driven sentinel that resides in your CI/CD pipelines.
              </p>
              <p>
                Before any code is merged, the GateAgent analyzes proposed infrastructure changes and automatically blocks the deployment if it exceeds your pre-defined budget, ensuring "Dirty" regional drift never makes it to production.
              </p>
            </div>
          </div>
        </section>

        {/* ── Real-Time Impact Chart ────────────────────────── */}
        <section className="px-margin py-3xl max-w-[1440px] mx-auto">
          <div className="text-center mb-xl">
            <h2 className="font-display text-headline text-on-surface mb-md">Watch Emissions Plummet</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[600px] mx-auto">
              Once CarboniX is activated, it continuously optimizes workload placement and scaling, drastically reducing your baseline emissions.
            </p>
          </div>
          <ImpactChart />
        </section>

        {/* ── Savings Calculator ───────────────────────────── */}
        <section className="px-margin py-3xl mb-3xl">
          <SavingsCalculator />
        </section>

      </main>

      <AnimatedFooter />
    </div>
  );
}
