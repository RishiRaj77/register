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
    <div className="page-center">
      <div className="glass-card">
        <div className="card-avatar">
          {userName.charAt(0).toUpperCase()}
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
          className="btn-primary btn-blue"
          style={{ width: '100%' }}
        >
          Log Out Securely
        </button>
      </div>
    </div>
  );
}

const styles = {
  title: {
    color: '#1a202c',
    fontSize: '28px',
    fontWeight: '800',
    marginBottom: '10px',
    letterSpacing: '-0.5px'
  },
  highlight: {
    background: 'linear-gradient(to right, #667eea, #d442f5)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent'
  },
  subtitle: {
    color: '#718096',
    fontSize: '15px',
    lineHeight: '1.6',
    marginBottom: '30px',
    fontWeight: '400'
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '30px'
  },
  statBox: {
    flex: 1,
    background: '#f7fafc',
    border: '1px solid #e2e8f0',
    padding: '15px',
    borderRadius: '16px',
    transition: 'transform 0.3s ease',
  },
  statNumber: {
    color: '#2d3748',
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '5px'
  },
  statLabel: {
    color: '#718096',
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: '600'
  }
};

export default Home;
