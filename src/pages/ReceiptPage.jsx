import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getImage } from '../data/assetLibrary';
import { normalizeOrder } from '../services/orderService';

export default function ReceiptPage() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const receiptRef = useRef(null);

  useEffect(() => {
    try {
      const o = JSON.parse(localStorage.getItem('cibo2_last_order'));
      if (o) setOrder(normalizeOrder(o));
    } catch { /* ignore */ }
  }, []);

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch { return iso; }
  };

  const downloadPDF = () => {
    if (!order) return;
    const doc = new jsPDF();

    // Header
    doc.setFontSize(22);
    doc.setFont(undefined, 'bold');
    doc.text('Cibo', 14, 20);
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text('Digital Food Receipt', 14, 28);
    doc.text(`Receipt No: ${order.receiptNo}`, 14, 35);
    doc.text(`Date: ${formatDate(order.date)}`, 14, 42);

    // Order info
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('Order Details', 14, 56);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    doc.text(`Order ID: ${order.id}`, 14, 64);
    doc.text(`Restaurant: ${order.restaurantName}`, 14, 71);
    doc.text(`Customer: ${order.customerName}`, 14, 78);
    doc.text(`Phone: ${order.phone}`, 14, 85);
    doc.text(`Address: ${order.address}`, 14, 92);

    // Items table
    autoTable(doc, {
      startY: 104,
      head: [['Item', 'Qty', 'Price', 'Total']],
      body: order.items.map((i) => [i.name, i.qty, `Rs${i.price}`, `Rs${i.price * i.qty}`]),
      headStyles: { fillColor: [74, 103, 65] },
      styles: { fontSize: 10 },
    });

    const finalY = doc.lastAutoTable.finalY + 8;
    doc.setFontSize(10);
    doc.text(`Subtotal: Rs${order.subtotal}`, 14, finalY);
    doc.text(`Delivery: ${order.deliveryCharge === 0 ? 'FREE' : `Rs${order.deliveryCharge}`}`, 14, finalY + 7);
    doc.text(`GST (5%): Rs${order.gst}`, 14, finalY + 14);
    if (order.discount > 0) doc.text(`Discount: -Rs${order.discount}`, 14, finalY + 21);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(12);
    doc.text(`TOTAL: Rs${order.total}`, 14, finalY + 30);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(9);
    doc.text(`Payment: ${order.paymentMethod} · ${order.paymentStatus}`, 14, finalY + 40);
    doc.text('Thank you for ordering from Cibo!', 14, finalY + 50);

    doc.save(`Cibo-Receipt-${order.id.slice(0, 12)}.pdf`);
  };

  if (!order) {
    return (
      <div className="receipt-page">
        <div className="receipt-card">
          <h2>No receipt available</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '16px 0' }}>Place an order first to see the receipt.</p>
          <button className="btn-primary" onClick={() => navigate('/')}>Browse Restaurants</button>
        </div>
      </div>
    );
  }

  return (
    <div className="receipt-page" ref={receiptRef}>
      <div className="receipt-card">
        {/* Header */}
        <div className="receipt-header">
          <div className="receipt-logo">
            <img src={getImage(null, '/logo.png')} alt="Cibo" />
            <div>
              <h2>Cibo</h2>
              <p>Digital Food Receipt</p>
            </div>
          </div>
          <span className="receipt-num">{order.receiptNo}</span>
        </div>

        <div className="receipt-order-id">Order #{order.id}</div>
        <div className="receipt-date">{formatDate(order.date)}</div>

        {/* Order Info */}
        <div className="receipt-section">
          <div className="receipt-section-header">
            <div className="receipt-section-title">
              <div className="icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
              </div>
              <div>
                <h3>Order Information</h3>
                <p>Details of your Cibo order</p>
              </div>
            </div>
            <span className="receipt-tag">{order.status === 'delivered' ? 'DELIVERED' : order.status === 'cancelled' ? 'CANCELLED' : 'ACTIVE'}</span>
          </div>

          {[
            { label: 'Restaurant', value: order.restaurantName },
            { label: 'Customer', value: order.customerName },
            { label: 'Phone', value: order.phone },
            { label: 'Address', value: order.address },
          ].map(({ label, value }) => (
            <div key={label} className="receipt-row">
              <span className="lbl">
                {label}
              </span>
              <span className="val">{value}</span>
            </div>
          ))}
        </div>

        {/* Items */}
        <div className="receipt-section">
          <div className="receipt-section-header">
            <div className="receipt-section-title">
              <div className="icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
              </div>
              <div>
                <h3>Items Ordered</h3>
                <p>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
          </div>
          <div className="receipt-items-list">
            {order.items.map((item, idx) => (
              <div key={idx} className="receipt-item-row">
                <span className="item-name">{item.name}</span>
                <span className="item-qty">×{item.qty}</span>
                <span className="item-price">₹{item.price * item.qty}</span>
              </div>
            ))}
            <div className="receipt-total-row">
              <span>Total</span>
              <span>₹{order.total}</span>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="receipt-section">
          <div className="receipt-section-header">
            <div className="receipt-section-title">
              <div className="icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
              </div>
              <div>
                <h3>Payment Details</h3>
                <p>Transaction breakdown</p>
              </div>
            </div>
          </div>
          {[
            { label: 'Subtotal', value: `₹${order.subtotal}` },
            { label: 'Delivery', value: order.deliveryCharge === 0 ? 'FREE' : `₹${order.deliveryCharge}` },
            { label: 'GST (5%)', value: `₹${order.gst}` },
            order.discount > 0 ? { label: 'Discount', value: `−₹${order.discount}` } : null,
            { label: 'Payment Method', value: order.paymentMethod },
            { label: 'Payment Status', value: order.paymentStatus },
          ].filter(Boolean).map(({ label, value }) => (
            <div key={label} className="receipt-row">
              <span className="lbl">{label}</span>
              <span className="val" style={{ color: label === 'Discount' ? 'var(--green-dark)' : undefined, fontWeight: label.includes('Total') || label === 'Payment Status' ? 700 : undefined }}>{value}</span>
            </div>
          ))}
        </div>

        <div className="receipt-actions">
          <button className="btn-primary" onClick={downloadPDF} id="download-receipt-btn">Download PDF</button>
          <button className="btn-outline" onClick={() => navigate('/track-order')} id="track-from-receipt-btn">Track Order</button>
          <button className="btn-ghost" style={{ width: '100%', borderRadius: 'var(--radius-pill)', padding: '12px 20px', marginTop: 4 }} onClick={() => navigate('/')} id="home-from-receipt-btn">
            Back to Home
          </button>
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 20 }}>
          Thank you for ordering from Cibo
        </p>
      </div>
    </div>
  );
}
