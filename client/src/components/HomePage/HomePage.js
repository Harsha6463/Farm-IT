import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {

  return (
    <div className="homepage-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title" style={{color:"#007bff"}}>Welcome to Farm IT</h1>
          <p className="hero-description">
            Revolutionizing Agriculture with Technology and Innovation
          </p>
          <Link to="/register" className="cta-button">
            Get Started
          </Link>
        </div>
      </header>

      <section className="features-section">
        <h2 className="section-title">Our Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🌾</div>
            <h3>Farm Management</h3>
            <p>Leverage advanced tools to optimize your farm's efficiency and productivity.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Secure Investments</h3>
            <p>Partner with investors to secure funds and grow your farming venture.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📜</div>
            <h3>Easy Loan Applications</h3>
            <p>Streamlined process to apply for loans from trusted financial institutions.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Real-Time Tracking</h3>
            <p>Track farm activities, performance, and financial progress in real-time.</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-content">
          <h2 className="section-title">About Farm IT</h2>
          <p className="passage">
            Farm IT is a cutting-edge platform designed to connect farmers and investors, empowering agricultural growth and ensuring food security. With user-friendly tools for farm management, real-time tracking, and financial services, we aim to transform the future of farming.
          </p>
        </div>
      </section>

      <section className="testimonials-section">
        <h2 className="section-title">What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p className="passage"> "Farm IT helped me secure funding and expand my farm like never before!"</p>
            <h4>- Harsha, Farmer</h4>
          </div>
          <div className="testimonial-card">
            <p className="passage">"A seamless investment platform that ensures transparency and growth."</p>
            <h4>- Hari, Investor</h4>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2 style={{color:"#007bff"}} className="cta-title">Join Farm IT Today!</h2>
        <p className="passage">Take the first step towards smarter farming with advanced technology and secure investments.</p>
        <Link to="/register" className="cta-button">Get Started</Link>
      </section>
    </div>
  );
};

export default HomePage;

