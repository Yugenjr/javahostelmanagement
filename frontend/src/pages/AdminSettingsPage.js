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
} from '@mui/material';
import {
  AccountCircle,
  Security,
  Notifications,
  Settings as SettingsIcon,
  Save,
  Edit,
  PhotoCamera,
  Email,
  Phone,
  Lock,
  Language,
  Palette,
  Storage,
  Group,
  Description,
} from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';
import './SettingsPage.css';

const AdminSettingsPage = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    firstName: user?.firstName || 'Admin',
    lastName: user?.lastName || 'User',
    email: user?.email || 'admin@hostel.com',
    phoneNumber: user?.phoneNumber || '1234567890',
    address: user?.address || 'Admin Office',
  });

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
  });

  const [systemSettings, setSystemSettings] = useState({
    autoBackup: true,
    emailNotifications: true,
    smsNotifications: false,
    maintenanceMode: false,
    allowRegistrations: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
  });

  const [notifications, setNotifications] = useState({
    newStudentRegistration: true,
    newComplaint: true,
    paymentReceived: true,
    overduePayments: true,
    systemAlerts: true,
    weeklyReports: false,
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

  const handleSystemSettingChange = (name) => (event) => {
    setSystemSettings({ ...systemSettings, [name]: event.target.checked });
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
      setSecurity({ currentPassword: '', newPassword: '', confirmPassword: '', twoFactorEnabled: security.twoFactorEnabled });
      setLoading(false);
    }, 1000);
  };

  const handleSaveSystemSettings = async () => {
    setLoading(true);
    setTimeout(() => {
      toast.success('System settings updated successfully!');
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
              Admin Settings
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Manage system configuration and preferences
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
          <Tab icon={<Settings />} label="System" iconPosition="start" />
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
                <Typography variant="body2" color="primary" gutterBottom>
                  Administrator
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Full system access
                </Typography>
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
                  Security Options
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <List>
                  <ListItem>
                    <ListItemText
                      primary="Two-Factor Authentication"
                      secondary="Add an extra layer of security"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={security.twoFactorEnabled}
                        onChange={(e) => setSecurity({ ...security, twoFactorEnabled: e.target.checked })}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>

                <Alert severity="info" sx={{ mt: 2 }}>
                  Last password change: Never
                </Alert>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* System Settings Tab */}
      {tabValue === 2 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card className="settings-card" elevation={3}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  System Configuration
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <List>
                  <ListItem>
                    <ListItemText
                      primary="Auto Backup"
                      secondary="Automatic daily database backup"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={systemSettings.autoBackup}
                        onChange={handleSystemSettingChange('autoBackup')}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>

                  <ListItem>
                    <ListItemText
                      primary="Email Notifications"
                      secondary="Send email notifications"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={systemSettings.emailNotifications}
                        onChange={handleSystemSettingChange('emailNotifications')}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>

                  <ListItem>
                    <ListItemText
                      primary="SMS Notifications"
                      secondary="Send SMS alerts"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={systemSettings.smsNotifications}
                        onChange={handleSystemSettingChange('smsNotifications')}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>

                  <ListItem>
                    <ListItemText
                      primary="Allow New Registrations"
                      secondary="Students can register online"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={systemSettings.allowRegistrations}
                        onChange={handleSystemSettingChange('allowRegistrations')}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>

                  <ListItem>
                    <ListItemText
                      primary="Maintenance Mode"
                      secondary="Restrict access to admins only"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={systemSettings.maintenanceMode}
                        onChange={handleSystemSettingChange('maintenanceMode')}
                        color="error"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>

                <Box mt={3}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Session Timeout (minutes)"
                    value={systemSettings.sessionTimeout}
                    onChange={(e) => setSystemSettings({ ...systemSettings, sessionTimeout: e.target.value })}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    type="number"
                    label="Max Login Attempts"
                    value={systemSettings.maxLoginAttempts}
                    onChange={(e) => setSystemSettings({ ...systemSettings, maxLoginAttempts: e.target.value })}
                  />
                </Box>

                <Box mt={3} display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<Save />}
                    onClick={handleSaveSystemSettings}
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
                    Save Settings
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card className="settings-card" elevation={3}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  System Information
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <List>
                  <ListItem>
                    <Storage sx={{ mr: 2, color: '#667eea' }} />
                    <ListItemText
                      primary="Database"
                      secondary="MySQL 8.0.42"
                    />
                  </ListItem>
                  <ListItem>
                    <Group sx={{ mr: 2, color: '#667eea' }} />
                    <ListItemText
                      primary="Total Users"
                      secondary="125 users"
                    />
                  </ListItem>
                  <ListItem>
                    <Description sx={{ mr: 2, color: '#667eea' }} />
                    <ListItemText
                      primary="Version"
                      secondary="v1.0.0"
                    />
                  </ListItem>
                </List>

                <Alert severity="success" sx={{ mt: 2 }}>
                  System is running smoothly
                </Alert>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Notifications Tab */}
      {tabValue === 3 && (
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
                      Student Activities
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary="New Student Registration"
                          secondary="Notify when a new student registers"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={notifications.newStudentRegistration}
                            onChange={handleNotificationChange('newStudentRegistration')}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="New Complaints"
                          secondary="Alert on new complaint submissions"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={notifications.newComplaint}
                            onChange={handleNotificationChange('newComplaint')}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="primary" gutterBottom fontWeight="bold">
                      Financial
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary="Payment Received"
                          secondary="Notify when payment is made"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={notifications.paymentReceived}
                            onChange={handleNotificationChange('paymentReceived')}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Overdue Payments"
                          secondary="Alert for overdue fees"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={notifications.overduePayments}
                            onChange={handleNotificationChange('overduePayments')}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" color="primary" gutterBottom fontWeight="bold">
                      System
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary="System Alerts"
                          secondary="Critical system notifications"
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={notifications.systemAlerts}
                            onChange={handleNotificationChange('systemAlerts')}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Weekly Reports"
                          secondary="Receive weekly summary reports"
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
    </Box>
  );
};

export default AdminSettingsPage;

