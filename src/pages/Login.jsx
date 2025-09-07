// pages/Login.jsx
import React, { useState, useContext, useEffect } from 'react';
import './Login.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../App';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useContext(AuthContext);

  // Clear any previous errors when component mounts
  useEffect(() => {
    setErrors({});
    setFormData({ email: '', password: '' });
  }, [location.pathname]);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form
    let newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create user object
      const userData = {
        email: formData.email.trim(),
        name: 'Amr Mahmoud',
        id: Date.now()
      };

      // Login user
      login(userData);
      
      // Navigate to feed
      navigate('/feed', { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // If user is already authenticated, redirect to feed
  if (isAuthenticated) {
    navigate('/feed', { replace: true });
    return null;
  }

  return (
    <div className="login-bg">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to your account</p>
        </div>

        {errors.general && (
          <div className="login-error-general">
            <span>⚠️</span> {errors.general}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className={`login-input ${errors.email ? 'login-input-error' : ''}`}
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              autoComplete="email"
            />
            {errors.email && (
              <div className="login-error">
                <span>⚠️</span> {errors.email}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className={`login-input password-input ${errors.password ? 'login-input-error' : ''}`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={togglePasswordVisibility}
                disabled={isLoading}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && (
              <div className="login-error">
                <span>⚠️</span> {errors.password}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`login-btn ${isLoading ? 'login-btn-loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Register Link */}
        <div className="login-footer">
          <p>
            Don't have an account?{' '}
            <span 
              className="login-link" 
              onClick={() => navigate('/register')}
            >
              Sign up here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
