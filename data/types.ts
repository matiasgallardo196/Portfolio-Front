export interface About {
  fullName: string;
  location: string;
  biography: string;
  pageDescription: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  avatarUrl: string;
  relocationStatus: string;
  ctaButtons: {
    projects: string;
    contact: string;
  };
  stats: {
    projects: {
      title: string;
      subtitle: string;
    };
    technologies: {
      title: string;
      subtitle: string;
    };
    languages: {
      title: string;
      subtitle: string;
    };
  };
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
  metaDescription: string;
  pageTitle: string;
  heroTitle: string;
  letsTalkTitle: string;
  letsTalkDescription: string;
  availabilityTitle: string;
  currentStatusTitle: string;
  opportunities: string[];
  locationTitle: string;
  locationInfo: string[];
}

// Import ThemeData interface from theme.ts
import { ThemeData } from "./theme";

export interface PortfolioData {
  about: About;
  skills: SkillCategory;
  achievements: Achievement[];
  languages: Language[];
  projects: Project[];
  contact: ContactInfo;
  theme: ThemeData;
}
