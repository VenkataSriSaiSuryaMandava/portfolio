import type { SkillCategory, Project, Experience, Publication, Education } from '@/types';

/**
 * This file contains placeholder data used throughout the portfolio.  Replace
 * these objects and arrays with your own information.  Each section
 * component imports the relevant pieces from this file to populate the UI.
 */

export const skillCategories: SkillCategory[] = [
  {
    category: 'Programming Languages',
    skills: [
      { name: 'Python' },
      { name: 'Java' },
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'SQL' },
      { name: 'C/C++' },
    ],
  },
  {
    category: 'Frameworks & Libraries',
    skills: [{ name: 'React' }, { name: 'Next.js' }, { name: 'Node.js' }, { name: 'Express' }, { name: 'FastAPI' }],
  },
  {
    category: 'Frontend',
    skills: [{ name: 'Tailwind CSS' }, { name: 'Framer Motion' }, { name: 'HTML5' }, { name: 'CSS3' }],
  },
  {
    category: 'Backend',
    skills: [{ name: 'REST APIs' }, { name: 'Authentication (JWT/OAuth)' }, { name: 'Microservices' }, { name: 'System Design' }],
  },
  {
    category: 'Databases',
    skills: [{ name: 'PostgreSQL' }, { name: 'MongoDB' }, { name: 'MySQL' }, { name: 'Redis' }],
  },
  {
    category: 'Tools & Platforms',
    skills: [{ name: 'Git/GitHub' }, { name: 'Docker' }, { name: 'Linux' }, { name: 'VS Code' }],
  },
  {
    category: 'Testing & Quality',
    skills: [
      { name: 'Jest' },
      { name: 'React Testing Library' },
      { name: 'Cypress' },
      { name: 'Unit Testing' },
    ],
  },
  {
    category: 'Cloud & DevOps',
    skills: [{ name: 'AWS' }, { name: 'GCP' }, { name: 'Azure' }, { name: 'Kubernetes' }],
  },
  {
    category: 'AI / ML',
    skills: [{ name: 'Machine Learning' }, { name: 'Deep Learning' }, { name: 'PyTorch' }, { name: 'TensorFlow' }, { name: 'NLP' }],
  },
  {
    category: 'Core Concepts',
    skills: [{ name: 'Data Structures & Algorithms' }, { name: 'OOP' }, { name: 'Operating Systems' }, { name: 'DBMS' }, { name: 'Computer Networks' }],
  },
];

/**
 * Skill metadata used for premium UI treatments in the Technical Skills section.
 * - level: Core / Proficient / Working (no percentages)
 * - used: optional override for "Used in Projects" indicator
 */
export const skillMeta: Record<string, { level?: 'Core' | 'Proficient' | 'Working'; used?: boolean }> = {
  // Core
  React: { level: 'Core' },
  'Next.js': { level: 'Core' },
  JavaScript: { level: 'Core' },
  TypeScript: { level: 'Core' },
  'Node.js': { level: 'Core' },
  Express: { level: 'Core' },
  'REST APIs': { level: 'Core', used: true },
  SQL: { level: 'Core' },
  'Git/GitHub': { level: 'Core', used: true },

  // Proficient
  Python: { level: 'Proficient' },
  FastAPI: { level: 'Proficient' },
  PostgreSQL: { level: 'Proficient' },
  MongoDB: { level: 'Proficient' },
  Docker: { level: 'Proficient' },
  AWS: { level: 'Proficient' },
  'System Design': { level: 'Proficient', used: true },
  'Authentication (JWT/OAuth)': { level: 'Proficient', used: true },

  // Working
  Kubernetes: { level: 'Working' },
  GCP: { level: 'Working' },
  Azure: { level: 'Working' },
  Redis: { level: 'Working' },
  TensorFlow: { level: 'Working' },
  PyTorch: { level: 'Working' },
  NLP: { level: 'Working' },
  Microservices: { level: 'Working', used: true },
};



