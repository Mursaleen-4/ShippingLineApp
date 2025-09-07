import app from './app';
import { connectDB } from './config/db';
import { env } from './config/env';

async function startServer() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Use Render's assigned PORT or fallback for local dev
    const PORT = process.env.PORT || env.PORT || 5000;

    // Start the server
    const server = app.listen(PORT, () => {
      console.log(`
🚢 ========================================
   Shipping Line API Server Started
🚢 ========================================
📍 Environment: ${env.NODE_ENV || 'production'}
🌐 Server URL: ${process.env.NODE_ENV === 'production' ? `https://${env.CORS_ORIGIN}` : `http://localhost:${PORT}`}
📊 API Docs: ${process.env.NODE_ENV === 'production' ? `https://${env.CORS_ORIGIN}/api` : `http://localhost:${PORT}/api`}
❤️ Health Check: ${process.env.NODE_ENV === 'production' ? `https://${env.CORS_ORIGIN}/api/health` : `http://localhost:${PORT}/api/health`}
🔐 CORS Origin: ${env.CORS_ORIGIN}
⚡ Ready to handle requests!
========================================
      `);
    });

    // Graceful shutdown
    const gracefulShutdown = async (signal: string) => {
      console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
      
      server.close(async () => {
        console.log('📴 HTTP server closed');
        
        try {
          console.log('🔌 Closing database connections...');
          // Here you can add code if you need to close MongoDB explicitly
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
