import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import mongoose from 'mongoose';
import { isProduction } from '../config/env';

export interface ApiError extends Error {
  statusCode?: number;
  code?: string;
  details?: any;
}

/**
 * Create a standardized API error
 */
export const createApiError = (
  statusCode: number,
  code: string,
  message: string,
  details?: any
): ApiError => {
  const error: ApiError = new Error(message);
  error.statusCode = statusCode;
  error.code = code;
  error.details = details;
  return error;
};

/**
 * Handle MongoDB/Mongoose errors
 */
const handleMongoError = (error: any): ApiError => {
  // Duplicate key error
  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern || {})[0] || 'field';
    return createApiError(
      409,
      'DUPLICATE_RESOURCE',
      `A resource with this ${field} already exists`
    );
  }

  // Validation error
  if (error instanceof mongoose.Error.ValidationError) {
    const details = Object.values(error.errors).map((err: any) => ({
      field: err.path,
      message: err.message,
      value: err.value,
    }));

    return createApiError(
      400,
      'VALIDATION_ERROR',
      'Database validation failed',
      details
    );
  }

  // Cast error (invalid ObjectId)
  if (error instanceof mongoose.Error.CastError) {
    return createApiError(
      400,
      'INVALID_ID_FORMAT',
      `Invalid ${error.path} format`
    );
  }

  // Document not found
  if (error instanceof mongoose.Error.DocumentNotFoundError) {
    return createApiError(
      404,
      'RESOURCE_NOT_FOUND',
      'Requested resource not found'
    );
  }

  return createApiError(
    500,
    'DATABASE_ERROR',
    'Database operation failed'
  );
};

/**
 * Handle Zod validation errors
 */
const handleZodError = (error: ZodError): ApiError => {
  const details = error.errors.map((err) => ({
    field: err.path.join('.'),
    message: err.message,
    received: (err as any).received || undefined,
  }));

  return createApiError(
    400,
    'VALIDATION_ERROR',
    'Request validation failed',
    details
  );
};

/**
 * Handle JWT errors
 */
const handleJwtError = (error: any): ApiError => {
  if (error.name === 'JsonWebTokenError') {
    return createApiError(
      401,
      'INVALID_TOKEN',
      'Invalid authentication token'
    );
  }

  if (error.name === 'TokenExpiredError') {
    return createApiError(
      401,
      'TOKEN_EXPIRED',
      'Authentication token has expired'
    );
  }

  return createApiError(
    401,
    'AUTHENTICATION_ERROR',
    'Authentication failed'
  );
};

/**
 * Log error for monitoring
 */
const logError = (error: ApiError, req: Request): void => {
  const logData = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    userAgent: req.headers['user-agent'],
    ip: req.ip,
    userId: req.user?.userId,
    error: {
      name: error.name,
      message: error.message,
      statusCode: error.statusCode,
      code: error.code,
      stack: isProduction ? undefined : error.stack,
    },
  };

  // In production, you might want to use a proper logging service
  if (error.statusCode && error.statusCode >= 500) {
    console.error('Server Error:', JSON.stringify(logData, null, 2));
  } else {
    console.warn('Client Error:', JSON.stringify(logData, null, 2));
  }
};

/**
 * Global error handling middleware
 */
export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let apiError: ApiError;

  // Handle different types of errors
  if (error.statusCode && error.code) {
    // Already a formatted API error
    apiError = error;
  } else if (error instanceof ZodError) {
    apiError = handleZodError(error);
  } else if (error.name?.includes('Mongo') || error.code === 11000) {
    apiError = handleMongoError(error);
  } else if (error.name?.includes('JWT') || error.name?.includes('Token')) {
    apiError = handleJwtError(error);
  } else {
    // Generic error
    apiError = createApiError(
      500,
      'INTERNAL_SERVER_ERROR',
      isProduction ? 'Something went wrong' : error.message
    );
  }

  // Log the error
  logError(apiError, req);

  // Send error response
  const response: any = {
    error: {
      code: apiError.code,
      message: apiError.message,
    },
  };

  if (apiError.details) {
    response.error.details = apiError.details;
  }

  if (!isProduction) {
    response.error.stack = apiError.stack;
  }

  res.status(apiError.statusCode || 500).json(response);
};

/**
 * Catch-all handler for 404 errors
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error = createApiError(
    404,
    'ROUTE_NOT_FOUND',
    `Route ${req.method} ${req.originalUrl} not found`
  );
  next(error);
};

/**
 * Async error wrapper for route handlers
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
