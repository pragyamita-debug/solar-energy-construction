import type { Resume } from '../lib/types';
import { GlowCard } from './GlowCard';
import { Icon, type IconName } from './Icon';
import { Reveal } from './Reveal';
import { GreenScene } from './scene/GreenScene';
import { ProjectCover } from './scene/ProjectCover';

/* ---------------- Projects ---------------- */

const BADGES: { icon: IconName; color: string }[] = [
  { icon: 'wind', color: '#4caf50' },
  { icon: 'droplet', color: '#3b8fe8' },
  { icon: 'sun', color: '#f2b632' },
  { icon: 'sprout', color: '#4caf50' },
];

export function ProjectsSection({ resume }: { resume: Resume }) {
  const { projects } = resume;
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">Selected work</span>
          <h2 id="projects-title" className="section-title">
            Projects that make a difference
          </h2>
        </Reveal>

        {projects.length ? (
          <ul className="projects" style={{ ['--cols' as string]: Math.min(4, Math.max(3, projects.length)) }}>
            {projects.map((p, i) => {
              const badge = BADGES[i % BADGES.length];
              return (
                <Reveal as="li" key={p.title + i} delay={(i % 4) * 110}>
                  <GlowCard as="article" className="project" accent="green" phase={i * 0.27} speed={8}>
                    <div className="project__cover">
                      <ProjectCover index={i} />
                    </div>
                    <span className="project__badge" style={{ background: badge.color }}>
                      <Icon name={badge.icon} size={18} />
                    </span>
                    <div className="project__body">
                      <h3>{p.title}</h3>
                      {p.description && <p>{p.description}</p>}
                      {p.tags.length > 0 && <p className="project__tags">{p.tags.join(' · ')}</p>}
                      <a className="project__more" href={resume.email ? `mailto:${resume.email}?subject=${encodeURIComponent(p.title)}` : '#about'}>
                        Learn More <Icon name="arrowRight" size={14} />
                      </a>
                    </div>
                  </GlowCard>
                </Reveal>
              );
            })}
          </ul>
        ) : (
          <p className="empty">Add a “Projects” heading to the CV and the projects show up here.</p>
        )}
      </div>
    </section>
  );
}

/* ---------------- Skills ---------------- */

const SKILL_ICONS: IconName[] = ['monitor', 'gauge', 'sun', 'shield', 'headset', 'refresh'];

export function SkillsSection({ resume }: { resume: Resume }) {
  const strip = resume.skills.slice(0, 6);
  const rest = [...resume.skills.slice(6), ...resume.interests.filter((i) => !resume.skills.includes(i))];
  if (!resume.skills.length) return null;
  return (
    <section id="skills" className="section section--tight" aria-label="Skills">
      <div className="wrap">
        <GlowCard className="skills" accent="green" speed={10} phase={0.5} tilt={false}>
          <ul style={{ ['--n' as string]: strip.length }}>
            {strip.map((s, i) => (
              <Reveal as="li" key={s} delay={i * 80} className="skill">
                <span className="skill__icon">
                  <Icon name={SKILL_ICONS[i % SKILL_ICONS.length]} size={26} />
                </span>
                <span>{s}</span>
              </Reveal>
            ))}
          </ul>
        </GlowCard>
        {rest.length > 0 && (
          <ul className="chips">
            {rest.map((s) => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/* ---------------- Experience & education ---------------- */

export function ExperienceSection({ resume }: { resume: Resume }) {
  const certs = [...resume.certifications, ...resume.achievements];
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">Experience &amp; Education</span>
          <h2 id="experience-title" className="section-title">
            Where I have worked and studied
          </h2>
        </Reveal>

        <div className="split">
          <GlowCard className="panel" accent="green" speed={11} phase={0.2} tilt={false}>
            <h3 className="panel__title">
              <Icon name="briefcase" size={20} /> Experience
            </h3>
            {resume.experience.length ? (
              <ol className="timeline">
                {resume.experience.map((e, i) => (
                  <Reveal as="li" key={e.role + i} delay={i * 100} className={e.current ? 'is-current' : ''}>
                    <b>{e.role}</b>
                    <span className="timeline__meta">{[e.company, e.period].filter(Boolean).join(' | ')}</span>
                    {e.bullets.length > 0 && (
                      <ul>
                        {e.bullets.map((b, j) => (
                          <li key={j}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </Reveal>
                ))}
              </ol>
            ) : (
              <p className="empty">No experience section was found in the CV.</p>
            )}
          </GlowCard>

          <GlowCard className="panel" accent="green" speed={11} phase={0.65} tilt={false}>
            <h3 className="panel__title">
              <Icon name="graduation" size={20} /> Education
            </h3>
            {resume.education.length ? (
              <ul className="degrees">
                {resume.education.map((e, i) => (
                  <Reveal as="li" key={e.degree + i} delay={i * 100}>
                    <span className="degrees__icon">
                      <Icon name={i % 2 ? 'book' : 'graduation'} size={20} />
                    </span>
                    <span>
                      <b>{e.degree}</b>
                      {e.year && <small>({e.year})</small>}
                      {e.institution && <small>{e.institution}</small>}
                    </span>
                  </Reveal>
                ))}
              </ul>
            ) : (
              <p className="empty">No education section was found in the CV.</p>
            )}

            {certs.length > 0 && (
              <div className="certs">
                <span className="eyebrow">Certifications &amp; Achievements</span>
                <ul className="chips">
                  {certs.map((c) => (
                    <li key={c} className="chip">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </GlowCard>
        </div>
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */

export function AboutSection({ resume }: { resume: Resume }) {
  const { photo } = resume;
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="wrap about">
        <Reveal className="about__media">
          {photo ? <img src={photo} alt={resume.name} /> : <GreenScene sunX={1050} />}
        </Reveal>
        <Reveal className="about__text" delay={120}>
          <span className="eyebrow">About me</span>
          <h2 id="about-title" className="section-title">
            {resume.motto || 'Let’s build something meaningful'}
          </h2>
          {resume.summary && <p className="about__summary">{resume.summary}</p>}
          {resume.goals.length > 0 && (
            <ul className="goals">
              {resume.goals.map((g, i) => (
                <li key={g.label + i}>
                  <Icon name={(['target', 'calendar', 'clock'] as IconName[])[i % 3]} size={18} />
                  <span>
                    <b>{g.label}:</b> {g.value}
                    {g.note && <small> ({g.note})</small>}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <a className="btn btn--primary" href={resume.email ? `mailto:${resume.email}` : '#home'}>
            Get in touch <Icon name="arrowRight" size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer({ resume }: { resume: Resume }) {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <span>
          © {new Date().getFullYear()} {resume.name}
        </span>
        <span className="footer__links">
          {resume.email && (
            <a className="icon-btn" href={`mailto:${resume.email}`} aria-label="Email">
              <Icon name="mail" size={16} />
            </a>
          )}
          {resume.links.linkedin && (
            <a className="icon-btn" href={resume.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Icon name="linkedin" size={16} />
            </a>
          )}
          {resume.links.github && (
            <a className="icon-btn" href={resume.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Icon name="github" size={16} />
            </a>
          )}
        </span>
      </div>
    </footer>
  );
}
