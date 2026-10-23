import { useCountUp } from '../hooks/useCountUp';
import { useInView } from '../hooks/useInView';
import { useScramble } from '../hooks/useScramble';
import type { Resume } from '../lib/types';
import { GlowCard, type Accent } from './GlowCard';
import { Icon, type IconName } from './Icon';
import './StatCards.css';

interface StatProps {
  icon: IconName;
  accent: Accent;
  label: string;
  sub?: string;
  index: number;
  run: boolean;
  /** numeric stats count up; text stats decode */
  value: number | string;
  suffix?: string;
}

// sidebar links land on these cards (the design has no separate Experience/Education/Achievements sections)
const ANCHORS = ['experience', 'education', 'achievements', undefined];

const R = 25;
const CIRC = 2 * Math.PI * R;

function Stat({ icon, accent, label, sub, index, run, value, suffix = '' }: StatProps) {
  const delay = 250 + index * 160;
  const numeric = typeof value === 'number';
  const count = useCountUp(numeric ? value : 1, run, { duration: 1700 + index * 150, delay });
  const text = useScramble(numeric ? '' : value, run && !numeric, { delay });
  const progress = numeric ? (value ? count / value : run ? 1 : 0) : text === value ? 1 : text.length / Math.max(1, value.length) * 0.6;

  return (
    <GlowCard id={ANCHORS[index]} accent={accent} phase={index * 0.23} speed={6.5 + index * 0.6} className="stat">
      <div className="stat__badge">
        <svg viewBox="0 0 60 60" aria-hidden>
          <circle className="stat__track" cx="30" cy="30" r={R} />
          <circle className="stat__meter" cx="30" cy="30" r={R} strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - progress)} />
        </svg>
        <span>
          <Icon name={icon} size={20} />
        </span>
      </div>
      <p className="stat__value" aria-label={`${numeric ? value : value}${suffix}`}>
        <span aria-hidden>
          {numeric ? Math.round(count) : text || ' '}
          {numeric && suffix && <span className={`stat__suffix ${count >= value * 0.98 ? 'is-on' : ''}`}>{suffix}</span>}
        </span>
      </p>
      <p className="stat__label">{label}</p>
      {sub && <p className="stat__sub">{sub}</p>}
    </GlowCard>
  );
}

export function StatCards({ resume }: { resume: Resume }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const { stats } = resume;
  const edu = resume.education[0];
  const hasExperience = resume.experience.length > 0 || stats.years > 0;

  return (
    <div className="stats" ref={ref}>
      {stats.years === 0 && hasExperience ? (
        <Stat index={0} run={inView} icon="briefcase" accent="green" value="<1" label="Year of Experience" />
      ) : (
        <Stat index={0} run={inView} icon="briefcase" accent="green" value={stats.years} suffix={stats.yearsPlus ? '+' : ''} label={stats.years === 1 ? 'Year of Experience' : 'Years of Experience'} />
      )}
      <Stat
        index={1}
        run={inView}
        icon="graduation"
        accent="blue"
        value={edu?.short || '—'}
        label="Education"
        sub={edu ? [edu.field, edu.year].filter(Boolean).join(' | ') : undefined}
      />
      {stats.projects === 0 && resume.experience.length > 0 ? (
        <Stat index={2} run={inView} icon="star" accent="purple" value={resume.experience.length} label={resume.experience.length === 1 ? 'Role Held' : 'Roles Held'} />
      ) : (
        <Stat index={2} run={inView} icon="star" accent="purple" value={stats.projects} suffix={stats.projectsPlus ? '+' : ''} label="Projects Completed" />
      )}
      <Stat index={3} run={inView} icon="user" accent="teal" value={stats.skills} label="Key Skills" />
    </div>
  );
}
