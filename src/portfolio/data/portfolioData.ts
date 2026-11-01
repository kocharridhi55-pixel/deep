import { Project, SkillItem, TimelineItem } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'RYTHM KOCHAR',
  shortName: 'RYTHM KOCHAR',
  title: 'WEB DEVELOPER | DIGITAL PROJECTS',
  headline: 'WEB DEVELOPER | DIGITAL PROJECTS',
  tagline: 'Developer and Data Science Student with knowledge of modern web development, data analysis, and artificial intelligence.',
  location: 'Ludhiana, Punjab',
  email: 'kocharridhi55@gmail.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  status: 'Open for web development & digital project collaborations',
  summary: `Developer and Data Science Student with knowledge of modern web development, data analysis, and artificial intelligence. Skilled in building responsive web applications using React, Next.js, and Tailwind CSS, working with data using Python, Pandas, and NumPy, and exploring AI chatbot development and Generative AI workflows. Interested in transforming ideas into practical digital solutions through problem-solving, creativity, and continuous learning.`,
  bio: `Developer and Data Science Student with knowledge of modern web development, data analysis, and artificial intelligence. Skilled in building responsive web applications using React, Next.js, and Tailwind CSS, working with data using Python, Pandas, and NumPy, and exploring AI chatbot development and Generative AI workflows. Interested in transforming ideas into practical digital solutions through problem-solving, creativity, and continuous learning.`,
  goals: `Interested in transforming ideas into practical digital solutions through problem-solving, creativity, and continuous learning across web development and artificial intelligence.`,
  languages: ['Hindi', 'Punjabi', 'English'],
  coreSkills: [
    'Problem Solving',
    'Attention to Detail',
    'Teamwork & Collaboration',
    'Time Management',
    'Leadership',
    'Following Guidelines',
    'Website Development Projects',
    'AI Chatbot Projects'
  ],
  portraitImage: '/images/editorial_developer_portrait_1793294830752.jpg',
  heroSculptureImage: '/images/hero_cinematic_sculpture_1793294830736.jpg',
  stats: [
    { label: 'Completed Projects', value: '4+' },
    { label: 'Core Disciplines', value: '8' },
    { label: 'Specialized Courses', value: '2' },
    { label: 'Technical Stack', value: '16+' }
  ]
};

export const CORE_SKILLS = [
  'Problem Solving',
  'Attention to Detail',
  'Teamwork & Collaboration',
  'Time Management',
  'Leadership',
  'Following Guidelines',
  'Website Development Projects',
  'AI Chatbot Projects'
];

export const TECHNICAL_EXPERTISE = {
  languages: ['Python', 'JavaScript', 'SQL', 'HTML', 'CSS'],
  frontend: ['React', 'Next.js', 'Tailwind CSS', 'Material UI'],
  dataScienceAI: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Gemini AI API'],
  tools: ['Git', 'GitHub', 'VS Code', 'Vercel']
};

