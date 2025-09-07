import { Request, Response } from 'express';
import { Vessel } from '../models/Vessel';
import { createApiError } from '../middleware/error';
import {
  CreateVesselInput,
  UpdateVesselInput,
  GetVesselsQuery,
  VesselParams,
} from '../schemas/vessel.schema';
import mongoose from 'mongoose';

/**
 * Create a new vessel
 */
export const createVessel = async (req: Request, res: Response): Promise<void> => {
  const vesselData: CreateVesselInput = req.body;

  try {
    // Convert string dates to Date objects
    const vessel = new Vessel({
      ...vesselData,
      ETA: new Date(vesselData.ETA),
      ETD: new Date(vesselData.ETD),
    });

    await vessel.save();

    res.status(201).json({
      message: 'Vessel created successfully',
      vessel,
    });
  } catch (error) {
    // Handle duplicate key error specifically
    if ((error as any).code === 11000) {
      throw createApiError(
        409,
        'DUPLICATE_VESSEL',
        'A vessel with this name and voyage number already exists'
      );
    }
    throw error;
  }
};

/**
 * Get vessels with search, filtering, sorting, and pagination
 */
export const getVessels = async (req: Request, res: Response): Promise<void> => {
  const {
    q,
    page,
    limit,
    sort,
    vesselName,
    country,
    portName,
    fromETA,
    toETA,
    fromETD,
    toETD,
 }: GetVesselsQuery = req.query as unknown as GetVesselsQuery;


  try {
    // Build query object
    const query: any = {};

    // Text search across multiple fields
    if (q) {
      query.$text = { $search: q };
    }

    // Specific field filters
    if (vesselName) {
      query.vesselName = { $regex: vesselName, $options: 'i' };
    }
    if (country) {
      query.country = { $regex: country, $options: 'i' };
    }
    if (portName) {
      query.portName = { $regex: portName, $options: 'i' };
    }

    // Date range filters
    if (fromETA || toETA) {
      query.ETA = {};
      if (fromETA) query.ETA.$gte = new Date(fromETA);
      if (toETA) query.ETA.$lte = new Date(toETA);
    }
    if (fromETD || toETD) {
      query.ETD = {};
      if (fromETD) query.ETD.$gte = new Date(fromETD);
      if (toETD) query.ETD.$lte = new Date(toETD);
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Execute query with pagination
    const [vessels, total] = await Promise.all([
      Vessel.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Vessel.countDocuments(query),
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    res.status(200).json({
      data: vessels,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      },
      filters: {
        q,
        vesselName,
        country,
        portName,
        fromETA,
        toETA,
        fromETD,
        toETD,
      },
      sort,
    });
  } catch (error) {
    throw error;
  }
};

/**
 * Get a single vessel by ID
 */
export const getVesselById = async (req: Request, res: Response): Promise<void> => {
  const { id }: VesselParams = req.params as VesselParams;

  try {
    const vessel = await Vessel.findById(id);

    if (!vessel) {
      throw createApiError(404, 'VESSEL_NOT_FOUND', 'Vessel not found');
    }

    res.status(200).json({
      vessel,
    });
  } catch (error) {
    throw error;
  }
};

/**
 * Update a vessel by ID
 */
export const updateVessel = async (req: Request, res: Response): Promise<void> => {
  const { id }: VesselParams = req.params as VesselParams;
  const updateData: UpdateVesselInput = req.body;

  try {
    // Convert string dates to Date objects if provided
    const updateFields: any = { ...updateData };
    if (updateFields.ETA) {
      updateFields.ETA = new Date(updateFields.ETA);
    }
    if (updateFields.ETD) {
      updateFields.ETD = new Date(updateFields.ETD);
    }

    const vessel = await Vessel.findByIdAndUpdate(
      id,
      updateFields,
      {
        new: true, // Return updated document
        runValidators: true, // Run Mongoose validators
      }
    );

    if (!vessel) {
      throw createApiError(404, 'VESSEL_NOT_FOUND', 'Vessel not found');
    }

    res.status(200).json({
      message: 'Vessel updated successfully',
      vessel,
    });
  } catch (error) {
    // Handle duplicate key error
    if ((error as any).code === 11000) {
      throw createApiError(
        409,
        'DUPLICATE_VESSEL',
        'A vessel with this name and voyage number already exists'
      );
    }
    throw error;
  }
};

/**
 * Delete a vessel by ID
 */
export const deleteVessel = async (req: Request, res: Response): Promise<void> => {
  const { id }: VesselParams = req.params as VesselParams;

  try {
    const vessel = await Vessel.findByIdAndDelete(id);

    if (!vessel) {
      throw createApiError(404, 'VESSEL_NOT_FOUND', 'Vessel not found');
    }

    res.status(200).json({
      message: 'Vessel deleted successfully',
      vessel,
    });
  } catch (error) {
    throw error;
  }
};

/**
 * Get vessel statistics
 */
export const getVesselStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const stats = await Vessel.aggregate([
      {
        $group: {
          _id: null,
          totalVessels: { $sum: 1 },
          totalCountries: { $addToSet: '$country' },
          totalPorts: { $addToSet: '$portName' },
          avgETADays: {
            $avg: {
              $divide: [
                { $subtract: ['$ETA', new Date()] },
                1000 * 60 * 60 * 24, // Convert to days
              ],
            },
          },
          avgETDDays: {
            $avg: {
              $divide: [
                { $subtract: ['$ETD', new Date()] },
                1000 * 60 * 60 * 24, // Convert to days
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalVessels: 1,
          totalCountries: { $size: '$totalCountries' },
          totalPorts: { $size: '$totalPorts' },
          avgETADays: { $round: ['$avgETADays', 1] },
          avgETDDays: { $round: ['$avgETDDays', 1] },
        },
      },
    ]);

    // Get upcoming arrivals and departures
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    const [upcomingArrivals, upcomingDepartures] = await Promise.all([
      Vessel.find({
        ETA: { $gte: today, $lte: nextWeek },
      })
        .sort('ETA')
        .limit(5)
        .select('vesselName voyageNo ETA portName')
        .lean(),
      Vessel.find({
        ETD: { $gte: today, $lte: nextWeek },
      })
        .sort('ETD')
        .limit(5)
        .select('vesselName voyageNo ETD portName')
        .lean(),
    ]);

    res.status(200).json({
      statistics: stats[0] || {
        totalVessels: 0,
        totalCountries: 0,
        totalPorts: 0,
        avgETADays: 0,
        avgETDDays: 0,
      },
      upcomingArrivals,
      upcomingDepartures,
    });
  } catch (error) {
    throw error;
  }
};

/**
 * Bulk delete vessels
 */
export const bulkDeleteVessels = async (req: Request, res: Response): Promise<void> => {
  const { ids }: { ids: string[] } = req.body;

  try {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw createApiError(400, 'INVALID_INPUT', 'Please provide an array of vessel IDs');
    }

    // Validate all IDs are valid ObjectIds
    const validIds = ids.filter(id => mongoose.Types.ObjectId.isValid(id));
    if (validIds.length !== ids.length) {
      throw createApiError(400, 'INVALID_ID_FORMAT', 'Some vessel IDs are invalid');
    }

    const result = await Vessel.deleteMany({
      _id: { $in: validIds },
    });

    res.status(200).json({
      message: `Successfully deleted ${result.deletedCount} vessels`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    throw error;
  }
};
