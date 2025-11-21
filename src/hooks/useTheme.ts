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

    const applyTheme = (t: Theme) => {
      // Get fresh system preference each time
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const shouldBeDark = t === "system" ? systemPrefersDark : t === "dark";

      console.log("🎨 Applying:", t, "Dark:", shouldBeDark);
      root.classList.toggle("dark", shouldBeDark);
    };

    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);

    // React to system changes
    const handleSystemChange = (e: MediaQueryListEvent) => {
      console.log("💻 System theme changed:", e.matches);
      if (theme === "system") {
        root.classList.toggle("dark", e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [theme]);

  return { theme, setTheme };
}
