import { useCallback, useEffect, useRef, useState } from 'react';
import type { Project } from '../lib/types';
import { GlowCard } from './GlowCard';
import { Icon, type IconName } from './Icon';
import { Reveal } from './Reveal';
import residential from '../assets/photos/project-residential.jpg';
import commercial from '../assets/photos/project-commercial.jpg';
import offgrid from '../assets/photos/project-offgrid.jpg';

const PHOTOS = [residential, commercial, offgrid];
import './Projects.css';

const BADGES: IconName[] = ['home', 'layers', 'leaf', 'rocket', 'bulb', 'target'];

export function Projects({ projects }: { projects: Project[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure, projects.length]);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector('li');
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 16), behavior: 'smooth' });
  };

  return (
    <section id="projects" className="panel projects" aria-labelledby="projects-title">
      <header className="projects__head">
        <Reveal>
          <span className="eyebrow">My Projects</span>
          <h2 id="projects-title" className="section-title">
            Real Projects. Real Impact.
          </h2>
          <p className="section-sub">Explore some of my key projects where I have applied data, research and strategic thinking to solve real-world problems.</p>
        </Reveal>
        {projects.length > 1 && (
          <div className="projects__arrows">
            <button className="icon-btn" onClick={() => scrollBy(-1)} disabled={edges.start} aria-label="Previous projects">
              <Icon name="arrowLeft" size={18} />
            </button>
            <button className="icon-btn" onClick={() => scrollBy(1)} disabled={edges.end} aria-label="Next projects">
              <Icon name="arrowRight" size={18} />
            </button>
          </div>
        )}
      </header>

      {projects.length ? (
        <ul className="projects__track" ref={track} onScroll={measure}>
          {projects.map((p, i) => (
            <Reveal as="li" key={p.title + i} delay={(i % 3) * 120}>
              <GlowCard as="article" className="project" accent={i % 2 ? 'teal' : 'green'} phase={i * 0.31} speed={8}>
                <div className="project__cover">
                  <img className="cover" src={p.image ?? PHOTOS[i % PHOTOS.length]} alt="" loading="lazy" />
                  <span className="project__badge">
                    <Icon name={BADGES[i % BADGES.length]} size={18} />
                  </span>
                </div>
                <div className="project__body">
                  <h3>{p.title}</h3>
                  {(p.meta || p.tags.length > 0) && (
                    <p className="project__meta">
                      <Icon name="pin" size={14} />
                      {p.meta || p.tags.join(', ')}
                    </p>
                  )}
                  {p.description && <p className="project__desc">{p.description}</p>}
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </ul>
      ) : (
        <p className="empty">No projects section was found in the CV. Add a “Projects” heading and they’ll show up here.</p>
      )}
    </section>
  );
}
