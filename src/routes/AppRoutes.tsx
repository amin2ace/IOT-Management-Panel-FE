import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout/Layout';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import Dashboard from '../pages/Dashboard/Dashboard';
import Devices from '../pages/Devices/Devices';
import Sensors from '../pages/Sensors/Sensors';
import Alerts from '../pages/Alerts/Alerts';
import Settings from '../pages/Settings/Settings';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const AppRoutes: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <Routes>
      {!isAuthenticated ? (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="devices" element={<Devices />} />
          <Route path="sensors" element={<Sensors />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      )}
    </Routes>
  );
};

export default AppRoutes;