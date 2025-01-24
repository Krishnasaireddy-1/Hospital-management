import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create context
export const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Ensure useNavigate is properly used

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userInfo'));
    // if (storedUser) {
    //   setUser(storedUser);
    //   setIsAuthenticated(true);
    // }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        //credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setIsAuthenticated(true);
        localStorage.setItem('userInfo', JSON.stringify(data));
        localStorage.setItem('isAuthenticated', 'true');

        // Navigate based on role
        const username=data.name;
        if (data.role === 'doctor') {
          navigate(`/doctor/dashboard`);
        } else {
          navigate(`/patient/{username}/dashboard`);
        }
      } else {
        throw new Error('Invalid credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('userInfo');
    localStorage.removeItem('isAuthenticated');
    navigate('/login'); // Ensure this works as expected
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
