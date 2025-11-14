import { Link, Outlet, useLocation } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

export default function DashboardLayout() {
  const { pathname } = useLocation();

  const navItems = [
    { path: "/devices/discover", label: "Discover" },
    { path: "/devices/assign", label: "Assign" },
    { path: "/devices/configure", label: "Configure" },
    { path: "/devices/telemetry", label: "Telemetry" },
    { path: "/mqtt/config", label: "MQTT Manager" },
    { path: "/users", label: "Users" },
    { path: "/topics", label: "Topics" },
  ];

  return (
    <div className="flex min-h-screen bg-surface-light dark:bg-surface-dark text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 dark:bg-gray-800 p-4 space-y-2 border-r border-gray-300 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">IoT Panel</h2>
          <ThemeToggle />
        </div>

        {navItems.map((item) => {
          const active = pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`block p-2 rounded font-medium transition ${
                active
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
