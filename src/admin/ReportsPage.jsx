import { useState, useEffect, useMemo } from 'react';
import { RESTAURANTS } from '../data/restaurants';
import { orderService } from '../services/orderService';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function ReportsPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRestaurant, setFilterRestaurant] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await orderService.getAllOrders();
        setOrders(data || []);
      } catch (err) {
        console.error("Error fetching reports orders:", err);
        setOrders([]);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchR = filterRestaurant === 'all' || o.restaurantName === filterRestaurant || o.restaurantSlug === filterRestaurant;
      const matchS = filterStatus === 'all' || o.status === filterStatus;
      let matchDate = true;
      if (dateFrom) matchDate = matchDate && new Date(o.date) >= new Date(dateFrom);
      if (dateTo) matchDate = matchDate && new Date(o.date) <= new Date(dateTo + 'T23:59:59');
      return matchR && matchS && matchDate;
    });
  }, [orders, filterRestaurant, filterStatus, dateFrom, dateTo]);

  const totalRevenue = useMemo(() => {
    return filtered.reduce((s, o) => s + (o.total || 0), 0);
  }, [filtered]);

  const avgOrderValue = useMemo(() => {
    return filtered.length > 0 ? (totalRevenue / filtered.length).toFixed(2) : '0.00';
  }, [filtered, totalRevenue]);

  const downloadExcel = () => {
    const rows = filtered.map((o) => ({
      'Order ID': o.id,
      Customer: o.user || o.customerName || '—',
      Restaurant: o.restaurantName,
      Items: o.items ? o.items.map ? o.items.map((i) => `${i.name} x${i.qty}`).join(', ') : o.items : '—',
      Total: o.total,
      Payment: o.payment || o.paymentMethod || '—',
      Status: o.status,
      Date: o.date ? new Date(o.date).toLocaleDateString('en-IN') : '—',
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Orders');
    XLSX.writeFile(wb, `Cibo-Report-${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text('Cibo — Orders Report', 14, 20);
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Generated: ${new Date().toLocaleString('en-IN')}`, 14, 28);
    doc.text(`Total Orders: ${filtered.length} | Revenue: Rs${totalRevenue} | Avg: Rs${avgOrderValue}`, 14, 35);

    autoTable(doc, {
      startY: 44,
      head: [['Order ID', 'Customer', 'Restaurant', 'Total', 'Status', 'Date']],
      body: filtered.map((o) => [
        o.id.slice(0, 16),
        o.user || o.customerName || '—',
        o.restaurantName,
        `Rs${o.total}`,
        o.status,
        o.date ? new Date(o.date).toLocaleDateString('en-IN') : '—',
      ]),
      headStyles: { fillColor: [74, 103, 65] },
      styles: { fontSize: 9 },
    });

    doc.save(`Cibo-Report-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', color: 'var(--text-secondary)' }}>
        <p>Loading report metrics...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="admin-page-title">Reports</h1>
      <p className="admin-page-sub">Generate and export sales reports for any period or restaurant.</p>

      {/* Summary stats */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: 28 }}>
        <div className="stat-card">
          <div className="stat-label">Total Orders (filtered)</div>
          <div className="stat-value">{filtered.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Revenue</div>
          <div className="stat-value">₹{totalRevenue.toLocaleString('en-IN')}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg Order Value</div>
          <div className="stat-value">₹{avgOrderValue}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="report-card">
        <div className="report-filter-row">
          <select
            value={filterRestaurant}
            onChange={(e) => setFilterRestaurant(e.target.value)}
            id="report-restaurant-filter"
          >
            <option value="all">All Restaurants</option>
            {RESTAURANTS.map((r) => <option key={r.slug} value={r.name}>{r.name}</option>)}
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} id="report-status-filter">
            <option value="all">All Statuses</option>
            {['pending', 'preparing', 'out', 'delivered', 'cancelled'].map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} placeholder="From" id="report-date-from" />
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} placeholder="To" id="report-date-to" />
          <button className="btn-ghost" onClick={() => { setFilterRestaurant('all'); setFilterStatus('all'); setDateFrom(''); setDateTo(''); }}>
            Clear Filters
          </button>
        </div>

        <div className="report-export-btns" style={{ marginBottom: 20 }}>
          <button className="btn-primary" onClick={downloadExcel} id="export-excel-btn">Export to Excel</button>
          <button className="btn-outline" onClick={downloadPDF} id="export-pdf-btn">Export to PDF</button>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Restaurant</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id}>
                  <td className="order-id">{o.id.slice(0, 16)}</td>
                  <td>{o.user || o.customerName || '—'}</td>
                  <td style={{ fontSize: 13 }}>{o.restaurantName}</td>
                  <td>₹{o.total}</td>
                  <td style={{ fontSize: 12 }}>{o.payment || o.paymentMethod || '—'}</td>
                  <td>
                    <span className={`past-order-status status-${o.status}`}>
                      {o.status?.charAt(0).toUpperCase() + o.status?.slice(1)}
                    </span>
                  </td>
                  <td style={{ fontSize: 12 }}>
                    {o.date ? new Date(o.date).toLocaleDateString('en-IN') : '—'}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
                    No orders found matching filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
