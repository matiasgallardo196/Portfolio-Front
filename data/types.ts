export interface About {
  fullName: string;
  location: string;
  biography: string;
}

export interface SkillCategory {
  languages: string[];
  frontend: string[];
  backend: string[];
  databases: string[];
  devops: string[];
  integrations: string[];
  practices: string[];
}

export interface Achievement {
  id: string;
  description: string;
}

export interface Language {
  name: string;
  level: string;
  isNative?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  imageUrl: string;
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  whatsapp?: string;
}

export interface PortfolioData {
  about: About;
  skills: SkillCategory;
  achievements: Achievement[];
  languages: Language[];
  projects: Project[];
  contact: ContactInfo;
}
