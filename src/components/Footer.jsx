import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <div className="footer-logo">
            <img src="/logo.png" alt="Cibo" />
            <span>Cibo</span>
          </div>
          <p className="footer-tagline">
            Order from trusted restaurants near you. Browse menus, place your order,
            and track every step in one clean Cibo flow.
          </p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
            <a href="#">Blog</a>
          </div>
          <div className="footer-col">
            <h4>For You</h4>
            <Link to="/account">My Account</Link>
            <Link to="/cart">Cart</Link>
            <a href="#">Help &amp; Support</a>
            <a href="#">Safety</a>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom" style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ order: 2 }}>
          <span>© 2026 Cibo. All rights reserved.</span>
          <span style={{ marginLeft: '12px' }}>
            <a href="/admin/login">Admin Panel</a>
          </span>
        </div>
        <div style={{ order: 1, fontSize: '14px', fontWeight: '600', color: 'var(--green-dark)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          Made with <svg width="14" height="14" viewBox="0 0 24 24" fill="#4a6741" style={{ display: 'inline-block', verticalAlign: 'middle' }}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> by Nazima
        </div>
      </div>
    </footer>
  );
}
