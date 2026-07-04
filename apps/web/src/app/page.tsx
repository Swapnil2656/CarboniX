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
    <div className="bg-black text-on-surface font-body-md overflow-x-hidden selection:bg-primary-container selection:text-on-primary-fixed">
      {/* ── Ambient 3D Background ───────────────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none flex justify-center items-center opacity-80 overflow-hidden">
        <MagicDust />
      </div>
      <Navbar session={session} />

      <main className="pt-[80px] relative z-10 rounded-b-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section id="platform" className="relative overflow-hidden min-h-[90vh] flex items-center py-3xl w-full">
          {/* Content Wrapper */}
          <div className="max-w-[1440px] mx-auto px-margin w-full flex flex-col items-center text-center relative z-10">
            {/* Center col */}
            <div className="flex flex-col items-center">
              <h1 className="font-display text-display mb-lg leading-[1.05]">
                The carbon cost of{' '}
                <span className="text-primary-container">your cloud</span>.{' '}
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
                  className="bg-primary-container text-on-primary-fixed px-xl py-md rounded-lg font-bold text-body-lg hover:opacity-90 transition-all"
                >
                  Connect Provider
                </Link>
                <a
                  href="#docs"
                  className="border border-primary-container text-primary-container px-xl py-md rounded-lg font-bold text-body-lg hover:bg-primary-container/10 transition-all"
                >
                  Read SDK Docs
                </a>
              </div>

            </div>
          </div>
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
              From terminal to global observability in three steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
            {[
              {
                step: '1',
                icon: 'download',
                title: 'Install SDK',
                desc: 'Add CarboniX to your project via npm, pip, or go get.',
                code: (
                  <p className="font-code text-code text-on-surface-variant">
                    <span className="code-keyword">npm</span> i carbonix
                  </p>
                ),
              },
              {
                step: '2',
                icon: 'settings',
                title: 'Configure',
                desc: 'Define your cloud provider and region preferences.',
                code: (
                  <p className="font-code text-code leading-relaxed">
                    <span className="code-keyword">const</span> cx = <span className="code-keyword">new</span> CarboniX(&#123;<br />
                    &nbsp;&nbsp;provider: <span className="code-string">&apos;aws&apos;</span>,<br />
                    &nbsp;&nbsp;region: <span className="code-string">&apos;us-east-1&apos;</span><br />
                    &#125;)
                  </p>
                ),
              },
              {
                step: '3',
                icon: 'analytics',
                title: 'Get Results',
                desc: 'Real-time carbon telemetry and CI/CD gating.',
                code: (
                  <>
                    <p className="font-code text-code text-primary-container">&gt;&gt; Impact: 0.12kg CO2e</p>
                    <p className="font-code text-code text-primary-container">&gt;&gt; Score: Optimal (A+)</p>
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
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-3xl items-center">
            {/* Code editor */}
            <div className="lg:col-span-7">
              <div className="bg-[#1e1e1e] rounded-xl border border-outline-variant shadow-2xl overflow-hidden">
                {/* Title bar */}
                <div className="bg-surface-container-high px-lg py-sm flex items-center justify-between border-b border-outline-variant">
                  <div className="flex items-center gap-sm">
                    <div className="flex gap-xs">
                      <div className="w-3 h-3 rounded-full bg-error-container" />
                      <div className="w-3 h-3 rounded-full bg-primary-container/50" />
                      <div className="w-3 h-3 rounded-full bg-tertiary-container/50" />
                    </div>
                    <span className="ml-md font-code text-code text-on-surface-variant">src/metrics/compute.ts</span>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px]">terminal</span>
                </div>
                {/* Code */}
                <div className="p-lg font-code text-code leading-[1.8]">
                  <p><span className="code-keyword">import</span> &#123; CarboniX &#125; <span className="code-keyword">from</span> <span className="code-string">&apos;carbonix&apos;</span>;</p>
                  <p><span className="code-comment">{`// Initialize real-time tracking`}</span></p>
                  <p><span className="code-keyword">const</span> analyzer = <span className="code-keyword">new</span> CarboniX(&#123;</p>
                  <p>&nbsp;&nbsp;apiKey: process.env.CX_KEY,</p>
                  <p>&nbsp;&nbsp;strictMode: <span className="code-keyword">true</span></p>
                  <p>&#125;);</p>
                  <br />
                  <p><span className="code-keyword">const</span> metrics = <span className="code-keyword">await</span> analyzer.checkCarbon(&#123;</p>
                  <p>&nbsp;&nbsp;instances: [<span className="code-string">&apos;p3.2xlarge&apos;</span>, <span className="code-string">&apos;p3.2xlarge&apos;</span>],</p>
                  <p>&nbsp;&nbsp;region: <span className="code-string">&apos;ap-south-1&apos;</span>,</p>
                  <p>&nbsp;&nbsp;runtime_hours: <span className="code-keyword">24</span></p>
                  <p>&#125;);</p>
                  <br />
                  <p>console.log(<span className="code-string">`CO2 Projection: $&#123;metrics.totalKg&#125;kg`</span>);</p>
                </div>
              </div>
            </div>

            {/* Right panel */}
            <div className="lg:col-span-5 space-y-lg">
              <h2 className="font-display text-headline mb-md leading-tight text-on-surface">
                Predictive <span className="text-primary-container">Observability</span>
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Don&apos;t wait for the monthly bill to see your impact. Predict carbon intensity
                based on instance type and region grid-mix before you hit deploy.
              </p>
              <div className="bg-surface p-lg rounded-xl border border-outline-variant space-y-md">
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
          </div>
        </section>

        {/* ── Regional Carbon Intensity ─────────────────────── */}
        <section id="network" className="px-margin py-3xl max-w-[1440px] mx-auto">
          <h2 className="font-display text-headline text-center mb-2xl text-on-surface">Regional Carbon Intensity</h2>
          <RegionsTable />
        </section>

        {/* ── Automated Carbon Gates ───────────────────────── */}
        <section className="px-margin py-3xl">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-3xl items-center">
            <div>
              <h2 className="font-display text-headline mb-lg text-on-surface">
                Automated <span className="text-primary-container">Carbon Gates</span>
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl">
                Treat carbon like a security vulnerability. Set hard limits in your CI
                pipeline and block deployments that exceed your team&apos;s environmental
                budget.
              </p>
              <ul className="space-y-md">
                {[
                  'Prevent "Dirty" Region drift in production.',
                  'Auto-suggest cleaner instance alternatives in PRs.',
                  'Standardize reporting for CSRD compliance.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-md">
                    <span className="material-symbols-outlined text-primary-container mt-1">check_circle</span>
                    <span className="font-body-md text-on-surface">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* PR mockup */}
            <div>
              <div className="bg-surface-container border border-outline-variant rounded-xl shadow-2xl overflow-hidden">
                <div className="bg-surface-container-high px-lg py-md border-b border-outline-variant flex items-center justify-between">
                  <div className="flex items-center gap-md">
                    <span className="material-symbols-outlined text-on-surface-variant">merge</span>
                    <span className="font-display font-bold text-on-surface">PR #482: Scale search API</span>
                  </div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant">OPEN</span>
                </div>
                <div className="p-lg space-y-lg">
                  <div className="flex items-center gap-md">
                    <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden flex-shrink-0">
                      <img
                        alt="carbonix-bot avatar"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHBMUCk_ZRK2aSBvKXV-uZEbAsq8vK7kLRKC3B7s0o5XPWvKa3r_hFPrncQW5QQ-Z712MOs-1a6FXnkVfmwY_XK4fVJsnas8aBbiNta2oF6uoERf9cAhtEePJCCW2beQCQFWgpTWiJeK8aHnaO8ube4Y7xykgsdVG1f0bAOAwp5RuflwHwOxp48MYUW8zxnelmr4O34DlW03U06Hc9PhiuyhIsFuWajR-VsjOhrLwRA8RBoSjMV0JswYY9y4dVGb7yWuS6MdfZvugf"
                      />
                    </div>
                    <p className="font-body-md text-on-surface-variant">
                      <span className="text-on-surface font-bold">carbonix-bot</span> commented 14 mins ago
                    </p>
                  </div>
                  <div className="bg-surface p-lg rounded-lg border-l-4 border-error space-y-md">
                    <div className="flex items-center gap-md">
                      <span className="material-symbols-outlined text-error">dangerous</span>
                      <h4 className="font-display font-bold text-on-surface">Carbon Budget Exceeded</h4>
                    </div>
                    <p className="font-body-md text-on-surface-variant">
                      This PR increases the infrastructure carbon footprint by{' '}
                      <span className="text-error font-bold">+12.4kg / month</span>.
                    </p>
                    <div className="grid grid-cols-2 gap-md">
                      <div className="p-md bg-surface-container-highest rounded border border-outline-variant">
                        <p className="text-[10px] font-label-caps text-on-surface-variant mb-xs">LIMIT</p>
                        <p className="font-code text-on-surface">5.0 kg</p>
                      </div>
                      <div className="p-md bg-surface-container-highest rounded border border-outline-variant">
                        <p className="text-[10px] font-label-caps text-on-surface-variant mb-xs">ESTIMATED</p>
                        <p className="font-code text-error">17.4 kg</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-md bg-primary-container/10 p-md rounded border border-primary-container/30">
                      <span className="material-symbols-outlined text-primary-container text-[20px]">lightbulb</span>
                      <p className="text-[12px] text-on-surface">
                        Recommendation: Use <strong>Graviton3</strong> (t4g) instances to reduce impact by 40%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ── Documentation ─────────────────────────────────── */}
        <section id="docs" className="px-margin py-3xl max-w-[1440px] mx-auto">
          <div className="text-center mb-2xl">
            <h2 className="font-display text-headline mb-md text-on-surface">Documentation</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[600px] mx-auto">
              Everything you need to integrate CarboniX into your tech stack.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl">
            {/* Quick Start */}
            <div className="bg-surface-container border border-outline-variant rounded-xl p-xl">
              <div className="flex items-center gap-md mb-lg">
                <span className="material-symbols-outlined text-primary text-[28px]">rocket_launch</span>
                <h3 className="font-display text-section-header text-on-surface">Quick Start</h3>
              </div>
              <p className="font-body-md text-on-surface-variant mb-lg">
                Get up and running with the CarboniX SDK in Node.js or TypeScript projects.
              </p>
              <div className="bg-surface-container-lowest p-md rounded border border-outline-variant font-code text-code text-on-surface-variant space-y-sm">
                <p><span className="code-keyword">npm</span> install carbonix</p>
                <div className="h-px bg-outline-variant/50 my-sm"></div>
                <p><span className="code-keyword">import</span> &#123; CarboniX &#125; <span className="code-keyword">from</span> <span className="code-string">&apos;carbonix&apos;</span>;</p>
                <p><span className="code-keyword">const</span> cx = <span className="code-keyword">new</span> CarboniX(&#123; apiKey: <span className="code-string">&apos;YOUR_KEY&apos;</span> &#125;);</p>
                <p><span className="code-keyword">await</span> cx.measure(<span className="code-string">&apos;compute-job-1&apos;</span>);</p>
              </div>
            </div>

            {/* REST API */}
            <div className="bg-surface-container border border-outline-variant rounded-xl p-xl">
              <div className="flex items-center gap-md mb-lg">
                <span className="material-symbols-outlined text-primary text-[28px]">api</span>
                <h3 className="font-display text-section-header text-on-surface">REST API Reference</h3>
              </div>
              <p className="font-body-md text-on-surface-variant mb-lg">
                Directly query regional carbon intensity and build custom integrations using our HTTP endpoints.
              </p>
              <div className="bg-surface-container-lowest p-md rounded border border-outline-variant font-code text-code text-on-surface-variant space-y-sm">
                <div className="flex items-center gap-sm">
                  <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-[10px] font-bold">GET</span>
                  <span className="text-on-surface">/api/v1/reference/regions</span>
                </div>
                <div className="flex items-center gap-sm">
                  <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-[10px] font-bold">POST</span>
                  <span className="text-on-surface">/api/v1/carbon/measure</span>
                </div>
                <p className="text-[12px] text-on-surface-variant italic mt-sm">Requires Authorization: Bearer &lt;token&gt;</p>
              </div>
            </div>
            
            {/* CI/CD Integration */}
            <div className="bg-surface-container border border-outline-variant rounded-xl p-xl">
              <div className="flex items-center gap-md mb-lg">
                <span className="material-symbols-outlined text-primary text-[28px]">account_tree</span>
                <h3 className="font-display text-section-header text-on-surface">CI/CD Gating</h3>
              </div>
              <p className="font-body-md text-on-surface-variant mb-lg">
                Block deployments that exceed your carbon budget using GitHub Actions.
              </p>
              <div className="bg-surface-container-lowest p-md rounded border border-outline-variant font-code text-code text-on-surface-variant space-y-sm">
                <p className="text-primary-container">- name: <span className="text-on-surface">Check Carbon Budget</span></p>
                <p>&nbsp;&nbsp;uses: <span className="text-on-surface">carbonix/action@v1</span></p>
                <p>&nbsp;&nbsp;with:</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;max-emissions: <span className="text-on-surface">5.0kg</span></p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;api-key: <span className="text-on-surface">$&#123;&#123; secrets.CARBONIX_KEY &#125;&#125;</span></p>
              </div>
            </div>

            {/* Support */}
            <div className="bg-surface-container border border-outline-variant rounded-xl p-xl flex flex-col justify-center items-center text-center">
              <span className="material-symbols-outlined text-outline text-[48px] mb-md">help</span>
              <h3 className="font-display text-section-header text-on-surface mb-sm">Need Help?</h3>
              <p className="font-body-md text-on-surface-variant mb-lg">
                Can&apos;t find what you&apos;re looking for? Reach out to our engineering team.
              </p>
              <button className="bg-primary text-on-primary px-xl py-sm rounded-full font-bold hover:bg-primary-fixed-dim transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </section>
      </main>

      <AnimatedFooter />
    </div>
  );
}
