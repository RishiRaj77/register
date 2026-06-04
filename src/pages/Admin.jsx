import React, { useState, useEffect } from 'react';
import '../styles/admin.css';

function Admin() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '' });

  // Fetch all users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

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
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
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

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>User Administration Dashboard</h1>
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
            {users.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No users found.</td></tr>
            ) : (
              users.map(user => (
                <tr key={user._id}>
                  <td style={{ color: '#888', fontSize: '12px' }}>{user._id}</td>
                  
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

export default Admin;
