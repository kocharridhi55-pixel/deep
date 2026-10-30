export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI & Machine Learning' | 'Web Systems' | 'Data Science' | 'E-Commerce' | 'Portfolio';
  description: string;
  longDescription: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  features: string[];
  demoType: 'ai-chat' | 'medical-inventory' | 'portfolio' | 'data-science' | 'ecommerce';
}

export interface SkillItem {
  name: string;
  level: number; // 0 - 100
  category: 'Programming' | 'Frontend' | 'Data Science' | 'AI & ML' | 'Tools';
  proficiencyText: string;
  description: string;
}

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  institution: string;
  type: 'education' | 'course' | 'experience' | 'certification';
  description: string;
  highlights: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface UserSession {
  username: string;
  name: string;
  role: string;
  email: string;
}
