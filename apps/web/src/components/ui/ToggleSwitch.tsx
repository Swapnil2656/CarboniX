import React from 'react';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, disabled = false }) => {
  return (
    <label className={`relative inline-flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <input 
        type="checkbox" 
        className="sr-only ios-toggle" 
        checked={checked} 
        onChange={(e) => !disabled && onChange(e.target.checked)} 
        disabled={disabled}
      />
      <div className="w-11 h-6 bg-surface-container-highest rounded-full toggle-bg transition-colors duration-200 ease-in-out border border-outline-variant">
        <div className="toggle-dot absolute top-[2px] left-[2px] bg-outline h-5 w-5 rounded-full transition-transform duration-200 ease-in-out shadow-sm"></div>
      </div>
    </label>
  );
};
