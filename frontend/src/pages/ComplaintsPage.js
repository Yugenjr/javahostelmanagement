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
  IconButton,
  Paper,
  InputAdornment,
  CircularProgress,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Search,
  ReportProblem,
  CheckCircle,
  Error,
  Warning,
  Info,
  Close,
} from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import './ComplaintsPage.css';

const ComplaintsPage = () => {
  const { user, isStudent } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [editingComplaint, setEditingComplaint] = useState(null);
  const [viewingComplaint, setViewingComplaint] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'OTHER',
    priority: 'MEDIUM',
  });

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      console.log('Fetching complaints from database...');
      const response = await api.get('/api/complaints');
      console.log('Complaints response:', response.data);

      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setComplaints(response.data);
        toast.success(`Loaded ${response.data.length} complaints from database!`);
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
    const mockComplaints = [
      { id: 1, title: 'WiFi Not Working', description: 'Internet connection is very slow', type: 'INTERNET', priority: 'HIGH', status: 'IN_PROGRESS', student: { firstName: 'Alice', lastName: 'Johnson' }, createdAt: new Date().toISOString(), wardenRemarks: 'Working on it' },
      { id: 2, title: 'AC Not Cooling', description: 'Air conditioner stopped working', type: 'ELECTRICAL', priority: 'MEDIUM', status: 'PENDING', student: { firstName: 'Bob', lastName: 'Smith' }, createdAt: new Date().toISOString() },
      { id: 3, title: 'Water Leakage', description: 'Water leaking from ceiling', type: 'PLUMBING', priority: 'HIGH', status: 'PENDING', student: { firstName: 'Carol', lastName: 'Williams' }, createdAt: new Date().toISOString() },
      { id: 4, title: 'Furniture Broken', description: 'Study table is broken', type: 'FURNITURE', priority: 'LOW', status: 'RESOLVED', student: { firstName: 'David', lastName: 'Brown' }, createdAt: new Date().toISOString(), wardenRemarks: 'Fixed', resolvedAt: new Date().toISOString() },
      { id: 5, title: 'Room Cleaning', description: 'Room needs cleaning', type: 'CLEANING', priority: 'MEDIUM', status: 'RESOLVED', student: { firstName: 'Emma', lastName: 'Davis' }, createdAt: new Date().toISOString(), wardenRemarks: 'Done', resolvedAt: new Date().toISOString() }
    ];
    setComplaints(mockComplaints);
    toast.info(`Showing ${mockComplaints.length} sample complaints`);
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

  const handleViewComplaint = (complaint) => {
    setViewingComplaint(complaint);
    setOpenViewDialog(true);
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
      fetchComplaints();
      handleCloseDialog();
    } catch (error) {
      toast.error(editingComplaint ? 'Failed to update complaint' : 'Failed to submit complaint');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      try {
        await api.delete(`/api/complaints/${id}`);
        toast.success('Complaint deleted successfully!');
        fetchComplaints();
      } catch (error) {
        toast.error('Failed to delete complaint');
      }
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await api.put(`/api/complaints/${id}/status`, { status: newStatus });
      toast.success(`Complaint status updated to ${newStatus}!`);
      fetchComplaints();
    } catch (error) {
      toast.error('Failed to update status');
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

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || complaint.status === filterStatus;
    const matchesPriority = filterPriority === 'ALL' || complaint.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box className="complaints-container">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <Paper className="complaints-header" elevation={0}>
        <Box>
          <Typography variant="h4" fontWeight="700" gutterBottom>
            <ReportProblem sx={{ fontSize: 40, verticalAlign: 'middle', mr: 1, color: '#f44336' }} />
            Complaint Management
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Submit and track maintenance issues
          </Typography>
        </Box>
        {isStudent && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
            sx={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              borderRadius: 2,
              px: 3,
              py: 1.5,
            }}
          >
            New Complaint
          </Button>
        )}
      </Paper>

      {/* Filters */}
      <Paper className="filters-section" elevation={0}>
        <TextField
          placeholder="Search complaints..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 300 }}
        />
        <TextField
          select
          label="Filter by Status"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="ALL">All Status</MenuItem>
          <MenuItem value="PENDING">Pending</MenuItem>
          <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
          <MenuItem value="RESOLVED">Resolved</MenuItem>
          <MenuItem value="CLOSED">Closed</MenuItem>
          <MenuItem value="REJECTED">Rejected</MenuItem>
        </TextField>
        <TextField
          select
          label="Filter by Priority"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="ALL">All Priority</MenuItem>
          <MenuItem value="LOW">Low</MenuItem>
          <MenuItem value="MEDIUM">Medium</MenuItem>
          <MenuItem value="HIGH">High</MenuItem>
          <MenuItem value="URGENT">Urgent</MenuItem>
        </TextField>
      </Paper>

      {/* Statistics Cards */}
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
                Total Complaints
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Complaints Grid */}
      <Grid container spacing={3}>
        {filteredComplaints.map((complaint) => (
          <Grid item xs={12} md={6} lg={4} key={complaint.id}>
            <Card className="complaint-card" onClick={() => handleViewComplaint(complaint)}>
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
                <Typography variant="body2" color="textSecondary" mb={2} className="complaint-description">
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

                {complaint.student && (
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#667eea' }}>
                      {complaint.student.firstName?.[0]}
                    </Avatar>
                    <Typography variant="body2">
                      {complaint.student.firstName} {complaint.student.lastName}
                    </Typography>
                  </Box>
                )}

                {!isStudent && (
                  <Box display="flex" gap={1} mt={2}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdateStatus(complaint.id, 'IN_PROGRESS');
                      }}
                      disabled={complaint.status !== 'PENDING'}
                    >
                      Start
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="success"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdateStatus(complaint.id, 'RESOLVED');
                      }}
                      disabled={complaint.status === 'RESOLVED' || complaint.status === 'CLOSED'}
                    >
                      Resolve
                    </Button>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(complaint.id);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredComplaints.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center', mt: 4 }}>
          <ReportProblem sx={{ fontSize: 80, color: '#ccc' }} />
          <Typography variant="h6" color="textSecondary" mt={2}>
            No complaints found
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Try adjusting your search or filters
          </Typography>
        </Paper>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingComplaint ? 'Edit Complaint' : 'Submit New Complaint'}
        </DialogTitle>
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
            sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}
          >
            {editingComplaint ? 'Update' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)} maxWidth="md" fullWidth>
        {viewingComplaint && (
          <>
            <DialogTitle>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography variant="h4">{getTypeIcon(viewingComplaint.type)}</Typography>
                  <Box>
                    <Typography variant="h6" fontWeight="700">
                      {viewingComplaint.title}
                    </Typography>
                    <Chip
                      label={viewingComplaint.status}
                      color={getStatusColor(viewingComplaint.status)}
                      size="small"
                    />
                  </Box>
                </Box>
                <IconButton onClick={() => setOpenViewDialog(false)}>
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="body1" color="textSecondary" paragraph>
                    {viewingComplaint.description}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="textSecondary">Type</Typography>
                  <Typography variant="body1" fontWeight="600">{viewingComplaint.type}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="textSecondary">Priority</Typography>
                  <Chip
                    label={viewingComplaint.priority}
                    size="small"
                    sx={{ bgcolor: getPriorityColor(viewingComplaint.priority), color: 'white' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="textSecondary">Submitted</Typography>
                  <Typography variant="body1">
                    {format(new Date(viewingComplaint.createdAt), 'MMM dd, yyyy HH:mm')}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="textSecondary">Last Updated</Typography>
                  <Typography variant="body1">
                    {format(new Date(viewingComplaint.updatedAt), 'MMM dd, yyyy HH:mm')}
                  </Typography>
                </Grid>
                {viewingComplaint.student && (
                  <Grid item xs={12}>
                    <Typography variant="caption" color="textSecondary">Submitted By</Typography>
                    <Box display="flex" alignItems="center" gap={1} mt={1}>
                      <Avatar sx={{ bgcolor: '#667eea' }}>
                        {viewingComplaint.student.firstName?.[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="body1" fontWeight="600">
                          {viewingComplaint.student.firstName} {viewingComplaint.student.lastName}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {viewingComplaint.student.email}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                )}
                {viewingComplaint.wardenRemarks && (
                  <Grid item xs={12}>
                    <Typography variant="caption" color="textSecondary">Warden Remarks</Typography>
                    <Paper sx={{ p: 2, mt: 1, bgcolor: '#f5f5f5' }}>
                      <Typography variant="body2">{viewingComplaint.wardenRemarks}</Typography>
                    </Paper>
                  </Grid>
                )}
              </Grid>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default ComplaintsPage;

