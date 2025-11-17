import { useTranslation } from "react-i18next";

export function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: "en", label: t("en") },
    { code: "fa", label: t("fa") },
    { code: "tr", label: t("tr") },
    { code: "ar", label: t("ar") },
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
