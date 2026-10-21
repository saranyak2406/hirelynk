# HireLynk - Modern Recruitment & Professional Network

HireLynk is a full-featured, modern, responsive professional networking and recruitment web application inspired by LinkedIn, built with **React 19, Vite, React Router, Lucide React, and Vanilla CSS**.

---

## 🌟 Highlights & Key Features

- **LinkedIn-Inspired UI Design System:** Fixed navigation bar, global search bar, notification badges, profile dropdown, glassmorphism accents, crisp typography (`Plus Jakarta Sans` & `Inter`), and responsive multi-column layouts.
- **Frontend Only with Realistic Mock Data:** Persisted in `localStorage` across page reloads. Includes full state management for jobs, bookmarks, applications, posts, comments, likes, connection requests, messaging, and candidate pipelines.
- **Role-Based Demo Switcher:** 1-Click instant toggle between:
  - 👩‍💻 **Job Seeker (Sarah Jenkins):** Senior Frontend Engineer, ex-Shopify, Open to Work.
  - 💼 **Recruiter (David Vance):** Head of Technical Talent Acquisition @ CloudScale AI.
  - 🛡️ **Platform Admin (Eleanor Vance):** Platform Operations & Trust Lead.
- **Confetti & Interactive Feedback:** Animated micro-interactions, custom toast notification system, and confetti bursts on successful applications and upgrades.

---

## 📱 Page Overview

| Page | Route | Description |
| :--- | :--- | :--- |
| **Landing Page** | `/home` or `/` (when logged out) | Hero section with dynamic search, popular job categories, featured companies, latest curated jobs, benefits comparison, and footer. |
| **Talent Feed** | `/feed` | 3-column LinkedIn-style feed, "Start a post" modal (tags, media), interactive like/comment/share, trending news, and suggested connections. |
| **Jobs Marketplace** | `/jobs` | Advanced search by title, skills, and location; filter by work mode (Remote/Hybrid/Onsite), job type, experience; split view with sticky details pane; "Easy Apply" modal with resume selector. |
| **My Network** | `/network` | Manage connections, accept/ignore pending invitations, and explore "People You May Know in Tech" grid. |
| **User Profile** | `/profile` | Profile banner, avatar, "Open to Work" toggle, about section, work experience, education, interactive skills endorsements, and simulated PDF resume viewer. |
| **Messaging** | `/messaging` | Two-pane chat with active search, online presence indicator, message timestamps, and simulated recruiter auto-reply. |
| **Notifications** | `/notifications` | Tabbed alerts for jobs, network invitations, application status updates, and post engagement with mark-as-read controls. |
| **Recruiter Dashboard** | `/recruiter` | ATS Candidate Pipeline Kanban board (Applied ➡️ Screening ➡️ Interview ➡️ Offered ➡️ Rejected), job posting modal, and active job listings manager. |
| **Admin Dashboard** | `/admin` | Platform analytics cards, user suspension/reactivation, job moderation, flagged reports queue, and audit logs. |
| **Pricing & Plans** | `/pricing` | Tiered plans for Job Seekers (Free Basic vs Career Premium) and Recruiters (Starter vs Enterprise), annual/monthly billing toggle, and interactive checkout modal. |
| **Auth** | `/login`, `/register` | Split-screen registration for Job Seekers vs Recruiters with form validation and password visibility toggle. |

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18+ (tested on Node v24)
- **npm**: v9+

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open **[http://127.0.0.1:5173/](http://127.0.0.1:5173/)** in your browser.

### 4. Build for Production
```bash
npm run build
```
Verify the production build using:
```bash
npm run preview
```

---

## 🛠️ Project Architecture

```
hirelynk/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx         # Fixed top bar with global search, badges, & role switcher
│   │   │   ├── Navbar.css
│   │   │   ├── Footer.jsx         # Modern responsive multi-column footer
│   │   │   └── Modal.jsx          # Reusable modal wrapper with ESC & backdrop handlers
│   │   ├── feed/
│   │   │   ├── FeedLeftSidebar.jsx
│   │   │   ├── FeedRightSidebar.jsx
│   │   │   ├── CreatePostModal.jsx
│   │   │   ├── PostCard.jsx
│   │   │   └── Feed.css
│   │   ├── jobs/
│   │   │   ├── JobCard.jsx
│   │   │   ├── JobDetailView.jsx
│   │   │   ├── ApplyModal.jsx
│   │   │   └── Jobs.css
│   │   ├── profile/
│   │   │   ├── EditProfileModal.jsx
│   │   │   ├── AddExperienceModal.jsx
│   │   │   └── ResumeViewerModal.jsx
│   │   └── recruiter/
│   │       ├── ATSKanban.jsx      # 5-Stage candidate recruitment pipeline
│   │       ├── ApplicantDetailModal.jsx
│   │       ├── PostJobModal.jsx
│   │       └── Recruiter.css
│   ├── context/
│   │   ├── AuthContext.jsx        # Demo authentication, user state, & role switcher
│   │   ├── DataContext.jsx        # Jobs, posts, network, messages, notifications, localStorage sync
│   │   └── ToastContext.jsx       # Floating notifications (success, error, info)
│   ├── data/
│   │   └── initialData.js         # Comprehensive mock datasets
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── FeedPage.jsx
│   │   ├── JobsPage.jsx
│   │   ├── NetworkPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── MessagingPage.jsx
│   │   ├── NotificationsPage.jsx
│   │   ├── RecruiterDashboardPage.jsx
│   │   ├── AdminDashboardPage.jsx
│   │   ├── PricingPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── App.jsx                    # Routing configuration & layout
│   ├── index.css                  # Design system, CSS variables, typography, & utilities
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## 💡 Demo Tips

1. **Role Switching:** Click the user avatar ("Me") in the top navigation bar to instantly switch between **Sarah (Job Seeker)**, **David (Recruiter)**, and **Eleanor (Admin)**.
2. **Apply to a Job:** Go to **Jobs**, click any position, click **Easy Apply with HireLynk**, select your resume, and submit to see confetti celebration and live ATS updates.
3. **Simulated Recruiter Chat:** Go to **Messaging**, send any message to David Vance, and watch the automated context-aware reply trigger in real time.
4. **Post a Job as Recruiter:** Switch to the Recruiter role or click "Recruiter" in the navbar, then click "Post a New Job". The newly created job will immediately appear on the live job board!
5. **Reset Demo Data:** At any time, open the user dropdown in the navbar and click **"Reset All Demo Data"** to restore initial mock data.