export const projects: Project[] = [
  {
    title: 'RoomieConnect',
    tagline: 'Splitwise-style expense sharing with ledger-backed balances and secure settle-up.',
    description:
      'A production-grade full-stack web app for roommates and small groups to track shared expenses, split costs fairly, and settle balances with a clear activity trail.',
    highlights: [
      'Designed and shipped a ledger-based expense engine that kept balances consistent across edits and deletions, preventing reconciliation drift on 1,000+ transactions.',
      'Built secure REST APIs with validation and auth to protect financial operations, reducing inconsistent split submissions by 60%.',
      'Integrated Stripe PaymentIntents + webhooks with idempotency guards to prevent duplicate settlements, cutting payment-related support issues by 40%.',
      'Implemented split modes (equal, custom, percent, shares) with server-side constraints, reducing incorrect splits by 50%.',
      'Containerized services with Docker Compose for reproducible local/prod parity, reducing environment setup time by 70%.',
    ],
    tech: ['Vue 3', 'Node.js', 'Express', 'PostgreSQL', 'Stripe', 'Docker'],
    github: 'https://github.com/Rachana-Surya-Team-Projects/RoomieConnect-Splitwise-Style-Expense-Sharing-Settlements',
    demo: 'https://roomieconnect-web.onrender.com',
    demoLabel: 'Live Demo',
  },
  {
    title: 'Crime Analytics System',
    tagline: 'Analytics platform for exploring crime trends, hotspots, and reporting at scale.',
    description:
      'A data-driven analytics system that organizes crime data into queryable models and powers interactive insights for trend exploration and reporting.',
    highlights: [
      'Engineered data models and ingestion flows to normalize multi-source records, improving query reliability and reducing duplicate entries by 35%.',
      'Optimized SQL with indexing and refactors to accelerate hotspot and time-window aggregations by 3×.',
      'Built backend endpoints to support dashboard filters (region, category, time), cutting report generation time by 45%.',
      'Implemented validation checks to prevent corrupted rows during ingestion, reducing data-quality incidents by 30%.',
    ],
    tech: ['SQL', 'Data Modeling', 'Backend APIs', 'Analytics'],
    github: 'https://github.com/Rachana-Surya-Team-Projects/Crime-Analytics-System',
  },
  {
    title: 'DeepMed',
    tagline: 'Neural-network pipelines for healthcare prediction with reproducible evaluation.',
    description:
      'A deep learning project that builds and benchmarks model pipelines for healthcare datasets with clean training loops, metrics, and reproducible experiments.',
    highlights: [
      'Implemented end-to-end training pipelines for multiple neural architectures, improving validation stability by 30% via consistent preprocessing.',
      'Automated evaluation and metric tracking to compare models fairly, reducing experiment turnaround time by 40%.',
      'Hardened data validation and batching to reduce training failures by 25% and improve run-to-run reproducibility.',
      'Packaged workflows for repeatable runs and clean reporting, enabling fast iteration across datasets and baselines.',
    ],
    tech: ['PyTorch', 'TensorFlow', 'Deep Learning', 'Model Evaluation'],
    github: 'https://github.com/Rachana-Surya-Team-Projects/DeepMed-Unveiling-Health-with-Neural-Networks',
  },
  {
    title: 'Blood Sugar Regulatory System',
    tagline: 'AI-driven insulin prediction pipeline with real-time streaming and validation.',
    description:
      'An AI-driven insulin regulation system that uses ensemble learning and streaming health signals to improve prediction accuracy and reduce manual intervention.',
    highlights: [
      'Engineered an ensemble prediction pipeline that increased accuracy from 65% to 92%, outperforming LSTM, RNN, and ARIMA baselines.',
      'Integrated CGM/biosensor streams into a real-time ingestion workflow to support 24/7 monitoring and automated feature generation.',
      'Reduced manual intervention in insulin regulation workflows by ~50% through continuous predictions and alert-ready outputs.',
      'Automated model validation and release checks to cut rollout effort by 35% and improve deployment reliability.',
    ],
    tech: ['Python', 'Machine Learning', 'Time-Series', 'Pipelines'],
    github: '',
    githubLabel: undefined,
  },
  {
    title: 'Smart Parking System',
    tagline: 'IoT-based parking availability system with resilient communication workflows.',
    description:
      'An IoT-based smart parking solution that ingests sensor signals and exposes availability insights to reduce congestion and improve utilization.',
    highlights: [
      'Designed an IoT data ingestion service to process real-time occupancy signals, supporting 500+ concurrent device updates.',
      'Reduced parking search time by ~40% by exposing live availability and status changes through an API-driven interface.',
      'Improved reliability under network churn by adding retry-safe message handling, reducing missed updates by 30%.',
      'Optimized storage and aggregation paths to cut update processing latency by 45% during peak traffic.',
    ],
    tech: ['IoT', 'Backend APIs', 'System Design'],
    github: '',
    githubLabel: undefined,
  },
  {
    title: 'Cloud-Native AI Platform for Crop Stress Detection',
    tagline: 'Multispectral CV pipeline for stress detection with scalable inference workflows.',
    description:
      'A computer-vision pipeline that detects crop stress from multispectral imagery and produces actionable signals for precision agriculture.',
    highlights: [
      'Built multispectral feature extraction and CV pipelines that improved stress detection accuracy by 28% with targeted tuning.',
      'Enabled cloud-scale batch inference to process 10,000+ images per run, reducing analysis time from hours to minutes.',
      'Improved robustness across field conditions by validating on diverse scenes, reducing false positives by 22%.',
      'Automated preprocessing and inference steps to cut manual labeling and QA time by 35%.',
    ],
    tech: ['Computer Vision', 'Machine Learning', 'Python', 'Pipelines'],
    github: '',
    githubLabel: undefined,
  },
  {
    title: 'Portfolio Website',
    tagline: 'Modern, responsive portfolio with clean sections, animations, and polished UI.',
    description:
      'A production-ready Next.js portfolio engineered for speed, clarity, and easy iteration—built with reusable sections, accessible UI patterns, and polished animation.',
    highlights: [
      'Built a modular, data-driven section architecture so content updates require no UI rewrites (single source of truth in `data.ts`).',
      'Implemented smooth Framer Motion transitions with reduced-motion support for accessibility and a professional feel.',
      'Designed responsive layouts and typography scaling for mobile → desktop with consistent spacing tokens and clean visual hierarchy.',
      'Optimized UX details (focus states, contrast-safe surfaces, semantic structure) to improve accessibility and readability.',
    ],
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/VenkataSriSaiSuryaMandava/portfolio',
    demo: 'https://portfolio-steel-one-10.vercel.app/',
    demoLabel: 'Live Demo',
  },
];


