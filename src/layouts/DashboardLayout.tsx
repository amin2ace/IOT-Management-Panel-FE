import { Link, Outlet, useLocation } from "react-router-dom";

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const navItems = [
    { path: "/devices/discover", label: "Discover" },
    { path: "/devices/assign", label: "Assign" },
    { path: "/devices/configure", label: "Configure" },
    { path: "/devices/telemetry", label: "Telemetry" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-4 space-y-2">
        <h2 className="text-lg font-semibold mb-6">Device Manager</h2>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block p-2 rounded ${
              pathname === item.path
                ? "bg-indigo-600 text-white"
                : "hover:bg-gray-700"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
