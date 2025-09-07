// API Response Types
export interface ApiResponse<T = any> {
  message?: string;
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// User Types
export interface User {
  _id: string;
  userId: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  userId: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Vessel Types
export interface Vessel {
  _id: string;
  vesselName: string;
  voyageNo: string;
  country: string;
  portName: string;
  ETA: string;
  ETD: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateVesselInput {
  vesselName: string;
  voyageNo: string;
  country: string;
  portName: string;
  ETA: string;
  ETD: string;
}

export interface UpdateVesselInput extends Partial<CreateVesselInput> {}

// Pagination Types
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface VesselListResponse {
  data: Vessel[];
  pagination: PaginationInfo;
  filters: VesselFilters;
  sort: string;
}

// Query and Filter Types
export interface VesselFilters {
  q?: string;
  vesselName?: string;
  country?: string;
  portName?: string;
  fromETA?: string;
  toETA?: string;
  fromETD?: string;
  toETD?: string;
}

export interface VesselQuery extends VesselFilters {
  page?: number;
  limit?: number;
  sort?: VesselSortOptions;
}

export type VesselSortOptions = 
  | 'vesselName' | '-vesselName'
  | 'voyageNo' | '-voyageNo'
  | 'country' | '-country'
  | 'portName' | '-portName'
  | 'ETA' | '-ETA'
  | 'ETD' | '-ETD'
  | 'createdAt' | '-createdAt'
  | 'updatedAt' | '-updatedAt';

// Dashboard/Statistics Types
export interface VesselStatistics {
  totalVessels: number;
  totalCountries: number;
  totalPorts: number;
  avgETADays: number;
  avgETDDays: number;
}

export interface DashboardData {
  statistics: VesselStatistics;
  upcomingArrivals: Vessel[];
  upcomingDepartures: Vessel[];
}

// Health Check Types
export interface HealthStatus {
  status: string;
  timestamp: string;
  uptime: {
    seconds: number;
    human: string;
  };
  version: string;
  memory: {
    rss: string;
    heapTotal: string;
    heapUsed: string;
    external: string;
  };
  database: {
    connected: boolean;
    state: string;
  };
  environment: string;
}

// Form Types
export interface FormError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: FormError[];
  isSubmitting: boolean;
  isValid: boolean;
}

// UI State Types
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
  width?: string;
}

export interface TableState {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  currentPage: number;
  pageSize: number;
  searchQuery: string;
  filters: Record<string, any>;
}

// Animation Types
export interface AnimationConfig {
  duration: number;
  delay?: number;
  ease?: string | number[];
}

export interface PageTransition {
  initial: Record<string, any>;
  animate: Record<string, any>;
  exit: Record<string, any>;
  transition: AnimationConfig;
}

// Accessibility Types
export interface A11yConfig {
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

// Application Config
export interface AppConfig {
  apiBaseUrl: string;
  whatsappUrl: string;
  logoPath: string;
  companyName: string;
  projectName: string;
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
