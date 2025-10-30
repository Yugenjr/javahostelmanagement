import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  Collapse,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  PersonAdd,
  Hotel,
  CheckCircle,
  Error as ErrorIcon,
  Security,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import './LoginNew.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setError('');
    setSuccess('');
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!loginData.username.trim()) {
      setError('Username is required');
      setLoading(false);
      return;
    }

    if (!loginData.password.trim()) {
      setError('Password is required');
      setLoading(false);
      return;
    }

    try {
      console.log('Attempting login...');
      const result = await login(loginData.username, loginData.password);
      console.log('Login result:', result);

      if (result.success) {
        setSuccess('Login successful! Redirecting...');
        console.log('Navigating to dashboard...');
        // Use a longer timeout to ensure state is updated
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 500);
      } else {
        setError(result.error || 'Invalid username or password. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Unable to connect to server. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!registerData.firstName.trim()) {
      setError('First name is required');
      return;
    }

    if (!registerData.lastName.trim()) {
      setError('Last name is required');
      return;
    }

    if (!registerData.username.trim()) {
      setError('Username is required');
      return;
    }

    if (registerData.username.length < 4) {
      setError('Username must be at least 4 characters');
      return;
    }

    if (!registerData.email.trim() || !registerData.email.includes('@')) {
      setError('Valid email is required');
      return;
    }

    if (!registerData.phoneNumber.trim() || registerData.phoneNumber.length < 10) {
      setError('Valid 10-digit phone number is required');
      return;
    }

    if (!registerData.password.trim() || registerData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...dataToSend } = registerData;
      const result = await register({ ...dataToSend, role: 'STUDENT' });

      if (result.success) {
        setSuccess('Registration successful! Please login with your credentials.');
        setTimeout(() => {
          setTabValue(0);
          setRegisterData({
            username: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
          });
        }, 2000);
      } else {
        setError(result.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Unable to connect to server. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const quickLoginDemo = (username, password) => {
    setLoginData({ username, password });
    setError('');
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="animated-bg"></div>
        <div className="stars">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="star" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}></div>
          ))}
        </div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      <Container maxWidth="sm">
        <Zoom in timeout={600}>
          <Box className="login-box">
            <Paper elevation={24} className="login-paper">
              <Box className="login-header">
                <Fade in timeout={800}>
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <Hotel className="login-icon" />
                    <Typography variant="h3" component="h1" className="login-title">
                      Hostel Manager
                    </Typography>
                    <Typography variant="body1" color="textSecondary" className="login-subtitle">
                      Your Complete Hostel Management Solution
                    </Typography>
                    <Box className="feature-badges" display="flex" gap={1} mt={2}>
                      <Box className="badge">
                        <Security fontSize="small" />
                        <Typography variant="caption">Secure</Typography>
                      </Box>
                      <Box className="badge">
                        <CheckCircle fontSize="small" />
                        <Typography variant="caption">Reliable</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Fade>
              </Box>

              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                centered
                className="login-tabs"
                sx={{
                  '& .MuiTab-root': {
                    minHeight: 64,
                    fontSize: '16px',
                    fontWeight: 600,
                  }
                }}
              >
                <Tab
                  icon={<LoginIcon />}
                  label="Login"
                  iconPosition="start"
                />
                <Tab
                  icon={<PersonAdd />}
                  label="Register"
                  iconPosition="start"
                />
              </Tabs>

              <Collapse in={!!error}>
                <Alert
                  severity="error"
                  className="login-alert"
                  icon={<ErrorIcon />}
                  onClose={() => setError('')}
                  sx={{ m: 2, borderRadius: 2 }}
                >
                  <Typography variant="body2" fontWeight={600}>
                    {error}
                  </Typography>
                </Alert>
              </Collapse>

              <Collapse in={!!success}>
                <Alert
                  severity="success"
                  className="login-alert"
                  icon={<CheckCircle />}
                  onClose={() => setSuccess('')}
                  sx={{ m: 2, borderRadius: 2 }}
                >
                  <Typography variant="body2" fontWeight={600}>
                    {success}
                  </Typography>
                </Alert>
              </Collapse>

              {tabValue === 0 ? (
                <Fade in timeout={500}>
                  <form onSubmit={handleLogin} className="login-form">
                    <TextField
                      fullWidth
                      label="Username"
                      name="username"
                      value={loginData.username}
                      onChange={handleLoginChange}
                      required
                      margin="normal"
                      variant="outlined"
                      autoComplete="username"
                      error={error.includes('username') || error.includes('Username')}
                      helperText={error.includes('username') || error.includes('Username') ? error : ''}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LoginIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={loginData.password}
                      onChange={handleLoginChange}
                      required
                      margin="normal"
                      variant="outlined"
                      autoComplete="current-password"
                      error={error.includes('password') || error.includes('Password')}
                      helperText={error.includes('password') || error.includes('Password') ? error : ''}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={loading}
                      className="login-button"
                      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                    >
                      {loading ? 'Signing in...' : 'Sign In'}
                    </Button>

                    <Box className="demo-credentials">
                      <Typography variant="caption" color="textSecondary" fontWeight={700} gutterBottom display="block">
                        🎯 Quick Demo Access
                      </Typography>
                      <Typography variant="caption" color="textSecondary" gutterBottom display="block" mb={1.5}>
                        Click to auto-fill credentials:
                      </Typography>
                      <Box className="demo-buttons">
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => quickLoginDemo('admin', 'admin123')}
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                          }}
                        >
                          👨‍💼 Admin
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => quickLoginDemo('warden', 'warden123')}
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                          }}
                        >
                          🔑 Warden
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => quickLoginDemo('student1', 'student123')}
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600,
                          }}
                        >
                          🎓 Student
                        </Button>
                      </Box>
                      <Typography variant="caption" color="textSecondary" display="block" mt={2} sx={{ fontStyle: 'italic' }}>
                        💡 Tip: Use Postman to create accounts with real MySQL data
                      </Typography>
                    </Box>
                  </form>
                </Fade>
              ) : (
                <Fade in timeout={500}>
                  <form onSubmit={handleRegister} className="login-form">
                    <Box display="flex" gap={2}>
                      <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={registerData.firstName}
                        onChange={handleRegisterChange}
                        required
                        margin="normal"
                        variant="outlined"
                      />
                      <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={registerData.lastName}
                        onChange={handleRegisterChange}
                        required
                        margin="normal"
                        variant="outlined"
                      />
                    </Box>

                    <TextField
                      fullWidth
                      label="Username"
                      name="username"
                      value={registerData.username}
                      onChange={handleRegisterChange}
                      required
                      margin="normal"
                      variant="outlined"
                      helperText="Minimum 4 characters"
                    />

                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      required
                      margin="normal"
                      variant="outlined"
                      helperText="Your institutional email"
                    />

                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phoneNumber"
                      value={registerData.phoneNumber}
                      onChange={handleRegisterChange}
                      required
                      margin="normal"
                      variant="outlined"
                      placeholder="10 digits"
                      helperText="10-digit mobile number"
                    />

                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      required
                      margin="normal"
                      variant="outlined"
                      helperText="Minimum 6 characters"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      fullWidth
                      label="Confirm Password"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                      required
                      margin="normal"
                      variant="outlined"
                      error={registerData.password !== registerData.confirmPassword && registerData.confirmPassword !== ''}
                      helperText={
                        registerData.password !== registerData.confirmPassword && registerData.confirmPassword !== ''
                          ? 'Passwords do not match'
                          : 'Re-enter your password'
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              edge="end"
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={loading}
                      className="login-button"
                      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PersonAdd />}
                    >
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </form>
                </Fade>
              )}
            </Paper>
          </Box>
        </Zoom>
      </Container>
    </div>
  );
};

export default LoginPage;

