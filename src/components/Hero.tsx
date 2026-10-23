import { useRef } from 'react';
import heroPhoto from '../assets/photos/hero-sunrise.jpg';
import type { Resume } from '../lib/types';
import { Icon } from './Icon';
import './Hero.css';

export function Hero({ resume }: { resume: Resume }) {
  const ref = useRef<HTMLElement>(null);

  // pointer parallax: write -1..1 into CSS vars; the photo and the sun glow drift by different amounts
  const onPointerMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType === 'touch') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty('--py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };

  const initials = resume.name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  const { links } = resume;
  const socials = [
    links.linkedin && { href: links.linkedin, icon: 'linkedin' as const, label: 'LinkedIn' },
    links.github && { href: links.github, icon: 'github' as const, label: 'GitHub' },
    links.twitter && { href: links.twitter, icon: 'x' as const, label: 'X' },
    links.website && { href: links.website, icon: 'globe' as const, label: 'Website' },
  ].filter(Boolean) as { href: string; icon: 'linkedin' | 'github' | 'x' | 'globe'; label: string }[];

  return (
    <section id="home" className="hero" ref={ref} onPointerMove={onPointerMove} aria-label="Profile">
      {/* stage keeps the photo's aspect ratio while covering the hero, so the sun glow stays on the sun */}
      <div className="hero__stage" aria-hidden>
        <img className="hero__photo" src={heroPhoto} alt="" />
        <span className="hero__sun" />
        <span className="hero__rays" />
        <span className="hero__glint" />
      </div>

      <div className="hero__content">
        <div className="hero__avatar">
          <span className="hero__avatar-ring" aria-hidden />
          <span className="hero__avatar-img">{resume.photo ? <img src={resume.photo} alt={resume.name} /> : <span>{initials}</span>}</span>
        </div>

        <div className="hero__text">
          <h1 className="hero__name">
            <span className="shimmer">{resume.name}</span>
          </h1>
          {resume.headline && <p className="hero__headline">{resume.headline}</p>}
          {resume.tagline && <p className="hero__tagline">{resume.tagline}</p>}

          <ul className="hero__meta">
            {resume.email && (
              <li>
                <Icon name="mail" size={16} />
                <a href={`mailto:${resume.email}`}>{resume.email}</a>
              </li>
            )}
            {resume.location && (
              <li>
                <Icon name="pin" size={16} />
                {resume.location}
              </li>
            )}
          </ul>

          {socials.length > 0 && (
            <ul className="hero__socials">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                    <Icon name={s.icon} size={22} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {resume.motto && (
        <figure className="hero__quote">
          <span className="hero__quote-mark" aria-hidden>
            “
          </span>
          <blockquote>{resume.motto}</blockquote>
          <span className="hero__quote-line" aria-hidden />
        </figure>
      )}
    </section>
  );
}
