import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import './Dashboard.css';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const statsRes = await api.get('/dashboard/stats');
      setStats(statsRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>🏠 Hostel Management Dashboard</h1>
        <button onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/';
        }} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Total Students</h3>
            <div className="stat-number">{stats?.totalStudents || 0}</div>
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon">🏠</div>
          <div className="stat-content">
            <h3>Available Rooms</h3>
            <div className="stat-number">{stats?.availableRooms || 0}</div>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <h3>Pending Complaints</h3>
            <div className="stat-number">{stats?.pendingComplaints || 0}</div>
          </div>
        </div>

        <div className="stat-card info">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Fees Collected</h3>
            <div className="stat-number">₹{(stats?.totalFeesCollected || 0).toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="details-grid">
        <div className="detail-card">
          <h3>📊 Room Statistics</h3>
          <div className="detail-list">
            <div className="detail-item">
              <span>Total Rooms:</span>
              <span className="badge">{stats?.totalRooms || 0}</span>
            </div>
            <div className="detail-item">
              <span>Occupied Rooms:</span>
              <span className="badge error">{stats?.occupiedRooms || 0}</span>
            </div>
            <div className="detail-item">
              <span>Occupancy Rate:</span>
              <span className="badge info">
                {Math.round(((stats?.occupiedRooms || 0) / (stats?.totalRooms || 1)) * 100)}%
              </span>
            </div>
          </div>
        </div>

        <div className="detail-card">
          <h3>🎯 System Overview</h3>
          <div className="detail-list">
            <div className="detail-item">
              <span>Resolved Complaints:</span>
              <span className="badge success">{stats?.resolvedComplaints || 0}</span>
            </div>
            <div className="detail-item">
              <span>Total Wardens:</span>
              <span className="badge secondary">{stats?.totalWardens || 0}</span>
            </div>
            <div className="detail-item">
              <span>Resolution Rate:</span>
              <span className="badge primary">
                {Math.round(((stats?.resolvedComplaints || 0) / ((stats?.resolvedComplaints || 0) + (stats?.pendingComplaints || 1))) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h3>⚡ Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-btn primary">Add Room</button>
          <button className="action-btn success">View Complaints</button>
          <button className="action-btn info">Manage Users</button>
          <button className="action-btn warning">Generate Report</button>
        </div>
      </div>
    </div>
  );
}
