import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiUrl}/api/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();

      if (res.ok) {
        setMessage('Reset link sent! Please check your email.');
      } else {
        setError(data.message || 'Failed to send reset link.');
      }
    } catch (err) {
      setError('An error occurred.');
    }
  };

  return (
    <div className="page-center">
      <div className="glass-card">
        <h2>Forgot Password</h2>
        <p style={{ color: '#718096', marginBottom: '20px' }}>Enter your email address and we'll send you a link to reset your password.</p>

        {message && <p style={{ color: '#38a169', marginBottom: '15px' }}>{message}</p>}
        {error && <p style={{ color: '#e53e3e', marginBottom: '15px' }}>{error}</p>}

        <form onSubmit={handleSubmit} className="theme-form">
          <div className="input-group">
            <div className="label-wrapper">
              <label htmlFor="email">Email</label>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary btn-purple">
            Send Reset Link
          </button>
        </form>

        <div className="theme-footer">
          <p>Remember your password? <Link to="/login">Log In &gt;</Link></p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
