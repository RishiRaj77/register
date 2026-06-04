import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Member');

  useEffect(() => {
    // Retrieve the user's name from localStorage when the component mounts
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleLogout = () => {
    // Clear authentication state and user details
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Dynamic Avatar based on first letter of name */}
        <div style={styles.avatarContainer}>
          <div style={styles.avatar}>
            {userName.charAt(0).toUpperCase()}
          </div>
        </div>
        
        {/* Greeting with name */}
        <h1 style={styles.title}>
          Welcome back, <span style={styles.highlight}>{userName}</span>!
        </h1>
        
        <p style={styles.subtitle}>
          We're thrilled to have you here. You have successfully logged into your account dashboard.
        </p>
        
        {/* Premium looking stats/info cards */}
        <div style={styles.statsContainer}>
          <div style={styles.statBox}>
            <h3 style={styles.statNumber}>1</h3>
            <p style={styles.statLabel}>Active Session</p>
          </div>
          <div style={styles.statBox}>
            <h3 style={styles.statNumber}>Pro</h3>
            <p style={styles.statLabel}>Membership</p>
          </div>
        </div>

        {/* Glowing Logout Button */}
        <button 
          onClick={handleLogout}
          style={styles.logoutBtn}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 10px 20px rgba(255, 75, 114, 0.4)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(255, 75, 114, 0.2)';
          }}
        >
          Log Out Securely
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    padding: '20px'
  },
  card: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '50px 40px',
    borderRadius: '24px',
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
    textAlign: 'center',
    maxWidth: '480px',
    width: '100%',
    position: 'relative',
    overflow: 'hidden'
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px'
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '36px',
    fontWeight: 'bold',
    color: 'white',
    boxShadow: '0 10px 25px rgba(139, 92, 246, 0.4)'
  },
  title: {
    color: '#ffffff',
    fontSize: '32px',
    fontWeight: '800',
    marginBottom: '16px',
    letterSpacing: '-0.5px'
  },
  highlight: {
    background: 'linear-gradient(to right, #a78bfa, #f472b6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent'
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '40px',
    fontWeight: '400'
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '40px'
  },
  statBox: {
    flex: 1,
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    padding: '20px',
    borderRadius: '16px',
    transition: 'transform 0.3s ease',
  },
  statNumber: {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '8px'
  },
  statLabel: {
    color: '#64748b',
    fontSize: '14px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: '600'
  },
  logoutBtn: {
    background: 'linear-gradient(135deg, #ff4b72 0%, #ff7657 100%)',
    color: 'white',
    border: 'none',
    padding: '16px 32px',
    borderRadius: '12px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: '700',
    width: '100%',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(255, 75, 114, 0.2)',
    letterSpacing: '0.5px'
  }
};

export default Home;
