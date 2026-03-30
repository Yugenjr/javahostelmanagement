import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  CircularProgress,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from '@mui/material';
import {
  Hotel,
  People,
  ReportProblem,
  AttachMoney,
  TrendingUp,
  CheckCircle,
  Pending,
  Warning,
  MeetingRoom,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import api, { isMockMode } from '../api/axios';
import './DashboardNew.css';

const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];

const DashboardNew = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [recentFees, setRecentFees] = useState([]);
  const [roomData, setRoomData] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [statsRes, complaintsRes, feesRes, roomsRes] = await Promise.all([
        api.get('/api/dashboard/stats'),
        api.get('/api/complaints'),
        api.get('/api/fees'),
        api.get('/api/rooms'),
      ]);

      setStats(statsRes.data);
      setRecentComplaints(complaintsRes.data.slice(0, 5));
      setRecentFees(feesRes.data.slice(0, 5));

      // Process room data for charts
      const rooms = roomsRes.data;
      const roomTypeData = [
        { name: 'Single', value: rooms.filter(r => r.roomType === 'SINGLE').length },
        { name: 'Double', value: rooms.filter(r => r.roomType === 'DOUBLE').length },
        { name: 'Triple', value: rooms.filter(r => r.roomType === 'TRIPLE').length },
      ];
      setRoomData(roomTypeData);

    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  const StatCard = ({ title, value, icon, color, subtitle, trend }) => (
    <Card className="stat-card" sx={{ borderTop: `4px solid ${color}` }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h3" component="div" fontWeight="700" color={color}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="textSecondary" mt={1}>
                {subtitle}
              </Typography>
            )}
            {trend && (
              <Box display="flex" alignItems="center" mt={1}>
                <TrendingUp fontSize="small" color="success" />
                <Typography variant="body2" color="success.main" ml={0.5}>
                  {trend}
                </Typography>
              </Box>
            )}
          </Box>
          <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'warning',
      IN_PROGRESS: 'info',
      RESOLVED: 'success',
      CLOSED: 'default',
      PAID: 'success',
      OVERDUE: 'error',
    };
    return colors[status] || 'default';
  };

  const monthlyData = [
    { month: 'Jan', occupancy: 65, revenue: 180000 },
    { month: 'Feb', occupancy: 70, revenue: 195000 },
    { month: 'Mar', occupancy: 68, revenue: 190000 },
    { month: 'Apr', occupancy: 75, revenue: 210000 },
    { month: 'May', occupancy: 72, revenue: 200000 },
    { month: 'Jun', occupancy: 76, revenue: 215000 },
  ];

  return (
    <Box className="dashboard-container">
      {/* Header */}
      <Box className="dashboard-header">
        <Box>
          <Typography variant="h4" fontWeight="700" gutterBottom>
            Welcome back, {user?.firstName}! 👋
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Here's what's happening in your hostel today
          </Typography>
        </Box>
        {isMockMode() && (
          <Chip
            label="Demo Mode - Using Mock Data"
            color="warning"
            icon={<Warning />}
            sx={{ height: 40, fontSize: '14px' }}
          />
        )}
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Rooms"
            value={stats?.totalRooms || 50}
            icon={<MeetingRoom />}
            color="#667eea"
            subtitle={`${stats?.availableRooms || 10} available`}
            trend="+5% from last month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Students"
            value={stats?.totalStudents || 38}
            icon={<People />}
            color="#f093fb"
            subtitle={`${stats?.occupancyRate || 76}% occupancy`}
            trend="+12% from last month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Complaints"
            value={stats?.pendingComplaints || 12}
            icon={<ReportProblem />}
            color="#feca57"
            subtitle={`${stats?.resolvedComplaints || 28} resolved`}
            trend="-8% from last month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Revenue (This Month)"
            value={`₹${(stats?.collectedFees || 165000).toLocaleString()}`}
            icon={<AttachMoney />}
            color="#48dbfb"
            subtitle={`₹${(stats?.pendingFees || 25000).toLocaleString()} pending`}
            trend="+18% from last month"
          />
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={8}>
          <Card className="chart-card">
            <CardContent>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                Occupancy & Revenue Trends
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="occupancy"
                    stroke="#667eea"
                    strokeWidth={3}
                    name="Occupancy %"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#48dbfb"
                    strokeWidth={3}
                    name="Revenue (₹)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card className="chart-card">
            <CardContent>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                Room Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={roomData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {roomData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tables Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card className="table-card">
            <CardContent>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                Recent Complaints
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Priority</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentComplaints.map((complaint) => (
                      <TableRow key={complaint.id} hover>
                        <TableCell>{complaint.title}</TableCell>
                        <TableCell>
                          <Chip label={complaint.type} size="small" />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={complaint.status}
                            size="small"
                            color={getStatusColor(complaint.status)}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={complaint.priority}
                            size="small"
                            color={getStatusColor(complaint.status)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className="table-card">
            <CardContent>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                Recent Fee Payments
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Student</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentFees.map((fee) => (
                      <TableRow key={fee.id} hover>
                        <TableCell>
                          {fee.student ? `${fee.student.firstName} ${fee.student.lastName}` : 'N/A'}
                        </TableCell>
                        <TableCell fontWeight="600">₹{fee.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Chip label={fee.feeType} size="small" />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={fee.paymentStatus}
                            size="small"
                            color={getStatusColor(fee.paymentStatus)}
                            icon={fee.paymentStatus === 'PAID' ? <CheckCircle /> : <Pending />}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Stats Bar */}
      <Card className="quick-stats-card" sx={{ mt: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <Box textAlign="center">
                <Typography variant="body2" color="textSecondary">
                  Occupancy Rate
                </Typography>
                <Box position="relative" display="inline-flex" mt={1}>
                  <CircularProgress
                    variant="determinate"
                    value={stats?.occupancyRate || 76}
                    size={80}
                    thickness={6}
                    sx={{ color: '#667eea' }}
                  />
                  <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography variant="h6" component="div" color="text.secondary">
                      {stats?.occupancyRate || 76}%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Collection Progress (This Month)
              </Typography>
              <Box mt={2}>
                <LinearProgress
                  variant="determinate"
                  value={((stats?.collectedFees || 165000) / (stats?.totalRevenue || 190000)) * 100}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    bgcolor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                    },
                  }}
                />
                <Box display="flex" justifyContent="space-between" mt={1}>
                  <Typography variant="body2" color="textSecondary">
                    ₹{(stats?.collectedFees || 165000).toLocaleString()} collected
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    ₹{(stats?.totalRevenue || 190000).toLocaleString()} total
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DashboardNew;

