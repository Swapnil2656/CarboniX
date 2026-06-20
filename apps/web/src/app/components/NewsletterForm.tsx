"use client";

import React, { useState } from 'react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';
      const res = await fetch(`${apiUrl}/auth/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-primary-container/20 text-primary-container px-md py-xs rounded font-bold border border-primary-container/30 text-center">
        ✓ Subscribed successfully!
      </div>
    );
  }

  return (
    <form className="flex gap-sm" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="dev@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-background border border-outline-variant rounded px-md py-xs font-code w-full focus:border-primary-container focus:ring-0 outline-none text-on-surface"
        disabled={status === 'loading'}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-primary-container text-on-primary-fixed px-md py-xs rounded font-bold hover:opacity-80 transition-opacity disabled:opacity-50"
      >
        {status === 'loading' ? '...' : '→'}
      </button>
    </form>
  );
}
