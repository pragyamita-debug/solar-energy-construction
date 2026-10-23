import type { Resume } from '../lib/types';
import { GlowCard } from './GlowCard';
import { Icon, type IconName } from './Icon';
import { Reveal } from './Reveal';
import './Overview.css';

const GOAL_ICONS: IconName[] = ['target', 'calendar', 'clock', 'rocket'];

function goalsFor(r: Resume) {
  if (r.goals.length) return r.goals.slice(0, 4);
  const latest = r.experience[0];
  const edu = r.education[0];
  return [
    latest && { label: latest.current ? 'Currently' : 'Most recently', value: [latest.role, latest.company].filter(Boolean).join(' at ') },
    edu && { label: 'Education', value: [edu.degree, edu.year].filter(Boolean).join(', ') },
    r.location && { label: 'Based in', value: r.location },
  ].filter(Boolean) as { label: string; value: string; note?: string }[];
}

export function AboutCard({ resume }: { resume: Resume }) {
  const goals = goalsFor(resume);
  return (
    <GlowCard as="article" id="about" className="about" accent="blue" speed={9} phase={0.4} tilt={false}>
      <div className="about__main">
        <h2 className="card-title">
          <Icon name="user" size={20} /> About Me
        </h2>
        <p className="about__text">{resume.summary || resume.tagline || 'Add a short profile section to your CV and it will appear here.'}</p>
        <a className="btn btn--primary" href="#projects">
          View My Projects <Icon name="arrowRight" size={16} />
        </a>
      </div>
      {goals.length > 0 && (
        <ul className="about__goals">
          {goals.map((g, i) => (
            <Reveal as="li" key={g.label + i} delay={120 * i}>
              <span className="about__goal-icon">
                <Icon name={GOAL_ICONS[i % GOAL_ICONS.length]} size={22} />
              </span>
              <span>
                <b>{g.label}</b>
                <span>{g.value}</span>
                {g.note && <small>({g.note})</small>}
              </span>
            </Reveal>
          ))}
        </ul>
      )}
    </GlowCard>
  );
}

export function QuickLinks({ resume }: { resume: Resume }) {
  return (
    <GlowCard as="aside" className="quick" accent="teal" speed={8} phase={0.7} tilt={false} aria-label="Quick links">
      <h2 className="card-title">
        <Icon name="link" size={20} /> Quick Links
      </h2>
      <ul className="quick__list">
        {resume.quickLinks.map((item, i) => {
          const external = item.href.startsWith('http');
          const isFile = /\.(pdf|docx?)$/i.test(item.href);
          return (
            <Reveal as="li" key={item.label} delay={80 * i}>
              <a href={item.href} {...(isFile ? { download: '' } : external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
                <Icon name="chevronRight" size={16} />
              </a>
            </Reveal>
          );
        })}
      </ul>
    </GlowCard>
  );
}
