import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

// =============================================
// Favorites Context — persists to localStorage
// =============================================

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const userId = user?.id || 'guest';
  const storageKey = `cibo2_favorites_${userId}`;

  const [favorites, setFavorites] = useState([]);

  // Load user favorites dynamically when authenticated user changes
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      setFavorites(stored ? JSON.parse(stored) : []);
    } catch {
      setFavorites([]);
    }
  }, [storageKey]);

  const saveFavorites = (list) => {
    setFavorites(list);
    localStorage.setItem(storageKey, JSON.stringify(list));
  };

  const toggleFavorite = (item, restaurantName, restaurantSlug) => {
    if (!item) return;
    const exists = favorites.find((f) => 
      (f.id && item.id && f.id === item.id) ||
      (f.name && item.name && f.name.toLowerCase().trim() === item.name.toLowerCase().trim() && f.restaurantSlug === restaurantSlug)
    );
    if (exists) {
      saveFavorites(favorites.filter((f) => 
        !( (f.id && item.id && f.id === item.id) || 
           (f.name && item.name && f.name.toLowerCase().trim() === item.name.toLowerCase().trim() && f.restaurantSlug === restaurantSlug) )
      ));
    } else {
      saveFavorites([...favorites, { ...item, restaurantName, restaurantSlug }]);
    }
  };

  const isFavorite = (itemId, item) => {
    // If we only have itemId (legacy call), match by ID safely ensuring it is valid
    if (!item) {
      if (!itemId) return false;
      return favorites.some((f) => f.id === itemId);
    }
    // Perform composite lookup to prevent mixed ID system collisions
    return favorites.some((f) => 
      (f.id && item.id && f.id === item.id) ||
      (f.name && item.name && f.name.toLowerCase().trim() === item.name.toLowerCase().trim() && f.restaurantSlug === item.restaurantSlug)
    );
  };

  const removeFavorite = (itemId, item) => {
    saveFavorites(favorites.filter((f) => 
      !( (f.id && itemId && f.id === itemId) ||
         (item && f.name && item.name && f.name.toLowerCase().trim() === item.name.toLowerCase().trim() && f.restaurantSlug === item.restaurantSlug) )
    ));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used inside FavoritesProvider');
  return ctx;
};
