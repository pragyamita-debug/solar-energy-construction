/**
 * Tiny perspective helpers used to draw the solar-panel fields procedurally.
 * World: X → right, Y → up, Z → away from the camera.
 */

export interface Camera {
  cx: number; // screen x of the vanishing point
  horizon: number; // screen y of the horizon
  height: number; // camera height above ground (world units)
  focal: number;
  /** rotate the world around (pivotX, pivotZ) so rows run diagonally */
  yaw?: number;
  pivotX?: number;
  pivotZ?: number;
}

type P3 = [number, number, number];

export const project = (c: Camera, [x, y, z]: P3) => {
  if (c.yaw) {
    const px = c.pivotX ?? 0;
    const pz = c.pivotZ ?? 0;
    const dx = x - px;
    const dz = z - pz;
    const cos = Math.cos(c.yaw);
    const sin = Math.sin(c.yaw);
    x = px + dx * cos - dz * sin;
    z = pz + dx * sin + dz * cos;
  }
  z = Math.max(z, 0.05);
  return [c.cx + (x * c.focal) / z, c.horizon + ((c.height - y) * c.focal) / z] as const;
};

const fmt = (n: number) => Math.round(n * 10) / 10;
const pts = (list: (readonly [number, number])[]) => list.map(([x, y]) => `${fmt(x)},${fmt(y)}`).join(' ');

export interface Panel {
  poly: string;
  cells: string;
  legs?: string;
  depth: number;
}

export interface FieldOptions {
  rows: number[]; // Z of each row's front edge
  xFrom: number;
  xTo: number;
  panelWidth?: number;
  gap?: number;
  base?: number; // height of the bottom edge
  rise?: number; // height gained by the top edge
  depth?: number; // how far back the top edge sits
  cols?: number; // cell columns per panel
  viewWidth: number;
}

export function solarField(cam: Camera, o: FieldOptions): Panel[] {
  const { panelWidth = 1, gap = 0.08, base = 0.5, rise = 1.1, depth = 0.9, cols = 3 } = o;
  const panels: Panel[] = [];

  // far rows first so near rows paint on top
  for (const z of [...o.rows].sort((a, b) => b - a)) {
    for (let x = o.xFrom; x < o.xTo; x += panelWidth + gap) {
      const bl = project(cam, [x, base, z]);
      const br = project(cam, [x + panelWidth, base, z]);
      const tr = project(cam, [x + panelWidth, base + rise, z + depth]);
      const tl = project(cam, [x, base + rise, z + depth]);
      if (bl[0] > o.viewWidth + 60 || br[0] < -60 || tl[1] > 2000 || bl[1] < -200) continue;

      const lerp = (a: readonly number[], b: readonly number[], t: number) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
      let cells = '';
      for (let i = 1; i < cols; i++) {
        const a = lerp(bl, br, i / cols);
        const b = lerp(tl, tr, i / cols);
        cells += `M${fmt(a[0])} ${fmt(a[1])}L${fmt(b[0])} ${fmt(b[1])}`;
      }
      const ml = lerp(bl, tl, 0.5);
      const mr = lerp(br, tr, 0.5);
      cells += `M${fmt(ml[0])} ${fmt(ml[1])}L${fmt(mr[0])} ${fmt(mr[1])}`;

      let legs: string | undefined;
      if (z < 14) {
        const g1 = project(cam, [x + 0.15, 0, z + 0.1]);
        const g2 = project(cam, [x + panelWidth - 0.15, 0, z + 0.1]);
        const b1 = lerp(bl, br, 0.15);
        const b2 = lerp(bl, br, 0.85);
        legs = `M${fmt(b1[0])} ${fmt(b1[1])}L${fmt(g1[0])} ${fmt(g1[1])}M${fmt(b2[0])} ${fmt(b2[1])}L${fmt(g2[0])} ${fmt(g2[1])}`;
      }

      panels.push({ poly: pts([bl, br, tr, tl]), cells, legs, depth: z });
    }
  }
  return panels;
}

/** Layered sine "noise" for mountain ridges — deterministic, so SSR/CSR match. */
export function ridge(width: number, height: number, base: number, amp: number, seed: number, step = 16) {
  let d = `M-20 ${height}`;
  for (let x = -20; x <= width + 20; x += step) {
    const n =
      0.5 * Math.sin(x * 0.0042 + seed) +
      0.26 * Math.sin(x * 0.0113 + seed * 1.7) +
      0.14 * Math.sin(x * 0.031 + seed * 3.1) +
      0.07 * Math.sin(x * 0.083 + seed * 5.3) +
      0.03 * Math.sin(x * 0.21 + seed * 7.7);
    d += `L${x} ${fmt(base - amp * (n * 0.5 + 0.5))}`;
  }
  return `${d}L${width + 20} ${height}Z`;
}
