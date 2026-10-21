import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, Globe, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Footer = () => {
  const { switchRole, isAuthenticated } = useAuth();

  return (
    <footer className="footer-root">
      <div className="container">
        <div className="footer-grid">
          {/* Brand info */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <div className="brand-icon-box" style={{ width: 32, height: 32, fontSize: '1rem' }}>
                <span className="brand-h">H</span>
                <span className="brand-l">L</span>
              </div>
              <span className="brand-title" style={{ fontSize: '1.2rem' }}>
                Hire<span className="brand-accent">Lynk</span>
              </span>
            </div>
            <p className="footer-description">
              The premier professional network and talent marketplace connecting elite developers, designers, and tech leaders with the world's most innovative companies.
            </p>
            <div className="footer-badge-item">
              <Shield size={16} color="#0066cc" />
              <span>Verified Employer & Candidate Network</span>
            </div>
          </div>

          {/* Candidates */}
          <div className="footer-col">
            <h4>For Talent</h4>
            <ul>
              <li><Link to="/jobs">Search Tech Jobs</Link></li>
              <li><Link to="/feed">Community Feed</Link></li>
              <li><Link to="/network">Grow My Network</Link></li>
              <li><Link to="/profile">Create Profile</Link></li>
              <li><Link to="/pricing">Lynk Premium Career</Link></li>
            </ul>
          </div>

          {/* Employers */}
          <div className="footer-col">
            <h4>For Recruiters</h4>
            <ul>
              <li><Link to="/recruiter">Recruiter Dashboard</Link></li>
              <li><Link to="/jobs">Candidate Pipeline</Link></li>
              <li><Link to="/pricing">Recruiter Enterprise</Link></li>
              <li><Link to="/admin">Platform Moderation</Link></li>
              <li>
                <button
                  onClick={() => switchRole('recruiter')}
                  className="footer-role-btn"
                >
                  <Sparkles size={13} /> Switch to Recruiter Demo
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Demo Switcher & System */}
          <div className="footer-col">
            <h4>HireLynk Hub</h4>
            <ul>
              <li><Link to="/pricing">Pricing & Plans</Link></li>
              <li><Link to="/messaging">Direct InMail</Link></li>
              <li><Link to="/notifications">Activity Alerts</Link></li>
              <li><Link to="/admin">Admin Panel</Link></li>
              <li>
                <button
                  onClick={() => switchRole('admin')}
                  className="footer-role-btn"
                >
                  <Shield size={13} /> Switch to Admin Demo
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © 2026 HireLynk Corporation. Built with React, Vite & Modern CSS.
          </div>
          <div className="footer-bottom-links">
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <Globe size={14} /> English (US)
            </span>
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#cookies">Cookies</a>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Crafted with <Heart size={13} fill="#ef4444" color="#ef4444" /> for modern tech talent
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
