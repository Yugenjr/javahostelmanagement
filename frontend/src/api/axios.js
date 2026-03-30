import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Track backend availability
let backendAvailable = true;
let useMockData = false;

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - NO MOCK DATA FALLBACK
api.interceptors.response.use(
  (response) => {
    backendAvailable = true;
    useMockData = false;
    return response;
  },
  async (error) => {
    // Handle authentication errors
    if (error.response && error.response.status === 401) {
      console.log('401 Unauthorized - clearing token');
      localStorage.removeItem('token');
      // Don't force reload, let React Router handle navigation
    }

    // Log error for debugging
    console.error('API Error:', error.response?.data || error.message);

    return Promise.reject(error);
  }
);

export const isBackendAvailable = () => backendAvailable;
export const isMockMode = () => useMockData;

export default api;


