import React from 'react';
import { ThemeProvider } from './ThemeProvider';
import ThemeToggle from './ThemeToggle';

export default function ClientThemeToggle() {
  // ThemeProvider zapewnia kontekst, ThemeToggle daje animowany przycisk
  return (
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );
} 