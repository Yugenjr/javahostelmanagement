import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Chip,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from '@mui/material';
import {
  MeetingRoom,
  Person,
  Phone,
  Email,
  Home,
  Bed,
  Wifi,
  AcUnit,
  Tv,
  LocalLaundryService,
  CheckCircle,
  Warning,
} from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import './MyRoomPage.css';

const MyRoomPage = () => {
  const { user } = useAuth();
  const [roomData, setRoomData] = useState(null);
  const [roommates, setRoommates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyRoom();
  }, []);

  const fetchMyRoom = async () => {
    try {
      setLoading(true);
      // Try to get user's room data
      const response = await api.get(`/api/users/${user.id}`);

      if (response.data.room) {
        setRoomData(response.data.room);
        // Fetch roommates if room has multiple occupants
        const roommatesResponse = await api.get(`/api/rooms/${response.data.room.id}/occupants`);
        setRoommates(roommatesResponse.data.filter(r => r.id !== user.id));
      }

      toast.success('Room details loaded!');
    } catch (error) {
      console.error('Failed to fetch room:', error);

      // Mock data fallback for demo
      setRoomData({
        id: 1,
        roomNumber: 'A101',
        roomType: 'DOUBLE',
        capacity: 2,
        floor: 1,
        monthlyRent: 5000,
        status: 'OCCUPIED',
        amenities: 'AC, WiFi, Study Table, Wardrobe, Attached Bathroom',
        description: 'Spacious double occupancy room with modern amenities'
      });

      toast.info('Showing sample room data. Connect to backend for real data.');
    } finally {
      setLoading(false);
    }
  };

  const amenitiesList = roomData?.amenities ? roomData.amenities.split(',').map(a => a.trim()) : [];

  const getAmenityIcon = (amenity) => {
    const amenityLower = amenity.toLowerCase();
    if (amenityLower.includes('wifi') || amenityLower.includes('internet')) return <Wifi />;
    if (amenityLower.includes('ac') || amenityLower.includes('air')) return <AcUnit />;
    if (amenityLower.includes('tv') || amenityLower.includes('television')) return <Tv />;
    if (amenityLower.includes('laundry') || amenityLower.includes('washing')) return <LocalLaundryService />;
    if (amenityLower.includes('bed')) return <Bed />;
    return <CheckCircle />;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!roomData) {
    return (
      <Box className="my-room-container">
        <ToastContainer position="top-right" autoClose={3000} />
        <Paper className="no-room-card" elevation={0}>
          <Warning sx={{ fontSize: 80, color: '#ff9800', mb: 2 }} />
          <Typography variant="h5" fontWeight="700" gutterBottom>
            No Room Assigned
          </Typography>
          <Typography variant="body1" color="textSecondary">
            You don't have a room assigned yet. Please contact the warden or administration.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box className="my-room-container">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <Paper className="room-header" elevation={0}>
        <Box>
          <Typography variant="h4" fontWeight="700" gutterBottom>
            <MeetingRoom sx={{ fontSize: 40, verticalAlign: 'middle', mr: 1, color: '#667eea' }} />
            My Room
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Your hostel room details and information
          </Typography>
        </Box>
        <Chip
          label={roomData.status}
          color="success"
          size="large"
          sx={{ fontSize: 16, fontWeight: 700, px: 2, py: 3 }}
        />
      </Paper>

      <Grid container spacing={3}>
        {/* Room Details Card */}
        <Grid item xs={12} md={8}>
          <Card className="room-details-card">
            <CardContent>
              <Box className="room-number-badge">
                <Typography variant="h2" fontWeight="800" color="primary">
                  {roomData.roomNumber}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Room Number
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={6} sm={3}>
                  <Box className="info-box">
                    <Typography variant="caption" color="textSecondary">Type</Typography>
                    <Typography variant="h6" fontWeight="700">
                      {roomData.roomType}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box className="info-box">
                    <Typography variant="caption" color="textSecondary">Floor</Typography>
                    <Typography variant="h6" fontWeight="700">
                      {roomData.floor}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box className="info-box">
                    <Typography variant="caption" color="textSecondary">Capacity</Typography>
                    <Typography variant="h6" fontWeight="700">
                      {roomData.capacity} Persons
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box className="info-box">
                    <Typography variant="caption" color="textSecondary">Monthly Rent</Typography>
                    <Typography variant="h6" fontWeight="700" color="success.main">
                      ₹{roomData.monthlyRent}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" fontWeight="700" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                {roomData.description}
              </Typography>

              <Typography variant="h6" fontWeight="700" gutterBottom mt={3}>
                Amenities
              </Typography>
              <Grid container spacing={2}>
                {amenitiesList.map((amenity, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box className="amenity-item">
                      {getAmenityIcon(amenity)}
                      <Typography variant="body2" ml={1}>
                        {amenity}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Your Details */}
          <Card className="sidebar-card" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="700" gutterBottom>
                Your Details
              </Typography>
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    fontSize: 24,
                    fontWeight: 700,
                  }}
                >
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </Avatar>
                <Box>
                  <Typography variant="body1" fontWeight="700">
                    {user?.firstName} {user?.lastName}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Student
                  </Typography>
                </Box>
              </Box>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <Email fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={user?.email}
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
                {user?.phoneNumber && (
                  <ListItem>
                    <ListItemIcon>
                      <Phone fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={user?.phoneNumber}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>

          {/* Roommates */}
          {roommates.length > 0 && (
            <Card className="sidebar-card">
              <CardContent>
                <Typography variant="h6" fontWeight="700" gutterBottom>
                  Roommates ({roommates.length})
                </Typography>
                <List>
                  {roommates.map((roommate) => (
                    <ListItem key={roommate.id}>
                      <Avatar sx={{ mr: 2, bgcolor: '#667eea' }}>
                        {roommate.firstName?.[0]}
                      </Avatar>
                      <ListItemText
                        primary={`${roommate.firstName} ${roommate.lastName}`}
                        secondary={roommate.email}
                        primaryTypographyProps={{ fontWeight: 600 }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="sidebar-card" sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="700" gutterBottom>
                Quick Actions
              </Typography>
              <List>
                <ListItem button onClick={() => window.location.href = '/my-complaints'}>
                  <ListItemIcon>
                    <Warning color="warning" />
                  </ListItemIcon>
                  <ListItemText primary="Report an Issue" />
                </ListItem>
                <ListItem button onClick={() => window.location.href = '/my-fees'}>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText primary="View Fee Details" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyRoomPage;

