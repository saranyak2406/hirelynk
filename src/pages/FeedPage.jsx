import React, { useState } from 'react';
import { Image, Video, Calendar, Newspaper, Sparkles, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { FeedLeftSidebar } from '../components/feed/FeedLeftSidebar';
import { FeedRightSidebar } from '../components/feed/FeedRightSidebar';
import { PostCard } from '../components/feed/PostCard';
import { CreatePostModal } from '../components/feed/CreatePostModal';
import '../components/feed/Feed.css';

export const FeedPage = () => {
  const { currentUser } = useAuth();
  const { posts } = useData();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const filteredPosts = posts.filter((p) => {
    if (activeTab === 'trending') return p.likesCount > 150;
    if (activeTab === 'following') return p.authorId !== currentUser?.id;
    return true;
  });

  return (
    <div className="container" style={{ paddingTop: 20 }}>
      <div className="feed-grid">
        {/* Left Sidebar */}
        <FeedLeftSidebar />

        {/* Center Main Feed */}
        <main className="feed-main-col">
          {/* Create Post Card */}
          <div className="lynk-card create-post-card">
            <div className="create-post-top">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                alt={currentUser?.name}
                className="avatar avatar-md"
              />
              <button
                onClick={() => setCreateModalOpen(true)}
                className="create-post-trigger-btn"
              >
                Start a post, share advice, or celebrate a win...
              </button>
            </div>

            <div className="create-post-actions-row">
              <button
                onClick={() => setCreateModalOpen(true)}
                className="quick-action-btn"
              >
                <Image size={19} color="#0066cc" />
                <span>Media</span>
              </button>
              <button
                onClick={() => setCreateModalOpen(true)}
                className="quick-action-btn"
              >
                <Calendar size={19} color="#f59e0b" />
                <span>Event</span>
              </button>
              <button
                onClick={() => setCreateModalOpen(true)}
                className="quick-action-btn"
              >
                <Newspaper size={19} color="#10b981" />
                <span>Article</span>
              </button>
            </div>
          </div>

          {/* Feed Filter Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ height: 1, background: 'var(--border-subtle)', flex: 1 }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '0 12px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-light)', fontWeight: 600 }}>Sort by:</span>
              <button
                className={`tab-pill-btn ${activeTab === 'all' ? 'active' : ''}`}
                style={{ padding: '3px 10px', fontSize: '0.78rem' }}
                onClick={() => setActiveTab('all')}
              >
                Recent
              </button>
              <button
                className={`tab-pill-btn ${activeTab === 'trending' ? 'active' : ''}`}
                style={{ padding: '3px 10px', fontSize: '0.78rem' }}
                onClick={() => setActiveTab('trending')}
              >
                Top / Trending
              </button>
            </div>
            <div style={{ height: 1, background: 'var(--border-subtle)', flex: 1 }} />
          </div>

          {/* Posts List */}
          <div className="feed-posts-container">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}

            {filteredPosts.length === 0 && (
              <div className="lynk-card" style={{ padding: 36, textAlign: 'center' }}>
                <Sparkles size={36} color="var(--primary)" style={{ margin: '0 auto 12px' }} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>No posts found in this filter</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 4 }}>
                  Switch to "Recent" or create your own post to share with the network!
                </p>
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar */}
        <FeedRightSidebar />
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </div>
  );
};
