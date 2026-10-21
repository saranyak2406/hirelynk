import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Briefcase,
  Users,
  ThumbsUp,
  CheckCircle2,
  MessageSquare,
  Check,
  Trash2,
  Sparkles
} from 'lucide-react';
import { useData } from '../context/DataContext';

export const NotificationsPage = () => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification
  } = useData();

  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  const getIcon = (type) => {
    switch (type) {
      case 'job':
        return <Briefcase size={20} color="#0066cc" />;
      case 'connection':
        return <Users size={20} color="#10b981" />;
      case 'post':
        return <ThumbsUp size={20} color="#8b5cf6" />;
      case 'application':
        return <CheckCircle2 size={20} color="#0066cc" />;
      case 'message':
        return <MessageSquare size={20} color="#f59e0b" />;
      default:
        return <Bell size={20} color="#0066cc" />;
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === 'unread') return !n.read;
    if (activeFilter === 'jobs') return n.type === 'job';
    if (activeFilter === 'network') return n.type === 'connection';
    return true;
  });

  const handleNotificationClick = (notif) => {
    markNotificationRead(notif.id);
    if (notif.link) {
      navigate(notif.link);
    }
  };

  return (
    <div className="container" style={{ paddingTop: 20, maxWidth: 840 }}>
      <div className="lynk-card" style={{ padding: 24 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy-900)' }}>
              Notifications
            </h1>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Stay updated on job matches, connections, and applicant responses
            </p>
          </div>

          <button
            onClick={markAllNotificationsRead}
            className="btn btn-secondary btn-sm"
          >
            <Check size={14} /> Mark all as read
          </button>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}>
          {['all', 'unread', 'jobs', 'network'].map((filterKey) => (
            <button
              key={filterKey}
              onClick={() => setActiveFilter(filterKey)}
              className={`tab-pill-btn ${activeFilter === filterKey ? 'active' : ''}`}
              style={{ textTransform: 'capitalize' }}
            >
              {filterKey}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleNotificationClick(notif)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 16,
                padding: '16px 14px',
                borderBottom: '1px solid var(--border-subtle)',
                background: notif.read ? 'transparent' : 'var(--primary-light)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-full)',
                  background: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-xs)',
                  flexShrink: 0
                }}
              >
                {getIcon(notif.type)}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: notif.read ? 600 : 700, fontSize: '0.94rem', color: 'var(--navy-900)' }}>
                    {notif.title}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
                    {notif.timeAgo}
                  </span>
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--navy-700)', marginTop: 4, lineHeight: 1.4 }}>
                  {notif.message}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, alignSelf: 'center' }}>
                {!notif.read && (
                  <span
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: '50%',
                      background: 'var(--primary)',
                      display: 'block'
                    }}
                  />
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notif.id);
                  }}
                  className="btn-icon"
                  title="Dismiss notification"
                >
                  <Trash2 size={16} color="var(--text-light)" />
                </button>
              </div>
            </div>
          ))}

          {filteredNotifications.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-muted)' }}>
              <Bell size={40} color="var(--text-light)" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                You're all caught up!
              </h3>
              <p style={{ fontSize: '0.84rem', marginTop: 4 }}>
                No notifications found in this view.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
