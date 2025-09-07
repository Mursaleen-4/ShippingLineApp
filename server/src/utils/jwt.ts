// src/utils/jwt.ts
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';
import { IUser } from '../models/User';

export interface JWTPayload {
  userId: string;
  role: 'admin' | 'user';
  iat?: number;
  exp?: number;
}

/**
 * Generate a JWT token for a user
 */
export const generateToken = (user: IUser): string => {
  const payload: JWTPayload = {
    userId: user.userId,
    role: user.role,
  };

const options: SignOptions = {
  expiresIn: env.JWT_EXPIRES_IN as any, // ✅ works with v8 types
};


  // env.JWT_SECRET is guaranteed valid by zod → safe cast to Secret
  return jwt.sign(payload, env.JWT_SECRET as Secret, options);
};

/**
 * Verify and decode a JWT token
 */
export const verifyToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, env.JWT_SECRET as Secret) as JWTPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token has expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid token');
    }
    throw new Error('Token verification failed');
  }
};

/**
 * Extract token from Authorization header
 */
export const extractTokenFromHeader = (authHeader?: string): string | null => {
  if (!authHeader) return null;

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null;

  return parts[1] || null;
};

/**
 * Generate cookie options for JWT
 */
export const getCookieOptions = () => ({
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/',
});

/**
 * Decode token without verification (for testing/debugging)
 */
export const decodeToken = (token: string): JWTPayload | null => {
  try {
    return jwt.decode(token) as JWTPayload;
  } catch {
    return null;
  }
};

/**
 * Check if token is expired
 */
export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;

  return Date.now() >= decoded.exp * 1000;
};
