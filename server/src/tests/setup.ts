import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// Global test variables
let mongoServer: MongoMemoryServer;

// Setup before all tests
beforeAll(async () => {
  // Set test environment variables
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing-purposes-only-not-for-production';
  process.env.BCRYPT_ROUNDS = '4'; // Lower rounds for faster tests
  
  // Start in-memory MongoDB instance
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  // Connect to the in-memory database
  await mongoose.connect(mongoUri);
  
  // Disable Mongoose logging for tests
  mongoose.set('debug', false);
});

// Cleanup after each test
afterEach(async () => {
  const collections = mongoose.connection.collections;
  
  // Clear all collections
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

// Cleanup after all tests
afterAll(async () => {
  // Close database connection
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  
  // Stop MongoDB server
  if (mongoServer) {
    await mongoServer.stop();
  }
});

// Global test utilities
export const createTestUser = async (userData = {}) => {
  const { User } = await import('../models/User');
  const { hashPassword } = await import('../utils/password');
  
  const defaultUserData = {
    userId: 'testuser',
    passwordHash: await hashPassword('TestPass123!'),
    role: 'user' as const,
    ...userData,
  };
  
  return await User.create(defaultUserData);
};

export const createTestVessel = async (vesselData = {}) => {
  const { Vessel } = await import('../models/Vessel');
  
  const defaultVesselData = {
    vesselName: 'TEST VESSEL',
    voyageNo: 'TEST001',
    country: 'Test Country',
    portName: 'Test Port',
    ETA: new Date('2024-06-01T10:00:00Z'),
    ETD: new Date('2024-06-03T16:00:00Z'),
    ...vesselData,
  };
  
  return await Vessel.create(defaultVesselData);
};

export const generateAuthToken = (user: any) => {
  const { generateToken } = require('../utils/jwt');
  return generateToken(user);
};

// Test data factories
export const testUserFactory = (overrides = {}) => ({
  userId: 'testuser',
  password: 'TestPass123!',
  role: 'user' as const,
  ...overrides,
});

export const testVesselFactory = (overrides = {}) => ({
  vesselName: 'TEST VESSEL',
  voyageNo: 'TEST001',
  country: 'Test Country',
  portName: 'Test Port',
  ETA: '2024-06-01T10:00:00Z',
  ETD: '2024-06-03T16:00:00Z',
  ...overrides,
});

// Mock console methods to reduce noise during tests
global.console = {
  ...console,
  // Uncomment the following lines to suppress console output during tests
  // log: jest.fn(),
  // error: jest.fn(),
  // warn: jest.fn(),
  // info: jest.fn(),
  // debug: jest.fn(),
};
