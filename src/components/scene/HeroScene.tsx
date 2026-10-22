import { useId, useMemo } from 'react';
import { ridge, solarField, type Camera } from './geometry';
import './scene.css';

const W = 1200;
const H = 420;
const HORIZON = 255;

const CLOUDS = [
  { x: 640, y: 92, rx: 170, ry: 16, o: 0.5, warm: true },
  { x: 900, y: 70, rx: 220, ry: 20, o: 0.55, warm: true },
  { x: 1080, y: 130, rx: 160, ry: 13, o: 0.45, warm: true },
  { x: 760, y: 160, rx: 240, ry: 12, o: 0.5, warm: true },
  { x: 420, y: 60, rx: 200, ry: 18, o: 0.25, warm: false },
  { x: 260, y: 140, rx: 180, ry: 12, o: 0.2, warm: false },
  { x: 980, y: 200, rx: 200, ry: 8, o: 0.55, warm: true },
  { x: 560, y: 205, rx: 160, ry: 7, o: 0.35, warm: true },
];

// [x, height] of foreground conifers on the left hill
const TREES: [number, number][] = [
  [8, 34], [26, 46], [44, 30], [62, 52], [84, 38], [101, 44], [122, 28], [141, 40], [166, 34], [190, 26],
  [214, 36], [236, 24], [262, 30], [292, 22], [318, 18],
];

const hillY = (x: number) => 284 + 0.0009 * (x - 40) ** 2;
const HILL = `M-20 ${hillY(-20)} ${Array.from({ length: 30 }, (_, i) => {
  const x = -20 + i * 20;
  return `L${x} ${Math.round(hillY(x))}`;
}).join(' ')} L560 440 L-20 440 Z`;

/**
 * Sunset valley with a perspective solar farm — drawn in SVG so it scales crisply
 * and needs no image assets. Layers read CSS vars (--px/--py) for pointer parallax.
 */
