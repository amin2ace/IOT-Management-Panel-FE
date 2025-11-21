import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme, Theme } from "@/hooks/useTheme";
import { JSX } from "react";
import { useTranslation } from "react-i18next";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  const options: { label: string; value: Theme; icon: JSX.Element }[] = [
    {
      label: t("lightMode"),
      value: "light",
      icon: <Sun className="w-4 h-4" />,
    },
    { label: t("darkMode"), value: "dark", icon: <Moon className="w-4 h-4" /> },
    { label: "System", value: "system", icon: <Monitor className="w-4 h-4" /> },
  ];

  const handleThemeChange = (newTheme: Theme) => {
    console.log("🔄 ThemeToggle: Changing theme to", newTheme);
    setTheme(newTheme);

    // Immediate verification
    setTimeout(() => {
      const currentClass = document.documentElement.classList.contains("dark");
      const saved = localStorage.getItem("app-theme");
      console.log(
        "✅ Verification - Dark class:",
        currentClass,
        "Saved:",
        saved
      );
    }, 100);
  };

  return (
    <div className="themeToggle">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => handleThemeChange(opt.value)}
          className={`themeChange ${
            theme === opt.value ? "themeSelected" : "themeNotSelected"
          }`}
        >
          {opt.icon}
          <span className="themeLabel">{opt.label}</span>
        </button>
      ))}
    </div>
  );
}
