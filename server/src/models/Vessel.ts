import mongoose, { Schema, Document } from 'mongoose';

export interface IVessel extends Document {
  vesselName: string;
  voyageNo: string;
  country: string;
  portName: string;
  ETA: Date;
  ETD: Date;
  createdAt: Date;
  updatedAt: Date;
}

const VesselSchema = new Schema<IVessel>({
  vesselName: {
    type: String,
    required: [true, 'Vessel name is required'],
    trim: true,
    minlength: [2, 'Vessel name must be at least 2 characters long'],
    maxlength: [100, 'Vessel name must not exceed 100 characters'],
    match: [/^[a-zA-Z0-9\s\-_.()]+$/, 'Vessel name contains invalid characters']
  },
  voyageNo: {
    type: String,
    required: [true, 'Voyage number is required'],
    trim: true,
    minlength: [2, 'Voyage number must be at least 2 characters long'],
    maxlength: [50, 'Voyage number must not exceed 50 characters'],
    match: [/^[a-zA-Z0-9\-_]+$/, 'Voyage number can only contain alphanumeric characters, hyphens, and underscores']
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
    minlength: [2, 'Country must be at least 2 characters long'],
    maxlength: [60, 'Country must not exceed 60 characters'],
    match: [/^[a-zA-Z\s\-.'()]+$/, 'Country name contains invalid characters']
  },
  portName: {
    type: String,
    required: [true, 'Port name is required'],
    trim: true,
    minlength: [2, 'Port name must be at least 2 characters long'],
    maxlength: [80, 'Port name must not exceed 80 characters'],
    match: [/^[a-zA-Z0-9\s\-_.()]+$/, 'Port name contains invalid characters']
  },
  ETA: {
    type: Date,
    required: [true, 'Estimated Time of Arrival (ETA) is required'],
    validate: {
      validator: function(value: Date) {
        return value instanceof Date && !isNaN(value.getTime());
      },
      message: 'ETA must be a valid date'
    }
  },
  ETD: {
    type: Date,
    required: [true, 'Estimated Time of Departure (ETD) is required'],
    validate: {
      validator: function(value: Date) {
        return value instanceof Date && !isNaN(value.getTime());
      },
      message: 'ETD must be a valid date'
    }
  }
}, {
  timestamps: true,
  collection: 'vessels'
});

// Compound unique index to prevent duplicate vessel-voyage combinations
VesselSchema.index({ vesselName: 1, voyageNo: 1 }, { unique: true });

// Indexes for search and performance
VesselSchema.index({ vesselName: 'text', portName: 'text', country: 'text', voyageNo: 'text' });
VesselSchema.index({ vesselName: 1 });
VesselSchema.index({ voyageNo: 1 });
VesselSchema.index({ country: 1 });
VesselSchema.index({ portName: 1 });
VesselSchema.index({ ETA: 1 });
VesselSchema.index({ ETD: 1 });
VesselSchema.index({ createdAt: -1 });

// Validate that ETD is after ETA
VesselSchema.pre<IVessel>('validate', function(next) {
  if (this.ETA && this.ETD && this.ETD <= this.ETA) {
    this.invalidate('ETD', 'Estimated Time of Departure must be after Estimated Time of Arrival');
  }
  next();
});

// Transform toJSON to format dates nicely
VesselSchema.methods.toJSON = function() {
  const vesselObject = this.toObject();
  delete vesselObject.__v;
  
  // Format dates for consistent API response
  if (vesselObject.ETA) {
    vesselObject.ETA = vesselObject.ETA.toISOString();
  }
  if (vesselObject.ETD) {
    vesselObject.ETD = vesselObject.ETD.toISOString();
  }
  if (vesselObject.createdAt) {
    vesselObject.createdAt = vesselObject.createdAt.toISOString();
  }
  if (vesselObject.updatedAt) {
    vesselObject.updatedAt = vesselObject.updatedAt.toISOString();
  }
  
  return vesselObject;
};

export const Vessel = mongoose.model<IVessel>('Vessel', VesselSchema);
