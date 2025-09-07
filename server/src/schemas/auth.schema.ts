import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    userId: z
      .string()
      .min(3, 'User ID must be at least 3 characters long')
      .max(50, 'User ID must not exceed 50 characters')
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        'User ID can only contain alphanumeric characters, hyphens, and underscores'
      )
      .trim(),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .max(128, 'Password must not exceed 128 characters')
  }).strict()
});

export const createUserSchema = z.object({
  body: z.object({
    userId: z
      .string()
      .min(3, 'User ID must be at least 3 characters long')
      .max(50, 'User ID must not exceed 50 characters')
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        'User ID can only contain alphanumeric characters, hyphens, and underscores'
      )
      .trim(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(128, 'Password must not exceed 128 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
      ),
    confirmPassword: z.string(),
    role: z.enum(['admin', 'user']).optional().default('user')
  }).strict().refine(
    (data) => data.password === data.confirmPassword,
    {
      message: 'Passwords do not match',
      path: ['confirmPassword']
    }
  )
});

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'New password must be at least 8 characters long')
      .max(128, 'New password must not exceed 128 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
      ),
    confirmPassword: z.string()
  }).strict().refine(
    (data) => data.newPassword === data.confirmPassword,
    {
      message: 'Passwords do not match',
      path: ['confirmPassword']
    }
  )
});

// Type exports for TypeScript
export type LoginInput = z.infer<typeof loginSchema>['body'];
export type CreateUserInput = z.infer<typeof createUserSchema>['body'];
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>['body'];
