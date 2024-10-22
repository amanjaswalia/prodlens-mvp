import React from 'react';

interface ButtonProps {
  label: string;          
  className?: string;    
}

const Button: React.FC<ButtonProps> = ({ label, className }) => {
  return (
    <button 
      className={`bg-[#0072BB] text-white py-2 px-4 rounded-lg ${className}`} 
    >
      {label}
    </button>
  );
};

export default Button;