export function HeroScene({ sunX = 860 }: { sunX?: number }) {
  const uid = useId().replace(/:/g, '');
  const id = (name: string) => `${uid}-${name}`;

  const { panels, ridges } = useMemo(() => {
    const cam: Camera = { cx: 470, horizon: HORIZON, height: 4.2, focal: 300, yaw: -0.5, pivotX: 0, pivotZ: 2 };
    return {
      panels: solarField(cam, {
        rows: [-6, -3.8, -1.6, 0.6, 2.8, 5, 7.2, 9.4, 11.6, 13.8, 16, 18.2, 20.4],
        xFrom: -2,
        xTo: 60,
        rise: 1.25,
        depth: 1.05,
        base: 0.45,
        gap: 0.06,
        viewWidth: W,
      }),
      ridges: [
        ridge(W, H, HORIZON - 20, 105, 2.4, 6),
        ridge(W, H, HORIZON + 2, 62, 4.2, 5),
        ridge(W, H, HORIZON + 18, 30, 7.9, 4),
      ],
    };
  }, []);

  const panelPolys = panels.map((p) => p.poly);

  return (
    <svg className="scene" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" role="img" aria-label="Sunset over a solar farm in the hills">
      <defs>
        <linearGradient id={id('sky')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b1830" />
          <stop offset="0.32" stopColor="#1c3860" />
          <stop offset="0.52" stopColor="#5a6f93" />
          <stop offset="0.66" stopColor="#d59a6a" />
          <stop offset="0.72" stopColor="#f6c98e" />
        </linearGradient>
        <radialGradient id={id('sun')} cx={sunX} cy={HORIZON - 70} r="360" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff7e3" stopOpacity="1" />
          <stop offset="0.06" stopColor="#ffe0a8" stopOpacity="0.95" />
          <stop offset="0.25" stopColor="#ffb86b" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ff9a4d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id('cloudWarm')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe2bd" />
          <stop offset="1" stopColor="#c7865c" />
        </linearGradient>
        <linearGradient id={id('cloudCool')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9fb3d6" />
          <stop offset="1" stopColor="#4a5f86" />
        </linearGradient>
        <linearGradient id={id('haze')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3c391" stopOpacity="0" />
          <stop offset="0.5" stopColor="#e7b48a" stopOpacity="0.45" />
          <stop offset="1" stopColor="#3a4a6a" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={id('ground')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#24324a" />
          <stop offset="1" stopColor="#0a1220" />
        </linearGradient>
        <linearGradient id={id('panel')} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#06101f" />
          <stop offset="0.55" stopColor="#102a55" />
          <stop offset="1" stopColor="#36599a" />
        </linearGradient>
        <radialGradient id={id('reflect')} cx={sunX} cy={HORIZON + 60} r="380" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffd59a" stopOpacity="0.7" />
          <stop offset="0.35" stopColor="#f0a868" stopOpacity="0.22" />
          <stop offset="1" stopColor="#f0a868" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id('glint')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id={id('panels')}>
          {panelPolys.map((p, i) => (
            <polygon key={i} points={p} />
          ))}
        </clipPath>
        <filter id={id('blur')} x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id={id('soft')}>
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>

      <rect width={W} height={H} fill={`url(#${id('sky')})`} />

      <g className="scene__layer" style={{ ['--depth' as string]: 4 }}>
        <circle className="scene__sun-glow" cx={sunX} cy={HORIZON - 70} r="360" fill={`url(#${id('sun')})`} />
        <circle cx={sunX} cy={HORIZON - 70} r="15" fill="#fffaf0" />
      </g>

      <g className="scene__clouds" filter={`url(#${id('blur')})`}>
        {CLOUDS.map((c, i) => (
          <ellipse
            key={i}
            className="scene__cloud"
            style={{ animationDelay: `${-i * 7}s`, animationDuration: `${60 + i * 9}s` }}
            cx={c.x}
            cy={c.y}
            rx={c.rx}
            ry={c.ry}
            fill={`url(#${id(c.warm ? 'cloudWarm' : 'cloudCool')})`}
            opacity={c.o}
          />
        ))}
      </g>

      <g className="scene__layer" style={{ ['--depth' as string]: 8 }}>
        <path d={ridges[0]} fill="#46577a" opacity="0.75" />
        <rect y={HORIZON - 70} width={W} height="110" fill={`url(#${id('haze')})`} />
        <path d={ridges[1]} fill="#2c3a58" />
        <path d={ridges[2]} fill="#1d2943" />
      </g>

      <g className="scene__layer" style={{ ['--depth' as string]: 16 }}>
        <rect y={HORIZON + 18} width={W} height={H} fill={`url(#${id('ground')})`} />
        <g stroke="#0a1222" strokeWidth="1.2" opacity="0.9">
          {panels.map((p, i) => p.legs && <path key={i} d={p.legs} />)}
        </g>
        <g fill={`url(#${id('panel')})`} stroke="#c9d8f2" strokeOpacity="0.6" strokeWidth="0.6" strokeLinejoin="round">
          {panels.map((p, i) => (
            <polygon key={i} points={p.poly} />
          ))}
        </g>
        <g stroke="#b9cdf0" strokeOpacity="0.22" strokeWidth="0.5" fill="none">
          {panels.map((p, i) => (
            <path key={i} d={p.cells} />
          ))}
        </g>
        <g clipPath={`url(#${id('panels')})`}>
          <rect width={W} height={H} fill={`url(#${id('reflect')})`} style={{ mixBlendMode: 'screen' }} />
          <rect className="scene__glint" x="-300" y="0" width="260" height={H} fill={`url(#${id('glint')})`} transform="skewX(-25)" />
        </g>
      </g>

      <g className="scene__layer" style={{ ['--depth' as string]: 24 }}>
        <path d={HILL} fill="#0c1526" />
        <g fill="#0a1120">
          {TREES.map(([x, h], i) => {
            const y = hillY(x) + 3;
            return <path key={i} d={`M${x} ${y - h} L${x + h * 0.32} ${y + 2} L${x - h * 0.32} ${y + 2} Z`} />;
          })}
        </g>
      </g>

      <g className="scene__sparkles" fill="#fff">
        {[
          [sunX - 40, HORIZON + 50],
          [sunX + 90, HORIZON + 80],
          [sunX - 160, HORIZON + 110],
        ].map(([x, y], i) => (
          <circle key={i} className="scene__sparkle" cx={x} cy={y} r="2" filter={`url(#${id('soft')})`} style={{ animationDelay: `${i * 1.3}s` }} />
        ))}
      </g>
    </svg>
  );
}
