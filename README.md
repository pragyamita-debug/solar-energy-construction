# PureSolar Portfolio

An animated portfolio dashboard in a green, renewable-energy theme: dark forest background,
leaf-green accents and daylight wind-and-solar scenes drawn in SVG (no image files to host).

**Live site:** https://pragyamita-debug.github.io/solar-energy-construction/ (after Pages is switched on — see below)

## Make it yours

All content lives in one file: **`src/data/profile.ts`**. Change the name, headline, summary,
stats, projects, skills, experience, education, goals and links there and the page updates.
Nothing else needs editing.

- `stats` drives the counting numbers in the strip under the hero.
- `motto` becomes the About heading; leave it out to use “Let’s build something meaningful”.
- `photo` (optional) replaces the About illustration — put the image in `public/` and set `photo: 'me.jpg'`.
- The first six `skills` go in the skills strip; the rest (and `interests`) show as chips.

To restyle, change the colour tokens at the top of `src/styles/global.css` (`--accent`, `--bg`, …).

## Use this template

1. On GitHub, click **Use this template → Create a new repository** (or fork / download the ZIP).
2. In the new repo go to **Settings → Pages → Build and deployment → Source** and pick **GitHub Actions**.
3. Edit `src/data/profile.ts` and push to `main` (or open **Actions → Deploy to GitHub Pages → Run workflow**).
   The site goes live at `https://<your-user>.github.io/<repo-name>/`.

## Sections

Top navigation (Home, Projects, Skills, Experience, About) → hero with “Hi, I’m …” and the role in
green → stat strip → project cards → skills strip → Experience & Education → About with goals → footer.

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
| Parallax scene | Hero | golden-hour valley, wind turbines and a perspective solar farm; layers follow the pointer |

All motion respects `prefers-reduced-motion`.

## Getting started

```bash
npm install
npm run dev          # local dev server
npm run build        # static build in dist/
npm run build:single # one self-contained index.html in dist-single/
```

## Project structure

```
src/
  data/profile.ts         ← all page content
  App.tsx                 renders the dashboard from profile.ts
  lib/types.ts            the shape of profile.ts
  hooks/                  useCountUp, useScramble, useInView, usePointerGlow, useScrollSpy
  components/
    NavBar.tsx            sticky top navigation with scroll-spy underline
    Hero.tsx              hero + counting stat strip
    Sections.tsx          projects, skills, experience & education, about, footer
    GlowCard.tsx          the moving-border card used everywhere
    scene/                GreenScene (hero) + ProjectCover variants — drawn in SVG
  styles/global.css       colour tokens, buttons, shared styles
```
