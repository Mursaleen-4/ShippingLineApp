import request from 'supertest';
import app from '../../app';
import { createTestUser, testUserFactory } from '../setup';

describe('Authentication API', () => {
  describe('POST /api/auth/login', () => {
    it('should login successfully with valid credentials', async () => {
      // Create test user
      const userData = testUserFactory({ userId: 'testuser', password: 'TestPass123!' });
      await createTestUser({
        userId: userData.userId,
        passwordHash: require('../../utils/password').hashPassword(userData.password),
      });

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          userId: userData.userId,
          password: userData.password,
        })
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Login successful');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('userId', userData.userId);
      expect(response.body.user).toHaveProperty('role');
      expect(response.body.user).not.toHaveProperty('passwordHash');

      // Check for HTTP-only cookie
      const cookies = response.headers['set-cookie'];
      expect(cookies).toBeDefined();
      expect(cookies.some((cookie: string) => cookie.startsWith('token='))).toBe(true);
    });

    it('should reject login with invalid user ID', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          userId: 'nonexistent',
          password: 'TestPass123!',
        })
        .expect(401);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toHaveProperty('code', 'INVALID_CREDENTIALS');
    });

    it('should reject login with invalid password', async () => {
      // Create test user
      const userData = testUserFactory();
      await createTestUser({ userId: userData.userId });

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          userId: userData.userId,
          password: 'WrongPassword123!',
        })
        .expect(401);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toHaveProperty('code', 'INVALID_CREDENTIALS');
    });

    it('should validate request body', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          userId: '', // Empty userId
          password: 'short', // Too short password
        })
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toHaveProperty('code', 'VALIDATION_ERROR');
      expect(response.body.error).toHaveProperty('details');
      expect(Array.isArray(response.body.error.details)).toBe(true);
    });

    it('should handle rate limiting', async () => {
      // Create test user
      const userData = testUserFactory();
      await createTestUser({ userId: userData.userId });

      // Make multiple failed login attempts
      for (let i = 0; i < 6; i++) {
        await request(app)
          .post('/api/auth/login')
          .send({
            userId: userData.userId,
            password: 'WrongPassword',
          });
      }

      // Next request should be rate limited
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          userId: userData.userId,
          password: 'WrongPassword',
        })
        .expect(429);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toHaveProperty('code', 'TOO_MANY_AUTH_ATTEMPTS');
    });
  });

  describe('POST /api/auth/logout', () => {
    it('should logout successfully', async () => {
      const response = await request(app)
        .post('/api/auth/logout')
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Logout successful');

      // Check that cookie is cleared
      const cookies = response.headers['set-cookie'];
      if (cookies) {
        expect(cookies.some((cookie: string) => 
          cookie.includes('token=') && cookie.includes('Max-Age=0')
        )).toBe(true);
      }
    });
  });

  describe('GET /api/auth/me', () => {
    it('should return user info when authenticated', async () => {
      // Create test user and login
      const userData = testUserFactory();
      const user = await createTestUser({ userId: userData.userId });
      const { generateToken } = require('../../utils/jwt');
      const token = generateToken(user);

      const response = await request(app)
        .get('/api/auth/me')
        .set('Cookie', [`token=${token}`])
        .expect(200);

      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('userId', userData.userId);
      expect(response.body.user).not.toHaveProperty('passwordHash');
    });

    it('should require authentication', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .expect(401);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toHaveProperty('code', 'AUTHENTICATION_REQUIRED');
    });

    it('should reject invalid token', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Cookie', ['token=invalid-token'])
        .expect(401);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toHaveProperty('code', 'INVALID_TOKEN');
    });
  });

  describe('POST /api/auth/refresh', () => {
    it('should refresh token when authenticated', async () => {
      // Create test user and login
      const userData = testUserFactory();
      const user = await createTestUser({ userId: userData.userId });
      const { generateToken } = require('../../utils/jwt');
      const token = generateToken(user);

      const response = await request(app)
        .post('/api/auth/refresh')
        .set('Cookie', [`token=${token}`])
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Token refreshed successfully');
      expect(response.body).toHaveProperty('user');

      // Check for new cookie
      const cookies = response.headers['set-cookie'];
      expect(cookies).toBeDefined();
      expect(cookies.some((cookie: string) => cookie.startsWith('token='))).toBe(true);
    });

    it('should require authentication', async () => {
      const response = await request(app)
        .post('/api/auth/refresh')
        .expect(401);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toHaveProperty('code', 'AUTHENTICATION_REQUIRED');
    });
  });

  describe('GET /api/auth/check', () => {
    it('should return authentication status when authenticated', async () => {
      // Create test user and login
      const userData = testUserFactory();
      const user = await createTestUser({ userId: userData.userId });
      const { generateToken } = require('../../utils/jwt');
      const token = generateToken(user);

      const response = await request(app)
        .get('/api/auth/check')
        .set('Cookie', [`token=${token}`])
        .expect(200);

      expect(response.body).toHaveProperty('authenticated', true);
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('userId', userData.userId);
    });

    it('should return false when not authenticated', async () => {
      const response = await request(app)
        .get('/api/auth/check')
        .expect(200);

      expect(response.body).toHaveProperty('authenticated', false);
      expect(response.body).toHaveProperty('user', null);
    });

    it('should handle invalid token gracefully', async () => {
      const response = await request(app)
        .get('/api/auth/check')
        .set('Cookie', ['token=invalid-token'])
        .expect(200);

      expect(response.body).toHaveProperty('authenticated', false);
      expect(response.body).toHaveProperty('user', null);
    });
  });
});
