import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

// Import middleware
import { applyCors, helmetOptions, generalRateLimit, securityHeaders, requestLogger } from './middleware/security';
import { errorHandler, notFoundHandler } from './middleware/error';

// Import routes
import authRoutes from './routes/auth.routes';
import vesselRoutes from './routes/vessel.routes';
import healthRoutes from './routes/health.routes';

// Import config
import { isDevelopment } from './config/env';

const app = express();

// Trust proxy in production (for correct IP addresses behind reverse proxy)
app.set('trust proxy', 1);

// --- Security Middleware ---
app.use(helmet(helmetOptions));
app.use(securityHeaders);

// --- CORS Middleware ---
applyCors(app); // handles OPTIONS preflight and allowed origins

// --- Request Parsing ---
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// --- Compression Middleware ---
app.use(compression());

// --- Rate Limiting ---
app.use(generalRateLimit);

// --- Logging Middleware ---
if (isDevelopment) {
  app.use(morgan('combined'));
}
app.use(requestLogger);

// --- API Routes ---
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/vessels', vesselRoutes);

// --- Root Endpoint ---
app.get('/', (req, res) => {
  res.json({
    message: 'Shipping Line API',
    version: '1.0.0',
    status: 'operational',
    documentation: '/api/health',
    timestamp: new Date().toISOString(),
  });
});

// --- API Info Endpoint ---
app.get('/api', (req, res) => {
  res.json({
    name: 'Shipping Line API',
    version: '1.0.0',
    description: 'RESTful API for managing shipping vessels and schedules',
    endpoints: {
      auth: {
        login: 'POST /api/auth/login',
        logout: 'POST /api/auth/logout',
        me: 'GET /api/auth/me',
        refresh: 'POST /api/auth/refresh',
        check: 'GET /api/auth/check',
      },
      vessels: {
        list: 'GET /api/vessels',
        create: 'POST /api/vessels',
        get: 'GET /api/vessels/:id',
        update: 'PUT /api/vessels/:id',
        delete: 'DELETE /api/vessels/:id',
        stats: 'GET /api/vessels/stats',
        bulkDelete: 'DELETE /api/vessels/bulk',
      },
      health: {
        status: 'GET /api/health',
        ready: 'GET /api/health/ready',
        live: 'GET /api/health/live',
      },
    },
    features: [
      'JWT Authentication with HTTP-only cookies',
      'Role-based access control',
      'Advanced vessel search and filtering',
      'Pagination and sorting',
      'Input validation and sanitization',
      'Rate limiting and security headers',
      'Comprehensive error handling',
      'Database connection monitoring',
    ],
  });
});

// --- 404 Handler ---
app.use(notFoundHandler);

// --- Global Error Handler ---
app.use(errorHandler);

export default app;
