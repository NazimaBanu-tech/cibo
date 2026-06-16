import { useState, useEffect } from 'react';
import { USE_SUPABASE } from '../config';
import { orderService } from '../services/orderService';
import { updateOrderStatus } from '../services/orderActions';

const ORDER_STATUSES = ['pending', 'preparing', 'out', 'delivered', 'cancelled'];

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await orderService.getAllOrders();
        setOrders(data || []);
      } catch (err) {
        console.error("Error fetching admin orders:", err);
        setOrders([]);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const filtered = orders.filter((o) => {
    const matchStatus = filter === 'all' || o.status === filter;
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      (o.user || o.customerName || '').toLowerCase().includes(search.toLowerCase()) ||
      o.restaurantName?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleStatusChange = async (orderId, newStatus) => {
    // 1. Update component state
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status: newStatus } : o));

    // 2. Update status and sync Supabase + localStorage via orderActions
    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to sync status update.");
    }
  };

  const formatDate = (iso) => {
    try { return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }); }
    catch { return iso || '—'; }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', color: 'var(--text-secondary)' }}>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="admin-page-title">Orders</h1>
      <p className="admin-page-sub">View and manage all customer orders. Update order status in real time.</p>

      <div className="admin-page-actions" style={{ flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', flex: 1 }}>
          <select className="admin-select" style={{ maxWidth: 180 }} value={filter} onChange={(e) => setFilter(e.target.value)} id="order-status-filter">
            <option value="all">All Statuses</option>
            {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
          <input className="form-input" style={{ maxWidth: 300 }} placeholder="Search order ID, customer, restaurant…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <span style={{ fontSize: 13, color: 'var(--text-muted)', alignSelf: 'center' }}>{filtered.length} order{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Restaurant</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id}>
                <td className="order-id">{o.id.slice(0, 16)}</td>
                <td>{o.user || o.customerName || '—'}</td>
                <td style={{ fontSize: 13 }}>{o.restaurantName}</td>
                <td style={{ fontSize: 12, maxWidth: 200, color: 'var(--text-secondary)' }}>
                  {Array.isArray(o.items) 
                    ? o.items.map((i) => `${i.name} ×${i.qty}`).join(', ').slice(0, 60) 
                    : (o.items || '—').slice(0, 60)}
                  {(Array.isArray(o.items) 
                    ? o.items.map((i) => `${i.name} ×${i.qty}`).join(', ') 
                    : o.items || '').length > 60 ? '…' : ''}
                </td>
                <td>₹{o.total}</td>
                <td style={{ fontSize: 12 }}>{o.payment || o.paymentMethod || '—'}</td>
                <td style={{ fontSize: 12 }}>{formatDate(o.date)}</td>
                <td>
                  {USE_SUPABASE ? (
                    <select
                      className="status-select"
                      value={o.status}
                      onChange={(e) => handleStatusChange(o.id, e.target.value)}
                      id={`order-status-${o.id}`}
                    >
                      {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                    </select>
                  ) : (
                    <span className="status-label-read-only" style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      textTransform: 'capitalize',
                      backgroundColor: o.status === 'delivered' ? 'var(--green-pale)' : o.status === 'cancelled' ? '#fee2e2' : '#fef3c7',
                      color: o.status === 'delivered' ? 'var(--green-dark)' : o.status === 'cancelled' ? '#991b1b' : '#92400e'
                    }}>
                      {o.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={8} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>No orders found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
