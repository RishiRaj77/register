import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cartoonAvatar from '../assets/cartoon_avatar.png';
import sketchAvatar from '../assets/sketch_avatar.png';
import threeDAvatar from '../assets/3d_avatar.png';
import AvatarCard from '../components/AvatarCard';

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

  return (
    <div className="dashboard-container">

      <h2 className="dashboard-section-title">Choose Your Avatar</h2>
      <div className="avatar-grid">
        <AvatarCard styleName="Cartoon" defaultImage={cartoonAvatar} />
        <AvatarCard styleName="Sketch" defaultImage={sketchAvatar} />
        <AvatarCard styleName="3D" defaultImage={threeDAvatar} />
      </div>
    </div>
  );
}

const styles = {
  highlight: {
    background: 'linear-gradient(to right, #667eea, #d442f5)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent'
  },
  statNumber: {
    color: '#2d3748',
    fontSize: '32px',
    fontWeight: '800',
    marginBottom: '8px',
    marginTop: 0
  },
  statLabel: {
    color: '#718096',
    fontSize: '14px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: '600',
    margin: 0
  },
  avatarImage: {
    width: '100%',
    aspectRatio: '1',
    objectFit: 'cover',
    borderRadius: '12px',
    marginBottom: '16px'
  },
  avatarLabel: {
    color: '#4a5568',
    fontSize: '16px',
    fontWeight: '700',
    margin: '0'
  }
};

export default Home;
