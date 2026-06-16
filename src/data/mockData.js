// =============================================
// CIBO – Promo Codes & Mock Orders
// =============================================

export const PROMO_CODES = [
  {
    code: "FIRST100",
    description: "₹100 off for first-time users",
    type: "flat",
    value: 100,
    minOrder: 0,
    condition: "first_order"
  },
  {
    code: "SAVE50",
    description: "₹50 off on orders above ₹500",
    type: "flat",
    value: 50,
    minOrder: 500
  },
  {
    code: "SAVE5",
    description: "5% off on orders above ₹1000",
    type: "percent",
    value: 5,
    minOrder: 1000
  },
  {
    code: "SAVE10",
    description: "10% off on orders above ₹2000",
    type: "percent",
    value: 10,
    minOrder: 2000
  }
];

export const applyPromoCode = (code, subtotal) => {
  const cleanCode = (code || "").trim().toUpperCase();
  const promo = PROMO_CODES.find((p) => p.code === cleanCode);
  if (!promo) return { valid: false, error: "Invalid promo code" };

  if (promo.condition === "first_order") {
    try {
      const orders = JSON.parse(localStorage.getItem('cibo2_orders') || '[]');
      const activeUser = JSON.parse(localStorage.getItem('cibo2_user') || 'null');
      if (activeUser) {
        // Filter orders belonging strictly to the current logged-in customer name or ID
        const userOrders = orders.filter((o) => {
          const custName = o.customerName || o.user || '';
          return custName.toLowerCase().trim() === activeUser.name.toLowerCase().trim() ||
                 (o.user_id && o.user_id === activeUser.id);
        });
        if (userOrders.length > 0) {
          return { valid: false, error: "This offer is only for first-time users" };
        }
      }
    } catch { /* ignore */ }
  }

  if (subtotal < promo.minOrder) {
    return {
      valid: false,
      error: `Minimum order ₹${promo.minOrder} required`,
    };
  }

  const discount =
    promo.type === "flat"
      ? promo.value
      : Math.round((subtotal * promo.value) / 100);

  return { valid: true, discount, description: promo.description };
};

// ---- Mock Orders (for account page) ----
export const MOCK_ORDERS = [
  {
    id: "CB1779774091264",
    restaurantName: "Burger King",
    restaurantSlug: "burger-king",
    restaurantImage: "/restaurants/burger-king.jpg",
    items: [
      { name: "Crispy Veg Burger", qty: 2, price: 169, image: "/food-items/burger-king/crispy-veg-burger.jpg" },
      { name: "Peri Peri Fries", qty: 2, price: 119, image: "/food-items/burger-king/peri-peri-fries.jpg" },
    ],
    subtotal: 576,
    gst: 28.8,
    discount: 0,
    total: 604.8,
    deliveryCharge: 0,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Paid (COD Collected)",
    status: "delivered",
    address: "# 232 Aqsa Masjid Main Road Bangalore South, Bangalore, 560078",
    phone: "6360485063",
    customerName: "Nazima",
    date: "2026-05-26T11:11:00",
    receiptNo: "RCT-20260526-000021",
  },
  {
    id: "CB1779648374450",
    restaurantName: "Hae Kum Gang",
    restaurantSlug: "hae-kum-gang",
    restaurantImage: "/restaurants/hae-kum-gang.jpg",
    items: [
      { name: "Korean Fried Chicken", qty: 1, price: 399, image: "/food-items/hae-kum-gang/korean-fried-chicken.jpg" },
      { name: "Bibimbap", qty: 3, price: 349, image: "/food-items/hae-kum-gang/bibimbap.jpg" },
      { name: "Chicken Bulgogi", qty: 1, price: 429, image: "/food-items/hae-kum-gang/bulgogi.jpg" },
    ],
    subtotal: 1875,
    gst: 93.75,
    discount: 0,
    total: 1968.75,
    deliveryCharge: 0,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Paid (COD Collected)",
    status: "delivered",
    address: "9th Main Road, 2nd Block, Jayanagar East, Bengaluru, 560011",
    phone: "9876543210",
    customerName: "Imran",
    date: "2026-05-24T14:22:00",
    receiptNo: "RCT-20260524-000018",
  },
];

