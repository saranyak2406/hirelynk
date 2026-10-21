import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  UserCheck,
  UserPlus,
  MessageSquare,
  Search,
  Check,
  X,
  Building,
  Calendar,
  Sparkles,
  Trash2
} from 'lucide-react';
import { useData } from '../context/DataContext';
import './Network.css';

export const NetworkPage = () => {
  const {
    connections,
    suggestions,
    requests,
    acceptConnectionRequest,
    rejectConnectionRequest,
    sendConnectionRequest,
    removeConnection,
    startOrOpenConversation
  } = useData();

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'connections'
  const [connectionSearch, setConnectionSearch] = useState('');
  const navigate = useNavigate();

  const handleMessage = (conn) => {
    startOrOpenConversation({
      id: conn.userId,
      name: conn.name,
      headline: conn.headline,
      avatar: conn.avatar
    });
    navigate('/messaging');
  };

  const filteredConnections = connections.filter((c) => {
    if (!connectionSearch.trim()) return true;
    const q = connectionSearch.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.headline.toLowerCase().includes(q);
  });

  return (
    <div className="container" style={{ paddingTop: 20 }}>
      <div className="network-grid">
        {/* Left Sidebar: Manage Network */}
        <aside className="network-sidebar">
          <div className="lynk-card network-manage-card">
            <h3 className="manage-title">Manage My Network</h3>
            <div className="manage-list">
              <button
                className={`manage-item ${activeTab === 'connections' ? 'active' : ''}`}
                onClick={() => setActiveTab('connections')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Users size={18} color="var(--primary)" />
                  <span>Connections</span>
                </div>
                <span className="manage-count">{connections.length + 840}</span>
              </button>

              <button
                className={`manage-item ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <UserPlus size={18} color="#10b981" />
                  <span>Pending Requests</span>
                </div>
                <span className="manage-count">{requests.length}</span>
              </button>

              <div className="manage-item" style={{ cursor: 'default' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Building size={18} color="#8b5cf6" />
                  <span>Companies Followed</span>
                </div>
                <span className="manage-count">24</span>
              </div>

              <div className="manage-item" style={{ cursor: 'default' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Calendar size={18} color="#f59e0b" />
                  <span>Tech Events</span>
                </div>
                <span className="manage-count">6</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="network-main">
          {activeTab === 'all' && (
            <>
              {/* Pending Invitations Section */}
              {requests.length > 0 && (
                <div className="lynk-card network-section-card" style={{ marginBottom: 20 }}>
                  <div className="section-card-header">
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                      Invitations ({requests.length})
                    </h3>
                  </div>

                  <div className="invitations-list">
                    {requests.map((req) => (
                      <div key={req.id} className="invitation-item">
                        <img
                          src={req.avatar}
                          alt={req.name}
                          className="avatar avatar-md"
                        />
                        <div className="invitation-info">
                          <div className="invitation-name">{req.name}</div>
                          <div className="invitation-headline">{req.headline}</div>
                          <div className="invitation-mutual">
                            <Users size={12} /> {req.mutualCount} mutual connections • {req.receivedTime}
                          </div>
                          {req.note && (
                            <div className="invitation-note">
                              "{req.note}"
                            </div>
                          )}
                        </div>

                        <div className="invitation-actions">
                          <button
                            onClick={() => rejectConnectionRequest(req.id)}
                            className="btn btn-ghost btn-sm"
                          >
                            Ignore
                          </button>
                          <button
                            onClick={() => acceptConnectionRequest(req.id)}
                            className="btn btn-primary btn-sm"
                          >
                            <Check size={14} /> Accept
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* People You May Know Grid */}
              <div className="lynk-card network-section-card">
                <div className="section-card-header">
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy-900)' }}>
                      People You May Know in Tech
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Based on your role, skills, and industry network
                    </p>
                  </div>
                  <Sparkles size={16} color="var(--primary)" />
                </div>

                <div className="people-grid">
                  {suggestions.map((sug) => (
                    <div key={sug.id} className="lynk-card person-card">
                      <div className="person-card-banner" />
                      <div className="person-card-body">
                        <img
                          src={sug.avatar}
                          alt={sug.name}
                          className="avatar avatar-md person-avatar"
                        />
                        <div className="person-name">{sug.name}</div>
                        <div className="person-headline">{sug.headline}</div>
                        <div className="person-mutual">
                          <Users size={12} /> {sug.mutualCount} mutual connections
                        </div>
                        <button
                          onClick={() => sendConnectionRequest(sug.id)}
                          className="btn btn-secondary btn-sm person-connect-btn"
                        >
                          <UserPlus size={14} /> Connect
                        </button>
                      </div>
                    </div>
                  ))}

                  {suggestions.length === 0 && (
                    <div style={{ gridColumn: '1 / -1', padding: 36, textAlign: 'center', color: 'var(--text-muted)' }}>
                      You're connected with all top suggested professionals in your region!
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Active Connections Tab */}
          {activeTab === 'connections' && (
            <div className="lynk-card network-section-card">
              <div className="section-card-header">
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy-900)' }}>
                    My Active Connections ({connections.length})
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Manage and message your verified network peers
                  </p>
                </div>

                {/* Connection Search */}
                <div className="connection-search-wrap">
                  <Search size={15} color="var(--text-muted)" />
                  <input
                    type="text"
                    placeholder="Search by name or title..."
                    value={connectionSearch}
                    onChange={(e) => setConnectionSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="active-connections-list">
                {filteredConnections.map((conn) => (
                  <div key={conn.id} className="active-conn-item">
                    <img
                      src={conn.avatar}
                      alt={conn.name}
                      className="avatar avatar-md"
                    />
                    <div className="active-conn-info">
                      <div className="active-conn-name">{conn.name}</div>
                      <div className="active-conn-headline">{conn.headline}</div>
                      <div className="active-conn-date">Connected {conn.connectedDate}</div>
                    </div>

                    <div className="active-conn-actions">
                      <button
                        onClick={() => handleMessage(conn)}
                        className="btn btn-secondary btn-sm"
                      >
                        <MessageSquare size={14} /> Message
                      </button>
                      <button
                        onClick={() => removeConnection(conn.id)}
                        className="btn-icon"
                        title="Remove connection"
                      >
                        <Trash2 size={16} color="var(--text-muted)" />
                      </button>
                    </div>
                  </div>
                ))}

                {filteredConnections.length === 0 && (
                  <div style={{ padding: 36, textAlign: 'center', color: 'var(--text-muted)' }}>
                    No connections matched "{connectionSearch}"
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
