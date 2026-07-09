import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { searchRestaurants } from '../data/restaurants';
import LogoutModal from './LogoutModal';
import { getImage } from '../data/assetLibrary';
import { useWindowWidth } from '../utils/useWindowWidth';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const width = useWindowWidth();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (q) => {
    setSearchQuery(q);
    if (q.trim().length > 0) {
      setSearchResults(searchRestaurants(q).slice(0, 6));
      setShowSearch(true);
    } else {
      setSearchResults([]);
      setShowSearch(false);
    }
  };

  const handleSelectResult = (restaurant) => {
    setSearchQuery('');
    setShowSearch(false);
    navigate(`/restaurant/${restaurant.slug}`);
  };

  const handleLogout = () => {
    signOut();
    setShowLogout(false);
    navigate('/');
  };

  const isMobile = width <= 768;

  if (isMobile) {
    return (
      <>
        <nav className="navbar mobile-navbar">
          {/* Logo & Info */}
          <Link to="/" className="nav-logo">
            <img src="/logo.png" alt="Cibo" style={{ width: 32, height: 32 }} />
            <span>Cibo</span>
          </Link>
          <div className="nav-location" style={{ fontSize: 13, gap: 4 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            Bangalore
          </div>
          {/* Cart Icon Shortcut */}
          <div className="nav-right" style={{ gap: 8 }}>
            <Link to="/cart" className="nav-cart" style={{ padding: '6px 12px', border: 'none' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {totalItems > 0 && <span className="nav-cart-badge" style={{ width: 16, height: 16, fontSize: 9 }}>{totalItems}</span>}
            </Link>
          </div>
        </nav>
      </>
    );
  }

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <img src="/logo.png" alt="Cibo" />
          <span>Cibo</span>
        </Link>

        {/* Location */}
        <div className="nav-location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          Bangalore
        </div>

        {/* Search */}
        <div className="nav-search" ref={searchRef}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search for restaurant, cuisine or a dish"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => searchQuery && setShowSearch(true)}
            id="navbar-search"
          />
          {showSearch && searchQuery.trim().length > 0 && (
            <div className="search-results-dropdown">
              {searchResults.length > 0 ? (
                searchResults.map((r) => (
                  <div
                    key={r.id}
                    className="search-result-item"
                    onClick={() => handleSelectResult(r)}
                  >
                    <img src={getImage('restaurants', r.image)} alt={r.name} onError={(e) => { e.target.src = '/logo.png'; }} />
                    <div className="search-result-info">
                      <div className="name">{r.name}</div>
                      <div className="sub">{r.cuisine.join(', ')} · {r.location}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="search-no-results" style={{ padding: '16px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>No results found</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Try searching with a different keyword</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right section */}
        <div className="nav-right">
          {user ? (
            <div className="nav-user" ref={userMenuRef} onClick={() => setShowUserMenu(!showUserMenu)} id="user-menu-toggle">
              <span>Hi, {user.name.split(' ')[0]}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
              {showUserMenu && (
                <div className="nav-user-dropdown" onClick={(e) => e.stopPropagation()}>
                  <Link to="/account" onClick={() => setShowUserMenu(false)} id="my-account-link">My Account</Link>
                  <button onClick={() => { setShowUserMenu(false); setShowLogout(true); }} id="logout-btn">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="nav-signin" id="sign-in-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
              Sign In
            </Link>
          )}

          <Link to="/cart" className="nav-cart" id="cart-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Cart
            {totalItems > 0 && (
              <span className="nav-cart-badge">{totalItems}</span>
            )}
          </Link>
        </div>
      </nav>

      {showLogout && (
        <LogoutModal
          onConfirm={handleLogout}
          onCancel={() => setShowLogout(false)}
        />
      )}
    </>
  );
}

