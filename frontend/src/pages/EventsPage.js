import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Chip,
  Avatar,
  CircularProgress,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Event,
  CalendarToday,
  LocationOn,
  People,
  AccessTime,
  CheckCircle,
  Schedule,
} from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import './EventsPage.css';

const EventsPage = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/events');
      setEvents(response.data);
      toast.success('Events loaded!');
    } catch (error) {
      console.error('Failed to fetch events:', error);

      // Mock events data
      setEvents([
        {
          id: 1,
          title: 'Cultural Fest 2025',
          description: 'Annual cultural festival with music, dance, and food stalls',
          date: '2025-11-15',
          startTime: '10:00',
          endTime: '18:00',
          location: 'Main Auditorium',
          category: 'CULTURAL',
          organizer: 'Student Council',
          attendees: 150,
          status: 'UPCOMING'
        },
        {
          id: 2,
          title: 'Tech Talk: AI & Machine Learning',
          description: 'Guest lecture by industry expert on latest AI trends',
          date: '2025-11-10',
          startTime: '14:00',
          endTime: '16:00',
          location: 'Seminar Hall',
          category: 'ACADEMIC',
          organizer: 'Tech Club',
          attendees: 80,
          status: 'UPCOMING'
        },
        {
          id: 3,
          title: 'Sports Day',
          description: 'Inter-hostel sports competition with various games',
          date: '2025-11-20',
          startTime: '08:00',
          endTime: '17:00',
          location: 'Sports Ground',
          category: 'SPORTS',
          organizer: 'Sports Committee',
          attendees: 200,
          status: 'UPCOMING'
        },
        {
          id: 4,
          title: 'Hostel Cleaning Drive',
          description: 'Community cleaning activity for hostel premises',
          date: '2025-11-05',
          startTime: '06:00',
          endTime: '09:00',
          location: 'Hostel Campus',
          category: 'SOCIAL',
          organizer: 'Hostel Management',
          attendees: 120,
          status: 'UPCOMING'
        },
        {
          id: 5,
          title: 'Freshers Welcome Party',
          description: 'Welcome event for new students',
          date: '2025-10-20',
          startTime: '18:00',
          endTime: '22:00',
          location: 'Hostel Common Area',
          category: 'SOCIAL',
          organizer: 'Student Council',
          attendees: 180,
          status: 'COMPLETED'
        },
        {
          id: 6,
          title: 'Yoga & Meditation Session',
          description: 'Weekly wellness activity for students',
          date: '2025-11-01',
          startTime: '06:30',
          endTime: '07:30',
          location: 'Hostel Garden',
          category: 'WELLNESS',
          organizer: 'Wellness Club',
          attendees: 40,
          status: 'COMPLETED'
        }
      ]);

      toast.info('Showing sample events data. Connect to backend for real data.');
    } finally {
      setLoading(false);
    }
  };

  const upcomingEvents = events.filter(e => e.status === 'UPCOMING');
  const pastEvents = events.filter(e => e.status === 'COMPLETED');

  const getCategoryColor = (category) => {
    switch (category) {
      case 'CULTURAL':
        return '#f093fb';
      case 'ACADEMIC':
        return '#667eea';
      case 'SPORTS':
        return '#4caf50';
      case 'SOCIAL':
        return '#ff9800';
      case 'WELLNESS':
        return '#2196f3';
      default:
        return '#9e9e9e';
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      CULTURAL: '🎭',
      ACADEMIC: '📚',
      SPORTS: '⚽',
      SOCIAL: '🎉',
      WELLNESS: '🧘',
    };
    return icons[category] || '📅';
  };

  const displayEvents = tabValue === 0 ? upcomingEvents : pastEvents;

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box className="events-container">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <Paper className="events-header" elevation={0}>
        <Box>
          <Typography variant="h4" fontWeight="700" gutterBottom>
            <Event sx={{ fontSize: 40, verticalAlign: 'middle', mr: 1, color: '#667eea' }} />
            Hostel Events & Activities
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Stay updated with upcoming events and activities
          </Typography>
        </Box>
      </Paper>

      {/* Statistics */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={4}>
          <Card className="stat-card" sx={{ borderTop: '4px solid #667eea' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Upcoming Events
                  </Typography>
                  <Typography variant="h3" component="div" fontWeight="700" color="#667eea">
                    {upcomingEvents.length}
                  </Typography>
                </Box>
                <Schedule sx={{ fontSize: 48, color: '#667eea', opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card className="stat-card" sx={{ borderTop: '4px solid #4caf50' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Completed Events
                  </Typography>
                  <Typography variant="h3" component="div" fontWeight="700" color="#4caf50">
                    {pastEvents.length}
                  </Typography>
                </Box>
                <CheckCircle sx={{ fontSize: 48, color: '#4caf50', opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card className="stat-card" sx={{ borderTop: '4px solid #ff9800' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography color="textSecondary" gutterBottom variant="body2">
                    Total Events
                  </Typography>
                  <Typography variant="h3" component="div" fontWeight="700" color="#ff9800">
                    {events.length}
                  </Typography>
                </Box>
                <Event sx={{ fontSize: 48, color: '#ff9800', opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper sx={{ mb: 3, borderRadius: 2 }}>
        <Tabs
          value={tabValue}
          onChange={(e, v) => setTabValue(v)}
          centered
          sx={{
            '& .MuiTab-root': {
              fontWeight: 700,
              fontSize: 16,
            }
          }}
        >
          <Tab label="Upcoming Events" />
          <Tab label="Past Events" />
        </Tabs>
      </Paper>

      {/* Events Grid */}
      <Grid container spacing={3}>
        {displayEvents.map((event) => (
          <Grid item xs={12} md={6} lg={4} key={event.id}>
            <Card className="event-card">
              <Box
                className="event-card-header"
                sx={{
                  background: `linear-gradient(135deg, ${getCategoryColor(event.category)} 0%, ${getCategoryColor(event.category)}dd 100%)`,
                }}
              >
                <Typography variant="h3" mb={1}>
                  {getCategoryIcon(event.category)}
                </Typography>
                <Chip
                  label={event.category}
                  size="small"
                  sx={{ bgcolor: 'white', fontWeight: 600, color: getCategoryColor(event.category) }}
                />
              </Box>

              <CardContent>
                <Typography variant="h6" fontWeight="700" gutterBottom>
                  {event.title}
                </Typography>

                <Typography variant="body2" color="textSecondary" paragraph>
                  {event.description}
                </Typography>

                <Box className="event-details">
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <CalendarToday fontSize="small" color="action" />
                    <Typography variant="body2">
                      {format(new Date(event.date), 'EEEE, MMM dd, yyyy')}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <AccessTime fontSize="small" color="action" />
                    <Typography variant="body2">
                      {event.startTime} - {event.endTime}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <LocationOn fontSize="small" color="action" />
                    <Typography variant="body2">
                      {event.location}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                    <People fontSize="small" color="action" />
                    <Typography variant="body2">
                      {event.attendees} Participants
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: getCategoryColor(event.category) }}>
                      {event.organizer[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="caption" color="textSecondary">
                        Organized by
                      </Typography>
                      <Typography variant="body2" fontWeight="600">
                        {event.organizer}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {displayEvents.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center', mt: 4 }}>
          <Event sx={{ fontSize: 80, color: '#ccc' }} />
          <Typography variant="h6" color="textSecondary" mt={2}>
            No {tabValue === 0 ? 'upcoming' : 'past'} events
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Check back later for updates
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default EventsPage;

