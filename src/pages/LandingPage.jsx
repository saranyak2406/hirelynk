import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css';
import {
  Search,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  Briefcase,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Layers,
  Code2,
  Building2,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export const LandingPage = () => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const { jobs } = useData();
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = [keyword, location].filter(Boolean).join(' ');
    navigate(query ? `/jobs?q=${encodeURIComponent(query)}` : '/jobs');
  };

  const categories = [
    { title: 'Software Engineering', count: '1,420+ jobs', icon: Code2, color: '#0066cc', bg: '#e8f2fc' },
    { title: 'Artificial Intelligence & ML', count: '890+ jobs', icon: Cpu, color: '#8b5cf6', bg: '#f5f3ff' },
    { title: 'Product & UX Design', count: '520+ jobs', icon: Layers, color: '#ec4899', bg: '#fdf2f8' },
    { title: 'DevOps & Cloud Systems', count: '680+ jobs', icon: Zap, color: '#10b981', bg: '#ecfdf5' },
    { title: 'Cyber Security & Trust', count: '310+ jobs', icon: ShieldCheck, color: '#f59e0b', bg: '#fffbeb' },
    { title: 'Executive & Eng Leadership', count: '190+ jobs', icon: Building2, color: '#0f172a', bg: '#f1f5f9' },
  ];

  const featuredCompanies = [
    { name: 'Stripe', logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&auto=format&fit=crop&q=80', jobsCount: 24 },
    { name: 'Anthropic', logo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80', jobsCount: 18 },
    { name: 'Datadog', logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=80&auto=format&fit=crop&q=80', jobsCount: 31 },
    { name: 'CloudScale AI', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&auto=format&fit=crop&q=80', jobsCount: 12 },
    { name: 'Airbnb', logo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80', jobsCount: 15 },
    { name: 'Shopify', logo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=80&auto=format&fit=crop&q=80', jobsCount: 29 },
  ];

  const latestJobs = jobs.slice(0, 4);

  return (
    <div className="landing-page-root">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-badge">
            <Sparkles size={14} color="#0066cc" />
            <span>The Professional Network Built For Modern Tech</span>
          </div>

          <h1 className="hero-headline">
            Where Elite Tech Talent Meets <span className="hero-gradient-text">World-Class</span> Opportunities
          </h1>

          <p className="hero-subhead">
            Join 150,000+ verified software engineers, product designers, and engineering leaders. Skip recruiter spam, view transparent compensation, and connect directly with hiring managers.
          </p>

          {/* Job Search Form */}
          <form onSubmit={handleSearch} className="hero-search-box">
            <div className="hero-search-field">
              <Search size={20} color="var(--primary)" />
              <input
                type="text"
                placeholder="Job title, tech stack (e.g. React 19, Python, Staff Engineer)..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="hero-input"
              />
            </div>

            <div className="hero-divider" />

            <div className="hero-search-field">
              <MapPin size={20} color="var(--text-muted)" />
              <input
                type="text"
                placeholder="City, State, or 'Remote'..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="hero-input"
              />
            </div>

            <button type="submit" className="btn btn-primary hero-submit-btn">
              <span>Find Jobs</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Popular pills */}
          <div className="hero-tags-row">
            <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Trending:
            </span>
            {['React 19', 'Remote ML', 'Staff Frontend', 'Next.js', 'Kubernetes', 'Design Systems'].map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => navigate(`/jobs?q=${encodeURIComponent(term)}`)}
                className="hero-tag-pill"
              >
                {term}
              </button>
            ))}
          </div>

          {/* Quick Demo Switcher Callout */}
          <div className="hero-demo-callout">
            <span style={{ fontWeight: 600, fontSize: '0.84rem', color: 'var(--navy-800)' }}>
              ⚡ Instant Interactive Demo:
            </span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  switchRole('talent');
                  navigate('/feed');
                }}
                className="btn btn-secondary btn-sm"
              >
                Explore as Job Seeker (Sarah)
              </button>
              <button
                onClick={() => {
                  switchRole('recruiter');
                  navigate('/recruiter');
                }}
                className="btn btn-dark btn-sm"
              >
                Explore as Recruiter (David)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="stats-strip">
        <div className="container stats-container">
          <div className="stat-box">
            <div className="stat-big">150,000+</div>
            <div className="stat-desc">Verified Tech Professionals</div>
          </div>
          <div className="stat-box">
            <div className="stat-big">12,000+</div>
            <div className="stat-desc">Top Hiring Companies</div>
          </div>
          <div className="stat-box">
            <div className="stat-big">$185,000</div>
            <div className="stat-desc">Average Compensation</div>
          </div>
          <div className="stat-box">
            <div className="stat-big">98.4%</div>
            <div className="stat-desc">Candidate Satisfaction</div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-heading">Explore Popular Tech Sectors</h2>
            <p className="section-sub-heading">
              Browse thousands of open roles across leading tech engineering domains.
            </p>
          </div>

          <div className="categories-grid">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={idx}
                  onClick={() => navigate(`/jobs?q=${encodeURIComponent(cat.title)}`)}
                  className="lynk-card category-card"
                >
                  <div className="cat-icon-box" style={{ background: cat.bg, color: cat.color }}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="cat-title">{cat.title}</h3>
                    <div className="cat-count">{cat.count}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="companies-section">
        <div className="container">
          <div className="section-header-centered">
            <h2 className="section-main-heading">Hiring At World-Class Companies</h2>
            <p className="section-sub-heading">
              Connect directly with tech recruiters and engineering managers from top brands.
            </p>
          </div>

          <div className="companies-grid">
            {featuredCompanies.map((comp, idx) => (
              <div
                key={idx}
                onClick={() => navigate(`/jobs?q=${encodeURIComponent(comp.name)}`)}
                className="lynk-card company-card"
              >
                <img src={comp.logo} alt={comp.name} className="company-logo" />
                <div className="company-info">
                  <div className="company-name">{comp.name}</div>
                  <div className="company-jobs-badge">{comp.jobsCount} open roles</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Featured Jobs */}
      <section className="featured-jobs-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <h2 className="section-main-heading">Latest Featured Opportunities</h2>
              <p className="section-sub-heading">
                Hand-picked high compensation tech positions updated today.
              </p>
            </div>
            <Link to="/jobs" className="btn btn-secondary">
              View All Open Jobs <ArrowRight size={16} />
            </Link>
          </div>

          <div className="featured-jobs-grid">
            {latestJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => navigate(`/jobs?id=${job.id}`)}
                className="lynk-card landing-job-card"
              >
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <img src={job.companyLogo} alt={job.company} className="landing-job-logo" />
                  <div style={{ flex: 1 }}>
                    <h3 className="landing-job-title">{job.title}</h3>
                    <div className="landing-job-company">{job.company}</div>
                    <div className="landing-job-meta">
                      <span><MapPin size={13} /> {job.location}</span>
                      <span className="badge badge-green">{job.workMode}</span>
                    </div>
                  </div>
                </div>

                <div className="landing-job-footer">
                  <span className="landing-job-salary">
                    <DollarSign size={14} /> {job.salary}
                  </span>
                  <span className="btn btn-primary btn-sm">
                    View Role
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why HireLynk / Dual Benefits */}
      <section className="benefits-section">
        <div className="container">
          <div className="benefits-grid">
            {/* For Talent */}
            <div className="lynk-card benefit-card">
              <div className="benefit-badge">For Tech Talent</div>
              <h3 className="benefit-title">Supercharge Your Tech Career</h3>
              <ul className="benefit-points">
                <li>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span><strong>Direct Recruiter Access:</strong> Bypass third-party staffing firms and talk straight to internal hiring managers.</span>
                </li>
                <li>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span><strong>Transparent Compensation:</strong> See verified salary, equity, and remote flexibility upfront.</span>
                </li>
                <li>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span><strong>Curated Developer Community:</strong> Share engineering insights, open-source projects, and industry trends.</span>
                </li>
              </ul>
              <Link to="/register?role=talent" className="btn btn-primary" style={{ marginTop: 20 }}>
                Create Candidate Profile
              </Link>
            </div>

            {/* For Employers */}
            <div className="lynk-card benefit-card recruiter-benefit">
              <div className="benefit-badge" style={{ background: '#ecfdf5', color: '#047857' }}>For Employers & Recruiters</div>
              <h3 className="benefit-title">Hire Elite Engineers 3x Faster</h3>
              <ul className="benefit-points">
                <li>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span><strong>AI Match Filtering:</strong> Match candidates precisely by production tech stack, experience, and timezone.</span>
                </li>
                <li>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span><strong>Built-in ATS Pipeline:</strong> Track applicants from submission through screening, interview, and offer.</span>
                </li>
                <li>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span><strong>Verified Credentials:</strong> Pre-screened candidates with active portfolios and authentic work histories.</span>
                </li>
              </ul>
              <Link to="/register?role=recruiter" className="btn btn-dark" style={{ marginTop: 20 }}>
                Start Recruiting Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action banner */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner-card">
            <h2>Ready to find your next career defining move?</h2>
            <p>Join thousands of software professionals already using HireLynk every day.</p>
            <div className="cta-actions">
              <Link to="/register" className="btn btn-primary btn-lg">
                Join HireLynk for Free
              </Link>
              <Link to="/jobs" className="btn btn-secondary btn-lg" style={{ color: '#ffffff', borderColor: '#ffffff' }}>
                Browse 5,000+ Tech Jobs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
