import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Wifi,
  Terminal,
  UploadCloud,
  MapPin,
  type LucideIcon,
} from "lucide-react";

enum ConfigTabs {
  "NETWORK" = "network",
  "LOGGING" = "logging",
  "OTA" = "ota",
  "LOCATION" = "location",
}

export { ConfigTabs };

interface ConfigTabsNavigationProps {
  activeTab: ConfigTabs;
  onTabChange: (tab: ConfigTabs) => void;
}

const tabIcons: Record<ConfigTabs, LucideIcon> = {
  [ConfigTabs.NETWORK]: Wifi,
  [ConfigTabs.LOGGING]: Terminal,
  [ConfigTabs.OTA]: UploadCloud,
  [ConfigTabs.LOCATION]: MapPin,
};

export default function ConfigTabsNavigation({
  activeTab,
  onTabChange,
}: ConfigTabsNavigationProps) {
  const { t } = useTranslation();
  const tabs = Object.values(ConfigTabs);

  return (
    <div
      role="tablist"
      aria-label={t("config.deviceConfiguration")}
      className="mt-6 flex gap-1 border-b border-gray-200 dark:border-gray-800"
    >
      {tabs.map((tab) => {
        const Icon = tabIcons[tab];
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            type="button"
            role="tab"
            id={`${tab}-tab`}
            aria-selected={isActive}
            aria-controls={`${tab}-panel`}
            onClick={() => onTabChange(tab)}
            className={clsxTab(isActive)}
          >
            <Icon className="h-4 w-4" />
            {t(`config.tab.${tab}`)}
            {isActive && (
              <motion.span
                layoutId="config-tab-indicator"
                className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-indigo-500"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

function clsxTab(isActive: boolean) {
  return `relative flex items-center gap-2 px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
    isActive
      ? "text-indigo-600 dark:text-indigo-400"
      : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
  }`;
}
