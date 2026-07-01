"use client";

import React, { useRef, useEffect, useState } from "react";
import { NewsletterForm } from "./NewsletterForm";

export function AnimatedFooter() {
  const footerRef = useRef<HTMLElement>(null);
  const [height, setHeight] = useState(0);
  const [isReveal, setIsReveal] = useState(true);

  useEffect(() => {
    if (!footerRef.current) return;

    const updateMeasurements = () => {
      if (footerRef.current) {
        const fh = footerRef.current.offsetHeight;
        setHeight(fh);
        setIsReveal(prev => {
          // Add 50px hysteresis to prevent infinite loop layout thrashing
          if (prev && fh >= window.innerHeight + 50) return false;
          if (!prev && fh <= window.innerHeight - 50) return true;
          return prev;
        });
      }
    };

    const obs = new ResizeObserver(updateMeasurements);
    obs.observe(footerRef.current);
    window.addEventListener('resize', updateMeasurements);
    
    // Initial call
    updateMeasurements();

    return () => {
      obs.disconnect();
      window.removeEventListener('resize', updateMeasurements);
    };
  }, []);

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
      {isReveal && <div style={{ height }} className="w-full pointer-events-none" />}
      <footer
        ref={footerRef}
        onMouseMove={handleMouseMove}
        className={`${isReveal ? 'fixed bottom-0 left-0 w-full' : 'relative'} z-0 bg-surface-container-lowest text-on-surface py-3xl overflow-hidden group`}
      >
        {/* Inner glow border to give it a premium feel */}
        <div className="pointer-events-none absolute inset-0 z-0 border-t border-white/[0.02]" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin max-w-[1440px] mx-auto">
          {/* Brand */}
          <div className="space-y-lg">
            <span className="text-section-header font-display font-black text-primary-container">CarboniX</span>
            <p className="text-on-surface-variant font-body-md pr-lg">
              Standardizing the environmental impact of software engineering. High-performance
              intelligence for a sustainable cloud.
            </p>
            <div className="flex gap-md">
              {[
                { icon: 'alternate_email', label: 'Email' },
                { icon: 'hub',            label: 'GitHub' },
                { icon: 'forum',          label: 'Discord' },
              ].map((s) => (
                <a
                  key={s.icon}
                  href="#"
                  aria-label={s.label}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container border border-outline-variant text-on-surface-variant hover:text-primary transition-colors hover:shadow-[0_0_15px_rgba(245,197,24,0.2)]"
                >
                  <span className="material-symbols-outlined">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="font-label-caps text-label-caps text-on-surface mb-xl">PRODUCT</h4>
            <ul className="space-y-md">
              {['Core SDK', 'CI/CD Gating', 'Regional Explorer', 'Compliance Engine'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-on-surface-variant hover:text-primary transition-colors font-body-md">{l}</a>
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
                  <a href="#" className="text-on-surface-variant hover:text-primary transition-colors font-body-md">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust + newsletter */}
          <div className="space-y-xl">
            <div>
              <h4 className="font-label-caps text-label-caps text-on-surface mb-xl">TRUST</h4>
              <ul className="space-y-md">
                {['Privacy Policy', 'Terms of Service', 'Security (SOC2)', 'Status'].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-on-surface-variant hover:text-primary transition-colors font-body-md">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-lg bg-surface-container rounded-lg border border-outline-variant relative overflow-hidden group/card">
              <div 
                className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle 300px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.03), transparent 80%)`
                }}
              />
              <div className="relative z-10">
                <p className="font-label-caps text-[10px] text-on-surface-variant mb-sm">NEWSLETTER</p>
                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-3xl pt-xl px-margin max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-md relative z-10 border-t border-outline-variant/30">
          <p className="text-on-surface-variant font-body-md text-[14px]">
            © 2024 CarboniX Cloud Intelligence. All rights reserved.
          </p>
          <div className="flex items-center gap-md">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
            <span className="font-label-caps text-[12px] text-on-surface-variant">SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </footer>
    </>
  );
}
