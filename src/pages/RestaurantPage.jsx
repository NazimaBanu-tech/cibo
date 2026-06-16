import { useState, useMemo, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getRestaurantBySlug } from '../data/restaurants';
import { getMenuByRestaurant } from '../data/menuItems';
import { getImage } from '../data/assetLibrary';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { USE_SUPABASE } from '../config';
import { restaurantService } from '../services/restaurantService';
import { menuService } from '../services/menuService';

// MENU_FILTERS is now dynamically derived within the component

export default function RestaurantPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const initialRestaurant = useMemo(() => {
    if (!USE_SUPABASE) {
      return getRestaurantBySlug(slug);
    }
    return null;
  }, [slug]);

  const initialMenu = useMemo(() => {
    if (!USE_SUPABASE) {
      return getMenuByRestaurant(slug);
    }
    return [];
  }, [slug]);

  const [restaurant, setRestaurant] = useState(initialRestaurant);
  const [menuItems, setMenuItems] = useState(initialMenu);
  const [loading, setLoading] = useState(USE_SUPABASE);

  useEffect(() => {
    if (USE_SUPABASE) {
      setLoading(true);
      restaurantService.fetchRestaurantBySlug(slug)
        .then(async (dbRest) => {
          if (dbRest) {
            const mappedRest = {
              id: dbRest.id,
              name: dbRest.name,
              slug: dbRest.slug,
              category: dbRest.category,
              cuisine: dbRest.cuisine || [],
              location: dbRest.location,
              rating: parseFloat(dbRest.rating || 4.0),
              deliveryTime: dbRest.delivery_time,
              image: dbRest.image_url,
              heroImage: dbRest.hero_image_url,
              offerText: dbRest.offer_text,
            };
            setRestaurant(mappedRest);

            try {
              const dbItems = await menuService.fetchMenuItemsByRestaurant(dbRest.id);
              if (dbItems && dbItems.length > 0) {
                const mappedItems = dbItems.map((item) => ({
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
                setMenuItems(mappedItems);
              } else {
                setMenuItems(getMenuByRestaurant(slug));
              }
            } catch (menuErr) {
              console.error("Error fetching menu items, fallback to mock:", menuErr);
              setMenuItems(getMenuByRestaurant(slug));
            }
          } else {
            setRestaurant(getRestaurantBySlug(slug));
            setMenuItems(getMenuByRestaurant(slug));
          }
        })
        .catch((err) => {
          console.error("Error loading restaurant by slug, fallback to mock:", err);
          setRestaurant(getRestaurantBySlug(slug));
          setMenuItems(getMenuByRestaurant(slug));
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setRestaurant(getRestaurantBySlug(slug));
      setMenuItems(getMenuByRestaurant(slug));
      setLoading(false);
    }
  }, [slug]);

  const { addItem, forceAddFromNewRestaurant, getItemQty, removeOne, cart, totalItems, MAX_ITEM_QTY, MAX_TOTAL_ITEMS } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const [activeFilter, setActiveFilter] = useState('all');
  const [switchModal, setSwitchModal] = useState(null); // { item, restaurant }
  const [limitWarning, setLimitWarning] = useState('');
  const warningTimerRef = useRef(null);

  const MENU_FILTERS = useMemo(() => {
    const categories = new Set();
    menuItems.forEach((item) => {
      if (item.category) {
        categories.add(item.category);
      }
    });

    // Filter out null, undefined, "", "none", "null"
    const validCategories = Array.from(categories).filter((c) => {
      if (c === null || c === undefined) return false;
      const clean = String(c).toLowerCase().trim();
      return clean !== '' && clean !== 'none' && clean !== 'null';
    });

    // Sort for consistent rendering order
    validCategories.sort();

    return ['all', ...validCategories];
  }, [menuItems]);

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return menuItems.filter((i) => i.available);
    return menuItems.filter((i) => i.available && i.category === activeFilter);
  }, [menuItems, activeFilter]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '60px 24px', textAlign: 'center' }}>
        <h2>Loading restaurant...</h2>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="container" style={{ padding: '60px 24px', textAlign: 'center' }}>
        <h2>Restaurant not found</h2>
        <Link to="/" className="btn-primary" style={{ display: 'inline-block', marginTop: 16 }}>Back to Home</Link>
      </div>
    );
  }

  const handleAdd = (item) => {
    const result = addItem(item, restaurant);
    if (!result) {
      setLimitWarning('');
      return;
    }
    if (result.needsConfirm) {
      setSwitchModal({ item, restaurant });
      return;
    }
    if (result.error) {
      if (warningTimerRef.current) {
        clearTimeout(warningTimerRef.current);
      }
      setLimitWarning('');
      setTimeout(() => {
        setLimitWarning(result.error);
        warningTimerRef.current = setTimeout(() => {
          setLimitWarning('');
          warningTimerRef.current = null;
        }, 4500);
      }, 50);
    }
  };

  const handleSwitchConfirm = () => {
    if (switchModal) {
      forceAddFromNewRestaurant(switchModal.item, switchModal.restaurant);
    }
    setSwitchModal(null);
  };

  return (
    <div className="restaurant-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>{restaurant.name}</span>
      </div>

      {/* Hero section */}
      <div className="restaurant-hero-section">
        <div className="restaurant-hero-info">
          <h1>{restaurant.name}</h1>
          <div className="restaurant-hero-meta">
            <span>★ {restaurant.rating}</span>
            <span className="dot" />
            <span>{restaurant.deliveryTime}</span>
            <span className="dot" />
            <span>{restaurant.cuisine.join(', ')}</span>
          </div>
          <div className="restaurant-hero-location">{restaurant.location}</div>
          {restaurant.offerText && (
            <div className="restaurant-hero-offer" style={{ display: 'none' }}>Offer: {restaurant.offerText}</div>
          )}
        </div>
        <img
          className="restaurant-hero-img"
          src={getImage('heroes', restaurant.heroImage)}
          alt={restaurant.name}
          onError={(e) => { e.target.src = getImage('restaurants', restaurant.image); }}
        />
      </div>

      {/* Limit warning */}
      {limitWarning && (
        <div className="cart-limit-warning">
          <span>{limitWarning}</span>
          <button className="cart-limit-close" onClick={() => setLimitWarning('')} aria-label="Close warning">&times;</button>
        </div>
      )}

      {/* Menu */}
      <div className="menu-section">
        <h2>Menu</h2>
        <div className="menu-filters">
          {MENU_FILTERS.map((f) => {
            const getLabel = (filter) => {
              if (filter === 'all') return 'All';
              if (filter === 'veg') return 'Veg';
              if (filter === 'nonveg') return 'Non-Veg';
              return filter.charAt(0).toUpperCase() + filter.slice(1);
            };
            return (
              <button
                key={f}
                className={`menu-filter-btn${activeFilter === f ? ' active' : ''}`}
                onClick={() => setActiveFilter(f)}
                id={`menu-filter-${f}`}
              >
                {getLabel(f)}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <h3>No items found</h3>
            <p>Try a different filter.</p>
          </div>
        ) : (
          <div className="menu-grid">
            {filtered.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                restaurant={restaurant}
                qty={getItemQty(item.id)}
                onAdd={() => handleAdd(item)}
                onRemove={() => removeOne(item.id)}
                isFav={isFavorite(item.id, item)}
                onToggleFav={() => toggleFavorite(item, restaurant.name, restaurant.slug)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Cart floating button */}
      {cart.restaurantId === restaurant.id && totalItems > 0 && (
        <div style={{
          position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          background: 'var(--green-dark)', color: 'var(--white)',
          borderRadius: 'var(--radius-pill)', padding: '14px 32px',
          display: 'flex', alignItems: 'center', gap: 16,
          boxShadow: 'var(--shadow-lg)', cursor: 'pointer', zIndex: 400,
          fontSize: 15, fontWeight: 700,
        }} onClick={() => navigate('/cart')}>
          <span>{totalItems} item{totalItems > 1 ? 's' : ''} in cart</span>
          <span>→ View Cart</span>
        </div>
      )}

      {/* Switch restaurant modal */}
      {switchModal && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ textAlign: 'center' }}>
            <div style={{ color: 'var(--green-dark)', marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>Start new order?</h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.6 }}>
              Your cart has items from <strong>{cart.restaurantName}</strong>. Adding items from{' '}
              <strong>{switchModal.restaurant.name}</strong> will clear your current cart.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button className="btn-outline" onClick={() => setSwitchModal(null)}>Keep current cart</button>
              <button className="btn-primary" onClick={handleSwitchConfirm}>Start new order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuItemCard({ item, restaurant, qty, onAdd, onRemove, isFav, onToggleFav }) {
  const isVeg = item.category === 'veg';
  const isNonVeg = item.category === 'nonveg';

  return (
    <div className="menu-item-card" id={`menu-item-${item.id}`}>
      <div className="menu-item-img-wrap">
        <img
          src={getImage('menu', item.image)}
          alt={item.name}
          onError={(e) => { e.target.src = '/logo.png'; e.target.style.objectFit = 'contain'; e.target.style.padding = '20px'; e.target.style.background = 'var(--cream)'; }}
        />
        <button
          className={`fav-btn${isFav ? ' active' : ''}`}
          onClick={onToggleFav}
          aria-label="Toggle favourite"
          id={`fav-${item.id}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={isFav ? 'var(--green-dark)' : 'none'} stroke={isFav ? 'white' : 'currentColor'} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div className="menu-item-body">
        {(isVeg || isNonVeg) && (
          <div className={`veg-badge ${item.category}`}>
            <span className={`veg-dot ${item.category}`} />
            {isVeg ? 'Veg' : 'Non-Veg'}
          </div>
        )}
        <div className="menu-item-name">{item.name}</div>
        <div className="menu-item-price">₹{item.price}</div>
        <div className="menu-item-desc">{item.description}</div>

        {qty === 0 ? (
          <button className="menu-item-add" onClick={onAdd} id={`add-${item.id}`}>Add</button>
        ) : (
          <div className="menu-item-qty">
            <button onClick={onRemove} aria-label="Remove one">−</button>
            <span>{qty}</span>
            <button onClick={onAdd} aria-label="Add one">+</button>
          </div>
        )}
      </div>
    </div>
  );
}
