export default function LogoutModal({ onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" id="logout-modal">
      <div className="modal-box" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '10px' }}>
          Confirm Logout
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '28px' }}>
          Are you sure you want to logout?
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
          <button className="btn-outline" onClick={onCancel} id="cancel-logout-btn">
            Cancel
          </button>
          <button className="btn-primary" onClick={onConfirm} id="confirm-logout-btn">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
