import React from 'react';
import '../styles/auth.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const UserLogin = () => { 
    const API = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        await axios.post(`${API}/api/auth/user/login`,{
            email,
            password
        },{
            withCredentials: true
        })


        navigate('/home')
        
    }
  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-badge">USER</div>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to your Food Reel account</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="user-login-email">
                Email Address <span>*</span>
              </label>
              <input
                type="email"
                id="user-login-email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="user-login-password">
                Password <span>*</span>
              </label>
              <input
                type="password"
                id="user-login-password"
                name="password"
                className="form-input"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-checkbox-group">
              <input type="checkbox" id="user-remember" name="remember" className="form-checkbox" />
              <label htmlFor="user-remember" className="checkbox-label">
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
            Don't have an account? <a href="/user/register">Create Account</a>
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-lg)', paddingTop: 'var(--spacing-lg)', borderTop: '1px solid var(--border-color)' }}>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', margin: 0 }}>
              Are you a food partner? <a href="/food-partner/login" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 'var(--font-weight-medium)' }}>Sign In as Food Partner</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
