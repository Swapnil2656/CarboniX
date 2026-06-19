import React from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'critical' | 'info';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const variantStyles = {
    default: 'bg-surface-container-high text-on-surface-variant border border-outline-variant',
    success: 'bg-[rgba(74,222,128,0.15)] text-[#4ade80] border border-[rgba(74,222,128,0.3)]',
    warning: 'bg-[rgba(245,197,24,0.15)] text-[#f5c518] border border-[rgba(245,197,24,0.3)]',
    error: 'bg-[rgba(251,146,60,0.15)] text-[#fb923c] border border-[rgba(251,146,60,0.3)]',
    critical: 'bg-[rgba(248,113,113,0.15)] text-[#f87171] border border-[rgba(248,113,113,0.3)]',
    info: 'bg-[rgba(66,215,251,0.15)] text-[#42d7fb] border border-[rgba(66,215,251,0.3)]',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[12px] font-medium font-label-caps uppercase tracking-wider ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
