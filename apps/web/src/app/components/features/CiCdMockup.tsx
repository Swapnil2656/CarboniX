"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

export function CiCdMockup() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev < 4 ? prev + 1 : 0));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-[600px] min-h-[540px] bg-[#0d1117] rounded-xl border border-[#30363d] shadow-2xl overflow-hidden font-sans text-sm mx-auto">
      {/* PR Header */}
      <div className="border-b border-[#30363d] p-4 flex gap-3 items-start bg-[#161b22]">
        <div className="mt-1">
          <svg viewBox="0 0 16 16" width="16" height="16" fill="#8957e5">
            <path d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.25 2.25 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1.5 1.5 0 011.5 1.5v5.628a2.25 2.25 0 101.5 0V5.5A3 3 0 0011 2.5zm1.25 9.25a.75.75 0 100 1.5.75.75 0 000-1.5z"></path>
          </svg>
        </div>
        <div>
          <h3 className="text-white font-semibold text-base mb-1">
            feat: scale out ML inference cluster
            <span className="text-[#8b949e] font-normal ml-2">#102</span>
          </h3>
          <p className="text-[#8b949e] text-xs">
            swapnil wants to merge 3 commits into <code className="bg-[#1f242c] px-1 rounded text-[#c9d1d9]">main</code>
          </p>
        </div>
      </div>

      {/* CI Checks */}
      <div className="p-4 space-y-3">
        {/* Linting */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 10 }}
          className="flex items-center justify-between p-3 bg-[#161b22] border border-[#30363d] rounded-md"
        >
          <div className="flex items-center gap-3">
            <CheckCircle className="text-[#238636] w-5 h-5" />
            <span className="text-[#c9d1d9] font-medium">ESLint / Prettier</span>
          </div>
          <span className="text-[#8b949e]">Successful in 12s</span>
        </motion.div>

        {/* Tests */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 10 }}
          className="flex items-center justify-between p-3 bg-[#161b22] border border-[#30363d] rounded-md"
        >
          <div className="flex items-center gap-3">
            <CheckCircle className="text-[#238636] w-5 h-5" />
            <span className="text-[#c9d1d9] font-medium">Jest Unit Tests</span>
          </div>
          <span className="text-[#8b949e]">Successful in 1m 4s</span>
        </motion.div>

        {/* CarboniX Gate */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 10 }}
          className={`flex items-center justify-between p-3 rounded-md border ${
            step >= 4 ? "bg-[#ffebe9] border-[#ff818266]" : "bg-[#161b22] border-[#30363d]"
          }`}
        >
          <div className="flex items-center gap-3">
            {step >= 4 ? (
              <XCircle className="text-[#da3633] w-5 h-5" />
            ) : (
              <svg className="animate-spin h-5 w-5 text-[#8b949e]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            <span className={`font-medium ${step >= 4 ? "text-[#da3633]" : "text-[#c9d1d9]"}`}>
              CarboniX GateAgent
            </span>
          </div>
          <span className={step >= 4 ? "text-[#da3633]" : "text-[#8b949e]"}>
            {step >= 4 ? "Failed" : "In progress..."}
          </span>
        </motion.div>

        {/* CarboniX Comment */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, height: 0 }}
          animate={{ 
            opacity: step >= 4 ? 1 : 0, 
            scale: step >= 4 ? 1 : 0.95,
            height: step >= 4 ? "auto" : 0
          }}
          className="mt-4 p-4 bg-[#0d1117] border border-[#30363d] rounded-md relative overflow-hidden"
        >
          <div className="absolute -top-3 left-4 bg-[#0d1117] px-1 text-xs font-semibold text-[#8b949e]">
            CarboniX (bot)
          </div>
          <div className="flex gap-3 text-[#c9d1d9] mt-2">
            <AlertCircle className="text-[#da3633] w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white mb-1">Carbon Budget Exceeded</p>
              <p className="text-[#8b949e] mb-3 leading-relaxed">
                Deploying 5x <code className="bg-[#1f242c] border border-[#30363d] px-1 rounded text-[#c9d1d9]">p4d.24xlarge</code> instances in <code className="bg-[#1f242c] border border-[#30363d] px-1 rounded text-[#c9d1d9]">ap-south-1</code> (Mumbai) adds <strong className="text-[#da3633]">+142kg CO₂e/day</strong> to your baseline, exceeding your 100kg limit.
              </p>
              <div className="bg-[#161b22] border border-[#30363d] rounded p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[#8b949e] text-xs font-medium">Suggested Optimization:</span>
                  <p className="text-white mt-1 text-xs">Shift workload to <code className="bg-[#238636]/20 text-[#3fb950] px-1 rounded border border-[#238636]/30">eu-north-1</code> (Stockholm)</p>
                </div>
                <button className="bg-[#238636] hover:bg-[#2ea043] text-white px-3 py-1.5 rounded text-xs font-medium transition-colors shrink-0">
                  Apply Fix
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
