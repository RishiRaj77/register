import React from 'react';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

function Layout({ children }) {
  const location = useLocation();
  const showNavbar = location.pathname === '/home';

  return (
    <div className="layout-wrapper">
      {showNavbar && <Navbar />}
      <main className="layout-main" style={!showNavbar ? { paddingTop: 0 } : {}}>
        {children}
      </main>
    </div>
  );
}

export default Layout;
