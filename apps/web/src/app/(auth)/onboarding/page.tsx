"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Step1Project } from './Step1Project';
import { Step2Deploy } from './Step2Deploy';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [apiKey, setApiKey] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectRegion, setProjectRegion] = useState('');
  const router = useRouter();
  const { update } = useSession();

  const handleSkip = async () => {
    await update({ isOnboarded: true });
    router.refresh();
    router.push('/admin/dashboard');
  };

  const handleStep1Next = (key: string, name: string, region: string) => {
    setApiKey(key);
    setProjectName(name);
    setProjectRegion(region);
    setStep(2);
  };

  const handleStep2Next = async () => {
    await update({ isOnboarded: true });
    router.refresh();
    router.push('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col pt-16 px-4">
      {/* Top Header / Progress Indicator */}
      <div className="w-full max-w-2xl mx-auto mb-12 flex items-center gap-4">
        <div className={`flex items-center gap-3 transition-colors ${step >= 1 ? 'text-on-surface' : 'text-on-surface-variant'}`}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${step >= 1 ? 'bg-secondary text-surface' : 'bg-surface-container border border-outline-variant'}`}>1</div>
          <span className="font-semibold text-sm">Setup Project</span>
        </div>
        <div className="flex-1 h-px bg-outline-variant"></div>
        <div className={`flex items-center gap-3 transition-colors ${step >= 2 ? 'text-on-surface' : 'text-on-surface-variant'}`}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${step >= 2 ? 'bg-secondary text-surface' : 'bg-surface-container border border-outline-variant'}`}>2</div>
          <span className="font-semibold text-sm">Deploy</span>
        </div>
      </div>

      <div className="flex-1">
        {step === 1 && (
          <Step1Project 
            onNext={handleStep1Next} 
            onSkip={handleSkip} 
          />
        )}
        {step === 2 && (
          <Step2Deploy 
            apiKey={apiKey} 
            projectName={projectName}
            projectRegion={projectRegion}
            onNext={handleStep2Next} 
            onSkip={handleSkip} 
          />
        )}
      </div>
    </div>
  );
}
