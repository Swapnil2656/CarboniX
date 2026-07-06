import React from 'react';
import { Navbar } from '../components/Navbar';
import { AnimatedFooter } from '../components/AnimatedFooter';
import { MagicDust } from '@/components/ui/magic-dust-shader';
import { auth } from '@/auth';

export const metadata = {
  title: 'Platform | CarboniX',
  description: 'Deep dive into the CarboniX Core Platform capabilities.',
};

export default async function PlatformPage() {
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
            The CarboniX <span className="text-primary-container">Platform</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            A comprehensive suite of tools built on top of our high-performance core engine. Monitor, optimize, and completely neutralize your infrastructure's digital footprint.
          </p>
        </section>

        {/* Feature Grid */}
        <section className="max-w-[1200px] w-full px-margin grid grid-cols-1 md:grid-cols-3 gap-xl mb-3xl">
          
          <div className="bg-surface-container/60 backdrop-blur-md p-xl rounded-xl border border-outline-variant/30 hover:border-primary-container/50 transition-colors">
            <span className="material-symbols-outlined text-primary-container text-[40px] mb-md">dashboard</span>
            <h3 className="font-display text-section-header text-on-surface mb-sm">Unified Dashboard</h3>
            <p className="text-on-surface-variant font-body-sm">
              Visualize your entire cloud footprint in real-time. Connect AWS, GCP, and Azure accounts to see a unified view of your carbon emissions down to the specific instance or microservice.
            </p>
          </div>

          <div className="bg-surface-container/60 backdrop-blur-md p-xl rounded-xl border border-outline-variant/30 hover:border-primary-container/50 transition-colors">
            <span className="material-symbols-outlined text-primary-container text-[40px] mb-md">memory</span>
            <h3 className="font-display text-section-header text-on-surface mb-sm">Telemetry Engine</h3>
            <p className="text-on-surface-variant font-body-sm">
              Our lightweight Collector agent sits in your clusters, gathering high-fidelity utilization data. It computes precise energy-to-carbon conversions based on localized power grid emission factors.
            </p>
          </div>

          <div className="bg-surface-container/60 backdrop-blur-md p-xl rounded-xl border border-outline-variant/30 hover:border-primary-container/50 transition-colors">
            <span className="material-symbols-outlined text-primary-container text-[40px] mb-md">insights</span>
            <h3 className="font-display text-section-header text-on-surface mb-sm">Smart Analytics</h3>
            <p className="text-on-surface-variant font-body-sm">
              Translate abstract CO2e grams into relatable business metrics. Our AI Analyst consumes telemetry to identify inefficiencies and automatically generate optimization recommendations.
            </p>
          </div>

        </section>

      </main>

      <AnimatedFooter />
    </div>
  );
}
