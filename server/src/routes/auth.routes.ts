import { Router } from 'express';
import {
  login,
  logout,
  getMe,
  refreshToken,
  checkAuth,
} from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { authenticate, optionalAuth } from '../middleware/auth';
import { authRateLimit } from '../middleware/security';
import { asyncHandler } from '../middleware/error';
import { loginSchema } from '../schemas/auth.schema';

const router = Router();

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and get token
 * @access  Public
 */
router.post(
  '/login',
  authRateLimit,
  validate(loginSchema),
  asyncHandler(login)
);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user and clear token cookie
 * @access  Public
 */
router.post('/logout', logout);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user info
 * @access  Private
 */
router.get('/me', authenticate, asyncHandler(getMe));

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh JWT token
 * @access  Private
 */
router.post('/refresh', authenticate, asyncHandler(refreshToken));

/**
 * @route   GET /api/auth/check
 * @desc    Check authentication status
 * @access  Public
 */
router.get('/check', optionalAuth, asyncHandler(checkAuth));

export default router;
