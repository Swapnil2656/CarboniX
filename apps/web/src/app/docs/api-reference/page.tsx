import React from 'react';

export const metadata = {
  title: 'API Reference | CarboniX',
  description: 'REST API documentation for the CarboniX platform.',
};

export default function ApiReferencePage() {
  return (
    <>
      <h1 className="text-headline mb-md">REST API Reference</h1>
      <p className="font-body-lg text-body-lg mb-xl">
        The CarboniX REST API allows you to programmatically ingest telemetry data, query historical emissions, and manage your account programmatically.
      </p>

      <div className="bg-primary/10 border border-primary/20 rounded-xl p-md mb-xl flex items-start gap-4">
        <span className="material-symbols-outlined text-primary mt-1">info</span>
        <div>
          <h4 className="font-bold text-primary-container">Base URL</h4>
          <p className="text-sm text-on-surface-variant">All API requests should be made to: <code className="bg-black/50 px-2 py-1 rounded text-white">https://api.carbonix.io/v1</code></p>
        </div>
      </div>

      <h2 className="text-section-header mt-3xl mb-md border-t border-outline-variant/30 pt-xl">Authentication</h2>
      <p className="mb-md">
        Authenticate your requests by including your API key in the `Authorization` header as a Bearer token.
      </p>
      
      <div className="bg-black/50 border border-outline-variant/30 rounded-lg p-md mb-xl overflow-x-auto">
        <pre className="text-sm font-mono text-gray-300">
          <code>Authorization: Bearer cx_live_YOUR_API_KEY_HERE</code>
        </pre>
      </div>

      <h2 className="text-section-header mt-3xl mb-md border-t border-outline-variant/30 pt-xl">Endpoints</h2>

      {/* Endpoint 1 */}
      <div className="border border-outline-variant/30 rounded-xl overflow-hidden mb-lg">
        <div className="bg-surface-container-low p-md flex items-center gap-3 border-b border-outline-variant/30">
          <span className="bg-blue-500/20 text-blue-400 font-bold px-3 py-1 rounded text-xs">POST</span>
          <code className="text-on-surface font-bold">/emissions/track</code>
        </div>
        <div className="p-md bg-surface-container-lowest">
          <p className="text-sm text-on-surface-variant mb-md">Submit raw telemetry data to calculate emissions.</p>
          
          <h5 className="text-xs font-bold text-on-surface mb-2 uppercase tracking-wider">Request Body</h5>
          <div className="bg-black/50 border border-outline-variant/30 rounded-lg p-md mb-md overflow-x-auto">
            <pre className="text-sm font-mono text-gray-300">
              <code className="block">{'{'}</code>
              <code className="block">  <span className="text-blue-300">"projectId"</span>: <span className="text-green-400">"proj_12345"</span>,</code>
              <code className="block">  <span className="text-blue-300">"resourceType"</span>: <span className="text-green-400">"compute"</span>,</code>
              <code className="block">  <span className="text-blue-300">"durationMs"</span>: <span className="text-yellow-200">4500</span>,</code>
              <code className="block">  <span className="text-blue-300">"cpuLoadPct"</span>: <span className="text-yellow-200">85.5</span>,</code>
              <code className="block">  <span className="text-blue-300">"region"</span>: <span className="text-green-400">"eu-central-1"</span></code>
              <code className="block">{'}'}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Endpoint 2 */}
      <div className="border border-outline-variant/30 rounded-xl overflow-hidden mb-lg">
        <div className="bg-surface-container-low p-md flex items-center gap-3 border-b border-outline-variant/30">
          <span className="bg-green-500/20 text-green-400 font-bold px-3 py-1 rounded text-xs">GET</span>
          <code className="text-on-surface font-bold">/analytics/summary</code>
        </div>
        <div className="p-md bg-surface-container-lowest">
          <p className="text-sm text-on-surface-variant mb-md">Retrieve an aggregated summary of your project's emissions over a time period.</p>
          
          <h5 className="text-xs font-bold text-on-surface mb-2 uppercase tracking-wider">Query Parameters</h5>
          <ul className="list-disc pl-md space-y-xs mb-md text-sm text-on-surface-variant">
            <li><code className="text-primary">projectId</code> (required): The ID of the project.</li>
            <li><code className="text-primary">startDate</code> (optional): ISO 8601 date string.</li>
            <li><code className="text-primary">endDate</code> (optional): ISO 8601 date string.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
