
import React, { useState } from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-8" }) => {
  const [hasError, setHasError] = useState(false);

  // If the image fails to load, we show a premium-looking CSS-based fallback
  if (hasError) {
    return (
      <div className={`flex items-center gap-2 font-serif font-bold tracking-tighter ${className}`}>
        <div className="relative aspect-square h-full flex items-center justify-center">
          <div className="absolute inset-0 bg-primary rounded-lg rotate-12 opacity-80"></div>
          <div className="absolute inset-0 bg-secondary rounded-lg -rotate-6 opacity-80"></div>
          <span className="relative text-white font-sans text-[0.6em] md:text-[0.7em]">M</span>
        </div>
        <span className="text-dark text-[0.8em] md:text-[0.9em]">Modai</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center overflow-hidden ${className}`}>
      <img 
        src="logomodai.png" 
        alt="Modai Logo" 
        className="h-full w-auto object-contain"
        onError={() => setHasError(true)}
      />
    </div>
  );
};

export default Logo;
