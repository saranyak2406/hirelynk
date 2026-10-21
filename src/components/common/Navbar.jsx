import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import {
  Briefcase,
  Home,
  Users,
  MessageSquare,
  Bell,
  Search,
  ChevronDown,
  User,
  Shield,
  BriefcaseBusiness,
  LogOut,
  RotateCcw,
  Sparkles,
  Menu,
  X,
  CreditCard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const Navbar = () => {
  const { currentUser, logout, switchRole, isAuthenticated } = useAuth();
  const { requests, unreadMessagesCount, unreadNotificationsCount, resetAllDemoData } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/jobs?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="navbar-root">
      <div className="container navbar-inner">
        {/* Left: Brand & Search */}
        <div className="navbar-left">
          <Link to={isAuthenticated ? '/feed' : '/'} className="navbar-brand">
            <div className="brand-icon-box">
              <span className="brand-h">H</span>
              <span className="brand-l">L</span>
            </div>
            <div className="brand-text">
              <span className="brand-title">Hire<span className="brand-accent">Lynk</span></span>
            </div>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="navbar-search-form">
            <Search size={17} className="navbar-search-icon" />
            <input
              type="text"
              placeholder="Search jobs, skills, companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="navbar-search-input"
            />
          </form>
        </div>

        {/* Right Navigation */}
        <nav className="navbar-nav">
          {isAuthenticated ? (
            <>
              <NavLink
                to="/feed"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <div className="nav-icon-wrapper">
                  <Home size={21} />
                </div>
                <span className="nav-label">Home</span>
              </NavLink>

              <NavLink
                to="/network"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <div className="nav-icon-wrapper">
                  <Users size={21} />
                  {requests.length > 0 && (
                    <span className="nav-badge">{requests.length}</span>
                  )}
                </div>
                <span className="nav-label">My Network</span>
              </NavLink>

              <NavLink
                to="/jobs"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <div className="nav-icon-wrapper">
                  <Briefcase size={21} />
                </div>
                <span className="nav-label">Jobs</span>
              </NavLink>

              <NavLink
                to="/messaging"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <div className="nav-icon-wrapper">
                  <MessageSquare size={21} />
                  {unreadMessagesCount > 0 && (
                    <span className="nav-badge">{unreadMessagesCount}</span>
                  )}
                </div>
                <span className="nav-label">Messaging</span>
              </NavLink>

              <NavLink
                to="/notifications"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <div className="nav-icon-wrapper">
                  <Bell size={21} />
                  {unreadNotificationsCount > 0 && (
                    <span className="nav-badge">{unreadNotificationsCount}</span>
                  )}
                </div>
                <span className="nav-label">Notifications</span>
              </NavLink>

              <div className="nav-divider" />

              {/* Recruiter / Admin Quick Portals */}
              <NavLink
                to="/recruiter"
                className={({ isActive }) => `nav-item nav-recruiter-link ${isActive ? 'active' : ''}`}
                title="Recruiter Portal & ATS"
              >
                <div className="nav-icon-wrapper">
                  <BriefcaseBusiness size={20} />
                </div>
                <span className="nav-label">Recruiter</span>
              </NavLink>

              <NavLink
                to="/pricing"
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                title="Premium Plans"
              >
                <div className="nav-icon-wrapper">
                  <CreditCard size={20} />
                </div>
                <span className="nav-label">Pricing</span>
              </NavLink>

              {/* Profile Dropdown */}
              <div className="profile-dropdown-container" ref={dropdownRef}>
                <button
                  onClick={() => setProfileDropdownOpen((prev) => !prev)}
                  className="profile-nav-btn"
                  aria-haspopup="true"
                  aria-expanded={profileDropdownOpen}
                >
                  <img
                    src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                    alt={currentUser?.name}
                    className="avatar avatar-xs"
                  />
                  <div className="profile-btn-content">
                    <span className="profile-btn-name">Me</span>
                    <ChevronDown size={14} />
                  </div>
                </button>

                {profileDropdownOpen && (
                  <div className="profile-dropdown-menu">
                    {/* User Header */}
                    <div className="dropdown-user-header">
                      <img
                        src={currentUser?.avatar}
                        alt={currentUser?.name}
                        className="avatar avatar-md"
                      />
                      <div className="dropdown-user-details">
                        <div className="dropdown-user-name">{currentUser?.name}</div>
                        <div className="dropdown-user-role">
                          <span className={`badge ${
                            currentUser?.role === 'admin'
                              ? 'badge-purple'
                              : currentUser?.role === 'recruiter'
                              ? 'badge-amber'
                              : 'badge-primary'
                          }`}>
                            {currentUser?.role?.toUpperCase()}
                          </span>
                        </div>
                        <div className="dropdown-user-headline">{currentUser?.headline}</div>
                      </div>
                    </div>

                    <Link
                      to="/profile"
                      className="btn btn-secondary btn-sm dropdown-view-profile-btn"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      View Full Profile
                    </Link>

                    <div className="dropdown-divider" />

                    {/* Role Switcher */}
                    <div className="dropdown-section-title">
                      <Sparkles size={14} /> Switch Demo Role
                    </div>
                    <div className="dropdown-role-buttons">
                      <button
                        className={`role-switch-btn ${currentUser?.role === 'talent' ? 'active' : ''}`}
                        onClick={() => {
                          switchRole('talent');
                          setProfileDropdownOpen(false);
                        }}
                      >
                        <User size={14} /> Job Seeker (Sarah)
                      </button>
                      <button
                        className={`role-switch-btn ${currentUser?.role === 'recruiter' ? 'active' : ''}`}
                        onClick={() => {
                          switchRole('recruiter');
                          setProfileDropdownOpen(false);
                        }}
                      >
                        <BriefcaseBusiness size={14} /> Recruiter (David)
                      </button>
                      <button
                        className={`role-switch-btn ${currentUser?.role === 'admin' ? 'active' : ''}`}
                        onClick={() => {
                          switchRole('admin');
                          setProfileDropdownOpen(false);
                        }}
                      >
                        <Shield size={14} /> Platform Admin (Eleanor)
                      </button>
                    </div>

                    <div className="dropdown-divider" />

                    {/* Links */}
                    <Link
                      to="/admin"
                      className="dropdown-menu-item"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <Shield size={16} /> Admin Portal
                    </Link>
                    <Link
                      to="/pricing"
                      className="dropdown-menu-item"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <CreditCard size={16} /> Premium Plans
                    </Link>

                    <button
                      className="dropdown-menu-item text-danger"
                      onClick={() => {
                        resetAllDemoData();
                        setProfileDropdownOpen(false);
                      }}
                    >
                      <RotateCcw size={16} /> Reset All Demo Data
                    </button>

                    <div className="dropdown-divider" />

                    <button
                      className="dropdown-menu-item"
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="guest-nav-actions">
              <Link to="/jobs" className="btn btn-ghost btn-sm">
                Explore Jobs
              </Link>
              <Link to="/pricing" className="btn btn-ghost btn-sm">
                Pricing
              </Link>
              <Link to="/login" className="btn btn-secondary btn-sm">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Join Now
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-inner">
            {isAuthenticated ? (
              <>
                <div className="mobile-user-card">
                  <img
                    src={currentUser?.avatar}
                    alt={currentUser?.name}
                    className="avatar avatar-sm"
                  />
                  <div>
                    <div style={{ fontWeight: 700 }}>{currentUser?.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {currentUser?.role?.toUpperCase()}
                    </div>
                  </div>
                </div>
                <div className="mobile-links">
                  <Link to="/feed" onClick={() => setMobileMenuOpen(false)}>Home Feed</Link>
                  <Link to="/network" onClick={() => setMobileMenuOpen(false)}>My Network ({requests.length})</Link>
                  <Link to="/jobs" onClick={() => setMobileMenuOpen(false)}>Jobs</Link>
                  <Link to="/messaging" onClick={() => setMobileMenuOpen(false)}>Messaging ({unreadMessagesCount})</Link>
                  <Link to="/notifications" onClick={() => setMobileMenuOpen(false)}>Notifications ({unreadNotificationsCount})</Link>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>My Profile</Link>
                  <Link to="/recruiter" onClick={() => setMobileMenuOpen(false)}>Recruiter Dashboard</Link>
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>Admin Panel</Link>
                  <Link to="/pricing" onClick={() => setMobileMenuOpen(false)}>Premium Pricing</Link>
                  <button
                    className="btn btn-danger btn-sm"
                    style={{ marginTop: 12 }}
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <div className="mobile-links">
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                <Link to="/jobs" onClick={() => setMobileMenuOpen(false)}>Explore Jobs</Link>
                <Link to="/pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>Join HireLynk</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
