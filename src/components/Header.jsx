import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  if (location.pathname === '/login' || location.pathname === '/register') return null;

  const currentUser = {
    name: user?.name || 'Amr Mahmoud',
    email: user?.email || 'amr@example.com',
    initials: user?.name ? 
      user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'AM'
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoData = e.target.result;
        setProfilePhoto(photoData);
        localStorage.setItem('profilePhoto', photoData);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // Load profile photo from localStorage on component mount
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) {
      setProfilePhoto(savedPhoto);
    }
  }, []);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileMenu && !event.target.closest('.user-section')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu]);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <Link to="/">
              <span className="logo-text">
                <span className="logo-purple">Social</span>
                <span className="logo-blue">App</span>
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="nav">
            <Link 
              to="/feed" 
              className={`nav-link ${location.pathname === '/feed' || location.pathname === '/' ? 'active' : ''}`}
            >
              Feed
            </Link>
            <Link 
              to="/about" 
              className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
            >
              About
            </Link>
          </nav>

          {/* User Info */}
          <div className="user-section">
            <div className="user-info" onClick={() => setShowProfileMenu(!showProfileMenu)}>
              <div className="user-avatar">
                {profilePhoto ? (
                  <img 
                    src={profilePhoto} 
                    alt="Profile" 
                    className="profile-photo"
                  />
                ) : (
                  currentUser.initials
                )}
              </div>
              <span className="user-name">{currentUser.name}</span>
              <span className="dropdown-arrow">▼</span>
            </div>
            
            {/* Profile Menu */}
            {showProfileMenu && (
              <div className="profile-menu">
                <div className="profile-menu-header">
                  <div className="profile-menu-avatar">
                    {profilePhoto ? (
                      <img 
                        src={profilePhoto} 
                        alt="Profile" 
                        className="profile-photo"
                      />
                    ) : (
                      currentUser.initials
                    )}
                  </div>
                  <div className="profile-menu-info">
                    <div className="profile-menu-name">{currentUser.name}</div>
                    <div className="profile-menu-email">{currentUser.email}</div>
                  </div>
                </div>
                
                <div className="profile-menu-item">
                  <label htmlFor="profile-photo-input" className="profile-photo-upload">
                    <span>📷</span>
                    Change Profile Photo
                  </label>
                  <input
                    id="profile-photo-input"
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePhotoChange}
                    style={{ display: 'none' }}
                  />
                </div>
                
                <div className="profile-menu-divider"></div>
                
                <button className="profile-menu-item logout-btn" onClick={handleLogout}>
                  <span>🚪</span>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 