import { Router } from 'express';
import {
  createVessel,
  getVessels,
  getVesselById,
  updateVessel,
  deleteVessel,
  getVesselStats,
  bulkDeleteVessels,
} from '../controllers/vessel.controller';
import { validate } from '../middleware/validate';
import { authenticate, requireRole } from '../middleware/auth';
import { apiRateLimit } from '../middleware/security';
import { asyncHandler } from '../middleware/error';
import {
  createVesselSchema,
  updateVesselSchema,
  getVesselsQuerySchema,
  vesselParamsSchema,
} from '../schemas/vessel.schema';

const router = Router();

// Apply API rate limiting to all vessel routes
router.use(apiRateLimit);

/**
 * @route   POST /api/vessels
 * @desc    Create a new vessel
 * @access  Private (Admin/User)
 */
router.post(
  '/',
  authenticate,
  validate(createVesselSchema),
  asyncHandler(createVessel)
);

/**
 * @route   GET /api/vessels
 * @desc    Get all vessels with filtering, searching, sorting, and pagination
 * @access  Public
 */
router.get(
  '/',
  validate(getVesselsQuerySchema),
  asyncHandler(getVessels)
);

/**
 * @route   GET /api/vessels/stats
 * @desc    Get vessel statistics and dashboard data
 * @access  Private (Admin/User)
 */
router.get('/stats', authenticate, asyncHandler(getVesselStats));

/**
 * @route   DELETE /api/vessels/bulk
 * @desc    Bulk delete vessels
 * @access  Private (Admin only)
 */
router.delete(
  '/bulk',
  authenticate,
  requireRole('admin'),
  asyncHandler(bulkDeleteVessels)
);

/**
 * @route   GET /api/vessels/:id
 * @desc    Get vessel by ID
 * @access  Public
 */
router.get(
  '/:id',
  validate(vesselParamsSchema),
  asyncHandler(getVesselById)
);

/**
 * @route   PUT /api/vessels/:id
 * @desc    Update vessel by ID
 * @access  Private (Admin/User)
 */
router.put(
  '/:id',
  authenticate,
  validate(vesselParamsSchema),
  validate(updateVesselSchema),
  asyncHandler(updateVessel)
);

/**
 * @route   DELETE /api/vessels/:id
 * @desc    Delete vessel by ID
 * @access  Private (Admin/User)
 */
router.delete(
  '/:id',
  authenticate,
  validate(vesselParamsSchema),
  asyncHandler(deleteVessel)
);

export default router;