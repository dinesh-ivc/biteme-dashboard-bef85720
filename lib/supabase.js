import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

/**
 * Create Supabase client for use in client components
 * @returns {Object} Supabase client
 */
export function createSupabaseClient() {
  return createClient(supabaseUrl, supabaseAnonKey);
}

/**
 * Create Supabase admin client for use in API routes
 * Uses service role key for elevated permissions
 * @returns {Object} Supabase admin client
 */
export function createAdminClient() {
  if (!supabaseServiceKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
  }
  return createClient(supabaseUrl, supabaseServiceKey);
}

/**
 * Helper function to handle Supabase errors
 * @param {Object} error - Supabase error object
 * @returns {string} User-friendly error message
 */
export function getSupabaseErrorMessage(error) {
  if (!error) return 'An unknown error occurred';
  
  // Common Supabase error codes
  const errorMessages = {
    '23505': 'This record already exists',
    '23503': 'Referenced record does not exist',
    '23502': 'Required field is missing',
    '42P01': 'Database table not found',
    'PGRST116': 'No rows found',
  };

  return errorMessages[error.code] || error.message || 'Database error occurred';
}