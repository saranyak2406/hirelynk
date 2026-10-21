import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Check,
  Sparkles,
  Zap,
  Building,
  User,
  Shield,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Modal } from '../components/common/Modal';
import './Pricing.css';

export const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' | 'annual'
  const [activeAudience, setActiveAudience] = useState('talent'); // 'talent' | 'recruiter'
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const { currentUser } = useAuth();
  const { success } = useToast();

  const handleChoosePlan = (plan) => {
    setSelectedPlan(plan);
    setCheckoutModalOpen(true);
  };

  const handleConfirmUpgrade = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutModalOpen(false);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      success(`Congratulations! You have upgraded to ${selectedPlan?.name}!`);
    }, 600);
  };

  const talentPlans = [
    {
      id: 'talent-free',
      name: 'Lynk Free Basic',
      description: 'Essential networking and job exploration for developers & designers.',
      priceMonthly: '$0',
      priceAnnual: '$0',
      period: 'forever',
      featured: false,
      cta: 'Current Plan',
      isCurrent: true,
      features: [
        'Apply to unlimited publicly listed tech jobs',
        'Standard candidate profile & resume link',
        'Direct connection requests (up to 30 / mo)',
        'Public tech feed community access',
        'Basic search filters'
      ]
    },
    {
      id: 'talent-premium',
      name: 'Lynk Premium Career',
      description: 'Stand out to top tech recruiters and fast-track hiring interviews.',
      priceMonthly: '$29.99',
      priceAnnual: '$23.99',
      period: 'per month',
      featured: true,
      badge: 'Most Popular for Job Seekers',
      cta: 'Upgrade to Career Premium',
      isCurrent: false,
      features: [
        '15 Direct InMail credits to message recruiters directly',
        'See who viewed your profile in the last 90 days',
        'Featured Applicant badge on all job applications',
        'Competitive candidate insights (how you rank vs other applicants)',
        'AI Resume review & ATS keyword optimization recommendations',
        'Priority customer support'
      ]
    }
  ];

  const recruiterPlans = [
    {
      id: 'recruiter-starter',
      name: 'Starter Recruiter',
      description: 'Perfect for seed-stage startups and small engineering teams.',
      priceMonthly: '$99',
      priceAnnual: '$79',
      period: 'per month',
      featured: false,
      cta: 'Get Starter Recruiter',
      isCurrent: false,
      features: [
        '3 Active Job listings at any time',
        '30 InMail credits per month',
        'Basic candidate search & skills filter',
        'Standard ATS pipeline board',
        'Email applicant alerts'
      ]
    },
    {
      id: 'recruiter-enterprise',
      name: 'Recruiter Enterprise ATS',
      description: 'Complete high-volume talent acquisition platform for scaling tech orgs.',
      priceMonthly: '$249',
      priceAnnual: '$199',
      period: 'per month',
      featured: true,
      badge: 'Best Value for Companies',
      cta: 'Start Enterprise Recruiter',
      isCurrent: false,
      features: [
        'Unlimited active job postings',
        '150 InMail direct recruiter credits per month',
        'Advanced talent search with boolean operators & AI matching',
        'Full 5-stage customizable ATS Kanban pipeline',
        'Candidate resume PDF bulk export & sharing',
        'Team collaboration seats (up to 5 hiring managers)',
        'Dedicated account director & 99.9% uptime SLA'
      ]
    }
  ];

  const plansToDisplay = activeAudience === 'talent' ? talentPlans : recruiterPlans;

  return (
    <div className="pricing-page-root">
      <div className="container">
        {/* Header */}
        <div className="pricing-header-box">
          <div className="hero-badge">
            <Sparkles size={14} color="#0066cc" /> Transparent, Fair Tech Pricing
          </div>
          <h1 className="pricing-main-title">
            Invest in Your Tech Career or Accelerate Hiring
          </h1>
          <p className="pricing-sub-title">
            Simple, transparent plans designed for high-performing software engineers and modern tech companies.
          </p>

          {/* Audience Switcher (Talent vs Recruiter) */}
          <div className="pricing-audience-tabs">
            <button
              onClick={() => setActiveAudience('talent')}
              className={`audience-tab-btn ${activeAudience === 'talent' ? 'active' : ''}`}
            >
              <User size={16} /> For Job Seekers & Talent
            </button>
            <button
              onClick={() => setActiveAudience('recruiter')}
              className={`audience-tab-btn ${activeAudience === 'recruiter' ? 'active' : ''}`}
            >
              <Building size={16} /> For Employers & Recruiters
            </button>
          </div>

          {/* Billing Interval Toggle (Monthly vs Annual) */}
          <div className="pricing-interval-toggle">
            <span className={billingCycle === 'monthly' ? 'interval-active' : ''}>Monthly Billing</span>
            <button
              className={`switch-toggle ${billingCycle === 'annual' ? 'annual-checked' : ''}`}
              onClick={() => setBillingCycle((prev) => (prev === 'monthly' ? 'annual' : 'monthly'))}
              aria-label="Toggle annual billing discount"
            >
              <span className="switch-thumb" />
            </button>
            <span className={billingCycle === 'annual' ? 'interval-active' : ''}>
              Annual Billing <span className="discount-badge">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-cards-grid">
          {plansToDisplay.map((plan) => {
            const price = billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly;

            return (
              <div
                key={plan.id}
                className={`lynk-card pricing-card ${plan.featured ? 'featured' : ''}`}
              >
                {plan.badge && (
                  <div className="plan-badge-ribbon">
                    {plan.badge}
                  </div>
                )}

                <div className="plan-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-desc">{plan.description}</p>
                </div>

                <div className="plan-price-row">
                  <span className="price-number">{price}</span>
                  <span className="price-period">/{plan.period}</span>
                </div>

                <button
                  onClick={() => handleChoosePlan(plan)}
                  className={`btn ${plan.featured ? 'btn-primary' : 'btn-secondary'} plan-cta-btn`}
                  disabled={plan.isCurrent}
                >
                  {plan.cta}
                </button>

                <div className="plan-features-divider" />

                <div className="plan-features-list">
                  <div className="features-title">What's included:</div>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="feature-item">
                      <div className="feature-check-icon">
                        <Check size={14} color="#10b981" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Matrix Table */}
        <div className="lynk-card comparison-table-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 16 }}>
            Feature Comparison Breakdown
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Platform Capability</th>
                  <th>Free Basic</th>
                  <th>Lynk Career Premium</th>
                  <th>Recruiter Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Direct Recruiter InMail</td>
                  <td>—</td>
                  <td>15 / month</td>
                  <td>150 / month</td>
                </tr>
                <tr>
                  <td>Who Viewed Your Profile</td>
                  <td>Last 5 viewers</td>
                  <td>Full 90 days history</td>
                  <td>Full unlimited</td>
                </tr>
                <tr>
                  <td>Featured Applicant Status</td>
                  <td>—</td>
                  <td>Included</td>
                  <td>Included</td>
                </tr>
                <tr>
                  <td>ATS Kanban Pipeline</td>
                  <td>—</td>
                  <td>—</td>
                  <td>Full 5-Stage Kanban</td>
                </tr>
                <tr>
                  <td>Verified Salary Benchmarks</td>
                  <td>Basic</td>
                  <td>Full breakdown</td>
                  <td>Full breakdown</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Upgrade Checkout Modal */}
      <Modal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        title="Upgrade Your HireLynk Subscription"
        size="md"
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, width: '100%' }}>
            <button
              onClick={() => setCheckoutModalOpen(false)}
              className="btn btn-ghost"
              disabled={isProcessing}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmUpgrade}
              className="btn btn-primary"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing Payment...' : 'Confirm Upgrade (Demo)'}
            </button>
          </div>
        }
      >
        <div style={{ padding: '6px 0' }}>
          <div style={{ padding: 16, background: 'var(--primary-light)', borderRadius: 'var(--radius-md)', marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--navy-900)' }}>
                  {selectedPlan?.name}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Billed {billingCycle === 'annual' ? 'Annually (Save 20%)' : 'Monthly'}
                </div>
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>
                {billingCycle === 'annual' ? selectedPlan?.priceAnnual : selectedPlan?.priceMonthly}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Subscriber Name</label>
            <input type="text" className="form-input" value={currentUser?.name || 'Sarah Jenkins'} disabled />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="text" className="form-input" value={currentUser?.email || 'sarah.jenkins@example.com'} disabled />
          </div>

          <div style={{ padding: 12, background: 'var(--bg-hover)', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            🔒 Demo Simulation: No real payment required. Clicking "Confirm Upgrade" will simulate a successful transaction and upgrade your session credentials!
          </div>
        </div>
      </Modal>
    </div>
  );
};
