import { useId, useMemo, type CSSProperties } from 'react';
import { ridge, solarField, type Camera } from './geometry';
import './scene.css';

const W = 1200;
const H = 520;
const HORIZON = 330;

interface Turbine {
  x: number;
  base: number; // ground y at the tower foot
  height: number;
  speed: number; // seconds per revolution
}

/** One wind turbine: tapered tower, nacelle and a three-blade rotor that spins. */
function WindTurbine({ x, base, height, speed, id }: Turbine & { id: (n: string) => string }) {
  const hubY = base - height;
  const blade = height * 0.56;
  const w = Math.max(2.2, height * 0.022);
  const bladePath = `M0 0 C ${w * 1.6} ${-blade * 0.08}, ${w * 1.4} ${-blade * 0.55}, ${w * 0.25} ${-blade} L ${-w * 0.25} ${-blade} C ${-w * 0.6} ${-blade * 0.6}, ${-w * 0.9} ${-blade * 0.1}, 0 0 Z`;
  return (
    <g>
      <polygon
        points={`${x - w * 1.3},${base} ${x + w * 1.3},${base} ${x + w * 0.55},${hubY} ${x - w * 0.55},${hubY}`}
        fill={`url(#${id('tower')})`}
      />
      <g
        className="scene__rotor"
        style={{ transformOrigin: `${x}px ${hubY}px`, animationDuration: `${speed}s` } as CSSProperties}
      >
        {[0, 120, 240].map((a) => (
          <path key={a} d={bladePath} transform={`translate(${x} ${hubY}) rotate(${a})`} fill={`url(#${id('blade')})`} />
        ))}
      </g>
      <rect x={x - w * 1.4} y={hubY - w * 1.2} width={w * 3.4} height={w * 2.2} rx={w} fill="#e8eef2" />
      <circle cx={x} cy={hubY} r={w * 1.15} fill="#f7fafc" stroke="#9fb0bd" strokeWidth="0.6" />
    </g>
  );
}

/**
 * Golden-hour valley with wind turbines and a solar farm — drawn in SVG so there are no
 * image assets to host. `variant="wide"` is the hero; "card" frames it for smaller boxes.
 */
