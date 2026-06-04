import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Admin from './pages/Admin'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'

function App() {
  // A simple wrapper to protect routes
  const PrivateRoute = ({ children }) => {
    const hasToken = localStorage.getItem('token') !== null;
    return hasToken ? children : <Navigate to="/login" replace />;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/home" 
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } 
          />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
