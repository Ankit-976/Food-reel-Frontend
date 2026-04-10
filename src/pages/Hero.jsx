import React from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Food Reel</h1>
        <p className="hero-subtitle">Discover amazing food experiences and connect with food partners</p>
        
        <div className="hero-buttons">
          <div className="button-group">
            <h3>As a User</h3>
            <Link to="/user/register" className="hero-btn primary">
              Register as User
            </Link>
            <Link to="/user/login" className="hero-btn secondary">
              Login as User
            </Link>
          </div>
          
          <div className="button-group">
            <h3>As a Food Partner</h3>
            <Link to="/food-partner/register" className="hero-btn primary">
              Register as Food Partner
            </Link>
            <Link to="/food-partner/login" className="hero-btn secondary">
              Login as Food Partner
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
