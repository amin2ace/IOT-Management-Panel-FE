import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";
const STORAGE_KEY = "app-theme";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    return saved === "light" || saved === "dark" || saved === "system"
      ? saved
      : "system";
  });

  // Apply theme
  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const prefersDark = mediaQuery.matches;

    const apply = (t: Theme) => {
      if (t === "system") {
        if (prefersDark) root.classList.add("dark");
        else root.classList.remove("dark");
      } else {
        if (t === "dark") root.classList.add("dark");
        else root.classList.remove("dark");
      }
    };

    apply(theme);
    localStorage.setItem(STORAGE_KEY, theme);

    // react to system changes
    const mediaListener = (e: MediaQueryListEvent) => {
      if (theme === "system") root.classList.toggle("dark", e.matches);
    };
    mediaQuery.addEventListener("change", mediaListener);

    return () => {
      mediaQuery.removeEventListener("change", mediaListener);
    };
  }, [theme]);

  return { theme, setTheme };
}
