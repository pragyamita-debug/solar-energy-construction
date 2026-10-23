import { useRef } from 'react';
import { useCountUp } from '../hooks/useCountUp';
import { useInView } from '../hooks/useInView';
import { useScramble } from '../hooks/useScramble';
import type { Resume } from '../lib/types';
import { GlowCard } from './GlowCard';
import { Icon, type IconName } from './Icon';
import { GreenScene } from './scene/GreenScene';

function firstSentences(text: string, max = 260) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [text];
  let out = '';
  for (const s of sentences) {
    if ((out + s).length > max) break;
    out += s;
  }
  return (out || text.slice(0, max)).trim();
}

interface StatProps {
  icon: IconName;
  label: string;
  value: number | string;
  suffix?: string;
  index: number;
  run: boolean;
}

function Stat({ icon, label, value, suffix = '', index, run }: StatProps) {
  const numeric = typeof value === 'number';
  const delay = 200 + index * 150;
  const count = useCountUp(numeric ? value : 0, run, { duration: 1700 + index * 150, delay });
  const text = useScramble(numeric ? '' : value, run && !numeric, { delay });
  const done = numeric ? count >= value * 0.98 : text === value;
  return (
    <div className="stat">
      <span className={`stat__icon ${done ? 'is-done' : ''}`}>
        <Icon name={icon} size={22} />
      </span>
      <b className="stat__value" aria-label={`${value}${suffix}`}>
        <span aria-hidden>
          {numeric ? Math.round(count) : text || ' '}
          {suffix && <span className={`stat__suffix ${done ? 'is-on' : ''}`}>{suffix}</span>}
        </span>
      </b>
      <span className="stat__label">{label}</span>
    </div>
  );
}

export function Hero({ resume }: { resume: Resume }) {
  const ref = useRef<HTMLElement>(null);
  const [statsRef, statsIn] = useInView<HTMLDivElement>(0.3);
  const { stats } = resume;
  const edu = resume.education[0];
  const intro = resume.summary ? firstSentences(resume.summary) : resume.tagline;

  const onPointerMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType === 'touch') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty('--py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };

  const projectsStat =
    stats.projects === 0 && resume.experience.length > 0
      ? { value: resume.experience.length, label: resume.experience.length === 1 ? 'Role Held' : 'Roles Held', suffix: '' }
      : { value: stats.projects, label: 'Projects Showcased', suffix: stats.projectsPlus || stats.projects > 0 ? '+' : '' };

  return (
    <section id="home" className="hero" ref={ref} onPointerMove={onPointerMove} aria-label="Introduction">
      <div className="hero__scene" aria-hidden>
        <GreenScene />
      </div>

      <div className="wrap hero__content">
        <p className="eyebrow hero__eyebrow">{[resume.location, 'Portfolio'].filter(Boolean).join(' · ')}</p>
        <h1 className="hero__title">
          <span>Hi, I’m {resume.name}</span>
          {resume.headline && <span className="hero__role shimmer">{resume.headline}</span>}
        </h1>
        {intro && <p className="hero__intro">{intro}</p>}
        <div className="hero__actions">
          <a className="btn btn--primary" href="#projects">
            View my work <Icon name="arrowRight" size={16} />
          </a>
          <a className="btn btn--ghost" href={resume.email ? `mailto:${resume.email}` : '#about'}>
            <Icon name="mail" size={16} /> Contact Me
          </a>
        </div>
      </div>

      <div className="wrap" ref={statsRef}>
        <GlowCard className="stats" accent="green" speed={9} tilt={false}>
          <Stat index={0} run={statsIn} icon="leaf" {...projectsStat} />
          {stats.years === 0 && resume.experience.length > 0 ? (
            <Stat index={1} run={statsIn} icon="clock" value="<1" label="Year of Experience" />
          ) : (
            <Stat index={1} run={statsIn} icon="clock" value={stats.years} suffix={stats.yearsPlus ? '+' : ''} label={stats.years === 1 ? 'Year of Experience' : 'Years of Experience'} />
          )}
          <Stat index={2} run={statsIn} icon="user" value={stats.skills} label="Skills Listed" />
          <Stat index={3} run={statsIn} icon="graduation" value={edu?.short || '—'} label={edu?.field ? `Education · ${edu.field}` : 'Education'} />
        </GlowCard>
      </div>
    </section>
  );
}
