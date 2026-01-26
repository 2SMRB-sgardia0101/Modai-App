import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ className = "h-8", variant = 'dark' }) => {
  const [error, setError] = useState(false);

  if (error) {
    // Fallback SVG Logo if image fails
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#38b6ff] to-[#f27100] flex items-center justify-center text-white font-bold text-xl">
          M
        </div>
        <span className="font-bold text-xl tracking-tight dark:text-white text-gray-900">Modai</span>
      </div>
    );
  }

  return (
    <img 
      src="logomodai.jpg" 
      alt="Modai Logo" 
      className={`object-contain ${className}`}
      onError={() => setError(true)}
    />
  );
};
