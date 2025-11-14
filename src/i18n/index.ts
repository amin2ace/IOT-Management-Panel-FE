import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import fa from "./locales/fa.json";
import tr from "./locales/tr.json";
import ar from "./locales/ar.json";
import { applyDirection } from "./setDirection";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fa: { translation: fa },
      tr: { translation: tr },
      ar: { translation: ar },
    },
    fallbackLng: "en",
    debug: false,
    interpolation: { escapeValue: false },
    detection: {
      order: ["querystring", "localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

// ✅ Apply direction based on current language
applyDirection(i18n.language);

// ✅ Listen for language changes
i18n.on("languageChanged", (lng) => applyDirection(lng));

export default i18n;
