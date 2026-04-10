import React from 'react';
import '../styles/auth.css';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const FoodPartnerRegister = () => {
    const API = import.meta.env.VITE_API_URL;

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = e.target.businessName.value;
        const email = e.target.email.value;
        const contactName = e.target.contactName.value;
        const phone = e.target.phone.value;
        const address = e.target.address.value;
        const password = e.target.password.value;

        const response = await axios.post(`${API}/api/auth/food-partner/register`,{
            name,
            email,
            contactName,
            phone,
            address,
            password
        },{
            withCredentials: true
        })


        navigate('/create-food');
        
    }
  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-badge">FOOD PARTNER</div>
            <h1 className="auth-title">Partner With Us</h1>
            <p className="auth-subtitle">Grow your food business on Food Reel</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="partner-business-name">
                Business Name <span>*</span>
              </label>
              <input
                type="text"
                id="partner-business-name"
                name="businessName"
                className="form-input"
                placeholder="Enter your business name"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="partner-email">
                Email Address <span>*</span>
              </label>
              <input
                type="email"
                id="partner-email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="partner-contact-name">
                Contact Name <span>*</span>
              </label>
              <input
                type="text"
                id="partner-contact-name"
                name="contactName"
                className="form-input"
                placeholder="Enter contact person name"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="partner-phone">
                Phone Number <span>*</span>
              </label>
              <input
                type="tel"
                id="partner-phone"
                name="phone"
                className="form-input"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="partner-address">
                Address <span>*</span>
              </label>
              <input
                type="text"
                id="partner-address"
                name="address"
                className="form-input"
                placeholder="Enter your business address"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="partner-password">
                Password <span>*</span>
              </label>
              <input
                type="password"
                id="partner-password"
                name="password"
                className="form-input"
                placeholder="Create a strong password"
                required
              />
            </div>

            <div className="form-checkbox-group">
              <input type="checkbox" id="partner-terms" name="terms" className="form-checkbox" required />
              <label htmlFor="partner-terms" className="checkbox-label">
                I agree to the <a href="#terms">Terms & Conditions</a>
              </label>
            </div>

            <button type="submit" className="form-button">
              Register Business
            </button>
          </form>

          <div className="auth-footer">
            Already registered? <a href="/food-partner/login">Sign In</a>
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-lg)', paddingTop: 'var(--spacing-lg)', borderTop: '1px solid var(--border-color)' }}>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', margin: 0 }}>
              Looking to order food? <a href="/user/register" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 'var(--font-weight-medium)' }}>Register as Normal User</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
