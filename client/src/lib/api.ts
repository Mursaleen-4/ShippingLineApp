import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import {
  User,
  Vessel,
  LoginCredentials,
  CreateVesselInput,
  UpdateVesselInput,
  VesselQuery,
  VesselListResponse,
  DashboardData,
  HealthStatus,
  ApiResponse,
  ApiError
} from './types';

// API Configuration
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000';

// Create axios instance with default config
const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    timeout: 30000,
    withCredentials: true, // Important for HTTP-only cookies
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      // Add timestamp to prevent caching issues
      config.params = {
        ...config.params,
        _t: Date.now()
      };
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor for error handling
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      const apiError = handleApiError(error);
      
      // Show error toast for non-401 errors
      if (error.response?.status !== 401) {
        toast.error(apiError.message);
      }
      
      return Promise.reject(apiError);
    }
  );

  return instance;
};

// Error handler
const handleApiError = (error: AxiosError): ApiError => {
  if (error.response?.data) {
    const errorData = error.response.data as any;
    return {
      code: errorData.error?.code || 'API_ERROR',
      message: errorData.error?.message || errorData.message || 'An unexpected error occurred',
      details: errorData.error?.details
    };
  }

  if (error.code === 'ECONNABORTED') {
    return {
      code: 'TIMEOUT_ERROR',
      message: 'Request timed out. Please check your connection and try again.'
    };
  }

  if (error.code === 'ERR_NETWORK') {
    return {
      code: 'NETWORK_ERROR',
      message: 'Network error. Please check your internet connection.'
    };
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: error.message || 'An unexpected error occurred'
  };
};

// Create API instance
const api = createApiInstance();

// Authentication API
export const authApi = {
  // Login user
  login: async (credentials: LoginCredentials): Promise<{ user: User }> => {
    const response = await api.post<ApiResponse<{ user: User }>>('/auth/login', credentials);
    return (response.data as any).data || response.data;
  },

  // Logout user
  logout: async (): Promise<{ message: string }> => {
    const response = await api.post<ApiResponse<{ message: string }>>('/auth/logout');
    return (response.data as any).data || response.data;
  },

  // Get current user
  getMe: async (): Promise<{ user: User }> => {
    const response = await api.get<ApiResponse<{ user: User }>>('/auth/me');
    return (response.data as any).data || response.data;
  },

  // Refresh token
  refreshToken: async (): Promise<{ user: User }> => {
    const response = await api.post<ApiResponse<{ user: User }>>('/auth/refresh');
    return (response.data as any).data || response.data;
  },

  // Check auth status
  checkAuth: async (): Promise<{ authenticated: boolean; user: User | null }> => {
    const response = await api.get<ApiResponse<{ authenticated: boolean; user: User | null }>>('/auth/check');
    return (response.data as any).data || response.data;
  },
};

// Vessels API
export const vesselsApi = {
  // Get all vessels with filtering and pagination
  getVessels: async (query: VesselQuery = {}): Promise<VesselListResponse> => {
    const response = await api.get<VesselListResponse>('/vessels', { params: query });
    return response.data;
  },

  // Get single vessel by ID
  getVessel: async (id: string): Promise<{ vessel: Vessel }> => {
    const response = await api.get<ApiResponse<{ vessel: Vessel }>>(`/vessels/${id}`);
    return (response.data as any).data || response.data;
  },

  // Create new vessel
  createVessel: async (vessel: CreateVesselInput): Promise<{ vessel: Vessel; message: string }> => {
    const response = await api.post<ApiResponse<{ vessel: Vessel; message: string }>>('/vessels', vessel);
    return (response.data as any).data || response.data;
  },

  // Update vessel
  updateVessel: async (id: string, updates: UpdateVesselInput): Promise<{ vessel: Vessel; message: string }> => {
    const response = await api.put<ApiResponse<{ vessel: Vessel; message: string }>>(`/vessels/${id}`, updates);
    return (response.data as any).data || response.data;
  },

  // Delete vessel
  deleteVessel: async (id: string): Promise<{ vessel: Vessel; message: string }> => {
    const response = await api.delete<ApiResponse<{ vessel: Vessel; message: string }>>(`/vessels/${id}`);
    return (response.data as any).data || response.data;
  },

  // Bulk delete vessels (Admin only)
  bulkDelete: async (ids: string[]): Promise<{ deletedCount: number; message: string }> => {
    const response = await api.delete<ApiResponse<{ deletedCount: number; message: string }>>('/vessels/bulk', { 
      data: { ids } 
    });
    return (response.data as any).data || response.data;
  },

  // Get vessel statistics
  getStats: async (): Promise<DashboardData> => {
    const response = await api.get<DashboardData>('/vessels/stats');
    return response.data;
  },
};

// Health API
export const healthApi = {
  // Get health status
  getHealth: async (): Promise<HealthStatus> => {
    const response = await api.get<HealthStatus>('/health');
    return response.data;
  },

  // Check readiness
  checkReadiness: async (): Promise<{ status: string; message: string }> => {
    const response = await api.get<{ status: string; message: string }>('/health/ready');
    return response.data;
  },

  // Check liveness
  checkLiveness: async (): Promise<{ status: string; message: string }> => {
    const response = await api.get<{ status: string; message: string }>('/health/live');
    return response.data;
  },
};

// Utility functions for API calls
export const apiUtils = {
  // Generic API call wrapper with loading state
  withLoading: async <T>(
    apiCall: () => Promise<T>,
    setLoading?: (loading: boolean) => void
  ): Promise<T> => {
    try {
      setLoading?.(true);
      const result = await apiCall();
      return result;
    } finally {
      setLoading?.(false);
    }
  },

  // Retry API call with exponential backoff
  retry: async <T>(
    apiCall: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
  ): Promise<T> => {
    let lastError: any;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await apiCall();
      } catch (error) {
        lastError = error;
        
        if (attempt === maxRetries) {
          break;
        }
        
        // Exponential backoff
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw lastError;
  },

  // Cancel request using AbortController
  createCancelableRequest: (signal?: AbortSignal) => {
    const controller = new AbortController();
    const combinedSignal = signal ? signal : controller.signal;
    
    return {
      signal: combinedSignal,
      cancel: () => controller.abort(),
    };
  },

  // Build query string from object
  buildQueryString: (params: Record<string, any>): string => {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, String(value));
      }
    });
    
    return searchParams.toString();
  },

  // Format API error for display
  formatError: (error: ApiError): string => {
    if (error.details && Array.isArray(error.details)) {
      return error.details.map((d: any) => d.message || d).join(', ');
    }
    return error.message;
  },
};

// Export default api instance for direct use if needed
export default api;

// Export common status codes for reference
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;
