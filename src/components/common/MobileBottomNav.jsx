import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Users, Briefcase, MessageSquare, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import './MobileBottomNav.css';

export const MobileBottomNav = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const { requests, unreadMessagesCount } = useData();
  const location = useLocation();

  // Don't show bottom nav on login or register pages
  if (!isAuthenticated || location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Bottom Navigation">
      <NavLink
        to="/feed"
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <div className="bottom-nav-icon-wrap">
          <Home size={22} />
        </div>
        <span className="bottom-nav-label">Home</span>
      </NavLink>

      <NavLink
        to="/network"
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <div className="bottom-nav-icon-wrap">
          <Users size={22} />
          {requests.length > 0 && (
            <span className="bottom-nav-badge">{requests.length}</span>
          )}
        </div>
        <span className="bottom-nav-label">Network</span>
      </NavLink>

      <NavLink
        to="/jobs"
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <div className="bottom-nav-icon-wrap">
          <Briefcase size={22} />
        </div>
        <span className="bottom-nav-label">Jobs</span>
      </NavLink>

      <NavLink
        to="/messaging"
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <div className="bottom-nav-icon-wrap">
          <MessageSquare size={22} />
          {unreadMessagesCount > 0 && (
            <span className="bottom-nav-badge">{unreadMessagesCount}</span>
          )}
        </div>
        <span className="bottom-nav-label">Chat</span>
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <div className="bottom-nav-icon-wrap">
          {currentUser?.avatar ? (
            <img
              src={currentUser.avatar}
              alt=""
              className="bottom-nav-avatar"
            />
          ) : (
            <User size={22} />
          )}
        </div>
        <span className="bottom-nav-label">Profile</span>
      </NavLink>
    </nav>
  );
};
