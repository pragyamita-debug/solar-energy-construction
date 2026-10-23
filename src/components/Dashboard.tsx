import { useState } from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import type { Resume } from '../lib/types';
import { Hero } from './Hero';
import { AboutCard, QuickLinks } from './Overview';
import { Projects } from './Projects';
import { NAV, Sidebar } from './Sidebar';
import { Solutions } from './Solutions';
import { StatCards } from './StatCards';
import { Topbar } from './Topbar';
import './Dashboard.css';

const IDS = NAV.map((n) => n.id);

export function Dashboard({ resume }: { resume: Resume }) {
  const active = useScrollSpy(IDS);
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="shell">
      <Sidebar active={active} open={navOpen} onNavigate={() => setNavOpen(false)} cvUrl={resume.cvUrl} />

      <div className="shell__main">
        <Topbar resume={resume} onMenu={() => setNavOpen(true)} />
        <Hero resume={resume} />

        <main className="content">
          <StatCards resume={resume} />
          <div className="overview">
            <AboutCard resume={resume} />
            <QuickLinks resume={resume} />
          </div>
          <Projects projects={resume.projects} />
          <Solutions resume={resume} />
          <footer className="footer">
            <span>© {new Date().getFullYear()} {resume.name}</span>
            <span>PureSolar</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
