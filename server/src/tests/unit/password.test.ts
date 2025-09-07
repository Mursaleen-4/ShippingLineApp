import {
  hashPassword,
  comparePassword,
  validatePasswordStrength,
  generateSecurePassword,
  isPasswordBreached,
} from '../../utils/password';

describe('Password Utilities', () => {
  describe('hashPassword', () => {
    it('should hash a password successfully', async () => {
      const password = 'TestPassword123!';
      const hashedPassword = await hashPassword(password);
      
      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toBe(password);
      expect(hashedPassword).toMatch(/^\$2b\$/); // bcrypt hash format
    });

    it('should generate different hashes for the same password', async () => {
      const password = 'TestPassword123!';
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);
      
      expect(hash1).not.toBe(hash2);
    });

    it('should handle empty password', async () => {
      const password = '';
      const hashedPassword = await hashPassword(password);
      
      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).toMatch(/^\$2b\$/);
    });
  });

  describe('comparePassword', () => {
    it('should return true for correct password', async () => {
      const password = 'TestPassword123!';
      const hashedPassword = await hashPassword(password);
      
      const isValid = await comparePassword(password, hashedPassword);
      expect(isValid).toBe(true);
    });

    it('should return false for incorrect password', async () => {
      const password = 'TestPassword123!';
      const wrongPassword = 'WrongPassword123!';
      const hashedPassword = await hashPassword(password);
      
      const isValid = await comparePassword(wrongPassword, hashedPassword);
      expect(isValid).toBe(false);
    });

    it('should handle empty passwords', async () => {
      const hashedPassword = await hashPassword('');
      
      const isValid = await comparePassword('', hashedPassword);
      expect(isValid).toBe(true);
    });
  });

  describe('validatePasswordStrength', () => {
    it('should validate a strong password', () => {
      const password = 'StrongPassword123!';
      const result = validatePasswordStrength(password);
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject password that is too short', () => {
      const password = 'Short1!';
      const result = validatePasswordStrength(password);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password must be at least 8 characters long');
    });

    it('should reject password without uppercase letter', () => {
      const password = 'lowercase123!';
      const result = validatePasswordStrength(password);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one uppercase letter');
    });

    it('should reject password without lowercase letter', () => {
      const password = 'UPPERCASE123!';
      const result = validatePasswordStrength(password);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one lowercase letter');
    });

    it('should reject password without numbers', () => {
      const password = 'NoNumbers!';
      const result = validatePasswordStrength(password);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one number');
    });

    it('should reject password without special characters', () => {
      const password = 'NoSpecialChars123';
      const result = validatePasswordStrength(password);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password must contain at least one special character (@$!%*?&)');
    });

    it('should reject common passwords', () => {
      const password = 'password';
      const result = validatePasswordStrength(password);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password is too common and easily guessable');
    });

    it('should reject password with sequential letters', () => {
      const password = 'Password123abc!';
      const result = validatePasswordStrength(password);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password should not contain sequential letters');
    });

    it('should reject password with sequential numbers', () => {
      const password = 'Password123456!';
      const result = validatePasswordStrength(password);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Password should not contain sequential numbers');
    });
  });

  describe('generateSecurePassword', () => {
    it('should generate password with default length', () => {
      const password = generateSecurePassword();
      
      expect(password).toBeDefined();
      expect(password.length).toBe(16);
    });

    it('should generate password with custom length', () => {
      const length = 24;
      const password = generateSecurePassword(length);
      
      expect(password).toBeDefined();
      expect(password.length).toBe(length);
    });

    it('should generate password with required character types', () => {
      const password = generateSecurePassword(16);
      
      expect(password).toMatch(/[a-z]/); // lowercase
      expect(password).toMatch(/[A-Z]/); // uppercase
      expect(password).toMatch(/\d/); // number
      expect(password).toMatch(/[@$!%*?&]/); // special character
    });

    it('should generate different passwords each time', () => {
      const password1 = generateSecurePassword();
      const password2 = generateSecurePassword();
      
      expect(password1).not.toBe(password2);
    });

    it('should validate generated passwords', () => {
      const password = generateSecurePassword();
      const validation = validatePasswordStrength(password);
      
      expect(validation.isValid).toBe(true);
    });
  });

  describe('isPasswordBreached', () => {
    it('should detect breached passwords', async () => {
      const breachedPassword = '123456';
      const result = await isPasswordBreached(breachedPassword);
      
      expect(result).toBe(true);
    });

    it('should not flag secure passwords as breached', async () => {
      const securePassword = 'SecurePassword123!@#';
      const result = await isPasswordBreached(securePassword);
      
      expect(result).toBe(false);
    });

    it('should be case insensitive for breached passwords', async () => {
      const breachedPassword = 'PASSWORD';
      const result = await isPasswordBreached(breachedPassword);
      
      expect(result).toBe(true);
    });
  });
});
