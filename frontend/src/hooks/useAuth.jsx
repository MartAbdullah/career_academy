import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      // Backend should have a /me or /auth/status endpoint
      const response = await api.get('/auth/me');
      setUser(response.data);
    } catch (error) {
      // User not authenticated - silently fail
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async (credentials) => {
    // Note: Backend stores JWT in HttpOnly cookie, so no need to store it in LocalStorage
    console.log('useAuth: Sending login request with:', { email: credentials.email });
    const response = await api.post('/auth/login', credentials);
    console.log('useAuth: Login response received:', response.data);
    setUser(response.data.user);
    console.log('useAuth: User state updated:', response.data.user);
    return response.data;
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
