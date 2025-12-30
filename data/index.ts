// Re-export types
export type {
  About,
  SkillCategory,
  SkillItem,
  Achievement,
  Language,
  Project,
  ContactInfo,
  PortfolioData,
} from "./types";

// Re-export theme data
export { themeData, type ThemeData } from "./theme";

// Re-export UI constants (not data - data comes from API)
export { projectsPageDescription, projectsCallToAction } from "./projects";
