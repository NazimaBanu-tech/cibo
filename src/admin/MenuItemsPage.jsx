import { useState } from 'react';
import { RESTAURANTS } from '../data/restaurants';
import { MENU_ITEMS, saveMenuItemsToStorage } from '../data/menuItems';
import { IMAGE_LIBRARY, getImage } from '../data/assetLibrary';

const flatMenu = Object.values(MENU_ITEMS).flat();

const rebuildMenuItemsDict = (flatItems) => {
  const dict = {};
  flatItems.forEach((item) => {
    const slug = item.restaurantSlug;
    if (!dict[slug]) {
      dict[slug] = [];
    }
    dict[slug].push(item);
  });
  return dict;
};

const EMPTY_FORM = {
  id: null, restaurantSlug: '', name: '', description: '', price: '',
  category: 'veg', image: '', available: true,
};

export default function MenuItemsPage() {
  const [items, setItems] = useState(flatMenu);
  const [filterSlug, setFilterSlug] = useState('all');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteId, setDeleteId] = useState(null);

  const filtered = items.filter((i) => {
    const matchSlug = filterSlug === 'all' || i.restaurantSlug === filterSlug;
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase());
    return matchSlug && matchSearch;
  });

  const openAdd = () => { setForm(EMPTY_FORM); setModal('add'); };
  const openEdit = (item) => { setForm({ ...item }); setModal('edit'); };
  const closeModal = () => { setModal(null); setForm(EMPTY_FORM); };

  const handleSave = () => {
    if (form.category !== 'veg' && form.category !== 'nonveg') {
      alert("Please select a valid category (Veg or Non-Veg).");
      return;
    }
    let updated;
    if (modal === 'add') {
      const newItem = { ...form, id: `adm-${Date.now()}`, price: parseFloat(form.price) || 0 };
      updated = [newItem, ...items];
    } else {
      updated = items.map((i) => i.id === form.id ? { ...form, price: parseFloat(form.price) || 0 } : i);
    }
    setItems(updated);
    saveMenuItemsToStorage(rebuildMenuItemsDict(updated));
    closeModal();
  };

  const handleDelete = () => {
    const updated = items.filter((i) => i.id !== deleteId);
    setItems(updated);
    saveMenuItemsToStorage(rebuildMenuItemsDict(updated));
    setDeleteId(null);
  };

  const restaurantName = (slug) => RESTAURANTS.find((r) => r.slug === slug)?.name || slug;

  return (
    <div>
      <h1 className="admin-page-title">Menu Items</h1>
      <p className="admin-page-sub">Manage all menu items across restaurants. Add, update, or remove items as needed.</p>

      <div className="admin-page-actions" style={{ flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 12, flex: 1, flexWrap: 'wrap' }}>
          <select
            className="admin-select"
            style={{ maxWidth: 220 }}
            value={filterSlug}
            onChange={(e) => setFilterSlug(e.target.value)}
            id="menu-restaurant-filter"
          >
            <option value="all">All Restaurants</option>
            {RESTAURANTS.map((r) => <option key={r.slug} value={r.slug}>{r.name}</option>)}
          </select>
          <input
            className="form-input"
            style={{ maxWidth: 260 }}
            placeholder="Search menu items…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="btn-primary" onClick={openAdd} id="add-menu-item-btn">+ Add Item</button>
      </div>

      <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>{filtered.length} item{filtered.length !== 1 ? 's' : ''}</div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Restaurant</th>
              <th>Category</th>
              <th>Price</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img src={getImage('menu', item.image)} alt={item.name} style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
                    <div>
                      <div style={{ fontWeight: 600 }}>{item.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', maxWidth: 200 }}>{item.description?.slice(0, 50)}{item.description?.length > 50 ? '…' : ''}</div>
                    </div>
                  </div>
                </td>
                <td style={{ fontSize: 13 }}>{restaurantName(item.restaurantSlug)}</td>
                <td>
                  <span className={`veg-badge ${item.category}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                    <span className={`veg-dot ${item.category}`} style={{ width: 8, height: 8, borderRadius: '50%', background: item.category === 'veg' ? 'var(--green-dark)' : 'var(--red)' }} />
                    {item.category === 'veg' ? 'Veg' : 'Non-Veg'}
                  </span>
                </td>
                <td>₹{item.price}</td>
                <td>
                  <span style={{ color: item.available ? 'var(--green-dark)' : 'var(--red)', fontWeight: 600, fontSize: 13 }}>
                    {item.available ? '✓ Yes' : '✗ No'}
                  </span>
                </td>
                <td>
                  <div className="table-actions">
                    <button className="table-edit-btn" onClick={() => openEdit(item)} id={`edit-item-${item.id}`}>Edit</button>
                    <button className="table-delete-btn" onClick={() => setDeleteId(item.id)} id={`delete-item-${item.id}`}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>No menu items found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal && (
        <div className="modal-overlay">
          <div className="admin-modal-box">
            <h2>{modal === 'add' ? 'Add Menu Item' : 'Edit Menu Item'}</h2>
            <div className="admin-form">
              <div className="form-group full">
                <label>Restaurant</label>
                <select className="admin-select" value={form.restaurantSlug} onChange={(e) => setForm({ ...form, restaurantSlug: e.target.value })}>
                  <option value="">Select restaurant</option>
                  {RESTAURANTS.map((r) => <option key={r.slug} value={r.slug}>{r.name}</option>)}
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Item Name</label>
                  <input className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" />
                </div>
                <div className="form-group">
                  <label>Price (₹)</label>
                  <input type="number" className="form-input" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0" />
                </div>
              </div>
              <div className="form-group full">
                <label>Description</label>
                <input className="form-input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Short description" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select className="admin-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    <option value="veg">Veg</option>
                    <option value="nonveg">Non-Veg</option>
                  </select>
                </div>
                <div className="form-group">
                  <label style={{ marginBottom: 20 }}>Available</label>
                  <label className="admin-toggle">
                    <input type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} />
                    {form.available ? 'Available' : 'Unavailable'}
                  </label>
                </div>
              </div>
              <div className="form-group full">
                <label>Image Key (Asset Library)</label>
                <select className="admin-select" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}>
                  <option value="">Select Menu Image Key</option>
                  {Object.keys(IMAGE_LIBRARY.menu).map((key) => (
                    <option key={key} value={key}>{key}</option>
                  ))}
                </select>
                {form.image && (
                  <div className="image-preview-wrap" style={{ marginTop: 8 }}>
                    <img src={getImage('menu', form.image)} alt="preview" onError={(e) => { e.target.src = '/logo.png'; }} />
                  </div>
                )}
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="btn-ghost" onClick={closeModal}>Cancel</button>
              <button className="btn-primary" onClick={handleSave} id="save-menu-item-btn">{modal === 'add' ? 'Add Item' : 'Save Changes'}</button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🗑️</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>Delete Menu Item?</h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button className="btn-outline" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn-primary" style={{ background: 'var(--red)' }} onClick={handleDelete} id="confirm-delete-menu-btn">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
