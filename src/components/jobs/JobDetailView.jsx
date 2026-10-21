import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bookmark,
  Share2,
  MapPin,
  Briefcase,
  DollarSign,
  Users,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Building
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { ApplyModal } from './ApplyModal';

export const JobDetailView = ({ job }) => {
  const { savedJobIds, appliedJobIds, toggleSaveJob, startOrOpenConversation } = useData();
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const navigate = useNavigate();

  if (!job) {
    return (
      <div className="lynk-card job-detail-empty">
        <Briefcase size={44} color="var(--text-light)" />
        <h3>Select a job to view details</h3>
        <p>Choose any job on the left to see full responsibilities, compensation, and apply directly.</p>
      </div>
    );
  }

  const isSaved = savedJobIds.includes(job.id);
  const isApplied = appliedJobIds.includes(job.id);

  const handleMessageRecruiter = () => {
    const recruiterUser = {
      id: 'user-2',
      name: 'David Vance',
      headline: 'Head of Technical Talent Acquisition @ CloudScale AI',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    };
    startOrOpenConversation(recruiterUser);
    navigate('/messaging');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.origin + `/jobs?id=${job.id}`);
    alert('Job link copied to clipboard!');
  };

  return (
    <div className="lynk-card job-detail-card">
      {/* Top Banner & Header */}
      <div className="job-detail-header">
        <div className="job-detail-brand-row">
          <img
            src={job.companyLogo}
            alt={job.company}
            className="job-detail-logo"
          />
          <div className="job-detail-title-box">
            <h2 className="job-detail-title">{job.title}</h2>
            <div className="job-detail-company-line">
              <span className="job-company-link">{job.company}</span>
              <span>•</span>
              <span className="job-detail-loc">
                <MapPin size={14} /> {job.location}
              </span>
              <span>•</span>
              <span className="job-detail-time">{job.postedDate}</span>
            </div>
          </div>
        </div>

        {/* Badges strip */}
        <div className="job-detail-badges">
          <span className={`badge ${
            job.workMode === 'Remote' ? 'badge-green' : job.workMode === 'Hybrid' ? 'badge-primary' : 'badge-outline'
          }`}>
            {job.workMode}
          </span>
          <span className="badge badge-outline">
            <Briefcase size={12} /> {job.type}
          </span>
          <span className="badge badge-outline">
            <DollarSign size={12} /> {job.salary}
          </span>
          <span className="badge badge-outline">
            <Users size={12} /> {job.applicantsCount} applicants
          </span>
        </div>

        {/* Primary Action Buttons */}
        <div className="job-detail-actions">
          {isApplied ? (
            <button className="btn btn-secondary" disabled>
              <CheckCircle2 size={18} color="#10b981" /> Application Submitted
            </button>
          ) : (
            <button
              onClick={() => setApplyModalOpen(true)}
              className="btn btn-primary btn-lg"
            >
              Easy Apply with HireLynk
            </button>
          )}

          <button
            onClick={() => toggleSaveJob(job.id)}
            className="btn btn-secondary"
          >
            <Bookmark
              size={17}
              fill={isSaved ? '#0066cc' : 'none'}
              color={isSaved ? '#0066cc' : 'currentColor'}
            />
            {isSaved ? 'Saved' : 'Save'}
          </button>

          <button onClick={handleShare} className="btn btn-ghost btn-icon" title="Share Job">
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* Detail Body Content */}
      <div className="job-detail-body">
        {/* Recruiter / Hiring Team spotlight */}
        <div className="hiring-team-card">
          <div className="hiring-team-header">
            <Sparkles size={16} color="#0066cc" />
            <span>Meet the hiring team</span>
          </div>
          <div className="hiring-team-member">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              alt="David Vance"
              className="avatar avatar-md"
            />
            <div className="hiring-member-info">
              <div className="hiring-member-name">David Vance</div>
              <div className="hiring-member-title">Head of Technical Talent Acquisition</div>
              <div className="hiring-member-sub">Job poster • Usually responds within 24 hours</div>
            </div>
            <button
              onClick={handleMessageRecruiter}
              className="btn btn-secondary btn-sm"
            >
              <MessageSquare size={14} /> Send InMail
            </button>
          </div>
        </div>

        {/* About Job */}
        <section className="job-section">
          <h3 className="section-title">About the Role</h3>
          <p className="job-description-text">{job.description}</p>
        </section>

        {/* Key Responsibilities */}
        {job.responsibilities && (
          <section className="job-section">
            <h3 className="section-title">What You'll Do</h3>
            <ul className="bullet-list">
              {job.responsibilities.map((resp, idx) => (
                <li key={idx}>{resp}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Requirements */}
        {job.requirements && (
          <section className="job-section">
            <h3 className="section-title">What You'll Bring</h3>
            <ul className="bullet-list">
              {job.requirements.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Skills */}
        <section className="job-section">
          <h3 className="section-title">Required Skills & Expertise</h3>
          <div className="skills-chips-row">
            {job.skills?.map((skill, idx) => (
              <span key={idx} className="badge badge-primary" style={{ padding: '6px 12px', fontSize: '0.82rem' }}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Benefits */}
        {job.benefits && (
          <section className="job-section">
            <h3 className="section-title">Benefits & Perks</h3>
            <ul className="bullet-list">
              {job.benefits.map((benefit, idx) => (
                <li key={idx}>{benefit}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* Apply Modal */}
      <ApplyModal
        job={job}
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
      />
    </div>
  );
};
