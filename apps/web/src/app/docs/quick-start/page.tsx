import React from 'react';

export const metadata = {
  title: 'Quick Start | CarboniX',
  description: 'Get up and running with CarboniX in under 5 minutes.',
};

export default function QuickStartPage() {
  return (
    <>
      <h1 className="text-headline mb-md">Quick Start Guide</h1>
      <p className="font-body-lg text-body-lg mb-xl">
        Get up and running with CarboniX in under 5 minutes. Learn how to install the SDK, obtain your API keys, and start tracking your infrastructure&apos;s carbon footprint immediately.
      </p>

      <h2 className="text-section-header mt-3xl mb-md border-t border-outline-variant/30 pt-xl">1. Obtain API Credentials</h2>
      <p className="mb-md">
        Before you can use the CarboniX SDK or the GateAgent, you need an API key to authenticate your requests against the orchestration layer.
      </p>
      <ul className="list-decimal pl-md space-y-xs mb-xl">
        <li>Log into the CarboniX Dashboard.</li>
        <li>Navigate to <strong>Settings</strong> &gt; <strong>API Keys</strong> in the sidebar.</li>
        <li>Click <strong>Generate New Key</strong>.</li>
        <li>Copy the resulting token. <em>(Note: It will only be shown once!)</em></li>
      </ul>

      <h2 className="text-section-header mt-3xl mb-md border-t border-outline-variant/30 pt-xl">2. Install the SDK</h2>
      <p className="mb-md">
        The core CarboniX library is available on npm. It is a lightweight, zero-dependency package built in TypeScript.
      </p>
      
      <div className="bg-black/50 border border-outline-variant/30 rounded-lg p-md mb-xl overflow-x-auto">
        <pre className="text-sm font-mono text-primary-container">
          <code>npm install @carbonix/core</code>
        </pre>
      </div>

      <h2 className="text-section-header mt-3xl mb-md border-t border-outline-variant/30 pt-xl">3. Initialize the Client</h2>
      <p className="mb-md">
        Import the client into your application and initialize it with your API key. By default, it will batch telemetry data and sync it to the CarboniX cloud every 60 seconds.
      </p>

      <div className="bg-black/50 border border-outline-variant/30 rounded-lg p-md mb-xl overflow-x-auto">
        <pre className="text-sm font-mono text-gray-300">
          <code className="block"><span className="text-purple-400">import</span> {'{'} CarbonixClient {'}'} <span className="text-purple-400">from</span> <span className="text-green-400">'@carbonix/core'</span>;</code>
          <code className="block mt-4"><span className="text-purple-400">const</span> carbonix = <span className="text-purple-400">new</span> <span className="text-yellow-200">CarbonixClient</span>({'{'}</code>
          <code className="block">  apiKey: process.env.CARBONIX_API_KEY,</code>
          <code className="block">  region: <span className="text-green-400">'us-east-1'</span>,</code>
          <code className="block">  environment: <span className="text-green-400">'production'</span></code>
          <code className="block">{'}'});</code>
        </pre>
      </div>

      <h2 className="text-section-header mt-3xl mb-md border-t border-outline-variant/30 pt-xl">4. Track an Operation</h2>
      <p className="mb-md">
        You can wrap any expensive compute operation in the `track()` method to measure its energy usage and carbon emissions.
      </p>

      <div className="bg-black/50 border border-outline-variant/30 rounded-lg p-md mb-xl overflow-x-auto">
        <pre className="text-sm font-mono text-gray-300">
          <code className="block"><span className="text-purple-400">await</span> carbonix.<span className="text-blue-300">track</span>(<span className="text-green-400">'data-processing-job'</span>, <span className="text-purple-400">async</span> () ={'>'} {'{'}</code>
          <code className="block">  <span className="text-gray-500">// Your heavy workload here...</span></code>
          <code className="block">  <span className="text-purple-400">await</span> <span className="text-blue-300">processData</span>(largeDataset);</code>
          <code className="block">{'}'});</code>
        </pre>
      </div>

      <p className="mb-md text-sm text-on-surface-variant">
        <em>Success! You are now tracking the carbon footprint of your application. Check your dashboard to view the real-time analytics.</em>
      </p>
    </>
  );
}
