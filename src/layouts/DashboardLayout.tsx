import DashboardHeader from "@/components/Header/DashboardHeader";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ChartBarIcon,
  MagnifyingGlassIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  SignalIcon,
  UserCircleIcon,
  BookmarkIcon,
  GlobeAltIcon,
  UserGroupIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { path: "/dashboard", label: t("path.dashboardTab"), icon: ChartBarIcon },
    {
      path: "/devices/discover",
      label: t("path.discoverTab"),
      icon: MagnifyingGlassIcon,
    },
    {
      path: "/devices/assign",
      label: t("path.assignTab"),
      icon: ClipboardDocumentListIcon,
    },
    {
      path: "/devices/configure",
      label: t("path.configureTab"),
      icon: Cog6ToothIcon,
    },
    {
      path: "/devices/telemetry",
      label: t("path.telemetryTab"),
      icon: SignalIcon,
    },
    { path: "/profile", label: t("path.profile"), icon: UserCircleIcon },
    { path: "/topics", label: t("path.topics"), icon: BookmarkIcon },
    { path: "/mqtt", label: t("path.mqttConfig"), icon: GlobeAltIcon },
    { path: "/users", label: t("path.users"), icon: UserGroupIcon },
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
          id="sidebar-nav"
          className={`
            sidebarNav
            ${isSidebarOpen ? "sidebarNavExpanded" : "sidebarNavCollapsed"}
          `}
          aria-hidden={
            !isSidebarOpen && window.innerWidth < 1024 ? "true" : "false"
          }
        >
          {/* Sidebar Header */}
          <div className="navHeader">
            {isSidebarOpen && (
              <h1 className="responsiveText">{t("nav.header")}</h1>
            )}
            {/* Desktop toggle button - hidden on mobile */}
            <button
              onClick={toggleSidebar}
              className="navHeaderButton"
              aria-label={
                isSidebarOpen ? "Close navigation" : "Open navigation"
              }
              aria-expanded={isSidebarOpen}
              aria-controls="sidebar-nav"
            >
              {isSidebarOpen ? (
                <XMarkIcon className="w-5 h-5" />
              ) : (
                <Bars3Icon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Navigation */}
          <nav className="navItemsContainer" aria-label="Main navigation">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`navItems group relative transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:focus-visible:outline-indigo-400 ${isActive ? "navItemsCurrent" : "navItemsOthers"}`}
                  title={!isSidebarOpen ? item.label : undefined}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={item.label}
                >
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 flex-none" />

                  {isSidebarOpen && (
                    <span className="navItemsLabel truncate">{item.label}</span>
                  )}

                  {/* Tooltip for collapsed state - only on desktop */}
                  {!isSidebarOpen && (
                    <div className="navItemsTooltip group-hover:opacity-100 group-focus-visible:opacity-100">
                      {item.label}
                    </div>
                  )}
                </Link>
              );
            })}
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
          <button
            onClick={toggleSidebar}
            className="mobileToggleButton"
            aria-label="Toggle navigation menu"
            aria-expanded={isSidebarOpen}
            aria-controls="sidebar-nav"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>

          <Outlet />
        </main>
      </div>
    </div>
  );
}
