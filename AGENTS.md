# AGENTS.md — Ranbeer Kamlapure Portfolio

## 1. Mission and operating context

This repository contains an **existing personal developer portfolio** for Ranbeer Kamlapure. It is a live, single-page React application built with Vite. Your role is to maintain and improve the existing product—not to replace it with a new portfolio, starter template, generic landing page, or unrelated visual concept.

- Live site: https://ranbeer-portfolio.vercel.app/
- Repository: https://github.com/Ranbeerkamlapure/ranbeer-portfolio
- Primary design concept: **CHROME / CONSCIOUSNESS**
- Primary implementation language: JavaScript (ES modules and JSX)
- Styling: Tailwind CSS v4 and the repository's existing CSS
- Build tool: Vite

### Non-negotiable priority order

When making decisions, prioritize:

1. Preserve existing working behavior and the user's explicit requirements.
2. Preserve the established visual identity, content integrity, and section narrative.
3. Make the smallest maintainable change that fully solves the requested problem.
4. Protect accessibility, responsive behavior, performance, and reliability.
5. Add visual or technical complexity only when it has a clear, demonstrated purpose.

Do not interpret a request for improvement as permission to redesign the whole site.

## 2. Repository discovery before implementation

This is an established codebase. **Inspect before editing.** Never assume that the README, an earlier task, or your memory describes the current working tree accurately.

At the start of a task:

1. Confirm the repository root and current working directory.
2. Inspect `git status --short --branch` and the relevant recent diff before touching files. Treat pre-existing user changes as user-owned; do not reset, stash, overwrite, or reformat them.
3. Read `package.json` and the lockfile that is actually present. Use the package manager evidenced by the repository. The currently documented setup uses npm.
4. Inspect the relevant implementation, imports, shared components, hooks, motion utilities, styles, data modules, assets, and existing comments before proposing a change.
5. Trace the behavior end-to-end where needed: entry point → app composition → component/section → hook or utility → styling/data/assets.
6. Search for existing implementations before creating a new component, hook, utility, animation, token, or dependency.
7. Check whether the target behavior already exists in another form and whether the requested change could break section navigation, scroll timing, loader sequencing, deep links, reduced-motion behavior, or mobile layout.
8. Base repository-specific commands, paths, and conventions on files present in the current checkout. If the checkout differs from the public README or this guide, trust the current checkout and report the discrepancy when material.

For a small, localized change, inspect the relevant slice rather than mechanically reading every file. For cross-cutting changes, inspect all affected integration points before editing.

### Known repository shape (verify before relying on it)

The public project README describes this structure:

```text
src/
  components/           # Shared UI (Nav, Loader, ChromeScene, ...)
  components/sections/  # Hero, About, Mind, Craft/Skills, Projects, Evolution, Contact
  data/content.js       # Profile, skills, projects, education and related content
  hooks/                # Lenis, intro, scroll story, reduced-motion behavior
  motion/               # Timeline helpers, tokens, text-splitting utilities
  App.jsx
  index.css
public/                  # Static assets, favicon, llms.txt and other public files
```

The current public `package.json` declares these scripts:

| Script | Current command | Purpose |
|---|---|---|
| `dev` | `vite --port 4327 --host 0.0.0.0` | Local development |
| `build` | `vite build` | Production build |
| `lint` | `oxlint` | Lint the project |
| `preview` | `vite preview --port 4328` | Preview the production build |

Run scripts through the package manager and script names, for example `npm run build`, rather than duplicating their underlying commands. Confirm the current manifest before execution because scripts can change.

The public manifest currently lists React, React DOM, Vite, Tailwind CSS v4, `@tailwindcss/vite`, GSAP, Framer Motion, Lenis, Three.js, React Three Fiber, Drei, Anime.js, and Lucide React. This list is context, not permission to use every library in every component.

Do not assume that a test runner, type checker, formatter, router, state library, or end-to-end framework exists. Check the manifest and repository before recommending or invoking one. The currently documented scripts do not include a test script.

## 3. Product identity and art direction

### CHROME / CONSCIOUSNESS

The portfolio should remain futuristic, cinematic, experimental, sophisticated, and professionally art-directed. It should communicate technical confidence and an intentional personal narrative—not look like a generic developer template or a showcase of unrelated effects.

The existing visual language is based on:

