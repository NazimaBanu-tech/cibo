import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { applyPromo } from '../services/orderActions';
import { getImage } from '../data/assetLibrary';

export default function CartPage() {
  const navigate = useNavigate();
  const {
    cart, totalItems, subtotal, deliveryFee, gst, total,
    promoCode, setPromoCode, promoDiscount, setPromoDiscount,
    removeOne, addItem, removeItem, clearCart,
    MAX_TOTAL_ITEMS,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMsg, setPromoMsg] = useState({ type: '', text: '' });
  const [limitWarning, setLimitWarning] = useState('');
  const [showClearModal, setShowClearModal] = useState(false);
  const warningTimerRef = useRef(null);

  const handleAdd = (item) => {
    const result = addItem(item, { id: cart.restaurantId, name: cart.restaurantName, slug: cart.restaurantSlug });
    if (!result) {
      setLimitWarning('');
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

  const handlePromo = () => {
    try {
      const discount = applyPromo(subtotal, promoInput.trim());
      setPromoCode(promoInput.trim().toUpperCase());
      setPromoDiscount(discount);
      setPromoMsg({ type: 'success', text: 'Promo applied successfully!' });
    } catch (err) {
      setPromoMsg({ type: 'error', text: err.message || 'Invalid promo code' });
    }
  };

  const handleRemovePromo = () => {
    setPromoCode('');
    setPromoDiscount(0);
    setPromoInput('');
    setPromoMsg({ type: '', text: '' });
  };

  if (cart.items.length === 0) {
    return (
      <div className="cart-page">
        <h1>Your Cart</h1>
        <div className="empty-state" style={{ marginTop: 60 }}>
          <div className="icon" style={{ color: 'var(--text-muted)', marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </div>
          <h3>Your cart is empty</h3>
          <p>Add items from a restaurant to get started.</p>
          <Link to="/" className="btn-primary">Browse Restaurants</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <p className="page-subtitle">Almost there. Review your items and continue to checkout for a smooth Cibo order experience.</p>

      <div className="cart-layout">
        {/* Left: Cart Items */}
        <div>
          <div className="cart-items-card">
            <div className="cart-restaurant-header">
              <div>
                <h2>{cart.restaurantName}</h2>
                <div className="sub">{totalItems} item{totalItems !== 1 ? 's' : ''} · Estimated delivery in 25-30 mins</div>
              </div>
              <div className="cart-restaurant-actions">
                <span className="cart-offer-badge">Free delivery above ₹199</span>
                <button className="clear-cart-btn" onClick={() => setShowClearModal(true)} id="clear-cart-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
                  </svg>
                  Clear cart
                </button>
              </div>
            </div>

            {cart.items.map((item) => (
              <div key={item.id} className="cart-item-row">
                <img
                  className="cart-item-img"
                  src={getImage('menu', item.image)}
                  alt={item.name}
                  onError={(e) => { e.target.src = '/logo.png'; e.target.style.objectFit = 'contain'; e.target.style.background = 'var(--cream)'; }}
                />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <div className="sub">Freshly prepared and added to your Cibo cart.</div>
                  <div className="cart-item-controls">
                    <div className="cart-qty-ctrl">
                      <button onClick={() => removeOne(item.id)} aria-label="Decrease">−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => handleAdd(item)} aria-label="Increase">+</button>
                    </div>
                    <button className="cart-item-remove" onClick={() => removeItem(item.id)} id={`remove-${item.id}`}>Remove</button>
                  </div>
                </div>
                <div className="cart-item-total">
                  <div className="amount">₹{item.price * item.qty}</div>
                  <div className="label">Item total</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 12 }}>
            <Link to={`/restaurant/${cart.restaurantSlug}`} style={{ fontSize: 14, color: 'var(--green-dark)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              ← Add more items
            </Link>
          </div>
        </div>

        {/* Right: Bill Summary */}
        <div className="bill-summary">
          <h2>Bill Summary</h2>

          <div className="promo-section">
            <div className="promo-label">Promo Code</div>
            {promoCode ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--green-pale)', border: '1px solid var(--green-pill)', borderRadius: 8, padding: '10px 14px' }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--green-dark)' }}>✓ {promoCode} applied</span>
                  <button style={{ fontSize: 12, color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }} onClick={handleRemovePromo}>Remove</button>
                </div>
              </div>
            ) : (
              <>
                <div className="promo-input-row">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === 'Enter' && handlePromo()}
                    id="promo-input"
                  />
                  <button className="promo-apply-btn" onClick={handlePromo} id="promo-apply-btn">Apply</button>
                </div>
                {promoMsg.text && (
                  <div className={promoMsg.type === 'success' ? 'promo-success' : 'promo-error'}>
                    {promoMsg.text}
                  </div>
                )}
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
                  Try: FIRST100 · SAVE50 · SAVE5 · SAVE10
                </div>
              </>
            )}
          </div>

          <hr className="divider" />

          <div className="bill-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="bill-row">
            <span>Delivery</span>
            <span style={{ color: deliveryFee === 0 ? 'var(--green-dark)' : undefined, fontWeight: deliveryFee === 0 ? 700 : undefined }}>
              {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
            </span>
          </div>
          <div className="bill-row">
            <span>GST (5%)</span>
            <span>₹{gst}</span>
          </div>
          {promoDiscount > 0 && (
            <div className="bill-row" style={{ color: 'var(--green-dark)' }}>
              <span>Discount</span>
              <span>−₹{promoDiscount}</span>
            </div>
          )}
          <div className="bill-row total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          {deliveryFee === 0 && (
            <div className="bill-info-box">Free delivery has been applied to this order.</div>
          )}

          <button
            className="btn-primary checkout-btn"
            onClick={() => navigate('/checkout')}
            id="proceed-checkout-btn"
          >
            Proceed to Checkout
          </button>
          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <Link to="/" style={{ fontSize: 13, color: 'var(--text-muted)' }}>← Continue exploring restaurants</Link>
          </div>
        </div>
      </div>
      {limitWarning && (
        <div className="cart-limit-warning">
          <span>{limitWarning}</span>
          <button className="cart-limit-close" onClick={() => setLimitWarning('')} aria-label="Close warning">&times;</button>
        </div>
      )}

      {showClearModal && (
        <div className="modal-overlay" id="clear-cart-modal">
          <div className="modal-box" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '10px' }}>
              Are you sure you want to clear your cart?
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '28px' }}>
              All items in your cart will be removed.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
              <button className="btn-outline" onClick={() => setShowClearModal(false)} id="cancel-clear-cart-btn">
                Cancel
              </button>
              <button className="btn-primary" onClick={() => { clearCart(); setShowClearModal(false); }} id="confirm-clear-cart-btn">
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
