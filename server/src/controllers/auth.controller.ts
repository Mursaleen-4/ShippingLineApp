import { Request, Response } from 'express';
import { User } from '../models/User';
import { generateToken, getCookieOptions } from '../utils/jwt';
import { createApiError } from '../middleware/error';
import { LoginInput } from '../schemas/auth.schema';

/**
 * Login user and set JWT cookie
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  const { userId, password }: LoginInput = req.body;

  try {
    // Find user by userId
    const user = await User.findOne({ userId }).select('+passwordHash');
    if (!user) {
      throw createApiError(401, 'INVALID_CREDENTIALS', 'Invalid user ID or password');
    }

    // Verify password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      throw createApiError(401, 'INVALID_CREDENTIALS', 'Invalid user ID or password');
    }

    // Generate JWT token
    const token = generateToken(user);

    // Set HTTP-only cookie
    res.cookie('token', token, getCookieOptions());

    // Return user data (without password)
    res.status(200).json({
      message: 'Login successful',
      user: {
        _id: user._id,
        userId: user.userId,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    throw error;
  }
};

/**
 * Logout user by clearing JWT cookie
 */
export const logout = (req: Request, res: Response): void => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  res.status(200).json({
    message: 'Logout successful',
  });
};

/**
 * Get current user information
 */
export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      throw createApiError(401, 'AUTHENTICATION_REQUIRED', 'Authentication required');
    }

    // Get full user data from database
    const user = await User.findOne({ userId: req.user.userId });
    if (!user) {
      throw createApiError(404, 'USER_NOT_FOUND', 'User not found');
    }

    res.status(200).json({
      user: {
        _id: user._id,
        userId: user.userId,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    throw error;
  }
};

/**
 * Refresh JWT token
 */
export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      throw createApiError(401, 'AUTHENTICATION_REQUIRED', 'Authentication required');
    }

    // Get user from database to ensure they still exist
    const user = await User.findOne({ userId: req.user.userId });
    if (!user) {
      throw createApiError(404, 'USER_NOT_FOUND', 'User not found');
    }

    // Generate new token
    const token = generateToken(user);

    // Set new HTTP-only cookie
    res.cookie('token', token, getCookieOptions());

    res.status(200).json({
      message: 'Token refreshed successfully',
      user: {
        _id: user._id,
        userId: user.userId,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    throw error;
  }
};

/**
 * Check authentication status
 */
export const checkAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(200).json({
        authenticated: false,
        user: null,
      });
      return;
    }

    // Verify user still exists
    const user = await User.findOne({ userId: req.user.userId });
    if (!user) {
      res.status(200).json({
        authenticated: false,
        user: null,
      });
      return;
    }

    res.status(200).json({
      authenticated: true,
      user: {
        _id: user._id,
        userId: user.userId,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    throw error;
  }
};
