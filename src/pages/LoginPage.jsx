import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
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
      await signIn({ email: form.email, password: form.password });
      navigate('/');
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
     <nav className="navbar" style={{ justifyContent: 'center' }}>
       <Link to="/" className="nav-logo">
         <img src="/logo.png" alt="Cibo" />
         <span>Cibo</span>
       </Link>
     </nav>

      <div className="auth-body">
        <div className="auth-card">
          {/* Left */}
          <div className="auth-left">
            <span className="auth-badge">Welcome back to Cibo</span>
            <h2>Login and continue your food journey</h2>
            <p>Sign in to explore your favourite restaurants, manage your orders, and enjoy a smooth food ordering experience with the same cozy Cibo vibe.</p>
            <ul className="auth-features">
              {['Fast ordering experience', 'Track your food journey easily', 'Save your favourite meals and places'].map((f) => (
                <li key={f}>
                  <span className="check-circle">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div className="auth-right">
            <h1>Sign In</h1>
            <p className="auth-subtitle">Enter your details to access your Cibo account.</p>

            {apiError && (
              <div style={{ background: 'var(--red-light)', border: '1px solid var(--red)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, fontSize: 14, color: 'var(--red)' }}>
                {apiError}
              </div>
            )}

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="login-email">Email Address</label>
                <input
                  id="login-email"
                  type="email"
                  className={`form-input${errors.email ? ' error' : ''}`}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <div className="pw-wrap">
                  <input
                    id="login-password"
                    type={showPw ? 'text' : 'password'}
                    className={`form-input${errors.password ? ' error' : ''}`}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value.slice(0, 6) })}
                    maxLength={6}
                  />
                  <button type="button" className="pw-toggle" onClick={() => setShowPw(!showPw)} aria-label="Toggle password visibility">
                    {showPw ? (
                      <svg focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                    ) : (
                      <svg focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    )}
                  </button>
                </div>
                {errors.password && <span className="form-error">{errors.password}</span>}
              </div>

              <div className="form-row">
                <label className="remember">
                  <input type="checkbox" checked={form.remember} onChange={(e) => setForm({ ...form, remember: e.target.checked })} />
                  Remember me
                </label>
                <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px' }} disabled={loading} id="login-submit-btn">
                {loading ? 'Signing in…' : 'Login'}
              </button>

              <div className="auth-divider">or</div>

              <button type="button" className="btn-ghost" style={{ width: '100%', padding: '13px' }} id="google-login-btn">
                Continue with Google
              </button>

              <p className="auth-bottom">
                Don&apos;t have an account? <Link to="/signup">Create one</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
