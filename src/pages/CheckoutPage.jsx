import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { USE_SUPABASE } from '../config';
import { createOrder } from '../services/orderActions';

const isValidUuid = (id) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return typeof id === 'string' && uuidRegex.test(id);
};

const PAYMENT_METHODS = [
  { id: 'cod', label: 'Cash on Delivery', sub: 'Pay when your order arrives' },
  { id: 'upi', label: 'UPI Payment', sub: 'Scan QR code or enter UPI ID' },
  { id: 'card', label: 'Credit / Debit Card', sub: 'Visa, Mastercard, Rupay' },
];

import { useWindowWidth } from '../utils/useWindowWidth';

export default function CheckoutPage() {
  const width = useWindowWidth();
  const isMobile = width <= 768;

  const { cart, subtotal, deliveryFee, gst, total, promoDiscount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: user?.name || '', phone: user?.phone || '',
    line1: '', city: 'Bangalore', pincode: '',
  });
  const [addrErrors, setAddrErrors] = useState({});
  const [payment, setPayment] = useState('cod');
  const [upiId, setUpiId] = useState('');
  const [upiError, setUpiError] = useState('');
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [cardErrors, setCardErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateAddress = () => {
    const e = {};
    if (!address.name.trim()) e.name = 'Name is required';
    if (!address.phone.trim()) {
      e.phone = 'Phone number is required';
    } else if (address.phone.length !== 10) {
      e.phone = 'Phone number must be exactly 10 digits';
    }
    if (!address.line1.trim()) e.line1 = 'Address is required';
    if (!address.pincode.trim()) {
      e.pincode = 'Pincode is required';
    } else if (address.pincode.length !== 6) {
      e.pincode = 'Pincode must be exactly 6 digits';
    }
    return e;
  };

  const validateCard = () => {
    if (payment !== 'card') return {};
    const e = {};
    
    // Card Number
    const rawCard = card.number.replace(/\s/g, '');
    if (!rawCard) {
      e.number = 'Card number is required';
    } else if (rawCard.length !== 16) {
      e.number = 'Card number must be exactly 16 digits';
    }
    
    // Expiry Date
    if (!card.expiry) {
      e.expiry = 'Expiry date is required';
    } else {
      const parts = card.expiry.split('/');
      if (parts.length !== 2 || parts[0].length !== 2 || parts[1].length !== 2) {
        e.expiry = 'Expiry must be in MM/YY format';
      } else {
        const month = parseInt(parts[0], 10);
        const year = parseInt(parts[1], 10);
        if (isNaN(month) || month < 1 || month > 12) {
          e.expiry = 'Invalid month (01-12)';
        } else {
          const now = new Date();
          const currentYear = now.getFullYear() % 100; // e.g. 26 for 2026
          const currentMonth = now.getMonth() + 1; // 1-12
          if (year < currentYear || (year === currentYear && month < currentMonth)) {
            e.expiry = 'Card has expired';
          }
        }
      }
    }
    
    // CVV
    if (!card.cvv) {
      e.cvv = 'CVV is required';
    } else if (card.cvv.length !== 3) {
      e.cvv = 'CVV must be exactly 3 digits';
    }
    
    // Cardholder Name
    if (!card.name.trim()) {
      e.name = 'Cardholder name is required';
    } else if (card.name.trim().length < 2) {
      e.name = 'Enter valid cardholder name';
    }
    
    return e;
  };

  const validateUpi = () => {
    if (payment !== 'upi') {
      setUpiError('');
      return true;
    }
    if (!upiId.trim()) {
      setUpiError('UPI ID is required');
      return false;
    }
    const upiRegex = /^[a-zA-Z0-9.\-_]+@[a-zA-Z]+$/;
    if (!upiRegex.test(upiId.trim())) {
      setUpiError('Enter valid UPI ID (e.g. username@bank)');
      return false;
    }
    setUpiError('');
    return true;
  };

  const handlePlaceOrder = () => {
    const ae = validateAddress();
    const ce = validateCard();
    const isUpiValid = validateUpi();
    setAddrErrors(ae);
    setCardErrors(ce);
    if (Object.keys(ae).length > 0 || Object.keys(ce).length > 0 || !isUpiValid) return;
    setShowConfirm(true);
  };

  const confirmOrder = async () => {
    setShowConfirm(false);
    setLoading(true);
    const paymentMethod = PAYMENT_METHODS.find((p) => p.id === payment)?.label;
    const paymentStatus = payment === 'cod' ? 'Pending' : 'Paid';
    const receiptNo = `RCT-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 90000 + 10000)}`;

    try {
      const userData = {
        user,
        address,
        paymentMethod,
        paymentStatus,
        promoDiscount,
        subtotal,
        gst,
        deliveryFee,
        total,
        receiptNo
      };

      await createOrder(cart, userData);

      setIsSubmitted(true);
      clearCart();

      if (USE_SUPABASE) {
        setLoading(false);
        navigate('/order-success');
      } else {
        setTimeout(() => {
          setLoading(false);
          navigate('/order-success');
        }, 1200);
      }
    } catch (err) {
      console.error("Order creation failed:", err);
      setLoading(false);
      alert("Order failed. Please try again.");
    }
  };

  const formatCardNumber = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

  const handleExpiryChange = (e) => {
    let val = e.target.value;
    if (card.expiry.endsWith('/') && val.length === 2) {
      val = val.slice(0, 1);
    }
    const clean = val.replace(/\D/g, '').slice(0, 4);
    let finalVal = clean;
    if (clean.length > 2) {
      finalVal = `${clean.slice(0, 2)}/${clean.slice(2)}`;
    }
    setCard({ ...card, expiry: finalVal });
    setCardErrors((prev) => ({ ...prev, expiry: '' }));
  };

  if (cart.items.length === 0 && !loading && !isSubmitted) {
    navigate('/cart');
    return null;
  }

  return (

    <div className="checkout-page">
      <h1>Checkout</h1>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Review your order and choose a payment method.</p>

      <div className="checkout-layout">
        <div>
          {/* Delivery Address */}
          <div className="checkout-section">
            <h2>Delivery Address</h2>
            <div className="address-grid">
              <div className="form-group">
                <label htmlFor="co-name">Full Name</label>
                <input id="co-name" className={`form-input${addrErrors.name ? ' error' : ''}`} value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} placeholder="Your name" />
                {addrErrors.name && <span className="form-error">{addrErrors.name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="co-phone">Phone</label>
                <input id="co-phone" className={`form-input${addrErrors.phone ? ' error' : ''}`} value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })} placeholder="10-digit mobile" maxLength={10} />
                {addrErrors.phone && <span className="form-error">{addrErrors.phone}</span>}
              </div>
              <div className="form-group full-width">
                <label htmlFor="co-line1">Address</label>
                <input id="co-line1" className={`form-input${addrErrors.line1 ? ' error' : ''}`} value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} placeholder="House / Flat / Street" />
                {addrErrors.line1 && <span className="form-error">{addrErrors.line1}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="co-city">City</label>
                <input id="co-city" className="form-input" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="co-pin">Pincode</label>
                <input id="co-pin" className={`form-input${addrErrors.pincode ? ' error' : ''}`} value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })} placeholder="6-digit pincode" maxLength={6} />
                {addrErrors.pincode && <span className="form-error">{addrErrors.pincode}</span>}
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="checkout-section">
            <h2>Payment Method</h2>
            <div className="payment-options">
              {PAYMENT_METHODS.map((pm) => (
                <div
                  key={pm.id}
                  className={`payment-option${payment === pm.id ? ' active' : ''}`}
                  onClick={() => setPayment(pm.id)}
                  id={`payment-${pm.id}`}
                >
                  <div className="pay-radio">
                    {payment === pm.id && <div className="pay-radio-inner" />}
                  </div>
                  <div>
                    <div className="pay-label">{pm.label}</div>
                    <div className="pay-sub">{pm.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* UPI details */}
            {payment === 'upi' && (
              <div className="payment-extra">
                <div className="upi-qr">
                  <img src="/payments/upi-qr-static.svg" alt="UPI QR Code" onError={(e) => { e.target.style.display = 'none'; }} />
                  <div className="upi-hint">
                    <p>Scan the QR code using any UPI app, or enter your UPI ID below:</p>
                    <input type="text" placeholder="yourname@upi" value={upiId} onChange={(e) => { setUpiId(e.target.value); setUpiError(''); }} id="upi-id-input" className={upiError ? 'error' : ''} />
                    {upiError && <span className="form-error" style={{ display: 'block', marginTop: 4 }}>{upiError}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* Card details */}
            {payment === 'card' && (
              <div className="payment-extra">
                <div className="card-grid">
                  <div className="form-group full">
                    <label htmlFor="card-number">Card Number</label>
                    <input id="card-number" className={`form-input${cardErrors.number ? ' error' : ''}`} placeholder="1234 5678 9012 3456" value={card.number} onChange={(e) => { setCard({ ...card, number: formatCardNumber(e.target.value) }); setCardErrors((prev) => ({ ...prev, number: '' })); }} maxLength={19} />
                    {cardErrors.number && <span className="form-error">{cardErrors.number}</span>}
                  </div>
                  <div className="form-group full">
                    <label htmlFor="card-name">Cardholder Name</label>
                    <input id="card-name" className={`form-input${cardErrors.name ? ' error' : ''}`} placeholder="Name on card" value={card.name} onChange={(e) => { setCard({ ...card, name: e.target.value.replace(/[^a-zA-Z\s]/g, '') }); setCardErrors((prev) => ({ ...prev, name: '' })); }} />
                    {cardErrors.name && <span className="form-error">{cardErrors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="card-expiry">Expiry</label>
                    <input id="card-expiry" className={`form-input${cardErrors.expiry ? ' error' : ''}`} placeholder="MM/YY" value={card.expiry} onChange={handleExpiryChange} maxLength={5} />
                    {cardErrors.expiry && <span className="form-error">{cardErrors.expiry}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="card-cvv">CVV</label>
                    <input id="card-cvv" className={`form-input${cardErrors.cvv ? ' error' : ''}`} type="password" placeholder="•••" value={card.cvv} onChange={(e) => { setCard({ ...card, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) }); setCardErrors((prev) => ({ ...prev, cvv: '' })); }} maxLength={3} />
                    {cardErrors.cvv && <span className="form-error">{cardErrors.cvv}</span>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="checkout-order-summary">
          <h3>Order Summary</h3>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 14 }}>{cart.restaurantName}</p>
          {cart.items.map((item) => (
            <div key={item.id} className="checkout-item-row">
              <span className="name">{item.name} × {item.qty}</span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}
          <hr className="divider" />
          <div className="checkout-item-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
          <div className="checkout-item-row"><span>Delivery</span><span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span></div>
          <div className="checkout-item-row"><span>GST (5%)</span><span>₹{gst}</span></div>
          {promoDiscount > 0 && <div className="checkout-item-row" style={{ color: 'var(--green-dark)' }}><span>Discount</span><span>−₹{promoDiscount}</span></div>}
          <div className="checkout-item-row" style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)', borderTop: '2px solid var(--border)', paddingTop: 12, marginTop: 4 }}>
            <span>Total</span><span>₹{total}</span>
          </div>

          <button
            className="btn-primary checkout-place-btn"
            onClick={handlePlaceOrder}
            disabled={loading}
            id="place-order-btn"
          >
            {loading ? 'Placing order…' : 'Place Order'}
          </button>
        </div>
      </div>

      {/* Confirm modal */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ textAlign: 'center' }}>
            <div style={{ color: 'var(--green-dark)', marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>Confirm Order?</h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 8 }}>
              <strong>Total: ₹{total}</strong> · {PAYMENT_METHODS.find((p) => p.id === payment)?.label}
            </p>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.5 }}>
              Delivering to: {address.line1}, {address.city}
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button className="btn-outline" onClick={() => setShowConfirm(false)}>Go back</button>
              <button className="btn-primary" onClick={confirmOrder} id="confirm-order-btn">Confirm Order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
