import React, { useState } from 'react';
import {
  Shield,
  Users,
  Briefcase,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  Check,
  Ban
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export const AdminDashboardPage = () => {
  const { currentUser } = useAuth();
  const { jobs, reports, resolveReport, deleteJob } = useData();

  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'moderation' | 'reports' | 'activity'
  const [userSearch, setUserSearch] = useState('');

  const [usersList, setUsersList] = useState([
    { id: 'u-1', name: 'Sarah Jenkins', email: 'sarah.jenkins@example.com', role: 'talent', status: 'Active', joined: 'Jan 2024' },
    { id: 'u-2', name: 'David Vance', email: 'david.vance@cloudscale.io', role: 'recruiter', status: 'Active', joined: 'Mar 2024' },
    { id: 'u-3', name: 'Eleanor Vance', email: 'admin@hirelynk.com', role: 'admin', status: 'Active', joined: 'Oct 2023' },
    { id: 'u-4', name: 'Marcus Chen', email: 'marcus.chen@example.com', role: 'talent', status: 'Active', joined: 'Feb 2024' },
    { id: 'u-5', name: 'Priya Sharma', email: 'priya.sharma@example.com', role: 'talent', status: 'Active', joined: 'Apr 2024' },
    { id: 'u-6', name: 'Suspicious Recruiter Inc', email: 'spam@fakejobs.net', role: 'recruiter', status: 'Suspended', joined: 'Yesterday' }
  ]);

  const toggleUserStatus = (userId) => {
    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newStatus = u.status === 'Active' ? 'Suspended' : 'Active';
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  const filteredUsers = usersList.filter((u) => {
    if (!userSearch.trim()) return true;
    const q = userSearch.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.includes(q);
  });

  return (
    <div className="container" style={{ paddingTop: 20 }}>
      {/* Admin Header */}
      <div
        className="lynk-card"
        style={{
          padding: 24,
          background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
          color: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          marginBottom: 24
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span className="badge badge-purple">
                <Shield size={13} /> Platform Administrator Console
              </span>
              <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>HireLynk Core v2.4</span>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Platform Trust & Operations</h1>
            <p style={{ opacity: 0.85, fontSize: '0.92rem', marginTop: 4 }}>
              Oversee user verification, job moderation, and system activity logs.
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Signed in as Administrator</div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: '#38bdf8' }}>{currentUser?.name || 'Eleanor Vance'}</div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div className="lynk-card" style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: '#e8f2fc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0066cc' }}>
            <Users size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy-900)' }}>150,420</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Registered Users</div>
          </div>
        </div>

        <div className="lynk-card" style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
            <Briefcase size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy-900)' }}>{jobs.length + 1240}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Job Postings</div>
          </div>
        </div>

        <div className="lynk-card" style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6' }}>
            <TrendingUp size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy-900)' }}>42,890</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Applications Processed</div>
          </div>
        </div>

        <div className="lynk-card" style={{ padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
            <DollarSign size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy-900)' }}>$842,500</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Monthly Platform MRR</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        <button
          className={`tab-pill-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          User Management ({usersList.length})
        </button>
        <button
          className={`tab-pill-btn ${activeTab === 'moderation' ? 'active' : ''}`}
          onClick={() => setActiveTab('moderation')}
        >
          Job Moderation ({jobs.length})
        </button>
        <button
          className={`tab-pill-btn ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          Flagged Reports ({reports.length})
        </button>
        <button
          className={`tab-pill-btn ${activeTab === 'activity' ? 'active' : ''}`}
          onClick={() => setActiveTab('activity')}
        >
          System Logs
        </button>
      </div>

      {/* Tab 1: Users */}
      {activeTab === 'users' && (
        <div className="lynk-card" style={{ padding: 20, overflowX: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ position: 'relative', width: 280 }}>
              <Search size={16} style={{ position: 'absolute', left: 10, top: 10, color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search user name or email..."
                className="form-input"
                style={{ paddingLeft: 34, paddingRight: 10, paddingTop: 6, paddingBottom: 6, fontSize: '0.85rem' }}
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
              />
            </div>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Showing {filteredUsers.length} verified accounts
            </span>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 640 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-subtle)', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 14px' }}>Name & Email</th>
                <th style={{ padding: '12px 14px' }}>Role</th>
                <th style={{ padding: '12px 14px' }}>Joined</th>
                <th style={{ padding: '12px 14px' }}>Status</th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id} style={{ borderBottom: '1px solid var(--border-subtle)', fontSize: '0.88rem' }}>
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ fontWeight: 700, color: 'var(--navy-900)' }}>{u.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{u.email}</div>
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span className={`badge ${u.role === 'admin' ? 'badge-purple' : u.role === 'recruiter' ? 'badge-amber' : 'badge-primary'}`}>
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>{u.joined}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span className={`badge ${u.status === 'Active' ? 'badge-green' : 'badge-amber'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                    <button
                      onClick={() => toggleUserStatus(u.id)}
                      className={`btn btn-sm ${u.status === 'Active' ? 'btn-danger' : 'btn-secondary'}`}
                      style={{ fontSize: '0.78rem' }}
                    >
                      {u.status === 'Active' ? 'Suspend' : 'Reactivate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Job Moderation */}
      {activeTab === 'moderation' && (
        <div className="lynk-card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 14 }}>
            Active Jobs for Review & Quality Assurance
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {jobs.map((job) => (
              <div
                key={job.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <img src={job.companyLogo} alt="" style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.94rem' }}>{job.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {job.company} • {job.location} • {job.salary}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <span className="badge badge-green">Verified Quality</span>
                  <button
                    onClick={() => deleteJob(job.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Remove Listing
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Reports */}
      {activeTab === 'reports' && (
        <div className="lynk-card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 14 }}>
            Community Flagged Reports Queue
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {reports.map((rep) => (
              <div
                key={rep.id}
                style={{
                  padding: 16,
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-subtle)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span className="badge badge-amber" style={{ marginBottom: 6 }}>
                      {rep.type} Report
                    </span>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                      {rep.reportedItem}
                    </h4>
                    <p style={{ fontSize: '0.84rem', color: 'var(--navy-700)', marginTop: 4 }}>
                      Reason: "{rep.reason}" • Reported by {rep.reportedBy} on {rep.date}
                    </p>
                  </div>

                  <span className={`badge ${rep.status.includes('Resolved') ? 'badge-green' : 'badge-amber'}`}>
                    {rep.status}
                  </span>
                </div>

                {!rep.status.includes('Resolved') && (
                  <div style={{ display: 'flex', gap: 8, marginTop: 12, justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => resolveReport(rep.id, 'Dismissed / False Flag')}
                      className="btn btn-secondary btn-sm"
                    >
                      Dismiss Report
                    </button>
                    <button
                      onClick={() => resolveReport(rep.id, 'Sanctioned & Removed')}
                      className="btn btn-danger btn-sm"
                    >
                      Remove Item & Penalize User
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: System Logs */}
      {activeTab === 'activity' && (
        <div className="lynk-card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 14 }}>
            Platform Audit Trail (Last 24 Hours)
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
            <div style={{ padding: '8px 12px', background: 'var(--bg-hover)', borderRadius: '4px' }}>
              [2026-10-21 12:15:02] AUTH_SUCCESS: user-1 (Sarah Jenkins) session authenticated.
            </div>
            <div style={{ padding: '8px 12px', background: 'var(--bg-hover)', borderRadius: '4px' }}>
              [2026-10-21 11:45:18] ATS_APPLICATION: cand-1 applied to job-1 (Senior Frontend Engineer).
            </div>
            <div style={{ padding: '8px 12px', background: 'var(--bg-hover)', borderRadius: '4px' }}>
              [2026-10-21 10:30:45] JOB_POST: recruiter-2 created job-5 (Full Stack Engineer).
            </div>
            <div style={{ padding: '8px 12px', background: 'var(--bg-hover)', borderRadius: '4px' }}>
              [2026-10-21 09:12:00] SECURITY_SCAN: automated certificate inspection 100% passed.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
