import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  withCredentials: true, // Crucial for HttpOnly cookies support (JWT)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to handle global errors (especially 401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Logic for redirecting to login or clearing state
      console.error('Unauthorized - Logging out...');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
