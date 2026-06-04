import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication state
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '50px',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>Welcome to the Home Page! 🚀</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>You have successfully logged in.</p>
        <button 
          onClick={handleLogout}
          style={{
            background: '#ff6b6b',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.background = '#ff5252'}
          onMouseOut={(e) => e.target.style.background = '#ff6b6b'}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Home;
