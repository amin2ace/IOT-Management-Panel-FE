import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";
import "@/index.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import TelemetryPage from "./pages/Devices/TelemetryPage";
import HmiPage from "./pages/HmiPage";
import "./i18n";
import DashboardLayout from "./layouts/DashboardLayout";
import LoginPage from "./pages/Auth/Login";
import { SignupPage } from "./pages";
import ConfigPage from "./pages/Devices/ConfigPage";
import Landing from "./App";
import { Toaster } from "react-hot-toast";
import HomeDashboard from "./pages/HomeDashboard";
import DiscoveryPage from "./pages/Devices/DiscoveryPage";
import AssignPage from "./pages/Devices/AssignPage";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<DashboardLayout />}>
              <Route index path="/dashboard" element={<HomeDashboard />} />
              <Route path="/devices/discover" element={<DiscoveryPage />} />
              <Route path="/devices/assign" element={<AssignPage />} />
              <Route path="/devices/configure" element={<ConfigPage />} />
              <Route path="/devices/telemetry" element={<TelemetryPage />} />
              <Route path="hmi" element={<HmiPage />} />
            </Route>
          </Routes>
          <Toaster position="top-center" />
        </BrowserRouter>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
