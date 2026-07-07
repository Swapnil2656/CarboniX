"use client";

import React, { useRef, useState } from "react";

export function AnimatedFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const [height, setHeight] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    footerRef.current.style.setProperty("--mouse-x", `${x}px`);
    footerRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <>
      <footer
        ref={footerRef}
        onMouseMove={handleMouseMove}
        className="relative z-0 bg-surface-container-lowest dark:bg-white/[0.02] border-t border-outline-variant/30 text-on-surface py-3xl overflow-hidden group"
      >
        {/* Dynamic Mouse Spotlight Glow */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
          style={{
            background: 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(245,158,11,0.08), transparent 40%)'
          }}
        />

        {/* Inner glow border to give it a premium feel */}
        <div className="pointer-events-none absolute inset-0 z-0 border-t border-white/[0.05]" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-gutter px-margin max-w-[1440px] mx-auto">
          {/* Brand */}
          <div className="space-y-lg">
            <span className="text-section-header font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-400 dark:from-primary dark:to-primary-fixed">CarboniX</span>
            <p className="text-on-surface-variant font-body-md pr-lg">
              Standardizing the environmental impact of software engineering. High-performance
              intelligence for a sustainable cloud.
            </p>
            <div className="flex gap-md">
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

          {/* Product links */}
          <div>
            <h4 className="font-label-caps text-label-caps text-on-surface mb-xl">PRODUCT</h4>
            <ul className="space-y-md">
              {['Core SDK', 'CI/CD Gating', 'Regional Explorer', 'Compliance Engine'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-on-surface-variant hover:text-amber-600 dark:hover:text-primary transition-colors font-body-md">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h4 className="font-label-caps text-label-caps text-on-surface mb-xl">RESOURCES</h4>
            <ul className="space-y-md">
              {['Documentation', 'API Reference', 'Case Studies', 'Carbon Blog'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-on-surface-variant hover:text-amber-600 dark:hover:text-primary transition-colors font-body-md">{l}</a>
                </li>
              ))}
            </ul>
          </div>

        </div>


      </footer>
    </>
  );
}
