import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type?: 'success' | 'info';
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose, type = 'success' }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-slideUp">
      <div className={`flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl backdrop-blur-md border ${
        type === 'success' 
          ? 'bg-gray-900/90 text-white border-gray-800 dark:bg-white/90 dark:text-black dark:border-white' 
          : 'bg-white/90 text-gray-900 border-gray-200'
      }`}>
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="p-1 hover:opacity-70">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};