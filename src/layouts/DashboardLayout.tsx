import { Link, Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ThemeToggle from "@/components/ThemeToggle";

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();

  const navItems = [
    { path: "/devices/discover", label: t("discover") },
    { path: "/devices/assign", label: t("assign") },
    { path: "/devices/configure", label: t("configure") },
    { path: "/devices/telemetry", label: t("telemetry") },
  ];

  return (
    <div className="flex min-h-screen bg-surface-dark text-gray-100">
      {/* ================= Sidebar ================= */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-800/80 backdrop-blur-md border-r border-gray-700 p-6">
        <h2 className="text-xl font-semibold mb-8 text-indigo-400">
          IIoT Device Manager
        </h2>

        <nav className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === item.path
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-gray-700">
          <p className="text-xs text-gray-500 text-center">
            © {new Date().getFullYear()} IIoT Panel
          </p>
        </div>
      </aside>

      {/* ================= Main Content Area ================= */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* ------- Top Navbar ------- */}
        <header className="flex items-center justify-between px-6 py-3 border-b border-gray-700 bg-gray-900/60 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden inline-flex items-center p-2 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={() => alert("Sidebar toggle (mobile mode)")}
            >
              <svg
                className="w-6 h-6 text-gray-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-xl font-semibold tracking-wide text-indigo-300">
              {t("dashboard")}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* 🌍 Language Selector */}
            <select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              className="bg-gray-800/50 text-sm text-gray-200 px-2 py-1 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="en">EN</option>
              <option value="fa">FA</option>
              <option value="tr">TR</option>
              <option value="ar">AR</option>
            </select>

            {/* 🌓 Theme Toggle */}
            <ThemeToggle />
          </div>
        </header>

        {/* ------- Page Content ------- */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-900/40 backdrop-blur-md">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
