# PureSolar Portfolio

An animated portfolio dashboard in a dark navy solar theme: sidebar navigation, a sunrise-over-solar-panels
hero photo with a glowing rising sun, counting stat cards, About + Quick Links, project cards with photos and
a Solutions row.

**Live site:** https://pragyamita-debug.github.io/solar-energy-construction/ (after Pages is switched on — see below)

## Make it yours

All content lives in one file: **`src/data/profile.ts`**. Change the name, headline, summary,
stats, projects, skills, experience, education, goals and links there and the page updates.
Nothing else needs editing.

- `stats` drives the counting numbers on the four stat cards.
- `motto` is the quote card in the header.
- `photo` is the profile picture (header and top bar). Replace `src/assets/photos/profile.jpg`.
- `quickLinks` fills the Quick Links card; `cvUrl` is the “Download My CV” file (`public/Pragyamita-Saha-CV.pdf`).
- `goals` show beside About Me and in the bell menu.
- The first four `skills` fill the Solutions row; `interests` become its subtitle.
- Projects use the photos in `src/assets/photos/` in turn; give a project its own `image` to override.

### Photos

The photos in `src/assets/photos/` were taken from the design mock-up, so they are small.
For a sharper site, replace them with higher-resolution photos using the same file names
(hero ≈ 2400×860, project photos ≈ 900×460, solutions ≈ 600×600).

To restyle, change the colour tokens at the top of `src/styles/global.css` (`--blue`, `--bg`, …).

## Use this template

1. On GitHub, click **Use this template → Create a new repository** (or fork / download the ZIP).
2. In the new repo go to **Settings → Pages → Build and deployment → Source** and pick **GitHub Actions**.
3. Edit `src/data/profile.ts` and push to `main` (or open **Actions → Deploy to GitHub Pages → Run workflow**).
   The site goes live at `https://<your-user>.github.io/<repo-name>/`.

## Sections

Sidebar (Home, About, Experience, Skills, Projects, Education, Achievements, Contact, Download My CV) and
top bar (search, goals, profile menu) → header photo with name, headline, links and quote → four stat
cards → About Me with goals + Quick Links → Projects → Solutions.

## Animations

| Effect | Where | How |
| --- | --- | --- |
| Rising sun | Header photo, Solutions circle | a warm glow sits on the sun in the photo and swells/lifts; slow light rays turn behind it |
| Light on the panels | Header photo | a band of sunlight sweeps across the panels |
| Counting numbers | Stat cards | `useCountUp` — rAF + ease-out-expo, starts when the cards scroll into view; a ring fills in step |
| Decoding text | Education card | `useScramble` — characters settle left to right |
| Moving, lit borders | Every card | `GlowCard` — `@property --angle` animates a conic gradient masked to a 1px ring, plus a blurred halo |
| Hover | Cards, links | pointer-follow spotlight + 3D tilt (`usePointerGlow`) |
| Solutions row | Skills | a light runs along the line and the highlight walks from skill to skill |
| Parallax + slow zoom | Header photo | the photo drifts with the pointer and zooms gently |

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
  assets/photos/          header, profile, project and solutions photos
  App.tsx                 renders the dashboard from profile.ts
  lib/types.ts            the shape of profile.ts
  hooks/                  useCountUp, useScramble, useInView, usePointerGlow, useScrollSpy
  components/
    Sidebar.tsx, Topbar.tsx
    Hero.tsx              header photo, rising sun, profile, quote
    StatCards.tsx         counting stat cards
    Overview.tsx          About Me + Quick Links
    Projects.tsx          project carousel
    Solutions.tsx         skills row + sun photo
    GlowCard.tsx          the moving-border card used everywhere
  styles/global.css       colour tokens, buttons, shared styles
public/
  Pragyamita-Saha-CV.pdf  the CV behind “Download My CV”
```
