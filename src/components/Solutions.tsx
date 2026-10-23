import { useEffect, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import type { Resume } from '../lib/types';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import sunPhoto from '../assets/photos/solutions-sun.jpg';
import './Solutions.css';

export function Solutions({ resume }: { resume: Resume }) {
  const { solutions } = resume;
  const items = solutions.items.slice(0, 4).map((it) => ({ name: it.title, sub: it.text, icon: it.icon }));
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // the highlight walks along the row, like the step strip in the reference video
  useEffect(() => {
    if (reduced || paused || items.length < 2) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % items.length), 2400);
    return () => clearInterval(t);
  }, [reduced, paused, items.length]);

  return (
    <section id="skills" className="panel solutions" aria-labelledby="solutions-title">
      <div className="solutions__main">
        <Reveal>
          <span className="eyebrow">{solutions.eyebrow}</span>
          <h2 id="solutions-title" className="section-title">
            {solutions.title}
          </h2>
          {solutions.subtitle && <p className="section-sub">{solutions.subtitle}</p>}
        </Reveal>

        {items.length > 0 ? (
          <div className="solutions__row" style={{ ['--n' as string]: items.length }} onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
            <svg className="solutions__wire" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden>
              <path d="M0 5 C 12 0, 13 10, 25 5 S 38 0, 50 5 S 63 10, 75 5 S 88 0, 100 5" className="solutions__wire-base" />
              <path d="M0 5 C 12 0, 13 10, 25 5 S 38 0, 50 5 S 63 10, 75 5 S 88 0, 100 5" className="solutions__wire-light" />
            </svg>
            <ul>
              {items.map((it, i) => (
                <Reveal as="li" key={it.name} delay={i * 110} className={`solution ${i === active ? 'is-active' : ''}`} onPointerEnter={() => setActive(i)}>
                  <span className="solution__icon">
                    <Icon name={it.icon} size={20} />
                  </span>
                  <span className="solution__text">
                    <b>{it.name}</b>
                    <small>{it.sub}</small>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        ) : (
          <p className="empty">Add items to `solutions.items` in src/data/profile.ts.</p>
        )}
      </div>

      <div className="solutions__orb" aria-hidden>
        <div className="solutions__orb-scene">
          <img src={sunPhoto} alt="" />
          <span className="solutions__flare" />
        </div>
        <span className="solutions__leaf">
          <Icon name="leaf" size={22} />
        </span>
      </div>
    </section>
  );
}
