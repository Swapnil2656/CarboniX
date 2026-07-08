'use client';

import React, { useState } from 'react';

interface SdkConnectionBannerProps {
  projectName: string;
  projectId: string;
  onDismiss?: () => void;
}

export function SdkConnectionBanner({ projectName, projectId, onDismiss }: SdkConnectionBannerProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [fullKey, setFullKey] = useState<string | null>(null);
  const [loadingKey, setLoadingKey] = useState(false);
  const [keyError, setKeyError] = useState<string | null>(null);

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const fetchFullKey = async () => {
    setLoadingKey(true);
    setKeyError(null);
    try {
      const res = await fetch(`/api/projects/${projectId}/reveal-key`, { method: 'POST' });
      const data = await res.json();
      if (data.success && data.apiKey) {
        setFullKey(data.apiKey);
      } else {
        setKeyError(data.error || 'Failed to retrieve key.');
      }
    } catch {
      setKeyError('Network error. Please try again.');
    } finally {
      setLoadingKey(false);
    }
  };

  const initCmd = fullKey
    ? `npx @carbonix/cli init --key ${fullKey}`
    : null;

  return (
    <div className="w-full rounded-xl border border-amber-500/30 bg-amber-500/5 p-5 mb-2">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <span className="w-3 h-3 rounded-full bg-amber-500 block" />
            <span className="w-3 h-3 rounded-full bg-amber-500 absolute inset-0 animate-ping opacity-60" />
          </div>
          <div>
            <p className="font-semibold text-amber-400 text-sm">
              Waiting for SDK connection — <span className="font-normal text-on-surface-variant">{projectName}</span>
            </p>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Reveal your init command below, then run it in your project&apos;s root directory.
            </p>
          </div>
        </div>
        {onDismiss && (
          <button onClick={onDismiss} className="text-on-surface-variant hover:text-on-surface transition-colors flex-shrink-0">
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        )}
      </div>

      {/* Key reveal / init command area */}
      <div className="mt-4">
        {!fullKey ? (
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 bg-surface-container-highest rounded-lg px-4 py-3 font-code text-sm border border-outline-variant/50 text-on-surface-variant italic">
              <span className="text-on-surface-variant select-none">$</span>
              <span className="text-on-surface-variant/50">npx @carbonix/cli init --key ••••••••••••••••••••</span>
            </div>
            <button
              onClick={fetchFullKey}
              disabled={loadingKey}
              className="flex-shrink-0 flex items-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white px-4 py-3 rounded-lg font-semibold text-sm transition-all shadow-md"
            >
              <span className="material-symbols-outlined text-sm">
                {loadingKey ? 'hourglass_empty' : 'visibility'}
              </span>
              {loadingKey ? 'Loading...' : 'Reveal key'}
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-surface-container-highest rounded-lg px-4 py-3 font-code text-sm border border-amber-500/30">
            <span className="text-on-surface-variant select-none">$</span>
            <span className="flex-1 text-amber-400 break-all">{initCmd}</span>
            <button
              onClick={() => copy(initCmd!, 'init')}
              className="flex-shrink-0 flex items-center gap-1.5 text-xs text-on-surface-variant hover:text-on-surface transition-colors bg-surface-container px-2.5 py-1 rounded-md border border-outline-variant"
            >
              <span className="material-symbols-outlined text-sm">
                {copied === 'init' ? 'check' : 'content_copy'}
              </span>
              {copied === 'init' ? 'Copied!' : 'Copy'}
            </button>
          </div>
        )}

        {keyError && (
          <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">error</span>
            {keyError}
          </p>
        )}

        {fullKey && (
          <p className="mt-2 text-xs text-amber-500/70 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">info</span>
            This key was regenerated — your previous key has been revoked. Store this safely.
          </p>
        )}
      </div>

      {/* Expandable how-to */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 flex items-center gap-1 text-xs text-on-surface-variant hover:text-amber-400 transition-colors"
      >
        <span className="material-symbols-outlined text-sm">
          {expanded ? 'expand_less' : 'expand_more'}
        </span>
        {expanded ? 'Hide' : 'How does this work?'}
      </button>

      {expanded && (
        <div className="mt-4 space-y-4 border-t border-outline-variant/50 pt-4">
          <p className="text-xs text-on-surface-variant">
            CarboniX connects to your codebase via the CLI + SDK. Once connected, the Collector Agent tracks your
            real infrastructure emissions every hour.
          </p>

          {[
            {
              step: '1',
              label: 'Run the init command',
              cmd: fullKey ? `npx @carbonix/cli init --key ${fullKey}` : 'Click "Reveal key" above first',
              detail: 'Creates a carbonix.config.js in your project root and links it to this dashboard. No install needed — npx handles it.',
              disabled: !fullKey,
            },
            {
              step: '2',
              label: 'Deploy or run locally',
              cmd: null,
              detail: 'The config file is detected automatically. Your dashboard updates live within seconds of the CLI completing.',
            },
          ].map(({ step, label, cmd, detail, disabled }) => (
            <div key={step} className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xs font-bold text-amber-400 flex-shrink-0 mt-0.5">
                {step}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-on-surface">{label}</p>
                <p className="text-xs text-on-surface-variant mt-0.5">{detail}</p>
                {cmd && (
                  <div className={`mt-2 flex items-center gap-2 bg-surface-container-highest rounded-md px-3 py-2 font-code text-xs border border-outline-variant/50 ${disabled ? 'opacity-40' : ''}`}>
                    <span className="text-on-surface-variant select-none">$</span>
                    <span className="flex-1 text-amber-400 break-all">{cmd}</span>
                    {!disabled && (
                      <button
                        onClick={() => copy(cmd, `step-${step}`)}
                        className="text-on-surface-variant hover:text-on-surface transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">
                          {copied === `step-${step}` ? 'check' : 'content_copy'}
                        </span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="rounded-lg bg-surface-container border border-outline-variant/50 p-3 mt-2">
            <p className="text-xs font-semibold text-on-surface mb-1.5 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-amber-400">info</span>
              Accepted config files
            </p>
            <div className="flex flex-wrap gap-2">
              {['carbonix.config.js', 'carbonix.config.ts', 'carbonix.config.mjs', '.carbonixrc', '.carbonixrc.json'].map(f => (
                <code key={f} className="text-xs bg-surface-container-highest border border-outline-variant px-2 py-0.5 rounded text-amber-400">
                  {f}
                </code>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