export const experiences: Experience[] = [
  {
    role: 'AI/ML R&D and Product Intern (Team Lead – Machine Learning Track)',
    company: 'Crypt0nest.io',
    period: 'June 2025 – August 2025',
    location: 'Austin, Texas, United States · Remote',
    theme: 'ml',
    details: [
      'Led the ML track across research squads, coordinating experimentation and delivery for a large-scale crypto prediction pipeline.',
      'Scaled asset coverage from 100 → 250+ by expanding ingestion and feature generation across market, sentiment, and on-chain signals.',
      'Integrated CoinGecko (OHLCV), LunarCrush (sentiment), and DeFiLlama (TVL/on-chain) to improve signal quality and model robustness.',
      'Engineered end-to-end workflows for training, evaluation, and backtesting; improved prediction stability by ~22% and supported >2.0 Sharpe backtests.',
      'Automated repeatable MLOps workflows with Docker, Kubernetes, MLflow, and GitHub Actions, reducing iteration cycles by ~40%.',
      'Deployed workloads on AWS/GCP auto-scaling clusters to support 10K+ daily predictions with <200ms latency targets and reliable uptime.',
      'Introduced LLM-assisted research utilities (Hugging Face + LangChain) to speed up feature validation and reduce exploratory analysis time by ~30%.',
    ],
    skills: [
      'Python',
      'Machine Learning',
      'Feature Engineering',
      'Data Pipelines',
      'CoinGecko',
      'LunarCrush',
      'DeFiLlama',
      'Docker',
      'Kubernetes',
      'MLflow',
      'GitHub Actions',
      'AWS',
      'GCP',
      'LangChain',
      'Hugging Face',
    ],
  },
  {
    role: 'Full Stack Development Intern',
    company: 'I & T Labs',
    period: 'May 2023 – July 2024',
    location: 'Vijayawada, Andhra Pradesh, India · On-site',
    theme: 'fullstack',
    details: [
      'Built and deployed a faculty Academic Performance Indicator platform for 500+ staff and 2K+ students, automating score calculations and reducing manual work by ~70%.',
      'Implemented RBAC and JWT-based authentication with secure API patterns, reducing data access errors by ~60% and improving adoption.',
      'Designed and shipped REST APIs with MySQL-backed data models, prioritizing maintainability, validation, and clean separation of concerns.',
      'Optimized MySQL queries and introduced Redis caching, achieving ~3× faster load times and supporting 1,000+ concurrent users with 99.9% uptime.',
      'Delivered reporting dashboards (Power BI + Grafana) to speed up administrative decisions by ~40% with clear, actionable metrics.',
      'Migrated selected workloads to serverless functions (AWS Lambda) and containerized deployments, reducing infrastructure cost by ~25%.',
    ],
    skills: [
      'React',
      'JavaScript',
      'Node.js',
      'REST APIs',
      'JWT',
      'RBAC',
      'MySQL',
      'Redis',
      'AWS Lambda',
      'Docker',
      'Power BI',
      'Grafana',
    ],
  },
  {
    role: 'Software Engineering Intern',
    company: 'Codegnan',
    period: 'August 2022 – April 2023',
    location: 'Vijayawada, Andhra Pradesh, India · On-site',
    theme: 'swe',
    details: [
      'Developed a MERN-stack social platform serving 5K+ users, improving engagement by ~30% with real-time content sharing, multimedia feeds, and WebSocket notifications.',
      'Implemented OAuth2 + JWT authentication and session hardening, securing user flows and reducing login-related issues by ~45%.',
      'Built scalable APIs (REST + GraphQL) and added Redis caching to improve response times by ~35% under load.',
      'Automated build and deployment workflows with Docker, Kubernetes, and GitHub Actions, cutting release cycles by ~40% and maintaining 99.5% uptime.',
      'Added observability with ELK + Grafana dashboards to improve incident detection and reduce recovery time by ~50%.',
    ],
    skills: [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'GraphQL',
      'Redis',
      'WebSockets',
      'OAuth2',
      'JWT',
      'Docker',
      'Kubernetes',
      'GitHub Actions',
      'ELK Stack',
      'Grafana',
    ],
  },
];

