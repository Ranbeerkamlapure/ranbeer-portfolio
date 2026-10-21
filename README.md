# Ranbeer Kamlapure — Portfolio

Personal portfolio of **Ranbeer Kamlapure**, a full-stack developer focused on backend systems, practical web applications, and clear engineering storytelling.

**Live portfolio:** [https://ranbeer-portfolio.vercel.app/](https://ranbeer-portfolio.vercel.app/)

---

## CHROME / CONSCIOUSNESS

The site is built around a single design idea: **CHROME / CONSCIOUSNESS** — polished technical surfaces with a deliberate narrative underneath.

Sections follow a story arc rather than a generic template:

| Section | Intent |
| --- | --- |
| Signal | Introduction and identity |
| About | Background and focus |
| Mind | How I learn and build |
| Craft | Skills by how I use them |
| Projects | Evidence through real work |
| Evolution | Education, milestones, credentials |
| Contact | Next conversation |

The visual system stays near-black and minimal, with a subtle technical grid, charcoal grain, chrome accents, and restrained ice highlights.

---

## Features

- Single-page React portfolio with section-based navigation
- Boot loader into a staged hero entrance
- GSAP ScrollTrigger storytelling across sections
- Framer Motion hover and interaction feedback
- Lenis smooth scrolling (respects reduced-motion preferences)
- Lazy-loaded Three.js chrome accent in the hero
- Anime.js-assisted headline reveal
- Responsive layout for desktop and mobile
- Content centralized in `src/data/content.js`

---

## Tech stack

- **Core:** Vite · React · JavaScript · Tailwind CSS v4
- **Motion:** GSAP + ScrollTrigger · Framer Motion · Lenis · Anime.js
- **3D:** Three.js · React Three Fiber · Drei
- **UI:** Lucide React

---

## Project structure

```text
src/
  components/          # Shared UI (Nav, Loader, ChromeScene, …)
  components/sections/ # Signal, About, Mind, Craft, Projects, Evolution, Contact
  data/content.js      # Profile, skills, projects, education
  hooks/               # Lenis, intro, scroll story, reduced motion
  motion/              # Timeline helpers, tokens, text split utilities
  App.jsx
  index.css
public/                # Images, favicon, llms.txt
```

---

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Dev server: [http://127.0.0.1:4327](http://127.0.0.1:4327)

```bash
npm run build    # production build → dist/
npm run preview  # preview build on port 4328
```

---

## Author

**Ranbeer Kamlapure**  
Full-Stack Developer · Backend-Focused

- Portfolio: [ranbeer-portfolio.vercel.app](https://ranbeer-portfolio.vercel.app/)
- GitHub: [github.com/Ranbeerkamlapure](https://github.com/Ranbeerkamlapure)
- This repo: [ranbeer-portfolio](https://github.com/Ranbeerkamlapure/ranbeer-portfolio)
