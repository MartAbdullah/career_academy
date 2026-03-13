import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  withCredentials: true, // Crucial for HttpOnly cookies support (JWT)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('API: Sending request to', config.url, 'with method:', config.method);
    return config;
  },
  (error) => {
    console.error('API: Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Interceptor to handle global errors (especially 401 Unauthorized)
api.interceptors.response.use(
  (response) => {
    console.log('API: Response received from', response.config.url, 'Status:', response.status);
    return response;
  },
  (error) => {
    console.error('API: Response error from', error.config?.url, 'Status:', error.response?.status, 'Data:', error.response?.data);
    if (error.response?.status === 401) {
      // Logic for redirecting to login or clearing state
      console.error('Unauthorized - Logging out...');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
