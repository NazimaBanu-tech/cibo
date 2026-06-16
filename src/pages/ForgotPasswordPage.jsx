import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) { setError('Email is required'); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError('Enter a valid email address'); return; }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="forgot-page">
      <div className="forgot-card">
        <div className="forgot-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h1>Forgot Password</h1>
        {!submitted ? (
          <>
            <p>Enter your registered email address and we will send you a link to reset your password.</p>
            <form className="forgot-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="forgot-email">Email Address</label>
                <input
                  id="forgot-email"
                  type="email"
                  className={`form-input${error ? ' error' : ''}`}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error && <span className="form-error">{error}</span>}
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '13px' }} id="send-reset-btn">
                Send Reset Link
              </button>
            </form>
          </>
        ) : (
          <div>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--green-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--green-dark)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <p style={{ marginBottom: 0 }}>
              We&apos;ve sent a password reset link to <strong>{email}</strong>.
              Please check your inbox and follow the instructions.
            </p>
          </div>
        )}
        <Link to="/login" className="forgot-back">← Back to Login</Link>
      </div>
    </div>
  );
}
