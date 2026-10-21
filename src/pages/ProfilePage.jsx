import React, { useState } from 'react';
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  Edit3,
  Plus,
  FileText,
  ExternalLink,
  Download,
  Upload,
  CheckCircle2,
  ThumbsUp,
  Share2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { AddExperienceModal } from '../components/profile/AddExperienceModal';
import { ResumeViewerModal } from '../components/profile/ResumeViewerModal';
import './Profile.css';

export const ProfilePage = () => {
  const { currentUser, updateProfile } = useAuth();

  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [addExperienceOpen, setAddExperienceOpen] = useState(false);
  const [resumeViewerOpen, setResumeViewerOpen] = useState(false);
  const [newSkillText, setNewSkillText] = useState('');
  const [showAddSkillInput, setShowAddSkillInput] = useState(false);

  const handleEndorseSkill = (skillIndex) => {
    const updatedSkills = (currentUser?.skills || []).map((s, idx) => {
      if (idx === skillIndex) {
        return { ...s, endorsements: (s.endorsements || 0) + 1 };
      }
      return s;
    });
    updateProfile({ skills: updatedSkills });
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillText.trim()) return;
    const updatedSkills = [...(currentUser?.skills || []), { name: newSkillText.trim(), endorsements: 1 }];
    updateProfile({ skills: updatedSkills });
    setNewSkillText('');
    setShowAddSkillInput(false);
  };

  const handleToggleOpenToWork = () => {
    updateProfile({ openToWork: !currentUser?.openToWork });
  };

  return (
    <div className="container" style={{ paddingTop: 20, maxWidth: 960 }}>
      {/* Profile Header Card */}
      <div className="lynk-card profile-main-card">
        {/* Cover Banner */}
        <div
          className="profile-cover-banner"
          style={{
            backgroundImage: `url(${currentUser?.coverImage || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&auto=format&fit=crop&q=80'})`
          }}
        />

        {/* Profile Info Row */}
        <div className="profile-info-content">
          <div className="profile-avatar-row">
            <div className="profile-avatar-wrapper">
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="avatar avatar-xl profile-main-avatar"
              />
            </div>
            <div className="profile-top-actions">
              <button
                onClick={() => setEditProfileOpen(true)}
                className="btn btn-secondary btn-sm"
              >
                <Edit3 size={15} /> Edit Profile
              </button>
            </div>
          </div>

          <div className="profile-names-block">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h1 className="profile-full-name">{currentUser?.name}</h1>
              <span className="badge badge-primary">
                <CheckCircle2 size={13} /> Verified
              </span>
            </div>
            <p className="profile-headline-text">{currentUser?.headline}</p>
            <div className="profile-location-line">
              <span><MapPin size={14} /> {currentUser?.location}</span>
              <span>•</span>
              <a href="#contact" onClick={(e) => { e.preventDefault(); alert(`Contact Info:\nEmail: ${currentUser?.email}\nLocation: ${currentUser?.location}`); }} className="profile-contact-link">
                Contact Info
              </a>
              <span>•</span>
              <span style={{ color: 'var(--primary)', fontWeight: 600 }}>
                {currentUser?.connectionsCount || 842} connections
              </span>
            </div>
          </div>

          {/* Open to Work Banner */}
          <div className={`open-to-work-card ${currentUser?.openToWork ? 'active' : ''}`}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--navy-900)' }}>
                {currentUser?.openToWork ? 'Open to Work' : 'Passively Exploring'}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {currentUser?.openToWork
                  ? 'Recruiters see that you are actively interviewing for Senior roles'
                  : 'Your profile is hidden from active recruiter searches'}
              </div>
            </div>
            <button
              onClick={handleToggleOpenToWork}
              className={`btn btn-sm ${currentUser?.openToWork ? 'btn-danger' : 'btn-primary'}`}
            >
              {currentUser?.openToWork ? 'Turn Off' : 'Turn On Open to Work'}
            </button>
          </div>

          {/* Quick Buttons */}
          <div className="profile-quick-action-strip">
            <button onClick={() => setResumeViewerOpen(true)} className="btn btn-primary">
              <FileText size={16} /> Preview Resume
            </button>
            <button onClick={() => setAddExperienceOpen(true)} className="btn btn-secondary">
              <Plus size={16} /> Add Experience
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert('Profile link copied to clipboard!');
              }}
              className="btn btn-ghost"
            >
              <Share2 size={16} /> Share Profile
            </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="lynk-card profile-section-card" style={{ marginTop: 20 }}>
        <div className="section-title-row">
          <h2 className="profile-section-title">About</h2>
          <button onClick={() => setEditProfileOpen(true)} className="btn-icon" aria-label="Edit about">
            <Edit3 size={17} />
          </button>
        </div>
        <p className="profile-about-text">
          {currentUser?.about || 'Add an about summary to showcase your software craftsmanship and career goals.'}
        </p>
      </div>

      {/* Experience Section */}
      <div className="lynk-card profile-section-card" style={{ marginTop: 20 }}>
        <div className="section-title-row">
          <h2 className="profile-section-title">Experience</h2>
          <button onClick={() => setAddExperienceOpen(true)} className="btn-icon" title="Add Experience">
            <Plus size={20} />
          </button>
        </div>

        <div className="experience-items-list">
          {currentUser?.experience?.map((exp) => (
            <div key={exp.id} className="experience-item">
              <img
                src={exp.companyLogo}
                alt={exp.company}
                className="exp-company-logo"
              />
              <div className="exp-details">
                <div className="exp-title">{exp.title}</div>
                <div className="exp-company">{exp.company}</div>
                <div className="exp-dates">
                  {exp.startDate} - {exp.endDate} • {exp.location}
                </div>
                <p className="exp-description">{exp.description}</p>
              </div>
            </div>
          ))}

          {(!currentUser?.experience || currentUser?.experience.length === 0) && (
            <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              No experience entries yet. Click "+" to add your work history.
            </div>
          )}
        </div>
      </div>

      {/* Education Section */}
      <div className="lynk-card profile-section-card" style={{ marginTop: 20 }}>
        <div className="section-title-row">
          <h2 className="profile-section-title">Education</h2>
        </div>

        <div className="experience-items-list">
          {currentUser?.education?.map((edu) => (
            <div key={edu.id} className="experience-item">
              <div className="edu-icon-box">
                <GraduationCap size={24} color="#0066cc" />
              </div>
              <div className="exp-details">
                <div className="exp-title">{edu.school}</div>
                <div className="exp-company">{edu.degree}</div>
                <div className="exp-dates">{edu.startDate} - {edu.endDate}</div>
                {edu.activities && <div className="exp-description">{edu.activities}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills & Endorsements Section */}
      <div className="lynk-card profile-section-card" style={{ marginTop: 20 }}>
        <div className="section-title-row">
          <h2 className="profile-section-title">Skills & Endorsements</h2>
          <button
            onClick={() => setShowAddSkillInput((prev) => !prev)}
            className="btn btn-secondary btn-sm"
          >
            <Plus size={14} /> Add Skill
          </button>
        </div>

        {showAddSkillInput && (
          <form onSubmit={handleAddSkill} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <input
              type="text"
              placeholder="e.g. Docker, GraphQL, Kubernetes..."
              className="form-input"
              value={newSkillText}
              onChange={(e) => setNewSkillText(e.target.value)}
              autoFocus
            />
            <button type="submit" className="btn btn-primary btn-sm">
              Add
            </button>
          </form>
        )}

        <div className="skills-grid-endorsements">
          {currentUser?.skills?.map((skill, idx) => (
            <div key={idx} className="skill-endorse-pill">
              <div className="skill-endorse-info">
                <span className="skill-name">{skill.name}</span>
                <span className="endorse-badge">
                  {skill.endorsements} endorsements
                </span>
              </div>
              <button
                onClick={() => handleEndorseSkill(idx)}
                className="btn-icon endorse-action-btn"
                title="Endorse this skill"
              >
                <ThumbsUp size={14} color="#0066cc" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Projects Section */}
      {currentUser?.projects && (
        <div className="lynk-card profile-section-card" style={{ marginTop: 20 }}>
          <div className="section-title-row">
            <h2 className="profile-section-title">Featured Projects</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
            {currentUser?.projects.map((proj) => (
              <div key={proj.id} className="project-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h4 style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                    {proj.name}
                  </h4>
                  <a href={proj.link} target="_blank" rel="noreferrer" className="btn-icon">
                    <ExternalLink size={15} color="var(--primary)" />
                  </a>
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--navy-700)', marginTop: 6, lineHeight: 1.5 }}>
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resume Section */}
      <div className="lynk-card profile-section-card" style={{ marginTop: 20 }}>
        <div className="section-title-row">
          <h2 className="profile-section-title">Resume & Documents</h2>
        </div>

        <div className="resume-card-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div className="resume-pdf-icon">
              <FileText size={26} color="#0066cc" />
            </div>
            <div>
              <div className="resume-file-name">
                {currentUser?.resume?.fileName || `${currentUser?.name}_Resume.pdf`}
              </div>
              <div className="resume-meta">
                Updated {currentUser?.resume?.uploadDate || 'October 2026'} • {currentUser?.resume?.size || '245 KB'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={() => setResumeViewerOpen(true)}
              className="btn btn-secondary btn-sm"
            >
              Preview
            </button>
            <button
              onClick={() => alert('Downloading resume PDF...')}
              className="btn btn-primary btn-sm"
            >
              <Download size={14} /> Download
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditProfileModal
        isOpen={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
      />
      <AddExperienceModal
        isOpen={addExperienceOpen}
        onClose={() => setAddExperienceOpen(false)}
      />
      <ResumeViewerModal
        isOpen={resumeViewerOpen}
        onClose={() => setResumeViewerOpen(false)}
      />
    </div>
  );
};
