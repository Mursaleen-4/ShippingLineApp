import { createContext, useContext, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authApi } from './api';
import { AuthState, User, LoginCredentials, ApiError } from './types';

// Create Auth Context
const AuthContext = createContext<{
  auth: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  checkAuth: () => Promise<void>;
} | null>(null);

// Auth Provider Props
interface AuthProviderProps {
  children: React.ReactNode;
}

// Auth Provider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const navigate = useNavigate();

  // Login function
  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setAuth(prev => ({ ...prev, isLoading: true }));
      
      const response = await authApi.login(credentials);
      
      setAuth({
        user: response.user,
        isAuthenticated: true,
        isLoading: false,
      });

      toast.success(`Welcome back, ${response.user.userId}!`);
      
      // Redirect to dashboard after successful login
      navigate('/vessel-data-entry', { replace: true });
      
    } catch (error) {
      const apiError = error as ApiError;
      setAuth({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      
      // Error toast is handled by API interceptor
      throw error;
    }
  }, [navigate]);

  // Logout function
  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn('Logout API call failed:', error);
    } finally {
      setAuth({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      
      toast.success('Logged out successfully');
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  // Refresh token function
  const refreshToken = useCallback(async () => {
    try {
      const response = await authApi.refreshToken();
      
      setAuth(prev => ({
        ...prev,
        user: response.user,
        isAuthenticated: true,
      }));
      
    } catch (error) {
      setAuth({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      
      // Don't show error toast for token refresh failures
      throw error;
    }
  }, []);

  // Check authentication status
  const checkAuth = useCallback(async () => {
    try {
      const response = await authApi.checkAuth();
      
      setAuth({
        user: response.user,
        isAuthenticated: response.authenticated,
        isLoading: false,
      });
      
    } catch (error) {
      setAuth({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  // Check auth on app load
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Auto-refresh token before expiry (optional enhancement)
  useEffect(() => {
    if (auth.isAuthenticated) {
      // Set up token refresh interval (6 days for 7-day tokens)
      const refreshInterval = setInterval(() => {
        refreshToken().catch(() => {
          // If refresh fails, user will be logged out on next API call
        });
      }, 6 * 24 * 60 * 60 * 1000); // 6 days in milliseconds

      return () => clearInterval(refreshInterval);
    }
  }, [auth.isAuthenticated, refreshToken]);

  return (
    <AuthContext.Provider value={{ auth, login, logout, refreshToken, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Auth Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Protected Route Hook
export const useRequireAuth = (redirectTo: string = '/login') => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      navigate(redirectTo, { replace: true });
    }
  }, [auth.isAuthenticated, auth.isLoading, navigate, redirectTo]);

  return auth;
};

// Admin Only Hook
export const useRequireAdmin = (redirectTo: string = '/dashboard') => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isLoading && (!auth.isAuthenticated || auth.user?.role !== 'admin')) {
      toast.error('Admin access required');
      navigate(redirectTo, { replace: true });
    }
  }, [auth.isAuthenticated, auth.isLoading, auth.user?.role, navigate, redirectTo]);

  return auth;
};

// Auth Utils
export const authUtils = {
  // Check if user has specific role
  hasRole: (user: User | null, role: 'admin' | 'user'): boolean => {
    return user?.role === role;
  },

  // Check if user is admin
  isAdmin: (user: User | null): boolean => {
    return user?.role === 'admin';
  },

  // Check if user is authenticated
  isAuthenticated: (auth: AuthState): boolean => {
    return auth.isAuthenticated && auth.user !== null;
  },

  // Get user display name
  getDisplayName: (user: User | null): string => {
    return user?.userId || 'Guest';
  },

  // Format user role for display
  formatRole: (role: 'admin' | 'user'): string => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  },

  // Check if auth is still loading
  isLoading: (auth: AuthState): boolean => {
    return auth.isLoading;
  },
};
