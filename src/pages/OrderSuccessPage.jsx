import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getImage } from '../data/assetLibrary';
import { normalizeOrder } from '../services/orderService';

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

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
      <div className="order-success-page">
        <div className="order-success-card">
          <h1>Order placed!</h1>
          <p className="sub">Your order has been successfully placed.</p>
          <div className="success-actions">
            <button className="btn-primary" onClick={() => navigate('/')} id="back-home-btn">Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-success-page">
      <div className="order-success-card">
        <div className="success-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1>Order Placed Successfully!</h1>
        <p className="sub">
          Your order from <strong>{order.restaurantName}</strong> has been confirmed. Your food is being prepared and will be delivered shortly.
        </p>

        <div className="success-meta">
          <div className="success-meta-box">
            <div className="label">Order ID</div>
            <div className="value" style={{ fontSize: 12, fontFamily: 'monospace' }}>{order.id.slice(0, 16)}…</div>
          </div>
          <div className="success-meta-box">
            <div className="label">Total</div>
            <div className="value">₹{order.total}</div>
          </div>
          <div className="success-meta-box">
            <div className="label">Payment</div>
            <div className="value" style={{ fontSize: 12 }}>{order.paymentMethod}</div>
          </div>
        </div>

        <div className="success-info-banner">
          <strong>{order.address}</strong>
          <br />
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Estimated delivery: 25–35 minutes · {formatDate(order.date)}</span>
        </div>

        <div className="success-items">
          <h3>Items ordered</h3>
          {order.items.map((item, idx) => (
            <div key={idx} className="success-item-row">
              <img src={getImage('menu', item.image)} alt={item.name} onError={(e) => { e.target.src = '/logo.png'; }} />
              <span className="name">{item.name}</span>
              <span className="qty">×{item.qty}</span>
              <span className="price">₹{item.price * item.qty}</span>
            </div>
          ))}
        </div>

        <div className="success-actions">
          <button className="btn-primary" onClick={downloadPDF} id="download-pdf-btn">Download PDF</button>
          <button className="btn-outline" onClick={() => navigate(`/track-order/${order.id}`)} id="track-order-btn">Track Order</button>
          <button className="btn-outline" onClick={() => navigate('/receipt')} id="view-receipt-btn">View Receipt</button>
          <button className="btn-ghost" style={{ width: '100%', borderRadius: 'var(--radius-pill)', padding: '12px 20px', marginTop: 4 }} onClick={() => navigate('/')} id="back-home-btn">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
