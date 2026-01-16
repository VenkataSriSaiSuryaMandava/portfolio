export interface Skill {
  name: string;
  icon?: JSX.Element;
  /** Optional confidence label for the skill (no percentages). */
  level?: 'Core' | 'Proficient' | 'Working';
  /** Whether the skill is used in projects (for UI indicator). */
  used?: boolean;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Project {
  title: string;
  /** 1-line summary shown in the list */
  tagline: string;
  /** Longer description shown on hover/tap */
  description: string;
  /** Optional bullet highlights for deeper scan */
  highlights?: string[];
  tech: string[];
  github: string;
  demo?: string;
  /** Optional label for the primary link (defaults to GitHub). */
  githubLabel?: string;
  /** Optional label for demo link (defaults to Live Demo). */
  demoLabel?: string;
  /** Optional publication id to highlight in Publications section when opened. */
  publicationId?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  /** Optional verification / badge id (shown on the card). */
  credentialId?: string;
  credentialUrl?: string;
  skills?: string[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  location?: string;
  details: string[];
  /** Skills/technologies used in the role (displayed as chips). */
  skills?: string[];
  /** Optional theme key for subtle card background art. */
  theme?: 'ml' | 'fullstack' | 'swe';
}

export interface Publication {
  /** Optional stable id used for in-page highlighting. */
  id?: string;
  title: string;
  /** Journal / conference / venue. */
  venue: string;
  /** Publication date (e.g. "2025" or "Mar 2025"). */
  date: string;
  /** Short abstract/summary shown on the card. */
  description: string;
  /** External link (DOI / publisher / arXiv / blog). */
  url: string;
}

export interface Education {
  degree: string;
  institution: string;
  start: string;
  end: string;
  /** GPA/CGPA (e.g. "3.8/4.0" or "8.7/10"). */
  cgpa?: string;
  location?: string;
  coursework?: string[];
  details?: string[];
}