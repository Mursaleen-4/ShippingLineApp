// src/lib/api.ts
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

// -----------------------------
// Base URL from Vite env
// -----------------------------
export const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000';
console.log('API_BASE_URL:', API_BASE_URL);

// -----------------------------
// Axios instance
// -----------------------------
const createApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    timeout: 30000,
    withCredentials: true, // For HTTP-only cookies
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  // Request interceptor: add timestamp to prevent caching
  instance.interceptors.request.use(
    (config) => {
      config.params = {
        ...config.params,
        _t: Date.now()
      };
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor: handle errors globally
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      const apiError = handleApiError(error);
      if (error.response?.status !== 401) {
        toast.error(apiError.message);
      }
      return Promise.reject(apiError);
    }
  );

  return instance;
};

// -----------------------------
// Error handler
// -----------------------------
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
    return { code: 'TIMEOUT_ERROR', message: 'Request timed out. Please check your connection.' };
  }

  if (error.code === 'ERR_NETWORK') {
    return { code: 'NETWORK_ERROR', message: 'Network error. Please check your internet connection.' };
  }

  return { code: 'UNKNOWN_ERROR', message: error.message || 'An unexpected error occurred' };
};

// -----------------------------
// Axios instance
// -----------------------------
const api = createApiInstance();

// -----------------------------
// Auth API
// -----------------------------
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<{ user: User }> => {
    const res = await api.post<ApiResponse<{ user: User }>>('/auth/login', credentials);
    return res.data.data || res.data;
  },
  logout: async (): Promise<{ message: string }> => {
    const res = await api.post<ApiResponse<{ message: string }>>('/auth/logout');
    return res.data.data || res.data;
  },
  getMe: async (): Promise<{ user: User }> => {
    const res = await api.get<ApiResponse<{ user: User }>>('/auth/me');
    return res.data.data || res.data;
  },
  refreshToken: async (): Promise<{ user: User }> => {
    const res = await api.post<ApiResponse<{ user: User }>>('/auth/refresh');
    return res.data.data || res.data;
  },
  checkAuth: async (): Promise<{ authenticated: boolean; user: User | null }> => {
    const res = await api.get<ApiResponse<{ authenticated: boolean; user: User | null }>>('/auth/check');
    return res.data.data || res.data;
  },
};

// -----------------------------
// Vessels API
// -----------------------------
export const vesselsApi = {
  getVessels: async (query: VesselQuery = {}): Promise<VesselListResponse> => {
    const res = await api.get<VesselListResponse>('/vessels', { params: query });
    return res.data;
  },
  getVessel: async (id: string): Promise<{ vessel: Vessel }> => {
    const res = await api.get<ApiResponse<{ vessel: Vessel }>>(`/vessels/${id}`);
    return res.data.data || res.data;
  },
  createVessel: async (vessel: CreateVesselInput): Promise<{ vessel: Vessel; message: string }> => {
    const res = await api.post<ApiResponse<{ vessel: Vessel; message: string }>>('/vessels', vessel);
    return res.data.data || res.data;
  },
  updateVessel: async (id: string, updates: UpdateVesselInput): Promise<{ vessel: Vessel; message: string }> => {
    const res = await api.put<ApiResponse<{ vessel: Vessel; message: string }>>(`/vessels/${id}`, updates);
    return res.data.data || res.data;
  },
  deleteVessel: async (id: string): Promise<{ vessel: Vessel; message: string }> => {
    const res = await api.delete<ApiResponse<{ vessel: Vessel; message: string }>>(`/vessels/${id}`);
    return res.data.data || res.data;
  },
  bulkDelete: async (ids: string[]): Promise<{ deletedCount: number; message: string }> => {
    const res = await api.delete<ApiResponse<{ deletedCount: number; message: string }>>('/vessels/bulk', { data: { ids } });
    return res.data.data || res.data;
  },
  getStats: async (): Promise<DashboardData> => {
    const res = await api.get<DashboardData>('/vessels/stats');
    return res.data;
  },
};

// -----------------------------
// Health API
// -----------------------------
export const healthApi = {
  getHealth: async (): Promise<HealthStatus> => {
    const res = await api.get<HealthStatus>('/health');
    return res.data;
  },
  checkReadiness: async (): Promise<{ status: string; message: string }> => {
    const res = await api.get<{ status: string; message: string }>('/health/ready');
    return res.data;
  },
  checkLiveness: async (): Promise<{ status: string; message: string }> => {
    const res = await api.get<{ status: string; message: string }>('/health/live');
    return res.data;
  },
};

// -----------------------------
// Utility functions
// -----------------------------
export const apiUtils = {
  withLoading: async <T>(apiCall: () => Promise<T>, setLoading?: (loading: boolean) => void): Promise<T> => {
    try {
      setLoading?.(true);
      return await apiCall();
    } finally {
      setLoading?.(false);
    }
  },
  retry: async <T>(apiCall: () => Promise<T>, maxRetries: number = 3, baseDelay: number = 1000): Promise<T> => {
    let lastError: any;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try { return await apiCall(); } 
      catch (error) { lastError = error; if (attempt < maxRetries) await new Promise(res => setTimeout(res, baseDelay * Math.pow(2, attempt))); }
    }
    throw lastError;
  },
  createCancelableRequest: (signal?: AbortSignal) => {
    const controller = new AbortController();
    return { signal: signal || controller.signal, cancel: () => controller.abort() };
  },
  buildQueryString: (params: Record<string, any>): string => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => { if (v != null && v !== '') searchParams.append(k, String(v)); });
    return searchParams.toString();
  },
  formatError: (error: ApiError): string => error.details?.map(d => d.message || d).join(', ') || error.message,
};

// -----------------------------
// Export default Axios instance
// -----------------------------
export default api;

// -----------------------------
// Common HTTP Status codes
// -----------------------------
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
