export interface Links {
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
}

export interface Experience {
  role: string;
  company: string;
  /** Shown as written, e.g. "Aug 2024 – Present" */
  period?: string;
  /** Current role gets a pulsing dot on the timeline */
  current?: boolean;
  bullets: string[];
}

export interface Education {
  degree: string;
  /** Short label for the stat strip, e.g. "M.A." */
  short: string;
  field?: string;
  institution?: string;
  year?: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
}

export interface Goal {
  label: string;
  value: string;
  note?: string;
}

export interface Resume {
  name: string;
  headline: string;
  tagline?: string;
  email?: string;
  phone?: string;
  location?: string;
  links: Links;
  summary: string;
  /** Optional photo for the About section — a URL or a file in /public */
  photo?: string;
  motto?: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  achievements: string[];
  certifications: string[];
  goals: Goal[];
  interests: string[];
  stats: {
    years: number;
    /** show "+" after the number */
    yearsPlus?: boolean;
    projects: number;
    projectsPlus?: boolean;
    skills: number;
  };
}