// ---- Mock Users (for admin) ----
export const MOCK_USERS = [
  { id: 1, name: "Nazima", email: "nazimacibo@gmail.com", phone: "6360485063", joined: "2026-05-26" },
  { id: 2, name: "Imran", email: "iamimran@gmail.com", phone: "9876543210", joined: "2026-05-25" },
  { id: 3, name: "Mugen", email: "iammugen@gmail.com", phone: "9123456789", joined: "2026-05-23" },
  { id: 4, name: "surya", email: "thisissurya@gmail.com", phone: "9234567890", joined: "2026-05-23" },
  { id: 5, name: "madan", email: "gowri987@gmail.com", phone: "9345678901", joined: "2026-05-22" },
  { id: 6, name: "mehak", email: "mehak22@gmail.com", phone: "9456789012", joined: "2026-05-22" },
  { id: 7, name: "Arfa", email: "arfa.09@gmail.com", phone: "9567890123", joined: "2026-05-19" },
  { id: 8, name: "Monisha", email: "monitesting@gmail.com", phone: "9678901234", joined: "2026-05-19" },
  { id: 9, name: "Sumaiya", email: "summu.02@gmail.com", phone: "9789012345", joined: "2026-05-18" },
  { id: 10, name: "sonu", email: "sonu1805@gmail.com", phone: "9890123456", joined: "2026-05-18" },
  { id: 11, name: "kiran", email: "kiran.kumar@gmail.com", phone: "9901234567", joined: "2026-05-15" },
  { id: 12, name: "priya", email: "priyaaa@gmail.com", phone: "9012345678", joined: "2026-05-14" },
];

// ---- Mock Admin Orders (for admin panel) ----
export const MOCK_ADMIN_ORDERS = [
  {
    id: "CB1779774091264", user: "Nazima",
    items: "Crispy Veg Burger x2, Peri Peri Fries x2",
    delivery: "# 232 Aqsa Masjid Main Road Bangalore South Bangalore South Bangalore 560078, Bangalore, 560078",
    payment: "Paid (COD Collected)", total: 605, status: "delivered",
    restaurantName: "Burger King",
  },
  {
    id: "CB1779648374450", user: "Imran",
    items: "Korean Fried Chicken x1, Bibimbap x3, Chicken Bulgogi x1, Kimchi Fried Rice x3, Veg Kimbap x3, Korean Lemon Ade x3",
    delivery: "9th Main Road, 2nd Block, Jayanagar East, Bengaluru, Karnataka 560011, India, Bengaluru, 560011",
    payment: "Paid (COD Collected)", total: 2803, status: "delivered",
    restaurantName: "Hae Kum Gang",
  },
  {
    id: "CB1779648216023", user: "Imran",
    items: "Korean Ramen Bowl x5",
    delivery: "9th Main Road, 2nd Block, Jayanagar East, Bengaluru, Karnataka 560011, India, Bengaluru, 560011",
    payment: "Paid", total: 1202, status: "delivered",
    restaurantName: "Hae Kum Gang",
  },
  {
    id: "CB1779509216967", user: "Mugen",
    items: "Idli Vada x1, Masala Dosa x1",
    delivery: "J P Nagar Main Road, near bus stop, Bengaluru, 560076",
    payment: "Paid", total: 177, status: "delivered",
    restaurantName: "Udupi Palace",
  },
  {
    id: "CB1779486996629", user: "surya",
    items: "Cold Coffee x1, Hot Chocolate Fudge x2, Chocolate Milkshake x1",
    delivery: "# 232 Aqsa Masjid Main Road Bangalore South Bangalore South Bangalore 560078, Bangalore, 560078",
    payment: "Paid", total: 594, status: "delivered",
    restaurantName: "Corner House",
  },
];
