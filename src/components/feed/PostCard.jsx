import React, { useState } from 'react';
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  Send,
  MoreHorizontal,
  Bookmark,
  Link as LinkIcon,
  Check
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const PostCard = ({ post }) => {
  const { currentUser } = useAuth();
  const { likePost, addComment, sharePost } = useData();

  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleLike = () => {
    likePost(post.id);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(post.id, commentText.trim());
    setCommentText('');
    setShowComments(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.origin + `/feed#${post.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setMenuOpen(false);
  };

  return (
    <article className="lynk-card post-card" id={post.id} style={{ marginBottom: 16 }}>
      {/* Header */}
      <div className="post-header">
        <div className="post-author-info">
          <img
            src={post.authorAvatar}
            alt={post.authorName}
            className="avatar avatar-md"
          />
          <div>
            <div className="post-author-name">{post.authorName}</div>
            <div className="post-author-headline">{post.authorHeadline}</div>
            <div className="post-time">{post.timeAgo}</div>
          </div>
        </div>

        {/* 3-dots menu */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="btn-icon"
            aria-label="Post options"
          >
            <MoreHorizontal size={18} />
          </button>

          {menuOpen && (
            <div className="post-dropdown-menu">
              <button onClick={handleCopyLink} className="dropdown-menu-item">
                {copied ? <Check size={16} color="#10b981" /> : <LinkIcon size={16} />}
                <span>{copied ? 'Link Copied!' : 'Copy link to post'}</span>
              </button>
              <button
                onClick={() => {
                  sharePost(post.id);
                  setMenuOpen(false);
                }}
                className="dropdown-menu-item"
              >
                <Bookmark size={16} />
                <span>Save for later</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="post-body">
        <p className="post-text">{post.content}</p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="post-tags-container">
            {post.tags.map((tag, idx) => (
              <span key={idx} className="post-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Attached Image */}
        {post.image && (
          <div className="post-media-box">
            <img src={post.image} alt="Post attachment" loading="lazy" />
          </div>
        )}
      </div>

      {/* Engagement Counters */}
      <div className="post-engagement-counts">
        <div className="engagement-left">
          <span className="like-counter-bubble">
            <ThumbsUp size={12} fill="#ffffff" color="#ffffff" />
          </span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            {post.likesCount}
          </span>
        </div>
        <div className="engagement-right">
          <button
            onClick={() => setShowComments((prev) => !prev)}
            style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}
          >
            {post.comments?.length || 0} comments
          </button>
          <span>•</span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            {post.sharesCount || 0} shares
          </span>
        </div>
      </div>

      {/* Action Buttons Bar */}
      <div className="post-actions-bar">
        <button
          onClick={handleLike}
          className={`post-action-btn ${post.hasLiked ? 'liked' : ''}`}
        >
          <ThumbsUp size={18} fill={post.hasLiked ? '#0066cc' : 'none'} />
          <span>Like</span>
        </button>

        <button
          onClick={() => setShowComments((prev) => !prev)}
          className={`post-action-btn ${showComments ? 'active' : ''}`}
        >
          <MessageCircle size={18} />
          <span>Comment</span>
        </button>

        <button
          onClick={() => sharePost(post.id)}
          className="post-action-btn"
        >
          <Share2 size={18} />
          <span>Share</span>
        </button>

        <button
          onClick={() => {
            navigator.clipboard?.writeText(window.location.origin + `/feed#${post.id}`);
            alert('Post link copied to clipboard!');
          }}
          className="post-action-btn"
        >
          <Send size={18} />
          <span>Send</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="post-comments-section">
          {/* Add Comment Input */}
          <form onSubmit={handleAddComment} className="comment-form">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="avatar avatar-sm"
            />
            <div className="comment-input-box">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="comment-input"
              />
              <button
                type="submit"
                disabled={!commentText.trim()}
                className="btn btn-primary btn-sm comment-submit-btn"
              >
                Post
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="comments-list">
            {post.comments?.map((c) => (
              <div key={c.id} className="comment-item">
                <img
                  src={c.authorAvatar}
                  alt={c.authorName}
                  className="avatar avatar-sm"
                />
                <div className="comment-bubble">
                  <div className="comment-bubble-header">
                    <span className="comment-author-name">{c.authorName}</span>
                    <span className="comment-time">{c.timeAgo}</span>
                  </div>
                  <div className="comment-author-headline">{c.authorHeadline}</div>
                  <p className="comment-text">{c.text}</p>
                </div>
              </div>
            ))}

            {(!post.comments || post.comments.length === 0) && (
              <div className="no-comments-msg">
                Be the first to comment on this post!
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
};
