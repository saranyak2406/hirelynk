import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Users, Eye, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const FeedLeftSidebar = () => {
  const { currentUser } = useAuth();
  const { savedJobIds, connections } = useData();

  return (
    <aside className="feed-left-sidebar">
      {/* Profile Card */}
      <div className="lynk-card feed-profile-card">
        <div
          className="feed-profile-banner"
          style={{
            backgroundImage: `url(${currentUser?.coverImage || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&auto=format&fit=crop&q=80'})`
          }}
        />
        <div className="feed-profile-body">
          <Link to="/profile" className="feed-avatar-link">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
              alt={currentUser?.name}
              className="avatar avatar-md feed-profile-avatar"
            />
          </Link>
          <Link to="/profile" className="feed-profile-name">
            {currentUser?.name}
          </Link>
          <p className="feed-profile-headline">{currentUser?.headline}</p>

          {currentUser?.openToWork && (
            <div className="feed-opentowork-pill">
              <span className="live-dot" />
              <span>Open to Opportunities</span>
            </div>
          )}
        </div>

        <div className="feed-profile-stats">
          <Link to="/profile" className="stat-row">
            <span className="stat-label">
              <Eye size={14} /> Profile viewers
            </span>
            <span className="stat-value">{currentUser?.profileViews || 412}</span>
          </Link>
          <Link to="/network" className="stat-row">
            <span className="stat-label">
              <Users size={14} /> Connections
            </span>
            <span className="stat-value">{connections.length + 840}</span>
          </Link>
        </div>

        <div className="feed-profile-footer">
          <Link to="/jobs?tab=saved" className="saved-items-link">
            <Bookmark size={15} />
            <span>Saved Jobs & Posts ({savedJobIds.length})</span>
          </Link>
        </div>
      </div>

      {/* Topics & Discover Card */}
      <div className="lynk-card feed-topics-card" style={{ marginTop: 16, padding: '16px' }}>
        <div className="feed-card-header">
          <span style={{ fontWeight: 700, fontSize: '0.86rem', color: 'var(--navy-900)' }}>
            Trending Tech Tags
          </span>
          <Sparkles size={14} color="#0066cc" />
        </div>
        <div className="feed-tags-list">
          {['#React19', '#NextJS', '#SystemDesign', '#CloudNative', '#GenerativeAI', '#TechSalaries'].map(
            (tag) => (
              <Link
                key={tag}
                to={`/jobs?q=${encodeURIComponent(tag.replace('#', ''))}`}
                className="feed-tag-pill"
              >
                {tag}
              </Link>
            )
          )}
        </div>
      </div>
    </aside>
  );
};
