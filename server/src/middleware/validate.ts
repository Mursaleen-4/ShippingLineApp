import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

/**
 * Generic validation middleware factory
 */
export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Validate request data against schema
      const result = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // Replace request objects with validated data
      if (result.body !== undefined) {
        req.body = result.body;
      }
      if (result.query !== undefined) {
        req.query = result.query;
      }
      if (result.params !== undefined) {
        req.params = result.params;
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
          received: (err as any).received,
        }));

        res.status(400).json({
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Request validation failed',
            details: validationErrors,
          },
        });
        return;
      }

      // Handle unexpected errors
      console.error('Validation middleware error:', error);
      res.status(500).json({
        error: {
          code: 'VALIDATION_PROCESSING_ERROR',
          message: 'Error processing request validation',
        },
      });
    }
  };
};

/**
 * Validate request body only
 */
export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
          received: (err as any).received,
        }));

        res.status(400).json({
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Request body validation failed',
            details: validationErrors,
          },
        });
        return;
      }

      console.error('Body validation error:', error);
      res.status(500).json({
        error: {
          code: 'VALIDATION_PROCESSING_ERROR',
          message: 'Error processing body validation',
        },
      });
    }
  };
};

/**
 * Validate query parameters only
 */
export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.query = schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
          received: (err as any).received,
        }));

        res.status(400).json({
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Query parameters validation failed',
            details: validationErrors,
          },
        });
        return;
      }

      console.error('Query validation error:', error);
      res.status(500).json({
        error: {
          code: 'VALIDATION_PROCESSING_ERROR',
          message: 'Error processing query validation',
        },
      });
    }
  };
};

/**
 * Validate route parameters only
 */
export const validateParams = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.params = schema.parse(req.params);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
          received: (err as any).received,
        }));

        res.status(400).json({
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Route parameters validation failed',
            details: validationErrors,
          },
        });
        return;
      }

      console.error('Params validation error:', error);
      res.status(500).json({
        error: {
          code: 'VALIDATION_PROCESSING_ERROR',
          message: 'Error processing params validation',
        },
      });
    }
  };
};
