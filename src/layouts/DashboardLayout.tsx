import DashboardHeader from "@/components/DashboardHeader";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { path: "/dashboard", label: t("dashboardTab") },
    { path: "/devices/discover", label: t("discoverTab") },
    { path: "/devices/assign", label: t("assignTab") },
    { path: "/devices/configure", label: t("configureTab") },
    { path: "/devices/telemetry", label: t("telemetryTab") },
  ];

  return (
    <div>
      <div>
        <DashboardHeader />
      </div>

      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        {/* SIDEBAR */}
        <aside
          className="
        w-64 h-screen sticky top-0 p-5 bg-white/70 dark:bg-gray-800/80 
        backdrop-blur-xl border-r border-gray-300/40 dark:border-gray-700/40
        shadow-md flex flex-col
        "
        >
          <h1 className="text-xl font-bold mb-8">IoT Panel</h1>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                p-3 rounded-lg text-sm font-medium transition
                ${
                  pathname === item.path
                    ? "bg-indigo-600 text-white shadow"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }
              `}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
