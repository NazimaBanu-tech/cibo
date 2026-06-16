import { supabase } from '../lib/supabaseClient';

const menuCache = new Map();

export const menuService = {
  async fetchMenuItemsByRestaurant(restaurantId) {
    if (menuCache.has(restaurantId)) {
      return menuCache.get(restaurantId);
    }
    if (!supabase) throw new Error('Supabase client not initialized');
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .eq('is_available', true);
    if (error) throw error;
    menuCache.set(restaurantId, data);
    return data;
  },

  clearCache() {
    menuCache.clear();
  }
};
