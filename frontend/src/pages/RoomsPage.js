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
  MeetingRoom,
  Person,
  AttachMoney,
  Layers,
  CheckCircle,
  Cancel,
  Build,
} from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api/axios';
import './RoomsPage.css';

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    roomNumber: '',
    roomType: 'SINGLE',
    capacity: 1,
    floor: 1,
    monthlyRent: 5000,
    status: 'AVAILABLE',
    description: '',
    amenities: '',
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/rooms');
      setRooms(response.data);
      toast.success('Rooms loaded successfully!');
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
      toast.error('Failed to load rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (room = null) => {
    if (room) {
      setEditingRoom(room);
      setFormData(room);
    } else {
      setEditingRoom(null);
      setFormData({
        roomNumber: '',
        roomType: 'SINGLE',
        capacity: 1,
        floor: 1,
        monthlyRent: 5000,
        status: 'AVAILABLE',
        description: '',
        amenities: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingRoom(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editingRoom) {
        await api.put(`/api/rooms/${editingRoom.id}`, formData);
        toast.success('Room updated successfully!');
      } else {
        await api.post('/api/rooms', formData);
        toast.success('Room added successfully!');
      }
      fetchRooms();
      handleCloseDialog();
    } catch (error) {
      toast.error(editingRoom ? 'Failed to update room' : 'Failed to add room');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await api.delete(`/api/rooms/${id}`);
        toast.success('Room deleted successfully!');
        fetchRooms();
      } catch (error) {
        toast.error('Failed to delete room');
      }
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'AVAILABLE':
        return <CheckCircle />;
      case 'OCCUPIED':
        return <Person />;
      case 'MAINTENANCE':
        return <Build />;
      default:
        return <Cancel />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'AVAILABLE':
        return 'success';
      case 'OCCUPIED':
        return 'primary';
      case 'MAINTENANCE':
        return 'warning';
      default:
        return 'error';
    }
  };

  const getRoomTypeColor = (type) => {
    switch (type) {
      case 'SINGLE':
        return '#667eea';
      case 'DOUBLE':
        return '#f093fb';
      case 'TRIPLE':
        return '#4facfe';
      default:
        return '#feca57';
    }
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'ALL' || room.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box className="rooms-container">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <Paper className="rooms-header" elevation={0}>
        <Box>
          <Typography variant="h4" fontWeight="700" gutterBottom>
            <MeetingRoom sx={{ fontSize: 40, verticalAlign: 'middle', mr: 1 }} />
            Room Management
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Manage hostel rooms, allocations, and availability
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 2,
            px: 3,
            py: 1.5,
          }}
        >
          Add Room
        </Button>
      </Paper>

      {/* Filters */}
      <Paper className="filters-section" elevation={0}>
        <TextField
          placeholder="Search by room number..."
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
          <MenuItem value="ALL">All Rooms</MenuItem>
          <MenuItem value="AVAILABLE">Available</MenuItem>
          <MenuItem value="OCCUPIED">Occupied</MenuItem>
          <MenuItem value="MAINTENANCE">Maintenance</MenuItem>
          <MenuItem value="OUT_OF_ORDER">Out of Order</MenuItem>
        </TextField>
      </Paper>

      {/* Rooms Grid */}
      <Grid container spacing={3}>
        {filteredRooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room.id}>
            <Card className="room-card">
              <Box
                className="room-card-header"
                sx={{ background: `linear-gradient(135deg, ${getRoomTypeColor(room.roomType)} 0%, ${getRoomTypeColor(room.roomType)}aa 100%)` }}
              >
                <Typography variant="h5" fontWeight="700" color="white">
                  Room {room.roomNumber}
                </Typography>
                <Chip
                  icon={getStatusIcon(room.status)}
                  label={room.status}
                  color={getStatusColor(room.status)}
                  size="small"
                  sx={{ bgcolor: 'white', fontWeight: 600 }}
                />
              </Box>

              <CardContent>
                <Box className="room-info">
                  <Box className="info-item">
                    <Avatar sx={{ bgcolor: getRoomTypeColor(room.roomType), width: 40, height: 40 }}>
                      <Layers />
                    </Avatar>
                    <Box ml={1.5}>
                      <Typography variant="caption" color="textSecondary">
                        Type
                      </Typography>
                      <Typography variant="body1" fontWeight="600">
                        {room.roomType}
                      </Typography>
                    </Box>
                  </Box>

                  <Box className="info-item">
                    <Avatar sx={{ bgcolor: '#f093fb', width: 40, height: 40 }}>
                      <Person />
                    </Avatar>
                    <Box ml={1.5}>
                      <Typography variant="caption" color="textSecondary">
                        Capacity
                      </Typography>
                      <Typography variant="body1" fontWeight="600">
                        {room.capacity} {room.capacity === 1 ? 'Person' : 'Persons'}
                      </Typography>
                    </Box>
                  </Box>

                  <Box className="info-item">
                    <Avatar sx={{ bgcolor: '#48dbfb', width: 40, height: 40 }}>
                      <AttachMoney />
                    </Avatar>
                    <Box ml={1.5}>
                      <Typography variant="caption" color="textSecondary">
                        Monthly Rent
                      </Typography>
                      <Typography variant="body1" fontWeight="600">
                        ₹{room.monthlyRent?.toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                {room.description && (
                  <Typography variant="body2" color="textSecondary" mb={2}>
                    {room.description}
                  </Typography>
                )}

                {room.amenities && (
                  <Box mb={2}>
                    <Typography variant="caption" color="textSecondary" display="block" mb={1}>
                      Amenities:
                    </Typography>
                    <Box display="flex" flexWrap="wrap" gap={0.5}>
                      {room.amenities.split(',').map((amenity, idx) => (
                        <Chip key={idx} label={amenity.trim()} size="small" />
                      ))}
                    </Box>
                  </Box>
                )}

                <Box display="flex" gap={1} mt={2}>
                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={() => handleOpenDialog(room)}
                    fullWidth
                    sx={{ borderRadius: 2 }}
                  >
                    Edit
                  </Button>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(room.id)}
                    sx={{ border: '1px solid', borderColor: 'error.main', borderRadius: 2 }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredRooms.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center', mt: 4 }}>
          <MeetingRoom sx={{ fontSize: 80, color: '#ccc' }} />
          <Typography variant="h6" color="textSecondary" mt={2}>
            No rooms found
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Try adjusting your search or filters
          </Typography>
        </Paper>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingRoom ? 'Edit Room' : 'Add New Room'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Room Number"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Room Type"
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                required
              >
                <MenuItem value="SINGLE">Single</MenuItem>
                <MenuItem value="DOUBLE">Double</MenuItem>
                <MenuItem value="TRIPLE">Triple</MenuItem>
                <MenuItem value="DORMITORY">Dormitory</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Floor"
                name="floor"
                value={formData.floor}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Monthly Rent"
                name="monthlyRent"
                value={formData.monthlyRent}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <MenuItem value="AVAILABLE">Available</MenuItem>
                <MenuItem value="OCCUPIED">Occupied</MenuItem>
                <MenuItem value="MAINTENANCE">Maintenance</MenuItem>
                <MenuItem value="OUT_OF_ORDER">Out of Order</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Amenities (comma-separated)"
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
                placeholder="e.g., AC, WiFi, Study Table"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
          >
            {editingRoom ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoomsPage;

