import { useTranslation } from "react-i18next";

export default function HomeDashboard() {
  const { t } = useTranslation();

  const cards = [
    { title: t("dashboard.connectedDevices"), value: "--" },
    { title: t("dashboard.cpuUsage"), value: "-- %" },
    { title: t("dashboard.ramUsage"), value: "-- %" },
    { title: t("dashboard.errors"), value: "--" },
    { title: t("dashboard.warnings"), value: "--" },
    { title: t("dashboard.uptime"), value: "--" },
  ];

  return (
    <div className="flex flex-col w-full h-full bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* HEADER */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {t("dashboard.title")}
        </h1>
      </header>

      {/* GRID CONTENT */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="
              p-6 rounded-xl shadow-lg 
              bg-white/60 dark:bg-gray-800/40 
              backdrop-blur-xl border border-gray-300/40 dark:border-gray-700/40
              hover:shadow-xl transition-all cursor-pointer
            "
          >
            <h2 className="text-gray-600 dark:text-gray-300 text-sm">
              {card.title}
            </h2>
            <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">
              {card.value}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
