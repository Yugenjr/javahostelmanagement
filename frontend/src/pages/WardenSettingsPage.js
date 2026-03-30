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
  Badge,
  Work,
  Schedule,
} from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';
import './SettingsPage.css';

const WardenSettingsPage = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    firstName: user?.firstName || 'Warden',
    lastName: user?.lastName || 'User',
    email: user?.email || 'warden@hostel.com',
    phoneNumber: user?.phoneNumber || '1234567890',
    address: user?.address || 'Warden Office',
    employeeId: 'WDN001',
    department: 'Hostel Management',
    joinDate: '2024-01-01',
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: true,
    newComplaints: true,
    urgentComplaints: true,
    newStudentAdmission: true,
    paymentAlerts: true,
    dailySummary: true,
    weeklyReports: false,
  });

  const [workPreferences, setWorkPreferences] = useState({
    autoAssignComplaints: true,
    showDashboardStats: true,
    compactView: false,
    notificationSound: true,
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

  const handleWorkPreferenceChange = (name) => (event) => {
    setWorkPreferences({ ...workPreferences, [name]: event.target.checked });
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

  const handleSaveWorkPreferences = async () => {
    setLoading(true);
    setTimeout(() => {
      toast.success('Work preferences updated!');
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
              Warden Settings
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Manage your profile and work preferences
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
          <Tab icon={<Work />} label="Work Preferences" iconPosition="start" />
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
                <Chip label="Warden" color="primary" sx={{ mb: 1 }} />
                <Typography variant="body2" color="textSecondary">
                  {profile.department}
                </Typography>
              </CardContent>
            </Card>

            <Card className="settings-card" elevation={3} sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Employment Info
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List dense>
                  <ListItem>
                    <Badge sx={{ mr: 2, color: '#667eea' }} fontSize="small" />
                    <ListItemText
                      primary="Employee ID"
                      secondary={profile.employeeId}
                    />
                  </ListItem>
                  <ListItem>
                    <Work sx={{ mr: 2, color: '#667eea' }} fontSize="small" />
                    <ListItemText
                      primary="Department"
                      secondary={profile.department}
                    />
                  </ListItem>
                  <ListItem>
                    <Schedule sx={{ mr: 2, color: '#667eea' }} fontSize="small" />
                    <ListItemText
                      primary="Join Date"
                      secondary={profile.joinDate}
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
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      multiline
                      rows={2}
                      value={profile.address}
                      onChange={handleProfileChange}
                    />
                  </Grid>
                </Grid>

                <Typography variant="h6" fontWeight="bold" gutterBottom mt={4}>
                  Employment Details
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Employee ID"
                      name="employeeId"
                      value={profile.employeeId}
                      onChange={handleProfileChange}
                      disabled
                      InputProps={{
                        startAdornment: <Badge sx={{ mr: 1, color: '#667eea' }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Department"
                      name="department"
                      value={profile.department}
                      onChange={handleProfileChange}
                      InputProps={{
                        startAdornment: <Work sx={{ mr: 1, color: '#667eea' }} />,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Join Date"
                      name="joinDate"
                      type="date"
                      value={profile.joinDate}
                      onChange={handleProfileChange}
                      InputLabelProps={{ shrink: true }}
                      disabled
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
                  Use a strong password to protect your account
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
                      secondary="October 30, 2025 at 8:30 AM"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Password Last Changed"
                      secondary="Never"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Access Level"
                      secondary="Warden - Full Access"
                    />
                  </ListItem>
                </List>

                <Alert severity="success" sx={{ mt: 2 }}>
                  Your account is secure and active
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
                      Alerts
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary="New Complaints"
                          secondary="Notify when new complaints are filed"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={notifications.newComplaints}
                            onChange={handleNotificationChange('newComplaints')}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Urgent Complaints"
                          secondary="Alert for high priority complaints"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={notifications.urgentComplaints}
                            onChange={handleNotificationChange('urgentComplaints')}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="New Student Admission"
                          secondary="Notify about new student registrations"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={notifications.newStudentAdmission}
                            onChange={handleNotificationChange('newStudentAdmission')}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Payment Alerts"
                          secondary="Notifications about payments"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={notifications.paymentAlerts}
                            onChange={handleNotificationChange('paymentAlerts')}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="primary" gutterBottom fontWeight="bold">
                      Reports
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary="Daily Summary"
                          secondary="Daily activity summary"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={notifications.dailySummary}
                            onChange={handleNotificationChange('dailySummary')}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Weekly Reports"
                          secondary="Comprehensive weekly reports"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={notifications.weeklyReports}
                            onChange={handleNotificationChange('weeklyReports')}
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

      {/* Work Preferences Tab */}
      {tabValue === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card className="settings-card" elevation={3}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Work Preferences
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <List>
                  <ListItem>
                    <ListItemText
                      primary="Auto-Assign Complaints"
                      secondary="Automatically assign new complaints to you"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={workPreferences.autoAssignComplaints}
                        onChange={handleWorkPreferenceChange('autoAssignComplaints')}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Show Dashboard Statistics"
                      secondary="Display detailed stats on dashboard"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={workPreferences.showDashboardStats}
                        onChange={handleWorkPreferenceChange('showDashboardStats')}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Compact View"
                      secondary="Use compact layout for lists"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={workPreferences.compactView}
                        onChange={handleWorkPreferenceChange('compactView')}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Notification Sound"
                      secondary="Play sound for new notifications"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={workPreferences.notificationSound}
                        onChange={handleWorkPreferenceChange('notificationSound')}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>

                <Box mt={3} display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<Save />}
                    onClick={handleSaveWorkPreferences}
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

export default WardenSettingsPage;

