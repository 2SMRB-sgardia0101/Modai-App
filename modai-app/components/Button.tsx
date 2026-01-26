import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#38b6ff] to-[#2563eb] text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 border border-transparent",
    secondary: "bg-gradient-to-r from-[#f27100] to-[#ea580c] text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 border border-transparent",
    outline: "bg-transparent border-2 border-[#38b6ff] text-[#38b6ff] hover:bg-[#38b6ff] hover:text-white",
    ghost: "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10",
    white: "bg-white text-gray-900 shadow-xl hover:bg-gray-50 border border-gray-200"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm tracking-wide",
    lg: "px-8 py-4 text-base tracking-wide",
    xl: "px-10 py-5 text-lg font-bold"
  };

  const width = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};