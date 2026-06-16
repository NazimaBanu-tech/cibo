import { supabase } from '../lib/supabaseClient';

export const userService = {
  async getUserProfile(userId) {
    if (!supabase) throw new Error('Supabase client not initialized');
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) throw error;
    return data;
  },

  async createUserProfile(userId, { name, phone }) {
    if (!supabase) throw new Error('Supabase client not initialized');
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        name: name || 'New Customer',
        phone: phone || null,
        joined_date: new Date().toISOString()
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateUserProfile(userId, updates) {
    if (!supabase) throw new Error('Supabase client not initialized');
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};
