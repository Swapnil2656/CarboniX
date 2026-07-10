"use client";

import { Highlight, themes } from "prism-react-renderer";
import { motion } from "framer-motion";
import { Info } from "lucide-react";

const codeSnippet = `resource "aws_instance" "ml_inference" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "p4d.24xlarge"
  count         = 5

  tags = {
    Name        = "ML Inference Node"
    Environment = "Production"
  }
}`;

export function IdeSnippet() {
  return (
    <div className="w-full max-w-[600px] mx-auto bg-[#1e1e1e] rounded-xl border border-[#3e3e42] shadow-2xl overflow-hidden font-mono text-sm relative">
      {/* VS Code Header */}
      <div className="bg-[#2d2d2d] border-b border-[#1e1e1e] flex items-center px-4 py-2 select-none">
        <div className="flex gap-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="text-[#858585] text-xs font-sans flex-1 text-center pr-12">
          main.tf - carbonix-infrastructure
        </div>
      </div>

      <div className="p-4 overflow-x-auto relative">
        <Highlight theme={themes.vsDark} code={codeSnippet} language="javascript">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={{ ...style, backgroundColor: 'transparent' }}>
              {tokens.map((line, i) => {
                const { key: lineKey, ...lineProps } = getLineProps({ line, key: i });
                return (
                  <div key={i} {...lineProps} className="table-row">
                    <span className="table-cell text-right pr-4 text-[#858585] select-none opacity-50">{i + 1}</span>
                    <span className="table-cell">
                      {line.map((token, key) => {
                        const { key: tokenKey, ...tokenProps } = getTokenProps({ token, key });
                        return <span key={key} {...tokenProps} />;
                      })}
                    </span>
                  </div>
                );
              })}
            </pre>
          )}
        </Highlight>

        {/* CarboniX IDE Tooltip overlay */}
        <motion.div 
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="absolute top-12 left-24 bg-surface border border-primary/40 rounded-lg p-3 shadow-2xl z-10 min-w-[280px]"
        >
          <div className="flex gap-2 items-start">
            <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-primary text-[10px] font-bold">CX</span>
            </div>
            <div>
              <h4 className="text-on-surface font-sans text-xs font-bold mb-1 flex items-center gap-1">
                CarboniX Lens
                <Info className="w-3 h-3 text-on-surface-variant" />
              </h4>
              <p className="text-on-surface-variant font-sans text-xs leading-relaxed mb-2">
                <strong>p4d.24xlarge</strong> in this region emits approx. <strong className="text-error">28.4 kg CO₂e/day</strong> per instance.
              </p>
              <div className="flex gap-2 mt-1">
                <span className="bg-surface-container text-on-surface-variant px-2 py-0.5 rounded text-[10px] border border-outline-variant">Total: 142 kg/day</span>
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] border border-primary/20">Shift: -33 kg/day</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
