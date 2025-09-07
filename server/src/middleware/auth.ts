import { Request, Response, NextFunction } from 'express';
import { verifyToken, JWTPayload } from '../utils/jwt';
import { User } from '../models/User';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: 'admin' | 'user';
        _id?: string;
      };
    }
  }
}

/**
 * Middleware to authenticate JWT tokens from cookies
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    // Try to get token from cookie first (preferred for security)
    if (req.cookies?.token) {
      token = req.cookies.token;
    }
    // Fallback to Authorization header for API clients
    else if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.substring(7);
    }

    if (!token) {
      res.status(401).json({
        error: {
          code: 'AUTHENTICATION_REQUIRED',
          message: 'Authentication token is required'
        }
      });
      return;
    }

    // Verify the token
    let payload: JWTPayload;
    try {
      payload = verifyToken(token);
    } catch (error) {
      res.status(401).json({
        error: {
          code: 'INVALID_TOKEN',
          message: 'Invalid or expired authentication token'
        }
      });
      return;
    }

    // Verify user still exists in database
    const user = await User.findOne({ userId: payload.userId });
    if (!user) {
      res.status(401).json({
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User associated with token no longer exists'
        }
      });
      return;
    }

    // Add user info to request object
    req.user = {
      userId: user.userId,
      role: user.role,
    };
    
    if (user._id) {
      req.user._id = user._id.toString();
    }

    next();
  } catch (error) {
    console.error('Authentication middleware error:', error);
    res.status(500).json({
      error: {
        code: 'AUTHENTICATION_ERROR',
        message: 'Internal authentication error'
      }
    });
  }
};

/**
 * Middleware to require admin role
 */
export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({
      error: {
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Authentication required'
      }
    });
    return;
  }

  if (req.user.role !== 'admin') {
    res.status(403).json({
      error: {
        code: 'INSUFFICIENT_PERMISSIONS',
        message: 'Admin access required'
      }
    });
    return;
  }

  next();
};

/**
 * Middleware to require specific role(s)
 */
export const requireRole = (...roles: Array<'admin' | 'user'>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        error: {
          code: 'AUTHENTICATION_REQUIRED',
          message: 'Authentication required'
        }
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        error: {
          code: 'INSUFFICIENT_PERMISSIONS',
          message: `Access requires one of the following roles: ${roles.join(', ')}`
        }
      });
      return;
    }

    next();
  };
};

/**
 * Optional authentication middleware - doesn't fail if no token
 */
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.substring(7);
    }

    if (token) {
      try {
        const payload = verifyToken(token);
        const user = await User.findOne({ userId: payload.userId });
        
        if (user) {
          req.user = {
            userId: user.userId,
            role: user.role,
          };
          
          if (user._id) {
            req.user._id = user._id.toString();
          }
        }
      } catch (error) {
        // Ignore token errors for optional auth
      }
    }

    next();
  } catch (error) {
    // Don't fail for optional auth
    next();
  }
};
