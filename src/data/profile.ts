import type { Resume } from '../lib/types';

/**
 * Everything the dashboard shows comes from this object.
 * Edit the values below and the page updates — no other file needs to change.
 */
export const profile: Resume = {
  name: 'Pragyamita Saha',
  headline: 'Consultant | Aspiring PhD Scholar',
  tagline: 'Turning ideas into impact through data, research and meaningful collaboration.',
  email: 'pragyamitasaha@gmail.com',
  location: 'India',
  links: {
    linkedin: 'https://linkedin.com/in/pragyamita-saha',
    github: 'https://github.com/pragyamita-debug',
  },
  summary:
    'I am a consultant currently working with Excelerate, focused on building impactful solutions through data, partnerships and innovation. I am preparing for UGC NET to clear JRF and pursue my PhD with a job. My research interests lie at the intersection of Hindu religion, microeconomics and mythology.',
  motto: 'Big dreams, strategic plans, consistent action.',

  stats: {
    years: 2,
    yearsPlus: true,
    projects: 3,
    projectsPlus: true,
    skills: 9,
  },

  experience: [
    {
      role: 'Associate Consultant',
      company: 'Excelerate',
      period: 'Aug 2024 – Present',
      current: true,
      bullets: [
        'Build end-to-end program infrastructure for structured internship cohorts: scoring models, automation and dashboards.',
        'Designed the Merit Model, an intern scoring and visibility system used across cohort tracks.',
        'Write cohort briefs and program structure documents for new internship tracks.',
      ],
    },
  ],

  education: [{ degree: 'M.A. in Economics', short: 'M.A.', field: 'Economics', year: '2022' }],

  skills: [
    'Data Analysis',
    'Research Design',
    'Program Operations',
    'Content Design',
    'Automation',
    'Dashboarding',
    'Google Sheets',
    'Stakeholder Management',
    'Microeconomics',
  ],

  projects: [
    {
      title: 'Merit Model Portal',
      description: 'Intern scoring, automation and visibility system for Excelerate cohorts.',
      tags: ['Google Sheets', 'Apps Script', 'Looker Studio'],
    },
    {
      title: 'Internship Cohort Briefs',
      description: 'Structured brief and program documents for INV and BCA internship tracks.',
      tags: ['Content Design', 'Program Design'],
    },
    {
      title: 'Deliverable Evaluation Framework',
      description: 'Rubric-based evaluation of intern team deliverables across cohort tracks.',
      tags: ['Rubrics', 'Data Analysis'],
    },
  ],

  achievements: [
    'Built the Merit Model scoring system from scratch, adopted across cohorts',
    'Designed briefs for multiple internship cohort tracks',
  ],
  certifications: [],

  goals: [
    { label: 'Goal', value: 'Clear UGC NET JRF', note: 'At least 200 marks' },
    { label: 'Next Step', value: 'PhD Enrollment', note: 'with a job' },
    { label: 'Timeline', value: 'Target: June 2026' },
  ],

  interests: ['Hindu religion', 'Microeconomics', 'Mythology'],
};
