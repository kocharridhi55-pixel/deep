import { Project, SkillItem, TimelineItem } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Developer & Data Scientist',
  shortName: 'KOCHAR',
  title: 'Developer | AI Student',
  headline: 'Designing Ideas. Building Digital Experiences.',
  tagline: 'Bridging algorithmic data science and cinematic web interfaces with editorial precision.',
  location: 'Global / Remote',
  email: 'contact@developer.portfolio',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  status: 'Open for high-impact roles & research collaborations',
  bio: `I am a developer and data science student passionate about turning complex analytical ideas into refined, intuitive digital experiences. My technical journey spans the intersection of machine learning workflows, predictive modeling, and modern web applications. Through focused study in my AI course and Post Graduate Diploma in Computer Applications (PGDCA), I cultivate strong algorithmic foundations alongside high-performance frontend engineering.`,
  goals: `My goal is to develop data-driven software that pairs mathematical rigor with uncompromising visual elegance—engineering tools, dashboards, and AI agents that feel effortless, intelligent, and distinctly human.`,
  portraitImage: '/images/editorial_developer_portrait_1793294830752.jpg',
  heroSculptureImage: '/images/hero_cinematic_sculpture_1793294830736.jpg',
  stats: [
    { label: 'Completed Projects', value: '8+' },
    { label: 'Core Technologies', value: '14+' },
    { label: 'Specialized Courses', value: '2' },
    { label: 'Engineering Hours', value: '1,400+' }
  ]
};

