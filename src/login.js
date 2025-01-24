import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import './AuthPage.css'; // Import the CSS file

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and registration
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    age: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(formData.name, formData.password); // Use name instead of email for login
    } catch (err) {
      setError('Invalid credentials or server error.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          role: 'patient', // Default role
          activeProblems: [], // Initialize as empty
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed.');
      }

      alert('Registration successful. Please log in.');
      setIsLogin(true); // Switch to login form after successful registration
    } catch (err) {
      setError(err.message || 'Server error.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.title = isLogin ? 'Login Page' : 'Registration Page';
    return () => {
      document.title = 'React App';
    };
  }, [isLogin]);

  return (
    <div className="auth-page">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={isLogin ? handleLogin : handleRegister} className="auth-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="input-field"
        />
        {!isLogin && (
          <>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
              className="input-field"
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="input-field"
            />
          </>
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="input-field"
        />
        <button type="submit" disabled={isLoading} className="submit-button">
          {isLoading ? (isLogin ? 'Logging in...' : 'Registering...') : isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <button onClick={() => setIsLogin(!isLogin)} className="toggle-button">
        {isLogin ? 'New User? Register Here' : 'Already Registered? Login Here'}
      </button>
    </div>
  );
}

export default AuthPage;