export const SKILLS_DATA: SkillItem[] = [
  // Programming / Languages
  {
    name: 'Python',
    level: 92,
    category: 'Programming',
    proficiencyText: 'Python Programming',
    description: 'Data manipulation, automation scripts, algorithm implementation, and backend logic.'
  },
  {
    name: 'JavaScript',
    level: 90,
    category: 'Programming',
    proficiencyText: 'Core Language',
    description: 'Modern ES6+ syntax, asynchronous programming, DOM manipulation, and dynamic interactions.'
  },
  {
    name: 'SQL',
    level: 85,
    category: 'Programming',
    proficiencyText: 'Database Queries',
    description: 'Relational database schema modeling, queries, data aggregation, and retrieval.'
  },
  {
    name: 'HTML & CSS',
    level: 95,
    category: 'Programming',
    proficiencyText: 'Web Markup & Styling',
    description: 'Semantic HTML5 structure, responsive CSS layouts, flexbox, grid, and accessibility standards.'
  },

  // Frontend
  {
    name: 'React',
    level: 92,
    category: 'Frontend',
    proficiencyText: 'Component UI',
    description: 'Modular component architecture, state management, custom hooks, and dynamic rendering.'
  },
  {
    name: 'Next.js',
    level: 86,
    category: 'Frontend',
    proficiencyText: 'Full-Stack React',
    description: 'Server components, client routing, optimized page delivery, and modern web architectures.'
  },
  {
    name: 'Tailwind CSS',
    level: 94,
    category: 'Frontend',
    proficiencyText: 'Utility-First Styling',
    description: 'Responsive styling, custom theme configurations, dark mode integration, and clean design.'
  },
  {
    name: 'Material UI',
    level: 85,
    category: 'Frontend',
    proficiencyText: 'Component Library',
    description: 'Pre-built accessible UI components, theme customization, and structured application layouts.'
  },

  // Data Science
  {
    name: 'Pandas',
    level: 90,
    category: 'Data Science',
    proficiencyText: 'Data Analysis',
    description: 'DataFrames, data cleaning, aggregation, exploratory analysis, and data transformation.'
  },
  {
    name: 'NumPy',
    level: 88,
    category: 'Data Science',
    proficiencyText: 'Numerical Operations',
    description: 'Multi-dimensional arrays, mathematical calculations, vectorization, and data processing.'
  },
  {
    name: 'Matplotlib & Seaborn',
    level: 86,
    category: 'Data Science',
    proficiencyText: 'Data Visualization',
    description: 'Statistical charts, correlation heatmaps, distribution plots, and analytical graphing.'
  },
  {
    name: 'Data Analysis & Visualization',
    level: 90,
    category: 'Data Science',
    proficiencyText: 'Core Competency',
    description: 'Transforming complex datasets into clear, actionable analytical insights and visual charts.'
  },

  // AI & ML
  {
    name: 'Gemini AI API',
    level: 90,
    category: 'AI & ML',
    proficiencyText: 'Generative AI',
    description: 'Generative AI API integration, streaming conversational inference, and structured outputs.'
  },
  {
    name: 'AI Chatbot Development',
    level: 88,
    category: 'AI & ML',
    proficiencyText: 'Conversational Agents',
    description: 'Custom conversational flows, context handling, response testing, and chatbot interfaces.'
  },
  {
    name: 'Prompt Engineering',
    level: 92,
    category: 'AI & ML',
    proficiencyText: 'AI Optimization',
    description: 'Designing system prompts, multi-turn prompting strategies, and evaluation for accuracy.'
  },

  // Tools & Platforms
  {
    name: 'Git & GitHub',
    level: 90,
    category: 'Tools',
    proficiencyText: 'Version Control',
    description: 'Source control, branching strategies, collaboration, pull requests, and repository management.'
  },
  {
    name: 'VS Code',
    level: 95,
    category: 'Tools',
    proficiencyText: 'Development IDE',
    description: 'Integrated debugging, extensions, linting, code formatting, and streamlined development.'
  },
  {
    name: 'Vercel',
    level: 88,
    category: 'Tools',
    proficiencyText: 'Deployment Platform',
    description: 'Continuous deployment, production hosting, preview environments, and performance monitoring.'
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'personal-portfolio',
    title: 'Personal Portfolio Website',
    subtitle: 'Responsive Showcase, Modern UI & User Experience',
    category: 'Web Development',
    description: 'Designed and developed a personal portfolio website to present profile information, skills, projects, and contact details. Focused on clear navigation, interactive information sections, and a professional user interface.',
    longDescription: 'Designed and developed a personal portfolio website to present profile information, skills, projects, and contact details. Focused on clear navigation, interactive information sections, and a professional user interface. Relevant areas: website structure, responsive design concepts, content organization, and user experience.',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Motion'],
    metrics: [
      { label: 'Responsive', value: '100%' },
      { label: 'Performance', value: '99/100' },
      { label: 'UI Precision', value: 'High Craft' }
    ],
    image: '/assets/aistudio/Analysis_output_1_a0052500.png',
    githubUrl: 'https://github.com/developer/personal-portfolio-website',
    liveUrl: '#home',
    features: [
      'Designed and developed a personal portfolio website to present profile information, skills, projects, and contact details.',
      'Focused on clear navigation, interactive information sections, and a professional user interface.',
      'Relevant areas: website structure, responsive design concepts, content organization, and user experience.'
    ],
    demoType: 'portfolio'
  },
  {
    id: 'ai-chatbot-project',
    title: 'AI Chatbot Project',
    subtitle: 'Conversational Interface & Prompt Flow Design',
    category: 'AI & Machine Learning',
    description: 'Worked on a customized chatbot project with the goal of responding to user questions through a conversational interface. Explored organizing project files, troubleshooting errors, and configuring the application for use.',
    longDescription: 'Worked on a customized chatbot project with the goal of responding to user questions through a conversational interface. Explored organizing project files, troubleshooting errors, and configuring the application for use. Relevant areas: prompt design, chatbot conversation flow, testing responses, and improving clarity.',
    technologies: ['Gemini AI API', 'Python', 'React', 'Tailwind CSS', 'Prompt Design'],
    metrics: [
      { label: 'Integration', value: 'Conversational' },
      { label: 'Response Flow', value: 'Tested' },
      { label: 'Prompt Design', value: 'Optimized' }
    ],
    image: '/images/project_ai_chatbot_1793294832502.jpg',
    githubUrl: 'https://github.com/developer/custom-ai-chatbot',
    liveUrl: '#demo-ai-chat',
    features: [
      'Worked on a customized chatbot project with the goal of responding to user questions through a conversational interface.',
      'Explored organizing project files, troubleshooting errors, and configuring the application for use.',
      'Relevant areas: prompt design, chatbot conversation flow, testing responses, and improving clarity.'
    ],
    demoType: 'ai-chat'
  },
  {
    id: 'website-contact-section',
    title: 'Website Contact Section',
    subtitle: 'Form Layout, Usability & Clear Contact Information',
    category: 'Web Development',
    description: 'Planned a contact section with name, email, phone number, and message fields to make it easier for visitors to get in touch. Focused on form layout, usability, and presenting contact information clearly.',
    longDescription: 'Planned a contact section with name, email, phone number, and message fields to make it easier for visitors to get in touch. Focused on form layout, usability, and presenting contact information clearly.',
    technologies: ['React', 'HTML', 'CSS', 'Tailwind CSS', 'JavaScript'],
    metrics: [
      { label: 'Input Channels', value: '4 Fields' },
      { label: 'Form Usability', value: 'Optimized' },
      { label: 'Direct Access', value: 'Clear' }
    ],
    image: '/images/project_data_science_1793294832822.jpg',
    githubUrl: 'https://github.com/developer/website-contact-flow',
    liveUrl: '#contact',
    features: [
      'Planned a contact section with name, email, phone number, and message fields to make it easier for visitors to get in touch.',
      'Focused on form layout, usability, and presenting contact information clearly.'
    ],
    demoType: 'contact-session'
  },
  {
    id: 'medical-inventory',
    title: 'Medical Shop Inventory Management System',
    subtitle: 'Pharmaceutical Stock Intelligence & Batch Tracking',
    category: 'Web Systems',
    description: 'Real-time pharmaceutical stock tracking, batch expiry notifications, and fast invoice lookup. Implements analytics on SKU turnover, reorder alerts, and sales margin reporting.',
    longDescription: 'Real-time pharmaceutical stock tracking, batch expiry notifications, and fast invoice lookup. Implements analytics on SKU turnover, reorder alerts, and sales margin reporting.',
    technologies: ['React', 'JavaScript', 'SQL', 'Tailwind CSS', 'Python'],
    metrics: [
      { label: 'Stock Alerts', value: 'Automated' },
      { label: 'Expiry Tracking', value: 'Proactive' },
      { label: 'Reports', value: 'Real-Time' }
    ],
    image: '/images/project_medical_inventory_1793294833357.jpg',
    githubUrl: 'https://github.com/developer/medical-shop-inventory',
    liveUrl: '#demo-inventory',
    features: [
      'Real-time pharmaceutical stock tracking, batch expiry notifications, and fast invoice lookup.',
      'Implements analytics on SKU turnover, reorder alerts, and sales margin reporting.'
    ],
    demoType: 'medical-inventory'
  }
];

export const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 'ba-degree',
    title: 'Bachelor of Arts (B.A.)',
    institution: 'Khalsa College for Women, Punjab University',
    type: 'education',
    description: 'Undergraduate degree completed at Khalsa College for Women, Punjab University.',
    highlights: []
  },
  {
    id: 'pgdca-course',
    period: '2024 – Present',
    title: 'Post Graduate Diploma in Computer Applications (PGDCA)',
    institution: 'University Computer Sciences Institute',
    type: 'education',
    description: 'Intensive academic program covering advanced systems programming, relational database management systems, data structures, and enterprise software engineering.',
    highlights: [
      'Advanced Database Management Systems (RDBMS & SQL Normalization)',
      'Data Structures & Algorithm Design in C++ and Python',
      'Object-Oriented Software Engineering and Application Architecture'
    ]
  },
  {
    id: 'ai-specialization',
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
  }
];
