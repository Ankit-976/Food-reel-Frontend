import React from 'react';
import '../styles/auth.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const FoodPartnerLogin = () => {

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const email = e.target.email.value;
        const password = e.target.password.value;

        const response = await axios.post(`${API}/api/auth/food-partner/login`,{
            email,
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
            <h1 className="auth-title">Partner Dashboard</h1>
            <p className="auth-subtitle">Access your Food Reel partner account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="partner-login-email">
                Business Email <span>*</span>
              </label>
              <input
                type="email"
                id="partner-login-email"
                name="email"
                className="form-input"
                placeholder="Enter your business email"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="partner-login-password">
                Password <span>*</span>
              </label>
              <input
                type="password"
                id="partner-login-password"
                name="password"
                className="form-input"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-checkbox-group">
              <input type="checkbox" id="partner-remember" name="remember" className="form-checkbox" />
              <label htmlFor="partner-remember" className="checkbox-label">
                Remember me
              </label>
            </div>

            <button type="submit" className="form-button">
              Sign In
            </button>

            <div style={{ textAlign: 'center', marginTop: 'var(--spacing-md)' }}>
              <a href="#forgot" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', textDecoration: 'none' }}>
                Forgot your password?
              </a>
            </div>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <button type="button" className="form-button secondary">
            Continue with Google
          </button>

          <div className="auth-footer">
            New to Food Reel? <a href="/food-partner/register">Register your business</a>
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-lg)', paddingTop: 'var(--spacing-lg)', borderTop: '1px solid var(--border-color)' }}>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', margin: 0 }}>
              Looking to order food? <a href="/user/login" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 'var(--font-weight-medium)' }}>Sign In as Normal User</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
