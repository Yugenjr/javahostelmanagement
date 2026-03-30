import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Button,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import {
  Assessment,
  PictureAsPdf,
  Download,
  TrendingUp,
  People,
  MeetingRoom,
  AttachMoney,
  ReportProblem,
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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api/axios';

const COLORS = ['#667eea', '#4facfe', '#f093fb', '#feca57', '#48dbfb', '#ff6b6b'];

const ReportsPage = () => {
  const [reportType, setReportType] = useState('overview');
  const [dateRange, setDateRange] = useState('month');
  const [loading, setLoading] = useState(false);

  const [reportData, setReportData] = useState({
    students: [],
    rooms: [],
    fees: [],
    complaints: [],
    statistics: {
      totalStudents: 0,
      totalRooms: 0,
      occupancyRate: 0,
      pendingFees: 0,
      collectedFees: 0,
      activeComplaints: 0,
      resolvedComplaints: 0,
    },
  });

  useEffect(() => {
    fetchReportData();
  }, [reportType, dateRange]);

  const fetchReportData = async () => {
    try {
      setLoading(true);

      const [studentsRes, roomsRes, feesRes, complaintsRes] = await Promise.all([
        api.get('/api/users?role=STUDENT').catch(() => ({ data: [] })),
        api.get('/api/rooms').catch(() => ({ data: [] })),
        api.get('/api/fees').catch(() => ({ data: [] })),
        api.get('/api/complaints').catch(() => ({ data: [] })),
      ]);

      const students = studentsRes.data || [];
      const rooms = roomsRes.data || [];
      const fees = feesRes.data || [];
      const complaints = complaintsRes.data || [];

      const occupiedRooms = rooms.filter(r => r.status === 'OCCUPIED').length;
      const occupancyRate = rooms.length > 0 ? ((occupiedRooms / rooms.length) * 100).toFixed(1) : 0;

      const pendingFees = fees.filter(f => f.paymentStatus === 'PENDING')
        .reduce((sum, f) => sum + parseFloat(f.amount || 0), 0);
      const collectedFees = fees.filter(f => f.paymentStatus === 'PAID')
        .reduce((sum, f) => sum + parseFloat(f.amount || 0), 0);

      const activeComplaints = complaints.filter(c => c.status === 'PENDING' || c.status === 'IN_PROGRESS').length;
      const resolvedComplaints = complaints.filter(c => c.status === 'RESOLVED').length;

      setReportData({
        students,
        rooms,
        fees,
        complaints,
        statistics: {
          totalStudents: students.length,
          totalRooms: rooms.length,
          occupancyRate,
          pendingFees,
          collectedFees,
          activeComplaints,
          resolvedComplaints,
        },
      });
    } catch (error) {
      console.error('Failed to fetch report data:', error);
      toast.error('Failed to load report data');
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = () => {
    toast.info('PDF export functionality coming soon!');
  };

  const handleExportExcel = () => {
    toast.info('Excel export functionality coming soon!');
  };

  // Chart data
  const monthlyData = [
    { month: 'Jan', students: 35, revenue: 175000 },
    { month: 'Feb', students: 38, revenue: 190000 },
    { month: 'Mar', students: 37, revenue: 185000 },
    { month: 'Apr', students: 40, revenue: 200000 },
    { month: 'May', students: 42, revenue: 210000 },
    { month: 'Jun', students: 45, revenue: 225000 },
  ];

  const complaintStatusData = [
    { name: 'Pending', value: reportData.statistics.activeComplaints },
    { name: 'Resolved', value: reportData.statistics.resolvedComplaints },
  ];

  const feeStatusData = [
    { name: 'Collected', value: reportData.statistics.collectedFees },
    { name: 'Pending', value: reportData.statistics.pendingFees },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} elevation={0}>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
          <Box display="flex" alignItems="center" gap={2}>
            <Assessment sx={{ fontSize: 40, color: 'white' }} />
            <Box>
              <Typography variant="h4" fontWeight="700" color="white">
                Reports & Analytics
              </Typography>
              <Typography variant="body1" color="rgba(255,255,255,0.9)">
                Comprehensive system reports and insights
              </Typography>
            </Box>
          </Box>
          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              startIcon={<PictureAsPdf />}
              onClick={handleExportPDF}
              sx={{ bgcolor: 'white', color: '#667eea', '&:hover': { bgcolor: '#f5f5f5' } }}
            >
              Export PDF
            </Button>
            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={handleExportExcel}
              sx={{ bgcolor: 'white', color: '#667eea', '&:hover': { bgcolor: '#f5f5f5' } }}
            >
              Export Excel
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              select
              label="Report Type"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <MenuItem value="overview">Overview</MenuItem>
              <MenuItem value="students">Students</MenuItem>
              <MenuItem value="rooms">Rooms</MenuItem>
              <MenuItem value="fees">Fees</MenuItem>
              <MenuItem value="complaints">Complaints</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              select
              label="Date Range"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <MenuItem value="week">This Week</MenuItem>
              <MenuItem value="month">This Month</MenuItem>
              <MenuItem value="quarter">This Quarter</MenuItem>
              <MenuItem value="year">This Year</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<Assessment />}
              onClick={fetchReportData}
              disabled={loading}
            >
              Generate Report
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Statistics Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderTop: '4px solid #667eea' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Total Students
                  </Typography>
                  <Typography variant="h3" fontWeight="700" color="#667eea">
                    {reportData.statistics.totalStudents}
                  </Typography>
                </Box>
                <People sx={{ fontSize: 40, color: '#667eea', opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderTop: '4px solid #4facfe' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Occupancy Rate
                  </Typography>
                  <Typography variant="h3" fontWeight="700" color="#4facfe">
                    {reportData.statistics.occupancyRate}%
                  </Typography>
                </Box>
                <MeetingRoom sx={{ fontSize: 40, color: '#4facfe', opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderTop: '4px solid #4caf50' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Fees Collected
                  </Typography>
                  <Typography variant="h3" fontWeight="700" color="#4caf50">
                    ₹{reportData.statistics.collectedFees.toLocaleString()}
                  </Typography>
                </Box>
                <AttachMoney sx={{ fontSize: 40, color: '#4caf50', opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderTop: '4px solid #ff9800' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Active Complaints
                  </Typography>
                  <Typography variant="h3" fontWeight="700" color="#ff9800">
                    {reportData.statistics.activeComplaints}
                  </Typography>
                </Box>
                <ReportProblem sx={{ fontSize: 40, color: '#ff9800', opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                Monthly Trends
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
                    dataKey="students"
                    stroke="#667eea"
                    strokeWidth={3}
                    name="Students"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#4caf50"
                    strokeWidth={3}
                    name="Revenue (₹)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                Complaint Status
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={complaintStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {complaintStatusData.map((entry, index) => (
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

      {/* Recent Activity Table */}
      <Card>
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
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportData.fees.slice(0, 10).map((fee, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {fee.student?.firstName} {fee.student?.lastName}
                    </TableCell>
                    <TableCell>₹{fee.amount}</TableCell>
                    <TableCell>{fee.feeType}</TableCell>
                    <TableCell>
                      <Chip
                        label={fee.paymentStatus}
                        color={fee.paymentStatus === 'PAID' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{fee.dueDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReportsPage;

