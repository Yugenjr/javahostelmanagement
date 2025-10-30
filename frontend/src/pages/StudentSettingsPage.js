import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Avatar,
  IconButton,
  Alert,
  Tab,
  Tabs,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
} from '@mui/material';
import {
  AccountCircle,
  Security,
  Notifications,
  Settings as SettingsIcon,
  Save,
  PhotoCamera,
  Email,
  Phone,
  Lock,
  Home,
  ContactPhone,
  School,
  MeetingRoom,
} from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';
import './SettingsPage.css';

const StudentSettingsPage = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    firstName: user?.firstName || 'Student',
    lastName: user?.lastName || 'User',
    email: user?.email || 'student@hostel.com',
    phoneNumber: user?.phoneNumber || '1234567890',
    address: user?.address || '123 Street, City',
    emergencyContact: user?.emergencyContact || '0987654321',
    parentName: 'Parent Name',
    parentPhone: '9876543210',
    bloodGroup: 'O+',
    dateOfBirth: '2000-01-01',
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    paymentReminders: true,
    complaintUpdates: true,
    hostelAnnouncements: true,
    eventNotifications: true,
  });

  const [preferences, setPreferences] = useState({
    language: 'English',
    theme: 'Light',
    dateFormat: 'DD/MM/YYYY',
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSecurityChange = (e) => {
    setSecurity({ ...security, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (name) => (event) => {
    setNotifications({ ...notifications, [name]: event.target.checked });
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    setTimeout(() => {
      toast.success('Profile updated successfully!');
      setLoading(false);
    }, 1000);
  };

  const handleChangePassword = async () => {
    if (!security.currentPassword || !security.newPassword) {
      toast.error('Please fill all password fields');
      return;
    }
    if (security.newPassword !== security.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (security.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      toast.success('Password changed successfully!');
      setSecurity({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setLoading(false);
    }, 1000);
  };

  const handleSaveNotifications = async () => {
    setLoading(true);
    setTimeout(() => {
      toast.success('Notification preferences updated!');
      setLoading(false);
    }, 1000);
  };

  return (
    <Box className="settings-page">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <Box className="settings-header" mb={4}>
        <Box display="flex" alignItems="center" gap={2}>
          <SettingsIcon sx={{ fontSize: 40, color: '#667eea' }} />
          <Box>
            <Typography variant="h4" fontWeight="bold" className="gradient-text">
              My Settings
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Manage your account and preferences
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Tabs */}
      <Paper elevation={2} sx={{ mb: 3, borderRadius: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': { fontWeight: 600, textTransform: 'none', fontSize: 16 },
            '& .Mui-selected': { color: '#667eea' },
          }}
        >
          <Tab icon={<AccountCircle />} label="Profile" iconPosition="start" />
          <Tab icon={<Security />} label="Security" iconPosition="start" />
          <Tab icon={<Notifications />} label="Notifications" iconPosition="start" />
        </Tabs>
      </Paper>

      {/* Profile Tab */}
      {tabValue === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card className="settings-card" elevation={3}>
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <Box position="relative" display="inline-block">
                  <Avatar
                    sx={{
                      width: 150,
                      height: 150,
                      margin: 'auto',
                      mb: 2,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      fontSize: 60,
                    }}
                  >
                    {profile.firstName[0]}{profile.lastName[0]}
                  </Avatar>
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 16,
                      right: -8,
                      bgcolor: 'white',
                      boxShadow: 2,
                      '&:hover': { bgcolor: '#f5f5f5' },
                    }}
                    size="small"
                  >
                    <PhotoCamera />
                  </IconButton>
                </Box>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  {profile.firstName} {profile.lastName}
                </Typography>
                <Chip label="Student" color="primary" sx={{ mb: 1 }} />
                <Typography variant="body2" color="textSecondary">
                  Room: {user?.room?.roomNumber || 'Not Assigned'}
                </Typography>
              </CardContent>
            </Card>

            <Card className="settings-card" elevation={3} sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Quick Info
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List dense>
                  <ListItem>
                    <MeetingRoom sx={{ mr: 2, color: '#667eea' }} fontSize="small" />
                    <ListItemText
                      primary="Room"
                      secondary={user?.room?.roomNumber || 'Not Assigned'}
                    />
                  </ListItem>
                  <ListItem>
                    <School sx={{ mr: 2, color: '#667eea' }} fontSize="small" />
                    <ListItemText
                      primary="Blood Group"
                      secondary={profile.bloodGroup}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card className="settings-card" elevation={3}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Personal Information
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={profile.firstName}
                      onChange={handleProfileChange}
                      InputProps={{
                        startAdornment: <AccountCircle sx={{ mr: 1, color: '#667eea' }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={profile.lastName}
                      onChange={handleProfileChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                      InputProps={{
                        startAdornment: <Email sx={{ mr: 1, color: '#667eea' }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phoneNumber"
                      value={profile.phoneNumber}
                      onChange={handleProfileChange}
                      InputProps={{
                        startAdornment: <Phone sx={{ mr: 1, color: '#667eea' }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Date of Birth"
                      name="dateOfBirth"
                      type="date"
                      value={profile.dateOfBirth}
                      onChange={handleProfileChange}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Blood Group"
                      name="bloodGroup"
                      value={profile.bloodGroup}
                      onChange={handleProfileChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      multiline
                      rows={2}
                      value={profile.address}
                      onChange={handleProfileChange}
                      InputProps={{
                        startAdornment: <Home sx={{ mr: 1, color: '#667eea', alignSelf: 'flex-start', mt: 1 }} />,
                      }}
                    />
                  </Grid>
                </Grid>

                <Typography variant="h6" fontWeight="bold" gutterBottom mt={4}>
                  Emergency Contact
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Parent/Guardian Name"
                      name="parentName"
                      value={profile.parentName}
                      onChange={handleProfileChange}
                      InputProps={{
                        startAdornment: <ContactPhone sx={{ mr: 1, color: '#667eea' }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Emergency Contact"
                      name="emergencyContact"
                      value={profile.emergencyContact}
                      onChange={handleProfileChange}
                      InputProps={{
                        startAdornment: <Phone sx={{ mr: 1, color: '#667eea' }} />,
                      }}
                    />
                  </Grid>
                </Grid>

                <Box mt={3} display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<Save />}
                    onClick={handleSaveProfile}
                    disabled={loading}
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      px: 4,
                      py: 1.5,
                      borderRadius: 3,
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Save Changes
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Security Tab */}
      {tabValue === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card className="settings-card" elevation={3}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Change Password
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Alert severity="info" sx={{ mb: 3 }}>
                  Choose a strong password with at least 6 characters
                </Alert>

                <Box display="flex" flexDirection="column" gap={3}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Current Password"
                    name="currentPassword"
                    value={security.currentPassword}
                    onChange={handleSecurityChange}
                    InputProps={{
                      startAdornment: <Lock sx={{ mr: 1, color: '#667eea' }} />,
                    }}
                  />
                  <TextField
                    fullWidth
                    type="password"
                    label="New Password"
                    name="newPassword"
                    value={security.newPassword}
                    onChange={handleSecurityChange}
                    InputProps={{
                      startAdornment: <Lock sx={{ mr: 1, color: '#667eea' }} />,
                    }}
                  />
                  <TextField
                    fullWidth
                    type="password"
                    label="Confirm New Password"
                    name="confirmPassword"
                    value={security.confirmPassword}
                    onChange={handleSecurityChange}
                    InputProps={{
                      startAdornment: <Lock sx={{ mr: 1, color: '#667eea' }} />,
                    }}
                  />

                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={handleChangePassword}
                    disabled={loading}
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      py: 1.5,
                      borderRadius: 3,
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Change Password
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card className="settings-card" elevation={3}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Account Security
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <List>
                  <ListItem>
                    <ListItemText
                      primary="Account Status"
                      secondary="Active"
                    />
                    <Chip label="Active" color="success" size="small" />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Last Login"
                      secondary="October 30, 2025 at 9:00 AM"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Password Last Changed"
                      secondary="Never"
                    />
                  </ListItem>
                </List>

                <Alert severity="success" sx={{ mt: 2 }}>
                  Your account is secure
                </Alert>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Notifications Tab */}
      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card className="settings-card" elevation={3}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Notification Preferences
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="primary" gutterBottom fontWeight="bold">
                      Communication
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary="Email Notifications"
                          secondary="Receive notifications via email"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={notifications.emailNotifications}
                            onChange={handleNotificationChange('emailNotifications')}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="SMS Notifications"
                          secondary="Receive SMS alerts"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={notifications.smsNotifications}
                            onChange={handleNotificationChange('smsNotifications')}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="primary" gutterBottom fontWeight="bold">
                      Updates
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary="Payment Reminders"
                          secondary="Notify about upcoming payments"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={notifications.paymentReminders}
                            onChange={handleNotificationChange('paymentReminders')}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Complaint Updates"
                          secondary="Get updates on your complaints"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={notifications.complaintUpdates}
                            onChange={handleNotificationChange('complaintUpdates')}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Hostel Announcements"
                          secondary="Important hostel notifications"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={notifications.hostelAnnouncements}
                            onChange={handleNotificationChange('hostelAnnouncements')}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Event Notifications"
                          secondary="Alerts about hostel events"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={notifications.eventNotifications}
                            onChange={handleNotificationChange('eventNotifications')}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>

                <Box mt={3} display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<Save />}
                    onClick={handleSaveNotifications}
                    disabled={loading}
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      px: 4,
                      py: 1.5,
                      borderRadius: 3,
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Save Preferences
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default StudentSettingsPage;

