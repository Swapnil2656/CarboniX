import React from 'react';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon = 'inbox', 
  title, 
  description, 
  action 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center glass-card rounded-2xl border-dashed border-outline-variant">
      <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-outline mb-6">
        <span className="material-symbols-outlined text-3xl">{icon}</span>
      </div>
      <h3 className="text-xl font-semibold text-on-surface mb-2">{title}</h3>
      {description && (
        <p className="text-on-surface-variant max-w-md mb-6">{description}</p>
      )}
      {action && (
        <div>{action}</div>
      )}
    </div>
  );
};
