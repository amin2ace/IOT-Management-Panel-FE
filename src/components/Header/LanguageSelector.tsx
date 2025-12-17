import { useTranslation } from "react-i18next";

export function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: "en", label: t("lang.en") },
    { code: "fa", label: t("lang.fa") },
    { code: "tr", label: t("lang.tr") },
    { code: "ar", label: t("lang.ar") },
  ];

  return (
    <select
      className="languageSelect"
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
