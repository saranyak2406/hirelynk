// initialData.js - Comprehensive Mock Data for HireLynk

export const INITIAL_USERS = [
  {
    id: "user-1",
    name: "Sarah Jenkins",
    role: "talent", // 'talent' | 'recruiter' | 'admin'
    email: "sarah.jenkins@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&auto=format&fit=crop&q=80",
    headline: "Senior Frontend Engineer | React 19 • TypeScript • Next.js | Ex-Shopify",
    location: "San Francisco, California (Hybrid)",
    openToWork: true,
    connectionsCount: 842,
    profileViews: 1240,
    about: "Passionate Senior Frontend Engineer with 7+ years of experience designing and scaling ultra-responsive, accessible, and high-performance web applications. Deeply interested in design systems, micro-frontends, and AI-assisted UX workflows. Looking for staff/lead frontend roles at fast-moving product companies.",
    skills: [
      { name: "React.js", endorsements: 64 },
      { name: "TypeScript", endorsements: 52 },
      { name: "Next.js", endorsements: 41 },
      { name: "GraphQL", endorsements: 29 },
      { name: "Tailwind / Modern CSS", endorsements: 48 },
      { name: "State Management & Performance", endorsements: 33 },
      { name: "Design Systems", endorsements: 38 }
    ],
    experience: [
      {
        id: "exp-1",
        title: "Senior Frontend Engineer",
        company: "Shopify",
        companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&auto=format&fit=crop&q=80",
        location: "Remote, United States",
        startDate: "Jan 2023",
        endDate: "Present",
        current: true,
        description: "Spearheaded the developer tools workbench rewrite, decreasing checkout dashboard bundle size by 38% and boosting Lighthouse performance score to 98/100 across 40k merchant storefronts."
      },
      {
        id: "exp-2",
        title: "Frontend Software Engineer",
        company: "Vercel Partner Labs",
        companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&auto=format&fit=crop&q=80",
        location: "San Francisco, CA",
        startDate: "Mar 2020",
        endDate: "Dec 2022",
        current: false,
        description: "Built edge-rendered customer dashboard modules using React, WebSockets, and modern CSS tokens. Collaborated closely with design team to author component libraries."
      }
    ],
    education: [
      {
        id: "edu-1",
        school: "University of California, Berkeley",
        degree: "B.S. in Computer Science",
        startDate: "2016",
        endDate: "2020",
        activities: "ACM Student Chapter President, Dean's Honors List"
      }
    ],
    projects: [
      {
        id: "proj-1",
        name: "DevPulse - Open Source Dev Metrics",
        link: "https://github.com/example/devpulse",
        description: "A lightweight desktop & web dashboard aggregating Git commits, code reviews, and CI/CD pipelines into actionable developer health insights."
      },
      {
        id: "proj-2",
        name: "Aether UI Kit",
        link: "https://aetherui.example.com",
        description: "Zero-runtime accessible React component library with WCAG AAA compliance and fluid typography."
      }
    ],
    resume: {
      fileName: "Sarah_Jenkins_Senior_Frontend_2026.pdf",
      uploadDate: "Oct 14, 2026",
      size: "245 KB"
    }
  },
  {
    id: "user-2",
    name: "David Vance",
    role: "recruiter",
    email: "david.vance@cloudscale.io",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&auto=format&fit=crop&q=80",
    headline: "Head of Technical Talent Acquisition @ CloudScale AI & Stripe Partner",
    company: "CloudScale AI",
    location: "New York, NY",
    connectionsCount: 3200,
    about: "Recruiting elite software engineers, AI researchers, and engineering leaders who want to tackle generational scale challenges. Always open to discussing career moves."
  },
  {
    id: "user-3",
    name: "Eleanor Vance",
    role: "admin",
    email: "admin@hirelynk.com",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    headline: "Platform Operations Director & Trust Lead @ HireLynk",
    company: "HireLynk Inc.",
    location: "San Francisco, CA",
    connectionsCount: 1540,
    about: "Leading platform integrity, moderation systems, and recruiter verification standards across HireLynk."
  },
  {
    id: "user-4",
    name: "Marcus Chen",
    role: "talent",
    email: "marcus.chen@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    headline: "Staff Machine Learning Engineer @ Anthropic | LLM Architectures",
    location: "Seattle, WA",
    connectionsCount: 1890,
    about: "Deep learning engineer focusing on fine-tuning reasoning models and scalable inference architectures."
  },
  {
    id: "user-5",
    name: "Priya Sharma",
    role: "talent",
    email: "priya.sharma@example.com",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    headline: "Lead Product Designer @ Stripe | FinTech Design Systems & UX",
    location: "San Francisco, CA",
    connectionsCount: 2450,
    about: "Crafting delightful, invisible payment experiences for millions of creators and internet businesses."
  },
  {
    id: "user-6",
    name: "Alex Rivera",
    role: "talent",
    email: "alex.rivera@example.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    headline: "Full Stack Engineer @ Airbnb | Node.js • React • Distributed Systems",
    location: "Austin, TX",
    connectionsCount: 910,
    about: "Building real-time booking engines and high-volume data streams."
  }
];

