import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreVertical,
  CheckCheck,
  Check,
  Circle,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import './Messaging.css';

export const MessagingPage = () => {
  const { currentUser } = useAuth();
  const { conversations, sendMessage } = useData();

  const [activeConvId, setActiveConvId] = useState(conversations[0]?.id || null);
  const [inputText, setInputText] = useState('');
  const [searchConv, setSearchConv] = useState('');
  const messagesEndRef = useRef(null);

  const activeConversation = conversations.find((c) => c.id === activeConvId) || conversations[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConversation) return;
    sendMessage(activeConversation.id, inputText.trim());
    setInputText('');
  };

  const filteredConversations = conversations.filter((c) => {
    if (!searchConv.trim()) return true;
    return (
      c.participantName.toLowerCase().includes(searchConv.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchConv.toLowerCase())
    );
  });

  return (
    <div className="container" style={{ paddingTop: 20 }}>
      <div className="lynk-card messaging-card-container">
        {/* Left Pane: Conversation List */}
        <aside className="conv-list-pane">
          <div className="conv-pane-header">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy-900)' }}>
              Messaging
            </h3>
            <div className="conv-search-box">
              <Search size={15} color="var(--text-muted)" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchConv}
                onChange={(e) => setSearchConv(e.target.value)}
              />
            </div>
          </div>

          <div className="conv-list-body">
            {filteredConversations.map((conv) => {
              const isActive = conv.id === activeConversation?.id;
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`conv-item ${isActive ? 'active' : ''}`}
                >
                  <div className="conv-avatar-box">
                    <img
                      src={conv.participantAvatar}
                      alt={conv.participantName}
                      className="avatar avatar-md"
                    />
                    {conv.online && <span className="avatar-status-dot" />}
                  </div>

                  <div className="conv-item-details">
                    <div className="conv-item-top">
                      <span className="conv-name">{conv.participantName}</span>
                      <span className="conv-time">{conv.lastTimestamp}</span>
                    </div>
                    <div className="conv-headline">{conv.participantHeadline}</div>
                    <div className="conv-last-msg">
                      <span>{conv.lastMessage}</span>
                      {conv.unreadCount > 0 && (
                        <span className="unread-pill">{conv.unreadCount}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredConversations.length === 0 && (
              <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                No conversations found.
              </div>
            )}
          </div>
        </aside>

        {/* Right Pane: Active Chat Window */}
        <main className="active-chat-pane">
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="chat-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <img
                    src={activeConversation.participantAvatar}
                    alt={activeConversation.participantName}
                    className="avatar avatar-md"
                  />
                  <div>
                    <div className="chat-participant-name">
                      {activeConversation.participantName}
                    </div>
                    <div className="chat-participant-sub">
                      {activeConversation.online ? (
                        <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>● Active now</span>
                      ) : (
                        <span>Away</span>
                      )}
                      <span> • {activeConversation.participantHeadline}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    onClick={() => alert(`Starting video call with ${activeConversation.participantName}...`)}
                    className="btn-icon"
                    title="Start video call"
                  >
                    <Video size={18} />
                  </button>
                  <button
                    onClick={() => alert(`Calling ${activeConversation.participantName}...`)}
                    className="btn-icon"
                    title="Audio call"
                  >
                    <Phone size={18} />
                  </button>
                </div>
              </div>

              {/* Chat Messages Body */}
              <div className="chat-body">
                {activeConversation.messages?.map((msg) => {
                  const isMe = msg.senderId === currentUser?.id || msg.senderId === 'user-1';
                  return (
                    <div
                      key={msg.id}
                      className={`chat-message-row ${isMe ? 'message-outgoing' : 'message-incoming'}`}
                    >
                      {!isMe && (
                        <img
                          src={activeConversation.participantAvatar}
                          alt=""
                          className="avatar avatar-xs"
                          style={{ alignSelf: 'flex-end', marginBottom: 4 }}
                        />
                      )}
                      <div className="chat-bubble">
                        <div className="bubble-text">{msg.text}</div>
                        <div className="bubble-meta">
                          <span>{msg.timestamp}</span>
                          {isMe && <CheckCheck size={13} color="#ffffff" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSend} className="chat-input-bar">
                <button
                  type="button"
                  onClick={() => alert('Attachments support: PDF, PNG, DOCX.')}
                  className="btn-icon"
                  title="Attach file"
                >
                  <Paperclip size={18} />
                </button>
                <input
                  type="text"
                  placeholder={`Write a message to ${activeConversation.participantName}...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="chat-text-input"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="btn btn-primary btn-sm chat-send-btn"
                >
                  <Send size={15} /> Send
                </button>
              </form>
            </>
          ) : (
            <div className="no-chat-selected">
              <MessageSquare size={44} color="var(--text-light)" />
              <h3>Select a conversation</h3>
              <p>Choose from existing messages or start a new conversation with a connection.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
