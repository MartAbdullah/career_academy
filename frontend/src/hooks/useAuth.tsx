import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../utils/api';

interface User {
  id: number;
  email: string;
  name?: string;
  full_name?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: any) => Promise<any>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const checkAuthStatus = async (force: boolean = false) => {
    // Sadece dashboard veya alt sayfalarındayken kontrol et (force=true değilse)
    const isProtectedPath = window.location.pathname.startsWith('/dashboard') || 
                            window.location.pathname === '/';
                            
    if (!isProtectedPath && !force) {
      setLoading(false);
      return;
    }

    try {
      const response = await api.get('/auth/me');
      setUser(response.data);
    } catch (error: any) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async (credentials: any) => {
    // Note: Backend stores JWT in HttpOnly cookie, so no need to store it in LocalStorage
    console.log('useAuth: Sending login request with:', { email: credentials.email });
    const response = await api.post('/auth/login', credentials);
    console.log('useAuth: Login response received:', response.data);
    
    // Refresh the user state from the /me endpoint to ensure we have the most up-to-date data 
    // and that the cookie is working properly. Sitede hangi sayfada olursak olalım 
    // login anında force=true ile me kontrolü yapmalıyız.
    await checkAuthStatus(true);
    
    return response.data;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      setLoading(false);
      // Sayfayı yenileyerek temiz bir başlangıç yap ve yönlendirmeyi sağla
      window.location.href = '/login';
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
