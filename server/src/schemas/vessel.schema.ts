import { z } from 'zod';

// Helper schema for date validation
const dateSchema = z.string().refine((date) => {
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime()) && parsedDate > new Date('1900-01-01');
}, {
  message: 'Must be a valid date after 1900-01-01'
});

export const createVesselSchema = z.object({
  body: z.object({
    vesselName: z
      .string()
      .min(2, 'Vessel name must be at least 2 characters long')
      .max(100, 'Vessel name must not exceed 100 characters')
      .regex(
        /^[a-zA-Z0-9\s\-_.()]+$/,
        'Vessel name contains invalid characters'
      )
      .trim(),
    voyageNo: z
      .string()
      .min(2, 'Voyage number must be at least 2 characters long')
      .max(50, 'Voyage number must not exceed 50 characters')
      .regex(
        /^[a-zA-Z0-9\s\-_]+$/,
        'Voyage number can only contain alphanumeric characters, spaces, hyphens, and underscores'
      )
      .trim(),
    country: z
      .string()
      .min(2, 'Country must be at least 2 characters long')
      .max(60, 'Country must not exceed 60 characters')
      .regex(
        /^[a-zA-Z\s\-.'()]+$/,
        'Country name contains invalid characters'
      )
      .trim(),
    portName: z
      .string()
      .min(2, 'Port name must be at least 2 characters long')
      .max(80, 'Port name must not exceed 80 characters')
      .regex(
        /^[a-zA-Z0-9\s\-_.()]+$/,
        'Port name contains invalid characters'
      )
      .trim(),
    ETA: dateSchema,
    ETD: dateSchema
  }).strict().refine(
    (data) => {
      const eta = new Date(data.ETA);
      const etd = new Date(data.ETD);
      return etd > eta;
    },
    {
      message: 'Estimated Time of Departure must be after Estimated Time of Arrival',
      path: ['ETD']
    }
  )
});

export const updateVesselSchema = z.object({
  body: z.object({
    vesselName: z
      .string()
      .min(2, 'Vessel name must be at least 2 characters long')
      .max(100, 'Vessel name must not exceed 100 characters')
      .regex(
        /^[a-zA-Z0-9\s\-_.()]+$/,
        'Vessel name contains invalid characters'
      )
      .trim()
      .optional(),
    voyageNo: z
      .string()
      .min(2, 'Voyage number must be at least 2 characters long')
      .max(50, 'Voyage number must not exceed 50 characters')
      .regex(
        /^[a-zA-Z0-9\s\-_]+$/,
        'Voyage number can only contain alphanumeric characters, spaces, hyphens, and underscores'
      )
      .trim()
      .optional(),
    country: z
      .string()
      .min(2, 'Country must be at least 2 characters long')
      .max(60, 'Country must not exceed 60 characters')
      .regex(
        /^[a-zA-Z\s\-.'()]+$/,
        'Country name contains invalid characters'
      )
      .trim()
      .optional(),
    portName: z
      .string()
      .min(2, 'Port name must be at least 2 characters long')
      .max(80, 'Port name must not exceed 80 characters')
      .regex(
        /^[a-zA-Z0-9\s\-_.()]+$/,
        'Port name contains invalid characters'
      )
      .trim()
      .optional(),
    ETA: dateSchema.optional(),
    ETD: dateSchema.optional()
  }).strict().refine(
    (data) => {
      if (data.ETA && data.ETD) {
        const eta = new Date(data.ETA);
        const etd = new Date(data.ETD);
        return etd > eta;
      }
      return true;
    },
    {
      message: 'Estimated Time of Departure must be after Estimated Time of Arrival',
      path: ['ETD']
    }
  )
});

export const getVesselsQuerySchema = z.object({
  query: z.object({
    _t: z.union([z.string(), z.number()]).optional(), // Timestamp parameter for cache busting
    q: z.string().max(200, 'Search query too long').optional(),
    page: z
      .union([z.string(), z.number()])
      .transform(val => typeof val === 'string' ? parseInt(val) : val)
      .refine(n => n >= 1, 'Page must be at least 1')
      .optional()
      .default(1),
    limit: z
      .union([z.string(), z.number()])
      .transform(val => typeof val === 'string' ? parseInt(val) : val)
      .refine(n => n >= 1 && n <= 100, 'Limit must be between 1 and 100')
      .optional()
      .default(10),
    sort: z
      .string()
      .optional()
      .default('-ETA')
      .refine((val) => {
        const validSorts = [
          'vesselName', 'voyageNo', 'country', 'portName', 
          'ETA', 'ETD', 'createdAt', 'updatedAt',
          '-vesselName', '-voyageNo', '-country', '-portName',
          '-ETA', '-ETD', '-createdAt', '-updatedAt'
        ];
        return validSorts.includes(val || '-ETA');
      }, {
        message: 'Invalid sort parameter'
      }),
    vesselName: z.string().max(100).optional(),
    country: z.string().max(60).optional(),
    portName: z.string().max(80).optional(),
    fromETA: dateSchema.optional(),
    toETA: dateSchema.optional(),
    fromETD: dateSchema.optional(),
    toETD: dateSchema.optional()
  }).strict()
});

export const vesselParamsSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid vessel ID format')
  }).strict()
});

// Type exports for TypeScript
export type CreateVesselInput = z.infer<typeof createVesselSchema>['body'];
export type UpdateVesselInput = z.infer<typeof updateVesselSchema>['body'];
export type GetVesselsQuery = z.infer<typeof getVesselsQuerySchema>['query'];
export type VesselParams = z.infer<typeof vesselParamsSchema>['params'];
