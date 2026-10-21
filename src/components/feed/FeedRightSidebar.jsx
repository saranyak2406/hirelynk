import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, UserPlus, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { TRENDING_NEWS } from '../../data/initialData';
import { useData } from '../../context/DataContext';

export const FeedRightSidebar = () => {
  const { suggestions, sendConnectionRequest } = useData();
  const [expandedNews, setExpandedNews] = useState(false);

  const displayedNews = expandedNews ? TRENDING_NEWS : TRENDING_NEWS.slice(0, 4);

  return (
    <aside className="feed-right-sidebar">
      {/* News & Industry Trends */}
      <div className="lynk-card feed-news-card">
        <div className="feed-card-header" style={{ padding: '16px 16px 12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <TrendingUp size={17} color="#0066cc" />
            <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--navy-900)' }}>
              HireLynk News & Trends
            </h3>
          </div>
        </div>

        <div className="feed-news-list">
          {displayedNews.map((item) => (
            <div key={item.id} className="news-item">
              <span className="news-bullet">•</span>
              <div className="news-content">
                <a href="#news" className="news-title">
                  {item.title}
                </a>
                <div className="news-meta">
                  <span>{item.time}</span>
                  <span>•</span>
                  <span>{item.readers}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setExpandedNews((prev) => !prev)}
          className="news-expand-btn"
        >
          {expandedNews ? (
            <>
              Show less <ChevronUp size={14} />
            </>
          ) : (
            <>
              Show more trends <ChevronDown size={14} />
            </>
          )}
        </button>
      </div>

      {/* Suggested Connections Widget */}
      <div className="lynk-card feed-suggestions-card" style={{ marginTop: 16 }}>
        <div className="feed-card-header" style={{ padding: '16px 16px 12px' }}>
          <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--navy-900)' }}>
            Suggested For You
          </h3>
          <Link
            to="/network"
            style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 600 }}
          >
            See all
          </Link>
        </div>

        <div className="suggestions-list" style={{ padding: '0 16px 16px' }}>
          {suggestions.slice(0, 3).map((sug) => (
            <div key={sug.id} className="mini-suggestion-item">
              <img
                src={sug.avatar}
                alt={sug.name}
                className="avatar avatar-sm"
              />
              <div className="mini-sug-info">
                <div className="mini-sug-name">{sug.name}</div>
                <div className="mini-sug-headline">{sug.headline}</div>
                <button
                  onClick={() => sendConnectionRequest(sug.id)}
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: 6, padding: '3px 10px', fontSize: '0.78rem' }}
                >
                  <UserPlus size={13} /> Connect
                </button>
              </div>
            </div>
          ))}

          {suggestions.length === 0 && (
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center', padding: '12px 0' }}>
              You're all caught up on recommendations!
            </div>
          )}
        </div>
      </div>

      {/* Mini Legal & Sticky Footer */}
      <div className="feed-mini-footer">
        <div className="mini-links">
          <Link to="/about">About</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/privacy">Privacy & Terms</Link>
          <Link to="/admin">Admin</Link>
        </div>
        <div className="mini-copyright">
          HireLynk Corporation © 2026
        </div>
      </div>
    </aside>
  );
};
