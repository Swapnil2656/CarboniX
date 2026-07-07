import React from 'react';

export const metadata = {
  title: 'SDK Reference | CarboniX',
  description: 'Detailed API reference for the CarboniX SDK.',
};

export default function SdkReferencePage() {
  return (
    <>
      <h1 className="text-headline mb-md">SDK Reference</h1>
      <p className="font-body-lg text-body-lg mb-xl">
        This document provides a detailed reference for the `@carbonix/core` TypeScript/Node.js SDK.
      </p>

      <h2 className="text-section-header mt-3xl mb-md border-t border-outline-variant/30 pt-xl">CarbonixClient</h2>
      <p className="mb-md">
        The main class for interacting with the CarboniX platform from your application.
      </p>

      <div className="bg-surface-container-low border border-outline-variant/30 rounded-xl overflow-hidden mb-xl">
        <div className="bg-black/50 p-4 font-mono text-sm border-b border-outline-variant/30">
          <span className="text-purple-400">new</span> <span className="text-yellow-200">CarbonixClient</span>(config: CarbonixConfig)
        </div>
        <div className="p-4">
          <h4 className="font-bold text-sm mb-2 text-on-surface">Parameters</h4>
          <ul className="list-disc pl-5 space-y-2 text-sm text-on-surface-variant">
            <li><code className="text-primary">config.apiKey</code> (string): Your project's API key.</li>
            <li><code className="text-primary">config.region</code> (string): The default AWS/GCP region your code is running in (e.g., `us-east-1`). This is crucial for accurate grid emission factors.</li>
            <li><code className="text-primary">config.environment</code> (string): `development`, `staging`, or `production`.</li>
          </ul>
        </div>
      </div>

      <h2 className="text-section-header mt-3xl mb-md border-t border-outline-variant/30 pt-xl">Methods</h2>

      <div className="space-y-lg">
        {/* track() */}
        <div className="border border-outline-variant/30 rounded-xl overflow-hidden">
          <div className="bg-black/50 p-4 font-mono text-sm border-b border-outline-variant/30 text-blue-300">
            track&lt;T&gt;(operationName: string, fn: () ={'>'} Promise&lt;T&gt;): Promise&lt;T&gt;
          </div>
          <div className="p-4 text-sm text-on-surface-variant space-y-4">
            <p>
              Wraps an asynchronous function and measures its execution time and resource utilization, then calculates the carbon emitted during its execution based on the initialized region's current grid intensity.
            </p>
            <div>
              <h5 className="font-bold text-on-surface mb-1">Returns</h5>
              <p>The result of the wrapped function `fn`.</p>
            </div>
          </div>
        </div>

        {/* getGridIntensity() */}
        <div className="border border-outline-variant/30 rounded-xl overflow-hidden">
          <div className="bg-black/50 p-4 font-mono text-sm border-b border-outline-variant/30 text-blue-300">
            getGridIntensity(region?: string): Promise&lt;GridIntensityResult&gt;
          </div>
          <div className="p-4 text-sm text-on-surface-variant space-y-4">
            <p>
              Fetches the real-time carbon intensity (gCO2eq/kWh) for the specified region (defaults to client's configured region). Useful for deferring heavy workloads until the grid is "green".
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
