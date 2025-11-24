import DashboardHeader from "@/components/DashboardHeader";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { path: "/dashboard", label: t("path.dashboardTab"), icon: "📊" },
    { path: "/devices/discover", label: t("path.discoverTab"), icon: "🔍" },
    { path: "/devices/assign", label: t("path.assignTab"), icon: "📋" },
    { path: "/devices/configure", label: t("path.configureTab"), icon: "⚙️" },
    { path: "/devices/telemetry", label: t("path.telemetryTab"), icon: "📡" },
    { path: "/profile", label: t("path.profile"), icon: "👤" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when resizing to desktop or when route changes on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar when navigating on mobile
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [pathname]);

  return (
    <div className="min-h-screen">
      <DashboardHeader showProfile={true} />

      <div className="flex h-[calc(100vh-64px)]">
        {/* Mobile Overlay - Only shows on mobile when sidebar is open */}
        {isSidebarOpen && (
          <div
            className="sidebarSandwichOpen"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR - Hidden on mobile by default */}
        <aside
          className={`
            sidebarNav
            ${isSidebarOpen ? "sidebarNavExpanded" : "sidebarNavCollapsed"}
          `}
        >
          {/* Sidebar Header */}
          <div className="navHeader">
            {isSidebarOpen && (
              <h1 className="responsiveText">{t("nav.header")}</h1>
            )}
            {/* Desktop toggle button - hidden on mobile */}
            <button onClick={toggleSidebar} className="navHeaderButton">
              {isSidebarOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* Navigation */}
          <nav className="navItemsContainer">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`navItems group relative ${pathname === item.path ? "navItemsCurrent" : "navItemsOthers"}`}
                title={!isSidebarOpen ? item.label : undefined}
              >
                <span className="text-base lg:text-lg shrink-0">
                  {item.icon}
                </span>

                {isSidebarOpen && (
                  <span className="navItemsLabel">{item.label}</span>
                )}

                {/* Tooltip for collapsed state - only on desktop */}
                {!isSidebarOpen && (
                  <div className="navItemsTooltip group-hover:opacity-100">
                    {item.label}
                  </div>
                )}
              </Link>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT - Full width on mobile */}
        <main
          className={`
            mainContent
            ${isSidebarOpen ? "mainContentExpanded" : ""}
          `}
        >
          {/* Mobile toggle button - Only visible on mobile devices */}
          <button onClick={toggleSidebar} className="mobileToggleButton">
            ☰
          </button>

          <Outlet />
        </main>
      </div>
    </div>
  );
}
