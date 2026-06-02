/**
 * Pure utility validation functions for Phase 4 Form Validation.
 */

// Mock database values for duplicate checks
export const MOCK_DATABASE = {
  emails: [
    'intern@uptoskill.com',
    'admin@uptoskill.com',
    'john.doe@uptoskill.com',
    'jane.smith@uptoskill.com'
  ],
  courseCodes: [
    'CS101',
    'WD202',
    'UI201',
    'DS301'
  ]
};

/**
 * Validate standard email structure.
 */
export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address (e.g., name@example.com)';
  }
  return null;
};

/**
 * Validate password strength and return criteria.
 */
export const checkPasswordStrength = (password) => {
  if (!password) {
    return { score: 0, strength: 'weak', label: 'Weak', percent: 0, feedback: 'Password is required' };
  }

  let score = 0;
  const criteria = {
    length: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password)
  };

  if (criteria.length) score += 1;
  if (criteria.hasUpper && criteria.hasLower) score += 1;
  if (criteria.hasNumber) score += 1;
  if (criteria.hasSpecial) score += 1;

  let strength = 'weak';
  let label = 'Weak';
  let percent = 25;

  if (score === 2 || score === 3) {
    strength = 'medium';
    label = 'Medium';
    percent = 60;
  } else if (score >= 4) {
    strength = 'strong';
    label = 'Strong';
    percent = 100;
  }

  // Provide user-friendly hint if not strong
  let feedback;
  if (!criteria.length) {
    feedback = 'Min 8 characters required.';
  } else if (!criteria.hasUpper || !criteria.hasLower) {
    feedback = 'Add uppercase and lowercase letters.';
  } else if (!criteria.hasNumber) {
    feedback = 'Add at least one number.';
  } else if (!criteria.hasSpecial) {
    feedback = 'Add a special character (e.g., !, @, #).';
  } else {
    feedback = 'Password is strong!';
  }

  return { score, strength, label, percent, feedback, criteria };
};

/**
 * Validate that field is not empty.
 */
export const validateRequired = (value, fieldName = 'Field') => {
  if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
    return `${fieldName} is required`;
  }
  return null;
};

/**
 * Validate minimum and maximum character limits.
 */
export const validateMinMax = (value, min, max, fieldName = 'Field') => {
  const length = (value || '').trim().length;
  if (length < min) {
    return `${fieldName} must be at least ${min} characters long`;
  }
  if (length > max) {
    return `${fieldName} must not exceed ${max} characters`;
  }
  return null;
};

/**
 * Prevent duplicate email entries.
 */
export const isDuplicateEmail = (email) => {
  if (!email) return false;
  return MOCK_DATABASE.emails.some(
    (existing) => existing.toLowerCase() === email.trim().toLowerCase()
  );
};

/**
 * Prevent duplicate course code entries.
 */
export const isDuplicateCourseCode = (code) => {
  if (!code) return false;
  return MOCK_DATABASE.courseCodes.some(
    (existing) => existing.toUpperCase() === code.trim().toUpperCase()
  );
};
