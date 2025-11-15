import { Sun, Moon } from "lucide-react";
import { useTheme, Theme } from "@/hooks/useTheme";
import { JSX } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const options: { label: string; value: Theme; icon: JSX.Element }[] = [
    { label: "Light", value: "light", icon: <Sun className="w-4 h-4" /> },
    { label: "Dark", value: "dark", icon: <Moon className="w-4 h-4" /> },
    // { label: "System", value: "system", icon: <Monitor className="w-4 h-4" /> },
  ];

  return (
    <div className="flex gap-2 bg-gray-800/50 backdrop-blur-md border border-gray-700 p-2 rounded-xl">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setTheme(opt.value)}
          className={`flex items-center gap-1 px-3 py-1 rounded-md transition ${
            theme === opt.value
              ? "bg-indigo-500 text-white shadow"
              : "text-gray-400 hover:text-white hover:bg-gray-700/50"
          }`}
        >
          {opt.icon}
          <span className="hidden sm:inline text-sm font-medium">
            {opt.label}
          </span>
        </button>
      ))}
    </div>
  );
}
