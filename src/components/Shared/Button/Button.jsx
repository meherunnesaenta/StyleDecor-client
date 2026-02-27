// Button.jsx
import React from 'react';
import { clsx } from 'clsx';

const Button = ({
  label,
  children,           // ← নতুন যোগ করো
  onClick,
  disabled = false,
  outline = false,
  small = false,
  icon: Icon,
  type = 'button',    // ← type support যোগ করা ভালো
  ...props            // ← অন্য সব prop (যেমন type="submit")
}) => {
  const buttonText = label || children;  // label না থাকলে children নাও

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'relative flex items-center justify-center gap-2.5',
        'rounded-xl font-medium transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        small ? 'px-5 py-2.5 text-sm border' : 'px-7 py-3.5 text-base border-2',
        outline
          ? 'bg-transparent border-primary text-primary hover:bg-primary/10 active:bg-primary/20'
          : 'bg-primary border-primary text-white hover:bg-primary/90 active:bg-primary/80'
      )}
      {...props}
    >
      {Icon && <Icon size={small ? 18 : 22} />}
      <span>{buttonText}</span>
    </button>
  );
};

export default Button;