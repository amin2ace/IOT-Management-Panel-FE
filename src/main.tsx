import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";
// import App from "./App";
import "@/index.css";
import { Login } from "@/pages/Auth/Login";
// import { ProtectedRoute } from "./components/ProtectedRoute";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Dashboard } from "./pages/Dashboard";
import DiscoverPage from "./pages/Devices/DiscoverPage";
import AssignPage from "./pages/Devices/AssignPage";
import ConfigPage from "./pages/Devices/ConfigPage";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<App />} /> */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route index element={<DiscoverPage />} />
            <Route path="devices/discover" element={<DiscoverPage />} />
            <Route path="devices/assign" element={<AssignPage />} />
            <Route path="devices/config" element={<ConfigPage />} />
            {/* <Route path="devices/configure" element={<ConfigPage />} />
            <Route path="devices/telemetry" element={<TelemetryPage />} />{" "} */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
