import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import AdminSettingsPage from './pages/AdminSettingsPage';
import StudentSettingsPage from './pages/StudentSettingsPage';
import WardenSettingsPage from './pages/WardenSettingsPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/rooms" element={<Layout><Dashboard /></Layout>} />
        <Route path="/students" element={<Layout><Dashboard /></Layout>} />
        <Route path="/complaints" element={<Layout><Dashboard /></Layout>} />
        <Route path="/payments" element={<Layout><Dashboard /></Layout>} />
        <Route path="/reports" element={<Layout><Dashboard /></Layout>} />
        <Route path="/settings" element={<Layout><Dashboard /></Layout>} />
        <Route
          path="/admin-settings"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <Layout><AdminSettingsPage /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-settings"
          element={
            <ProtectedRoute allowedRoles={['STUDENT']}>
              <Layout><StudentSettingsPage /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/warden-settings"
          element={
            <ProtectedRoute allowedRoles={['WARDEN']}>
              <Layout><WardenSettingsPage /></Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

