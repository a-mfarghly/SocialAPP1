import React, { useState } from 'react';
import './About.css';

const About = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const features = [
    {
      icon: '💬',
      title: 'Share & Connect',
      description: 'Share your thoughts and experiences with the community'
    },
    {
      icon: '👥',
      title: 'Build Relationships',
      description: 'Connect with friends and discover new people'
    },
    {
      icon: '❤️',
      title: 'Engage & Interact',
      description: 'Engage with posts through likes and comments'
    },
    {
      icon: '⚡',
      title: 'Real-time Updates',
      description: 'Get instant notifications and live updates'
    },
    {
      icon: '🎨',
      title: 'Beautiful Design',
      description: 'Clean and intuitive user interface'
    },
    {
      icon: '📱',
      title: 'Cross-platform',
      description: 'Works seamlessly across all devices'
    }
  ];

  const technologies = [
    { name: 'React.js', version: '19.1.1', icon: '⚛️' },
    { name: 'React Router', version: '7.8.0', icon: '🛣️' },
    { name: 'Vite', version: '7.1.2', icon: '⚡' },
    { name: 'CSS3', version: 'Modern', icon: '🎨' },
    { name: 'JavaScript', version: 'ES2022', icon: '🟨' },
    { name: 'LocalStorage', version: 'Browser API', icon: '💾' }
  ];

  const team = [
    {
      name: 'Amr Mahmoud',
      role: 'Lead Developer',
      avatar: '👨‍💻',
      description: 'Full-stack developer passionate about creating amazing user experiences'
    },
    {
      name: 'Development Team',
      role: 'Contributors',
      avatar: '👥',
      description: 'Dedicated team working together to build the best social platform'
    }
  ];

  const stats = [
    { number: '100%', label: 'Open Source' },
    { number: '24/7', label: 'Available' },
    { number: '∞', label: 'Possibilities' },
    { number: '❤️', label: 'Made with Love' }
  ];

  return (
    <div className="about-page">
      <div className="container">
        <div className="about-content">
          {/* Header Section */}
          <div className="about-header">
            <h1 className="about-title">
              <span className="title-gradient">About</span> SocialApp
            </h1>
            <p className="about-subtitle">
              Connecting people through meaningful experiences and shared moments
            </p>
          </div>

          {/* Stats Section */}
          <div className="stats-section">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="tabs-navigation">
            <button
              className={`tab-btn ${activeTab === 'mission' ? 'active' : ''}`}
              onClick={() => setActiveTab('mission')}
            >
              🎯 Mission
            </button>
            <button
              className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
              onClick={() => setActiveTab('features')}
            >
              ✨ Features
            </button>
            <button
              className={`tab-btn ${activeTab === 'technology' ? 'active' : ''}`}
              onClick={() => setActiveTab('technology')}
            >
              🛠️ Technology
            </button>
            <button
              className={`tab-btn ${activeTab === 'team' ? 'active' : ''}`}
              onClick={() => setActiveTab('team')}
            >
              👥 Team
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {/* Mission Tab */}
            {activeTab === 'mission' && (
              <div className="about-section">
                <h2 className="section-title">Our Mission</h2>
                <div className="mission-content">
                  <p className="mission-text">
                    SocialApp is designed to bring people together through meaningful connections 
                    and shared experiences. We believe in the power of community and the importance 
                    of staying connected with friends, family, and like-minded individuals.
                  </p>
                  <div className="mission-values">
                    <div className="value-item">
                      <span className="value-icon">🤝</span>
                      <h3>Community First</h3>
                      <p>Building strong, supportive communities where everyone feels welcome</p>
                    </div>
                    <div className="value-item">
                      <span className="value-icon">🔒</span>
                      <h3>Privacy & Security</h3>
                      <p>Your data and privacy are our top priorities</p>
                    </div>
                    <div className="value-item">
                      <span className="value-icon">🚀</span>
                      <h3>Innovation</h3>
                      <p>Continuously improving and adding new features</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Features Tab */}
            {activeTab === 'features' && (
              <div className="about-section">
                <h2 className="section-title">Features</h2>
                <div className="features-grid">
                  {features.map((feature, index) => (
                    <div key={index} className="feature-card">
                      <div className="feature-icon">{feature.icon}</div>
                      <h3 className="feature-title">{feature.title}</h3>
                      <p className="feature-description">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technology Tab */}
            {activeTab === 'technology' && (
              <div className="about-section">
                <h2 className="section-title">Technology Stack</h2>
                <p className="tech-intro">
                  Built with modern web technologies to provide a smooth and responsive 
                  user experience across all devices.
                </p>
                <div className="tech-grid">
                  {technologies.map((tech, index) => (
                    <div key={index} className="tech-card">
                      <div className="tech-icon">{tech.icon}</div>
                      <div className="tech-info">
                        <h3 className="tech-name">{tech.name}</h3>
                        <p className="tech-version">{tech.version}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="tech-highlights">
                  <div className="highlight-item">
                    <span className="highlight-icon">⚡</span>
                    <div>
                      <h4>Fast Performance</h4>
                      <p>Optimized for speed and efficiency</p>
                    </div>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">📱</span>
                    <div>
                      <h4>Responsive Design</h4>
                      <p>Works perfectly on all screen sizes</p>
                    </div>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-icon">🔒</span>
                    <div>
                      <h4>Secure</h4>
                      <p>Built with security best practices</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Team Tab */}
            {activeTab === 'team' && (
              <div className="about-section">
                <h2 className="section-title">Our Team</h2>
                <div className="team-grid">
                  {team.map((member, index) => (
                    <div key={index} className="team-card">
                      <div className="team-avatar">{member.avatar}</div>
                      <div className="team-info">
                        <h3 className="team-name">{member.name}</h3>
                        <p className="team-role">{member.role}</p>
                        <p className="team-description">{member.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="team-cta">
                  <h3>Join Our Team</h3>
                  <p>We're always looking for passionate developers to join our community!</p>
                  <button className="cta-btn">Get in Touch</button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Section */}
          <div className="about-footer">
            <div className="footer-content">
              <p className="footer-text">
                Made with ❤️ by the SocialApp Team
              </p>
              <div className="footer-links">
                <span className="footer-link">Privacy Policy</span>
                <span className="footer-link">Terms of Service</span>
                <span className="footer-link">Contact Us</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 