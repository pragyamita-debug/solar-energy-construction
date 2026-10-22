import { useState } from 'react';
import { useScrollSpy } from '../hooks/useScrollSpy';
import type { StoredProfile } from '../lib/types';
import { Hero } from './Hero';
import { AboutCard, QuickLinks } from './Overview';
import { Projects } from './Projects';
import { NAV, Sidebar } from './Sidebar';
import { Solutions } from './Solutions';
import { StatCards } from './StatCards';
import { Topbar } from './Topbar';
import './Dashboard.css';

const IDS = NAV.map((n) => n.id);

interface Props {
  profile: StoredProfile;
  onUploadNew: () => void;
  onEdit: () => void;
  onPhoto: () => void;
  onReset: () => void;
  onDownloadCv: () => void;
}

export function Dashboard({ profile, onUploadNew, onEdit, onPhoto, onReset, onDownloadCv }: Props) {
  const { resume, photo } = profile;
  const active = useScrollSpy(IDS);
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="shell">
      <Sidebar active={active} open={navOpen} onNavigate={() => setNavOpen(false)} onDownload={onDownloadCv} />

      <div className="shell__main">
        <Topbar
          resume={resume}
          photo={photo}
          fileName={profile.file?.name}
          updatedAt={profile.updatedAt}
          onMenu={() => setNavOpen(true)}
          onUploadNew={onUploadNew}
          onEdit={onEdit}
          onPhoto={onPhoto}
          onReset={onReset}
        />

        <Hero resume={resume} photo={photo} onPhoto={onPhoto} />

        <main className="content">
          <StatCards resume={resume} />
          <div className="overview">
            <AboutCard resume={resume} />
            <QuickLinks resume={resume} onViewResume={onDownloadCv} />
          </div>
          <Projects projects={resume.projects} />
          <Solutions resume={resume} />
          <footer className="footer">
            <span>© {new Date().getFullYear()} {resume.name}</span>
            <span>Generated from a CV · PureSolar</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
