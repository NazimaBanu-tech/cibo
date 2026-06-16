import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { USE_SUPABASE } from '../config';
import { orderService, normalizeOrder } from '../services/orderService';
import { smartReorder as executeSmartReorder } from '../services/orderActions';
import { MENU_ITEMS } from '../data/menuItems';
import { getImage } from '../data/assetLibrary';

const TABS = [
  { id: 'orders', label: 'My Orders' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'addresses', label: 'Addresses' },
  { id: 'settings', label: 'Account Settings' },
];

export default function AccountPage() {
  const { user, updateUser } = useAuth();
  const { favorites, removeFavorite } = useFavorites();
  const cartContext = useCart();
  const { cart } = cartContext;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [saved, setSaved] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [showAddAddr, setShowAddAddr] = useState(false);
  const [newAddr, setNewAddr] = useState({ label: 'Home', line: '' });

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    setForm({ name: user.name || '', email: user.email || '', phone: user.phone || '' });
    setAddresses(user.addresses || []);

    const fetchUserOrders = async () => {
      try {
        const data = await orderService.getOrdersByUser(user.id, user.name);
        setOrders(data || []);
      } catch (err) {
        console.error("Error fetching account orders:", err);
        setOrders([]);
      }
    };

    fetchUserOrders();
  }, [user, navigate]);

  const handleSaveSettings = () => {
    updateUser({ name: form.name, phone: form.phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReorder = async (order) => {
    if (cart.items.length > 0) {
      const confirmReplace = window.confirm(
        "Your cart has items from another order/restaurant. Reordering will replace your current cart. Do you want to proceed?"
      );
      if (!confirmReplace) return;
    }

    try {
      await executeSmartReorder(order.id, cartContext);
      navigate('/cart');
    } catch (err) {
      console.error("Smart Reorder failed:", err);
      alert(err.message || "Failed to reorder. Some items may no longer be available.");
    }
  };

  const handleAddAddress = () => {
    if (!newAddr.line.trim()) return;
    const updated = [...addresses, { id: Date.now(), label: newAddr.label, line: newAddr.line }];
    setAddresses(updated);
    updateUser({ addresses: updated });
    setNewAddr({ label: 'Home', line: '' });
    setShowAddAddr(false);
  };

  const handleDeleteAddress = (id) => {
    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
    updateUser({ addresses: updated });
  };

  const formatDate = (iso) => {
    try { return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); }
    catch { return iso; }
  };

  const statusClass = (s) => {
    if (s === 'delivered') return 'status-delivered';
    if (s === 'cancelled') return 'status-cancelled';
    if (s === 'pending') return 'status-pending';
    if (s === 'preparing') return 'status-preparing';
    if (s === 'out') return 'status-out';
    return 'status-pending';
  };

  if (!user) return null;

  return (
    <div className="account-page">
      <div className="account-header">
        <div>
          <h1>My Account</h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>Manage your orders, favourites, and profile settings.</p>
        </div>
      </div>

      <div className="account-layout">
        {/* Sidebar */}
        <aside className="account-sidebar">
          <div className="account-sidebar-title">Navigation</div>
          {TABS.map((tab) => (
            <div
              key={tab.id}
              className={`account-nav-item${activeTab === tab.id ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              id={`account-tab-${tab.id}`}
            >
              {tab.label}
            </div>
          ))}
          <hr className="divider" style={{ margin: '16px 8px' }} />
          <div style={{ padding: '8px 14px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{user.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{user.email}</div>
          </div>
        </aside>

        {/* Content */}
        <div className="account-content">
          {/* ---- My Orders ---- */}
          {activeTab === 'orders' && (
            <>
              <h2>My Orders</h2>
              <p className="sub">Your order history and status.</p>
              {orders.length === 0 ? (
                <div className="empty-state">
                  <div className="icon" style={{ color: 'var(--text-muted)', marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="9" y1="9" x2="15" y2="9" />
                      <line x1="9" y1="13" x2="15" y2="13" />
                      <line x1="9" y1="17" x2="13" y2="17" />
                    </svg>
                  </div>
                  <h3>No orders yet</h3>
                  <p>Your order history will appear here once you place an order.</p>
                  <Link to="/" className="btn-primary">Browse Restaurants</Link>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="past-order-card">
                    <div className="past-order-header">
                      <div>
                        <h3>{order.restaurantName}</h3>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>#{order.id}</div>
                      </div>
                      <span className={`past-order-status ${statusClass(order.status)}`}>
                        {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                      </span>
                    </div>
                    <div className="past-order-items">
                      {order.items.map((i) => `${i.name} ×${i.qty}`).join(', ')}
                    </div>
                    <div className="past-order-meta">
                      <span>₹{order.total}</span>
                      <span>{formatDate(order.date)}</span>
                      <span>{order.paymentMethod}</span>
                    </div>
                    <div className="past-order-actions">
                      <button
                        className="reorder-btn"
                        onClick={() => handleReorder(order)}
                        id={`reorder-${order.id}`}
                      >
                        Reorder
                      </button>
                      <button onClick={() => {
                        localStorage.setItem('cibo2_last_order', JSON.stringify(order));
                        navigate('/receipt');
                      }} id={`receipt-${order.id}`}>
                        View Receipt
                      </button>
                      {(order.status === 'pending' || order.status === 'preparing' || order.status === 'out') && (
                        <button onClick={() => {
                          localStorage.setItem('cibo2_last_order', JSON.stringify(order));
                          navigate(`/track-order/${order.id}`);
                        }} id={`track-${order.id}`}>
                          Track
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {/* ---- Favorites ---- */}
          {activeTab === 'favorites' && (
            <>
              <h2>Favorites</h2>
              <p className="sub">Your saved favourite menu items.</p>
              {favorites.length === 0 ? (
                <div className="empty-state">
                  <div className="icon" style={{ color: 'var(--green-dark)', marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </div>
                  <h3>No favourites yet</h3>
                  <p>Tap the heart icon on any menu item to save it here.</p>
                  <Link to="/" className="btn-primary">Browse Restaurants</Link>
                </div>
              ) : (
                <div className="favorites-grid">
                  {favorites.map((item) => {
                    const resolvedItem = Object.values(MENU_ITEMS)
                      .flat()
                      .find((m) => m.id === item.id) || item;
                    return (
                      <div key={item.id} className="fav-item-card">
                        <img src={getImage('menu', resolvedItem.image)} alt={resolvedItem.name} onError={(e) => { e.target.src = '/logo.png'; }} />
                        <div className="fav-item-card-body">
                          <h4>{resolvedItem.name}</h4>
                          <p className="restaurant">{item.restaurantName}</p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="price">₹{resolvedItem.price}</span>
                            <button
                              className="unfav-btn"
                              onClick={() => removeFavorite(item.id, item)}
                              id={`unfav-${item.id}`}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* ---- Addresses ---- */}
          {activeTab === 'addresses' && (
            <>
              <h2>Saved Addresses</h2>
              <p className="sub">Manage your delivery addresses.</p>
              {addresses.map((addr) => (
                <div key={addr.id} className="address-card">
                  <div>
                    <div className="addr-label">{addr.label}</div>
                    <div className="addr-text">{addr.line}</div>
                  </div>
                  <div className="addr-actions">
                    <button onClick={() => handleDeleteAddress(addr.id)} id={`delete-addr-${addr.id}`}>Delete</button>
                  </div>
                </div>
              ))}
              {!showAddAddr ? (
                <button className="btn-outline" style={{ marginTop: 12 }} onClick={() => setShowAddAddr(true)} id="add-address-btn">
                  + Add New Address
                </button>
              ) : (
                <div style={{ border: '1.5px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 20, marginTop: 12 }}>
                  <h3 style={{ marginBottom: 16, fontSize: 15, fontWeight: 700 }}>New Address</h3>
                  <div className="form-group" style={{ marginBottom: 12 }}>
                    <label>Label</label>
                    <select className="admin-select" value={newAddr.label} onChange={(e) => setNewAddr({ ...newAddr, label: e.target.value })}>
                      <option>Home</option>
                      <option>Work</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: 16 }}>
                    <label>Full Address</label>
                    <input className="form-input" placeholder="Street, City, Pincode" value={newAddr.line} onChange={(e) => setNewAddr({ ...newAddr, line: e.target.value })} />
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button className="btn-primary" onClick={handleAddAddress} id="save-address-btn">Save</button>
                    <button className="btn-ghost" onClick={() => setShowAddAddr(false)}>Cancel</button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ---- Settings ---- */}
          {activeTab === 'settings' && (
            <>
              <h2>Account Settings</h2>
              <p className="sub">Update your personal details.</p>
              <div className="settings-form">
                <div className="form-group">
                  <label htmlFor="settings-name">Full Name</label>
                  <input id="settings-name" className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="settings-email">Email</label>
                  <input id="settings-email" className="form-input" value={form.email} disabled style={{ opacity: 0.6, cursor: 'not-allowed' }} />
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Email cannot be changed</span>
                </div>
                <div className="form-group">
                  <label htmlFor="settings-phone">Phone</label>
                  <input id="settings-phone" className="form-input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })} maxLength={10} />
                </div>
                {saved && (
                  <div style={{ background: 'var(--green-pale)', border: '1px solid var(--green-pill)', borderRadius: 8, padding: '10px 14px', fontSize: 14, color: 'var(--green-dark)', fontWeight: 600 }}>
                    ✓ Changes saved successfully!
                  </div>
                )}
                <button className="btn-primary save-btn" onClick={handleSaveSettings} id="save-settings-btn">Save Changes</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
