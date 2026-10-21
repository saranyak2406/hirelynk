import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Briefcase } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="container" style={{ paddingTop: 60, paddingBottom: 80, textAlign: 'center', maxWidth: 560 }}>
      <div className="lynk-card" style={{ padding: 48 }}>
        <Compass size={56} color="var(--primary)" style={{ margin: '0 auto 16px' }} />
        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--navy-900)' }}>404</h1>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '8px 0 12px' }}>Page Not Found</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 28 }}>
          The page or professional link you are looking for does not exist, has been moved, or is temporarily unavailable.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link to="/feed" className="btn btn-primary">
            <Home size={16} /> Return to Feed
          </Link>
          <Link to="/jobs" className="btn btn-secondary">
            <Briefcase size={16} /> Explore Tech Jobs
          </Link>
        </div>
      </div>
    </div>
  );
};