- Near-black / void backgrounds, graphite and charcoal surfaces.
- Chrome, silver, and restrained ice highlights.
- A subtle technical grid and restrained grain/noise texture.
- Editorial typography, deliberate hierarchy, whitespace, and composition.
- Controlled contrast and purposeful use of color.
- A polished, technical atmosphere with a human narrative beneath it.

The current public stylesheet defines tokens including `void`, `graphite`, `slate`, `soft`, `silver`, `chrome`, `ice`, and `electric`, plus display, body, and mono font families. Inspect the current `src/index.css` and existing component styles before changing these values. Extend the established token system rather than creating competing palettes or one-off values.

The user's broader inspiration includes futuristic metallic editorial graphics, black-and-white halftone photography, electric violet and cobalt accents, chaotic lines resolving into structured networks, experimental typography, pixelated compositions, cinematic lighting, and subtle film grain. Treat these as optional art-direction references—not a checklist of effects to add. The existing live design is the baseline. A new treatment must fit the composition and be explicitly relevant to the task.

### Visual decision rules

- Typography, composition, hierarchy, spacing, contrast, and image treatment should do most of the expressive work.
- Prefer subtle transitions, considered scroll reveals, restrained parallax, elegant hover feedback, and purposeful motion.
- Use negative space and stillness intentionally. A quiet area is not a defect that needs animation.
- Keep visual effects legible and subordinate to content.
- Maintain consistency across sections; do not give each section a disconnected art direction.
- Do not introduce violet, cobalt, gradients, glow, chrome reflections, halftone, pixelation, or grain indiscriminately. Use only where they strengthen the existing system.
- Do not copy another site's layout, code, assets, or distinctive composition. Inspiration is directional, not a mandate to clone.
- Do not replace established typography, spacing, navigation, section order, or layout as collateral damage from a local feature request.

### Explicit visual prohibitions

Unless the user specifically requests a particular element and approves its role, do **not** add:

- Floating spheres, cubes, rings, blobs, or generic 3D primitives.
- Random particle fields, starfields, ambient dots, or decorative confetti.
- Unmotivated WebGL scenes, shader backgrounds, or extra Three.js canvases.
- Animated noise, flashing elements, constant pulsing, excessive cursor effects, or perpetual motion.
- Decorative dashboards, fake terminal panels, fake code windows, or invented technical readouts.
- Unnecessary scroll hijacking, pinned sections, horizontal scrolling, or dramatic transitions.
- Effects whose only purpose is to make the page appear busier or more “ futuristic.”

An existing purposeful 3D accent is not permission to add more. Reuse or refine an existing scene only when the task genuinely concerns it.

## 4. Existing narrative and information architecture

The README describes a single-page story arc with these sections:

1. **Signal** — introduction and identity.
2. **About** — background and focus.
3. **Mind** — learning and building approach.
4. **Craft** — skills and how they are used.
5. **Projects** — evidence through real work.
6. **Evolution** — education, milestones, and credentials.
7. **Contact** — next conversation.

The current `App.jsx` composes a loader, navigation, and the Hero, About, Mind, Skills, Projects, Evolution, and Contact sections. Preserve the actual section IDs, navigation mapping, ordering, anchor behavior, and cross-section relationships unless a user-approved task requires a change.

The current app also has behavior involving:
- A boot/loader sequence and staged hero entrance.
- Lenis smooth scrolling.
- GSAP ScrollTrigger storytelling.
- Framer Motion interaction feedback.
- Anime.js-assisted headline reveal.
- A lazy-loaded Three.js chrome accent in the hero.
- Deep-link/hash scrolling after the app is ready.
- Reduced-motion preference handling.

These are existing behaviors to understand and preserve, not instructions to add more effects. When changing one, inspect its setup, cleanup, timing, ownership, and interactions with the other systems.

## 5. Content integrity and featured projects

Treat portfolio content as factual personal information. Never fabricate project capabilities, user counts, performance metrics, awards, dates, technologies, testimonials, links, screenshots, or completion status.

The user has specified that the portfolio should showcase these two projects:

### Orbit
- Description supplied by the user: **Full-Stack Property Listing Platform**.
- Treat this as a required featured project.
- Verify implementation details, repository/demo URLs, screenshots, current status, and exact technologies from available project evidence before publishing claims beyond the supplied description.