export const INITIAL_JOBS = [
  {
    id: "job-1",
    title: "Senior Frontend Engineer (React / TypeScript)",
    company: "CloudScale AI",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
    location: "San Francisco, CA (Hybrid)",
    workMode: "Hybrid",
    type: "Full-time",
    experience: "Senior (5+ yrs)",
    salary: "$160,000 - $210,000 / yr",
    postedDate: "2 days ago",
    applicantsCount: 34,
    recruiterId: "user-2",
    status: "active",
    featured: true,
    skills: ["React.js", "TypeScript", "Next.js", "Performance Optimization", "GraphQL"],
    description: "CloudScale AI is searching for a world-class Senior Frontend Engineer to build intuitive, mission-critical generative AI model evaluation workflows. You will partner directly with our founding research and engineering teams to transform raw distributed data into lightning-fast interactive interfaces.",
    responsibilities: [
      "Architect and ship modern frontend interfaces using React 19, TypeScript, and micro-frontend patterns.",
      "Work closely with ML engineers to stream low-latency tokens and complex canvas visualizers.",
      "Establish strict web performance benchmarks and lead frontend code quality reviews.",
      "Mentor mid-level engineers and contribute to our internal design system."
    ],
    requirements: [
      "5+ years of production experience with modern React, TypeScript, and CSS-in-JS or custom design tokens.",
      "Proven track record building enterprise web apps with heavy data visualization needs.",
      "Deep understanding of browser rendering pipelines, Web Workers, and state synchronization.",
      "Strong aesthetic sensibility and attention to micro-interactions."
    ],
    benefits: [
      "Competitive base salary + high-upside equity package",
      "Comprehensive medical, dental, and vision insurance covered 100%",
      "$4,000 annual learning & conference stipend",
      "Flexible hybrid model (2 days office, 3 days remote) with lunch catered"
    ]
  },
  {
    id: "job-2",
    title: "Staff Machine Learning Infrastructure Engineer",
    company: "Anthropic AI Labs",
    companyLogo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    location: "Remote (US / Canada)",
    workMode: "Remote",
    type: "Full-time",
    experience: "Staff / Principal",
    salary: "$230,000 - $310,000 / yr",
    postedDate: "3 days ago",
    applicantsCount: 68,
    recruiterId: "user-2",
    status: "active",
    featured: true,
    skills: ["Python", "Kubernetes", "PyTorch", "Ray", "Distributed Systems"],
    description: "Join Anthropic's core inference platform team. We are pushing the frontier of safe AI alignment and require distributed infrastructure engineers capable of managing tens of thousands of GPUs seamlessly.",
    responsibilities: [
      "Scale GPU training clusters and reduce multi-node network bottlenecks.",
      "Build automated health-checking and fault recovery orchestration using Kubernetes and Ray.",
      "Benchmark kernel performance and optimize model serving latencies."
    ],
    requirements: [
      "7+ years experience in distributed systems, high performance computing (HPC), or ML infra.",
      "Hands-on expertise with PyTorch, CUDA, NCCL, and cluster orchestration.",
      "B.S., M.S., or Ph.D. in Computer Science or equivalent field."
    ],
    benefits: ["Unlimited PTO", "Generous equity grant", "Home office setup budget ($3,000)"]
  },
  {
    id: "job-3",
    title: "Lead Product Designer (Design Systems)",
    company: "Stripe",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80",
    location: "New York, NY (Hybrid)",
    workMode: "Hybrid",
    type: "Full-time",
    experience: "Lead (6+ yrs)",
    salary: "$180,000 - $240,000 / yr",
    postedDate: "1 day ago",
    applicantsCount: 19,
    recruiterId: "user-2",
    status: "active",
    featured: true,
    skills: ["Figma", "Design Systems", "Prototyping", "Accessibility", "Design Tokens"],
    description: "Stripe is seeking an inspiring Lead Product Designer to guide the evolution of our global design system. You will author tokens, interactive components, and guidelines utilized by hundreds of designers and engineers worldwide.",
    responsibilities: [
      "Define and scale design system primitives across web, mobile, and merchant dashboard.",
      "Champion universal accessibility standards and visual excellence.",
      "Partner with product managers and engineers to codify ergonomic reusable UI patterns."
    ],
    requirements: [
      "6+ years designing scalable software interfaces with at least 3 years on design systems.",
      "Mastery of Figma variables, component variants, and interactive prototyping.",
      "Basic understanding of HTML/CSS code mechanics to ensure high-fidelity implementation."
    ],
    benefits: ["Full health & wellness coverage", "401(k) matching", "Relocation assistance"]
  },
  {
    id: "job-4",
    title: "Senior DevOps & Cloud Platform Architect",
    company: "DataDog Systems",
    companyLogo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80",
    location: "Austin, TX (Onsite)",
    workMode: "Onsite",
    type: "Full-time",
    experience: "Senior (5+ yrs)",
    salary: "$165,000 - $205,000 / yr",
    postedDate: "5 days ago",
    applicantsCount: 42,
    recruiterId: "user-2",
    status: "active",
    featured: false,
    skills: ["AWS", "Terraform", "Docker", "Kubernetes", "CI/CD", "Prometheus"],
    description: "Lead cloud infrastructure resilience, automated provisioning, and multi-region failover strategy for our high-throughput monitoring platform.",
    responsibilities: [
      "Manage multi-account AWS topologies using Terraform and GitOps practices.",
      "Implement zero-trust security postures and automated vulnerability scanning.",
      "Participate in on-call rotations and author clear post-incident remediation plans."
    ],
    requirements: [
      "Solid foundation in Linux systems administration and container networking.",
      "Proficiency with Terraform, AWS, and modern observability stacks."
    ],
    benefits: ["Annual bonus", "Stock purchase plan", "Gym and wellness allowance"]
  },
  {
    id: "job-5",
    title: "Full Stack Engineer (Node.js & React)",
    company: "FinFlow Technologies",
    companyLogo: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=100&auto=format&fit=crop&q=80",
    location: "Remote (Worldwide)",
    workMode: "Remote",
    type: "Full-time",
    experience: "Mid-Level (3+ yrs)",
    salary: "$130,000 - $165,000 / yr",
    postedDate: "Just now",
    applicantsCount: 12,
    recruiterId: "user-2",
    status: "active",
    featured: true,
    skills: ["React", "Node.js", "PostgreSQL", "TypeScript", "REST APIs"],
    description: "FinFlow is an emerging financial automation platform enabling SaaS companies to automate invoice reconciliation. We are looking for a nimble Full Stack Engineer.",
    responsibilities: [
      "Develop customer-facing financial dashboards and webhook processing engines.",
      "Maintain clean PostgreSQL schemas and Redis caching layers.",
      "Ship high-impact features end-to-end within 2-week agile sprints."
    ],
    requirements: [
      "3+ years experience building web applications in Node.js and modern React.",
      "Understanding of relational databases, transactions, and idempotent API design."
    ],
    benefits: ["100% remote flexibility", "Flexible working hours across timezones", "Co-working space allowance"]
  },
  {
    id: "job-6",
    title: "Mobile App Engineer (React Native / Flutter)",
    company: "Pulse Health",
    companyLogo: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=100&auto=format&fit=crop&q=80",
    location: "Boston, MA (Hybrid)",
    workMode: "Hybrid",
    type: "Full-time",
    experience: "Mid to Senior (4+ yrs)",
    salary: "$145,000 - $185,000 / yr",
    postedDate: "4 days ago",
    applicantsCount: 28,
    recruiterId: "user-2",
    status: "active",
    featured: false,
    skills: ["React Native", "TypeScript", "Mobile UX", "Offline Sync", "Redux"],
    description: "Pulse Health is building the next-generation patient health monitor that connects with wearable IoT devices in real time.",
    responsibilities: [
      "Build offline-first mobile applications with biometric security and Bluetooth synchronization.",
      "Ensure 60fps animations and smooth transitions across iOS and Android devices."
    ],
    requirements: [
      "4+ years of cross-platform or native mobile development experience.",
      "Familiarity with HIPAA compliance and secure local storage mechanisms."
    ],
    benefits: ["Health savings account", "Flexible hybrid schedule", "Parental leave"]
  }
];

