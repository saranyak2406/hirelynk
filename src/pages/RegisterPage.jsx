import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, User, Briefcase, Mail, Lock, Building, CheckCircle2, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export const RegisterPage = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'recruiter' ? 'recruiter' : 'talent';

  const [activeTab, setActiveTab] = useState(initialRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [headline, setHeadline] = useState('');
  const [company, setCompany] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [errors, setErrors] = useState({});

  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get('role') === 'recruiter') {
      setActiveTab('recruiter');
    }
  }, [searchParams]);

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!email.trim()) errs.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Valid email is required';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (activeTab === 'recruiter' && !company.trim()) {
      errs.company = 'Company name is required for recruiters';
    }
    if (!agreed) errs.agreed = 'You must agree to the Terms of Service';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    register({
      name,
      email,
      role: activeTab,
      headline: headline || (activeTab === 'recruiter' ? `Recruiter @ ${company}` : 'Software Professional'),
      company: activeTab === 'recruiter' ? company : '',
      location: 'San Francisco, CA'
    });

    if (activeTab === 'recruiter') {
      navigate('/recruiter');
    } else {
      navigate('/feed');
    }
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
          <h2>Join the world's most transparent tech network</h2>
          <p className="auth-sidebar-sub">
            Whether you're looking for your next staff engineering role or sourcing top 1% candidates, HireLynk is built for you.
          </p>

          <div className="auth-features-list">
            <div className="auth-feature-item">
              <CheckCircle2 size={18} color="#38bdf8" />
              <span>Free personalized job matches & salary insights</span>
            </div>
            <div className="auth-feature-item">
              <CheckCircle2 size={18} color="#38bdf8" />
              <span>Full ATS applicant pipeline for employers</span>
            </div>
            <div className="auth-feature-item">
              <CheckCircle2 size={18} color="#38bdf8" />
              <span>Zero spam, verified professional profiles</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="auth-form-side">
          <div className="auth-header">
            <h1 className="auth-title">Create your HireLynk account</h1>
            <p className="auth-sub">
              Already have an account? <Link to="/login" className="auth-link">Sign In</Link>
            </p>
          </div>

          {/* Role selector tabs */}
          <div className="auth-role-tabs">
            <button
              type="button"
              className={`role-tab-btn ${activeTab === 'talent' ? 'active' : ''}`}
              onClick={() => setActiveTab('talent')}
            >
              <User size={16} /> I'm a Job Seeker
            </button>
            <button
              type="button"
              className={`role-tab-btn ${activeTab === 'recruiter' ? 'active' : ''}`}
              onClick={() => setActiveTab('recruiter')}
            >
              <Briefcase size={16} /> I'm an Employer / Recruiter
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  className={`form-input ${errors.name ? 'has-error' : ''}`}
                  placeholder="e.g. Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {errors.name && <div className="form-error">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">{activeTab === 'recruiter' ? 'Work Email *' : 'Email Address *'}</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  className={`form-input ${errors.email ? 'has-error' : ''}`}
                  placeholder={activeTab === 'recruiter' ? 'name@company.com' : 'name@example.com'}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Password * (6+ characters)</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`form-input ${errors.password ? 'has-error' : ''}`}
                  placeholder="Create a secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <div className="form-error">{errors.password}</div>}
            </div>

            {/* Recruiter-specific company field */}
            {activeTab === 'recruiter' ? (
              <div className="form-group">
                <label className="form-label">Company Name *</label>
                <div className="input-with-icon">
                  <Building size={18} className="input-icon" />
                  <input
                    type="text"
                    className={`form-input ${errors.company ? 'has-error' : ''}`}
                    placeholder="e.g. Stripe, OpenAI, CloudScale AI"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                {errors.company && <div className="form-error">{errors.company}</div>}
              </div>
            ) : (
              <div className="form-group">
                <label className="form-label">Professional Headline / Role</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Senior Frontend Engineer | React • TypeScript"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                />
              </div>
            )}

            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.82rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  style={{ marginTop: 2 }}
                />
                <span>
                  I agree to the HireLynk <a href="#terms" className="auth-link">User Agreement</a>, <a href="#privacy" className="auth-link">Privacy Policy</a>, and Cookie Policy.
                </span>
              </label>
              {errors.agreed && <div className="form-error">{errors.agreed}</div>}
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
              Agree & Join HireLynk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
