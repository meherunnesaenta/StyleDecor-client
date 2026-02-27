import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');
  const [isMounted, setIsMounted] = useState(false);

  // Hydration fix + initial theme load
  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="
        relative flex items-center justify-center 
        w-10 h-10 md:w-11 md:h-11 
        rounded-full 
        bg-gradient-to-br from-gray-100 to-gray-200 
        dark:from-gray-800 dark:to-gray-900 
        border border-gray-300/50 dark:border-gray-700/50 
        shadow-sm hover:shadow-md 
        transition-all duration-300 ease-out
        hover:scale-110 active:scale-95
        text-gray-700 dark:text-gray-200
        overflow-hidden
      "
    >
      {/* Subtle glow background on hover */}
      <div className="
        absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 
        opacity-0 hover:opacity-100 transition-opacity duration-500 blur-sm
      " />

      {/* Icon with smooth rotation */}
      <div className="relative z-10 transition-transform duration-500 ease-out">
        {theme === 'light' ? (
          <Moon className="w-5 h-5 md:w-6 md:h-6 rotate-0 hover:rotate-180 transition-transform duration-700" />
        ) : (
          <Sun className="w-5 h-5 md:w-6 md:h-6 rotate-0 hover:rotate-180 transition-transform duration-700" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;