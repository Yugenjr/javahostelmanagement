import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, CircularProgress } from '@mui/material';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginNew';
import DashboardNew from './pages/DashboardNew';
import RoomsPage from './pages/RoomsPage';
import StudentsPage from './pages/StudentsPage';
import ComplaintsPage from './pages/ComplaintsPage';
import PaymentsPage from './pages/PaymentsPage';
import MyRoomPage from './pages/MyRoomPage';
import MyFeesPage from './pages/MyFeesPage';
import MyComplaintsPage from './pages/MyComplaintsPage';
import EventsPage from './pages/EventsPage';
import LayoutNew from './components/LayoutNew';

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
    background: {
      default: '#f5f7fa',
    },
    success: {
      main: '#4caf50',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 12,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

// Settings Page Placeholder
const SettingsPage = () => (
  <Box sx={{ padding: '24px' }}>
    <h2>Settings Page - Coming Soon</h2>
    <p>User settings and preferences will be available here.</p>
  </Box>
);

// Reports Page Placeholder
const ReportsPage = () => (
  <Box sx={{ padding: '24px' }}>
    <h2>Reports Page - Coming Soon</h2>
    <p>Comprehensive reports and analytics will be available here.</p>
  </Box>
);

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />}
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <LayoutNew>
              <DashboardNew />
            </LayoutNew>
          </ProtectedRoute>
        }
      />
      <Route
        path="/rooms"
        element={
          <ProtectedRoute>
            <LayoutNew>
              <RoomsPage />
            </LayoutNew>
          </ProtectedRoute>
        }
      />
      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <LayoutNew>
              <StudentsPage />
            </LayoutNew>
          </ProtectedRoute>
        }
      />
      <Route
        path="/complaints"
        element={
          <ProtectedRoute>
            <LayoutNew>
              <ComplaintsPage />
            </LayoutNew>
          </ProtectedRoute>
        }
      />
      <Route
        path="/payments"
        element={
          <ProtectedRoute>
            <LayoutNew>
              <PaymentsPage />
            </LayoutNew>
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-room"
        element={
          <ProtectedRoute>
            <LayoutNew>
              <MyRoomPage />
            </LayoutNew>
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-fees"
        element={
          <ProtectedRoute>
            <LayoutNew>
              <MyFeesPage />
            </LayoutNew>
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-complaints"
        element={
          <ProtectedRoute>
            <LayoutNew>
              <MyComplaintsPage />
            </LayoutNew>
          </ProtectedRoute>
        }
      />
      <Route
        path="/events"
        element={
          <ProtectedRoute>
            <LayoutNew>
              <EventsPage />
            </LayoutNew>
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <LayoutNew>
              <ReportsPage />
            </LayoutNew>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <LayoutNew>
              <SettingsPage />
            </LayoutNew>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

