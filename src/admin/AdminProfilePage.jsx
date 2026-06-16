import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { RESTAURANTS } from '../data/restaurants';
import { orderService } from '../services/orderService';
import { USE_SUPABASE } from '../config';

export default function AdminProfilePage() {
  const { adminUser } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    orderService.getAllOrders()
      .then((data) => setOrders(data || []))
      .catch((err) => console.error("Error fetching admin profile stats:", err));
  }, []);

  if (!adminUser) return null;

  const totalOrders = orders.length;
  const totalRestaurants = RESTAURANTS.length;
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0).toLocaleString('en-IN');

  const PROFILE_FIELDS = [
    { label: 'FULL NAME', value: adminUser.name },
    { label: 'EMAIL ADDRESS', value: adminUser.email },
    { label: 'ROLE', value: adminUser.role },
    { label: 'JOINED DATE', value: adminUser.joinedDate || '29 Dec 2025' },
    { label: 'TOTAL ORDERS MANAGED', value: totalOrders },
    { label: 'RESTAURANTS MANAGED', value: totalRestaurants },
    { label: 'TOTAL REVENUE', value: `₹${totalRevenue}` },
    { label: 'ACTIVE CITIES', value: '1 (Bangalore)' },
  ];

  return (
    <div>
      <h1 className="admin-page-title">Admin Profile</h1>
      <p className="admin-page-sub">Your account details and platform overview.</p>

      {/* Hero */}
      <div className="admin-profile-hero">
        <div className="admin-profile-avatar">
          {adminUser.name?.[0]?.toUpperCase() || 'A'}
        </div>
        <div>
          <div className="admin-profile-badge">ADMIN</div>
          <div className="admin-profile-name">{adminUser.name}</div>
          <div className="admin-profile-email">{adminUser.email}</div>
        </div>
      </div>

      {/* Profile fields */}
      <div className="admin-profile-grid">
        {PROFILE_FIELDS.map((f) => (
          <div key={f.label} className="admin-profile-field">
            <div className="field-label">{f.label}</div>
            <div className="field-value">{f.value}</div>
          </div>
        ))}
      </div>

      {/* Info box */}
      <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-xl)', padding: 24, boxShadow: 'var(--shadow)', marginTop: 4 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>System Status & Admin Identity</h3>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          This administrative account manages Cibo platform operations, active restaurant partnerships, menu items, and incoming customer orders.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginTop: 16, borderTop: '1px solid var(--border)', paddingTop: 16 }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>SYSTEM ENVIRONMENT</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginTop: 4 }}>{USE_SUPABASE ? 'Cloud Mode (Supabase)' : 'Local Mode (localStorage)'}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>SYSTEM VERSION</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginTop: 4 }}>Cibo Admin v1.0.0</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>ACCOUNT STATUS</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--green-dark)', marginTop: 4 }}>🟢 Active</div>
          </div>
        </div>
      </div>
    </div>
  );
}
