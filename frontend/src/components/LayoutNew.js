import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  MeetingRoom,
  ReportProblem,
  AttachMoney,
  Assessment,
  People,
  Settings,
  Logout,
  Notifications,
  Hotel,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import './LayoutNew.css';

const drawerWidth = 280;

const LayoutNew = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard', roles: ['ADMIN', 'WARDEN', 'STUDENT'] },

    // Admin & Warden only
    { text: 'Students', icon: <People />, path: '/students', roles: ['ADMIN', 'WARDEN'] },
    { text: 'All Rooms', icon: <MeetingRoom />, path: '/rooms', roles: ['ADMIN', 'WARDEN'] },
    { text: 'All Complaints', icon: <ReportProblem />, path: '/complaints', roles: ['ADMIN', 'WARDEN'] },
    { text: 'All Fees', icon: <AttachMoney />, path: '/payments', roles: ['ADMIN', 'WARDEN'] },

    // Student specific
    { text: 'My Room', icon: <MeetingRoom />, path: '/my-room', roles: ['STUDENT'] },
    { text: 'My Fees', icon: <AttachMoney />, path: '/my-fees', roles: ['STUDENT'] },
    { text: 'My Complaints', icon: <ReportProblem />, path: '/my-complaints', roles: ['STUDENT'] },
    { text: 'Events', icon: <Assessment />, path: '/events', roles: ['STUDENT'] },

    // Admin only
    { text: 'Reports', icon: <Assessment />, path: '/reports', roles: ['ADMIN'] },
    { text: 'Settings', icon: <Settings />, path: '/settings', roles: ['ADMIN'] },
  ];

  const filteredMenuItems = menuItems.filter(item =>
    item.roles.includes(user?.role || 'STUDENT')
  );

  const drawer = (
    <Box className="drawer-content">
      <Box className="drawer-header">
        <Hotel className="logo-icon" />
        <Typography variant="h6" className="logo-text">
          Hostel Manager
        </Typography>
      </Box>
      <Divider />

      <Box className="user-profile">
        <Avatar
          src={user?.profileImage}
          sx={{
            width: 64,
            height: 64,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          {user?.firstName?.[0]}{user?.lastName?.[0]}
        </Avatar>
        <Typography variant="h6" mt={1.5} fontWeight="600">
          {user?.firstName} {user?.lastName}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {user?.role}
        </Typography>
      </Box>

      <Divider />

      <List className="menu-list">
        {filteredMenuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) setMobileOpen(false);
                }}
                className={`menu-item ${isActive ? 'active' : ''}`}
              >
                <ListItemIcon className={`menu-icon ${isActive ? 'active' : ''}`}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout} className="logout-button">
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box className="layout-root">
      <AppBar
        position="fixed"
        className="app-bar"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {filteredMenuItems.find(item => item.path === location.pathname)?.text || 'Dashboard'}
          </Typography>

          <Tooltip title="Notifications">
            <IconButton color="inherit">
              <Badge badgeContent={3} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Account">
            <IconButton onClick={handleProfileMenuOpen} sx={{ ml: 1 }}>
              <Avatar
                src={user?.profileImage}
                sx={{
                  width: 40,
                  height: 40,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              >
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
      >
        <MenuItem onClick={() => navigate('/settings')}>
          <Settings fontSize="small" sx={{ mr: 1 }} />
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Logout fontSize="small" sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        className="main-content"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default LayoutNew;

