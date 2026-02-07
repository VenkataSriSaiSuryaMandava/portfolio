"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type ThemeContextValue = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // On mount, read stored theme or default to dark
  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? window.localStorage.getItem("theme")
        : null;

    const initial = stored === "light" ? "light" : "dark";

    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("theme", newTheme);
    }

    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}