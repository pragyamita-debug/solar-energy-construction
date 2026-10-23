import type { Resume } from '../lib/types';

/**
 * Everything the dashboard shows comes from this object.
 * Replace the placeholder values with your own and the page updates —
 * no other file needs to change.
 */
const CV = `${import.meta.env.BASE_URL}sample-cv.pdf`;

export const profile: Resume = {
  name: 'Your Name',
  headline: 'Your Role | Your Specialty',
  tagline: 'A one-line introduction about what you do and the impact you want to make.',
  email: 'you@example.com',
  location: 'Your City, Country',
  links: {
    linkedin: 'https://www.linkedin.com/',
    github: 'https://github.com/',
    twitter: 'https://x.com/',
  },
  summary:
    'Write two or three sentences about who you are, the kind of work you do and what you are looking for next. This text appears in the About Me card, so keep it short and specific.',
  motto: 'Big dreams, strategic plans, consistent action.',

  /** Profile picture: import an image (e.g. `import photo from '../assets/photos/me.jpg'`) and set `photo`. Without one, initials are shown. */
  photo: undefined,
  cvUrl: CV,

  stats: {
    years: 2,
    yearsPlus: true,
    projects: 12,
    projectsPlus: true,
    skills: 8,
  },

  quickLinks: [
    { label: 'View Resume', icon: 'download', href: CV },
    { label: 'Study Plan', icon: 'book', href: '#about' },
    { label: 'Research Interests', icon: 'bulb', href: '#skills' },
    { label: 'Contact Me', icon: 'mail', href: 'mailto:you@example.com' },
  ],

  goals: [
    { label: 'Goal', value: 'Your next big milestone', note: 'a measurable target' },
    { label: 'Next Step', value: 'What you are working on now', note: 'how you will get there' },
    { label: 'Timeline', value: 'Target: Month Year' },
  ],

  experience: [
    {
      role: 'Your Current Role',
      company: 'Company Name',
      period: '2023 – Present',
      current: true,
      bullets: ['What you are responsible for.', 'A result you are proud of.'],
    },
  ],

  education: [{ degree: 'Your Degree in Your Subject', short: 'M.A.', field: 'Your Subject', year: '2022' }],

  skills: ['Skill One', 'Skill Two', 'Skill Three', 'Skill Four', 'Skill Five', 'Skill Six', 'Skill Seven', 'Skill Eight'],

  projects: [
    {
      title: 'Residential Solar Project',
      meta: 'California, USA',
      description: 'A modern home with a high-efficiency solar system, delivering clean and reliable energy.',
      tags: ['Residential', 'Rooftop PV'],
    },
    {
      title: 'Commercial Solar Project',
      meta: 'Texas, USA',
      description: 'Helping businesses reduce operating costs with custom solar solutions and long-term savings.',
      tags: ['Commercial', 'Rooftop PV'],
    },
    {
      title: 'Off-Grid Solar Project',
      meta: 'Nevada, USA',
      description: 'Reliable solar power for remote areas, providing clean energy and energy freedom.',
      tags: ['Off-grid', 'Storage'],
    },
  ],

  solutions: {
    eyebrow: 'Solutions',
    title: 'Solar Solutions for Every Need',
    subtitle: 'Whether you’re a homeowner, business owner or part of a community, we have the right solar solution for you.',
    items: [
      { title: 'Residential Solar', text: 'Clean energy for your home.', icon: 'home' },
      { title: 'Commercial Solar', text: 'Power your business efficiently.', icon: 'building' },
      { title: 'Solar Battery Storage', text: 'Store energy for when you need it.', icon: 'battery' },
      { title: 'Solar Maintenance', text: 'Keep your system running at its best.', icon: 'wrench' },
    ],
  },

  achievements: ['An award or recognition', 'A certification you hold'],
  certifications: [],
  interests: ['Interest One', 'Interest Two', 'Interest Three'],
};
