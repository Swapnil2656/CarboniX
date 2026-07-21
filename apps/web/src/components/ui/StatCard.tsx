import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  isLoading?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, isLoading }) => {
  if (isLoading) {
    return (
      <div className="glass-card p-6 rounded-xl flex flex-col gap-4 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-bright"></div>
          <div className="h-5 w-24 bg-surface-bright rounded"></div>
        </div>
        <div className="h-10 w-32 bg-surface-bright rounded mt-2"></div>
      </div>
    );
  }

  const isPositiveTrend = trend?.direction === 'up';
  
  return (
    <div className="glass-card p-6 rounded-xl flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-high text-primary">
            <span className="material-symbols-outlined">{icon}</span>
          </div>
          <h3 className="text-on-surface-variant font-medium">{title}</h3>
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            isPositiveTrend 
              ? 'bg-[rgba(80,250,123,0.15)] text-[#50FA7B]' 
              : 'bg-[rgba(248,113,113,0.15)] text-[#f87171]'
          }`}>
            <span className="material-symbols-outlined text-[14px]">
              {isPositiveTrend ? 'trending_up' : 'trending_down'}
            </span>
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      <div className="text-headline text-on-surface mt-2 truncate" title={String(value)}>{value}</div>
    </div>
  );
};
