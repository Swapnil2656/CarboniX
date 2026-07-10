"use client";

import React, { useRef } from "react";

export function AnimatedFooter() {
  const footerRef = useRef<HTMLElement>(null);

  return (
    <>
      <footer
        ref={footerRef}
        className="relative z-0 bg-transparent dark:bg-transparent backdrop-blur-xl border-t border-white/5 text-on-surface py-3xl overflow-hidden group"
      >



        <div className="relative z-10 flex flex-col items-center text-center gap-lg px-margin max-w-[800px] mx-auto">
          {/* Brand */}
          <div className="flex flex-col items-center space-y-md">
            <div className="flex items-center gap-sm">
              <img src="/carbonix-logo.png" alt="CarboniX Logo" className="w-10 h-10 object-contain" />
              <span className="text-section-header font-display font-black text-amber-500 dark:text-primary">CarboniX</span>
            </div>
            
            <p className="text-on-surface-variant font-body-md max-w-md">
              Standardizing the environmental impact of software engineering. High-performance
              intelligence for a sustainable cloud.
            </p>
            
            <div className="flex gap-md justify-center">
              <a
                href="mailto:swapnilsen2656@gmail.com"
                aria-label="Email"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container border border-outline-variant text-on-surface-variant hover:text-amber-600 dark:hover:text-primary transition-colors hover:shadow-[0_0_15px_rgba(217,119,6,0.2)] dark:hover:shadow-[0_0_15px_rgba(245,197,24,0.2)]"
              >
                <span className="material-symbols-outlined">alternate_email</span>
              </a>
              <a
                href="https://github.com/Swapnil2656/CarboniX"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container border border-outline-variant text-on-surface-variant hover:text-amber-600 dark:hover:text-primary transition-colors hover:shadow-[0_0_15px_rgba(217,119,6,0.2)] dark:hover:shadow-[0_0_15px_rgba(245,197,24,0.2)]"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-5 h-5"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Credits */}
          <div className="mt-xl pt-xl border-t border-outline-variant w-full">
            <p className="text-on-surface-variant font-body-sm">
              Engineered with precision by <span className="text-primary font-semibold">Team MetaNova</span>
            </p>
          </div>
        </div>


      </footer>
    </>
  );
}
