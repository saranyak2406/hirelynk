import React from 'react';
import { Bookmark, MapPin, DollarSign, Clock, Users, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const JobCard = ({ job, isSelected, onSelect }) => {
  const { savedJobIds, appliedJobIds, toggleSaveJob } = useData();

  const isSaved = savedJobIds.includes(job.id);
  const isApplied = appliedJobIds.includes(job.id);

  return (
    <div
      onClick={onSelect}
      className={`lynk-card job-card-item ${isSelected ? 'selected' : ''}`}
    >
      <div className="job-card-header">
        <img
          src={job.companyLogo}
          alt={job.company}
          className="job-card-logo"
        />
        <div className="job-card-info">
          <div className="job-card-top-row">
            <h4 className="job-card-title">{job.title}</h4>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSaveJob(job.id);
              }}
              className="btn-icon job-save-btn"
              title={isSaved ? 'Remove from saved' : 'Save job'}
            >
              <Bookmark
                size={18}
                fill={isSaved ? '#0066cc' : 'none'}
                color={isSaved ? '#0066cc' : 'var(--text-muted)'}
              />
            </button>
          </div>

          <div className="job-card-company">{job.company}</div>

          <div className="job-card-meta">
            <span className="meta-tag">
              <MapPin size={13} /> {job.location}
            </span>
            <span className={`badge ${
              job.workMode === 'Remote'
                ? 'badge-green'
                : job.workMode === 'Hybrid'
                ? 'badge-primary'
                : 'badge-outline'
            }`}>
              {job.workMode}
            </span>
          </div>

          <div className="job-card-salary-row">
            <span className="job-card-salary">
              <DollarSign size={13} /> {job.salary}
            </span>
          </div>

          {/* Skills pills */}
          <div className="job-card-skills">
            {job.skills?.slice(0, 3).map((skill, idx) => (
              <span key={idx} className="badge badge-outline">
                {skill}
              </span>
            ))}
            {job.skills?.length > 3 && (
              <span className="badge badge-outline">
                +{job.skills.length - 3}
              </span>
            )}
          </div>

          {/* Footer of card */}
          <div className="job-card-footer">
            <span className="posted-time">
              <Clock size={12} /> {job.postedDate}
            </span>
            {isApplied ? (
              <span className="applied-pill">
                <CheckCircle2 size={13} /> Applied
              </span>
            ) : (
              <span className="applicants-count">
                <Users size={12} /> {job.applicantsCount} applicants
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
