import type { Resume } from '../lib/types';
import { GlowCard } from './GlowCard';
import { Icon } from './Icon';
import { Reveal } from './Reveal';
import './Sections.css';

function SectionHead({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) {
  return (
    <Reveal className="section-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2 id={id} className="section-title">
        {title}
      </h2>
    </Reveal>
  );
}

export function ExperienceSection({ resume }: { resume: Resume }) {
  return (
    <section id="experience" className="panel" aria-labelledby="experience-title">
      <SectionHead eyebrow="Experience" title="Where I’ve worked" id="experience-title" />
      {resume.experience.length ? (
        <ol className="timeline">
          {resume.experience.map((e, i) => (
            <Reveal as="li" key={e.role + i} delay={i * 100} className="timeline__item">
              <span className={`timeline__dot ${e.current ? 'is-current' : ''}`} aria-hidden />
              <GlowCard className="timeline__card" accent={e.current ? 'green' : 'blue'} phase={i * 0.3} speed={9} tilt={false}>
                <header>
                  <div>
                    <h3>{e.role}</h3>
                    <p>
                      {e.company}
                      {e.location && <span> · {e.location}</span>}
                    </p>
                  </div>
                  {e.period && <span className={`chip ${e.current ? 'chip--live' : ''}`}>{e.period}</span>}
                </header>
                {e.bullets.length > 0 && (
                  <ul>
                    {e.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </GlowCard>
            </Reveal>
          ))}
        </ol>
      ) : (
        <p className="empty">No experience section was found in the CV.</p>
      )}
    </section>
  );
}

export function SkillsSection({ resume }: { resume: Resume }) {
  return (
    <section id="skills" className="panel" aria-labelledby="skills-title">
      <SectionHead eyebrow="Skills" title="What I bring to the table" id="skills-title" />
      {resume.skills.length ? (
        <ul className="skills">
          {resume.skills.map((s, i) => (
            <li key={s} className="skill" style={{ animationDelay: `${i * 40}ms` }}>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty">No skills section was found in the CV.</p>
      )}

      {(resume.interests.length > 0 || resume.languages.length > 0) && (
        <div className="skills__extra">
          {resume.interests.length > 0 && (
            <div id="interests">
              <h3>
                <Icon name="bulb" size={18} /> Research Interests
              </h3>
              <ul className="tags">
                {resume.interests.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {resume.languages.length > 0 && (
            <div>
              <h3>
                <Icon name="globe" size={18} /> Languages
              </h3>
              <ul className="tags">
                {resume.languages.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export function EducationAchievements({ resume }: { resume: Resume }) {
  const awards = [...resume.achievements, ...resume.certifications];
  return (
    <div className="split">
      <section id="education" className="panel" aria-labelledby="education-title">
        <SectionHead eyebrow="Education" title="Academic background" id="education-title" />
        {resume.education.length ? (
          <ul className="list">
            {resume.education.map((e, i) => (
              <Reveal as="li" key={e.degree + i} delay={i * 100}>
                <span className="list__icon list__icon--blue">
                  <Icon name="graduation" size={20} />
                </span>
                <span>
                  <b>{e.degree}</b>
                  <small>{[e.institution, e.year].filter(Boolean).join(' · ') || e.field}</small>
                </span>
              </Reveal>
            ))}
          </ul>
        ) : (
          <p className="empty">No education section was found in the CV.</p>
        )}
      </section>

      <section id="achievements" className="panel" aria-labelledby="achievements-title">
        <SectionHead eyebrow="Achievements" title="Milestones" id="achievements-title" />
        {awards.length ? (
          <ul className="list">
            {awards.map((a, i) => (
              <Reveal as="li" key={a + i} delay={i * 100}>
                <span className="list__icon list__icon--amber">
                  <Icon name="star" size={20} />
                </span>
                <span>
                  <b>{a}</b>
                </span>
              </Reveal>
            ))}
          </ul>
        ) : (
          <p className="empty">Add an “Achievements” or “Certifications” heading to your CV to fill this in.</p>
        )}
      </section>
    </div>
  );
}

export function ContactSection({ resume }: { resume: Resume }) {
  return (
    <section id="contact" aria-labelledby="contact-title">
      <GlowCard className="contact" accent="amber" speed={10} tilt={false}>
        <div className="contact__glow" aria-hidden />
        <div>
          <span className="eyebrow">Contact</span>
          <h2 id="contact-title" className="section-title">
            Let’s build something meaningful together.
          </h2>
          <p className="section-sub">Open to collaborations, research conversations and new opportunities.</p>
        </div>
        <div className="contact__actions">
          {resume.email && (
            <a className="btn btn--primary" href={`mailto:${resume.email}`}>
              <Icon name="mail" size={16} /> {resume.email}
            </a>
          )}
          {resume.phone && (
            <a className="btn btn--ghost" href={`tel:${resume.phone.replace(/[^\d+]/g, '')}`}>
              <Icon name="phone" size={16} /> {resume.phone}
            </a>
          )}
          {resume.links.linkedin && (
            <a className="btn btn--ghost" href={resume.links.linkedin} target="_blank" rel="noreferrer">
              <Icon name="linkedin" size={16} /> LinkedIn
            </a>
          )}
          {resume.links.github && (
            <a className="btn btn--ghost" href={resume.links.github} target="_blank" rel="noreferrer">
              <Icon name="github" size={16} /> GitHub
            </a>
          )}
        </div>
      </GlowCard>
    </section>
  );
}
