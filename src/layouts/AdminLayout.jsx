import { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LogoutModal from '../components/LogoutModal';

const navLinks = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/restaurants', label: 'Restaurants' },
  { to: '/admin/menu-items', label: 'Menu Items' },
  { to: '/admin/orders', label: 'Orders' },
  { to: '/admin/users', label: 'Users' },
  { to: '/admin/reports', label: 'Reports' },
  { to: '/admin/profile', label: 'Admin Profile' },
];

export default function AdminLayout() {
  const { adminUser, adminSignOut } = useAuth();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    adminSignOut();
    navigate('/admin/login');
  };

  if (!adminUser) {
    navigate('/admin/login');
    return null;
  }

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">
          <img src="/logo.png" alt="Cibo" />
          <span className="brand">Cibo</span>
        </div>
        <div className="admin-sidebar-sub">Premium admin panel</div>
        <Link to="/" className="admin-view-site">View site</Link>

        <nav className="admin-nav">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `admin-nav-link${isActive ? ' active' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="signed-as">
            Signed in as <strong>{adminUser.name}.</strong>
          </div>
          <button
            className="admin-logout-btn"
            onClick={() => setShowLogout(true)}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        <Outlet />
      </main>

      {showLogout && (
        <LogoutModal
          onConfirm={handleLogout}
          onCancel={() => setShowLogout(false)}
        />
      )}
    </div>
  );
}
