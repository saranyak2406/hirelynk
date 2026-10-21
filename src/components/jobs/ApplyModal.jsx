import React, { useState } from 'react';
import { FileText, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { Modal } from '../common/Modal';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const ApplyModal = ({ job, isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { applyToJob } = useData();

  const [experienceYears, setExperienceYears] = useState('5+ years');
  const [coverNote, setCoverNote] = useState('');
  const [selectedResume, setSelectedResume] = useState(
    currentUser?.resume?.fileName || 'Sarah_Jenkins_Senior_Frontend_2026.pdf'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!job) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      applyToJob(job.id, {
        experienceYears,
        coverNote,
        resumeFileName: selectedResume
      });
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Apply to ${job.company}`}
      size="md"
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, width: '100%' }}>
          <button type="button" onClick={onClose} className="btn btn-ghost">
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="btn btn-primary"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        {/* Job Heading Summary */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, paddingBottom: 14, borderBottom: '1px solid var(--border-subtle)' }}>
          <img
            src={job.companyLogo}
            alt={job.company}
            style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
          />
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--navy-900)' }}>
              {job.title}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {job.company} • {job.location} ({job.workMode})
            </div>
          </div>
        </div>

        {/* Contact Info Review */}
        <div style={{ marginBottom: 16 }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: 8, color: 'var(--navy-800)' }}>
            Contact Info
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                value={currentUser?.name || ''}
                disabled
              />
            </div>
            <div>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={currentUser?.email || ''}
                disabled
              />
            </div>
          </div>
        </div>

        {/* Resume Selection */}
        <div style={{ marginBottom: 16 }}>
          <label className="form-label">Select Resume / CV</label>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 14px',
              border: '1.5px solid var(--primary)',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-light)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <FileText size={22} color="#0066cc" />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--navy-900)' }}>
                  {selectedResume}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Default profile resume • Updated Oct 2026
                </div>
              </div>
            </div>
            <span className="badge badge-primary">Selected</span>
          </div>

          <label
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.8rem',
              color: 'var(--primary)',
              fontWeight: 600,
              cursor: 'pointer',
              marginTop: 8
            }}
          >
            <Upload size={14} /> Upload a different resume (PDF / DOCX)
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setSelectedResume(e.target.files[0].name);
                }
              }}
            />
          </label>
        </div>

        {/* Experience Dropdown */}
        <div className="form-group">
          <label className="form-label">Relevant Years of Experience</label>
          <select
            className="form-select"
            value={experienceYears}
            onChange={(e) => setExperienceYears(e.target.value)}
          >
            <option value="1-2 years">1-2 years</option>
            <option value="3-4 years">3-4 years</option>
            <option value="5+ years">5+ years (Senior)</option>
            <option value="8+ years">8+ years (Lead / Staff)</option>
            <option value="10+ years">10+ years (Principal / Director)</option>
          </select>
        </div>

        {/* Cover Note */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">
            Message to Hiring Team / Cover Note <span style={{ color: 'var(--text-muted)' }}>(Optional)</span>
          </label>
          <textarea
            className="form-textarea"
            rows={3}
            placeholder="Briefly highlight why your background is a great match for this role..."
            value={coverNote}
            onChange={(e) => setCoverNote(e.target.value)}
          />
        </div>
      </form>
    </Modal>
  );
};
