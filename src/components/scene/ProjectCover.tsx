import { useId, useMemo } from 'react';
import { ridge, solarField, type Camera } from './geometry';
import { GreenScene } from './GreenScene';

/** Mountain valley with a dam and an animated waterfall. */
function Hydro() {
  const uid = useId().replace(/:/g, '');
  const id = (n: string) => `${uid}-${n}`;
  const hills = useMemo(() => [ridge(400, 260, 120, 70, 1.7, 5), ridge(400, 260, 150, 60, 4.4, 4)], []);
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id={id('sky')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7fb6e6" />
          <stop offset="1" stopColor="#d9ecf7" />
        </linearGradient>
        <linearGradient id={id('water')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#bfe3f2" />
        </linearGradient>
        <linearGradient id={id('dam')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8d9590" />
          <stop offset="0.5" stopColor="#c5ccc7" />
          <stop offset="1" stopColor="#7c847f" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#${id('sky')})`} />
      <ellipse cx="90" cy="40" rx="60" ry="12" fill="#fff" opacity="0.7" />
      <ellipse cx="300" cy="30" rx="70" ry="10" fill="#fff" opacity="0.6" />
      <path d={hills[0]} fill="#4f7d58" />
      <path d={hills[1]} fill="#2f5f37" />
      {/* forested slopes */}
      <path d="M0 260 L0 120 C 60 110, 110 120, 140 150 L 150 260 Z" fill="#285a2e" />
      <path d="M400 260 L400 110 C 340 105, 290 120, 260 150 L 250 260 Z" fill="#23522a" />
      <g fill="#1d4723">
        {Array.from({ length: 22 }, (_, i) => (
          <circle key={i} cx={i < 11 ? 8 + i * 12 : 262 + (i - 11) * 13} cy={i < 11 ? 128 + i * 2.6 : 152 - (i - 11) * 3} r={9} />
        ))}
      </g>
      {/* dam wall */}
      <polygon points="138,112 262,112 252,170 148,170" fill={`url(#${id('dam')})`} />
      <rect x="136" y="106" width="128" height="8" fill="#e3e8e5" />
      <g fill="#6f7873">
        {[156, 182, 208, 234].map((x) => (
          <rect key={x} x={x} y="114" width="8" height="10" />
        ))}
      </g>
      {/* waterfall */}
      <g className="falls">
        {[170, 186, 200, 214, 228].map((x, i) => (
          <rect key={x} x={x} y="122" width="10" height="70" fill={`url(#${id('water')})`} opacity={0.75 + (i % 2) * 0.2} style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </g>
      <ellipse cx="200" cy="196" rx="70" ry="14" fill="#f4fbff" opacity="0.85" />
      <path d="M120 260 C 160 210, 240 210, 290 260 Z" fill="#5e98b8" />
      <path d="M150 260 C 180 225, 230 225, 260 260 Z" fill="#7fb6d3" opacity="0.7" />
    </svg>
  );
}

/** Close-up of panel rows under a clear noon sky. */
function SolarRows() {
  const uid = useId().replace(/:/g, '');
  const id = (n: string) => `${uid}-${n}`;
  const panels = useMemo(() => {
    const cam: Camera = { cx: 120, horizon: 120, height: 3.2, focal: 150, yaw: 0.35, pivotX: 0, pivotZ: 0 };
    return solarField(cam, { rows: [2.2, 4.2, 6.2, 8.2, 10.2, 12.2, 14.2], xFrom: 0, xTo: 40, rise: 1.2, depth: 1, base: 0.5, cols: 4, viewWidth: 400 });
  }, []);
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id={id('sky')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3f8fdc" />
          <stop offset="1" stopColor="#cfe6f6" />
        </linearGradient>
        <linearGradient id={id('pv')} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#0f2f63" />
          <stop offset="1" stopColor="#5d8fd6" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#${id('sky')})`} />
      <ellipse cx="300" cy="44" rx="80" ry="16" fill="#fff" opacity="0.85" />
      <ellipse cx="80" cy="70" rx="60" ry="10" fill="#fff" opacity="0.7" />
      <rect y="118" width="400" height="142" fill="#6c9a4e" />
      <rect y="118" width="400" height="6" fill="#86ad62" />
      <g stroke="#2b3a2f" strokeWidth="1">
        {panels.map((p, i) => p.legs && <path key={i} d={p.legs} />)}
      </g>
      <g fill={`url(#${id('pv')})`} stroke="#e1ecfa" strokeWidth="0.7" strokeOpacity="0.85">
        {panels.map((p, i) => (
          <polygon key={i} points={p.poly} />
        ))}
      </g>
      <g stroke="#e8f1fd" strokeOpacity="0.35" strokeWidth="0.5" fill="none">
        {panels.map((p, i) => (
          <path key={i} d={p.cells} />
        ))}
      </g>
    </svg>
  );
}

/** A seedling in soil against soft green bokeh. */
function Sprout() {
  const uid = useId().replace(/:/g, '');
  const id = (n: string) => `${uid}-${n}`;
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <radialGradient id={id('bg')} cx="0.6" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#a9cf7a" />
          <stop offset="0.5" stopColor="#4f7f36" />
          <stop offset="1" stopColor="#1f3a1c" />
        </radialGradient>
        <linearGradient id={id('soil')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a3b22" />
          <stop offset="1" stopColor="#2c1a0e" />
        </linearGradient>
        <linearGradient id={id('leaf')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8fd65d" />
          <stop offset="1" stopColor="#3a8a2c" />
        </linearGradient>
        <filter id={id('bokeh')}>
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <rect width="400" height="260" fill={`url(#${id('bg')})`} />
      <g filter={`url(#${id('bokeh')})`} fill="#e8f7c8">
        {[
          [60, 50, 18, 0.35],
          [330, 40, 24, 0.4],
          [280, 110, 12, 0.3],
          [120, 120, 14, 0.25],
          [360, 160, 16, 0.25],
        ].map(([x, y, r, o], i) => (
          <circle key={i} cx={x} cy={y} r={r} opacity={o} />
        ))}
      </g>
      {/* hands-cupped soil mound */}
      <path d="M70 260 C 90 200, 150 180, 200 180 C 260 180, 320 200, 340 260 Z" fill={`url(#${id('soil')})`} />
      <g fill="#6b4a2d" opacity="0.7">
        {Array.from({ length: 18 }, (_, i) => (
          <circle key={i} cx={110 + ((i * 47) % 190)} cy={196 + ((i * 13) % 50)} r={2 + (i % 3)} />
        ))}
      </g>
      <g className="sprout">
        <path d="M200 186 C 200 160, 198 140, 202 112" stroke="#4c8f34" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M202 140 C 170 140, 140 120, 128 92 C 160 90, 192 108, 202 140 Z" fill={`url(#${id('leaf')})`} />
        <path d="M202 120 C 230 118, 262 96, 272 66 C 238 66, 208 88, 202 120 Z" fill={`url(#${id('leaf')})`} />
        <path d="M202 112 C 196 96, 200 80, 210 70 C 216 84, 212 100, 202 112 Z" fill="#9fe06c" />
        <path d="M140 96 C 165 108, 185 122, 200 138" stroke="#2f6f24" strokeWidth="1.2" fill="none" opacity="0.6" />
        <path d="M268 70 C 245 85, 222 102, 204 118" stroke="#2f6f24" strokeWidth="1.2" fill="none" opacity="0.6" />
      </g>
    </svg>
  );
}

const VARIANTS = [() => <GreenScene sunX={1100} />, Hydro, SolarRows, Sprout];

export function ProjectCover({ index }: { index: number }) {
  const Variant = VARIANTS[index % VARIANTS.length];
  return (
    <div className="cover">
      <Variant />
    </div>
  );
}
