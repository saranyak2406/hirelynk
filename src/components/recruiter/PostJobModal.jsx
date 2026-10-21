import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const PostJobModal = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { postNewJob } = useData();

  const [formData, setFormData] = useState({
    title: '',
    company: currentUser?.company || 'CloudScale AI',
    location: 'San Francisco, CA (Hybrid)',
    workMode: 'Hybrid',
    type: 'Full-time',
    experience: 'Senior (5+ yrs)',
    salary: '$150,000 - $190,000 / yr',
    skills: 'React, TypeScript, CSS, System Design',
    description: '',
    responsibilities: '',
    requirements: '',
    featured: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.company) return;

    const responsibilitiesArray = formData.responsibilities
      ? formData.responsibilities.split('\n').filter((l) => l.trim().length > 0)
      : undefined;

    const requirementsArray = formData.requirements
      ? formData.requirements.split('\n').filter((l) => l.trim().length > 0)
      : undefined;

    postNewJob({
      ...formData,
      responsibilities: responsibilitiesArray,
      requirements: requirementsArray
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create a New Job Listing"
      size="lg"
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, width: '100%' }}>
          <button type="button" onClick={onClose} className="btn btn-ghost">
            Cancel
          </button>
          <button type="button" onClick={handleSubmit} className="btn btn-primary">
            Publish Job Listing
          </button>
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="form-group">
            <label className="form-label">Job Title *</label>
            <input
              type="text"
              name="title"
              className="form-input"
              placeholder="e.g. Senior Frontend Engineer"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Hiring Company *</label>
            <input
              type="text"
              name="company"
              className="form-input"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
          <div className="form-group">
            <label className="form-label">Location</label>
            <input
              type="text"
              name="location"
              className="form-input"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Work Mode</label>
            <select
              name="workMode"
              className="form-select"
              value={formData.workMode}
              onChange={handleChange}
            >
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Onsite">Onsite</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Job Type</label>
            <select
              name="type"
              className="form-select"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="Full-time">Full-time</option>
              <option value="Contract">Contract</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="form-group">
            <label className="form-label">Experience Level</label>
            <input
              type="text"
              name="experience"
              className="form-input"
              placeholder="e.g. Senior (5+ yrs)"
              value={formData.experience}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Salary Range</label>
            <input
              type="text"
              name="salary"
              className="form-input"
              placeholder="e.g. $140,000 - $180,000 / yr"
              value={formData.salary}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Required Skills (Comma separated)</label>
          <input
            type="text"
            name="skills"
            className="form-input"
            value={formData.skills}
            onChange={handleChange}
            placeholder="React, TypeScript, GraphQL, AWS"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Role Overview & Mission</label>
          <textarea
            name="description"
            className="form-textarea"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the company mission and high-level role objective..."
          />
        </div>

        <div className="form-group">
          <label className="form-label">Key Responsibilities (One per line)</label>
          <textarea
            name="responsibilities"
            className="form-textarea"
            rows={3}
            value={formData.responsibilities}
            onChange={handleChange}
            placeholder="Lead frontend architecture&#10;Optimize rendering performance&#10;Collaborate with product designers"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Candidate Requirements (One per line)</label>
          <textarea
            name="requirements"
            className="form-textarea"
            rows={3}
            value={formData.requirements}
            onChange={handleChange}
            placeholder="5+ years production React experience&#10;Deep mastery of TypeScript&#10;Excellent communication skills"
          />
        </div>
      </form>
    </Modal>
  );
};