### Samjhao
- Description supplied by the user: **AI-Powered Multilingual Document Explainer**.
- Live demo supplied by the user: https://samjhao-five.vercel.app/
- Stack/context supplied by the user: React, Node.js, Express.js, MongoDB Atlas, Gemini API, JWT, and bcrypt.js.
- Do not claim features, language coverage, document formats, accuracy, security properties, deployment architecture, or usage metrics unless verified from project evidence or explicitly supplied by the user.

### Important existing-content discrepancy — resolve carefully

The public version of `src/data/content.js` inspected while preparing these instructions currently lists Orbit, Quora REST API, Solace, and Lost & Found Portal. Its Orbit entry says ongoing and currently has no verified GitHub/demo URL. It does **not** currently list Samjhao in that public snapshot. The user’s requested two-project presentation (Orbit and Samjhao) therefore differs from the currently inspected public data.

When a task touches project content or the Projects section:

1. Inspect the current local `src/data/content.js` and Projects component; do not assume the public snapshot is still current.
2. Treat the user's explicit desired featured-project lineup as the target direction: Orbit and Samjhao.
3. Do not silently erase existing project records, overwrite work in progress, or remove a project that may still be needed elsewhere.
4. Determine whether the requested outcome is to replace the displayed featured list, change ordering, or remove old project data. If the requested scope is unclear and the distinction affects visible content or data retention, ask one focused question before destructive edits.
5. Keep project metadata centralized in the existing data module if that remains the established architecture.
6. Use the supplied Samjhao live URL exactly as given. Verify it before making claims about its current availability; do not invent a GitHub URL.
7. Keep Orbit's status and links honest. Do not invent a live demo or repository URL.
8. If a project is unfinished, label it accurately rather than presenting planned functionality as shipped.

The public content module is the established content source according to the README. Prefer updating that source over hardcoding duplicate project copy in JSX, unless the current implementation has intentionally changed.

## 6. Personal portrait and image integrity

The portfolio owner's real photograph is identity-bearing content. Preserve the actual source photograph and the person's recognizable identity.

**Never**:
- Replace the owner's photograph with an AI-generated person, stock portrait, synthetic face, or another person's image.
- Alter facial structure, eyes, nose, lips, jawline, facial proportions, or hairstyle.
- Use face swapping, generative face replacement, beauty filters, or identity-changing retouching.
- Crop so aggressively that the portrait becomes misleading or removes important identity context without approval.
- Treat an image-generation request as permission to synthesize a replacement portrait.

Permitted creative treatments, provided identity remains unchanged:
- Monochrome conversion.
- Halftone or dithering overlays.
- Film grain and subtle texture.
- Cinematic contrast and tonal grading.
- Restrained colored lighting or color overlays that do not reshape or replace facial features.

Prefer non-destructive CSS, SVG, canvas, or image-processing treatments that preserve the original asset. Keep the original source file intact. If an image edit cannot reliably preserve identity, do not perform it; explain the limitation and propose a non-destructive alternative.

## 7. Resume download contract

The latest resume is intended to be located at:

`public/Ranbeer_Kamlapure_Resume.pdf`

The portfolio must have a functional **Download Resume** action that downloads the actual PDF with the original filename `Ranbeer_Kamlapure_Resume.pdf`.

When implementing, repairing, or reviewing this feature:

1. Check whether the PDF actually exists at the expected path in the current checkout. Do not create a fake, empty, placeholder, or regenerated resume.
2. Inspect the current button/link implementation and preserve its visual design and placement unless the task asks otherwise.
3. Use a browser-native download link or equivalent simple mechanism appropriate to Vite's public asset handling. Do not add a library for a basic PDF download.
4. Ensure the public URL resolves to the actual file (normally `/Ranbeer_Kamlapure_Resume.pdf` for a file at the root of `public/`).
5. Ensure the download filename remains exactly `Ranbeer_Kamlapure_Resume.pdf`.
6. Do not open the PDF in a new tab when the requested behavior is download, unless a browser limitation requires a documented fallback.
7. If the file is missing, report that the source PDF must be supplied. Do not claim the feature works until the real file is present and the URL/download behavior has been verified.

Do not rename, rewrite, compress, or modify the resume PDF unless explicitly requested.

## 8. React and JavaScript implementation standards

