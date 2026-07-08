"use client";

import { useState } from "react";
import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

function AnimatedNumber({ value }: { value: number }) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    const controls = animate(motionValue, value, { duration: 0.8, type: "spring", bounce: 0.2 });
    return controls.stop;
  }, [value, motionValue]);

  return <motion.span>{rounded}</motion.span>;
}

export function SavingsCalculator() {
  const [servers, setServers] = useState(100);

  // CarboniX optimization assumes ~40% idle resource reduction and 15% grid shifting
  const co2Savings = Math.round(servers * 2.8 * 365 * 0.55); // kg CO2e per year
  const costSavings = Math.round(servers * 75 * 12 * 0.40); // $ per year

  return (
    <div className="w-full max-w-[600px] mx-auto bg-surface-container border border-outline-variant rounded-2xl p-xl shadow-2xl">
      <h3 className="font-display text-section-header text-on-surface mb-md">Calculate Your ROI</h3>
      <p className="text-on-surface-variant font-body-md mb-xl">
        Estimate how much you can save by eliminating idle infrastructure and intelligently shifting workloads.
      </p>

      <div className="mb-xl">
        <div className="flex justify-between items-end mb-4">
          <label className="text-on-surface font-label-caps tracking-widest text-sm">Cloud Instances</label>
          <span className="font-display text-primary text-2xl font-bold">{servers}</span>
        </div>
        <input
          type="range"
          min="10"
          max="5000"
          step="10"
          value={servers}
          onChange={(e) => setServers(parseInt(e.target.value))}
          className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-on-surface-variant text-xs mt-2 font-code">
          <span>10</span>
          <span>5000+</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-md">
        <div className="bg-surface p-lg rounded-xl border border-outline-variant/50 text-center">
          <p className="text-on-surface-variant text-xs font-label-caps mb-2">Annual CO₂e Avoided</p>
          <p className="font-display font-black text-4xl text-emerald-500 mb-1">
            <AnimatedNumber value={co2Savings} /> <span className="text-lg">kg</span>
          </p>
          <p className="text-on-surface-variant/70 text-xs">~{(co2Savings / 1000 * 0.5).toFixed(1)} trees planted</p>
        </div>
        
        <div className="bg-surface p-lg rounded-xl border border-outline-variant/50 text-center">
          <p className="text-on-surface-variant text-xs font-label-caps mb-2">Annual Cost Saved</p>
          <p className="font-display font-black text-4xl text-primary mb-1">
            $<AnimatedNumber value={costSavings} />
          </p>
          <p className="text-on-surface-variant/70 text-xs">Immediate bottom-line impact</p>
        </div>
      </div>
    </div>
  );
}
