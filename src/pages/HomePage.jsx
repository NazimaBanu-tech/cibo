import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RESTAURANTS, CATEGORIES } from '../data/restaurants';
import { USE_SUPABASE } from '../config';
import { restaurantService } from '../services/restaurantService';
import { getImage } from '../data/assetLibrary';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery] = useState('');
  const [restaurants, setRestaurants] = useState(RESTAURANTS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (USE_SUPABASE) {
      setLoading(true);
      restaurantService.fetchRestaurants()
        .then((data) => {
          if (data && data.length > 0) {
            const mapped = data.map((r) => ({
              id: r.id,
              name: r.name,
              slug: r.slug,
              category: r.category,
              cuisine: r.cuisine || [],
              location: r.location,
              rating: parseFloat(r.rating || 4.0),
              deliveryTime: r.delivery_time,
              image: r.image_url,
              heroImage: r.hero_image_url,
              offerText: r.offer_text,
            }));
            setRestaurants(mapped);
          } else {
            setRestaurants(RESTAURANTS);
          }
        })
        .catch((err) => {
          console.error("Error fetching restaurants from Supabase, fallback to mock data:", err);
          setRestaurants(RESTAURANTS);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setRestaurants(RESTAURANTS);
    }
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return restaurants;
    return restaurants.filter(
      (r) =>
        r.category === activeCategory ||
        r.cuisine.some((c) => c.toLowerCase().includes(activeCategory.toLowerCase()))
    );
  }, [restaurants, activeCategory]);

  return (
    <div>
      {/* Hero */}
      <div className="hero">
        <img src="/hero.jpg" alt="Order from trusted restaurants near you" />
        <div className="hero-overlay">
          <h1>Order from trusted restaurants near you</h1>
          <p>Browse menus, place your order, and track every step in one clean Cibo flow.</p>
        </div>
      </div>

      <div className="container">
        {/* Categories */}
        <section className="category-section">
          <h2 className="section-title">What&apos;s on your mind?</h2>
          <div className="categories-row">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                className={`category-item${activeCategory === cat.name ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat.name)}
                id={`cat-${cat.name.toLowerCase().replace(/\s/g, '-')}`}
              >
                <div className="category-img-wrap">
                  <img src={cat.image} alt={cat.name} onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
                <span>{cat.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Restaurants */}
        <section className="restaurant-section">
          <h2 className="section-title">
            {activeCategory === 'All' ? 'Top restaurants near you' : `${activeCategory} restaurants`}
          </h2>

          {filtered.length === 0 ? (
            <div className="no-restaurants">
              <p>No restaurants found for this category.</p>
            </div>
          ) : (
            <div className="restaurant-grid">
              {filtered.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

import { useWindowWidth } from '../utils/useWindowWidth';

function RestaurantCard({ restaurant }) {
  const width = useWindowWidth();
  const isMobile = width <= 768;

  if (isMobile) {
    return (
      <Link 
        to={`/restaurant/${restaurant.slug}`} 
        className="restaurant-card mobile-restaurant-card" 
        id={`restaurant-${restaurant.slug}`}
        style={{ display: 'flex', gap: 12, padding: 12, borderRadius: 12, background: 'var(--white)', marginBottom: 12, boxShadow: 'var(--shadow)' }}
      >
        <img
          src={getImage('restaurants', restaurant.image)}
          alt={restaurant.name}
          style={{ width: 100, height: 100, borderRadius: 8, objectFit: 'cover' }}
          onError={(e) => { e.target.src = '/logo.png'; }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h4 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 4px 0' }}>{restaurant.name}</h4>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>
            ★ {restaurant.rating} · {restaurant.deliveryTime}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            {restaurant.cuisine.slice(0, 2).join(', ')}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/restaurant/${restaurant.slug}`} className="restaurant-card" id={`restaurant-${restaurant.slug}`}>
      <img
        className="restaurant-card-img"
        src={getImage('restaurants', restaurant.image)}
        alt={restaurant.name}
        onError={(e) => { e.target.src = '/logo.png'; e.target.style.objectFit = 'contain'; e.target.style.padding = '20px'; }}
      />
      <div className="restaurant-card-body">
        <h3>{restaurant.name}</h3>
        <div className="restaurant-card-meta">
          <span>★ {restaurant.rating}</span>
          <span className="dot" />
          <span>{restaurant.deliveryTime}</span>
          <span className="dot" />
          <span>{restaurant.cuisine.slice(0, 2).join(', ')}</span>
        </div>
        <div className="restaurant-card-cuisine">{restaurant.cuisine.join(', ')}</div>
        <div className="restaurant-card-location">{restaurant.location}</div>
        {restaurant.offerText && (
          <div className="restaurant-card-offer">Offer: {restaurant.offerText}</div>
        )}
      </div>
    </Link>
  );
}

