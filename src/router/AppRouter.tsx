import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "../components/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import { Login } from "@/pages";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DiscoveryPage />} />
          <Route path="devices/discover" element={<DiscoveryPage />} />
          <Route path="devices/assign" element={<AssignPage />} />
          <Route path="devices/configure" element={<ConfigurePage />} />
          <Route path="devices/telemetry" element={<TelemetryPage />} />
          <Route path="mqtt/config" element={<MqttConfigPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="topics" element={<TopicsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
