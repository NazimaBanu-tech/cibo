import { useState, useEffect, useMemo } from 'react';
import { RESTAURANTS } from '../data/restaurants';
import { MOCK_USERS } from '../data/mockData';
import { orderService } from '../services/orderService';

const HERO_CARDS = [
  { label: 'Platform Status', value: 'Operational' },
  { label: 'Active Cities', value: '1 (Bangalore)' },
  { label: 'Delivery Partners', value: '12 Active' },
];

export default function DashboardPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await orderService.getAllOrders();
        setOrders(data || []);
      } catch (err) {
        console.error("Error fetching dashboard orders:", err);
        setOrders([]);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const deliveredCount = orders.filter((o) => o.status === 'delivered').length;
    return [
      { label: 'Total Restaurants', value: RESTAURANTS.length },
      { label: 'Total Orders', value: totalOrders },
      { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}` },
      { label: 'Total Users', value: MOCK_USERS.length },
      { label: 'Delivered', value: deliveredCount },
    ];
  }, [orders]);

  const recentOrders = useMemo(() => orders.slice(0, 5), [orders]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', color: 'var(--text-secondary)' }}>
        <p>Loading dashboard metrics...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="admin-page-title">Dashboard</h1>
      <p className="admin-page-sub">Welcome back. Here&apos;s an overview of your platform at a glance.</p>

      {/* Hero card */}
      <div className="dashboard-hero">
        <div>
          <div className="hero-badge">ADMIN DASHBOARD</div>
          <h2>Manage and monitor your Cibo platform in real time</h2>
          <p>Track restaurant performance, manage orders, and review reports — all in one place with a clean Cibo admin experience.</p>
        </div>
        <div className="dashboard-hero-cards">
          {HERO_CARDS.map((c) => (
            <div key={c.label} className="dashboard-hero-card">
              <div className="dh-label">{c.label}</div>
              <div className="dh-val">{c.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div>
        <div className="admin-page-actions">
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>Recent Orders</h2>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Restaurant</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id}>
                  <td className="order-id">{o.id.slice(0, 16)}</td>
                  <td>{o.user || o.customerName || '—'}</td>
                  <td>{o.restaurantName}</td>
                  <td>₹{o.total}</td>
                  <td>
                    <span className={`past-order-status status-${o.status}`}>
                      {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: 20, color: 'var(--text-muted)' }}>
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
