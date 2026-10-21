import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Users,
  CheckCircle2,
  Plus,
  Search,
  Filter,
  Eye,
  Trash2,
  Sparkles,
  ExternalLink,
  MessageSquare,
  TrendingUp,
  Building
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { ATSKanban } from '../components/recruiter/ATSKanban';
import { PostJobModal } from '../components/recruiter/PostJobModal';
import '../components/recruiter/Recruiter.css';

export const RecruiterDashboardPage = () => {
  const { currentUser } = useAuth();
  const { jobs, applicants, deleteJob, updateJobStatus, startOrOpenConversation } = useData();

  const [activeTab, setActiveTab] = useState('pipeline'); // 'pipeline' | 'jobs' | 'talent'
  const [postJobModalOpen, setPostJobModalOpen] = useState(false);
  const [selectedJobFilter, setSelectedJobFilter] = useState('all');
  const [talentSearch, setTalentSearch] = useState('');
  const navigate = useNavigate();

  // Metrics
  const activeJobsCount = jobs.filter((j) => j.status === 'active').length;
  const totalApplicantsCount = applicants.length;
  const interviewCount = applicants.filter((a) => a.stage === 'Interview' || a.stage === 'Screening').length;
  const offersCount = applicants.filter((a) => a.stage === 'Offered').length;

  const mockTalentPool = [
    {
      id: 'cand-pool-1',
      name: 'Sarah Jenkins',
      headline: 'Senior Frontend Engineer | React 19 • TypeScript • Next.js',
      location: 'San Francisco, CA',
      skills: ['React', 'TypeScript', 'GraphQL', 'CSS Tokens'],
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      openToWork: true
    },
    {
      id: 'cand-pool-2',
      name: 'Marcus Chen',
      headline: 'Staff Machine Learning Engineer @ Anthropic | Distributed LLMs',
      location: 'Seattle, WA',
      skills: ['Python', 'PyTorch', 'Kubernetes', 'Ray'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      openToWork: false
    },
    {
      id: 'cand-pool-3',
      name: 'Priya Sharma',
      headline: 'Lead Product Designer @ Stripe | FinTech Design Systems',
      location: 'San Francisco, CA',
      skills: ['Figma', 'Design Systems', 'UX Research', 'Tokens'],
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      openToWork: true
    },
    {
      id: 'cand-pool-4',
      name: 'Alex Rivera',
      headline: 'Full Stack Engineer @ Airbnb | Node.js • React • Distributed Systems',
      location: 'Austin, TX',
      skills: ['Node.js', 'React', 'PostgreSQL', 'Microservices'],
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      openToWork: true
    }
  ];

  const filteredTalent = mockTalentPool.filter((t) => {
    if (!talentSearch.trim()) return true;
    const q = talentSearch.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.headline.toLowerCase().includes(q) ||
      t.skills.some((s) => s.toLowerCase().includes(q))
    );
  });

  const handleMessageCandidate = (cand) => {
    startOrOpenConversation(cand);
    navigate('/messaging');
  };

  return (
    <div className="container" style={{ paddingTop: 20 }}>
      {/* Recruiter Banner */}
      <div className="recruiter-hero-card">
        <div className="recruiter-hero-content">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span className="badge badge-amber">Recruiter & ATS Command Center</span>
              <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>• CloudScale AI</span>
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
              Welcome, {currentUser?.name || 'David Vance'}
            </h1>
            <p style={{ opacity: 0.88, fontSize: '0.92rem', marginTop: 4 }}>
              Track candidate pipelines, publish new positions, and engage qualified tech talent.
            </p>
          </div>

          <button
            onClick={() => setPostJobModalOpen(true)}
            className="btn btn-primary btn-lg"
            style={{ background: '#38bdf8', color: 'var(--navy-900)', fontWeight: 700 }}
          >
            <Plus size={18} /> Post a New Job
          </button>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="recruiter-stats-grid">
        <div className="lynk-card stat-metric-card">
          <div className="metric-icon-box" style={{ background: '#e8f2fc', color: '#0066cc' }}>
            <Briefcase size={24} />
          </div>
          <div>
            <div className="metric-number">{activeJobsCount}</div>
            <div className="metric-label">Active Job Postings</div>
          </div>
        </div>

        <div className="lynk-card stat-metric-card">
          <div className="metric-icon-box" style={{ background: '#ecfdf5', color: '#10b981' }}>
            <Users size={24} />
          </div>
          <div>
            <div className="metric-number">{totalApplicantsCount}</div>
            <div className="metric-label">Total Applicants</div>
          </div>
        </div>

        <div className="lynk-card stat-metric-card">
          <div className="metric-icon-box" style={{ background: '#f5f3ff', color: '#8b5cf6' }}>
            <Sparkles size={24} />
          </div>
          <div>
            <div className="metric-number">{interviewCount}</div>
            <div className="metric-label">In Screening / Interview</div>
          </div>
        </div>

        <div className="lynk-card stat-metric-card">
          <div className="metric-icon-box" style={{ background: '#fffbeb', color: '#f59e0b' }}>
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div className="metric-number">{offersCount}</div>
            <div className="metric-label">Offers Extended</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            className={`tab-pill-btn ${activeTab === 'pipeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('pipeline')}
          >
            ATS Candidate Pipeline ({applicants.length})
          </button>
          <button
            className={`tab-pill-btn ${activeTab === 'jobs' ? 'active' : ''}`}
            onClick={() => setActiveTab('jobs')}
          >
            Manage Job Listings ({jobs.length})
          </button>
          <button
            className={`tab-pill-btn ${activeTab === 'talent' ? 'active' : ''}`}
            onClick={() => setActiveTab('talent')}
          >
            Candidate Discovery
          </button>
        </div>

        {activeTab === 'pipeline' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Filter by Role:
            </span>
            <select
              value={selectedJobFilter}
              onChange={(e) => setSelectedJobFilter(e.target.value)}
              className="form-select"
              style={{ width: 'auto', padding: '6px 12px', fontSize: '0.82rem' }}
            >
              <option value="all">All Posted Roles ({applicants.length})</option>
              {jobs.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.title}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Tab 1: ATS Pipeline */}
      {activeTab === 'pipeline' && (
        <ATSKanban selectedJobId={selectedJobFilter} />
      )}

      {/* Tab 2: Manage Job Listings */}
      {activeTab === 'jobs' && (
        <div className="lynk-card" style={{ padding: 20, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 700 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-subtle)', fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 14px' }}>Job Title</th>
                <th style={{ padding: '12px 14px' }}>Location</th>
                <th style={{ padding: '12px 14px' }}>Work Mode</th>
                <th style={{ padding: '12px 14px' }}>Applicants</th>
                <th style={{ padding: '12px 14px' }}>Status</th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} style={{ borderBottom: '1px solid var(--border-subtle)', fontSize: '0.9rem' }}>
                  <td style={{ padding: '14px', fontWeight: 700, color: 'var(--navy-900)' }}>
                    {job.title}
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 400 }}>
                      Posted {job.postedDate}
                    </div>
                  </td>
                  <td style={{ padding: '14px', color: 'var(--text-secondary)' }}>{job.location}</td>
                  <td style={{ padding: '14px' }}>
                    <span className="badge badge-outline">{job.workMode}</span>
                  </td>
                  <td style={{ padding: '14px', fontWeight: 700, color: 'var(--primary)' }}>
                    {job.applicantsCount || 0}
                  </td>
                  <td style={{ padding: '14px' }}>
                    <button
                      onClick={() => updateJobStatus(job.id, job.status === 'active' ? 'closed' : 'active')}
                      className={`badge ${job.status === 'active' ? 'badge-green' : 'badge-outline'}`}
                      style={{ cursor: 'pointer' }}
                    >
                      {job.status === 'active' ? '● Active' : 'Closed'}
                    </button>
                  </td>
                  <td style={{ padding: '14px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => {
                          setSelectedJobFilter(job.id);
                          setActiveTab('pipeline');
                        }}
                        className="btn btn-secondary btn-sm"
                        style={{ fontSize: '0.78rem', padding: '4px 10px' }}
                      >
                        Applicants
                      </button>
                      <button
                        onClick={() => deleteJob(job.id)}
                        className="btn-icon"
                        title="Delete job"
                      >
                        <Trash2 size={16} color="var(--accent-red)" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Candidate Discovery */}
      {activeTab === 'talent' && (
        <div className="lynk-card" style={{ padding: 24 }}>
          {/* Search bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: 12, top: 11, color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search candidates by skills, headline, or location (e.g. React, PyTorch, Seattle)..."
                className="form-input"
                style={{ paddingLeft: 38 }}
                value={talentSearch}
                onChange={(e) => setTalentSearch(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 16 }}>
            {filteredTalent.map((cand) => (
              <div key={cand.id} className="lynk-card" style={{ padding: 18, border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <img src={cand.avatar} alt={cand.name} className="avatar avatar-md" />
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{cand.name}</span>
                      {cand.openToWork && (
                        <span className="badge badge-green" style={{ fontSize: '0.68rem' }}>
                          Open to Work
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '2px 0 6px', lineHeight: 1.25 }}>
                      {cand.headline}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
                      📍 {cand.location}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, margin: '12px 0' }}>
                  {cand.skills.map((s, i) => (
                    <span key={i} className="badge badge-outline" style={{ fontSize: '0.72rem' }}>
                      {s}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 10, borderTop: '1px solid var(--border-subtle)' }}>
                  <button
                    onClick={() => handleMessageCandidate(cand)}
                    className="btn btn-primary btn-sm"
                  >
                    <MessageSquare size={13} /> Reach Out InMail
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Post Job Modal */}
      <PostJobModal
        isOpen={postJobModalOpen}
        onClose={() => setPostJobModalOpen(false)}
      />
    </div>
  );
};
