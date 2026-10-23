import { useScrollSpy } from '../hooks/useScrollSpy';
import type { Resume } from '../lib/types';
import { Hero } from './Hero';
import { NAV, NavBar } from './NavBar';
import { AboutSection, ExperienceSection, Footer, ProjectsSection, SkillsSection } from './Sections';
import './Dashboard.css';

const IDS = NAV.map((n) => n.id);

export function Dashboard({ resume }: { resume: Resume }) {
  const active = useScrollSpy(IDS, 140);
  return (
    <>
      <NavBar name={resume.name} email={resume.email} active={active} />
      <main>
        <Hero resume={resume} />
        <ProjectsSection resume={resume} />
        <SkillsSection resume={resume} />
        <ExperienceSection resume={resume} />
        <AboutSection resume={resume} />
      </main>
      <Footer resume={resume} />
    </>
  );
}
