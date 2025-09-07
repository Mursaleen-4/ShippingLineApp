import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { env, isDevelopment } from '../config/env';

/**
 * Allowed origins
 */
const allowedOrigins = [
  `http://localhost:${env.CLIENT_PORT}`,
  `http://127.0.0.1:${env.CLIENT_PORT}`,
  'http://localhost:3000', // React dev
  'http://localhost:5173', // Vite default
  'http://localhost:5174', // Vite alternative
];

// Add production frontend URL if set
if (env.CORS_ORIGIN) {
  allowedOrigins.push(env.CORS_ORIGIN);
}

/**
 * CORS middleware
 */
export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (Postman, server-to-server, mobile apps)
    if (!origin) return callback(null, true);

    // If origin is allowed, permit request
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Reject unauthorized origins (do not throw Error)
    return callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'Cache-Control'
  ],
  optionsSuccessStatus: 200, // ensures legacy browsers like IE succeed
};

/**
 * Apply CORS globally
 */
export const applyCors = (app: any) => {
  app.use(cors(corsOptions));

  // Ensure OPTIONS requests always succeed
  app.options('*', cors(corsOptions));
};

/**
 * General rate limiting
 */
export const generalRateLimit = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS, // 15 minutes default
  max: env.RATE_LIMIT_MAX, // 100 requests per window
  message: {
    error: {
      code: 'TOO_MANY_REQUESTS',
      message: 'Too many requests from this IP, please try again later.',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => isDevelopment && req.ip === '127.0.0.1',
});

/**
 * Strict rate limiting for authentication endpoints
 */
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 login attempts per window
  message: {
    error: {
      code: 'TOO_MANY_AUTH_ATTEMPTS',
      message: 'Too many authentication attempts, please try again later.',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  skip: (req) => isDevelopment && req.ip === '127.0.0.1',
});

/**
 * API rate limiting for vessel operations
 */
export const apiRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // 60 requests per minute
  message: {
    error: {
      code: 'API_RATE_LIMIT_EXCEEDED',
      message: 'API rate limit exceeded, please slow down.',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => isDevelopment && req.ip === '127.0.0.1',
});

/**
 * Helmet security configuration
 */
export const helmetOptions: Parameters<typeof helmet>[0] = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https:'],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'ws:', 'wss:'],
      fontSrc: ["'self'", 'https:', 'data:'],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false, // Disable COEP for development
};

/**
 * Request size limit middleware
 */
export const requestSizeLimit = (req: Request, res: Response, next: NextFunction): void => {
  const maxSize = 10 * 1024 * 1024; // 10MB

  req.on('data', (chunk: Buffer) => {
    const currentSize = parseInt(req.headers['content-length'] || '0');
    if (currentSize > maxSize) {
      const error = new Error('Request entity too large');
      (error as any).statusCode = 413;
      (error as any).code = 'REQUEST_TOO_LARGE';
      return next(error);
    }
  });

  next();
};

/**
 * Security headers middleware
 */
export const securityHeaders = (req: Request, res: Response, next: NextFunction): void => {
  res.removeHeader('X-Powered-By');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  next();
};

/**
 * Request logging middleware
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      userId: req.user?.userId,
    };

    if (res.statusCode >= 500) {
      console.error('Server Error:', JSON.stringify(logData));
    } else if (res.statusCode >= 400) {
      console.warn('Client Error:', JSON.stringify(logData));
    } else if (isDevelopment) {
      console.log('Request:', JSON.stringify(logData));
    }
  });

  next();
};
