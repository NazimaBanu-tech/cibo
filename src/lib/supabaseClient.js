import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const supabase = isValidUrl(supabaseUrl) && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Connection verification testing
export const testConnection = async () => {
  if (!supabase) {
    console.warn('Supabase Connection Test: Supabase client is not initialized. Check your .env file.');
    return { success: false, error: 'Client not initialized' };
  }
  try {
    const { data, error } = await supabase.from('restaurants').select('id, name').limit(1);
    if (error) {
      console.warn('Supabase Connection Test Warn:', error.message);
      return { success: false, error: error.message };
    }
    console.log('Supabase Connection Test Success: Connected to Database.', data);
    return { success: true, data };
  } catch (err) {
    console.error('Supabase Connection Test Exception:', err.message);
    return { success: false, error: err.message };
  }
};
