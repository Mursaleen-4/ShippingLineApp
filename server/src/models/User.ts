import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { env } from '../config/env';

export interface IUser extends Document {
  userId: string;
  passwordHash: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
  
  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
  toJSON(): Partial<IUser>;
}

const UserSchema = new Schema<IUser>({
  userId: {
    type: String,
    required: [true, 'User ID is required'],
    unique: true,
    trim: true,
    minlength: [3, 'User ID must be at least 3 characters long'],
    maxlength: [50, 'User ID must not exceed 50 characters'],
    match: [/^[a-zA-Z0-9_-]+$/, 'User ID can only contain alphanumeric characters, hyphens, and underscores']
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [60, 'Invalid password hash'] // bcrypt hash length
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'user'],
      message: 'Role must be either admin or user'
    },
    default: 'user'
  }
}, {
  timestamps: true,
  collection: 'users'
});

// Indexes for performance
UserSchema.index({ userId: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ createdAt: -1 });

// Instance method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.passwordHash);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Static method to hash password
UserSchema.statics.hashPassword = async function(password: string): Promise<string> {
  try {
    return await bcrypt.hash(password, env.BCRYPT_ROUNDS);
  } catch (error) {
    throw new Error('Password hashing failed');
  }
};

// Transform toJSON to exclude sensitive fields
UserSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.passwordHash;
  delete userObject.__v;
  return userObject;
};

// Pre-save middleware to hash password if modified
UserSchema.pre<IUser>('save', async function(next) {
  if (!this.isModified('passwordHash') || this.passwordHash.startsWith('$2b$')) {
    return next();
  }
  
  try {
    this.passwordHash = await bcrypt.hash(this.passwordHash, env.BCRYPT_ROUNDS);
    next();
  } catch (error) {
    next(error as Error);
  }
});

export const User = mongoose.model<IUser>('User', UserSchema);
