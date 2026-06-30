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
    success: 'bg-[rgba(80,250,123,0.15)] text-[#50FA7B] border border-[rgba(80,250,123,0.3)]',
    warning: 'bg-[rgba(245,197,24,0.15)] text-[#f5c518] border border-[rgba(245,197,24,0.3)]',
    error: 'bg-[rgba(232,144,74,0.15)] text-[#E8904A] border border-[rgba(232,144,74,0.3)]',
    critical: 'bg-[rgba(248,113,113,0.15)] text-[#f87171] border border-[rgba(248,113,113,0.3)]',
    info: 'bg-[rgba(139,233,253,0.15)] text-[#8BE9FD] border border-[rgba(139,233,253,0.3)]',
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[12px] font-medium font-label-caps uppercase tracking-wider ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
