import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import '../styles/admin.css';

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const ADMIN_PASSWORD = 'admin'; // Hardcoded password

  // Fetch all users on mount, but only if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('Incorrect password!');
    }
  };

  const fetchUsers = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const token = localStorage.getItem('token');
      const res = await fetch(`${apiUrl}/api/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(Array.isArray(data) ? data : []);
      } else {
        console.error("Failed to fetch users:", data.message);
        alert("Failed to load users: " + (data.message || "Unknown error"));
        setUsers([]);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
      setUsers([]);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const token = localStorage.getItem('token');
        const res = await fetch(`${apiUrl}/api/users/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          // Remove deleted user from state
          setUsers(users.filter(user => user._id !== id));
        } else {
          alert("Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user", error);
      }
    }
  };

  const handleEditClick = (user) => {
    setEditingId(user._id);
    setEditFormData({ name: user.name, email: user.email });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSave = async (id) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const token = localStorage.getItem('token');
      const res = await fetch(`${apiUrl}/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editFormData)
      });
      const data = await res.json();
      if (res.ok) {
        // Update user in state
        setUsers(users.map(user => user._id === id ? data.user : user));
        setEditingId(null);
      } else {
        alert(data.message || "Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  const filteredUsers = Array.isArray(users) ? users.filter(user =>
    (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (user._id && user._id.toLowerCase().includes(searchQuery.toLowerCase()))
  ) : [];

  const getExportData = () => {
    return users.map(user => ({
      ID: user._id,
      Name: user.name,
      Email: user.email,
      'Created At': new Date(user.createdAt).toLocaleDateString()
    }));
  };

  const handleDownloadExcel = () => {
    if (users.length === 0) return alert("No data to download");
    const data = getExportData();
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "users_data.xlsx");
  };

  const handleDownloadCSV = () => {
    if (users.length === 0) return alert("No data to download");
    const data = getExportData();
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "users_data.csv");
  };

  if (!isAuthenticated) {
    return (
      <div className="page-center">
        <div className="glass-card">
          <div className="card-avatar">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <h2>Admin Access</h2>
          <form onSubmit={handlePasswordSubmit} className="theme-form">
            <div className="input-group">
              <input
                type="password"
                placeholder="Enter Admin Password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                required
              />
            </div>
            {passwordError && <p style={{ color: '#e53e3e', margin: 0, fontSize: '14px', textAlign: 'left' }}>{passwordError}</p>}
            <button type="submit" className="btn-primary btn-purple">
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>User Administration Dashboard</h1>
      </div>

      <div className="admin-controls">
        <div className="total-users">
          Total Users: <strong>{users.length}</strong>
        </div>
        <div className="search-bar" style={{ flexGrow: 1, margin: '0 24px' }}>
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="export-controls">
          <button onClick={handleDownloadExcel} className="btn-primary" style={{ padding: '10px 16px', marginTop: 0 }}>Download Excel</button>
          <button onClick={handleDownloadCSV} className="btn-primary" style={{ padding: '10px 16px', marginTop: 0 }}>Download CSV</button>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No users found.</td></tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user._id}>
                  <td style={{ color: '#9ca3af', fontFamily: 'monospace' }}>{user._id}</td>

                  <td>
                    {editingId === user._id ? (
                      <input
                        type="text"
                        name="name"
                        value={editFormData.name}
                        onChange={handleEditChange}
                        className="edit-input"
                      />
                    ) : user.name}
                  </td>

                  <td>
                    {editingId === user._id ? (
                      <input
                        type="email"
                        name="email"
                        value={editFormData.email}
                        onChange={handleEditChange}
                        className="edit-input"
                      />
                    ) : user.email}
                  </td>

                  <td style={{ color: '#666', fontSize: '14px' }}>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  <td>
                    {editingId === user._id ? (
                      <>
                        <button className="action-btn save-btn" onClick={() => handleSave(user._id)}>Save</button>
                        <button className="action-btn cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button className="action-btn edit-btn" onClick={() => handleEditClick(user)}>Edit</button>
                        <button className="action-btn delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
//
export default Admin;