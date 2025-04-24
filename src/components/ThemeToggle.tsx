import React from 'react';
import { useTheme } from './ThemeProvider';
import { SunIcon, MoonIcon, LaptopIcon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="y2k-theme-button p-2 rounded-full transition-transform hover:scale-110 active:scale-95"
      aria-label="Toggle theme"
    >
      <div className="relative w-8 h-8 flex items-center justify-center">
        {theme === 'light' && (
          <SunIcon className="w-5 h-5 text-yellow-500 animate-spin-slow" />
        )}
        {theme === 'dark' && (
          <MoonIcon className="w-5 h-5 text-indigo-400 animate-pulse" />
        )}
        {theme === 'system' && (
          <LaptopIcon className="w-5 h-5 text-accent animate-float" />
        )}
        
        {/* Y2K Decorative elements */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 opacity-30 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-white opacity-70"></div>
        <div className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-yellow-200 opacity-70"></div>
      </div>
    </button>
  );
} 