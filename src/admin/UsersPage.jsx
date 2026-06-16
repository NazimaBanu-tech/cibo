import { useState } from 'react';
import { MOCK_USERS } from '../data/mockData';

export default function UsersPage() {
  const [users, setUsers] = useState(() => {
    const local = JSON.parse(localStorage.getItem('cibo2_users') || '[]');
    const allIds = new Set(local.map((u) => u.email));
    const merged = [...local];
    MOCK_USERS.forEach((u) => { if (!allIds.has(u.email)) merged.push(u); });
    return merged.map((u) => ({ ...u, password: undefined }));
  });
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const filtered = users.filter(
    (u) =>
      (u.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(search.toLowerCase()) ||
      String(u.phone || '').includes(search)
  );

  const handleDelete = () => {
    setUsers(users.filter((u) => u.id !== deleteId));
    setDeleteId(null);
  };

  const formatDate = (d) => {
    try { return d || '—'; } catch { return '—'; }
  };

  return (
    <div>
      <h1 className="admin-page-title">Users</h1>
      <p className="admin-page-sub">View all registered Cibo users and manage their accounts.</p>

      <div className="admin-page-actions">
        <input
          className="form-input"
          style={{ maxWidth: 360 }}
          placeholder="Search by name, email, or phone…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          id="users-search"
        />
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{filtered.length} user{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, idx) => (
              <tr key={u.id || u.email}>
                <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>{idx + 1}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--green-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: 'var(--green-dark)', flexShrink: 0 }}>
                      {(u.name || '?')[0].toUpperCase()}
                    </div>
                    <strong>{u.name}</strong>
                  </div>
                </td>
                <td style={{ fontSize: 13 }}>{u.email}</td>
                <td style={{ fontSize: 13 }}>{u.phone || '—'}</td>
                <td style={{ fontSize: 13 }}>{formatDate(u.joined || u.joinedDate)}</td>
                <td>
                  <button className="table-delete-btn" onClick={() => setDeleteId(u.id)} id={`delete-user-${u.id}`}>Delete</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>No users found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {deleteId && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>👤</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>Delete User?</h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button className="btn-outline" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn-primary" style={{ background: 'var(--red)' }} onClick={handleDelete} id="confirm-delete-user-btn">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
