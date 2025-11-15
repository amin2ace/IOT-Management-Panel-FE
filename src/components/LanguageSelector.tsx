import { useTranslation } from "react-i18next";

export function LanguageSelector() {
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", label: "EN" },
    { code: "fa", label: "FA" },
    { code: "tr", label: "TR" },
    { code: "ar", label: "AR" },
  ];

  return (
    <select
      className="
        p-2 rounded-lg border bg-white/60 dark:bg-gray-800/60 
        border-gray-300 dark:border-gray-600 shadow
      "
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
    >
      {languages.map((l) => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  );
}
