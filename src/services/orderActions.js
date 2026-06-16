import { orderService, normalizeOrder } from './orderService';
import { restaurantService } from './restaurantService';
import { menuService } from './menuService';
import { RESTAURANTS } from '../data/restaurants';
import { MENU_ITEMS } from '../data/menuItems';
import { applyPromoCode } from '../data/mockData';
import { USE_SUPABASE } from '../config';

const isValidUuid = (str) => {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return regex.test(str);
};

export const createOrder = async (cart, userData) => {
  const {
    user, address, paymentMethod, paymentStatus,
    promoDiscount, subtotal, gst, deliveryFee, total, receiptNo
  } = userData;

  const orderId = `CB${Date.now()}`;
  const dateStr = new Date().toISOString();

  if (USE_SUPABASE) {
    const orderData = {
      user_id: user?.id || null,
      restaurant_id: cart.restaurantId,
      subtotal,
      discount: promoDiscount,
      gst,
      delivery_charge: deliveryFee,
      total,
      payment_method: paymentMethod,
      payment_status: paymentStatus,
      status: 'pending',
      delivery_address: `${address.line1}, ${address.city}, ${address.pincode}`,
      delivery_phone: address.phone,
      customer_name: address.name,
      receipt_no: receiptNo,
    };

    const itemsData = cart.items.map((i) => ({
      menu_item_id: isValidUuid(i.id) ? i.id : null,
      name_snapshot: i.name,
      price_snapshot: i.price,
      quantity: i.qty
    }));

    const dbOrder = await orderService.createOrder(orderData, itemsData);

    const newOrder = normalizeOrder({
      id: dbOrder.id,
      restaurantName: cart.restaurantName,
      restaurantSlug: cart.restaurantSlug,
      restaurantImage: cart.restaurantImage || cart.restaurantSlug,
      items: cart.items.map((i) => ({ ...i })),
      subtotal,
      gst,
      discount: promoDiscount,
      total,
      deliveryCharge: deliveryFee,
      paymentMethod,
      paymentStatus,
      status: 'pending',
      address: `${address.line1}, ${address.city}, ${address.pincode}`,
      phone: address.phone,
      customerName: address.name,
      date: dbOrder.date || dbOrder.created_at || dateStr,
      receiptNo,
    });

    const existing = JSON.parse(localStorage.getItem('cibo2_orders') || '[]');
    existing.unshift(newOrder);
    localStorage.setItem('cibo2_orders', JSON.stringify(existing));
    localStorage.setItem('cibo2_last_order', JSON.stringify(newOrder));

    return newOrder;
  } else {
    const newOrder = normalizeOrder({
      id: orderId,
      restaurantName: cart.restaurantName,
      restaurantSlug: cart.restaurantSlug,
      restaurantImage: cart.restaurantImage || cart.restaurantSlug,
      items: cart.items.map((i) => ({ ...i })),
      subtotal,
      gst,
      discount: promoDiscount,
      total,
      deliveryCharge: deliveryFee,
      paymentMethod,
      paymentStatus,
      status: 'pending',
      address: `${address.line1}, ${address.city}, ${address.pincode}`,
      phone: address.phone,
      customerName: address.name,
      date: dateStr,
      receiptNo,
    });

    const existing = JSON.parse(localStorage.getItem('cibo2_orders') || '[]');
    existing.unshift(newOrder);
    localStorage.setItem('cibo2_orders', JSON.stringify(existing));
    localStorage.setItem('cibo2_last_order', JSON.stringify(newOrder));

    return newOrder;
  }
};

export const updateOrderStatus = async (orderId, newStatus) => {
  if (USE_SUPABASE) {
    await orderService.updateOrderStatus(orderId, newStatus);
  }

  // Sync localStorage
  const stored = JSON.parse(localStorage.getItem('cibo2_orders') || '[]');
  const idx = stored.findIndex((o) => o.id === orderId);
  if (idx !== -1) {
    stored[idx].status = newStatus;
    localStorage.setItem('cibo2_orders', JSON.stringify(stored));
  }

  try {
    const last = JSON.parse(localStorage.getItem('cibo2_last_order'));
    if (last && last.id === orderId) {
      last.status = newStatus;
      localStorage.setItem('cibo2_last_order', JSON.stringify(last));
    }
  } catch { /* ignore */ }
};

export const smartReorder = async (orderId, cartContext) => {
  const { updateAndSave, setPromoCode, setPromoDiscount } = cartContext;

  const order = await orderService.getOrderById(orderId);
  if (!order) {
    throw new Error("Order not found");
  }

  let targetRestaurant = null;
  let targetMenuItems = [];

  if (USE_SUPABASE) {
    try {
      const dbRest = await restaurantService.fetchRestaurantBySlug(order.restaurantSlug);
      if (dbRest) {
        targetRestaurant = {
          id: dbRest.id,
          name: dbRest.name,
          slug: dbRest.slug,
          image: dbRest.image_url,
        };
        const dbItems = await menuService.fetchMenuItemsByRestaurant(dbRest.id);
        if (dbItems && dbItems.length > 0) {
          targetMenuItems = dbItems.map((item) => ({
            id: item.id,
            restaurantId: item.restaurant_id,
            restaurantSlug: dbRest.slug,
            name: item.name,
            description: item.description,
            price: parseFloat(item.price),
            category: item.category,
            image: item.image_url,
            available: item.is_available,
          }));
        }
      }
    } catch (err) {
      console.error("Failed to fetch reorder restaurant details from Supabase:", err);
    }
  }

  // Fallback to local mock data
  if (!targetRestaurant) {
    const mockRest = RESTAURANTS.find(r => r.slug === order.restaurantSlug);
    if (mockRest) {
      targetRestaurant = {
        id: mockRest.id,
        name: mockRest.name,
        slug: mockRest.slug,
        image: mockRest.image,
      };
    }
    targetMenuItems = MENU_ITEMS[order.restaurantSlug] || [];
  }

  if (!targetRestaurant) {
    throw new Error("Restaurant not found");
  }

  const MAX_ITEM_QTY = 5;
  const MAX_TOTAL_ITEMS = 15;

  const cartItems = [];
  let totalQty = 0;

  for (const orderItem of order.items) {
    const match = targetMenuItems.find(
      (m) => m.name.trim().toLowerCase() === orderItem.name.trim().toLowerCase()
    );

    if (match) {
      const qty = Math.min(orderItem.qty, MAX_ITEM_QTY);
      
      if (totalQty + qty > MAX_TOTAL_ITEMS) {
        const allowedQty = MAX_TOTAL_ITEMS - totalQty;
        if (allowedQty > 0) {
          cartItems.push({
            ...match,
            qty: allowedQty,
          });
          totalQty += allowedQty;
        }
        break; // Cart is full
      } else {
        cartItems.push({
          ...match,
          qty: qty,
        });
        totalQty += qty;
      }
    }
  }

  if (cartItems.length === 0) {
    throw new Error("No items from this order are currently available on the menu.");
  }

  updateAndSave({
    items: cartItems,
    restaurantId: targetRestaurant.id,
    restaurantName: targetRestaurant.name,
    restaurantSlug: targetRestaurant.slug,
    restaurantImage: targetRestaurant.image || '',
  });

  setPromoCode('');
  setPromoDiscount(0);

  return true;
};

export const applyPromo = (order, promoCode) => {
  const subtotal = typeof order === 'object' ? (order.subtotal || 0) : (order || 0);
  const result = applyPromoCode(promoCode, subtotal);
  if (!result.valid) {
    throw new Error(result.error);
  }
  return result.discount;
};
