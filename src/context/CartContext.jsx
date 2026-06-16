import { createContext, useContext, useState } from 'react';

// =============================================
// Cart Context — persists to localStorage
// Phase 2: sync with Supabase realtime
// =============================================

const CartContext = createContext(null);

const MAX_ITEM_QTY = 5;
const MAX_TOTAL_ITEMS = 15;

const loadCart = () => {
  try {
    const saved = localStorage.getItem('cibo2_cart');
    return saved ? JSON.parse(saved) : { items: [], restaurantId: null, restaurantName: '', restaurantSlug: '', restaurantImage: '' };
  } catch {
    return { items: [], restaurantId: null, restaurantName: '', restaurantSlug: '', restaurantImage: '' };
  }
};

const saveCart = (cart) => {
  localStorage.setItem('cibo2_cart', JSON.stringify(cart));
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);

  const totalItems = cart.items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cart.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const deliveryFee = subtotal > 0 && subtotal < 199 ? 29 : 0;
  const gst = Math.round(subtotal * 0.05 * 10) / 10;
  const total = Math.round((subtotal + deliveryFee + gst - promoDiscount) * 10) / 10;

  const updateAndSave = (newCart) => {
    setCart(newCart);
    saveCart(newCart);
  };

  // Returns null if ok, or a string error message
  const addItem = (item, restaurant) => {
    // Check restaurant switch
    if (cart.restaurantId && cart.restaurantId !== restaurant.id) {
      return { needsConfirm: true, restaurant };
    }

    const existing = cart.items.find((i) => i.id === item.id);
    const currentQty = existing ? existing.qty : 0;

    if (currentQty >= MAX_ITEM_QTY) {
      return { error: `Maximum ${MAX_ITEM_QTY} of the same item allowed.` };
    }
    if (totalItems >= MAX_TOTAL_ITEMS) {
      return { error: `Maximum ${MAX_TOTAL_ITEMS} items per order allowed.` };
    }

    let newItems;
    if (existing) {
      newItems = cart.items.map((i) =>
        i.id === item.id ? { ...i, qty: i.qty + 1 } : i
      );
    } else {
      newItems = [...cart.items, { ...item, qty: 1 }];
    }

    updateAndSave({
      items: newItems,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      restaurantSlug: restaurant.slug,
      restaurantImage: restaurant.image || '',
    });
    return null;
  };

  const forceAddFromNewRestaurant = (item, restaurant) => {
    const newCart = {
      items: [{ ...item, qty: 1 }],
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      restaurantSlug: restaurant.slug,
      restaurantImage: restaurant.image || '',
    };
    updateAndSave(newCart);
    setPromoCode('');
    setPromoDiscount(0);
  };

  const removeOne = (itemId) => {
    const existing = cart.items.find((i) => i.id === itemId);
    if (!existing) return;

    let newItems;
    if (existing.qty === 1) {
      newItems = cart.items.filter((i) => i.id !== itemId);
    } else {
      newItems = cart.items.map((i) =>
        i.id === itemId ? { ...i, qty: i.qty - 1 } : i
      );
    }

    const newCart = {
      ...cart,
      items: newItems,
      restaurantId: newItems.length === 0 ? null : cart.restaurantId,
      restaurantName: newItems.length === 0 ? '' : cart.restaurantName,
      restaurantSlug: newItems.length === 0 ? '' : cart.restaurantSlug,
      restaurantImage: newItems.length === 0 ? '' : cart.restaurantImage,
    };
    updateAndSave(newCart);
  };

  const removeItem = (itemId) => {
    const newItems = cart.items.filter((i) => i.id !== itemId);
    const newCart = {
      ...cart,
      items: newItems,
      restaurantId: newItems.length === 0 ? null : cart.restaurantId,
      restaurantName: newItems.length === 0 ? '' : cart.restaurantName,
      restaurantSlug: newItems.length === 0 ? '' : cart.restaurantSlug,
      restaurantImage: newItems.length === 0 ? '' : cart.restaurantImage,
    };
    updateAndSave(newCart);
  };

  const clearCart = () => {
    const empty = { items: [], restaurantId: null, restaurantName: '', restaurantSlug: '', restaurantImage: '' };
    updateAndSave(empty);
    setPromoCode('');
    setPromoDiscount(0);
  };

  const getItemQty = (itemId) => {
    const found = cart.items.find((i) => i.id === itemId);
    return found ? found.qty : 0;
  };



  const value = {
    cart,
    totalItems,
    subtotal,
    deliveryFee,
    gst,
    total,
    promoCode,
    setPromoCode,
    promoDiscount,
    setPromoDiscount,
    addItem,
    forceAddFromNewRestaurant,
    removeOne,
    removeItem,
    clearCart,
    getItemQty,
    updateAndSave,
    MAX_ITEM_QTY,
    MAX_TOTAL_ITEMS,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
};
