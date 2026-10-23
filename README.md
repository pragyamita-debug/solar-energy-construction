# PureSolar — CV → Portfolio

Upload a CV (PDF, DOCX or TXT) and get an animated portfolio in a green, renewable-energy theme
(dark forest background, leaf-green accents, daylight wind-and-solar scenes).
Everything runs in the browser: the file is parsed client-side and never sent to a server.

![flow](https://img.shields.io/badge/flow-upload%20→%20review%20→%20dashboard-3b82f6)

## How it works

1. **Upload** — drag a CV onto the drop zone (or try the bundled sample).
2. **Parse** — text is pulled out of the file and split into sections
   (Profile, Experience, Education, Skills, Projects, Achievements, Goals, Interests, Motto…).
3. **Review** — the designer checks what was found and fixes anything before generating.
4. **Portfolio** — top navigation (Home, Projects, Skills, Experience, About), hero with
   “Hi, I’m …” and the role in green, a counting stat strip, light project cards, a skills strip,
   Experience & Education cards and an About section with goals. Saved to `localStorage`.
   The gear button in the nav uploads a new CV, edits details, adds a photo or downloads the CV.

## Animations

| Effect | Where | How |
| --- | --- | --- |
| Counting numbers | Stat strip | `useCountUp` — rAF + ease-out-expo, starts when the strip scrolls into view |
| Decoding text | Education in the stat strip | `useScramble` — characters settle left to right |
| Moving, lit borders | Every card | `GlowCard` — `@property --angle` animates a conic gradient masked to a 1px ring, plus a blurred halo copy |
| Hover | Cards, chips, skills | pointer-follow spotlight + 3D tilt (`usePointerGlow`, CSS vars only — no re-renders) |
| Spinning turbines, waterfall, swaying sprout | Hero, project covers | SVG scenes animated with CSS |
| Timeline light | Experience card | a light runs down the timeline; the current role pulses |
| Role shimmer, button sheen | Hero, buttons | CSS gradient sweeps |
| Parallax scene | Hero / upload | procedurally drawn golden-hour valley, wind turbines and a perspective solar farm; layers follow the pointer |

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
    scene/                GreenScene (hero) + ProjectCover variants — drawn in SVG, no image assets
    …                     NavBar, Hero (+ stat strip), Sections (projects, skills, experience, about)
  data/sample-cv.txt      sample CV used by “Try it with a sample CV”
```

## Writing a CV that parses well

- Use clear headings: **Experience**, **Education**, **Skills**, **Projects**, **Achievements**.
- Put dates on the role line or the line after it: `Jan 2023 – Present`, `03/2021 - 06/2023`, `2019 - 2022`.
- Optional extras the dashboard understands: **Goals** (`Goal: …`, `Next Step: …`), **Motto**, **Research Interests**, **Languages**.
- Text-based PDFs only — scanned images have no text to read.
- Single-column layouts parse most reliably; anything off can be corrected in the review step.
