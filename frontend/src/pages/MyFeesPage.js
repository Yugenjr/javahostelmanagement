import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  AttachMoney,
  CheckCircle,
  Pending,
  Warning,
  Payment,
  Receipt,
  TrendingUp,
} from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import './MyFeesPage.css';

const MyFeesPage = () => {
  const { user } = useAuth();
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openPayDialog, setOpenPayDialog] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [paymentData, setPaymentData] = useState({
    paymentMethod: 'UPI',
    transactionId: '',
  });

  useEffect(() => {
    fetchMyFees();
  }, []);

  const fetchMyFees = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/fees/student/${user.id}`);
      setFees(response.data);
      toast.success('Fee records loaded!');
    } catch (error) {
      console.error('Failed to fetch fees:', error);

      // Mock data for demo
      setFees([
        {
          id: 1,
          amount: 5000,
          dueDate: '2025-11-30',
          feeType: 'HOSTEL_FEE',
          month: 11,
          year: 2025,
          paymentStatus: 'PAID',
          paymentMethod: 'UPI',
          paidDate: '2025-10-25',
          transactionId: 'TXN123456789'
        },
        {
          id: 2,
          amount: 3000,
          dueDate: '2025-11-30',
          feeType: 'MESS_FEE',
          month: 11,
          year: 2025,
          paymentStatus: 'PENDING',
          paymentMethod: null,
          paidDate: null,
          transactionId: null
        },
        {
          id: 3,
          amount: 5000,
          dueDate: '2025-12-31',
          feeType: 'HOSTEL_FEE',
          month: 12,
          year: 2025,
          paymentStatus: 'PENDING',
          paymentMethod: null,
          paidDate: null,
          transactionId: null
        }
      ]);

      toast.info('Showing sample fee data. Connect to backend for real data.');
    } finally {
      setLoading(false);
    }
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
      fetchMyFees();
      setOpenPayDialog(false);
    } catch (error) {
      toast.error('Failed to record payment. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PAID':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'OVERDUE':
        return 'error';
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

  const totalAmount = fees.reduce((sum, fee) => sum + parseFloat(fee.amount || 0), 0);
  const paidAmount = fees
    .filter(fee => fee.paymentStatus === 'PAID')
    .reduce((sum, fee) => sum + parseFloat(fee.amount || 0), 0);
  const pendingAmount = totalAmount - paidAmount;
  const paidCount = fees.filter(fee => fee.paymentStatus === 'PAID').length;

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box className="my-fees-container">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <Paper className="fees-header" elevation={0}>
        <Box>
          <Typography variant="h4" fontWeight="700" gutterBottom>
            <AttachMoney sx={{ fontSize: 40, verticalAlign: 'middle', mr: 1, color: '#4caf50' }} />
            My Fee Details
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Track your hostel fee payments
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
                    Total Paid
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
                    Payment Rate
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

      {/* Fee Records Table */}
      <Card className="table-card">
        <CardContent>
          <Typography variant="h6" fontWeight="600" gutterBottom>
            Your Fee Records
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Fee Type</TableCell>
                  <TableCell>Month/Year</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Payment Details</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fees.map((fee) => (
                  <TableRow key={fee.id} hover>
                    <TableCell>
                      <Chip label={fee.feeType} size="small" color="primary" />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="600">
                        {fee.month}/{fee.year}
                      </Typography>
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
                        <Box>
                          <Typography variant="caption" display="block">
                            {fee.paymentMethod}
                          </Typography>
                          {fee.transactionId && (
                            <Typography variant="caption" color="textSecondary">
                              {fee.transactionId}
                            </Typography>
                          )}
                        </Box>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      {fee.paymentStatus === 'PENDING' && (
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
                      {fee.paymentStatus === 'PAID' && fee.paidDate && (
                        <Typography variant="caption" color="textSecondary">
                          Paid on {format(new Date(fee.paidDate), 'MMM dd, yyyy')}
                        </Typography>
                      )}
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
        <DialogTitle>Make Payment</DialogTitle>
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

export default MyFeesPage;

