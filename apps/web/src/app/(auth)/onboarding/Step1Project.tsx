"use client";

import React, { useState } from 'react';

type Props = {
  onNext: (apiKey: string, name: string) => void;
  onSkip: () => void;
};

export function Step1Project({ onNext, onSkip }: Props) {
  const [name, setName] = useState('Nimble Charcoal Kraken');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, skip: false })
      });
      const data = await res.json();
      if (data.success) {
        onNext(data.apiKey, name);
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = async () => {
    setLoading(true);
    try {
      await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skip: true })
      });
      onSkip();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto border border-outline-variant rounded-xl bg-surface-container-low p-8 shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-semibold text-on-surface mb-2">
          Get started with <span className="text-amber-500 dark:text-primary">CarboniX SDK</span>
        </h2>
        <p className="text-on-surface-variant font-body-sm">
          Create your first project, then choose how to connect and deploy. Our Agentic AI will automatically route your workloads to the greenest regions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-label-caps text-on-surface-variant mb-2">Project Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-md px-4 py-3 text-on-surface font-body-md focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:focus:border-primary dark:focus:ring-primary transition-colors"
            required
          />
          <p className="text-xs text-on-surface-variant mt-2 opacity-70">
            Need inspiration? How about <span className="underline cursor-pointer" onClick={() => setName('Emerald Frost Dragon')}>Emerald Frost Dragon</span>?
          </p>
        </div>



        <div className="pt-4 flex flex-col gap-4 items-center">
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 dark:bg-primary dark:hover:bg-primary-container text-white dark:text-on-primary-fixed font-semibold py-3 px-4 rounded-md transition-all font-body-md disabled:opacity-50"
          >
            {loading ? "Creating..." : "Continue"}
          </button>
          
          <button 
            type="button" 
            onClick={handleSkip}
            disabled={loading}
            className="text-on-surface-variant hover:text-on-surface text-sm underline transition-colors"
          >
            Skip setup for now
          </button>
        </div>
      </form>
    </div>
  );
}
