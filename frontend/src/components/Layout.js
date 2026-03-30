import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard', color: '#667eea' },
    { path: '/rooms', icon: '🏠', label: 'Rooms', color: '#f093fb' },
    { path: '/students', icon: '👥', label: 'Students', color: '#4facfe' },
    { path: '/complaints', icon: '⚠️', label: 'Complaints', color: '#43e97b' },
    { path: '/payments', icon: '💰', label: 'Payments', color: '#fa709a' },
    { path: '/reports', icon: '📈', label: 'Reports', color: '#a8edea' },
    { path: '/settings', icon: '⚙️', label: 'Settings', color: '#ffecd2' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon">🏨</div>
            {sidebarOpen && (
              <div className="logo-text">
                <h2>HMS</h2>
                <p>Hostel Management System</p>
              </div>
            )}
          </div>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.path}
              className={`nav-item ${location.pathname === item.path || (item.path === '/settings' && location.pathname.includes('settings')) ? 'active' : ''}`}
              onClick={() => {
                if (item.path === '/settings') {
                  // Navigate to role-specific settings
                  if (user?.role === 'ADMIN') {
                    navigate('/admin-settings');
                  } else if (user?.role === 'STUDENT') {
                    navigate('/student-settings');
                  } else if (user?.role === 'WARDEN') {
                    navigate('/warden-settings');
                  } else {
                    navigate('/settings');
                  }
                } else {
                  navigate(item.path);
                }
              }}
              style={{ '--item-color': item.color }}
            >
              <span className="nav-icon">{item.icon}</span>
              {sidebarOpen && <span className="nav-label">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">👤</div>
            {sidebarOpen && (
              <div className="user-info">
                <h4>Admin User</h4>
                <p>admin@hostel.com</p>
              </div>
            )}
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <span className="logout-icon">🚪</span>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="content-header">
          <div className="breadcrumb">
            <span className="breadcrumb-item">HMS</span>
            <span className="breadcrumb-separator">▶</span>
            <span className="breadcrumb-current">
              {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </span>
          </div>
          
          <div className="header-actions">
            <div className="search-container">
              <input type="text" placeholder="Search..." className="search-input" />
              <span className="search-icon">🔍</span>
            </div>
            
            <div className="notification-bell">
              <span className="bell-icon">🔔</span>
              <span className="notification-badge">3</span>
            </div>
          </div>
        </div>

        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;