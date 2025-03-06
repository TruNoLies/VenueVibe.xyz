// Form validation utilities
export interface ValidationRule {
  test: (value: any) => boolean;
  message: string;
}

export interface ValidationRules {
  [key: string]: ValidationRule[];
}

export interface ValidationErrors {
  [key: string]: string[];
}

export function validateForm(
  values: Record<string, any>,
  rules: ValidationRules
): ValidationErrors {
  const errors: ValidationErrors = {};

  Object.entries(rules).forEach(([field, fieldRules]) => {
    const fieldErrors = fieldRules
      .filter(rule => !rule.test(values[field]))
      .map(rule => rule.message);

    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors;
    }
  });

  return errors;
}

// Common validation rules
export const commonRules = {
  required: (message = 'This field is required'): ValidationRule => ({
    test: value => value !== undefined && value !== null && value !== '',
    message
  }),
  email: (message = 'Invalid email address'): ValidationRule => ({
    test: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message
  }),
  minLength: (length: number, message?: string): ValidationRule => ({
    test: value => String(value).length >= length,
    message: message || `Must be at least ${length} characters`
  }),
  maxLength: (length: number, message?: string): ValidationRule => ({
    test: value => String(value).length <= length,
    message: message || `Must be no more than ${length} characters`
  })
};