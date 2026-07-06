import React from 'react';
import { Navbar } from '../components/Navbar';
import { AnimatedFooter } from '../components/AnimatedFooter';
import { MagicDust } from '@/components/ui/magic-dust-shader';
import { auth } from '@/auth';

export const metadata = {
  title: 'Network | CarboniX',
  description: 'Explain the CarboniX global data network and grid intelligence.',
};

export default async function NetworkPage() {
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
            Global Grid <span className="text-primary-container">Network</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            CarboniX taps into real-time global energy grid telemetry. We track carbon intensity across 120+ regions worldwide, ensuring your emissions math is always precise and localized.
          </p>
        </section>

        {/* Feature Grid */}
        <section className="max-w-[1200px] w-full px-margin grid grid-cols-1 md:grid-cols-2 gap-xl mb-3xl">
          
          <div className="bg-surface-container/60 backdrop-blur-md p-xl rounded-xl border border-outline-variant/30 flex flex-col justify-center items-center text-center">
            <span className="material-symbols-outlined text-primary-container text-[64px] mb-md opacity-80">public</span>
            <h3 className="font-display text-section-header text-on-surface mb-sm">120+ Power Grids</h3>
            <p className="text-on-surface-variant font-body-sm max-w-[400px]">
              We interface directly with grid operators (like ENTSO-E in Europe and EIA in the US) to pull live carbon intensity metrics, ensuring that a server running in Frankfurt is scored differently than one in Sydney.
            </p>
          </div>

          <div className="bg-surface-container/60 backdrop-blur-md p-xl rounded-xl border border-outline-variant/30 flex flex-col justify-center items-center text-center">
            <span className="material-symbols-outlined text-primary-container text-[64px] mb-md opacity-80">bolt</span>
            <h3 className="font-display text-section-header text-on-surface mb-sm">Edge Calculation</h3>
            <p className="text-on-surface-variant font-body-sm max-w-[400px]">
              Our Core Engine relies on Edge-based calculations. We cache the localized grid factors directly at the edge, guaranteeing sub-50ms latency when your CI/CD GateAgent pings our network to verify a deployment.
            </p>
          </div>

          <div className="bg-surface-container/60 backdrop-blur-md p-xl rounded-xl border border-outline-variant/30 md:col-span-2 flex flex-col justify-center items-center text-center">
            <h3 className="font-display text-section-header text-on-surface mb-sm">The CarboniX API</h3>
            <p className="text-on-surface-variant font-body-sm max-w-[600px] mb-lg">
              Don't just rely on our dashboard. Build your own carbon-aware applications by hooking directly into the CarboniX global network via our high-throughput REST API.
            </p>
            <div className="bg-black/50 p-md rounded-lg border border-outline-variant/30 font-code text-code text-primary text-left w-full max-w-[500px]">
              <p className="text-on-surface-variant mb-2"># Fetch current carbon intensity for AWS us-east-1</p>
              <p>curl -X GET https://api.carbonix.io/v1/reference/regions/us-east-1 \</p>
              <p className="pl-4">-H "Authorization: Bearer YOUR_API_KEY"</p>
            </div>
          </div>

        </section>

      </main>

      <AnimatedFooter />
    </div>
  );
}
