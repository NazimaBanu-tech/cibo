import { supabase } from '../lib/supabaseClient';
import { USE_SUPABASE } from '../config';
import { MENU_ITEMS } from '../data/menuItems';

const getMenuItemImage = (itemName, restaurantSlug) => {
  const list = MENU_ITEMS[restaurantSlug] || [];
  const match = list.find((item) => item.name.toLowerCase() === itemName.toLowerCase());
  return match ? match.image : "";
};

export const normalizeOrder = (o) => {
  if (!o) return null;

  const id = o.id;
  const restaurantName = o.restaurantName || o.restaurants?.name || "Cibo Partner";
  const restaurantSlug = o.restaurantSlug || o.restaurants?.slug || "restaurant";
  const restaurantImage = o.restaurantImage || o.restaurants?.image_url || "/logo.png";

  let items = [];
  if (Array.isArray(o.items)) {
    items = o.items.map((i) => ({
      name: i.name,
      qty: i.qty || i.quantity || 1,
      price: parseFloat(i.price || 0),
      image: i.image || getMenuItemImage(i.name, restaurantSlug) || "",
    }));
  } else if (Array.isArray(o.order_items)) {
    items = o.order_items.map((oi) => ({
      name: oi.name_snapshot,
      qty: oi.quantity || 1,
      price: parseFloat(oi.price_snapshot || 0),
      image: oi.image_url || oi.image || getMenuItemImage(oi.name_snapshot, restaurantSlug) || "",
    }));
  }

  const subtotal = parseFloat(o.subtotal || 0);
  const gst = parseFloat(o.gst || 0);
  const discount = parseFloat(o.discount || 0);
  const total = parseFloat(o.total || 0);
  const deliveryCharge = parseFloat(o.deliveryCharge || o.delivery_charge || 0);

  const paymentMethod = o.paymentMethod || o.payment_method || "—";
  const paymentStatus = o.paymentStatus || o.payment_status || "—";
  const status = o.status || "pending";

  const address = o.address || o.delivery_address || "";
  const phone = o.phone || o.delivery_phone || "";
  const user = o.user || o.customerName || o.customer_name || "—";
  const date = o.date || o.created_at || new Date().toISOString();
  const receiptNo = o.receiptNo || o.receipt_no || "";

  return {
    id,
    restaurantName,
    restaurantSlug,
    restaurantImage,
    items,
    subtotal,
    gst,
    discount,
    total,
    deliveryCharge,
    paymentMethod,
    paymentStatus,
    status,
    address,
    phone,
    user,
    customerName: user,
    date,
    receiptNo,
  };
};

export const orderService = {
  async createOrder(orderData, itemsData) {
    if (USE_SUPABASE) {
      if (!supabase) throw new Error('Supabase client not initialized');
      
      const { data: order, error: orderErr } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single();
        
      if (orderErr) throw orderErr;
      
      const orderItems = itemsData.map((item) => ({
        order_id: order.id,
        menu_item_id: item.menu_item_id,
        name_snapshot: item.name_snapshot,
        price_snapshot: item.price_snapshot,
        quantity: item.quantity
      }));
      
      const { error: itemsErr } = await supabase
        .from('order_items')
        .insert(orderItems);
        
      if (itemsErr) {
        await supabase.from('orders').delete().eq('id', order.id);
        throw itemsErr;
      }
      
      return normalizeOrder(order);
    } else {
      // In local mode, the caller (CheckoutPage.jsx) creates the object and pushes to localStorage.
      // We can just return it.
      return normalizeOrder(orderData);
    }
  },

  async getOrdersByUser(userId, userName) {
    if (USE_SUPABASE) {
      if (!supabase) throw new Error('Supabase client not initialized');
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          restaurants (name, slug, image_url),
          order_items (*)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return (data || []).map(normalizeOrder);
    } else {
      const local = JSON.parse(localStorage.getItem('cibo2_orders') || '[]');
      const filtered = local.filter((o) => {
        if (!userName) return true;
        const name = o.customerName || o.user || o.customer_name || '';
        return name.toLowerCase().includes(userName.toLowerCase());
      });
      return filtered.map(normalizeOrder);
    }
  },

  async getAllOrders() {
    if (USE_SUPABASE) {
      if (!supabase) throw new Error('Supabase client not initialized');
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          restaurants (name, slug, image_url),
          order_items (*)
        `)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return (data || []).map(normalizeOrder);
    } else {
      const local = JSON.parse(localStorage.getItem('cibo2_orders') || '[]');
      return local.map(normalizeOrder);
    }
  },

  async getOrderById(id) {
    if (USE_SUPABASE) {
      if (!supabase) throw new Error('Supabase client not initialized');
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          restaurants (name, slug, image_url),
          order_items (*)
        `)
        .eq('id', id)
        .single();
      if (error) throw error;
      return normalizeOrder(data);
    } else {
      const local = JSON.parse(localStorage.getItem('cibo2_orders') || '[]');
      const found = local.find((o) => o.id === id);
      return normalizeOrder(found);
    }
  },

  async updateOrderStatus(orderId, newStatus) {
    if (USE_SUPABASE) {
      if (!supabase) throw new Error('Supabase client not initialized');
      const { data, error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId)
        .select()
        .single();
        
      if (error) throw error;
      return normalizeOrder(data);
    } else {
      // Return a simulated update object
      return { id: orderId, status: newStatus };
    }
  },

  subscribeToOrderUpdates(orderId, onUpdate) {
    if (!supabase) return null;
    return supabase
      .channel(`order-tracking-${orderId}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'orders', filter: `id=eq.${orderId}` },
        (payload) => {
          onUpdate(normalizeOrder(payload.new));
        }
      )
      .subscribe();
  }
};
