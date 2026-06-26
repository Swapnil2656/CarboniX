'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

export const AdminHeader = () => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const userName = session?.user?.name || session?.user?.email?.split('@')[0] || 'User';
  const userInitial = userName.charAt(0).toUpperCase();
  const userEmail = session?.user?.email || '';

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 border-b border-outline-variant bg-surface-dim/80 backdrop-blur sticky top-0 z-40 flex items-center justify-between px-8">
      <div className="flex-1 max-w-xl">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-outline text-[20px]">search</span>
          <input 
            type="text" 
            placeholder="Search resources, API keys, or settings..." 
            className="w-full bg-surface-container-low border border-outline-variant rounded-lg pl-10 pr-4 py-2 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
          <div className="absolute right-3 flex items-center gap-1 text-[10px] font-label-caps text-outline font-medium">
            <span className="px-1.5 py-0.5 rounded bg-surface border border-outline-variant">⌘</span>
            <span className="px-1.5 py-0.5 rounded bg-surface border border-outline-variant">K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors relative">
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary ring-2 ring-surface"></span>
        </button>
        <button className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors">
          <span className="material-symbols-outlined text-[20px]">history</span>
        </button>
        
        <div className="h-6 w-px bg-outline-variant mx-2"></div>

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 hover:bg-surface-container rounded-full py-1 pl-1 pr-3 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[rgba(245,197,24,0.15)] flex items-center justify-center text-primary border border-[rgba(245,197,24,0.3)] font-semibold text-sm">
              {userInitial}
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium text-on-surface leading-tight">{userName}</span>
            </div>
            <span className="material-symbols-outlined text-outline text-[18px] ml-1">expand_more</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-lg bg-surface border border-outline-variant shadow-lg py-1 z-50">
              <div className="px-4 py-3 border-b border-outline-variant/50">
                <p className="text-sm font-medium text-on-surface truncate">{userName}</p>
                <p className="text-xs text-outline truncate">{userEmail}</p>
              </div>
              <div className="py-1">
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="w-full text-left px-4 py-2 text-sm text-error hover:bg-surface-container transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
