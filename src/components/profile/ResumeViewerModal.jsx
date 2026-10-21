import React from 'react';
import { Download, Printer, CheckCircle2, FileText } from 'lucide-react';
import { Modal } from '../common/Modal';
import { useAuth } from '../../context/AuthContext';

export const ResumeViewerModal = ({ isOpen, onClose, candidate }) => {
  const { currentUser } = useAuth();
  const profile = candidate || currentUser;

  if (!profile) return null;

  const handleDownload = () => {
    alert(`Downloading ${profile.resume?.fileName || profile.name + '_Resume.pdf'}...`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Resume Preview - ${profile.name}`}
      size="lg"
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <FileText size={16} color="#0066cc" />
            <span>{profile.resume?.fileName || `${profile.name.replace(' ', '_')}_Resume_2026.pdf`}</span>
            <span>•</span>
            <span>Verified Candidate Document</span>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={handlePrint} className="btn btn-secondary btn-sm">
              <Printer size={15} /> Print
            </button>
            <button onClick={handleDownload} className="btn btn-primary btn-sm">
              <Download size={15} /> Download PDF
            </button>
          </div>
        </div>
      }
    >
      {/* Simulated Resume Paper */}
      <div
        style={{
          background: '#ffffff',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '28px',
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.02)',
          fontFamily: 'Inter, sans-serif'
        }}
      >
        {/* Header */}
        <div style={{ borderBottom: '2px solid var(--navy-900)', paddingBottom: '16px', marginBottom: '18px' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy-900)', letterSpacing: '-0.5px' }}>
            {profile.name}
          </h2>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary)', marginTop: 2 }}>
            {profile.headline}
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: 6 }}>
            <span>{profile.email}</span>
            <span>•</span>
            <span>{profile.location}</span>
            <span>•</span>
            <span>hirelynk.com/in/{profile.name.toLowerCase().replace(' ', '')}</span>
          </div>
        </div>

        {/* Executive Summary */}
        <div style={{ marginBottom: '18px' }}>
          <h4 style={{ fontSize: '0.88rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--navy-800)', marginBottom: 6 }}>
            Executive Summary
          </h4>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--navy-700)' }}>
            {profile.about || 'Versatile software specialist dedicated to crafting robust architecture and high-velocity web interfaces.'}
          </p>
        </div>

        {/* Skills */}
        <div style={{ marginBottom: '18px' }}>
          <h4 style={{ fontSize: '0.88rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--navy-800)', marginBottom: 6 }}>
            Core Skills & Proficiencies
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {profile.skills?.map((s, idx) => (
              <span
                key={idx}
                style={{
                  background: 'var(--bg-hover)',
                  border: '1px solid var(--border-subtle)',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--navy-900)'
                }}
              >
                {typeof s === 'string' ? s : s.name}
              </span>
            ))}
          </div>
        </div>

        {/* Professional Experience */}
        {profile.experience && profile.experience.length > 0 && (
          <div style={{ marginBottom: '18px' }}>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--navy-800)', marginBottom: 10 }}>
              Professional Experience
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {profile.experience.map((exp) => (
                <div key={exp.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--navy-900)' }}>
                      {exp.title} • <span style={{ color: 'var(--primary)' }}>{exp.company}</span>
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: 4 }}>
                    {exp.location}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--navy-700)', lineHeight: 1.5 }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {profile.education && profile.education.length > 0 && (
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--navy-800)', marginBottom: 8 }}>
              Education & Honors
            </h4>
            {profile.education.map((edu) => (
              <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--navy-900)' }}>{edu.school}</div>
                  <div style={{ color: 'var(--text-secondary)' }}>{edu.degree}</div>
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  {edu.startDate} - {edu.endDate}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};
