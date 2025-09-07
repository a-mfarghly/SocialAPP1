// pages/Register.jsx
import React, { useState, useContext } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const validateName = (name) => {
    return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (!validateName(formData.firstName)) {
      newErrors.firstName = 'First name must be at least 2 characters and contain only letters';
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (!validateName(formData.lastName)) {
      newErrors.lastName = 'Last name must be at least 2 characters and contain only letters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number';
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create user object
      const userData = {
        email: formData.email.trim(),
        name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        id: Date.now()
      };

      // Login user
      login(userData);
      
      // Navigate to feed
      navigate('/feed', { replace: true });
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ general: 'Account creation failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="register-bg">
      <div className="register-container">
        <div className="register-header">
          <h1 className="register-title">Create Account</h1>
          <p className="register-subtitle">Join our community today</p>
        </div>

        {errors.general && (
          <div className="register-error-general">
            <span>⚠️</span> {errors.general}
          </div>
        )}

        <form className="register-form" onSubmit={handleSubmit}>
          {/* Name Fields */}
          <div className="register-row">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="firstName"
                className={`register-input ${errors.firstName ? 'register-input-error' : ''}`}
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="given-name"
              />
              {errors.firstName && (
                <div className="register-error">
                  <span>⚠️</span> {errors.firstName}
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="lastName"
                className={`register-input ${errors.lastName ? 'register-input-error' : ''}`}
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="family-name"
              />
              {errors.lastName && (
                <div className="register-error">
                  <span>⚠️</span> {errors.lastName}
                </div>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className={`register-input ${errors.email ? 'register-input-error' : ''}`}
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              autoComplete="email"
            />
            {errors.email && (
              <div className="register-error">
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
                className={`register-input password-input ${errors.password ? 'register-input-error' : ''}`}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="new-password"
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
              <div className="register-error">
                <span>⚠️</span> {errors.password}
              </div>
            )}
            <div className="password-requirements">
              <small>Password must contain at least 8 characters, 1 uppercase, 1 lowercase, and 1 number</small>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                className={`register-input password-input ${errors.confirmPassword ? 'register-input-error' : ''}`}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={toggleConfirmPasswordVisibility}
                disabled={isLoading}
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.confirmPassword && (
              <div className="register-error">
                <span>⚠️</span> {errors.confirmPassword}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`register-btn ${isLoading ? 'register-btn-loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="register-footer">
          <p>
            Already have an account?{' '}
            <span 
              className="register-link" 
              onClick={() => navigate('/login')}
            >
              Sign in here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