export const publications: Publication[] = [
  {
    id: 'pub-blood',
    title: 'Machine Learning Based Automated Blood Sugar Regulatory System',
    venue:
      'IEEE, ICSCSS 2024: 2nd International Conference on Sustainable Computing and Smart Systems; pp 1106–1114',
    date: 'August 20, 2024',
    url: 'https://ieeexplore.ieee.org/document/10625421',
    description:
      'Built and evaluated ML ensembles for insulin regulation with an emphasis on reliable prediction under real-world monitoring constraints.',
  },
  {
    id: 'pub-parking',
    title: 'An IoT-Based Intelligent Smart Parking System with Effective Communication System',
    venue:
      'Springer, ICMEET 2023: Proceedings of 8th International Conference on Microelectronics, Electromagnetics and Telecommunications; pp 255–265',
    date: 'May 19, 2024',
    url: 'https://link.springer.com/chapter/10.1007/978-981-97-0767-6_22',
    description:
      'Designed an IoT-enabled parking workflow focused on dependable data capture, communication reliability, and operational visibility.',
  },
  {
    id: 'pub-agri',
    title:
      'Precision Agriculture Through Stress Monitoring in Crops with Multispectral Remote Sensing Data',
    venue:
      'Springer, ICIPCN 2023: Fourth International Conference on Image Processing and Capsule Networks; pp 425–434',
    date: 'November 18, 2023',
    url: 'https://link.springer.com/chapter/10.1007/978-981-99-7093-3_28',
    description:
      'Developed a multispectral computer vision pipeline to detect crop stress signals with repeatable experiments and robust validation.',
  },
];

export const education: Education[] = [
  {
    degree: 'Master of Science in Computer Science and Engineering',
    institution: 'University at Buffalo',
    start: 'August 2024',
    end: 'January 2026',
    cgpa: '3.76/4 CGPA',
    location: 'Buffalo, NY',
    coursework: [
      'Machine Learning',
      'Deep Learning',
      'Data Models and Query Languages',
      'Algorithms Design and Analysis',
      'Computer Security',
      'Data Intensive Computing',
      'Operating Systems',
      'Statistical Data Mining II',
      'Intro to Entrepreneurship',
      'Computer Vision',
    ],
    details: [],
  },
  {
    degree: 'Bachelor of Technology in Information Technology',
    institution: 'Velagapudi Ramakrishna Siddhartha Engineering College',
    start: 'August 2020',
    end: 'April 2024',
    cgpa: '8.78/10 CGPA',
    location: 'India',
    coursework: [
      'Programming for Problem Solving',
      'Object Oriented Programming using Python',
      'Data Structures',
      'Computer Organization',
      'Operating Systems',
      'Object Oriented Programming using C++',
      'Statistics with R',
      'Java Programming',
      'Advanced Data Structures and Algorithms',
      'Database Management Systems',
      'Ethical Hacking',
      'Computer Networks',
      'Software Engineering',
      'Engineering Economics and Management',
      'Data Mining',
      'AI Tools, Techniques and Applications',
      'React Programming',
      'Cloud Computing',
      'Machine Learning',
      'Web Programming and Development',
      'Big Data',
      'Agile Software Development',
      'Innovation, IPR & Entrepreneurship',
      'Deep Learning',
      'Software Testing & Automation',
      'Business Intelligence',
      'Wireless Networks',
      'Full-Stack Web Development with React',
      'Data Analytics with Python',
    ],
    details: [],
  },
];