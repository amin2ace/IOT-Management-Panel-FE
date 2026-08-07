import { useTranslation } from "react-i18next";
import { Globe, ChevronDown } from "lucide-react";

export function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: "en", label: t("lang.en") },
    { code: "fa", label: t("lang.fa") },
    { code: "tr", label: t("lang.tr") },
    { code: "ar", label: t("lang.ar") },
  ];

  return (
    <div className="relative flex h-9 items-center rounded-lg border border-gray-200 bg-white pl-2.5 pr-1 dark:border-gray-700 dark:bg-gray-900">
      <Globe className="pointer-events-none h-4 w-4 shrink-0 text-gray-400 dark:text-gray-500" />
      <select
        aria-label={t("lang.selectLabel", "Select language")}
        className="cursor-pointer appearance-none bg-transparent py-1.5 pl-2 pr-6 text-sm font-semibold tracking-wide text-gray-700 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:text-gray-200"
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
      >
        {languages.map((l) => (
          <option
            key={l.code}
            value={l.code}
            className="font-sans text-sm font-medium"
          >
            {l.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute end-2 h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
    </div>
  );
}
