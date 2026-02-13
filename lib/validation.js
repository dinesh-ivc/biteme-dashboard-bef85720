/**
 * Validation utilities for request data
 */

/**
 * Validate registration data
 * @param {Object} data - Registration data
 * @returns {Object} { success: boolean, error?: string }
 */
export function validateRegistration(data) {
  const { name, email, password } = data;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return { success: false, error: 'Name is required' };
  }

  if (!email || typeof email !== 'string' || !isValidEmail(email)) {
    return { success: false, error: 'Valid email is required' };
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters' };
  }

  return { success: true };
}

/**
 * Validate login data
 * @param {Object} data - Login data
 * @returns {Object} { success: boolean, error?: string }
 */
export function validateLogin(data) {
  const { email, password } = data;

  if (!email || typeof email !== 'string' || !isValidEmail(email)) {
    return { success: false, error: 'Valid email is required' };
  }

  if (!password || typeof password !== 'string' || password.length === 0) {
    return { success: false, error: 'Password is required' };
  }

  return { success: true };
}

/**
 * Validate recipe data
 * @param {Object} data - Recipe data
 * @param {boolean} isUpdate - Whether this is an update (allows partial data)
 * @returns {Object} { success: boolean, error?: string }
 */
export function validateRecipe(data, isUpdate = false) {
  if (!isUpdate) {
    const { entry_number, title, slug, date, ingredients, steps } = data;

    if (typeof entry_number !== 'number' || entry_number < 1) {
      return { success: false, error: 'Valid entry number is required' };
    }

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return { success: false, error: 'Title is required' };
    }

    if (!slug || typeof slug !== 'string' || slug.trim().length === 0) {
      return { success: false, error: 'Slug is required' };
    }

    if (!date || !isValidDate(date)) {
      return { success: false, error: 'Valid date is required (YYYY-MM-DD)' };
    }

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return { success: false, error: 'At least one ingredient is required' };
    }

    if (!Array.isArray(steps) || steps.length === 0) {
      return { success: false, error: 'At least one step is required' };
    }
  }

  // Validate arrays if present
  if (data.ingredients && !Array.isArray(data.ingredients)) {
    return { success: false, error: 'Ingredients must be an array' };
  }

  if (data.steps && !Array.isArray(data.steps)) {
    return { success: false, error: 'Steps must be an array' };
  }

  return { success: true };
}

/**
 * Check if email is valid
 * @param {string} email - Email address
 * @returns {boolean} True if valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Check if date string is valid (YYYY-MM-DD format)
 * @param {string} dateString - Date string
 * @returns {boolean} True if valid
 */
function isValidDate(dateString) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) return false;

  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}