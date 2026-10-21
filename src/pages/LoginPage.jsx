import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, Sparkles, CheckCircle2, User, Briefcase, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('talent');
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});

  const { login, switchRole } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!email) errs.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Please enter a valid email address';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const user = login(email, password, role);
    if (user.role === 'recruiter') {
      navigate('/recruiter');
    } else if (user.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/feed');
    }
  };

  const handleQuickDemo = (demoRole) => {
    switchRole(demoRole);
    if (demoRole === 'recruiter') navigate('/recruiter');
    else if (demoRole === 'admin') navigate('/admin');
    else navigate('/feed');
  };

  return (
    <div className="auth-page-root">
      <div className="auth-card-container">
        {/* Left Side: Brand highlights */}
        <div className="auth-sidebar-side">
          <div className="auth-brand-badge">
            <span className="brand-h">H</span>
            <span className="brand-l">L</span>
          </div>
          <h2>Welcome back to HireLynk</h2>
          <p className="auth-sidebar-sub">
            Your bridge to verified engineering positions, elite tech peers, and streamlined recruitment.
          </p>

          <div className="auth-features-list">
            <div className="auth-feature-item">
              <CheckCircle2 size={18} color="#38bdf8" />
              <span>Direct InMail messaging with hiring managers</span>
            </div>
            <div className="auth-feature-item">
              <CheckCircle2 size={18} color="#38bdf8" />
              <span>100% verified salary transparency & equity</span>
            </div>
            <div className="auth-feature-item">
              <CheckCircle2 size={18} color="#38bdf8" />
              <span>Modern ATS pipeline for employers</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="auth-form-side">
          <div className="auth-header">
            <h1 className="auth-title">Sign in to your account</h1>
            <p className="auth-sub">
              Don't have an account yet? <Link to="/register" className="auth-link">Join HireLynk</Link>
            </p>
          </div>

          {/* Quick Demo Logins Box */}
          <div className="quick-demo-box">
            <div className="quick-demo-title">
              <Sparkles size={14} color="#0066cc" /> 1-Click Demo Login
            </div>
            <div className="quick-demo-grid">
              <button
                type="button"
                onClick={() => handleQuickDemo('talent')}
                className="btn btn-secondary btn-sm"
              >
                <User size={14} /> Job Seeker (Sarah)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('recruiter')}
                className="btn btn-dark btn-sm"
              >
                <Briefcase size={14} /> Recruiter (David)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="btn btn-ghost btn-sm"
                style={{ border: '1px solid var(--border-subtle)' }}
              >
                <Shield size={14} /> Admin (Eleanor)
              </button>
            </div>
          </div>

          <div className="auth-divider">
            <span>or sign in with email</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email address</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  className={`form-input ${errors.email ? 'has-error' : ''}`}
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Password</label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Demo password reset link has been dispatched to your email.'); }} className="auth-link-sm">
                  Forgot password?
                </a>
              </div>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`form-input ${errors.password ? 'has-error' : ''}`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <div className="form-error">{errors.password}</div>}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Keep me signed in
              </label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="form-select"
                style={{ width: 'auto', padding: '4px 10px', fontSize: '0.8rem' }}
              >
                <option value="talent">Sign in as Talent</option>
                <option value="recruiter">Sign in as Recruiter</option>
                <option value="admin">Sign in as Admin</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
              Sign In to HireLynk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
