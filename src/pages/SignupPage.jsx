import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) errs.phone = 'Enter a valid 10-digit number';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (!form.confirmPassword) errs.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      await signUp({ name: form.name, email: form.email, phone: form.phone, password: form.password });
      navigate('/');
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const AuthNavMini = () => (
    <nav className="navbar" style={{ justifyContent: 'center' }}>
      <Link to="/" className="nav-logo">
        <img src="/logo.png" alt="Cibo" />
        <span>Cibo</span>
      </Link>
    </nav>
  );

  return (
    <div className="auth-page">
      <AuthNavMini />
      <div className="auth-body">
        <div className="auth-card">
          <div className="auth-left">
            <span className="auth-badge">Join the Cibo experience</span>
            <h2>Create your Cibo account</h2>
            <p>Sign up to explore top restaurants, save your favourites, and enjoy a smooth food ordering experience with the warm and premium Cibo feel.</p>
            <ul className="auth-features">
              {["Discover restaurants you'll love", 'Order faster with a clean checkout flow', 'Enjoy a cozy and modern food experience'].map((f) => (
                <li key={f}><span className="check-circle">✓</span>{f}</li>
              ))}
            </ul>
          </div>

          <div className="auth-right">
            <h1>Sign Up</h1>
            <p className="auth-subtitle">Fill in your details to get started with Cibo.</p>

            {apiError && (
              <div style={{ background: 'var(--red-light)', border: '1px solid var(--red)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 14, color: 'var(--red)' }}>
                {apiError}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="signup-name">Full Name</label>
                <input id="signup-name" type="text" className={`form-input${errors.name ? ' error' : ''}`} placeholder="Your full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="signup-email">Email</label>
                <input id="signup-email" type="email" className={`form-input${errors.email ? ' error' : ''}`} placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="signup-phone">Phone Number</label>
                <input id="signup-phone" type="tel" className={`form-input${errors.phone ? ' error' : ''}`} placeholder="10-digit mobile number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })} maxLength={10} />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="signup-password">Password</label>
                <div className="pw-wrap">
                  <input id="signup-password" type={showPw ? 'text' : 'password'} className={`form-input${errors.password ? ' error' : ''}`} placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value.slice(0, 6) })} maxLength={6} />
                  <button type="button" className="pw-toggle" onClick={() => setShowPw(!showPw)} aria-label="Toggle password visibility">
                    <svg focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  </button>
                </div>
                {errors.password && <span className="form-error">{errors.password}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="signup-confirm">Confirm Password</label>
                <div className="pw-wrap">
                  <input id="signup-confirm" type={showConfirm ? 'text' : 'password'} className={`form-input${errors.confirmPassword ? ' error' : ''}`} placeholder="••••••••" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value.slice(0, 6) })} maxLength={6} />
                  <button type="button" className="pw-toggle" onClick={() => setShowConfirm(!showConfirm)} aria-label="Toggle password visibility">
                    <svg focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  </button>
                </div>
                {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px' }} disabled={loading} id="signup-submit-btn">
                {loading ? 'Creating account…' : 'Create Account'}
              </button>

              <p className="auth-bottom">
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