- Follow the repository's existing JavaScript/JSX conventions. Do not migrate to TypeScript or introduce a new architectural pattern without explicit approval.
- Prefer small, focused function components and hooks consistent with the current code.
- Keep components cohesive and avoid unnecessary abstraction.
- Reuse existing shared components, hooks, utilities, data structures, and motion helpers.
- Keep content separate from presentation when the current data-driven pattern supports it.
- Use stable, meaningful React keys for rendered collections.
- Keep effects correct: include dependencies, clean up listeners/observers/timelines, and avoid stale closures.
- Avoid unnecessary state, derived state duplication, prop drilling introduced by a local change, and premature memoization.
- Do not use `useMemo`, `useCallback`, or `memo` by default; use them when there is a measured or clear correctness/performance reason.
- Avoid direct DOM mutation in React components unless it is required by an existing animation integration. If required, isolate it and clean it up correctly.
- Do not introduce global event listeners, observers, animation loops, or scroll handlers without cleanup.
- Avoid `!important`, arbitrary inline styles, and duplicated CSS rules as quick fixes. Follow the existing Tailwind/CSS token approach.
- Preserve semantic HTML and meaningful component boundaries.
- Do not add a new router, state manager, UI framework, icon library, animation library, or utility dependency when the current stack can solve the task.

## 9. Styling and Tailwind CSS v4

- This project uses Tailwind CSS v4. Inspect the installed version and current Vite/Tailwind integration before changing configuration.
- Follow the existing CSS-first Tailwind v4 setup and `@theme` conventions. Do not copy Tailwind v3 configuration patterns into this project without verifying compatibility and necessity.
- Reuse existing design tokens and utility patterns.
- Prefer responsive utility classes and existing component styling conventions over new global CSS.
- Put truly global tokens, resets, typography, and shared effects in the existing global stylesheet only when appropriate.
- Avoid scattered one-off colors, arbitrary z-index values, duplicated breakpoints, and conflicting font declarations.
- Verify hover, focus, active, disabled, and reduced-motion states—not only the default desktop appearance.
- Do not remove existing atmosphere layers, focus styling, section spacing, or boot-state CSS without understanding their role.

## 10. Motion, scrolling, and 3D governance

This repository already includes multiple motion systems. More animation libraries or overlapping animation ownership create risk.

### Reuse before adding

Before implementing motion, inspect the existing hooks and utilities and choose the system already responsible for that interaction:

- **GSAP / ScrollTrigger:** existing section storytelling and coordinated scroll timelines.
- **Framer Motion:** component-level interaction and hover feedback where already used.
- **Lenis:** existing smooth-scroll behavior and scroll integration.
- **Anime.js:** existing headline/text reveal usage.
- **Three.js / React Three Fiber / Drei:** existing intentional 3D accent only where justified.

Do not make two libraries animate the same element or property at the same time. Avoid competing transforms, opacity, filters, or scroll positions.

### Motion quality bar

Every animation must have a clear purpose, such as revealing hierarchy, communicating state, guiding attention, or reinforcing a transition. It must not delay access to content or make the interface harder to use.

- Favor short, restrained, polished transitions over long spectacle.
- Prefer opacity and transform for lightweight UI motion where appropriate.
- Avoid layout-thrashing animation of dimensions or positional properties when a transform can achieve the same effect.
- Avoid perpetual animation when the element is not conveying changing information.
- Keep scroll-triggered effects predictable and reversible when scrolling backward.
- Ensure timelines, ScrollTriggers, observers, RAF loops, and listeners are cleaned up on unmount and rebuilt safely.
- Avoid pinning or scroll hijacking unless already essential to the design and explicitly in scope.
- Do not add particles, spheres, cubes, random 3D objects, or extra canvases as generic decoration.
- Do not add a 3D effect simply because Three.js is installed.

### Reduced motion

Respect `prefers-reduced-motion`. Inspect and reuse the existing reduced-motion hook and integration. When reduced motion is requested:

- Disable or substantially simplify non-essential movement.
- Do not make core content dependent on an animation completing.
- Keep navigation, loader completion, and section visibility functional.
- Avoid smooth-scroll behavior that conflicts with the reduced-motion preference.
- Ensure content does not remain hidden because an animation was skipped.

## 11. Performance, accessibility, and responsive behavior

These are release requirements, not optional polish.

### Performance

