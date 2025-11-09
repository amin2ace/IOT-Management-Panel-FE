import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import all translation files
import enCommon from "../locales/en/common.json";
import enAuth from "../locales/en/auth.json";
import enDashboard from "../locales/en/dashboard.json";
import enDevices from "../locales/en/devices.json";
import enAlerts from "../locales/en/alerts.json";
import enSettings from "../locales/en/settings.json";

import faCommon from "../locales/fa/common.json";
import faAuth from "../locales/fa/auth.json";
import faDashboard from "../locales/fa/dashboard.json";
import faDevices from "../locales/fa/devices.json";
import faAlerts from "../locales/fa/alerts.json";
import faSettings from "../locales/fa/settings.json";

import deCommon from "../locales/de/common.json";
// Add other German namespaces as needed

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        auth: enAuth,
        dashboard: enDashboard,
        devices: enDevices,
        alerts: enAlerts,
        settings: enSettings,
      },
      fa: {
        common: faCommon,
        auth: faAuth,
        dashboard: faDashboard,
        devices: faDevices,
        alerts: faAlerts,
        settings: faSettings,
      },
      de: {
        common: deCommon,
        // Add other German namespaces here
      },
    },
    fallbackLng: "en",
    defaultNS: "common",
    ns: ["common", "auth", "dashboard", "devices", "alerts", "settings"],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
  });

export default i18n;
