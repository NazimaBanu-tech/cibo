import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { USE_SUPABASE } from '../config';
import { orderService, normalizeOrder } from '../services/orderService';
import { updateOrderStatus as executeUpdateOrderStatus } from '../services/orderActions';
import { supabase } from '../lib/supabaseClient';

const STEPS = [
  { id: 'pending', label: 'Order Placed', desc: 'Your order is confirmed' },
  { id: 'preparing', label: 'Preparing', desc: 'Chef is cooking your food' },
  { id: 'out', label: 'Out for Delivery', desc: 'Rider is on the way' },
  { id: 'delivered', label: 'Delivered', desc: 'Enjoy your meal!' },
];

const STATUS_ORDER = ['pending', 'confirmed', 'preparing', 'cooking', 'packing', 'out', 'delivered'];
const DEMO_STATUS_ORDER = ['pending', 'preparing', 'out', 'delivered'];

const STATUS_TO_STEP = {
  pending: 0,
  confirmed: 0,
  preparing: 1,
  cooking: 1,
  packing: 1,
  out: 2,
  delivered: 3,
  cancelled: -1
};

const STATUS_DESCRIPTIONS = {
  pending: { label: 'Order Placed', desc: 'Your order is confirmed' },
  confirmed: { label: 'Confirmed', desc: 'Restaurant has accepted your order' },
  preparing: { label: 'Preparing', desc: 'Chef is starting to prepare your food' },
  cooking: { label: 'Cooking', desc: 'Your food is sizzling in the kitchen' },
  packing: { label: 'Packing', desc: 'Food is being packed fresh and hot' },
  out: { label: 'Out for Delivery', desc: 'Rider is on the way to your location' },
  delivered: { label: 'Delivered', desc: 'Enjoy your meal!' },
  cancelled: { label: 'Cancelled', desc: 'This order has been cancelled' }
};

