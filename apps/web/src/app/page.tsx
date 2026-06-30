import type { Metadata } from 'next';
import Link from 'next/link';
import { NewsletterForm } from './components/NewsletterForm';
import { RegionsTable } from './components/RegionsTable';
import { auth } from '@/auth';
import { SignOutButton } from './components/SignOutButton';

export const metadata: Metadata = {
  title: 'Carbonix | The Carbon Cost of Your Cloud',
  description:
    'Quantify, monitor, and gate your infrastructure\'s environmental impact directly in the IDE and CI/CD pipelines. Industrial-grade carbon intelligence for modern dev teams.',
};

export default async function LandingPage() {
  const session = await auth();

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden selection:bg-primary-container selection:text-on-primary-fixed">
      {/* ── Navigation ──────────────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant">
        <div className="flex justify-between items-center px-margin py-md max-w-[1440px] mx-auto">
          <div className="flex items-center gap-xl">
            <div className="flex items-center gap-sm">
              <img src="/carbonix-logo.png" alt="Carbonix" className="w-8 h-8 object-contain" />
              <span className="text-section-header font-display font-black text-primary-container">
                Carbonix
              </span>
            </div>
            <div className="hidden md:flex gap-lg">
              <a href="#platform" className="text-primary font-bold border-b-2 border-primary pb-1 font-body-md transition-colors">Platform</a>
              <a href="#solutions" className="text-on-surface-variant hover:text-primary transition-colors font-body-md">Solutions</a>
              <a href="#network"   className="text-on-surface-variant hover:text-primary transition-colors font-body-md">Network</a>
              <a href="#docs"      className="text-on-surface-variant hover:text-primary transition-colors font-body-md">Documentation</a>
            </div>
          </div>
          <div className="flex items-center gap-md">
            <div className="hidden lg:flex items-center bg-surface-container-high px-md py-xs rounded-full border border-outline-variant">
              <span className="font-code text-code text-on-surface-variant mr-sm">$</span>
              <span className="font-code text-code text-primary-container">npm install carbonix</span>
            </div>
            {session ? (
              <>
                <SignOutButton />
                <Link
                  href="/admin/dashboard"
                  className="bg-primary-container text-on-primary-fixed px-lg py-sm rounded-lg font-bold hover:opacity-80 active:scale-95 transition-all"
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="text-on-surface-variant hover:text-primary transition-colors font-body-md">
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="bg-primary-container text-on-primary-fixed px-lg py-sm rounded-lg font-bold hover:opacity-80 active:scale-95 transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="pt-[80px]">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section id="platform" className="relative overflow-hidden min-h-[90vh] flex items-center px-margin py-3xl max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3xl items-center relative z-10 w-full">
            {/* Left col */}
            <div>
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
              <div className="flex gap-md flex-wrap">
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
              <div className="mt-2xl flex items-center gap-md">
                <div className="flex -space-x-md">
                  {[
                    { alt: 'Tech lead developer', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4jMT2-ooSLzuF_hoM9A5mIrK3iTDFHWmQP5S1Fz1IWMmdxc2K0OfQgLmbo2LTmN4wtWcjldNXymrrcCOEK44WFpQG-jvWpUnjtvaH8HsMa7VA9dH8JHV52-gQLO6I4p4yx7OKYUIaNUe_0mp1iSWSyip6-L4ImlXa5oBS8eJ9NkPgcLXl12ZoWWSK8ZSpckx_2EF8YkO-Ngc4dg8aba4FueJOZkHm4slujdr9vPEPXyGiX4zQfyl6JUzrkzVS-O9MhIPOj6MQOILX' },
                    { alt: 'Software engineer', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxefuangvR__vyb_zSePz_wRj2hfv1h7wFgYh0SKVokmlo1lA3zjyTawtZf4_yzYYnHIkBVWlGE2PXBCakT3vKO2rdmisu_mg7VvXeamCbIG7_s0gsh_rRRDN5Z3gyNubmUz194W8DmM9qqZ8PJ-Ig4J3dVhKNlx-EDszm8paJ7vo-XN-Hf_VTCMlqVFIfnACDlCM2lQNJzwUDgKBJnjSu8ZZghhceeiV7qXKxQAGiWHuiaor0Un1kWe0w6N-9FA-ZTDlh3qVbkP-K' },
                    { alt: 'Diverse developer', src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT3VM2L89yEVmobwjMnQiKo2z-R04gYhpngs8b_a1o0Ixod5SrbRxJPKjX_SOhBGewT0HllYPRFFG0DtOKPwWTKjkq4stJJS52WtadTFLAEuNOjBi_QExugbcjgy9GkgySbJo8xoJN5JRGs91SS33aRaCf6TOQ8QrkPirUinQpagqAGA5dV8YlkaZfUGRmic2fFwcy0EiH-qehEFIEsqLcOGALl1ItpXQ0_F7KdXtBBacEgSiPfvPeQNFeYKqn-f_rYOxKjSA74Yfx' },
                  ].map((a) => (
                    <div
                      key={a.alt}
                      className="w-10 h-10 rounded-full border-2 border-background bg-surface-container-highest flex items-center justify-center overflow-hidden"
                    >
                      <img src={a.src} alt={a.alt} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <p className="text-on-surface-variant font-body-md">
                  <span className="text-on-surface font-bold">2,400+</span> engineering teams
                  monitoring carbon intensity
                </p>
              </div>
            </div>

            {/* Right col — phone mockup */}
            <div className="relative flex justify-center items-center h-full">
              <div
                className="absolute inset-0 -z-10"
                style={{ background: 'radial-gradient(circle at 99.7% 8%, rgba(245,197,24,0.15) 0%, transparent 70%)' }}
              />
              <div className="relative w-[320px] aspect-[1/2] rounded-[48px] border-[8px] border-surface-container-highest bg-background overflow-hidden shadow-2xl">
                <img
                  alt="Carbonix App UI"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiTM61uvx1ZjhbXPi3GkqxhZnNvbeI4LlEyXwR1dlc-OUVnK1dhxhFQu1OE2QpXYP8IoAIPBCCIH5fz4nRNFDUuQhcXLRly0Sagzd5_FVB2aZQwCjWImQ-hINGnvOGXno1G_m0pWNFSb7h-LfMAF4KXS_aciKqIO0l4p8WFMaMYS4rSKDPbsU0ELL3Nw3AVVhjOBvSVfoosFbgEc8Tb6cekCM1NmUqaACFmYWsQ0EBEEekrgXVP1xAucUfRbhcas6Hp8s22NDOSkjv"
                />
              </div>
              {/* Floating card — CO2 */}
              <div className="absolute bottom-[20%] -left-12 glass-panel p-lg rounded-xl shadow-xl w-48 animate-pulse">
                <div className="flex items-center gap-sm mb-sm text-primary-container">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>eco</span>
                  <span className="font-label-caps text-label-caps">OPTIMIZED</span>
                </div>
                <div className="text-[24px] leading-none mb-xs font-black text-primary-container font-display">
                  0.65<span className="text-[12px] ml-1 text-on-surface font-normal">kg</span>
                </div>
                <div className="text-on-surface-variant font-label-caps text-[10px]">STOCKHOLM REGION (LOW)</div>
              </div>
              {/* Floating card — CI/CD gate */}
              <div className="absolute -bottom-8 right-0 glass-panel px-lg py-md rounded-lg shadow-xl border border-primary-container/30 flex items-center gap-md">
                <span className="material-symbols-outlined text-primary-container">lock</span>
                <div>
                  <p className="font-label-caps text-[11px] leading-tight text-on-surface">CI/CD GATE</p>
                  <p className="font-code text-[11px] text-primary-container">Build Passed: Impact &lt; 50kg</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Problem Strip (marquee) ──────────────────────── */}
        <section className="bg-surface-container-lowest border-y border-outline-variant py-md overflow-hidden flex items-center">
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
                desc: 'Add Carbonix to your project via npm, pip, or go get.',
                code: (
                  <p className="font-code text-code text-on-surface-variant">
                    <span className="code-keyword">npm</span> i @carbonix/core
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
                    <span className="code-keyword">carbonix</span>.init(&#123;<br />
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
        <section className="px-margin py-3xl bg-surface-container-lowest border-y border-outline-variant">
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
                  <p><span className="code-keyword">import</span> &#123; Carbonix &#125; <span className="code-keyword">from</span> <span className="code-string">&apos;@carbonix/sdk&apos;</span>;</p>
                  <p><span className="code-comment">{`// Initialize real-time tracking`}</span></p>
                  <p><span className="code-keyword">const</span> analyzer = <span className="code-keyword">new</span> Carbonix(&#123;</p>
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
        <section className="px-margin py-3xl bg-surface">
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
      </main>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant py-3xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin max-w-[1440px] mx-auto">
          {/* Brand */}
          <div className="space-y-lg">
            <span className="text-section-header font-display font-black text-primary-container">Carbonix</span>
            <p className="text-on-surface-variant font-body-md pr-lg">
              Standardizing the environmental impact of software engineering. High-performance
              intelligence for a sustainable cloud.
            </p>
            <div className="flex gap-md">
              {[
                { icon: 'alternate_email', label: 'Email' },
                { icon: 'hub',            label: 'GitHub' },
                { icon: 'forum',          label: 'Discord' },
              ].map((s) => (
                <a
                  key={s.icon}
                  href="#"
                  aria-label={s.label}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container border border-outline-variant text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="font-label-caps text-label-caps text-on-surface mb-xl">PRODUCT</h4>
            <ul className="space-y-md">
              {['Core SDK', 'CI/CD Gating', 'Regional Explorer', 'Compliance Engine'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-on-surface-variant hover:text-primary transition-colors font-body-md">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h4 className="font-label-caps text-label-caps text-on-surface mb-xl">RESOURCES</h4>
            <ul className="space-y-md">
              {['Documentation', 'API Reference', 'Case Studies', 'Carbon Blog'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-on-surface-variant hover:text-primary transition-colors font-body-md">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust + newsletter */}
          <div className="space-y-xl">
            <div>
              <h4 className="font-label-caps text-label-caps text-on-surface mb-xl">TRUST</h4>
              <ul className="space-y-md">
                {['Privacy Policy', 'Terms of Service', 'Security (SOC2)', 'Status'].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-on-surface-variant hover:text-primary transition-colors font-body-md">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-lg bg-surface-container rounded-lg border border-outline-variant">
              <p className="font-label-caps text-[10px] text-on-surface-variant mb-sm">NEWSLETTER</p>
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-3xl pt-xl border-t border-outline-variant px-margin max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-md">
          <p className="text-on-surface-variant font-body-md text-[14px]">
            © 2024 Carbonix Cloud Intelligence. All rights reserved.
          </p>
          <div className="flex items-center gap-md">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
            <span className="font-label-caps text-[12px] text-on-surface-variant">SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
