import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { findDateRange, mergedMonths } from './dates';
import { parseResume } from './parseResume';

const TODAY = new Date(2026, 9, 22); // 22 Oct 2026

describe('dates', () => {
  it('reads month-year ranges with an open end', () => {
    const r = findDateRange('Designer | Jan 2024 – Present', TODAY)!;
    expect(r.label).toBe('Jan 2024 – Present');
    expect(r.current).toBe(true);
  });

  it('reads numeric and year-only ranges', () => {
    expect(findDateRange('03/2021 - 06/2023')!.label).toBe('Mar 2021 – Jun 2023');
    expect(findDateRange('2018 to 2020')!.label).toBe('2018 – 2020');
  });

  it('counts overlapping jobs once', () => {
    const a = findDateRange('Jan 2020 - Jan 2022')!;
    const b = findDateRange('Jan 2021 - Jan 2023')!;
    expect(mergedMonths([a, b])).toBe(36);
  });
});

describe('parseResume — sample CV', () => {
  const cv = parseResume(readFileSync('src/data/sample-cv.txt', 'utf8'), TODAY);

  it('pulls the header', () => {
    expect(cv.name).toBe('Pragyamita Saha');
    expect(cv.headline).toBe('Consultant | Aspiring PhD Scholar');
    expect(cv.tagline).toMatch(/^Turning ideas into impact/);
    expect(cv.email).toBe('pragyamitasaha@gmail.com');
    expect(cv.location).toBe('India');
    expect(cv.links.github).toContain('github.com/pragyamita-debug');
  });

  it('builds experience and stats', () => {
    expect(cv.experience[0]).toMatchObject({ role: 'Associate Consultant', company: 'Excelerate', current: true });
    expect(cv.experience[0].bullets).toHaveLength(3);
    expect(cv.stats.years).toBe(2);
    expect(cv.stats.yearsPlus).toBe(true);
  });

  it('finds the highest degree', () => {
    expect(cv.education[0]).toMatchObject({ short: 'M.A.', field: 'Economics', year: '2022' });
  });

  it('reads skills, projects, goals and interests', () => {
    expect(cv.skills).toContain('Data Analysis');
    expect(cv.skills.length).toBe(9);
    expect(cv.projects.map((p) => p.title)).toEqual(['Merit Model Portal', 'Internship Cohort Briefs', 'Deliverable Evaluation Framework']);
    expect(cv.projects[0].tags).toContain('Apps Script');
    expect(cv.goals[0]).toEqual({ label: 'Goal', value: 'Clear UGC NET JRF', note: 'At least 200 marks' });
    expect(cv.interests).toEqual(['Hindu religion', 'Microeconomics', 'Mythology']);
  });
});

describe('parseResume — other layouts', () => {
  it('handles "Role at Company" and two-line headers', () => {
    const cv = parseResume(
      `Jane Doe
Senior Product Designer
jane@doe.design · +1 415 555 0101 · San Francisco
EXPERIENCE
Senior Product Designer at Figma
Mar 2021 - Present
- Led the design system
Acme Corp
UX Designer, 2017 - 2021
- Shipped mobile app
Education
Bachelor of Design (B.Des) - National Institute of Design, 2017
Skills
Design tools: Figma, Framer, Protopie
Research: Usability testing, Interviews`,
      TODAY,
    );
    expect(cv.name).toBe('Jane Doe');
    expect(cv.headline).toBe('Senior Product Designer');
    expect(cv.location).toBe('San Francisco');
    expect(cv.phone).toBe('+1 415 555 0101');
    expect(cv.experience).toHaveLength(2);
    expect(cv.experience[0]).toMatchObject({ role: 'Senior Product Designer', company: 'Figma' });
    expect(cv.experience[1]).toMatchObject({ role: 'UX Designer', company: 'Acme Corp' });
    expect(cv.stats.years).toBe(9);
    expect(cv.education[0].rank).toBe(3);
    expect(cv.skills).toEqual(['Figma', 'Framer', 'Protopie', 'Usability testing', 'Interviews']);
  });
});
