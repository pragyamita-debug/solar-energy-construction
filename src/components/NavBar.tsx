import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';

export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
];

interface Props {
  name: string;
  email?: string;
  active: string;
  hasPhoto: boolean;
  onUploadNew: () => void;
  onEdit: () => void;
  onPhoto: () => void;
  onDownloadCv: () => void;
  onReset: () => void;
}

export function NavBar({ name, email, active, hasPhoto, onUploadNew, onEdit, onPhoto, onDownloadCv, onReset }: Props) {
  const [menu, setMenu] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setMenu(false);
        setMobile(false);
      }
    };
    document.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('pointerdown', onDown);
    };
  }, []);

  const actions = [
    { label: 'Upload a new CV', icon: 'upload' as const, fn: onUploadNew },
    { label: 'Edit details', icon: 'edit' as const, fn: onEdit },
    { label: hasPhoto ? 'Change photo' : 'Add a photo', icon: 'camera' as const, fn: onPhoto },
    { label: 'Download CV', icon: 'download' as const, fn: onDownloadCv },
    { label: 'Start over', icon: 'refresh' as const, fn: onReset },
  ];

  return (
    <header ref={ref} className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="wrap nav__inner">
        <a className="nav__brand" href="#home">
          <span className="nav__leaf" aria-hidden>
            <Icon name="leaf" size={22} />
          </span>
          <span>{name}</span>
        </a>

        <nav className={`nav__links ${mobile ? 'is-open' : ''}`} aria-label="Sections">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={active === n.id ? 'is-active' : ''} aria-current={active === n.id ? 'location' : undefined} onClick={() => setMobile(false)}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="nav__end">
          <div className="nav__pop">
            <button className="icon-btn" aria-label="Manage dashboard" aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
              <Icon name="cog" size={18} />
            </button>
            {menu && (
              <ul className="popover" role="menu">
                {actions.map((a) => (
                  <li key={a.label}>
                    <button
                      role="menuitem"
                      onClick={() => {
                        setMenu(false);
                        a.fn();
                      }}
                    >
                      <Icon name={a.icon} size={16} /> {a.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <a className="btn btn--primary btn--sm nav__cta" href={email ? `mailto:${email}` : '#about'}>
            Contact Me <Icon name="arrowRight" size={16} />
          </a>
          <button className="icon-btn nav__burger" aria-label="Open menu" aria-expanded={mobile} onClick={() => setMobile((m) => !m)}>
            <Icon name={mobile ? 'close' : 'menu'} size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
