import { useId, useMemo } from 'react';
import { solarField, ridge, type Camera } from './geometry';
import { HeroScene } from './HeroScene';

type Pt = [number, number];

/** Splits a quad (bl, br, tr, tl) into a cols × rows grid of panel polygons. */
function quadGrid([bl, br, tr, tl]: Pt[], cols: number, rows: number, gap = 0.06) {
  const at = (u: number, v: number): Pt => {
    const bx = bl[0] + (br[0] - bl[0]) * u;
    const by = bl[1] + (br[1] - bl[1]) * u;
    const tx = tl[0] + (tr[0] - tl[0]) * u;
    const ty = tl[1] + (tr[1] - tl[1]) * u;
    return [bx + (tx - bx) * v, by + (ty - by) * v];
  };
  const out: string[] = [];
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const u0 = (c + gap) / cols;
      const u1 = (c + 1 - gap) / cols;
      const v0 = (r + gap) / rows;
      const v1 = (r + 1 - gap) / rows;
      out.push([at(u0, v0), at(u1, v0), at(u1, v1), at(u0, v1)].map((p) => p.map((n) => n.toFixed(1)).join(',')).join(' '));
    }
  }
  return out;
}

function House() {
  const uid = useId().replace(/:/g, '');
  const id = (n: string) => `${uid}-${n}`;
  const panels = useMemo(
    () => [
      ...quadGrid([[132, 112], [222, 112], [208, 78], [146, 78]], 5, 3),
      ...quadGrid([[238, 120], [300, 120], [286, 96], [252, 96]], 3, 2),
    ],
    [],
  );
  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id={id('sky')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3f86d8" />
          <stop offset="1" stopColor="#cfe7f7" />
        </linearGradient>
        <linearGradient id={id('pv')} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#0e2a5c" />
          <stop offset="1" stopColor="#4f7cc9" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill={`url(#${id('sky')})`} />
      <circle cx="340" cy="34" r="16" fill="#fff8e0" opacity="0.95" />
      <ellipse cx="90" cy="40" rx="50" ry="8" fill="#fff" opacity="0.55" />
      <ellipse cx="250" cy="28" rx="40" ry="6" fill="#fff" opacity="0.5" />
      {/* trees behind */}
      <g fill="#2f6b3a">
        <circle cx="40" cy="120" r="34" />
        <circle cx="72" cy="104" r="28" />
        <circle cx="352" cy="112" r="34" />
        <circle cx="384" cy="126" r="26" />
      </g>
      <rect y="150" width="400" height="50" fill="#5d9a45" />
      <rect y="150" width="400" height="6" fill="#4b8338" />
      {/* house body */}
      <rect x="128" y="112" width="182" height="44" fill="#efe4d2" />
      <rect x="128" y="112" width="182" height="5" fill="#d4c4ab" />
      {/* roofs */}
      <polygon points="120,114 232,114 214,72 140,72" fill="#3a3f48" />
      <polygon points="230,122 310,122 292,92 248,92" fill="#444a54" />
      <g fill={`url(#${id('pv')})`} stroke="#b9cff0" strokeWidth="0.5" strokeOpacity="0.7">
        {panels.map((p, i) => (
          <polygon key={i} points={p} />
        ))}
      </g>
      {/* windows & door */}
      <g fill="#2a3a52" stroke="#fff" strokeWidth="1.5">
        <rect x="142" y="124" width="22" height="18" />
        <rect x="174" y="124" width="22" height="18" />
        <rect x="246" y="128" width="20" height="16" />
        <rect x="276" y="128" width="20" height="16" />
      </g>
      <rect x="208" y="124" width="18" height="32" fill="#6b4a33" />
      {/* hedge */}
      <g fill="#3f7d33">
        {Array.from({ length: 14 }, (_, i) => (
          <circle key={i} cx={104 + i * 16} cy={160} r={9} />
        ))}
      </g>
      <polygon points="200,200 214,156 222,156 236,200" fill="#cbbfae" opacity="0.8" />
    </svg>
  );
}

function Commercial() {
  const uid = useId().replace(/:/g, '');
  const id = (n: string) => `${uid}-${n}`;
  const { panels, skyline } = useMemo(() => {
    const cam: Camera = { cx: 120, horizon: 30, height: 10, focal: 120, yaw: -0.35, pivotX: 0, pivotZ: 6 };
    return {
      panels: solarField(cam, {
        rows: Array.from({ length: 14 }, (_, i) => 2.5 + i * 1.5),
        xFrom: -8,
        xTo: 40,
        rise: 0.5,
        depth: 1.1,
        base: 0.3,
        cols: 4,
        viewWidth: 400,
      }),
      skyline: ridge(400, 60, 34, 14, 3.3, 5),
    };
  }, []);
  return (
    <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id={id('sky')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5f97d6" />
          <stop offset="1" stopColor="#d6e3ee" />
        </linearGradient>
        <linearGradient id={id('roof')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9aa3b2" />
          <stop offset="1" stopColor="#5d6878" />
        </linearGradient>
        <linearGradient id={id('pv')} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#0c2350" />
          <stop offset="1" stopColor="#4a74c0" />
        </linearGradient>
      </defs>
      <rect width="400" height="200" fill={`url(#${id('sky')})`} />
      <path d={skyline} fill="#8796ab" opacity="0.7" />
      <g fill="#7d8aa0" opacity="0.8">
        <rect x="250" y="8" width="20" height="30" />
        <rect x="276" y="16" width="14" height="22" />
        <rect x="300" y="4" width="18" height="34" />
      </g>
      <polygon points="-10,38 410,30 410,200 -10,200" fill={`url(#${id('roof')})`} />
      <g fill={`url(#${id('pv')})`} stroke="#c6d6f2" strokeWidth="0.45" strokeOpacity="0.8">
        {panels.map((p, i) => (
          <polygon key={i} points={p.poly} />
        ))}
      </g>
      <g stroke="#dfe8f8" strokeOpacity="0.25" strokeWidth="0.35" fill="none">
        {panels.map((p, i) => (
          <path key={i} d={p.cells} />
        ))}
      </g>
      <polygon points="300,200 400,150 400,200" fill="#6b7685" />
    </svg>
  );
}

const VARIANTS = [House, Commercial, () => <HeroScene sunX={980} />];

export function ProjectCover({ index }: { index: number }) {
  const Variant = VARIANTS[index % VARIANTS.length];
  return (
    <div className="cover">
      <Variant />
    </div>
  );
}
