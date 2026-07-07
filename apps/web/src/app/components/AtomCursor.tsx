"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function AtomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Motion values for exact mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for trailing effect
  // Adjust stiffness and damping to change how "heavy" the atom feels
  const springConfig = { stiffness: 100, damping: 20, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only show on desktop devices that support hover
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by -20 to center the 40x40 atom on the cursor
      mouseX.set(e.clientX - 20);
      mouseY.set(e.clientY - 20);
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block mix-blend-screen"
      style={{
        x: smoothX,
        y: smoothY,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ opacity: { duration: 0.2 } }}
    >
      {/* 40x40 container for the atom */}
      <div className="relative w-10 h-10 flex items-center justify-center">
        
        {/* Nucleus */}
        <div className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] z-10" />

        {/* Orbital 1 - Cyan */}
        <motion.div 
          className="absolute w-10 h-10 border border-cyan-400/60 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.3)]"
          style={{ scaleY: 0.3 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Orbital 2 - Purple */}
        <motion.div 
          className="absolute w-10 h-10 border border-purple-400/60 rounded-full shadow-[0_0_8px_rgba(192,132,252,0.3)]"
          style={{ scaleY: 0.3, rotateZ: 60 }}
          animate={{ rotateZ: [60, 420] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Orbital 3 - Amber */}
        <motion.div 
          className="absolute w-10 h-10 border border-amber-400/60 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.3)]"
          style={{ scaleY: 0.3, rotateZ: 120 }}
          animate={{ rotateZ: [120, 480] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Massive ambient lamp light effect - Creative Cosmic Aurora */}
        <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none -z-10 flex items-center justify-center mix-blend-screen opacity-80">
          <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[80px] translate-x-16" />
          <div className="absolute w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[80px] -translate-x-12 -translate-y-12" />
          <div className="absolute w-[300px] h-[300px] bg-amber-400/10 rounded-full blur-[60px] translate-y-16" />
        </div>
      </div>
    </motion.div>
  );
}
