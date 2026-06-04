import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/signup.css'; // Reusing the same beautiful styles

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiUrl}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        // Login successful - save auth state, user name, and token
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userName', data.name);
        localStorage.setItem('token', data.token);
        navigate('/home');
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during login");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h2>Welcome Back</h2>
          <p>Please log in to your account.</p>
        </div>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="signup-button">
            Log In
          </button>
        </form>
        <div className="signup-footer">
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
