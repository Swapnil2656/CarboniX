"use client";

import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const generateData = () => {
  const data = [];
  let currentVal = 800; // Starting kg CO2e
  for (let i = 0; i < 30; i++) {
    // Before CarboniX (volatile, high)
    if (i < 15) {
      currentVal = currentVal + (Math.random() * 100 - 40);
    } else if (i === 15) {
      // CarboniX activated (sharp drop)
      currentVal = 300;
    } else {
      // After CarboniX (stable, low)
      currentVal = currentVal + (Math.random() * 20 - 10);
    }
    data.push({
      time: i,
      unoptimized: i <= 15 ? Math.max(100, Math.round(currentVal)) : null,
      optimized: i >= 15 ? Math.max(100, Math.round(currentVal)) : null,
      fullValue: Math.max(100, Math.round(currentVal))
    });
  }
  return data;
};

export function ImpactChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData(generateData());
  }, []);

  if (data.length === 0) return null;

  return (
    <div className="w-full max-w-[600px] h-[350px] mx-auto bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] bg-primary/5 blur-[80px] rounded-full pointer-events-none -z-10" />

      <div className="flex justify-between items-center mb-6 relative z-10">
        <div>
          <h3 className="font-display font-semibold text-on-surface text-lg">Cluster Emissions</h3>
          <p className="text-on-surface-variant text-sm font-code">Real-time kg CO₂e / hr</p>
        </div>
        <div className="flex gap-4 text-xs font-medium uppercase tracking-wider font-code">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-error" />
            <span className="text-on-surface-variant">Unoptimized</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-on-surface-variant">CarboniX</span>
          </div>
        </div>
      </div>
      
      <div className="w-full h-[220px] relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="time" hide />
            <YAxis 
              tick={{ fill: '#8b949e', fontSize: 11, fontFamily: 'monospace' }} 
              axisLine={false}
              tickLine={false}
              tickFormatter={(val) => `${val}`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(20,20,20,0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#e5e7eb', backdropFilter: 'blur(8px)' }}
              itemStyle={{ color: '#fff', fontWeight: 'bold', fontFamily: 'monospace' }}
              labelStyle={{ display: 'none' }}
              formatter={(value: any) => [`${value} kg`, 'Emissions']}
            />
            
            <Area 
              type="monotone" 
              dataKey="unoptimized" 
              stroke="#ef4444" 
              fillOpacity={1} 
              fill="url(#colorHigh)" 
              strokeWidth={2}
              activeDot={{ r: 5, fill: "#ef4444", stroke: "#000", strokeWidth: 2 }}
              isAnimationActive={true}
            />
            
            <Area 
              type="monotone" 
              dataKey="optimized" 
              stroke="#f59e0b" 
              fillOpacity={1} 
              fill="url(#colorLow)" 
              strokeWidth={3}
              activeDot={{ r: 6, fill: "#f59e0b", stroke: "#000", strokeWidth: 2 }}
              isAnimationActive={true}
              animationBegin={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
