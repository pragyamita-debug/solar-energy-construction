import { useScrollSpy } from '../hooks/useScrollSpy';
import type { StoredProfile } from '../lib/types';
import { Hero } from './Hero';
import { NAV, NavBar } from './NavBar';
import { AboutSection, ExperienceSection, Footer, ProjectsSection, SkillsSection } from './Sections';
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
  const active = useScrollSpy(IDS, 140);

  return (
    <>
      <NavBar
        name={resume.name}
        email={resume.email}
        active={active}
        hasPhoto={!!photo}
        onUploadNew={onUploadNew}
        onEdit={onEdit}
        onPhoto={onPhoto}
        onDownloadCv={onDownloadCv}
        onReset={onReset}
      />
      <main>
        <Hero resume={resume} />
        <ProjectsSection resume={resume} />
        <SkillsSection resume={resume} />
        <ExperienceSection resume={resume} />
        <AboutSection resume={resume} photo={photo} />
      </main>
      <Footer resume={resume} />
    </>
  );
}
