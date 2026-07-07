"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function UpgradePage() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Developer',
      description: 'For individuals exploring carbon monitoring.',
      price: '$0',
      period: 'forever',
      features: [
        '1 User limit',
        '7-day data retention',
        'Basic emission reports',
        'Community support',
      ],
      buttonText: 'Current Plan',
      buttonVariant: 'outline',
      highlighted: false,
    },
    {
      name: 'Team',
      description: 'For growing teams building sustainable apps.',
      price: isAnnual ? '$39' : '$49',
      period: 'per user / month',
      features: [
        'Unlimited users',
        '90-day data retention',
        'CI/CD Pipeline gating',
        'Full API access',
        'Priority email support',
      ],
      buttonText: 'Upgrade to Team',
      buttonVariant: 'primary',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      description: 'Advanced compliance and dedicated support.',
      price: 'Custom',
      period: 'annually',
      features: [
        'Unlimited data retention',
        'CSRD Compliance Engine',
        'SSO / SAML integration',
        'On-premise deployment options',
        'Dedicated success manager',
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'secondary',
      highlighted: false,
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      {/* Header Section */}
      <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-4xl font-display font-bold text-on-surface mb-4">
          Scale your sustainability
        </h1>
        <p className="text-on-surface-variant text-lg max-w-2xl mx-auto mb-8">
          Choose the right plan to monitor, optimize, and gate your infrastructure&apos;s carbon footprint.
        </p>
        
        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm font-medium ${!isAnnual ? 'text-on-surface' : 'text-on-surface-variant'}`}>Monthly</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-7 rounded-full bg-surface-container-highest border border-outline-variant relative transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background"
          >
            <div className={`w-5 h-5 rounded-full bg-primary absolute top-0.5 transition-transform duration-300 ${isAnnual ? 'translate-x-8' : 'translate-x-1'}`} />
          </button>
          <span className={`text-sm font-medium flex items-center gap-2 ${isAnnual ? 'text-on-surface' : 'text-on-surface-variant'}`}>
            Annually
            <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full font-bold">Save 20%</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan, index) => (
          <div 
            key={plan.name}
            className={`relative rounded-2xl p-8 flex flex-col bg-surface border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-8 ${
              plan.highlighted 
                ? 'border-primary shadow-[0_0_30px_rgba(245,197,24,0.15)] md:scale-105 z-10' 
                : 'border-outline-variant/50'
            }`}
            style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}
          >
            {plan.highlighted && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-500 to-orange-400 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
                MOST POPULAR
              </div>
            )}
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-on-surface mb-2">{plan.name}</h3>
              <p className="text-on-surface-variant text-sm h-10">{plan.description}</p>
            </div>
            
            <div className="mb-8 flex items-baseline gap-2">
              <span className="text-4xl font-display font-black text-on-surface">{plan.price}</span>
              <span className="text-on-surface-variant text-sm font-medium">/ {plan.period}</span>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-on-surface">
                  <span className="material-symbols-outlined text-[20px] text-primary shrink-0">check_circle</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 rounded-lg font-bold transition-all ${
                plan.buttonVariant === 'primary' 
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:shadow-amber-500/20' 
                  : plan.buttonVariant === 'outline'
                  ? 'bg-surface-container border border-outline-variant text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                  : 'bg-surface-container-highest text-on-surface hover:bg-surface-variant'
              }`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto pt-12 border-t border-outline-variant/50 animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
        <h2 className="text-2xl font-bold text-on-surface mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-on-surface mb-2">Can I switch plans later?</h4>
            <p className="text-on-surface-variant text-sm">Yes, you can upgrade or downgrade your plan at any time. Prorated charges or credits will automatically be applied to your account.</p>
          </div>
          <div>
            <h4 className="font-semibold text-on-surface mb-2">What happens when I exceed my retention limit?</h4>
            <p className="text-on-surface-variant text-sm">Older emission data points will be automatically archived and aggregated. You can upgrade to the Team or Enterprise plan to retain raw data points for longer periods.</p>
          </div>
          <div>
            <h4 className="font-semibold text-on-surface mb-2">Do you offer discounts for open-source projects?</h4>
            <p className="text-on-surface-variant text-sm">Absolutely! We believe in green open-source software. Contact our sales team with a link to your public repository to claim a free Team license.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
