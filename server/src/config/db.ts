import mongoose from 'mongoose';
import { env, isDevelopment, isTest } from './env';

// Debug print to verify the loaded MongoDB URI
console.log('DEBUG MONGO_URI:', env.MONGO_URI);

export const connectDB = async (): Promise<void> => {
  try {
    // Use default options for now, since custom options may cause issues
    const conn = await mongoose.connect(env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Handle connection events
    mongoose.connection.on('error', (error: Error) => {
      console.error('❌ MongoDB connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected');
    });

    // Disable logging in production for security
    if (!isDevelopment && !isTest) {
      mongoose.set('debug', false);
    } else {
      mongoose.set('debug', true);
    }

    // Graceful shutdown
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('🔌 MongoDB connection closed through app termination');
        process.exit(0);
      } catch (error) {
        console.error('❌ Error closing MongoDB connection:', error);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
  } catch (error) {
    console.error('❌ Error disconnecting from MongoDB:', error);
  }
};
  