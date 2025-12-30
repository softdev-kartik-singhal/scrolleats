import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Discover Food Like Never Before
                    </h1>
                    <p className="hero-subtitle">
                        Swipe through delicious food reels, save your favorites, and order from the best restaurants near you
                    </p>
                    <div className="cta-buttons">
                        <Link to="/user/register" className="btn btn-primary">
                            Get Started
                        </Link>
                        <Link to="/user/login" className="btn btn-secondary">
                            Sign In
                        </Link>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="floating-card card-1">
                        <div className="card-emoji">🍕</div>
                        <p>Pizza Perfection</p>
                    </div>
                    <div className="floating-card card-2">
                        <div className="card-emoji">🍔</div>
                        <p>Burger Bliss</p>
                    </div>
                    <div className="floating-card card-3">
                        <div className="card-emoji">🍜</div>
                        <p>Noodle Paradise</p>
                    </div>
                    <div className="floating-card card-4">
                        <div className="card-emoji">🍰</div>
                        <p>Sweet Treats</p>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="features-section">
                <h2 className="section-title">Why ScrollEats?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">📱</div>
                        <h3>Swipe & Discover</h3>
                        <p>Scroll through mouth-watering food reels from top restaurants</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">❤️</div>
                        <h3>Save Favorites</h3>
                        <p>Bookmark your favorite dishes and never lose track of them</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🎯</div>
                        <h3>Personalized Feed</h3>
                        <p>Get recommendations based on your taste preferences</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🚀</div>
                        <h3>Quick Orders</h3>
                        <p>Order directly from restaurants with just a tap</p>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="cta-section">
                <h2>Ready to Start Your Food Journey?</h2>
                <p>Join thousands of food lovers discovering amazing dishes every day</p>
                <Link to="/user/register" className="btn btn-large">
                    Create Free Account
                </Link>
            </div>

            {/* Footer */}
            <footer className="landing-footer">
                <p>&copy; 2025 ScrollEats. All rights reserved.</p>
                <div className="footer-links">
                    <Link to="/food-partner/register">Partner With Us</Link>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
