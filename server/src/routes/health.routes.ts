import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { version } from '../../package.json';

const router = Router();

/**
 * @route   GET /api/health
 * @desc    Health check endpoint
 * @access  Public
 */
router.get('/', (req: Request, res: Response) => {
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();
  
  // Format memory usage in MB
  const formatMemory = (bytes: number) => Math.round(bytes / 1024 / 1024 * 100) / 100;

  const healthData = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: {
      seconds: Math.floor(uptime),
      human: formatUptime(uptime),
    },
    version: version || '1.0.0',
    memory: {
      rss: `${formatMemory(memoryUsage.rss)} MB`,
      heapTotal: `${formatMemory(memoryUsage.heapTotal)} MB`,
      heapUsed: `${formatMemory(memoryUsage.heapUsed)} MB`,
      external: `${formatMemory(memoryUsage.external)} MB`,
    },
    database: {
      connected: mongoose.connection.readyState === 1,
      state: getConnectionState(mongoose.connection.readyState),
    },
    environment: process.env.NODE_ENV || 'development',
  };

  const statusCode = healthData.database.connected ? 200 : 503;
  res.status(statusCode).json(healthData);
});

/**
 * @route   GET /api/health/ready
 * @desc    Readiness probe for Kubernetes/Docker
 * @access  Public
 */
router.get('/ready', (req: Request, res: Response) => {
  const isReady = mongoose.connection.readyState === 1;
  
  if (isReady) {
    res.status(200).json({
      status: 'ready',
      message: 'Application is ready to receive traffic',
    });
  } else {
    res.status(503).json({
      status: 'not ready',
      message: 'Application is not ready to receive traffic',
    });
  }
});

/**
 * @route   GET /api/health/live
 * @desc    Liveness probe for Kubernetes/Docker
 * @access  Public
 */
router.get('/live', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'alive',
    message: 'Application is alive',
    timestamp: new Date().toISOString(),
  });
});

/**
 * Helper function to format uptime in human-readable format
 */
function formatUptime(uptime: number): string {
  const days = Math.floor(uptime / (24 * 60 * 60));
  const hours = Math.floor((uptime % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((uptime % (60 * 60)) / 60);
  const seconds = Math.floor(uptime % 60);

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

  return parts.join(' ');
}

/**
 * Helper function to get connection state description
 */
function getConnectionState(state: number): string {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
    99: 'uninitialized',
  };
  return states[state as keyof typeof states] || 'unknown';
}

export default router;
