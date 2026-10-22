import { useEffect, useMemo, useRef, useState } from 'react';
import type { Resume } from '../lib/types';
import { Icon, type IconName } from './Icon';

interface Props {
  resume: Resume;
  photo?: string;
  fileName?: string;
  updatedAt: number;
  onMenu: () => void;
  onUploadNew: () => void;
  onEdit: () => void;
  onPhoto: () => void;
  onReset: () => void;
}

interface Hit {
  label: string;
  sub: string;
  section: string;
  icon: IconName;
}

function buildIndex(r: Resume): Hit[] {
  return [
    ...r.skills.map((s) => ({ label: s, sub: 'Skill', section: 'skills', icon: 'skills' as const })),
    ...r.experience.map((e) => ({ label: e.role, sub: [e.company, e.period].filter(Boolean).join(' · '), section: 'experience', icon: 'briefcase' as const })),
    ...r.projects.map((p) => ({ label: p.title, sub: 'Project', section: 'projects', icon: 'folder' as const })),
    ...r.education.map((e) => ({ label: e.degree, sub: e.institution ?? 'Education', section: 'education', icon: 'graduation' as const })),
    ...[...r.achievements, ...r.certifications].map((a) => ({ label: a, sub: 'Achievement', section: 'achievements', icon: 'award' as const })),
    ...r.interests.map((i) => ({ label: i, sub: 'Interest', section: 'skills', icon: 'bulb' as const })),
  ];
}

function useClickOutside(onOutside: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onOutside();
    };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, [onOutside]);
  return ref;
}

function timeAgo(ts: number) {
  const mins = Math.round((Date.now() - ts) / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  return hrs < 24 ? `${hrs} h ago` : new Date(ts).toLocaleDateString();
}

export function Topbar({ resume, photo, fileName, updatedAt, onMenu, onUploadNew, onEdit, onPhoto, onReset }: Props) {
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const [menu, setMenu] = useState<'none' | 'search' | 'bell' | 'user'>('none');
  const close = useMemo(() => () => setMenu('none'), []);
  const ref = useClickOutside(close);

  const index = useMemo(() => buildIndex(resume), [resume]);
  const hits = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index.filter((h) => h.label.toLowerCase().includes(q) || h.sub.toLowerCase().includes(q)).slice(0, 7);
  }, [index, query]);

  const go = (hit: Hit) => {
    const el = document.getElementById(hit.section);
    el?.scrollIntoView({ behavior: 'smooth' });
    el?.classList.remove('is-flash');
    requestAnimationFrame(() => el?.classList.add('is-flash'));
    setQuery('');
    close();
  };

  const initial = resume.name.trim()[0]?.toUpperCase() ?? 'P';

  return (
    <header className="topbar" ref={ref}>
      <button className="icon-btn topbar__menu" onClick={onMenu} aria-label="Open navigation">
        <Icon name="menu" size={20} />
      </button>

      <div className="search" role="search">
        <Icon name="search" size={18} />
        <input
          type="search"
          placeholder="Search skills, experience, or projects..."
          aria-label="Search the dashboard"
          value={query}
          onFocus={() => setMenu('search')}
          onChange={(e) => {
            setQuery(e.target.value);
            setCursor(0);
            setMenu('search');
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') setCursor((c) => Math.min(c + 1, hits.length - 1));
            else if (e.key === 'ArrowUp') setCursor((c) => Math.max(c - 1, 0));
            else if (e.key === 'Enter' && hits[cursor]) go(hits[cursor]);
            else if (e.key === 'Escape') close();
          }}
        />
        {menu === 'search' && query && (
          <ul className="popover search__results" role="listbox">
            {hits.length ? (
              hits.map((h, i) => (
                <li key={`${h.section}-${h.label}-${i}`} role="option" aria-selected={i === cursor}>
                  <button className={i === cursor ? 'is-active' : ''} onMouseEnter={() => setCursor(i)} onClick={() => go(h)}>
                    <Icon name={h.icon} size={16} />
                    <span>
                      <b>{h.label}</b>
                      <small>{h.sub}</small>
                    </span>
                  </button>
                </li>
              ))
            ) : (
              <li className="search__empty">No matches for “{query}”</li>
            )}
          </ul>
        )}
      </div>

      <div className="topbar__actions">
        <div className="topbar__pop">
          <button className="icon-btn bell" aria-label="Notifications" onClick={() => setMenu(menu === 'bell' ? 'none' : 'bell')}>
            <Icon name="bell" size={19} />
            <span className="bell__dot" />
          </button>
          {menu === 'bell' && (
            <div className="popover notice">
              <b>Dashboard generated</b>
              <p>
                Built from {fileName ? <em>{fileName}</em> : 'the sample CV'} · {timeAgo(updatedAt)}
              </p>
            </div>
          )}
        </div>

        <div className="topbar__pop">
          <button className="avatar-btn" aria-label="Account menu" aria-expanded={menu === 'user'} onClick={() => setMenu(menu === 'user' ? 'none' : 'user')}>
            <span className="avatar-btn__img">{photo ? <img src={photo} alt="" /> : initial}</span>
            <Icon name="chevronDown" size={16} />
          </button>
          {menu === 'user' && (
            <ul className="popover menu">
              {[
                { label: 'Upload a new CV', icon: 'upload' as const, fn: onUploadNew },
                { label: 'Edit details', icon: 'edit' as const, fn: onEdit },
                { label: photo ? 'Change photo' : 'Add a photo', icon: 'camera' as const, fn: onPhoto },
                { label: 'Start over', icon: 'refresh' as const, fn: onReset },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => {
                      close();
                      item.fn();
                    }}
                  >
                    <Icon name={item.icon} size={16} /> {item.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
