# PureSolar — CV → Dashboard

Upload a CV (PDF, DOCX or TXT) and get an animated, solar-themed portfolio dashboard.
Everything runs in the browser: the file is parsed client-side and never sent to a server.

![flow](https://img.shields.io/badge/flow-upload%20→%20review%20→%20dashboard-3b82f6)

## How it works

1. **Upload** — drag a CV onto the drop zone (or try the bundled sample).
2. **Parse** — text is pulled out of the file and split into sections
   (Profile, Experience, Education, Skills, Projects, Achievements, Goals, Interests, Motto…).
3. **Review** — the designer checks what was found and fixes anything before generating.
4. **Dashboard** — the PureSolar layout only: profile header with quote, four stat cards, About Me
   with goals, Quick Links, Projects carousel and the Solutions row (top skills). Saved to `localStorage`.
   Sidebar links land on the matching card (Experience/Education/Achievements → stat cards,
   Skills → Solutions row, Contact → Quick Links).

## Animations

| Effect | Where | How |
| --- | --- | --- |
| Counting numbers | Stat cards | `useCountUp` — rAF + ease-out-expo, starts when the card scrolls into view; a progress ring fills in step |
| Decoding text | Education stat | `useScramble` — characters settle left to right |
| Moving, lit borders | Every card | `GlowCard` — `@property --angle` animates a conic gradient masked to a 1px ring, plus a blurred halo copy |
| Hover | Cards, chips, links | pointer-follow spotlight + 3D tilt (`usePointerGlow`, CSS vars only — no re-renders) |
| Solutions row | Skills for Every Need | wavy line with a travelling light; the highlighted skill walks along the row (pauses on hover) |
| Headline shimmer, button sheen | Hero, CTAs | CSS gradient sweeps |
| Parallax scene | Hero / upload | procedurally drawn SVG sunset + perspective solar farm, layers follow the pointer |

All motion respects `prefers-reduced-motion`.

## Getting started

```bash
npm install
npm run dev          # local dev server
npm test             # parser unit tests (vitest)
npm run build        # static build in dist/
npm run build:single # one self-contained index.html in dist-single/
```

Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`
(enable **Settings → Pages → Source: GitHub Actions** once).

## Project structure

```
src/
  App.tsx                 stage machine: upload → processing → review → dashboard
  lib/
    extractText.ts        PDF (pdf.js, lazy-loaded) / DOCX (mammoth) / TXT → text
    parseResume.ts        text → Resume (sections, roles, dates, degrees, skills…)
    dates.ts              date-range parsing and overlap-aware experience totals
    storage.ts            safe localStorage wrapper
  hooks/                  useCountUp, useScramble, useInView, usePointerGlow, useScrollSpy
  components/
    GlowCard.tsx          the moving-border card used everywhere
    scene/                SVG hero scene + project covers (no image assets)
    …                     Sidebar, Topbar, Hero, StatCards, Overview, Projects, Solutions
  data/sample-cv.txt      sample CV used by “Try it with a sample CV”
```

## Writing a CV that parses well

- Use clear headings: **Experience**, **Education**, **Skills**, **Projects**, **Achievements**.
- Put dates on the role line or the line after it: `Jan 2023 – Present`, `03/2021 - 06/2023`, `2019 - 2022`.
- Optional extras the dashboard understands: **Goals** (`Goal: …`, `Next Step: …`), **Motto**, **Research Interests**, **Languages**.
- Text-based PDFs only — scanned images have no text to read.
- Single-column layouts parse most reliably; anything off can be corrected in the review step.
