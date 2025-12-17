import { useTranslation } from "react-i18next";

enum ConfigTabs {
  "NETWORK" = "network",
  "LOGGING" = "logging",
  "OTA" = "ota",
  "LOCATION" = "location",
}

interface ConfigTabsNavigationProps {
  activeTab: ConfigTabs;
  onTabChange: (tab: ConfigTabs) => void;
}

export { ConfigTabs };

export default function ConfigTabsNavigation({
  activeTab,
  onTabChange,
}: ConfigTabsNavigationProps) {
  const { t } = useTranslation();
  const tabs = ["network", "logging", "ota", "location"];

  return (
    <div className="border-b border-gray-700 flex gap-4 mt-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onTabChange(tab as ConfigTabs)}
          className={`pb-2 capitalize transition-colors ${
            activeTab === tab
              ? "border-b-2 border-indigo-500 text-indigo-400"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          {t(`config.tab.${tab}`)}
        </button>
      ))}
    </div>
  );
}
