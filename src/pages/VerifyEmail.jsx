import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function VerifyEmail() {
  const { token } = useParams();
  const [message, setMessage] = useState('Verifying your email...');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${apiUrl}/api/verify-email/${token}`);
        const data = await res.json();
        
        if (res.ok) {
          setIsSuccess(true);
          setMessage(data.message || 'Email verified successfully! You can now log in.');
        } else {
          setIsSuccess(false);
          setMessage(data.message || 'Verification failed. The link might be invalid or expired.');
        }
      } catch (error) {
        setIsSuccess(false);
        setMessage('An error occurred during verification.');
      }
    };

    verify();
  }, [token]);

  return (
    <div className="page-center">
      <div className="glass-card">
        <h2>Email Verification</h2>
        <div style={{ padding: '20px', textAlign: 'center', margin: '20px 0', background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
          <p style={{ color: isSuccess ? '#38a169' : '#e53e3e', fontSize: '18px', fontWeight: 'bold' }}>{message}</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Link to="/login" className="btn-primary btn-blue" style={{ display: 'inline-block', textDecoration: 'none' }}>
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