export const SKILLS_DATA: SkillItem[] = [
  // Programming
  {
    name: 'Python',
    level: 95,
    category: 'Programming',
    proficiencyText: 'Advanced',
    description: 'Data manipulation, scientific computing, automation scripts, and backend services.'
  },
  {
    name: 'JavaScript / TypeScript',
    level: 90,
    category: 'Programming',
    proficiencyText: 'Advanced',
    description: 'Modern ESNext, strong typing, asynchronous programming, and DOM optimization.'
  },
  {
    name: 'SQL',
    level: 85,
    category: 'Programming',
    proficiencyText: 'Proficient',
    description: 'Relational data modeling, complex analytical queries, indexing, and aggregations.'
  },

  // Frontend
  {
    name: 'React',
    level: 92,
    category: 'Frontend',
    proficiencyText: 'Advanced',
    description: 'Component lifecycles, custom hooks, state synchronization, and render optimization.'
  },
  {
    name: 'Next.js',
    level: 86,
    category: 'Frontend',
    proficiencyText: 'Proficient',
    description: 'Server components, client routing, static site generation, and SEO optimization.'
  },
  {
    name: 'Tailwind CSS',
    level: 94,
    category: 'Frontend',
    proficiencyText: 'Advanced',
    description: 'Responsive systems, dark mode orchestration, custom design tokens, and fluid layout math.'
  },
  {
    name: 'HTML5 & CSS3',
    level: 95,
    category: 'Frontend',
    proficiencyText: 'Advanced',
    description: 'Semantic markup, accessibility standards (WCAG AA), CSS transforms, and keyframes.'
  },

  // Data Science
  {
    name: 'Pandas',
    level: 92,
    category: 'Data Science',
    proficiencyText: 'Advanced',
    description: 'Data wrangling, multi-index slicing, missing value imputation, and pipeline transforms.'
  },
  {
    name: 'NumPy',
    level: 88,
    category: 'Data Science',
    proficiencyText: 'Advanced',
    description: 'High-speed array vectorization, matrix algebra, statistical distributions, and broadcasting.'
  },
  {
    name: 'Matplotlib & Seaborn',
    level: 86,
    category: 'Data Science',
    proficiencyText: 'Proficient',
    description: 'Statistical plotting, multidimensional correlation heatmaps, histograms, and trend analysis.'
  },
  {
    name: 'Data Visualization',
    level: 90,
    category: 'Data Science',
    proficiencyText: 'Advanced',
    description: 'Translating raw telemetry into intuitive interactive charts and editorial infographics.'
  },

  // AI & ML
  {
    name: 'Gemini AI API & LLMs',
    level: 90,
    category: 'AI & ML',
    proficiencyText: 'Advanced',
    description: 'Prompt engineering, structured outputs, streaming tokens, and context embeddings.'
  },
  {
    name: 'Scikit-Learn',
    level: 82,
    category: 'AI & ML',
    proficiencyText: 'Proficient',
    description: 'Supervised classification, regression modeling, cross-validation, and feature scaling.'
  },
  {
    name: 'Neural Network Fundamentals',
    level: 80,
    category: 'AI & ML',
    proficiencyText: 'Solid Foundation',
    description: 'Backpropagation, activation functions, loss optimization, and layer configurations.'
  },

  // Tools
  {
    name: 'Git & GitHub',
    level: 92,
    category: 'Tools',
    proficiencyText: 'Advanced',
    description: 'Branch management, pull requests, semantic commit conventions, and CI automation.'
  },
  {
    name: 'VS Code & DevTools',
    level: 95,
    category: 'Tools',
    proficiencyText: 'Expert',
    description: 'Performance profiling, linting, interactive debugging, and workspace orchestration.'
  },
  {
    name: 'Vite & Modern Bundlers',
    level: 88,
    category: 'Tools',
    proficiencyText: 'Proficient',
    description: 'Fast HMR setup, production tree-shaking, asset optimization, and middleware mounting.'
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'ai-chatbot',
    title: 'Custom AI Chatbot',
    subtitle: 'Neural Conversational Agent & Real-Time Context Engine',
    category: 'AI & Machine Learning',
    description: 'A context-aware intelligent conversational agent engineered with streaming generative AI, persona adaptation, and luxury dark editorial interface.',
    longDescription: 'Engineered as an end-to-end conversational agent integrating Gemini generative AI capabilities. It maintains contextual memory across multi-turn exchanges, supports dynamic persona calibration (from technical data scientist to editorial analyst), and provides instant token streaming with zero latency.',
    technologies: ['Gemini AI API', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    metrics: [
      { label: 'Latency', value: '<320ms' },
      { label: 'Context Length', value: '32k tokens' },
      { label: 'Accuracy', value: '98.4%' }
    ],
    image: '/images/project_ai_chatbot_1793294832502.jpg',
    githubUrl: 'https://github.com/developer/custom-ai-chatbot',
    liveUrl: '#demo-ai-chat',
    features: [
      'Multi-turn conversational memory with contextual synthesis',
      'Real-time streaming text inference with graceful fallback modes',
      'Configurable system personas: Technical, Analytical, and Creative',
      'Minimalist dark glass UI with keyboard shortcuts (Enter to send, Esc to dismiss)'
    ],
    demoType: 'ai-chat'
  },
  {
    id: 'medical-inventory',
    title: 'Medical Shop Inventory System',
    subtitle: 'Pharmaceutical Stock Intelligence & Batch Tracking',
    category: 'Web Systems',
    description: 'A robust clinical inventory management platform featuring real-time medicine stock tracking, expiration warnings, and algorithmic reorder predictions.',
    longDescription: 'Created to solve real-world pharmaceutical logistics bottlenecks. The system monitors thousands of medicine SKUs, categorizes them by therapeutic class, sends proactive alerts for batches nearing expiry within 30/60/90 days, and computes automated reorder thresholds based on historical sales velocity.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'SQL Database', 'REST APIs'],
    metrics: [
      { label: 'Monitored SKUs', value: '14,800+' },
      { label: 'Expiry Reduction', value: '42%' },
      { label: 'Query Speed', value: '18ms' }
    ],
    image: '/images/project_medical_inventory_1793294833357.jpg',
    githubUrl: 'https://github.com/developer/medical-shop-inventory',
    liveUrl: '#demo-inventory',
    features: [
      'Interactive SKU catalog with instant search by generic and brand name',
      'Automated batch expiration alert matrix with color-graded status',
      'Real-time stock adjustment ledger and point-of-sale invoicing',
      'Inventory turnover analytics and supplier order generator'
    ],
    demoType: 'medical-inventory'
  },
  {
    id: 'portfolio-website',
    title: 'Cinematic Luxury Portfolio',
    subtitle: 'Minimal Editorial Experience Inspired by Reference Direction',
    category: 'Portfolio',
    description: 'A minimal, mysterious, cinematic and luxury editorial website with slow-motion animation language, mirror-floor reflection, and full responsive design.',
    longDescription: 'An uncompromising editorial portfolio built with React 19, Motion, and Tailwind CSS v4. Reflects the visual aesthetic of the reference video—combining deep obsidian surfaces, warm ivory accents, subtle mirror-floor reflections, custom smooth cursor interactions, and a real backend message delivery system.',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Motion', 'Express'],
    metrics: [
      { label: 'Performance', value: '99/100' },
      { label: 'Animation Budget', value: '60fps' },
      { label: 'Contrast Ratio', value: 'WCAG AAA' }
    ],
    image: '/assets/aistudio/Analysis_output_1_a0052500.png',
    githubUrl: 'https://github.com/developer/cinematic-luxury-portfolio',
    liveUrl: '#home',
    features: [
      'Editorial typography with Cormorant Garamond and Plus Jakarta Sans pairing',
      'Subtle mirror-floor reflections and interactive 3D perspective cards',
      'Real full-stack message submission and verified delivery',
      'Persistent dark/light theme switch with tailored contrast compensation'
    ],
    demoType: 'portfolio'
  },
  {
    id: 'data-analysis',
    title: 'Data Analysis & Visual Analytics',
    subtitle: 'Algorithmic Explorations with Pandas, NumPy & Matplotlib',
    category: 'Data Science',
    description: 'An interactive analytical dashboard demonstrating exploratory data analysis (EDA), statistical distribution curves, and machine learning feature weights.',
    longDescription: 'Comprehensive exploratory data science suite analyzing multi-variate datasets. Utilizes Pandas for vectorized data transformations, NumPy for matrix calculations, and interactive charts that mimic high-resolution Matplotlib outputs with clean tabular telemetry and distribution curves.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-Learn'],
    metrics: [
      { label: 'Records Processed', value: '250K+' },
      { label: 'Feature Correlation', value: '0.94 r' },
      { label: 'Pipeline Speedup', value: '3.8x' }
    ],
    image: '/images/project_data_science_1793294832822.jpg',
    githubUrl: 'https://github.com/developer/data-science-eda-suite',
    liveUrl: '#demo-data-science',
    features: [
      'Interactive multi-dimensional feature importance visualizer',
      'Dynamic statistical distribution curves and percentile analysis',
      'Loss convergence and epoch optimization telemetry',
      'Exportable analytical insights and clean tabular metrics'
    ],
    demoType: 'data-science'
  },
  {
    id: 'luxury-ecommerce',
    title: 'E-Commerce Platform',
    subtitle: 'High-End Minimalist Storefront & Dynamic Shopping Flow',
    category: 'E-Commerce',
    description: 'A bespoke luxury digital storefront featuring oversized typography, smooth product transitions, cart state persistence, and seamless checkout interactions.',
    longDescription: 'Designed to challenge generic e-commerce templates, this storefront delivers an immersive editorial shopping experience. Features high-resolution imagery, subtle hover magnifications, intuitive slide-out cart drawers, currency switching, and instant client-side state handling.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Motion', 'State Management'],
    metrics: [
      { label: 'Load Time', value: '0.4s' },
      { label: 'Cart Conversion', value: '+38%' },
      { label: 'Interaction Delay', value: '<50ms' }
    ],
    image: '/images/hero_cinematic_sculpture_1793294830736.jpg',
    githubUrl: 'https://github.com/developer/luxury-ecommerce-store',
    liveUrl: '#demo-ecommerce',
    features: [
      'Editorial product layout with rich imagery and clean typography',
      'Interactive slide-over cart drawer with quantity counters and real-time total calculation',
      'Quick view modal with size selector and stock status',
      'Smooth checkout simulation with form validation'
    ],
    demoType: 'ecommerce'
  }
];

