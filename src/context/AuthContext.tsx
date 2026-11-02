import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types/hotel';
import { apiRequest, setAuthToken, clearAuthToken, getAuthToken } from '../api/client';

interface AuthContextType {
  user: User | null;
  stayoraUser: User | null;
  stayoraToken: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  loginWithGoogle: (email: string, fullName?: string) => Promise<User>;
  register: (fullName: string, email: string, password: string, role?: UserRole, hotelId?: string, staffRole?: string, hotelName?: string) => Promise<User>;
  demoSwitch: (role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function checkAuth() {
      const token = getAuthToken();
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const res = await apiRequest<{ user: User }>('/auth/me');
        setUser(res.user);
        localStorage.setItem('stayoraUser', JSON.stringify(res.user));
      } catch {
        clearAuthToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    const res = await apiRequest<{ user: User; token: string; redirectUrl?: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    setAuthToken(res.token);
    setUser(res.user);
    localStorage.setItem('stayoraUser', JSON.stringify(res.user));
    return res.user;
  };

  const loginWithGoogle = async (email: string, fullName?: string): Promise<User> => {
    const res = await apiRequest<{ user: User; token: string; redirectUrl?: string }>('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ email, fullName })
    });
    setAuthToken(res.token);
    setUser(res.user);
    localStorage.setItem('stayoraUser', JSON.stringify(res.user));
    return res.user;
  };

  const register = async (fullName: string, email: string, password: string, role: UserRole = 'customer', hotelId?: string, staffRole?: string, hotelName?: string): Promise<User> => {
    const res = await apiRequest<{ user: User; token: string; redirectUrl?: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ fullName, email, password, role, hotelId, staffRole, hotelName })
    });
    setAuthToken(res.token);
    setUser(res.user);
    localStorage.setItem('stayoraUser', JSON.stringify(res.user));
    return res.user;
  };

  const demoSwitch = async (role: UserRole) => {
    setLoading(true);
    try {
      const res = await apiRequest<{ user: User; token: string }>('/auth/demo-switch', {
        method: 'POST',
        body: JSON.stringify({ role })
      });
      setAuthToken(res.token);
      setUser(res.user);
      localStorage.setItem('stayoraUser', JSON.stringify(res.user));
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } catch {
      // Ignore network errors on logout
    } finally {
      clearAuthToken();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        stayoraUser: user,
        stayoraToken: getAuthToken(),
        loading,
        login,
        loginWithGoogle,
        register,
        demoSwitch,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
