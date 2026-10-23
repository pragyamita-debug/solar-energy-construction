import type { IconName } from './Icon';
import { Icon } from './Icon';
import { Logo } from './Logo';

export const NAV: { id: string; label: string; icon: IconName }[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'about', label: 'About', icon: 'user' },
  { id: 'experience', label: 'Experience', icon: 'briefcase' },
  { id: 'skills', label: 'Skills', icon: 'skills' },
  { id: 'projects', label: 'Projects', icon: 'folder' },
  { id: 'education', label: 'Education', icon: 'graduation' },
  { id: 'achievements', label: 'Achievements', icon: 'star' },
  { id: 'contact', label: 'Contact', icon: 'mail' },
];

interface Props {
  active: string;
  open: boolean;
  onNavigate: () => void;
  cvUrl?: string;
}

export function Sidebar({ active, open, onNavigate, cvUrl }: Props) {
  return (
    <>
      <div className={`scrim ${open ? 'is-open' : ''}`} onClick={onNavigate} aria-hidden />
      <aside className={`sidebar ${open ? 'is-open' : ''}`} aria-label="Sections">
        <div className="sidebar__logo">
          <Logo />
        </div>
        <nav>
          <ul>
            {NAV.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={active === item.id ? 'is-active' : ''}
                  aria-current={active === item.id ? 'location' : undefined}
                  onClick={onNavigate}
                >
                  <Icon name={item.icon} size={19} />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {cvUrl && (
        <a className="sidebar__cv" href={cvUrl} download>
          <span className="sidebar__cv-icon">
            <Icon name="file" size={18} />
          </span>
          <span>
            <b>Download My CV</b>
            <small>Get a detailed version of my resume.</small>
          </span>
          <Icon name="download" size={18} />
        </a>
        )}
      </aside>
    </>
  );
}
