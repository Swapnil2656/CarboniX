"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function SupportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Reset form status after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      {/* Header Section */}
      <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-3xl font-display font-bold text-on-surface mb-2">
          How can we help?
        </h1>
        <p className="text-on-surface-variant text-base max-w-2xl">
          Get in touch with our Super Admins, explore the documentation, or check the system status.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-2 space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="glass-card rounded-2xl p-8 border border-outline-variant/50">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-on-surface">Contact Super Admins</h2>
                <p className="text-sm text-on-surface-variant mt-1">Submit a ticket directly to the core infrastructure team.</p>
              </div>
              <a 
                href="mailto:kumarikhushi24168@gmail.com" 
                className="hidden sm:flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">mail</span>
                Email Directly
              </a>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-on-surface-variant">Category</label>
                  <select required className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2.5 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none">
                    <option value="" disabled selected>Select a category...</option>
                    <option value="email_change">Email Address Change</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing & Subscriptions</option>
                    <option value="feature">Feature Request</option>
                    <option value="bug">Report a Bug</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-on-surface-variant">Priority</label>
                  <select required className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2.5 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none">
                    <option value="low">Low - General Question</option>
                    <option value="medium">Medium - Non-critical issue</option>
                    <option value="high">High - System degraded</option>
                    <option value="critical">Critical - System down</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-on-surface-variant">Subject</label>
                <input 
                  type="text" 
                  required
                  placeholder="Brief summary of your issue"
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-2.5 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-on-surface-variant">Message</label>
                <textarea 
                  required
                  rows={5}
                  placeholder="Please provide as much detail as possible..."
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                ></textarea>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-sm">
                  {submitStatus === 'success' && (
                    <span className="text-green-500 flex items-center gap-1 animate-in fade-in">
                      <span className="material-symbols-outlined text-[18px]">check_circle</span>
                      Message sent successfully!
                    </span>
                  )}
                  {submitStatus === 'error' && (
                    <span className="text-red-500 flex items-center gap-1 animate-in fade-in">
                      <span className="material-symbols-outlined text-[18px]">error</span>
                      Failed to send message. Please try again.
                    </span>
                  )}
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting || submitStatus === 'success'}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                      Sending...
                    </>
                  ) : submitStatus === 'success' ? (
                    'Sent!'
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">send</span>
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Quick Resources */}
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
          
          <div className="glass-card rounded-2xl p-6 border border-outline-variant/50 flex flex-col gap-4">
            <h3 className="font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">menu_book</span>
              Documentation
            </h3>
            <p className="text-sm text-on-surface-variant">
              Browse our comprehensive guides, API references, and SDK documentation.
            </p>
            <Link href="/docs" className="text-primary text-sm font-medium hover:underline flex items-center gap-1 mt-auto">
              View Documentation <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-outline-variant/50 flex flex-col gap-4">
            <h3 className="font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">forum</span>
              Community Forum
            </h3>
            <p className="text-sm text-on-surface-variant">
              Join thousands of developers building sustainable software to ask questions and share ideas.
            </p>
            <a href="#" className="text-primary text-sm font-medium hover:underline flex items-center gap-1 mt-auto">
              Visit Forums <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-outline-variant/50 flex flex-col gap-4">
            <h3 className="font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-green-500">check_circle</span>
              System Status
            </h3>
            <div className="flex items-center gap-3 bg-surface-container-low p-3 rounded-lg border border-outline-variant">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm font-medium text-on-surface">All systems operational</span>
            </div>
            <a href="#" className="text-primary text-sm font-medium hover:underline flex items-center gap-1 mt-2">
              View detailed status <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
