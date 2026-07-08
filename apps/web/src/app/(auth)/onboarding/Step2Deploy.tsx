"use client";

import React, { useState } from 'react';

type Props = {
  apiKey: string;
  projectName: string;
  projectRegion: string;
  onNext: () => void;
  onSkip: () => void;
};

export function Step2Deploy({ apiKey, projectName, projectRegion, onNext, onSkip }: Props) {
  const [copied, setCopied] = useState(false);

  const promptText = `Please integrate CarboniX into this codebase to enable intelligent carbon tracking and deployment gating.

Follow these steps:
1. Initialize the CarboniX CLI by running:
   \`npx @carbonix/cli init --key ${apiKey}\`

2. Deploy the application to CarboniX by running:
   \`npx @carbonix/cli app deploy --project proj_${apiKey.slice(4) || "default"}\`

Project Details for the CLI:
- Name: "${projectName}"
- Target Region: "${projectRegion}"

3. Codebase Integration:
   - Scan our infrastructure and deployment scripts (e.g., GitHub Actions, Terraform, Docker).
   - Hook up the CarboniX SDK or CLI to intercept deployments.
   - Configure the application to route its metrics to CarboniX telemetry so we can track carbon intensity and cost savings.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center space-x-2 text-amber-500 dark:text-primary mb-4 font-label-caps text-xs">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>GET STARTED</span>
        </div>
        <h2 className="text-3xl font-display font-semibold text-on-surface mb-2">
          How would you like to start?
        </h2>
        <p className="text-on-surface-variant font-body-md">
          Your project is ready. Deploy from your machine using our CLI.
        </p>
      </div>

      {/* Local Deploy Option */}
      <div className="border border-outline-variant rounded-xl bg-surface-container p-6">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center flex-shrink-0 text-on-surface font-code text-xs">
            {'>_'}
          </div>
          <div className="flex-1 w-full">
            <h3 className="text-lg font-semibold text-on-surface mb-4">Deploy from your machine</h3>
            
            <div className="mb-4">
              <p className="text-[10px] text-on-surface-variant font-label-caps mb-2 uppercase">USE YOUR AI AGENT</p>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🤖</span>
                  <div>
                    <div className="text-sm font-semibold text-on-surface">Copy the deploy prompt</div>
                    <div className="text-xs text-on-surface-variant">Paste it into Claude Code, Cursor, or any agent.</div>
                  </div>
                </div>
                <button 
                  onClick={handleCopy}
                  className="bg-surface-container-high hover:bg-surface-container-highest text-on-surface px-4 py-2 rounded text-xs font-semibold transition-colors border border-outline-variant"
                >
                  {copied ? 'Copied!' : 'Copy prompt'}
                </button>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-[10px] text-on-surface-variant font-label-caps mb-2 uppercase">OR RUN IT YOURSELF</p>
              <div className="w-full mt-4 bg-surface-container-highest rounded p-4 overflow-x-auto relative group">
                <code className="text-amber-500 dark:text-primary font-code text-sm block">
                  <span className="text-on-surface-variant">$</span> npx @carbonix/cli init --key <br />
                  <span className="pl-4 text-on-surface">{apiKey}</span>
                </code>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(`npx @carbonix/cli init --key ${apiKey}`);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="absolute right-3 top-3 p-2 rounded-md bg-surface-container-highest opacity-0 group-hover:opacity-100 transition-opacity hover:bg-surface-elevated text-on-surface"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-outline-variant pt-6 mt-4">
              <p className="text-sm text-on-surface-variant">After your first deploy, continue from the dashboard.</p>
              <button onClick={onNext} className="bg-amber-500 hover:bg-amber-600 dark:bg-primary dark:hover:bg-primary-container text-white dark:text-on-primary-fixed px-6 py-2.5 rounded-lg font-bold text-sm transition-all shadow-md hover:shadow-lg">
                Go to dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button 
          onClick={onSkip}
          className="text-on-surface-variant hover:text-on-surface text-xs transition-colors flex items-center gap-1"
        >
          Skip for now — just look around the dashboard
        </button>
      </div>
    </div>
  );
}
