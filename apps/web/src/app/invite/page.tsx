'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function InviteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleAccept = async () => {
    if (!email) {
      setError('Invalid invite link. Missing email parameter.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Direct fetch since this is public unauthenticated endpoint
      const res = await fetch('http://localhost:4000/api/v1/public/accept-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 2000);
      } else {
        setError(data.error || 'Failed to accept invitation.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while connecting to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-surface border border-outline-variant rounded-2xl p-8 shadow-2xl text-center backdrop-blur-md relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#50FA7B]/20 rounded-full blur-[64px] pointer-events-none" />
      
      <div className="mb-6 flex justify-center relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-[#50FA7B]/10 border border-[#50FA7B]/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-[32px] text-[#50FA7B]">mail</span>
        </div>
      </div>
      
      <h1 className="text-2xl font-bold mb-2 text-on-surface relative z-10">You've been invited!</h1>
      <p className="text-on-surface-variant mb-8 relative z-10">
        {email ? (
          <>Join your team on CarboniX as <strong className="text-on-surface">{email}</strong> to collaborate on tracking and reducing your cloud carbon footprint.</>
        ) : (
          <>Join your team on CarboniX to collaborate on tracking and reducing your cloud carbon footprint.</>
        )}
      </p>

      <div className="relative z-10">
        {success ? (
          <div className="bg-[#50FA7B]/10 text-[#50FA7B] border border-[#50FA7B]/20 p-4 rounded-xl flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            Invitation accepted! Redirecting...
          </div>
        ) : (
          <button 
            onClick={handleAccept} 
            disabled={loading}
            className="w-full bg-[#50FA7B] hover:bg-[#40c862] text-[#1e1e2e] font-semibold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-lg flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                Accepting...
              </>
            ) : (
              'Accept Invitation'
            )}
          </button>
        )}
      </div>
      
      {error && (
        <p className="text-[#f87171] mt-4 text-sm relative z-10 bg-[#f87171]/10 border border-[#f87171]/20 p-3 rounded-lg flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[18px]">error</span>
          {error}
        </p>
      )}
    </div>
  );
}

export default function InvitePage() {
  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col items-center justify-center p-4 font-sans bg-dot-pattern">
      <Suspense fallback={
        <div className="w-full max-w-md bg-surface border border-outline-variant rounded-2xl p-8 shadow-2xl flex flex-col items-center justify-center h-64">
          <span className="material-symbols-outlined animate-spin text-[32px] text-[#50FA7B] mb-4">progress_activity</span>
          <p className="text-on-surface-variant">Loading invitation...</p>
        </div>
      }>
        <InviteContent />
      </Suspense>
    </div>
  );
}
