import React from 'react';
import { clsx } from 'clsx'; 

const Button = ({ 
  label, 
  onClick, 
  disabled = false, 
  outline = false, 
  small = false, 
  icon: Icon 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        `
          relative
          disabled:opacity-70
          disabled:cursor-not-allowed
          rounded-lg
          hover:opacity-90
          transition
          font-medium
          flex
          items-center
          justify-center
          gap-3
          px-6
          py-3
          border-2
          focus:outline-none
          focus:ring-4
          focus:ring-primary/30
        `,
        outline 
          ? 'bg-white border-primary text-primary hover:bg-primary/5' 
          : 'bg-primary border-primary text-white hover:bg-secondary',
        small 
          ? 'text-sm py-2 px-4 border' 
          : 'text-base py-3 px-6 border-2'
      )}
    >
      {Icon && <Icon size={small ? 20 : 24} />}
      {label}
    </button>
  );
};

export default Button;