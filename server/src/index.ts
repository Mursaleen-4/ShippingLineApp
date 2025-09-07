import app from './app';
import { connectDB } from './config/db';
import { env } from './config/env';

async function startServer() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start the server
    const server = app.listen(env.PORT, () => {
      console.log(`
🚢 ========================================
   Shipping Line API Server Started
🚢 ========================================
📍 Environment: ${env.NODE_ENV}
🌐 Server URL: http://localhost:${env.PORT}
📊 API Docs: http://localhost:${env.PORT}/api
❤️ Health Check: http://localhost:${env.PORT}/api/health
🔐 CORS Origin: ${env.CORS_ORIGIN || `http://localhost:${env.CLIENT_PORT}`}
⚡ Ready to handle requests!
========================================
      `);
    });

    // Graceful shutdown handling
    const gracefulShutdown = async (signal: string) => {
      console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
      
      server.close(async () => {
        console.log('📴 HTTP server closed');
        
        // Close database connections
        try {
          // MongoDB connection will be closed by the db module
          console.log('🔌 Database connections closed');
          process.exit(0);
        } catch (error) {
          console.error('❌ Error during database shutdown:', error);
          process.exit(1);
        }
      });
      
      // Force shutdown after 30 seconds
      setTimeout(() => {
        console.error('💥 Forced shutdown after 30 seconds');
        process.exit(1);
      }, 30000);
    };

    // Listen for shutdown signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
      console.error('🚨 Unhandled Rejection at:', promise, 'reason:', reason);
      // Close server & exit process
      gracefulShutdown('unhandledRejection');
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (error: Error) => {
      console.error('🚨 Uncaught Exception:', error);
      gracefulShutdown('uncaughtException');
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Start the application
startServer();
