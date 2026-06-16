import { useState } from 'react';
import { RESTAURANTS, saveRestaurantsToStorage } from '../data/restaurants';
import { IMAGE_LIBRARY, getImage } from '../data/assetLibrary';

const CUISINES = ['Burgers', 'Fast Food', 'Pizza', 'Italian', 'Biryani', 'South Indian', 'North Indian', 'Chinese', 'Korean', 'Desserts', 'Salad', 'Continental', 'Mughlai', 'American'];

const EMPTY_FORM = {
  id: null, name: '', slug: '', category: 'Fast Food', cuisine: '',
  location: '', rating: 4.0, deliveryTime: '30-35 mins',
  image: '', heroImage: '', offerText: '',
};

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState(RESTAURANTS);
  const [modal, setModal] = useState(null); // null | 'add' | 'edit'
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = restaurants.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.location.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => { setForm(EMPTY_FORM); setModal('add'); };
  const openEdit = (r) => { setForm({ ...r, cuisine: Array.isArray(r.cuisine) ? r.cuisine.join(', ') : r.cuisine }); setModal('edit'); };
  const closeModal = () => { setModal(null); setForm(EMPTY_FORM); };

  const handleSave = () => {
    const cuisineArr = form.cuisine.split(',').map((c) => c.trim()).filter(Boolean);
    let updated;
    if (modal === 'add') {
      const newR = { ...form, id: Date.now(), slug: form.name.toLowerCase().replace(/\s+/g, '-'), cuisine: cuisineArr };
      updated = [newR, ...restaurants];
    } else {
      updated = restaurants.map((r) => r.id === form.id ? { ...form, cuisine: cuisineArr } : r);
    }
    setRestaurants(updated);
    saveRestaurantsToStorage(updated);
    closeModal();
  };

  const handleDelete = () => {
    const updated = restaurants.filter((r) => r.id !== deleteId);
    setRestaurants(updated);
    saveRestaurantsToStorage(updated);
    setDeleteId(null);
  };

  return (
    <div>
      <h1 className="admin-page-title">Restaurants</h1>
      <p className="admin-page-sub">Manage all restaurants on the Cibo platform. Add, edit, or remove restaurant listings.</p>

      <div className="admin-page-actions">
        <input
          type="text"
          className="form-input"
          style={{ maxWidth: 320 }}
          placeholder="Search restaurants…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          id="restaurant-search"
        />
        <button className="btn-primary" onClick={openAdd} id="add-restaurant-btn">+ Add Restaurant</button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Restaurant</th>
              <th>Category</th>
              <th>Cuisine</th>
              <th>Location</th>
              <th>Rating</th>
              <th>Delivery</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img src={getImage('restaurants', r.image)} alt={r.name} style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
                    <strong>{r.name}</strong>
                  </div>
                </td>
                <td>{r.category}</td>
                <td style={{ maxWidth: 160, fontSize: 13 }}>{Array.isArray(r.cuisine) ? r.cuisine.join(', ') : r.cuisine}</td>
                <td>{r.location}</td>
                <td>⭐ {r.rating}</td>
                <td>{r.deliveryTime}</td>
                <td>
                  <div className="table-actions">
                    <button className="table-edit-btn" onClick={() => openEdit(r)} id={`edit-restaurant-${r.id}`}>Edit</button>
                    <button className="table-delete-btn" onClick={() => setDeleteId(r.id)} id={`delete-restaurant-${r.id}`}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>No restaurants found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {modal && (
        <div className="modal-overlay">
          <div className="admin-modal-box">
            <h2>{modal === 'add' ? 'Add New Restaurant' : 'Edit Restaurant'}</h2>
            <div className="admin-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Restaurant name" />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select className="admin-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    {['Fast Food', 'Pizza', 'Biryani', 'Chinese', 'North Indian', 'South Indian', 'Korean', 'Desserts', 'Salad'].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group full">
                <label>Cuisine (comma-separated)</label>
                <input className="form-input" value={form.cuisine} onChange={(e) => setForm({ ...form, cuisine: e.target.value })} placeholder="Burgers, Fast Food" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input className="form-input" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="JP Nagar" />
                </div>
                <div className="form-group">
                  <label>Delivery Time</label>
                  <input className="form-input" value={form.deliveryTime} onChange={(e) => setForm({ ...form, deliveryTime: e.target.value })} placeholder="30-35 mins" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Rating</label>
                  <input type="number" className="form-input" value={form.rating} min={1} max={5} step={0.1} onChange={(e) => setForm({ ...form, rating: parseFloat(e.target.value) })} />
                </div>
                <div className="form-group">
                  <label>Offer Text</label>
                  <input className="form-input" value={form.offerText} onChange={(e) => setForm({ ...form, offerText: e.target.value })} placeholder="Optional offer" />
                </div>
              </div>
              <div className="form-group full">
                <label>Card Image Key (Asset Library)</label>
                <select className="admin-select" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}>
                  <option value="">Select Logo Image Key</option>
                  {Object.keys(IMAGE_LIBRARY.restaurants).map((key) => (
                    <option key={key} value={key}>{key}</option>
                  ))}
                </select>
                {form.image && (
                  <div className="image-preview-wrap" style={{ marginTop: 8 }}>
                    <img src={getImage('restaurants', form.image)} alt="preview" onError={(e) => { e.target.src = '/logo.png'; }} />
                  </div>
                )}
              </div>
              <div className="form-group full">
                <label>Hero Image Key (Asset Library)</label>
                <select className="admin-select" value={form.heroImage} onChange={(e) => setForm({ ...form, heroImage: e.target.value })}>
                  <option value="">Select Hero Image Key</option>
                  {Object.keys(IMAGE_LIBRARY.heroes).map((key) => (
                    <option key={key} value={key}>{key}</option>
                  ))}
                </select>
                {form.heroImage && (
                  <div className="image-preview-wrap" style={{ marginTop: 8 }}>
                    <img src={getImage('heroes', form.heroImage)} alt="preview" onError={(e) => { e.target.src = '/logo.png'; }} />
                  </div>
                )}
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="btn-ghost" onClick={closeModal}>Cancel</button>
              <button className="btn-primary" onClick={handleSave} id="save-restaurant-btn">{modal === 'add' ? 'Add Restaurant' : 'Save Changes'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🗑️</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>Delete Restaurant?</h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button className="btn-outline" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn-primary" style={{ background: 'var(--red)' }} onClick={handleDelete} id="confirm-delete-restaurant-btn">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