export const INITIAL_POSTS = [
  {
    id: "post-1",
    authorId: "user-4",
    authorName: "Marcus Chen",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    authorHeadline: "Staff Machine Learning Engineer @ Anthropic",
    timeAgo: "2 hours ago",
    content: "The biggest shift I've noticed in high-performing engineering teams this year isn't just using AI for autocomplete—it's using LLMs as architectural sounding boards. \n\nWhen designing distributed cache invalidation strategies or database sharding schemes, having an AI walk through edge-cases in seconds saves days of whiteboard debates.\n\nAre you and your team using AI during the system design phase yet? What has been your biggest win?",
    tags: ["#ArtificialIntelligence", "#SystemDesign", "#EngineeringLeadership", "#TechTrends"],
    likesCount: 142,
    hasLiked: false,
    sharesCount: 18,
    comments: [
      {
        id: "c-1",
        authorName: "Sarah Jenkins",
        authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
        authorHeadline: "Senior Frontend Engineer",
        text: "Completely agree Marcus. We recently used it to simulate state race conditions in micro-frontends and it caught 3 edge cases before code was even drafted!",
        timeAgo: "1 hour ago"
      },
      {
        id: "c-2",
        authorName: "Alex Rivera",
        authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        authorHeadline: "Full Stack Engineer @ Airbnb",
        text: "Spot on. The key is asking it to act as an adversary looking for fail points.",
        timeAgo: "30 mins ago"
      }
    ]
  },
  {
    id: "post-2",
    authorId: "user-2",
    authorName: "David Vance",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    authorHeadline: "Head of Technical Talent Acquisition @ CloudScale AI",
    timeAgo: "5 hours ago",
    content: "🚀 We are expanding our core team at CloudScale AI!\n\nWe're actively hiring for:\n• Senior Frontend Engineer (React 19, TypeScript)\n• Staff ML Infrastructure Engineer\n• Senior Cloud DevOps Architect\n\nAll roles come with top-tier compensation, high equity upside, and the chance to work alongside some of the sharpest minds in generative compute.\n\nIf you're passionate about craftsmanship, drop a comment or check out our open listings under the Jobs tab. Let's talk! 💼✨",
    tags: ["#Hiring", "#TechJobs", "#React", "#MachineLearning", "#CareerOpportunity"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80",
    likesCount: 388,
    hasLiked: true,
    sharesCount: 45,
    comments: [
      {
        id: "c-3",
        authorName: "Priya Sharma",
        authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        authorHeadline: "Lead Product Designer @ Stripe",
        text: "David's team is fantastic! Highly recommend anyone looking for their next challenge to reach out.",
        timeAgo: "3 hours ago"
      }
    ]
  },
  {
    id: "post-3",
    authorId: "user-1",
    authorName: "Sarah Jenkins",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    authorHeadline: "Senior Frontend Engineer | React 19 • TypeScript • Next.js",
    timeAgo: "1 day ago",
    content: "Thrilled to share that my open-source project 'DevPulse' just crossed 2,000 stars on GitHub! 🌟\n\nWhen I started building it on weekends, I just wanted a simple tool to visualize team pull-request velocities without heavy third-party tracking. Building in public taught me so much about user-first design and listening to developer feedback.\n\nThank you to everyone who tested early builds, reported issues, and submitted PRs. Open source is truly magical. 💻❤️",
    tags: ["#OpenSource", "#WebDevelopment", "#React", "#DeveloperExperience", "#Milestone"],
    likesCount: 512,
    hasLiked: true,
    sharesCount: 62,
    comments: [
      {
        id: "c-4",
        authorName: "Marcus Chen",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        authorHeadline: "Staff ML Engineer",
        text: "Huge congratulations Sarah! Well deserved, DevPulse is a daily staple for our engineering standups.",
        timeAgo: "22 hours ago"
      }
    ]
  }
];

export const INITIAL_CONNECTIONS = [
  {
    id: "conn-1",
    userId: "user-4",
    name: "Marcus Chen",
    headline: "Staff Machine Learning Engineer @ Anthropic",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    mutualCount: 18,
    status: "connected",
    connectedDate: "2 months ago"
  },
  {
    id: "conn-2",
    userId: "user-5",
    name: "Priya Sharma",
    headline: "Lead Product Designer @ Stripe",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    mutualCount: 24,
    status: "connected",
    connectedDate: "3 weeks ago"
  },
  {
    id: "conn-3",
    userId: "user-2",
    name: "David Vance",
    headline: "Head of Technical Talent Acquisition @ CloudScale AI",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    mutualCount: 12,
    status: "connected",
    connectedDate: "Yesterday"
  }
];

export const INITIAL_SUGGESTIONS = [
  {
    id: "sug-1",
    name: "Elena Rostova",
    headline: "VP of Engineering @ CloudMetrics | Scaling Teams 0 to 150",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    mutualCount: 31,
    company: "CloudMetrics"
  },
  {
    id: "sug-2",
    name: "Jordan Lee",
    headline: "Cloud Native & DevOps Architect | AWS Hero",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    mutualCount: 14,
    company: "AWS"
  },
  {
    id: "sug-3",
    name: "Chloe Dupont",
    headline: "Senior Director of Tech Recruiting @ Horizon Ventures",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    mutualCount: 8,
    company: "Horizon Ventures"
  },
  {
    id: "sug-4",
    name: "Tariq Al-Mansoor",
    headline: "Principal Distributed Database Engineer @ CockroachDB",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    mutualCount: 19,
    company: "CockroachDB"
  }
];

export const INITIAL_REQUESTS = [
  {
    id: "req-1",
    name: "Kevin Patel",
    headline: "Senior Engineering Manager @ Figma",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    mutualCount: 27,
    receivedTime: "1 day ago",
    note: "Hey Sarah! Saw your recent post regarding micro-frontends and loved your insights. Would love to connect!"
  },
  {
    id: "req-2",
    name: "Sophia Martinez",
    headline: "Technical Recruiter @ OpenAI",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    mutualCount: 15,
    receivedTime: "3 days ago",
    note: "Hi Sarah, your frontend experience at Shopify is very impressive. We're hiring for key frontend leadership roles at OpenAI."
  }
];

export const INITIAL_CONVERSATIONS = [
  {
    id: "conv-1",
    participantId: "user-2",
    participantName: "David Vance",
    participantHeadline: "Head of Technical Talent Acquisition @ CloudScale AI",
    participantAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    online: true,
    unreadCount: 1,
    lastMessage: "Hi Sarah! We reviewed your profile for our Senior Frontend position. Would you be open for a quick 15-min chat this Thursday?",
    lastTimestamp: "10:45 AM",
    messages: [
      {
        id: "m-1",
        senderId: "user-2",
        text: "Hi Sarah! I came across your portfolio and Open Source project DevPulse. Exceptional craftsmanship!",
        timestamp: "Yesterday, 4:15 PM"
      },
      {
        id: "m-2",
        senderId: "user-1",
        text: "Hi David! Thank you so much for the kind words. Glad you checked out DevPulse!",
        timestamp: "Yesterday, 4:32 PM"
      },
      {
        id: "m-3",
        senderId: "user-2",
        text: "Hi Sarah! We reviewed your profile for our Senior Frontend position. Would you be open for a quick 15-min chat this Thursday?",
        timestamp: "10:45 AM"
      }
    ]
  },
  {
    id: "conv-2",
    participantId: "user-5",
    participantName: "Priya Sharma",
    participantHeadline: "Lead Product Designer @ Stripe",
    participantAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    online: false,
    unreadCount: 0,
    lastMessage: "Let's definitely catch up at the upcoming React Conf!",
    lastTimestamp: "Oct 18",
    messages: [
      {
        id: "m-201",
        senderId: "user-5",
        text: "Hey Sarah! Are you going to be speaking at React Conf this year?",
        timestamp: "Oct 18, 2:10 PM"
      },
      {
        id: "m-202",
        senderId: "user-1",
        text: "Yes! Giving a lightning talk on modern state patterns. You going?",
        timestamp: "Oct 18, 2:30 PM"
      },
      {
        id: "m-203",
        senderId: "user-5",
        text: "Let's definitely catch up at the upcoming React Conf!",
        timestamp: "Oct 18, 2:45 PM"
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    type: "job",
    title: "New Job Match For You",
    message: "CloudScale AI posted 'Senior Frontend Engineer (React/TypeScript)' matching your skills.",
    timeAgo: "2 hours ago",
    read: false,
    link: "/jobs?id=job-1"
  },
  {
    id: "notif-2",
    type: "connection",
    title: "Connection Accepted",
    message: "David Vance accepted your connection request.",
    timeAgo: "5 hours ago",
    read: false,
    link: "/network"
  },
  {
    id: "notif-3",
    type: "post",
    title: "Engagement on Your Post",
    message: "Marcus Chen and 48 others liked your post about 'DevPulse open-source milestone'.",
    timeAgo: "1 day ago",
    read: true,
    link: "/feed"
  },
  {
    id: "notif-4",
    type: "application",
    title: "Application Status Updated",
    message: "Your application for 'Senior Frontend Engineer' at Stripe was moved to 'Reviewing'.",
    timeAgo: "2 days ago",
    read: true,
    link: "/jobs"
  }
];

export const INITIAL_APPLICANTS = [
  {
    id: "app-1",
    jobId: "job-1",
    jobTitle: "Senior Frontend Engineer (React / TypeScript)",
    candidateId: "user-1",
    candidateName: "Sarah Jenkins",
    candidateEmail: "sarah.jenkins@example.com",
    candidateHeadline: "Senior Frontend Engineer | React 19 • TypeScript • Next.js | Ex-Shopify",
    candidateAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    location: "San Francisco, CA",
    experienceYears: "7+ years",
    appliedDate: "Yesterday",
    stage: "Interview", // 'Applied' | 'Screening' | 'Interview' | 'Offered' | 'Rejected'
    rating: 5,
    coverNote: "I've led frontend performance optimization at Shopify and have built scalable enterprise design systems. Excited about CloudScale's mission!",
    resumeFileName: "Sarah_Jenkins_Senior_Frontend_2026.pdf"
  },
  {
    id: "app-2",
    jobId: "job-1",
    jobTitle: "Senior Frontend Engineer (React / TypeScript)",
    candidateId: "user-6",
    candidateName: "Alex Rivera",
    candidateEmail: "alex.rivera@example.com",
    candidateHeadline: "Full Stack Engineer @ Airbnb",
    candidateAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    location: "Austin, TX",
    experienceYears: "5 years",
    appliedDate: "3 days ago",
    stage: "Screening",
    rating: 4,
    coverNote: "Strong experience in React and Node.js microservices. Looking to transition fully into high-intensity AI tooling interfaces.",
    resumeFileName: "Alex_Rivera_Resume.pdf"
  },
  {
    id: "app-3",
    jobId: "job-1",
    jobTitle: "Senior Frontend Engineer (React / TypeScript)",
    candidateId: "cand-3",
    candidateName: "Liam O'Connor",
    candidateEmail: "liam.oc@example.com",
    candidateHeadline: "Lead UI Developer @ FinTech Pulse",
    candidateAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    location: "Remote",
    experienceYears: "6 years",
    appliedDate: "4 days ago",
    stage: "Applied",
    rating: 4,
    coverNote: "Passionate about clean architecture and accessible UX design.",
    resumeFileName: "Liam_OConnor_Frontend.pdf"
  },
  {
    id: "app-4",
    jobId: "job-2",
    jobTitle: "Staff Machine Learning Infrastructure Engineer",
    candidateId: "cand-4",
    candidateName: "Chen Wei",
    candidateEmail: "chen.wei@example.com",
    candidateHeadline: "Senior Distributed ML Engineer @ ByteDance",
    candidateAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    location: "Seattle, WA",
    experienceYears: "8 years",
    appliedDate: "2 days ago",
    stage: "Offered",
    rating: 5,
    coverNote: "Expert in PyTorch DDP, Ray cluster orchestration, and high-bandwidth InfiniBand networking.",
    resumeFileName: "Chen_Wei_Staff_ML_Resume.pdf"
  }
];

export const INITIAL_REPORTS = [
  {
    id: "rep-1",
    type: "Job Listing",
    reportedItem: "Junior Solidity Engineer (Suspicious Crypto Scheme)",
    reportedBy: "Alex Rivera",
    reason: "Suspected fake recruitment company / phishing",
    status: "Pending Review",
    date: "Oct 20, 2026"
  },
  {
    id: "rep-2",
    type: "User Profile",
    reportedItem: "Fake Recruiter Account 'Quick Hires 247'",
    reportedBy: "Marcus Chen",
    reason: "Spam InMail messaging violating terms",
    status: "Resolved",
    date: "Oct 19, 2026"
  }
];

export const TRENDING_NEWS = [
  { id: 1, title: "Tech Hiring Rebounds in Q4 2026", readers: "34,912 readers", time: "3h ago" },
  { id: 2, title: "React 19 Adoption Doubles in Enterprise", readers: "18,450 readers", time: "5h ago" },
  { id: 3, title: "AI Agents Become Standard in Dev Workflows", readers: "52,190 readers", time: "8h ago" },
  { id: 4, title: "Remote Salary Parity: New Global Trends", readers: "14,200 readers", time: "1d ago" },
  { id: 5, title: "Cloud Security Certifications in High Demand", readers: "9,800 readers", time: "1d ago" }
];
