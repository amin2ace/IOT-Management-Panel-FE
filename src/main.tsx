import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";
import "@/index.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import DiscoverPage from "./pages/Devices/DiscoverPage";
import Assign from "./pages/Devices/AssignPage";
import TelemetryPage from "./pages/Devices/TelemetryPage";
import HmiPage from "./pages/HmiPage";
import "./i18n";
import App from "./App";
import DashboardLayout from "./layouts/DashboardLayout";
import LoginPage from "./pages/Auth/Login";
import { SignupPage } from "./pages";
import ConfigPage from "./pages/Devices/ConfigPage";
import Color from "./pages/color";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="dashboard" element={<DashboardLayout />} />
            <Route path="test" element={<Color />} />
            <Route path="devices/discover" element={<DiscoverPage />} />
            <Route path="devices/assign" element={<Assign />} />
            <Route path="devices/configure" element={<ConfigPage />} />
            <Route path="devices/telemetry" element={<TelemetryPage />} />
            {/* <Route
              path="/topics"
              element={
                <RequireRole allowed={["SUPER_USER", "ADMIN"]}>
                  <TopicsPage />
                </RequireRole>
              }
            />
 */}
            <Route path="hmi" element={<HmiPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
