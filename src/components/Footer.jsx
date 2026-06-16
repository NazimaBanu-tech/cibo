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
      <div className="footer-bottom">
        <span>© 2026 Cibo. All rights reserved.</span>
        <span>
          <a href="/admin/login">Admin Panel</a>
        </span>
      </div>
    </footer>
  );
}
