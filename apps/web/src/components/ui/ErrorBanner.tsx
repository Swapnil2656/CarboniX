import React from 'react';

interface ErrorBannerProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ 
  title = 'Something went wrong', 
  message, 
  onRetry,
  className = ''
}) => {
  return (
    <div className={`p-4 rounded-xl bg-error-container text-on-error-container border border-[rgba(255,180,171,0.2)] flex items-start gap-4 ${className}`}>
      <span className="material-symbols-outlined text-[#ffb4ab] mt-0.5">error</span>
      <div className="flex-1">
        <h4 className="font-semibold mb-1 text-[#ffb4ab]">{title}</h4>
        <p className="text-sm opacity-90">{message}</p>
        {onRetry && (
          <button 
            onClick={onRetry}
            className="mt-3 text-sm font-medium hover:underline text-[#ffb4ab]"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
};
