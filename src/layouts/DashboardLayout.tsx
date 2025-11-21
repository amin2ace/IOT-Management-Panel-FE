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
      <DashboardHeader showProfile={true} />
      <div className="dashboardLayout">
        {/* SIDEBAR */}
        <aside className="dashboardLayoutSidebar">
          <h1 className="dashboardLayoutSidebarTitle">IoT Panel</h1>

          <nav className="dashboardLayoutSidebarTab">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                p-3 rounded-lg text-sm font-medium transition
                ${
                  pathname === item.path
                    ? "dashboardLayoutSidebarTabSelected"
                    : "dashboardLayoutTabNotSidebarSelected"
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
