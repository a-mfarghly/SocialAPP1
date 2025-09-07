// App.js
import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Feed from './pages/Feed';
import About from './pages/About';

// Create Authentication Context
export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user session on app load
  useEffect(() => {
    const savedUserName = localStorage.getItem('userName');
    const savedUserEmail = localStorage.getItem('userEmail');
    
    if (savedUserName && savedUserEmail) {
      setUser({
        name: savedUserName,
        email: savedUserEmail,
        id: localStorage.getItem('userId') || Date.now()
      });
    }
    
    setIsLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    const userInfo = {
      ...userData,
      id: userData.id || Date.now()
    };
    
    setUser(userInfo);
    
    // Store user data in localStorage for persistence
    localStorage.setItem('userName', userInfo.name);
    localStorage.setItem('userEmail', userInfo.email);
    localStorage.setItem('userId', userInfo.id.toString());
  };

  // Logout function
  const logout = () => {
    setUser(null);
    
    // Clear localStorage on logout
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('profilePhoto');
  };

  // Update user profile
  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    
    // Update localStorage
    if (updates.name) localStorage.setItem('userName', updates.name);
    if (updates.email) localStorage.setItem('userEmail', updates.email);
  };

  const isAuthenticated = !!user;

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <BrowserRouter basename="/socialapp">
      <AuthContext.Provider value={{ 
        user, 
        login, 
        logout, 
        updateUser, 
        isAuthenticated 
      }}>
        <div className="App">
          {isAuthenticated && <Header />}
          <main className="main-content">
            <Routes>
              {/* Default route - redirect based on authentication */}
              <Route
                path="/"
                element={
                  isAuthenticated ? 
                    <Navigate to="/feed" replace /> : 
                    <Navigate to="/login" replace />
                }
              />
              
              {/* Authentication routes */}
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/register"
                element={<Register />}
              />
              
              {/* Protected routes */}
              <Route
                path="/feed"
                element={
                  isAuthenticated ? 
                    <Feed /> : 
                    <Navigate to="/login" replace />
                }
              />
              <Route
                path="/about"
                element={<About />}
              />
              
              {/* Catch all route - redirect to home */}
              <Route 
                path="*" 
                element={<Navigate to="/" replace />} 
              />
            </Routes>
          </main>
        </div>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
