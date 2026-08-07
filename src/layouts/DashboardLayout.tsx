import DashboardHeader from "@/components/Header/DashboardHeader";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
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
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";

const DESKTOP_BREAKPOINT = 1024;
const SIDEBAR_COLLAPSED_KEY = "sidebar:collapsed";

/** Tracks the desktop breakpoint reactively (avoids reading window.innerWidth at render time). */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () =>
      typeof window !== "undefined" && window.innerWidth >= DESKTOP_BREAKPOINT,
  );

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isDesktop;
}

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const isDesktop = useIsDesktop();

  // Mobile drawer open/closed (transient)
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  // Desktop rail expanded/collapsed (persisted preference)
  const [isCollapsed, setIsCollapsed] = useState(
    () =>
      typeof window !== "undefined" &&
      window.localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "1",
  );

  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isFirstRender = useRef(true);

  const navItems = useMemo(
    () => [
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
    ],
    [t],
  );

  const toggleDesktopCollapse = useCallback(() => {
    setIsCollapsed((prev) => {
      const next = !prev;
      window.localStorage.setItem(SIDEBAR_COLLAPSED_KEY, next ? "1" : "0");
      return next;
    });
  }, []);

  // Close the mobile drawer whenever the route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Escape closes the mobile drawer
  useEffect(() => {
    if (!isMobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMobileOpen]);

  // Lock body scroll while the drawer is open, and manage focus
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      mobileToggleRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const showLabels = isDesktop ? !isCollapsed : true;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <DashboardHeader showProfile={true} />

      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        {/* Mobile backdrop */}
        <AnimatePresence>
          {isMobileOpen && !isDesktop && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-30 bg-gray-900/50 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileOpen(false)}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <aside
          id="sidebar-nav"
          role={!isDesktop ? "dialog" : undefined}
          aria-modal={!isDesktop ? isMobileOpen : undefined}
          aria-label={t("nav.header")}
          aria-hidden={!isMobileOpen && !isDesktop}
          className={clsx(
            "z-40 flex flex-col border-e border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900",
            "transition-[width,transform] duration-200 ease-out",
            // Desktop: static column, width toggles between rail and full
            "lg:static lg:translate-x-0 lg:rtl:translate-x-0",
            isCollapsed ? "lg:w-20" : "lg:w-64",
            // Mobile: fixed overlay drawer
            "fixed inset-y-0 start-0 w-72",
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full rtl:translate-x-full",
          )}
        >
          {/* Sidebar header */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-800">
            {showLabels && (
              <h1 className="truncate text-sm font-semibold tracking-wide text-gray-900 dark:text-gray-100">
                {t("nav.header")}
              </h1>
            )}

            {/* Mobile close button */}
            <button
              ref={closeButtonRef}
              onClick={() => setIsMobileOpen(false)}
              className="ms-auto rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100 lg:hidden"
              aria-label={t("nav.close", "Close navigation")}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            {/* Desktop collapse toggle */}
            <button
              onClick={toggleDesktopCollapse}
              className={clsx(
                "hidden rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100 lg:flex",
                isCollapsed && "mx-auto",
              )}
              aria-label={
                isCollapsed
                  ? t("nav.expand", "Expand navigation")
                  : t("nav.collapse", "Collapse navigation")
              }
              aria-expanded={!isCollapsed}
              aria-controls="sidebar-nav"
            >
              <ChevronLeftIcon
                className={clsx(
                  "h-5 w-5 transition-transform duration-200",
                  isCollapsed && "rotate-180",
                )}
              />
            </button>
          </div>

          {/* Navigation */}
          <nav
            className="flex-1 space-y-1 overflow-y-auto px-3 py-4"
            aria-label={t("nav.header")}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={clsx(
                    "group relative flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150",
                    "focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:focus-visible:outline-indigo-400",
                    isCollapsed && isDesktop ? "justify-center" : "gap-3",
                    isActive
                      ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon
                    className={clsx(
                      "h-5 w-5 shrink-0",
                      isActive
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-gray-400 dark:text-gray-500",
                    )}
                  />

                  {showLabels && <span className="truncate">{item.label}</span>}

                  {isCollapsed && isDesktop && (
                    <span
                      role="tooltip"
                      className="pointer-events-none absolute start-full top-1/2 z-50 ms-2 -translate-y-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 dark:bg-gray-700"
                    >
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex flex-1 flex-col overflow-y-auto">
          <div className="flex items-center border-b border-gray-200 px-4 py-3 dark:border-gray-800 lg:hidden">
            <button
              ref={mobileToggleRef}
              onClick={() => setIsMobileOpen(true)}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
              aria-label={t("nav.open", "Open navigation")}
              aria-expanded={isMobileOpen}
              aria-controls="sidebar-nav"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
