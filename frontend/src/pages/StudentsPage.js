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
  Avatar,
  Paper,
  InputAdornment,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Search,
  People,
  Email,
  Phone,
  Home,
  MeetingRoom,
  PersonAdd,
} from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api/axios';
import './StudentsPage.css';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    emergencyContact: '',
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      console.log('Fetching students from database...');
      const response = await api.get('/api/users?role=STUDENT');
      console.log('Students response:', response.data);

      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setStudents(response.data);
        toast.success(`Loaded ${response.data.length} students from database!`);
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
    const mockStudents = [
      { id: 1, username: 'alice.johnson', firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@student.com', phoneNumber: '9876543210', address: '123 Main St', emergencyContact: '9876543211', role: 'STUDENT', active: true, room: { roomNumber: 'A101' } },
      { id: 2, username: 'bob.smith', firstName: 'Bob', lastName: 'Smith', email: 'bob.smith@student.com', phoneNumber: '9876543212', address: '456 Oak Ave', emergencyContact: '9876543213', role: 'STUDENT', active: true, room: { roomNumber: 'A102' } },
      { id: 3, username: 'carol.williams', firstName: 'Carol', lastName: 'Williams', email: 'carol.williams@student.com', phoneNumber: '9876543214', address: '789 Pine Rd', emergencyContact: '9876543215', role: 'STUDENT', active: true, room: { roomNumber: 'A102' } },
      { id: 4, username: 'david.brown', firstName: 'David', lastName: 'Brown', email: 'david.brown@student.com', phoneNumber: '9876543216', address: '321 Elm St', emergencyContact: '9876543217', role: 'STUDENT', active: true, room: { roomNumber: 'A103' } },
      { id: 5, username: 'emma.davis', firstName: 'Emma', lastName: 'Davis', email: 'emma.davis@student.com', phoneNumber: '9876543218', address: '654 Maple Dr', emergencyContact: '9876543219', role: 'STUDENT', active: true, room: { roomNumber: 'B101' } }
    ];
    setStudents(mockStudents);
    toast.info(`Showing ${mockStudents.length} sample students`);
  };

  const handleOpenDialog = (student = null) => {
    if (student) {
      setEditingStudent(student);
      setFormData({
        username: student.username,
        password: '',
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        phoneNumber: student.phoneNumber || '',
        address: student.address || '',
        emergencyContact: student.emergencyContact || '',
      });
    } else {
      setEditingStudent(null);
      setFormData({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        emergencyContact: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingStudent(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editingStudent) {
        await api.put(`/api/users/${editingStudent.id}`, formData);
        toast.success('Student updated successfully!');
      } else {
        await api.post('/api/auth/register', { ...formData, role: 'STUDENT' });
        toast.success('Student added successfully!');
      }
      fetchStudents();
      handleCloseDialog();
    } catch (error) {
      toast.error(editingStudent ? 'Failed to update student' : 'Failed to add student');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await api.delete(`/api/users/${id}`);
        toast.success('Student deleted successfully!');
        fetchStudents();
      } catch (error) {
        toast.error('Failed to delete student');
      }
    }
  };

  const filteredStudents = students.filter((student) =>
    `${student.firstName} ${student.lastName} ${student.email} ${student.username}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box className="students-container">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <Paper className="students-header" elevation={0}>
        <Box>
          <Typography variant="h4" fontWeight="700" gutterBottom>
            <People sx={{ fontSize: 40, verticalAlign: 'middle', mr: 1, color: '#2196f3' }} />
            Student Management
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Manage student records and information
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            borderRadius: 2,
            px: 3,
            py: 1.5,
          }}
        >
          Add Student
        </Button>
      </Paper>

      {/* Search Bar */}
      <Paper className="search-section" elevation={0}>
        <TextField
          fullWidth
          placeholder="Search students by name, email, or username..."
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
        />
      </Paper>

      {/* Statistics */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card" sx={{ borderTop: '4px solid #2196f3' }}>
            <CardContent>
              <Typography variant="h3" fontWeight="700" color="#2196f3">
                {students.length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card" sx={{ borderTop: '4px solid #4caf50' }}>
            <CardContent>
              <Typography variant="h3" fontWeight="700" color="#4caf50">
                {students.filter(s => s.active).length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Active Students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card" sx={{ borderTop: '4px solid #ff9800' }}>
            <CardContent>
              <Typography variant="h3" fontWeight="700" color="#ff9800">
                {students.filter(s => s.room).length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                With Room Assigned
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="stat-card" sx={{ borderTop: '4px solid #f44336' }}>
            <CardContent>
              <Typography variant="h3" fontWeight="700" color="#f44336">
                {students.filter(s => !s.room).length}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Waiting for Room
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Students Table */}
      <Card className="table-card">
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Room</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Emergency Contact</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                          sx={{
                            width: 48,
                            height: 48,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            fontSize: 20,
                            fontWeight: 700,
                          }}
                        >
                          {student.firstName?.[0]}{student.lastName?.[0]}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" fontWeight="600">
                            {student.firstName} {student.lastName}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            @{student.username}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" flexDirection="column" gap={0.5}>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <Email fontSize="small" color="action" />
                          <Typography variant="body2">{student.email}</Typography>
                        </Box>
                        {student.phoneNumber && (
                          <Box display="flex" alignItems="center" gap={0.5}>
                            <Phone fontSize="small" color="action" />
                            <Typography variant="body2">{student.phoneNumber}</Typography>
                          </Box>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {student.room ? (
                        <Chip
                          icon={<MeetingRoom />}
                          label={`Room ${student.room.roomNumber}`}
                          color="primary"
                          size="small"
                        />
                      ) : (
                        <Chip label="Not Assigned" size="small" variant="outlined" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={student.active ? 'Active' : 'Inactive'}
                        color={student.active ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {student.emergencyContact || '-'}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleOpenDialog(student)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(student.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {filteredStudents.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center', mt: 4 }}>
          <People sx={{ fontSize: 80, color: '#ccc' }} />
          <Typography variant="h6" color="textSecondary" mt={2}>
            No students found
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Try adjusting your search
          </Typography>
        </Paper>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingStudent ? 'Edit Student' : 'Add New Student'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                disabled={!!editingStudent}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            {!editingStudent && (
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="10 digits"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Emergency Contact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}
          >
            {editingStudent ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentsPage;

