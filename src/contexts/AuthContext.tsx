import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        // Here you would typically verify the token with your backend
        // For now, we'll just set a dummy user
        setUser({
          userId: '1',
          email: 'user@example.com',
          userName: 'Demo User',
          isActive: true,
        });
      } catch (error) {
        localStorage.removeItem('accessToken');
        console.log(error)
      }
    }
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    localStorage.setItem('accessToken', response.accessToken);
    // In a real app, you'd get user data from the login response
    setUser({
      userId: '1',
      email,
      userName: email.split('@')[0],
      isActive: true,
    });
  };

  const logout = async () => {
    await authService.logout();
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      loading,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};