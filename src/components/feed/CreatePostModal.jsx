import React, { useState } from 'react';
import { Image, Tag, Sparkles, Globe, Smile } from 'lucide-react';
import { Modal } from '../common/Modal';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const CreatePostModal = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const { createPost } = useData();

  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(['#HireLynk', '#TechCareers']);
  const [imageUrl, setImageUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);

  const sampleImages = [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=900&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80'
  ];

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const clean = tagInput.trim().replace(/^#?/, '#');
      if (clean && !tags.includes(clean)) {
        setTags([...tags, clean]);
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    createPost(content.trim(), tags, imageUrl || null);
    setContent('');
    setTags(['#HireLynk', '#TechCareers']);
    setImageUrl('');
    setShowImageInput(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create a Post"
      size="md"
      footer={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              type="button"
              className={`btn-icon ${showImageInput ? 'active' : ''}`}
              onClick={() => setShowImageInput((prev) => !prev)}
              title="Add Image"
            >
              <Image size={19} color="#0066cc" />
            </button>
            <button
              type="button"
              className="btn-icon"
              onClick={() => {
                const sampleIdeas = [
                  "Just finished shipping a major performance refactor! Key takeaway: measure before you optimize. What's your favourite profiling tool?",
                  "Excited to announce I'm mentoring early-career engineers this month. Reach out if you're navigating your first tech role!",
                  "The future of software development belongs to engineers who can bridge product intuition with distributed systems mastery."
                ];
                setContent(sampleIdeas[Math.floor(Math.random() * sampleIdeas.length)]);
              }}
              title="Insert sample spark idea"
            >
              <Sparkles size={19} color="#8b5cf6" />
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
              {content.length}/1000
            </span>
            <button
              type="button"
              className="btn btn-primary"
              disabled={!content.trim()}
              onClick={handleSubmit}
            >
              Post to Network
            </button>
          </div>
        </div>
      }
    >
      {/* Author Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <img
          src={currentUser?.avatar}
          alt={currentUser?.name}
          className="avatar avatar-md"
        />
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--navy-900)' }}>
            {currentUser?.name}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <Globe size={13} /> Anyone on HireLynk
          </div>
        </div>
      </div>

      {/* Post Text Area */}
      <textarea
        className="form-textarea"
        rows={5}
        placeholder="What do you want to talk about? Share an achievement, learning, or job advice..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          border: 'none',
          padding: 0,
          fontSize: '1rem',
          lineHeight: '1.6',
          boxShadow: 'none',
          width: '100%',
          resize: 'none'
        }}
        autoFocus
      />

      {/* Image Input field */}
      {showImageInput && (
        <div style={{ marginTop: 14, padding: 12, background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: 6 }}>
            Attach Image URL:
          </div>
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="form-input"
            style={{ marginBottom: 8 }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Presets:</span>
            {sampleImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                className="btn btn-ghost btn-sm"
                style={{ fontSize: '0.74rem', padding: '2px 8px' }}
                onClick={() => setImageUrl(img)}
              >
                Sample {idx + 1}
              </button>
            ))}
            {imageUrl && (
              <button
                type="button"
                className="btn btn-ghost btn-sm text-danger"
                style={{ fontSize: '0.74rem', padding: '2px 8px' }}
                onClick={() => setImageUrl('')}
              >
                Remove
              </button>
            )}
          </div>
          {imageUrl && (
            <div style={{ marginTop: 8, maxHeight: 160, overflow: 'hidden', borderRadius: 'var(--radius-sm)' }}>
              <img src={imageUrl} alt="Post preview" style={{ width: '100%', objectFit: 'cover' }} />
            </div>
          )}
        </div>
      )}

      {/* Hashtag chips */}
      <div style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
          {tags.map((t) => (
            <span
              key={t}
              className="badge badge-primary"
              style={{ cursor: 'pointer', padding: '4px 10px' }}
              onClick={() => removeTag(t)}
              title="Click to remove"
            >
              {t} ✕
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Tag size={15} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Add hashtag (press Enter)..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            style={{
              border: 'none',
              outline: 'none',
              fontSize: '0.85rem',
              color: 'var(--primary)',
              background: 'transparent'
            }}
          />
        </div>
      </div>
    </Modal>
  );
};