export function GreenScene({ sunX = 1080, turbines = true, className = '' }: { sunX?: number; turbines?: boolean; className?: string }) {
  const uid = useId().replace(/:/g, '');
  const id = (name: string) => `${uid}-${name}`;

  const { panels, ridges } = useMemo(() => {
    const cam: Camera = { cx: 640, horizon: HORIZON, height: 5.2, focal: 330, yaw: 0.45, pivotX: 0, pivotZ: 0 };
    return {
      panels: solarField(cam, {
        rows: [2.6, 4.8, 7, 9.2, 11.4, 13.6, 15.8, 18, 20.2, 22.4, 24.6, 26.8, 29],
        xFrom: 9,
        xTo: 75,
        rise: 1.3,
        depth: 1.1,
        base: 0.5,
        gap: 0.05,
        viewWidth: W,
      }),
      ridges: [
        ridge(W, H, HORIZON - 10, 120, 2.1, 6),
        ridge(W, H, HORIZON + 20, 90, 5.4, 5),
        ridge(W, H, HORIZON + 50, 60, 8.3, 4),
      ],
    };
  }, []);

  const TURBINES: Turbine[] = [
    { x: 760, base: 360, height: 250, speed: 9 },
    { x: 620, base: 372, height: 175, speed: 7.5 },
    { x: 520, base: 384, height: 120, speed: 6.2 },
  ];

  return (
    <svg className={`scene ${className}`} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id={id('sky')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a5a86" />
          <stop offset="0.3" stopColor="#5f8fb8" />
          <stop offset="0.52" stopColor="#b9cfdc" />
          <stop offset="0.66" stopColor="#f6d9a6" />
        </linearGradient>
        <radialGradient id={id('sun')} cx={sunX} cy={HORIZON - 95} r="420" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fffbe9" />
          <stop offset="0.05" stopColor="#ffeab5" stopOpacity="0.95" />
          <stop offset="0.22" stopColor="#ffc574" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffb25c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id('cloud')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#f3ece4" />
          <stop offset="1" stopColor="#c9c3c4" />
        </linearGradient>
        <linearGradient id={id('tower')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c9d3da" />
          <stop offset="0.5" stopColor="#f5f8fa" />
          <stop offset="1" stopColor="#aab7c1" />
        </linearGradient>
        <linearGradient id={id('blade')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#dfe6eb" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id={id('hill1')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5f7f88" />
          <stop offset="1" stopColor="#47646b" />
        </linearGradient>
        <linearGradient id={id('hill2')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3e5f4e" />
          <stop offset="1" stopColor="#2b4637" />
        </linearGradient>
        <linearGradient id={id('hill3')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3f6a3a" />
          <stop offset="0.4" stopColor="#2a4a29" />
          <stop offset="1" stopColor="#14241a" />
        </linearGradient>
        <linearGradient id={id('panel')} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#0f2a52" />
          <stop offset="0.6" stopColor="#24508f" />
          <stop offset="1" stopColor="#7ea6d6" />
        </linearGradient>
        <radialGradient id={id('reflect')} cx={sunX - 40} cy={HORIZON + 80} r="420" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffe3ad" stopOpacity="0.5" />
          <stop offset="0.4" stopColor="#f5b26a" stopOpacity="0.15" />
          <stop offset="1" stopColor="#f5b26a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id('glint')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={id('panels')}>
          {panels.map((p, i) => (
            <polygon key={i} points={p.poly} />
          ))}
        </clipPath>
        <filter id={id('blur')} x="-20%" y="-60%" width="140%" height="220%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
        <filter id={id('haze')}>
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      <rect width={W} height={H} fill={`url(#${id('sky')})`} />

      <g className="scene__layer" style={{ ['--depth' as string]: 4 }}>
        <circle className="scene__sun-glow" cx={sunX} cy={HORIZON - 95} r="420" fill={`url(#${id('sun')})`} />
        <circle cx={sunX} cy={HORIZON - 95} r="20" fill="#fffdf4" />
      </g>

      <g filter={`url(#${id('blur')})`}>
        {[
          [560, 70, 150, 26, 0.92],
          [760, 130, 170, 22, 0.88],
          [980, 60, 170, 24, 0.9],
          [930, 200, 210, 14, 0.75],
          [330, 120, 150, 18, 0.6],
          [1130, 150, 110, 18, 0.85],
          [680, 235, 180, 10, 0.65],
        ].map(([x, y, rx, ry, o], i) => (
          // each cloud is a cluster of puffs so the edge reads as cumulus, not a lozenge
          <g key={i} className="scene__cloud" style={{ animationDelay: `${-i * 8}s`, animationDuration: `${70 + i * 10}s` }} opacity={o}>
            {[
              [0, 0, 1, 1],
              [-0.55, 0.35, 0.5, 0.8],
              [0.5, 0.25, 0.55, 0.9],
              [-0.15, -0.6, 0.45, 1.1],
              [0.25, -0.45, 0.35, 0.9],
            ].map(([dx, dy, sx, sy], j) => (
              <ellipse key={j} cx={x + dx * rx} cy={y + dy * ry} rx={rx * sx} ry={ry * sy} fill={`url(#${id('cloud')})`} />
            ))}
          </g>
        ))}
      </g>

      <g className="scene__layer" style={{ ['--depth' as string]: 7 }}>
        <path d={ridges[0]} fill={`url(#${id('hill1')})`} opacity="0.85" filter={`url(#${id('haze')})`} />
        <path d={ridges[1]} fill={`url(#${id('hill2')})`} />
      </g>

      {turbines && (
        <g className="scene__layer" style={{ ['--depth' as string]: 10 }}>
          {TURBINES.map((t) => (
            <WindTurbine key={t.x} {...t} id={id} />
          ))}
        </g>
      )}

      <g className="scene__layer" style={{ ['--depth' as string]: 14 }}>
        <path d={ridges[2]} fill={`url(#${id('hill3')})`} />
        {/* tree line along the near ridge */}
        <g fill="#16291a">
          {Array.from({ length: 46 }, (_, i) => {
            const x = 380 + i * 18 + ((i * 37) % 11);
            const y = HORIZON + 32 + Math.sin(i * 0.7) * 6 + i * 0.4;
            const r = 7 + ((i * 13) % 6);
            return <circle key={i} cx={x} cy={y} r={r} />;
          })}
        </g>
      </g>

      <g className="scene__layer" style={{ ['--depth' as string]: 20 }}>
        <g stroke="#0b1a14" strokeWidth="1.2">
          {panels.map((p, i) => p.legs && <path key={i} d={p.legs} />)}
        </g>
        <g fill={`url(#${id('panel')})`} stroke="#dbe7f5" strokeOpacity="0.75" strokeWidth="0.7" strokeLinejoin="round">
          {panels.map((p, i) => (
            <polygon key={i} points={p.poly} />
          ))}
        </g>
        <g stroke="#e3edf9" strokeOpacity="0.28" strokeWidth="0.5" fill="none">
          {panels.map((p, i) => (
            <path key={i} d={p.cells} />
          ))}
        </g>
        <g clipPath={`url(#${id('panels')})`}>
          <rect width={W} height={H} fill={`url(#${id('reflect')})`} style={{ mixBlendMode: 'screen' }} />
          <rect className="scene__glint" x="-300" y="0" width="260" height={H} fill={`url(#${id('glint')})`} />
        </g>
      </g>
    </svg>
  );
}
