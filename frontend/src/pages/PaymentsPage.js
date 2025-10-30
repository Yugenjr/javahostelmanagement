import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  LinearProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  AttachMoney,
  CheckCircle,
  Pending,
  Warning,
  Receipt,
  Download,
  Payment,
  TrendingUp,
  AccountBalance,
} from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';
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
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import './PaymentsPage.css';

const COLORS = ['#4caf50', '#ff9800', '#f44336', '#2196f3'];

const PaymentsPage = () => {
  const { user, isStudent } = useAuth();
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openPayDialog, setOpenPayDialog] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [paymentData, setPaymentData] = useState({
    paymentMethod: 'UPI',
    transactionId: '',
  });

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      setLoading(true);
      console.log('Fetching fees from database...');
      const response = await api.get('/api/fees');
      console.log('Fees response:', response.data);

      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setFees(response.data);
        toast.success(`Loaded ${response.data.length} fee records from database!`);
      } else {
        loadMockData();
      }
    } catch (error) {
      console.error('Database not available, using mock data:', error);
      loadMockData();
    } finally {
      setLoading(false);
    }
  };

  const loadMockData = () => {
    const mockFees = [
      { id: 1, student: { firstName: 'Alice', lastName: 'Johnson' }, amount: 5000, feeType: 'HOSTEL_FEE', month: 10, year: 2025, dueDate: '2025-10-10', paymentStatus: 'PAID', transactionId: 'TXN001', paidDate: '2025-10-05' },
      { id: 2, student: { firstName: 'Alice', lastName: 'Johnson' }, amount: 5000, feeType: 'HOSTEL_FEE', month: 11, year: 2025, dueDate: '2025-11-10', paymentStatus: 'PENDING' },
      { id: 3, student: { firstName: 'Bob', lastName: 'Smith' }, amount: 4000, feeType: 'HOSTEL_FEE', month: 10, year: 2025, dueDate: '2025-10-10', paymentStatus: 'PAID', transactionId: 'TXN002', paidDate: '2025-10-06' },
      { id: 4, student: { firstName: 'Bob', lastName: 'Smith' }, amount: 4000, feeType: 'HOSTEL_FEE', month: 11, year: 2025, dueDate: '2025-11-10', paymentStatus: 'PENDING' },
      { id: 5, student: { firstName: 'Carol', lastName: 'Williams' }, amount: 4000, feeType: 'HOSTEL_FEE', month: 10, year: 2025, dueDate: '2025-10-10', paymentStatus: 'OVERDUE' },
      { id: 6, student: { firstName: 'David', lastName: 'Brown' }, amount: 3500, feeType: 'HOSTEL_FEE', month: 10, year: 2025, dueDate: '2025-10-10', paymentStatus: 'PAID', transactionId: 'TXN003', paidDate: '2025-10-07' },
      { id: 7, student: { firstName: 'Emma', lastName: 'Davis' }, amount: 5500, feeType: 'HOSTEL_FEE', month: 10, year: 2025, dueDate: '2025-10-10', paymentStatus: 'PAID', transactionId: 'TXN004', paidDate: '2025-10-08' },
      { id: 8, student: { firstName: 'Emma', lastName: 'Davis' }, amount: 5500, feeType: 'HOSTEL_FEE', month: 11, year: 2025, dueDate: '2025-11-10', paymentStatus: 'PENDING' }
    ];
    setFees(mockFees);
    toast.info(`Showing ${mockFees.length} sample fee records`);
  };

  const handleOpenPayDialog = (fee) => {
    setSelectedFee(fee);
    setPaymentData({
      paymentMethod: 'UPI',
      transactionId: '',
    });
    setOpenPayDialog(true);
  };

  const handlePaymentSubmit = async () => {
    try {
      await api.put(`/api/fees/${selectedFee.id}/pay`, {
        ...paymentData,
        paidDate: new Date().toISOString().split('T')[0],
      });
      toast.success('Payment recorded successfully!');
      fetchFees();
      setOpenPayDialog(false);
    } catch (error) {
      toast.error('Failed to record payment');
    }
  };

  const downloadReceipt = (fee) => {
    toast.info('Downloading receipt...');
    // In real app, this would download a PDF receipt
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PAID':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'OVERDUE':
        return 'error';
      case 'PARTIAL':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PAID':
        return <CheckCircle />;
      case 'PENDING':
        return <Pending />;
      case 'OVERDUE':
        return <Warning />;
      default:
        return <AttachMoney />;
    }
  };

  // Calculate statistics
  const totalAmount = fees.reduce((sum, fee) => sum + parseFloat(fee.amount || 0), 0);
  const paidAmount = fees
    .filter(fee => fee.paymentStatus === 'PAID')
    .reduce((sum, fee) => sum + parseFloat(fee.amount || 0), 0);
  const pendingAmount = totalAmount - paidAmount;
  const paidCount = fees.filter(fee => fee.paymentStatus === 'PAID').length;

  // Data for charts
  const feeTypeData = [
    { name: 'Hostel Fee', value: fees.filter(f => f.feeType === 'HOSTEL_FEE').length },
    { name: 'Mess Fee', value: fees.filter(f => f.feeType === 'MESS_FEE').length },
    { name: 'Maintenance', value: fees.filter(f => f.feeType === 'MAINTENANCE_FEE').length },
    { name: 'Other', value: fees.filter(f => f.feeType === 'OTHER').length },
  ];

  const monthlyData = [
    { month: 'Jan', collected: 45000, pending: 5000 },
    { month: 'Feb', collected: 48000, pending: 3000 },
    { month: 'Mar', collected: 50000, pending: 2000 },
    { month: 'Apr', collected: 47000, pending: 4000 },
    { month: 'May', collected: 52000, pending: 1000 },
    { month: 'Jun', collected: 51000, pending: 2000 },
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box className="payments-container">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <Paper className="payments-header" elevation={0}>
        <Box>
          <Typography variant="h4" fontWeight="700" gutterBottom>
            <AttachMoney sx={{ fontSize: 40, verticalAlign: 'middle', mr: 1, color: '#4caf50' }} />
            Fee & Payment Management
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Track and manage hostel fee payments
          </Typography>
        </Box>
      </Paper>

      {/* Statistics Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card" sx={{ borderTop: '4px solid #4caf50' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Total Collected
                  </Typography>
                  <Typography variant="h4" component="div" fontWeight="700" color="#4caf50">
                    ₹{paidAmount.toLocaleString()}
                  </Typography>
                </Box>
                <CheckCircle sx={{ fontSize: 48, color: '#4caf50', opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card" sx={{ borderTop: '4px solid #ff9800' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Pending Amount
                  </Typography>
                  <Typography variant="h4" component="div" fontWeight="700" color="#ff9800">
                    ₹{pendingAmount.toLocaleString()}
                  </Typography>
                </Box>
                <Pending sx={{ fontSize: 48, color: '#ff9800', opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card" sx={{ borderTop: '4px solid #2196f3' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Total Records
                  </Typography>
                  <Typography variant="h4" component="div" fontWeight="700" color="#2196f3">
                    {fees.length}
                  </Typography>
                </Box>
                <Receipt sx={{ fontSize: 48, color: '#2196f3', opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card" sx={{ borderTop: '4px solid #667eea' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Collection Rate
                  </Typography>
                  <Typography variant="h4" component="div" fontWeight="700" color="#667eea">
                    {((paidCount / fees.length) * 100 || 0).toFixed(0)}%
                  </Typography>
                </Box>
                <TrendingUp sx={{ fontSize: 48, color: '#667eea', opacity: 0.3 }} />
              </Box>
              <LinearProgress
                variant="determinate"
                value={(paidCount / fees.length) * 100 || 0}
                sx={{ mt: 2, height: 8, borderRadius: 4 }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={8}>
          <Card className="chart-card">
            <CardContent>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                Monthly Collection Trends
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="collected" fill="#4caf50" name="Collected (₹)" />
                  <Bar dataKey="pending" fill="#ff9800" name="Pending (₹)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card className="chart-card">
            <CardContent>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                Fee Type Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={feeTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {feeTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Fee Records Table */}
      <Card className="table-card">
        <CardContent>
          <Typography variant="h6" fontWeight="600" gutterBottom>
            Fee Records
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>Fee Type</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Payment Method</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fees.map((fee) => (
                  <TableRow key={fee.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight="600">
                        {fee.student ? `${fee.student.firstName} ${fee.student.lastName}` : 'N/A'}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {fee.month}/{fee.year}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={fee.feeType} size="small" />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight="700" color="#4caf50">
                        ₹{parseFloat(fee.amount || 0).toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {format(new Date(fee.dueDate), 'MMM dd, yyyy')}
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(fee.paymentStatus)}
                        label={fee.paymentStatus}
                        color={getStatusColor(fee.paymentStatus)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {fee.paymentMethod ? (
                        <Chip label={fee.paymentMethod} size="small" variant="outlined" />
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        {fee.paymentStatus === 'PENDING' && isStudent && (
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                            startIcon={<Payment />}
                            onClick={() => handleOpenPayDialog(fee)}
                          >
                            Pay Now
                          </Button>
                        )}
                        {fee.paymentStatus === 'PAID' && (
                          <Tooltip title="Download Receipt">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => downloadReceipt(fee)}
                            >
                              <Download />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Payment Dialog */}
      <Dialog open={openPayDialog} onClose={() => setOpenPayDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Make Payment
        </DialogTitle>
        <DialogContent>
          {selectedFee && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                  <Typography variant="body2" color="textSecondary">Amount to Pay</Typography>
                  <Typography variant="h4" fontWeight="700" color="#4caf50">
                    ₹{parseFloat(selectedFee.amount || 0).toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {selectedFee.feeType} - {selectedFee.month}/{selectedFee.year}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Payment Method"
                  value={paymentData.paymentMethod}
                  onChange={(e) => setPaymentData({ ...paymentData, paymentMethod: e.target.value })}
                >
                  <MenuItem value="CASH">Cash</MenuItem>
                  <MenuItem value="CARD">Credit/Debit Card</MenuItem>
                  <MenuItem value="BANK_TRANSFER">Bank Transfer</MenuItem>
                  <MenuItem value="UPI">UPI</MenuItem>
                  <MenuItem value="CHEQUE">Cheque</MenuItem>
                  <MenuItem value="ONLINE">Online Payment</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Transaction ID / Reference Number"
                  value={paymentData.transactionId}
                  onChange={(e) => setPaymentData({ ...paymentData, transactionId: e.target.value })}
                  required
                  placeholder="Enter transaction reference"
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenPayDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="success"
            onClick={handlePaymentSubmit}
            disabled={!paymentData.transactionId}
            startIcon={<Payment />}
          >
            Confirm Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PaymentsPage;

