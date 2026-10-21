import React, { useState } from 'react';
import { Users, MoreVertical, ArrowRight, Star } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { ApplicantDetailModal } from './ApplicantDetailModal';

export const ATSKanban = ({ selectedJobId = 'all' }) => {
  const { applicants, updateApplicantStage } = useData();
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const stages = [
    { key: 'Applied', label: 'Applied', color: '#64748b', bg: '#f1f5f9' },
    { key: 'Screening', label: 'Screening', color: '#0066cc', bg: '#e8f2fc' },
    { key: 'Interview', label: 'Interview', color: '#8b5cf6', bg: '#f5f3ff' },
    { key: 'Offered', label: 'Offered', color: '#10b981', bg: '#ecfdf5' },
    { key: 'Rejected', label: 'Archived', color: '#ef4444', bg: '#fef2f2' }
  ];

  const filteredApplicants = selectedJobId === 'all'
    ? applicants
    : applicants.filter((a) => a.jobId === selectedJobId);

  return (
    <div className="ats-kanban-root">
      <div className="ats-columns-grid">
        {stages.map((stg) => {
          const list = filteredApplicants.filter((a) => a.stage === stg.key);

          return (
            <div key={stg.key} className="ats-column">
              {/* Column Header */}
              <div className="ats-col-header" style={{ borderTop: `3px solid ${stg.color}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="ats-col-title">{stg.label}</span>
                  <span
                    className="ats-col-badge"
                    style={{ background: stg.bg, color: stg.color }}
                  >
                    {list.length}
                  </span>
                </div>
              </div>

              {/* Column Cards */}
              <div className="ats-col-cards">
                {list.map((cand) => (
                  <div
                    key={cand.id}
                    className="lynk-card ats-candidate-card"
                    onClick={() => setSelectedApplicant(cand)}
                  >
                    <div className="cand-top-row">
                      <img
                        src={cand.candidateAvatar}
                        alt={cand.candidateName}
                        className="avatar avatar-sm"
                      />
                      <div className="cand-name-box">
                        <div className="cand-name">{cand.candidateName}</div>
                        <div className="cand-title">{cand.jobTitle}</div>
                      </div>
                    </div>

                    <div className="cand-sub-info">
                      <span>{cand.location}</span>
                      <span>•</span>
                      <span>{cand.appliedDate}</span>
                    </div>

                    {/* Move stage quick actions */}
                    <div
                      className="cand-actions-row"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <select
                        value={cand.stage}
                        onChange={(e) => updateApplicantStage(cand.id, e.target.value)}
                        className="cand-stage-select"
                      >
                        {stages.map((s) => (
                          <option key={s.key} value={s.key}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}

                {list.length === 0 && (
                  <div className="ats-col-empty">
                    No candidates in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      <ApplicantDetailModal
        applicant={selectedApplicant}
        isOpen={!!selectedApplicant}
        onClose={() => setSelectedApplicant(null)}
      />
    </div>
  );
};
