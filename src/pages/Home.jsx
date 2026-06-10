import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cartoonAvatar from '../assets/cartoon_avatar.png';
import sketchAvatar from '../assets/sketch_avatar.png';
import threeDAvatar from '../assets/3d_avatar.png';

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

        {/* Avatar Selection Section */}
        <div style={styles.avatarSection}>
          <h2 style={styles.avatarSectionTitle}>Choose Your Avatar</h2>
          <div style={styles.avatarCardsContainer}>
            <div style={styles.avatarCard} className="hover-lift">
              <img src={cartoonAvatar} alt="Cartoon Avatar" style={styles.avatarImage} />
              <p style={styles.avatarLabel}>Cartoon</p>
            </div>
            <div style={styles.avatarCard} className="hover-lift">
              <img src={sketchAvatar} alt="Sketch Avatar" style={styles.avatarImage} />
              <p style={styles.avatarLabel}>Sketch</p>
            </div>
            <div style={styles.avatarCard} className="hover-lift">
              <img src={threeDAvatar} alt="3D Avatar" style={styles.avatarImage} />
              <p style={styles.avatarLabel}>3D</p>
            </div>
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
  },
  avatarSection: {
    marginBottom: '30px',
    textAlign: 'center'
  },
  avatarSectionTitle: {
    color: '#2d3748',
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '15px'
  },
  avatarCardsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '15px'
  },
  avatarCard: {
    flex: 1,
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    padding: '10px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer'
  },
  avatarImage: {
    width: '100%',
    aspectRatio: '1',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '10px'
  },
  avatarLabel: {
    color: '#4a5568',
    fontSize: '14px',
    fontWeight: '600',
    margin: '0'
  }
};

export default Home;
