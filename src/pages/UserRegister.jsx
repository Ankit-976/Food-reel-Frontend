import React from 'react';
import '../styles/auth.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {
    const API = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value
        
        const response = await axios.post(`${API}/api/auth/user/register`,{
            name,
            email,
            password
        },{
            withCredentials: true
        })

        navigate('/home');
        
    }

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-badge">USER</div>
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Join Food Reel and discover amazing food</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="username">
                Full Name <span>*</span>
              </label>
              <input
                type="text"
                id="user-name"
                name="name"
                className="form-input"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="user-email">
                Email Address <span>*</span>
              </label>
              <input
                type="email"
                id="user-email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="user-password">
                Password <span>*</span>
              </label>
              <input
                type="password"
                id="user-password"
                name="password"
                className="form-input"
                placeholder="Create a strong password"
                required
              />
            </div>

            <div className="form-checkbox-group">
              <input type="checkbox" id="user-terms" name="terms" className="form-checkbox" required />
              <label htmlFor="user-terms" className="checkbox-label">
                I agree to the <a href="#terms">Terms & Conditions</a>
              </label>
            </div>

            <button type="submit" className="form-button">
              Create Account
            </button>
          </form>

          <div className="auth-footer">
            Already have an account? <a href="/user/login">Sign In</a>
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-lg)', paddingTop: 'var(--spacing-lg)', borderTop: '1px solid var(--border-color)' }}>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', margin: 0 }}>
              Want to register your business? <a href="/food-partner/register" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 'var(--font-weight-medium)' }}>Register as Food Partner</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
