import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useAuth } from '../../context/AuthContext';

export const AddExperienceModal = ({ isOpen, onClose }) => {
  const { currentUser, updateProfile } = useAuth();

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [current, setCurrent] = useState(false);
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !company) return;

    const newExp = {
      id: 'exp-' + Date.now(),
      title,
      company,
      companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&auto=format&fit=crop&q=80',
      location: location || 'Remote',
      startDate: startDate || '2024',
      endDate: current ? 'Present' : (endDate || '2026'),
      current,
      description
    };

    const currentList = currentUser?.experience || [];
    updateProfile({
      experience: [newExp, ...currentList]
    });

    setTitle('');
    setCompany('');
    setLocation('');
    setDescription('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Work Experience"
      size="md"
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, width: '100%' }}>
          <button type="button" onClick={onClose} className="btn btn-ghost">
            Cancel
          </button>
          <button type="button" onClick={handleSubmit} className="btn btn-primary">
            Save Experience
          </button>
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Job Title *</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Senior Frontend Engineer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Company Name *</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. Stripe, Shopify, Google"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. San Francisco, CA or Remote"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div className="form-group">
            <label className="form-label">Start Date</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Jan 2023"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">End Date</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Present"
              value={current ? 'Present' : endDate}
              onChange={(e) => setEndDate(e.target.value)}
              disabled={current}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <input
            type="checkbox"
            id="currentExpCheck"
            checked={current}
            onChange={(e) => setCurrent(e.target.checked)}
          />
          <label htmlFor="currentExpCheck" style={{ fontSize: '0.85rem', color: 'var(--navy-800)' }}>
            I currently work in this role
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">Description / Achievements</label>
          <textarea
            className="form-textarea"
            rows={3}
            placeholder="Key accomplishments, technologies used, leadership responsibilities..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </form>
    </Modal>
  );
};
