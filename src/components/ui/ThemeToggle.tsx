import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from './Button';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className={`absolute transform transition-transform duration-500 ${
          theme === 'dark' ? 'rotate-0' : 'rotate-90 opacity-0'
        }`}
      >
        <Moon className="h-5 w-5" />
      </span>
      <span
        className={`absolute transform transition-transform duration-500 ${
          theme === 'light' ? 'rotate-0' : '-rotate-90 opacity-0'
        }`}
      >
        <Sun className="h-5 w-5" />
      </span>
    </Button>
  );
}