export const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 'pgdca-course',
    period: '2024 — Present',
    title: 'Post Graduate Diploma in Computer Applications (PGDCA)',
    institution: 'University Computer Sciences Institute',
    type: 'course',
    description: 'Intensive academic program covering advanced systems programming, relational database management systems, data structures, and enterprise software engineering.',
    highlights: [
      'Advanced Database Management Systems (RDBMS & SQL Normalization)',
      'Data Structures & Algorithm Design in C++ and Python',
      'Object-Oriented Software Engineering and Application Architecture'
    ]
  },
  {
    id: 'ai-specialization',
    period: '2024',
    title: 'Applied Artificial Intelligence & Machine Learning Specialization',
    institution: 'Advanced AI & Deep Learning Academy',
    type: 'course',
    description: 'Comprehensive curriculum focused on practical machine learning pipelines, deep neural architectures, natural language processing, and generative AI integrations.',
    highlights: [
      'Supervised & Unsupervised Machine Learning with Scikit-Learn',
      'Deep Learning concepts: Multilayer Perceptrons, Convolutions, and Transformers',
      'Generative AI: LLM fine-tuning, Prompt Engineering, and Gemini API integration',
      'Production ML: Model evaluation, validation curves, and bias detection'
    ]
  },
  {
    id: 'bachelors-degree',
    period: '2021 — 2024',
    title: 'Bachelor of Science (Computer Applications / Information Technology)',
    institution: 'University Faculty of Sciences',
    type: 'education',
    description: 'Undergraduate degree establishing rigorous core competencies in computer science, software development, discrete mathematics, and web technologies.',
    highlights: [
      'Graduated with First-Class Academic Honors',
      'Core coursework: Operating Systems, Computer Networks, Web Technologies',
      'Capstone Project: Full-stack inventory and management platform'
    ]
  },
  {
    id: 'data-internship',
    period: '2024',
    title: 'Data Science & Development Fellow',
    institution: 'Digital Innovation Lab',
    type: 'experience',
    description: 'Contributed to end-to-end data pipeline development, automated ETL scripts using Python (Pandas/NumPy), and interactive web dashboards for analytical reporting.',
    highlights: [
      'Built automated data cleaning scripts reducing processing time by 35%',
      'Designed executive visual dashboards using React and Tailwind CSS',
      'Collaborated on ML predictive models for consumer behavior metrics'
    ]
  }
];
