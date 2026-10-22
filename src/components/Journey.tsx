import { useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import type { Resume } from '../lib/types';
import { GlowCard, type Accent } from './GlowCard';
import { Icon, type IconName } from './Icon';
import { Reveal } from './Reveal';
import './Journey.css';

interface Step {
  icon: IconName;
  title: string;
  sub: string;
  tag: string;
}

function buildSteps(r: Resume): Step[] {
  const edu = [...r.education]
    .filter((e) => e.rank >= 2)
    .sort((a, b) => +(a.year ?? 0) - +(b.year ?? 0))
    .map((e) => ({ icon: 'graduation' as const, title: e.short || e.degree, sub: [e.field, e.year].filter(Boolean).join(' · '), tag: 'Learned' }));
  const work = [...r.experience].reverse().map((e) => ({
    icon: 'briefcase' as const,
    title: e.role,
    sub: [e.company, e.period].filter(Boolean).join(' · '),
    tag: e.current ? 'Now' : 'Worked',
  }));
  const goals = r.goals.map((g, i) => ({ icon: (i ? 'rocket' : 'target') as IconName, title: g.value, sub: g.label, tag: 'Next' }));

  // keep the story to 4 beats: earliest learning → most recent work → next goal
  const steps = [...edu.slice(-1), ...work.slice(-2), ...goals.slice(0, 2)];
  return steps.slice(0, 4);
}

const ACCENTS: Accent[] = ['blue', 'teal', 'green', 'purple'];

export function Journey({ resume }: { resume: Resume }) {
  const steps = useMemo(() => buildSteps(resume), [resume]);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused || steps.length < 2) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % steps.length), 2600);
    return () => clearInterval(t);
  }, [reduced, paused, steps.length]);

  if (steps.length < 2) return null;

  // a gentle wave through the middle of every card, like the connector in the reference video
  const n = steps.length;
  const wave = Array.from({ length: n }, (_, i) => {
    const x = ((i + 0.5) / n) * 1000;
    const y = i % 2 ? 62 : 38;
    return { x, y };
  });
  const d = wave.reduce((acc, p, i) => {
    if (i === 0) return `M0 50 C ${p.x / 2} 50, ${p.x / 2} ${p.y}, ${p.x} ${p.y}`;
    const prev = wave[i - 1];
    const mid = (prev.x + p.x) / 2;
    return `${acc} C ${mid} ${prev.y}, ${mid} ${p.y}, ${p.x} ${p.y}`;
  }, '') + ` C ${(wave[n - 1].x + 1000) / 2} ${wave[n - 1].y}, ${(wave[n - 1].x + 1000) / 2} 50, 1000 50`;

  return (
    <section className="panel journey" aria-labelledby="journey-title">
      <Reveal>
        <span className="eyebrow">Journey</span>
        <h2 id="journey-title" className="section-title">
          The path so far — and what’s next
        </h2>
      </Reveal>

      <div className="journey__row" style={{ ['--n' as string]: n }} onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
        <svg className="journey__wire" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden>
          <defs>
            <linearGradient id="journey-light" x1="0" x2="1">
              <stop offset="0" stopColor="#60a5fa" stopOpacity="0" />
              <stop offset="0.5" stopColor="#a78bfa" />
              <stop offset="1" stopColor="#2dd4bf" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={d} className="journey__wire-base" pathLength={100} />
          <path d={d} className="journey__wire-light" stroke="url(#journey-light)" pathLength={100} />
        </svg>

        <ol>
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title + i} delay={i * 120}>
              <GlowCard
                className="journey__step"
                accent={i === active ? 'purple' : ACCENTS[i % ACCENTS.length]}
                active={i === active}
                phase={i * 0.25}
                speed={6}
                onPointerEnter={() => setActive(i)}
              >
                <span className="journey__icon">
                  <Icon name={s.icon} size={20} />
                </span>
                <span className="journey__text">
                  <small>{s.tag}</small>
                  <b>{s.title}</b>
                  <span>{s.sub}</span>
                </span>
                <span className="journey__index">0{i + 1}</span>
              </GlowCard>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
