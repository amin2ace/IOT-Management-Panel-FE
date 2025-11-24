import { useTranslation } from "react-i18next";

export default function HomeDashboard() {
  const { t } = useTranslation();

  const cards = [
    { title: t("dashboard.Clock"), value: "--" },
    { title: t("dashboard.uptime"), value: "--" },
    { title: t("dashboard.buadrate"), value: "--" },
    { title: t("dashboard.connectedSensors"), value: "--" },
    { title: t("dashboard.connectedControllers"), value: "--" },
    { title: t("dashboard.cpuUsage"), value: "-- %" },
    { title: t("dashboard.ramUsage"), value: "-- %" },
    { title: t("dashboard.errors"), value: "--" },
    { title: t("dashboard.warnings"), value: "--" },
  ];

  return (
    <div className="dashboardContainer">
      {/* HEADER */}
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">{t("dashboard.title1")}</h1>
      </header>

      {/* GRID CONTENT */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {cards.map((card) => (
          <div key={card.title} className="dashboardHomeContainerGrid">
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