- Preserve existing lazy loading for expensive visual assets and 3D code.
- Do not eagerly load heavy 3D modules or large media when they are not needed.
- Avoid adding large images, fonts, packages, or animation assets without a clear benefit.
- Optimize image dimensions and formats when modifying image assets; preserve the original source when required.
- Avoid unnecessary React renders, repeated calculations, duplicate event handlers, and expensive scroll work.
- Keep WebGL work bounded; avoid multiple render loops or canvases for decorative effects.
- Do not add code splitting or manual chunk configuration without evidence that it improves this build.
- Investigate bundle/build warnings introduced by a change rather than suppressing them blindly.

### Accessibility

- Use semantic landmarks, headings, links, and buttons.
- Ensure all interactive functionality is keyboard accessible.
- Preserve visible focus indicators; do not remove outlines without an accessible replacement.
- Give meaningful images useful alternative text; decorative imagery should not create noisy screen-reader output.
- Provide accessible names for icon-only controls.
- Maintain readable contrast and avoid conveying information by color alone.
- Ensure hover interactions have keyboard-equivalent behavior.
- Respect reduced motion and avoid flashing or rapidly oscillating content.
- Ensure loader or animation states do not trap keyboard or screen-reader users or permanently hide the page.

### Responsive behavior

- Preserve the existing mobile-first/responsive behavior across phone, tablet, laptop, and wide desktop widths.
- Inspect the affected section at narrow widths as well as desktop.
- Prevent horizontal overflow, clipped text, overlapping navigation, unusable touch targets, and oversized typography.
- Do not simply scale down desktop compositions; adapt layout and interaction to touch and limited viewport space.
- Avoid hover-only affordances on touch devices.
- Check portrait and image crops at different aspect ratios.
- Do not sacrifice mobile performance for desktop-only effects.

## 12. Dependencies and package management

- Avoid new dependencies. Prefer existing platform APIs and installed packages.
- Before proposing a dependency, explain why existing code or installed libraries are insufficient.
- Ask for explicit approval before adding a production dependency or replacing a core library.
- Never install a package merely to solve a trivial helper, CSS effect, icon, or download link.
- Use the package manager indicated by the current lockfile and project configuration. The public README currently documents npm; verify the local checkout.
- Keep `package.json` and its matching lockfile synchronized when a dependency change is approved.
- Do not casually upgrade React, Vite, Tailwind, GSAP, Three.js, or other core dependencies as part of an unrelated feature.
- Do not change Node version requirements or deployment settings without repository evidence and explicit need.
- Never add secrets, API keys, tokens, credentials, or private environment files to source control.

## 13. Security and external integrations

- Do not expose private API keys or secrets in frontend source. Vite variables prefixed with `VITE_` are client-visible and must never contain secrets.
- Do not invent a backend service or environment variable for this static portfolio.
- Validate and safely render any user-controlled or externally sourced content.
- Use safe link attributes when opening external links in a new browsing context.
- Do not add tracking, analytics, telemetry, cookies, or external embeds unless requested and their privacy implications are clear.
- Do not log private user data or secrets.
- Do not claim that JWT, bcrypt, MongoDB Atlas, or Gemini API are used by the portfolio itself merely because they appear in the Samjhao project stack.

## 14. Git safety and change scope

- Do not make unrelated changes.
- Do not delete existing sections, features, assets, content, or working behavior without explicit approval.
- Do not reset, clean, stash, amend, rebase, force-push, or rewrite user history unless explicitly requested.
- Do not overwrite user modifications or generated files without inspecting their ownership and purpose.
- Keep changes narrowly scoped to the requested outcome.
- Before substantial changes, inspect and summarize the relevant diff and explain the proposed approach, affected files, risks, and expected behavior. **Wait for approval before proceeding with a major redesign, broad refactor, dependency change, removal of a feature, or other high-impact change.**
- For routine, low-risk, localized fixes, proceed without unnecessary approval after discovery.
- Prefer incremental edits over rewriting entire components or stylesheets.
- Preserve useful comments and document non-obvious constraints when adding code.
- Do not reformat unrelated files or perform drive-by cleanup.
- After implementation, inspect `git diff` and `git status` to confirm the change stayed within scope.

## 15. Validation and verification workflow

After implementation:

