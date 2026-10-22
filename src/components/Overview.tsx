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

interface QuickLinksProps {
  resume: Resume;
  onViewResume: () => void;
}

export function QuickLinks({ resume, onViewResume }: QuickLinksProps) {
  const items: { label: string; icon: IconName; href?: string; onClick?: () => void; external?: boolean }[] = [
    { label: 'View Resume', icon: 'download', onClick: onViewResume },
    resume.links.linkedin && { label: 'LinkedIn Profile', icon: 'link' as IconName, href: resume.links.linkedin, external: true },
    resume.links.github && !resume.links.linkedin && { label: 'GitHub', icon: 'link' as IconName, href: resume.links.github, external: true },
    { label: resume.interests.length ? 'Research Interests' : 'Key Skills', icon: 'bulb' as IconName, href: '#skills' },
    resume.education.length ? { label: 'Education', icon: 'book' as IconName, href: '#education' } : null,
    resume.email ? { label: 'Contact Me', icon: 'mail' as IconName, href: `mailto:${resume.email}` } : null,
  ]
    .filter(Boolean)
    .slice(0, 4) as { label: string; icon: IconName; href?: string; onClick?: () => void; external?: boolean }[];

  return (
    <GlowCard as="aside" id="contact" className="quick" accent="teal" speed={8} phase={0.7} tilt={false} aria-label="Quick links">
      <h2 className="card-title">
        <Icon name="link" size={20} /> Quick Links
      </h2>
      <ul className="quick__list">
        {items.map((item, i) => {
          const inner = (
            <>
              <Icon name={item.icon} size={18} />
              <span>{item.label}</span>
              <Icon name="chevronRight" size={16} />
            </>
          );
          return (
            <Reveal as="li" key={item.label} delay={80 * i}>
              {item.href ? (
                <a href={item.href} {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                  {inner}
                </a>
              ) : (
                <button onClick={item.onClick}>{inner}</button>
              )}
            </Reveal>
          );
        })}
      </ul>
    </GlowCard>
  );
}
