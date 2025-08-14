import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <h1 className="hero-title">
                                <span className="highlight">Collaborate</span> Smarter with CoCreateX
                            </h1>
                            <p className="hero-subtitle">
                                The ultimate platform for real-time teamwork. Create, share, and communicate effortlessly with your team.
                            </p>
                            <div className="cta-buttons">
                                <Link to="/register" className="btn btn-primary">
                                    Get Started - It's Free
                                </Link>
                                <Link to="/login" className="btn btn-secondary">
                                    Existing User? Sign In
                                </Link>
                            </div>
                        </div>
                        <div className="hero-image">
  <div className="illustration-container">
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 800 600" 
      className="collab-illustration"
      aria-hidden="true"
    >
      {/* Background with gradient */}
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary-light)" />
          <stop offset="100%" stopColor="var(--card-bg)" />
        </linearGradient>
        <filter id="softGlow" height="300%" width="300%" x="-75%" y="-75%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Animated background elements */}
      <rect width="800" height="600" fill="url(#bgGradient)" rx="32" />
      
      {/* Floating circles with animation */}
      <circle cx="200" cy="150" r="60" fill="var(--primary-color)" opacity="0.7" className="float-animation">
        <animate attributeName="cy" values="150;140;150" dur="6s" repeatCount="indefinite" />
      </circle>
      <circle cx="600" cy="200" r="80" fill="var(--secondary-color)" opacity="0.5" className="float-animation">
        <animate attributeName="cy" values="200;190;200" dur="8s" repeatCount="indefinite" />
      </circle>
      
      {/* Main collaboration elements */}
      <g className="collab-group">
        {/* Document icon */}
        <path 
          d="M300,200 L500,200 L500,400 L300,400 Z" 
          fill="var(--card-bg)" 
          stroke="var(--text-color)" 
          strokeWidth="2"
          rx="8"
          className="doc-shape"
        />
        <path 
          d="M300,220 L500,220 M300,240 L450,240 M300,260 L500,260 M300,280 L420,280" 
          stroke="var(--text-color)" 
          strokeWidth="1.5"
        />
        
        {/* Users avatars */}
        <g className="user-group" transform="translate(150, 300)">
          <circle cx="0" cy="0" r="30" fill="var(--accent-1)" />
          <text x="0" y="5" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">A</text>
          <animateTransform 
            attributeName="transform"
            type="translate"
            values="150,300; 150,290; 150,300"
            dur="4s"
            repeatCount="indefinite"
          />
        </g>
        
        <g className="user-group" transform="translate(650, 320)">
          <circle cx="0" cy="0" r="30" fill="var(--accent-2)" />
          <text x="0" y="5" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">B</text>
          <animateTransform 
            attributeName="transform"
            type="translate"
            values="650,320; 650,310; 650,320"
            dur="5s"
            repeatCount="indefinite"
          />
        </g>
        
        {/* Connection lines */}
        <path 
          d="M180,300 Q400,250 620,320" 
          stroke="var(--primary-color)" 
          strokeWidth="3" 
          strokeDasharray="8 4"
          fill="none"
          className="connection-line"
        >
          <animate 
            attributeName="stroke-dashoffset"
            values="0; 50; 0"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
      </g>
      
      {/* Decorative elements */}
      <circle cx="100" cy="500" r="40" fill="var(--accent-3)" opacity="0.4" className="pulse-animation" />
      <circle cx="700" cy="100" r="30" fill="var(--accent-4)" opacity="0.4" className="pulse-animation" />
    </svg>
  </div>
</div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2 className="section-title">Why Choose CoCreateX?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🚀</div>
                            <h3>Real-time Editing</h3>
                            <p>See changes instantly as your team works together on documents.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔒</div>
                            <h3>Secure Storage</h3>
                            <p>Your data is encrypted and protected with enterprise-grade security.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🌐</div>
                            <h3>Access Anywhere</h3>
                            <p>Works seamlessly across all devices and platforms.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="testimonial-section">
                <div className="container">
                    <blockquote className="testimonial">
                        <p>"CollabTool transformed how our remote team works together"</p>
                        <footer>- Chanikya Chowdary Samineni </footer>
                    </blockquote>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="final-cta">
                <div className="container">
                    <h2>Ready to boost your team's productivity?</h2>
                    <Link to="/register" className="btn btn-primary btn-large">
                        Start Collaborating Today
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;