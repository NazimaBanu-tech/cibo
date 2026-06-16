import { supabase } from '../lib/supabaseClient';

let restaurantsCache = null;
const restaurantCacheBySlug = new Map();

export const restaurantService = {
  async fetchRestaurants() {
    if (restaurantsCache) return restaurantsCache;
    if (!supabase) throw new Error('Supabase client not initialized');
    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .eq('is_active', true);
    if (error) throw error;
    restaurantsCache = data;
    return data;
  },

  async fetchRestaurantById(id) {
    if (!supabase) throw new Error('Supabase client not initialized');
    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async fetchRestaurantBySlug(slug) {
    if (restaurantCacheBySlug.has(slug)) {
      return restaurantCacheBySlug.get(slug);
    }
    if (!supabase) throw new Error('Supabase client not initialized');
    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .eq('slug', slug)
      .single();
    if (error) throw error;
    restaurantCacheBySlug.set(slug, data);
    return data;
  },

  clearCache() {
    restaurantsCache = null;
    restaurantCacheBySlug.clear();
  }
};
