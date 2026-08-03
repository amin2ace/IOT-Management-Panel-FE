import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme, Theme } from "@/hooks/useTheme";
import { JSX } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  const options: { label: string; value: Theme; icon: JSX.Element }[] = [
    {
      label: t("theme.lightMode"),
      value: "light",
      icon: <Sun className="h-4 w-4" />,
    },
    {
      label: t("theme.darkMode"),
      value: "dark",
      icon: <Moon className="h-4 w-4" />,
    },
    {
      label: t("theme.system"),
      value: "system",
      icon: <Monitor className="h-4 w-4" />,
    },
  ];

  return (
    <div
      role="radiogroup"
      aria-label={t("theme.label", "Theme")}
      className="relative flex items-center gap-0.5 rounded-lg bg-gray-100 p-1 dark:bg-gray-800"
    >
      {options.map((opt) => {
        const isSelected = theme === opt.value;
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={isSelected}
            aria-label={opt.label}
            onClick={() => setTheme(opt.value)}
            className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:w-auto sm:px-2.5 ${
              isSelected
                ? "text-gray-900 dark:text-white"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            {isSelected && (
              <motion.span
                layoutId="theme-toggle-indicator"
                className="absolute inset-0 -z-10 rounded-md bg-white shadow-sm dark:bg-gray-700"
                transition={{ type: "spring", duration: 0.3, bounce: 0.2 }}
              />
            )}
            {opt.icon}
            <span className="sr-only sm:not-sr-only sm:ms-1.5 sm:text-xs sm:font-medium">
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