export default function TrackOrderPage() {
  const navigate = useNavigate();
  const { id: routeOrderId } = useParams();
  const [order, setOrder] = useState(null);
  const [cancelled, setCancelled] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const [displayedStatus, setDisplayedStatus] = useState('pending');
  const [targetStatus, setTargetStatus] = useState('pending');

  // updateOrderStatus helper removed as TrackOrderPage only listens and does not mutate persistent storage directly

  // Load active order on mount
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        let activeOrder = null;
        if (routeOrderId) {
          activeOrder = await orderService.getOrderById(routeOrderId);
        }
        
        if (!activeOrder) {
          const last = JSON.parse(localStorage.getItem('cibo2_last_order'));
          if (last) {
            activeOrder = await orderService.getOrderById(last.id);
          }
        }

        if (activeOrder) {
          setOrder(activeOrder);
          if (activeOrder.status === 'cancelled') {
            setCancelled(true);
            setDisplayedStatus('cancelled');
            setTargetStatus('cancelled');
          } else {
            const status = activeOrder.status || 'pending';
            setDisplayedStatus(status);
            setTargetStatus(status);
            setCurrentStep(STATUS_TO_STEP[status] ?? 0);
          }
        }
      } catch (err) {
        console.error("Error loading order in tracker:", err);
      }
    };
    fetchOrder();
  }, [routeOrderId]);

  // Poll localStorage for external status changes (only as secondary local backup)
  useEffect(() => {
    if (!order || targetStatus === 'delivered' || targetStatus === 'cancelled') return;
    const pollInterval = setInterval(() => {
      try {
        const orders = JSON.parse(localStorage.getItem('cibo2_orders') || '[]');
        const found = orders.find((o) => o.id === order.id);
        const normalizedFound = normalizeOrder(found);
        const currentStatus = normalizedFound ? normalizedFound.status : order.status;

        const statusOrder = USE_SUPABASE ? STATUS_ORDER : DEMO_STATUS_ORDER;
        const currentIdx = statusOrder.indexOf(currentStatus);
        const targetIdx = statusOrder.indexOf(targetStatus);

        const isCancelled = currentStatus === 'cancelled';
        const isAhead = currentIdx > targetIdx;

        if (isCancelled || isAhead) {
          if (isCancelled) {
            setCancelled(true);
            setTargetStatus('cancelled');
            setDisplayedStatus('cancelled');
          } else {
            setTargetStatus(currentStatus);
          }
        }
      } catch { /* ignore */ }
    }, 1000);
    return () => clearInterval(pollInterval);
  }, [order, targetStatus]);

  // Supabase Real-Time Listener
  useEffect(() => {
    if (!USE_SUPABASE || !order) return;

    const subscription = orderService.subscribeToOrderUpdates(order.id, (updatedOrder) => {
      if (updatedOrder && updatedOrder.status) {
        const newStatus = updatedOrder.status;
        if (newStatus === 'cancelled') {
          setCancelled(true);
          setTargetStatus('cancelled');
          setDisplayedStatus('cancelled');
        } else {
          setTargetStatus(newStatus);
        }
      }
    });

    return () => {
      if (subscription && supabase) {
        supabase.removeChannel(subscription);
      }
    };
  }, [order]);

  // Demo Simulation mode (Auto-progresses every 4 seconds if not connected to database)
  useEffect(() => {
    if (USE_SUPABASE || !order || cancelled || targetStatus === 'cancelled' || targetStatus === 'delivered') return;

    const statusOrder = USE_SUPABASE ? STATUS_ORDER : DEMO_STATUS_ORDER;

    const interval = setInterval(() => {
      const targetIdx = statusOrder.indexOf(targetStatus);
      if (targetIdx !== -1 && targetIdx < statusOrder.length - 1) {
        const nextTarget = statusOrder[targetIdx + 1];
        setTargetStatus(nextTarget);
      } else {
        clearInterval(interval);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [order, targetStatus, cancelled]);

  // Interpolated status transitions (Advancing displayedStatus step-by-step with delays)
  useEffect(() => {
    if (cancelled || targetStatus === 'cancelled') return;

    const statusOrder = USE_SUPABASE ? STATUS_ORDER : DEMO_STATUS_ORDER;
    const currentIndex = statusOrder.indexOf(displayedStatus);
    const targetIndex = statusOrder.indexOf(targetStatus);

    if (currentIndex === -1 || targetIndex === -1 || currentIndex >= targetIndex) {
      return;
    }

    const delay = USE_SUPABASE ? 3000 : 2000;

    const timer = setTimeout(() => {
      const nextStatus = statusOrder[currentIndex + 1];
      setDisplayedStatus(nextStatus);
      setCurrentStep(STATUS_TO_STEP[nextStatus]);

      // Progress status visually in local state only
      if (order) {
        setOrder((prev) => prev ? { ...prev, status: nextStatus } : null);
        if (!USE_SUPABASE) {
          executeUpdateOrderStatus(order.id, nextStatus).catch(err => 
            console.error("Local status sync failed:", err)
          );
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [displayedStatus, targetStatus, order, cancelled]);

  const getStatusMessage = (status) => {
    if (cancelled || status === 'cancelled') {
      return 'Order has been cancelled.';
    }
    if (['pending', 'confirmed'].includes(status)) {
      return 'Restaurant has received your order.';
    }
    if (['preparing', 'cooking', 'packing'].includes(status)) {
      return 'Your food is being prepared.';
    }
    if (status === 'out') {
      return 'Your order is on the way.';
    }
    if (status === 'delivered') {
      return 'Order Delivered Successfully.';
    }
    return 'Restaurant has received your order.';
  };

  const handleCancel = async () => {
    setCancelled(true);
    setShowCancelModal(false);
    if (order) {
      try {
        await executeUpdateOrderStatus(order.id, 'cancelled');
      } catch (err) {
        console.error("Failed to cancel order:", err);
      }
    }
  };

  if (!order) {
    return (
      <div className="track-page">
        <div className="track-card">
          <h1>No active order</h1>
          <p className="sub">You don&apos;t have an active order to track. Place an order first!</p>
          <Link to="/" className="btn-primary">Browse Restaurants</Link>
        </div>
      </div>
    );
  }

  if (cancelled) {
    return (
      <div className="track-page">
        <div className="track-card" style={{ textAlign: 'center' }}>
          <div style={{ color: 'var(--red)', marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <h1>Order Cancelled</h1>
          <p className="sub">Your order from <strong>{order.restaurantName}</strong> has been cancelled. We hope to serve you again soon!</p>
          <Link to="/" className="btn-primary" style={{ display: 'inline-block', margin: '0 auto' }}>Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="track-page">
      <div className="track-card">
        <h1>Track Your Order</h1>
        <p className="sub">
          Your order from <strong>{order.restaurantName}</strong> is being tracked live.<br />
          <span style={{ fontWeight: 'bold', color: 'var(--green-dark)' }}>{getStatusMessage(displayedStatus)}</span>
        </p>

        <div className="track-meta">
          <div className="track-meta-box">
            <div className="label">Order ID</div>
            <div className="value" style={{ fontSize: 13, fontFamily: 'monospace' }}>{order.id.slice(0, 18)}</div>
          </div>
          <div className="track-meta-box">
            <div className="label">Total</div>
            <div className="value">₹{order.total}</div>
          </div>
          <div className="track-meta-box">
            <div className="label">Payment</div>
            <div className="value" style={{ fontSize: 13 }}>{order.paymentMethod}</div>
          </div>
          <div className="track-meta-box">
            <div className="label">Delivery To</div>
            <div className="value" style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.4 }}>{order.address?.split(',')[0]}</div>
          </div>
        </div>

        {/* Stepper */}
        <div className="order-stepper">
          {STEPS.map((step, idx) => {
            const isDone = idx < currentStep;
            const isActive = idx === currentStep;
            return (
              <div key={step.id} className="stepper-step">
                {idx < STEPS.length - 1 && (
                  <div className={`stepper-line${isDone ? ' active' : ''}`} />
                )}
                <div className={`stepper-circle${isDone ? ' done' : isActive ? ' active' : ''}`}>
                  {isDone ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  ) : (
                    idx + 1
                  )}
                </div>
                <div className={`stepper-label${isActive ? ' active' : ''}`}>{step.label}</div>
                <div className="stepper-desc">{step.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Current status message */}
        <div style={{ background: 'var(--green-pale)', border: '1px solid var(--green-pill)', borderRadius: 'var(--radius-md)', padding: '14px 18px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="status-pulse-dot" style={{ width: 10, height: 10, background: 'var(--green-dark)', borderRadius: '50%', flexShrink: 0 }} />
          <span key={displayedStatus} className="status-fade-in" style={{ fontSize: 14, fontWeight: 600, color: 'var(--green-dark)' }}>
            {getStatusMessage(displayedStatus)}
          </span>
        </div>

        <button
          className="track-cancel-btn"
          disabled={cancelled || displayedStatus !== 'pending' && displayedStatus !== 'confirmed'}
          onClick={() => {
            if (!cancelled && (displayedStatus === 'pending' || displayedStatus === 'confirmed')) {
              setShowCancelModal(true);
            }
          }}
          id="cancel-order-btn"
        >
          {(() => {
            if (cancelled || displayedStatus === 'cancelled') return 'Order Cancelled';
            const isCancellable = displayedStatus === 'pending' || displayedStatus === 'confirmed';
            return isCancellable ? 'Cancel Order' : 'Cannot Cancel Order';
          })()}
        </button>

        <div className="track-actions">
          <Link to="/receipt" className="btn-outline" id="view-receipt-from-track-btn">View Receipt</Link>
          <Link to="/" className="btn-primary" id="back-home-from-track-btn">Back to Home</Link>
        </div>
      </div>

      {/* Cancel modal */}
      {showCancelModal && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ textAlign: 'center' }}>
            <div style={{ color: 'var(--red)', marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>Cancel Order?</h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.6 }}>
              Are you sure you want to cancel your order from <strong>{order.restaurantName}</strong>?
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button className="btn-outline" onClick={() => setShowCancelModal(false)}>Keep Order</button>
              <button className="btn-primary" style={{ background: 'var(--red)' }} onClick={handleCancel} id="confirm-cancel-btn">Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
        .status-pulse-dot {
          animation: pulse 1.5s infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(3px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .status-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
          display: inline-block;
        }
        @keyframes circlePulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(46, 125, 50, 0.4); }
          50% { transform: scale(1.08); box-shadow: 0 0 0 6px rgba(46, 125, 50, 0); }
        }
        .stepper-circle.active {
          animation: circlePulse 2s infinite ease-in-out;
        }
        .track-cancel-btn:disabled {
          border-color: var(--border);
          color: var(--text-muted);
          background: #f8f9fa;
          cursor: not-allowed;
        }
        .track-cancel-btn:disabled:hover {
          background: #f8f9fa;
        }
      `}</style>
    </div>
  );
}
