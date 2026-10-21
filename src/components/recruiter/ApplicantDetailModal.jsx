import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, MapPin, Calendar, FileText, Star, MessageSquare } from 'lucide-react';
import { Modal } from '../common/Modal';
import { useData } from '../../context/DataContext';
import { ResumeViewerModal } from '../profile/ResumeViewerModal';

export const ApplicantDetailModal = ({ applicant, isOpen, onClose }) => {
  const { updateApplicantStage, startOrOpenConversation } = useData();
  const [showResume, setShowResume] = useState(false);
  const navigate = useNavigate();

  if (!applicant) return null;

  const stages = ['Applied', 'Screening', 'Interview', 'Offered', 'Rejected'];

  const handleStageChange = (e) => {
    updateApplicantStage(applicant.id, e.target.value);
  };

  const handleMessage = () => {
    startOrOpenConversation({
      id: applicant.candidateId,
      name: applicant.candidateName,
      headline: applicant.candidateHeadline,
      avatar: applicant.candidateAvatar
    });
    onClose();
    navigate('/messaging');
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Candidate Application Review"
        size="md"
        footer={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <button
              onClick={() => setShowResume(true)}
              className="btn btn-secondary btn-sm"
            >
              <FileText size={15} /> Preview Resume
            </button>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={handleMessage} className="btn btn-primary btn-sm">
                <MessageSquare size={15} /> Message Candidate
              </button>
              <button onClick={onClose} className="btn btn-ghost btn-sm">
                Close
              </button>
            </div>
          </div>
        }
      >
        {/* Candidate Profile Header */}
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 16 }}>
          <img
            src={applicant.candidateAvatar}
            alt={applicant.candidateName}
            className="avatar avatar-lg"
          />
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy-900)' }}>
              {applicant.candidateName}
            </h3>
            <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>
              {applicant.candidateHeadline}
            </div>
            <div style={{ display: 'flex', gap: 12, fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4, flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <MapPin size={13} /> {applicant.location}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Mail size={13} /> {applicant.candidateEmail}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Calendar size={13} /> Applied {applicant.appliedDate}
              </span>
            </div>
          </div>
        </div>

        {/* Applied Position Info */}
        <div style={{ padding: 12, background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', marginBottom: 16, border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Applied Position
          </div>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--navy-900)', marginTop: 2 }}>
            {applicant.jobTitle}
          </div>
        </div>

        {/* Pipeline Stage Controller */}
        <div className="form-group">
          <label className="form-label">Update Hiring Pipeline Stage</label>
          <select
            className="form-select"
            value={applicant.stage}
            onChange={handleStageChange}
            style={{ fontWeight: 700, color: 'var(--primary)' }}
          >
            {stages.map((stg) => (
              <option key={stg} value={stg}>
                {stg}
              </option>
            ))}
          </select>
        </div>

        {/* Cover Note */}
        {applicant.coverNote && (
          <div style={{ marginBottom: 16 }}>
            <label className="form-label">Candidate Statement / Cover Note</label>
            <div
              style={{
                padding: '12px 14px',
                background: 'var(--bg-hover)',
                borderRadius: 'var(--radius-md)',
                fontStyle: 'italic',
                fontSize: '0.88rem',
                color: 'var(--navy-800)',
                lineHeight: 1.5
              }}
            >
              "{applicant.coverNote}"
            </div>
          </div>
        )}

        {/* Attached Document Summary */}
        <div>
          <label className="form-label">Attached Document</label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <FileText size={20} color="#0066cc" />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.86rem' }}>
                  {applicant.resumeFileName || 'Candidate_Resume.pdf'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Candidate CV • Verified format
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowResume(true)}
              className="btn btn-secondary btn-sm"
            >
              View Document
            </button>
          </div>
        </div>
      </Modal>

      {/* Resume Viewer */}
      <ResumeViewerModal
        isOpen={showResume}
        onClose={() => setShowResume(false)}
        candidate={{
          name: applicant.candidateName,
          email: applicant.candidateEmail,
          headline: applicant.candidateHeadline,
          location: applicant.location,
          about: applicant.coverNote,
          skills: ['React', 'TypeScript', 'System Design', 'Performance'],
          experience: [
            {
              id: 'exp-cand',
              title: applicant.candidateHeadline.split('|')[0] || 'Software Engineer',
              company: 'Leading Tech Company',
              location: applicant.location,
              startDate: '2021',
              endDate: 'Present',
              description: applicant.coverNote || 'Architected high availability cloud web services.'
            }
          ]
        }}
      />
    </>
  );
};
