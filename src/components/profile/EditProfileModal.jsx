import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useAuth } from '../../context/AuthContext';

export const EditProfileModal = ({ isOpen, onClose }) => {
  const { currentUser, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    headline: currentUser?.headline || '',
    location: currentUser?.location || '',
    about: currentUser?.about || '',
    openToWork: currentUser?.openToWork ?? true,
    avatar: currentUser?.avatar || '',
    coverImage: currentUser?.coverImage || ''
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
    updateProfile(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Profile Information"
      size="md"
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, width: '100%' }}>
          <button type="button" onClick={onClose} className="btn btn-ghost">
            Cancel
          </button>
          <button type="button" onClick={handleSubmit} className="btn btn-primary">
            Save Changes
          </button>
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-input"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Professional Headline</label>
          <input
            type="text"
            name="headline"
            className="form-input"
            value={formData.headline}
            onChange={handleChange}
            placeholder="e.g. Senior Frontend Engineer | React • TypeScript"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            className="form-input"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. San Francisco, CA (Hybrid)"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Avatar Image URL</label>
          <input
            type="url"
            name="avatar"
            className="form-input"
            value={formData.avatar}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">About / Bio</label>
          <textarea
            name="about"
            className="form-textarea"
            rows={4}
            value={formData.about}
            onChange={handleChange}
            placeholder="Write a brief professional summary..."
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0' }}>
          <input
            type="checkbox"
            id="openToWorkToggle"
            name="openToWork"
            checked={formData.openToWork}
            onChange={handleChange}
            style={{ width: 18, height: 18, cursor: 'pointer' }}
          />
          <label htmlFor="openToWorkToggle" style={{ fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', color: 'var(--navy-800)' }}>
            Show "Open to Work" badge to recruiters
          </label>
        </div>
      </form>
    </Modal>
  );
};
