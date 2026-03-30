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
  CircularProgress,
  Fab,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Add,
  ReportProblem,
  CheckCircle,
  Error,
  Warning,
  Info,
  Edit,
  Delete,
  MoreVert,
} from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import './MyComplaintsPage.css';

const MyComplaintsPage = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingComplaint, setEditingComplaint] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'OTHER',
    priority: 'MEDIUM',
  });

  useEffect(() => {
    fetchMyComplaints();
  }, []);

  const fetchMyComplaints = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/complaints/student/${user.id}`);
      setComplaints(response.data);
      toast.success('Complaints loaded!');
    } catch (error) {
      console.error('Failed to fetch complaints:', error);

      // Mock data for demo
      setComplaints([
        {
          id: 1,
          title: 'AC Not Working',
          description: 'The AC in my room has stopped working since yesterday',
          type: 'ELECTRICAL',
          priority: 'HIGH',
          status: 'IN_PROGRESS',
          createdAt: '2025-10-28T10:00:00',
          updatedAt: '2025-10-29T15:30:00',
          wardenRemarks: 'Technician assigned, will be fixed by tomorrow'
        },
        {
          id: 2,
          title: 'WiFi Connection Issue',
          description: 'Internet speed is very slow in my room',
          type: 'INTERNET',
          priority: 'MEDIUM',
          status: 'PENDING',
          createdAt: '2025-10-29T14:00:00',
          updatedAt: '2025-10-29T14:00:00',
          wardenRemarks: null
        },
        {
          id: 3,
          title: 'Water Leakage',
          description: 'Water leaking from ceiling',
          type: 'PLUMBING',
          priority: 'URGENT',
          status: 'RESOLVED',
          createdAt: '2025-10-25T09:00:00',
          updatedAt: '2025-10-27T16:00:00',
          wardenRemarks: 'Fixed. Plumber repaired the pipe'
        }
      ]);

      toast.info('Showing sample complaint data. Connect to backend for real data.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (complaint = null) => {
    if (complaint) {
      setEditingComplaint(complaint);
      setFormData({
        title: complaint.title,
        description: complaint.description,
        type: complaint.type,
        priority: complaint.priority,
      });
    } else {
      setEditingComplaint(null);
      setFormData({
        title: '',
        description: '',
        type: 'OTHER',
        priority: 'MEDIUM',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingComplaint(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editingComplaint) {
        await api.put(`/api/complaints/${editingComplaint.id}`, formData);
        toast.success('Complaint updated successfully!');
      } else {
        await api.post('/api/complaints', formData);
        toast.success('Complaint submitted successfully!');
      }
      fetchMyComplaints();
      handleCloseDialog();
    } catch (error) {
      console.error('Complaint submission error:', error);
      toast.error(editingComplaint ? 'Failed to update complaint' : 'Failed to submit complaint');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      try {
        await api.delete(`/api/complaints/${id}`);
        toast.success('Complaint deleted successfully!');
        fetchMyComplaints();
      } catch (error) {
        console.error('Delete error:', error);
        toast.error('Failed to delete complaint');
      }
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING':
        return <Warning />;
      case 'IN_PROGRESS':
        return <Info />;
      case 'RESOLVED':
        return <CheckCircle />;
      case 'CLOSED':
        return <CheckCircle />;
      case 'REJECTED':
        return <Error />;
      default:
        return <ReportProblem />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'IN_PROGRESS':
        return 'info';
      case 'RESOLVED':
        return 'success';
      case 'CLOSED':
        return 'default';
      case 'REJECTED':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'LOW':
        return '#4caf50';
      case 'MEDIUM':
        return '#ff9800';
      case 'HIGH':
        return '#f44336';
      case 'URGENT':
        return '#d32f2f';
      default:
        return '#9e9e9e';
    }
  };

  const getTypeIcon = (type) => {
    const icons = {
      ELECTRICAL: '⚡',
      PLUMBING: '💧',
      FURNITURE: '🪑',
      CLEANING: '🧹',
      INTERNET: '🌐',
      SECURITY: '🔒',
      OTHER: '📋',
    };
    return icons[type] || '📋';
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box className="my-complaints-container">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <Paper className="complaints-header" elevation={0}>
        <Box>
          <Typography variant="h4" fontWeight="700" gutterBottom>
            <ReportProblem sx={{ fontSize: 40, verticalAlign: 'middle', mr: 1, color: '#f44336' }} />
            My Complaints
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Track your submitted complaints and issues
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenDialog}
          sx={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            borderRadius: 2,
            px: 3,
            py: 1.5,
          }}
        >
          New Complaint
        </Button>
      </Paper>

      {/* Statistics */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card" sx={{ borderTop: '4px solid #ff9800' }}>
            <CardContent>
              <Typography variant="h3" fontWeight="700" color="#ff9800">
                {complaints.filter(c => c.status === 'PENDING').length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Pending
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card" sx={{ borderTop: '4px solid #2196f3' }}>
            <CardContent>
              <Typography variant="h3" fontWeight="700" color="#2196f3">
                {complaints.filter(c => c.status === 'IN_PROGRESS').length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                In Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card" sx={{ borderTop: '4px solid #4caf50' }}>
            <CardContent>
              <Typography variant="h3" fontWeight="700" color="#4caf50">
                {complaints.filter(c => c.status === 'RESOLVED').length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Resolved
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card" sx={{ borderTop: '4px solid #667eea' }}>
            <CardContent>
              <Typography variant="h3" fontWeight="700" color="#667eea">
                {complaints.length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Complaints Grid */}
      <Grid container spacing={3}>
        {complaints.map((complaint) => (
          <Grid item xs={12} md={6} key={complaint.id}>
            <Card className="complaint-card">
              <Box
                className="complaint-card-header"
                sx={{ background: `linear-gradient(135deg, ${getPriorityColor(complaint.priority)} 0%, ${getPriorityColor(complaint.priority)}dd 100%)` }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="h4">{getTypeIcon(complaint.type)}</Typography>
                  <Box>
                    <Typography variant="h6" fontWeight="700" color="white">
                      {complaint.title}
                    </Typography>
                    <Typography variant="caption" color="white">
                      {complaint.type}
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  icon={getStatusIcon(complaint.status)}
                  label={complaint.status}
                  color={getStatusColor(complaint.status)}
                  size="small"
                  sx={{ bgcolor: 'white', fontWeight: 600 }}
                />
              </Box>

              <CardContent>
                <Typography variant="body2" color="textSecondary" mb={2}>
                  {complaint.description}
                </Typography>

                <Box display="flex" gap={1} mb={2}>
                  <Chip
                    label={`Priority: ${complaint.priority}`}
                    size="small"
                    sx={{ bgcolor: getPriorityColor(complaint.priority), color: 'white' }}
                  />
                  <Chip
                    label={format(new Date(complaint.createdAt), 'MMM dd, yyyy')}
                    size="small"
                    variant="outlined"
                  />
                </Box>

                {complaint.wardenRemarks && (
                  <Paper sx={{ p: 2, bgcolor: '#f5f5f5', mt: 2 }}>
                    <Typography variant="caption" color="textSecondary" fontWeight="700">
                      Warden Remarks:
                    </Typography>
                    <Typography variant="body2" mt={1}>
                      {complaint.wardenRemarks}
                    </Typography>
                  </Paper>
                )}

                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                  <Typography variant="caption" color="textSecondary">
                    Last updated: {format(new Date(complaint.updatedAt), 'MMM dd, yyyy HH:mm')}
                  </Typography>

                  {/* Edit and Delete buttons - only for PENDING complaints */}
                  {complaint.status === 'PENDING' && (
                    <Box display="flex" gap={1}>
                      <Tooltip title="Edit Complaint">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleOpenDialog(complaint)}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Complaint">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(complaint.id)}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {complaints.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center', mt: 4 }}>
          <ReportProblem sx={{ fontSize: 80, color: '#ccc' }} />
          <Typography variant="h6" color="textSecondary" mt={2}>
            No complaints submitted yet
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Click the button above to submit your first complaint
          </Typography>
        </Paper>
      )}

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleOpenDialog}
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        }}
      >
        <Add />
      </Fab>

      {/* Add/Edit Complaint Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingComplaint ? 'Edit Complaint' : 'Submit New Complaint'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Brief description of the issue"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <MenuItem value="ELECTRICAL">⚡ Electrical</MenuItem>
                <MenuItem value="PLUMBING">💧 Plumbing</MenuItem>
                <MenuItem value="FURNITURE">🪑 Furniture</MenuItem>
                <MenuItem value="CLEANING">🧹 Cleaning</MenuItem>
                <MenuItem value="INTERNET">🌐 Internet</MenuItem>
                <MenuItem value="SECURITY">🔒 Security</MenuItem>
                <MenuItem value="OTHER">📋 Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
              >
                <MenuItem value="LOW">Low</MenuItem>
                <MenuItem value="MEDIUM">Medium</MenuItem>
                <MenuItem value="HIGH">High</MenuItem>
                <MenuItem value="URGENT">Urgent</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                multiline
                rows={4}
                placeholder="Detailed description of the issue..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!formData.title || !formData.description}
            sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}
          >
            {editingComplaint ? 'Update' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyComplaintsPage;

