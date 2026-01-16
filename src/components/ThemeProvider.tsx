"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

/**
 * ThemeContext provides the current theme (light or dark) and a function to toggle
 * between them.  The selected theme is persisted in local storage and applied
 * to the `<html>` element via the `dark` class.
 */
type ThemeContextValue = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // On mount read the stored theme from localStorage and apply it.
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('theme') : null;
    const initial = stored === 'dark' ? 'dark' : 'light';
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);

  // Toggle the theme and persist it.
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('theme', newTheme);
    }
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}