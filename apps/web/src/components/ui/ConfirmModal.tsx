import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  isDestructive = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="glass-card w-full max-w-md rounded-2xl overflow-hidden shadow-2xl animate-fade-in border-outline-variant">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-on-surface mb-2">{title}</h3>
          <div className="text-on-surface-variant text-sm mb-6">
            {description}
          </div>
          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors font-medium text-sm"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                isDestructive
                  ? 'bg-error-container text-on-error-container hover:bg-[#a6000c]'
                  : 'bg-primary text-on-primary hover:bg-primary-container'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
