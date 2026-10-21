import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, Briefcase, Bookmark, CheckCircle2, RotateCcw, Filter, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import { JobCard } from '../components/jobs/JobCard';
import { JobDetailView } from '../components/jobs/JobDetailView';
import '../components/jobs/Jobs.css';

export const JobsPage = () => {
  const { jobs, savedJobIds, appliedJobIds } = useData();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & Filters state
  const [keyword, setKeyword] = useState(searchParams.get('q') || '');
  const [location, setLocation] = useState('');
  const [workMode, setWorkMode] = useState('All');
  const [jobType, setJobType] = useState('All');
  const [experience, setExperience] = useState('All');
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'all');
  const [selectedJobId, setSelectedJobId] = useState(searchParams.get('id') || null);

  useEffect(() => {
    const qParam = searchParams.get('q');
    if (qParam !== null) setKeyword(qParam);

    const tabParam = searchParams.get('tab');
    if (tabParam) setActiveTab(tabParam);

    const idParam = searchParams.get('id');
    if (idParam) setSelectedJobId(idParam);
  }, [searchParams]);

  // Filtered jobs calculation
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Tab filter
      if (activeTab === 'saved' && !savedJobIds.includes(job.id)) return false;
      if (activeTab === 'applied' && !appliedJobIds.includes(job.id)) return false;

      // Keyword match (title, company, skills, description)
      if (keyword.trim()) {
        const query = keyword.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesCompany = job.company.toLowerCase().includes(query);
        const matchesSkills = job.skills?.some((s) => s.toLowerCase().includes(query));
        const matchesDesc = job.description?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCompany && !matchesSkills && !matchesDesc) return false;
      }

      // Location match
      if (location.trim()) {
        const locQuery = location.toLowerCase();
        if (!job.location.toLowerCase().includes(locQuery)) return false;
      }

      // Work mode
      if (workMode !== 'All' && job.workMode !== workMode) return false;

      // Job type
      if (jobType !== 'All' && job.type !== jobType) return false;

      // Experience
      if (experience !== 'All') {
        if (!job.experience.toLowerCase().includes(experience.toLowerCase())) return false;
      }

      return true;
    });
  }, [jobs, activeTab, savedJobIds, appliedJobIds, keyword, location, workMode, jobType, experience]);

  // Set default selected job if current selection is invalid or null
  useEffect(() => {
    if (filteredJobs.length > 0) {
      if (!selectedJobId || !filteredJobs.some((j) => j.id === selectedJobId)) {
        setSelectedJobId(filteredJobs[0].id);
      }
    } else {
      setSelectedJobId(null);
    }
  }, [filteredJobs, selectedJobId]);

  const activeJob = jobs.find((j) => j.id === selectedJobId) || filteredJobs[0] || null;

  const resetFilters = () => {
    setKeyword('');
    setLocation('');
    setWorkMode('All');
    setJobType('All');
    setExperience('All');
    setActiveTab('all');
    setSearchParams({});
  };

  return (
    <div className="jobs-page-root">
      {/* Header Search & Filter Bar */}
      <div className="jobs-page-header">
        <div className="container">
          {/* Search Inputs */}
          <div className="jobs-search-bar">
            <div className="jobs-search-input-wrap">
              <Search size={19} color="var(--primary)" />
              <input
                type="text"
                placeholder="Search by title, skill, or company (e.g. React, Anthropic)..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              {keyword && (
                <button onClick={() => setKeyword('')} className="btn-icon">
                  <X size={15} />
                </button>
              )}
            </div>

            <div className="jobs-search-divider" />

            <div className="jobs-search-input-wrap">
              <MapPin size={19} color="var(--text-muted)" />
              <input
                type="text"
                placeholder="City, State, or Remote..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              {location && (
                <button onClick={() => setLocation('')} className="btn-icon">
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Filter Pills & Tabs */}
          <div className="jobs-filters-strip">
            {/* Tabs */}
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                className={`tab-pill-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Jobs ({jobs.length})
              </button>
              <button
                className={`tab-pill-btn ${activeTab === 'saved' ? 'active' : ''}`}
                onClick={() => setActiveTab('saved')}
              >
                <Bookmark size={14} /> Saved ({savedJobIds.length})
              </button>
              <button
                className={`tab-pill-btn ${activeTab === 'applied' ? 'active' : ''}`}
                onClick={() => setActiveTab('applied')}
              >
                <CheckCircle2 size={14} /> Applied ({appliedJobIds.length})
              </button>
            </div>

            <div style={{ width: 1, height: 24, background: 'var(--border-subtle)', margin: '0 4px' }} />

            {/* Dropdowns */}
            <select
              value={workMode}
              onChange={(e) => setWorkMode(e.target.value)}
              className="filter-select"
            >
              <option value="All">Work Mode: All</option>
              <option value="Remote">Remote Only</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Onsite">Onsite</option>
            </select>

            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="filter-select"
            >
              <option value="All">Job Type: All</option>
              <option value="Full-time">Full-time</option>
              <option value="Contract">Contract</option>
              <option value="Part-time">Part-time</option>
            </select>

            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="filter-select"
            >
              <option value="All">Experience: All</option>
              <option value="Senior">Senior</option>
              <option value="Lead">Lead / Staff</option>
              <option value="Mid">Mid-Level</option>
            </select>

            {(keyword || location || workMode !== 'All' || jobType !== 'All' || experience !== 'All' || activeTab !== 'all') && (
              <button
                onClick={resetFilters}
                className="btn btn-ghost btn-sm"
                style={{ fontSize: '0.8rem', color: 'var(--accent-red)' }}
              >
                <RotateCcw size={13} /> Reset Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="container">
        <div className="jobs-layout">
          {/* Left Column: Job Cards List */}
          <div className="jobs-list-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px 8px' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Available
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Sorted by most recent
              </span>
            </div>

            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSelected={job.id === activeJob?.id}
                onSelect={() => setSelectedJobId(job.id)}
              />
            ))}

            {filteredJobs.length === 0 && (
              <div className="lynk-card" style={{ padding: '40px 20px', textAlign: 'center' }}>
                <Briefcase size={36} color="var(--text-light)" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--navy-900)' }}>
                  No jobs matched your criteria
                </h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: '6px 0 16px' }}>
                  Try relaxing your keyword filters or work mode settings.
                </p>
                <button onClick={resetFilters} className="btn btn-secondary btn-sm">
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Job Detail View */}
          <div className="job-detail-sticky-wrap">
            <JobDetailView job={activeJob} />
          </div>
        </div>
      </div>
    </div>
  );
};