1. Review the complete diff, not only the final edited lines.
2. Run `git diff --check`.
3. Run the repository lint script (`npm run lint`) when code changes warrant it and the script is available.
4. Run the production build (`npm run build`) after implementation, as required for this project. Do not skip it merely because the change appears visual or small.
5. Fix errors and warnings introduced by the modification. Do not hide failures by weakening lint/build configuration.
6. If the build fails because of an unrelated pre-existing issue, identify it clearly and distinguish it from regressions caused by the change.
7. If a test suite exists in the current checkout, run the relevant tests. Do not invent a test command or claim tests passed when no test script/framework exists.
8. For UI changes, verify the affected page/section in a browser when a browser is available. Check desktop and mobile layouts, interaction states, console errors, and network failures relevant to the change.
9. For motion changes, verify forward/backward scroll behavior, unmount cleanup, loader/intro coordination, and reduced-motion behavior.
10. For resume changes, verify the real PDF path, response, and downloaded filename.
11. For content/link changes, verify destinations and factual claims against available evidence.
12. Report exactly which checks were run and their actual results. Never claim a visual/browser check that was not performed.

Do not run destructive commands or modify deployment/production state as part of validation without explicit approval.

## 16. Working with project data and links

- Keep personal details, project metadata, skills, education, credentials, and navigation data consistent with the established content module where appropriate.
- Do not invent statistics, skill levels, project outcomes, client names, testimonials, certifications, dates, or external links.
- Preserve supplied URLs exactly unless a verified correction is explicitly requested.
- Check for whitespace errors and malformed URLs in existing content when touching it, but do not silently change unrelated records.
- Do not publish private contact information beyond what the user has intentionally included in the portfolio.
- If a fact is uncertain, either omit it, label it accurately as unverified/in progress, or ask the user.

## 17. Task execution protocol

Use this protocol for feature work and meaningful fixes:

### A. Understand
- Restate the requested outcome briefly.
- Inspect repository state and the relevant implementation.
- Identify existing behavior that must remain intact.
- Identify the smallest files/surfaces that need to change.

### B. Plan
- For a localized task, give a concise approach.
- For a cross-cutting task, list affected areas, dependencies, risks, and verification.
- Call out conflicts between the requested outcome and current repository facts.
- Ask one targeted question when a missing decision materially affects correctness or would cause destructive ambiguity.
- Obtain approval before major/high-impact changes.

### C. Implement
- Make small, reviewable edits.
- Reuse existing patterns and dependencies.
- Preserve the current visual system and interaction contracts.
- Avoid unrelated cleanup and broad rewrites.

### D. Verify
- Run lint/build and relevant tests as described above.
- Check the UI, responsiveness, accessibility, and motion behavior relevant to the change.
- Inspect the final diff and ensure no unrelated files changed.

### E. Report
Summarize:
- What changed and why.
- Which files changed.
- What behavior was preserved.
- Commands/checks run and their real results.
- Any known limitations, unresolved questions, or follow-up requiring user input.

## 18. Definition of done

A change is complete only when all applicable conditions are met:

- It solves the user's requested problem without expanding scope.
- Existing sections, links, navigation, loader, scrolling, animation, and content behavior remain functional unless explicitly changed.
- The CHROME / CONSCIOUSNESS art direction remains coherent.
- No prohibited decorative objects or purposeless motion were introduced.
- Portrait identity and source imagery remain intact.
- Project and personal claims are accurate and supported.
- The resume download points to the actual PDF and preserves its original filename when that feature is in scope.
- Responsive behavior and accessibility are preserved.
- No unnecessary dependency or duplicate implementation was added.
- Lint/build/tests were run where available and results are reported honestly.
- The final Git diff contains only intentional, reviewed changes.

## 19. Reference hierarchy

When sources disagree, use this order:

1. The user's explicit requirements and approvals define desired behavior and scope.
2. The current repository files, lockfile, implementation, assets, and observed runtime define project facts.
3. Current official OpenAI Codex documentation defines Codex-specific behavior and supported instruction conventions.
4. The repository README provides useful project context but may lag behind the checkout.
5. External design references and example repositories are inspiration/pattern references only; they do not override the current implementation or user requirements.

Do not treat conventions from unrelated example repositories as requirements for this project. Do not invent Codex configuration keys, special syntax, or instruction-discovery behavior.

This file is intended as the repository-root instruction file. Keep shared portfolio rules here. Do not add nested `AGENTS.md` or `AGENTS.override.md` files unless the repository gains a genuinely distinct subtree workflow and the normal Codex launch directory is known to discover those files.
