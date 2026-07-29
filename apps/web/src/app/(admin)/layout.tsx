'use client';

import React, { useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const AgentChat = dynamic(() => import('@/components/admin/AgentChat'), { ssr: false });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AdminHeader />
      <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      <AgentChat />
      
      {/* Floating Support & Docs */}
      <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-surface border border-outline-variant rounded-full shadow-lg p-1.5 backdrop-blur/90">
        <Link 
          href="/support"
          title="Support"
          className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">help</span>
        </Link>
        <Link 
          href="/docs"
          title="Documentation"
          className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">description</span>
        </Link>
      </div>
    </div>
  );
}
