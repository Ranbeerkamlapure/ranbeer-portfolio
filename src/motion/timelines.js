import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { duration, ease } from './tokens'
import { splitChars, splitWords } from './split'
import { accentProjectTitle } from './animeAccent'

gsap.registerPlugin(ScrollTrigger)

const registry = {
  triggers: new Set(),
  timelines: new Set(),
}

function track(tl) {
  registry.timelines.add(tl)
  const prev = tl.eventCallback('onComplete')
  tl.eventCallback('onComplete', () => {
    registry.timelines.delete(tl)
    if (typeof prev === 'function') prev()
  })
  return tl
}

export function createNamedTimeline(name, vars = {}) {
  const tl = gsap.timeline({
    ...vars,
    defaults: { ease: ease.out, ...(vars.defaults || {}) },
  })
  tl.data = { id: name }
  return track(tl)
}

export function playLoaderTimeline(
  {
    root,
    bar,
    percent,
    label,
    theme,
  },
  { reducedMotion = false, onComplete } = {},
) {
  const finish = () => onComplete?.()

  if (reducedMotion) {
    if (percent) percent.textContent = '100'
    if (bar) gsap.set(bar, { scaleX: 1 })
    const tl = createNamedTimeline('loader:reduced')
    tl.to(root, { opacity: 0, duration: 0.25, ease: ease.soft }).add(finish)
    return tl
  }

  const state = { value: 0 }
  gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' })
  gsap.set([label, theme, percent], { opacity: 0, y: 12 })

  const tl = createNamedTimeline('loader:cinematic')

  tl.to([label, theme], {
    opacity: 1,
    y: 0,
    duration: 0.55,
    stagger: 0.08,
    ease: ease.out,
  })
    .to(
      percent,
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: ease.out,
      },
      '-=0.35',
    )
    .to(
      state,
      {
        value: 100,
        duration: duration.loader,
        ease: 'power2.inOut',
        onUpdate: () => {
          const v = Math.round(state.value)
          if (percent) percent.textContent = String(v)
          if (bar) gsap.set(bar, { scaleX: state.value / 100 })
        },
      },
      '-=0.15',
    )
    .to(root, {
      yPercent: -110,
      duration: 0.95,
      ease: ease.cinematic,
    })
    .set(root, { autoAlpha: 0 })
    .add(finish)

  // Hard failsafe — never leave user stuck on loader
  const failsafe = window.setTimeout(() => {
    if (tl.isActive()) {
      tl.progress(1)
    }
  }, 5000)

  const prevComplete = tl.eventCallback('onComplete')
  tl.eventCallback('onComplete', () => {
    window.clearTimeout(failsafe)
    if (typeof prevComplete === 'function') prevComplete()
  })

  return tl
}

export function playHeroIntro(heroEl, { reducedMotion = false } = {}) {
  if (!heroEl) return null

  const eyebrow = heroEl.querySelector('[data-hero="eyebrow"]')
  const name = heroEl.querySelector('[data-hero="name"]')
  const headline = heroEl.querySelector('[data-hero="headline"]')
  const narrative = heroEl.querySelector('[data-hero="narrative"]')
  const ctas = heroEl.querySelector('[data-hero="ctas"]')
  const socials = heroEl.querySelector('[data-hero="socials"]')
  const identity = heroEl.querySelector('[data-hero="identity"]')
  const scene = heroEl.querySelector('[data-hero="scene"]')

  const targets = [eyebrow, name, headline, narrative, ctas, socials, identity].filter(Boolean)

  if (reducedMotion) {
    gsap.set(targets, { clearProps: 'all', autoAlpha: 1, y: 0 })
    return null
  }

  // Restore plain text if a prior intro (e.g. StrictMode) already split the nodes
  if (name?.getAttribute('aria-label')) {
    name.textContent = name.getAttribute('aria-label')
  }
  if (headline?.getAttribute('aria-label')) {
    headline.textContent = headline.getAttribute('aria-label')
  }

  const nameChars = name ? splitChars(name) : []
  const headlineWords = headline ? splitWords(headline) : []

  gsap.set([eyebrow, narrative, ctas, socials, identity].filter(Boolean), {
    autoAlpha: 0,
    y: 40,
  })
  gsap.set(nameChars, { yPercent: 120, autoAlpha: 0 })
  gsap.set(headlineWords, { yPercent: 110, autoAlpha: 0 })
  if (scene) gsap.set(scene, { autoAlpha: 0, scale: 0.92 })

  const tl = createNamedTimeline('hero:intro')

  if (scene) {
    tl.to(
      scene,
      { autoAlpha: 1, scale: 1, duration: 1.2, ease: ease.outExpo },
      0,
    )
  }

  tl.to(
    eyebrow,
    { autoAlpha: 1, y: 0, duration: 0.55, ease: ease.out },
    0.08,
  )
    .to(
      nameChars,
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.85,
        stagger: 0.028,
        ease: ease.cinematic,
      },
      0.18,
    )
    .to(
      headlineWords,
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.7,
        stagger: 0.035,
        ease: ease.out,
      },
      0.55,
    )
    .to(
      narrative,
      { autoAlpha: 1, y: 0, duration: 0.65, ease: ease.out },
      0.75,
    )
    .to(
      ctas,
      { autoAlpha: 1, y: 0, duration: 0.6, ease: ease.out },
      0.9,
    )
    .to(
      socials,
      { autoAlpha: 1, y: 0, duration: 0.55, ease: ease.out },
      1.0,
    )
    .to(
      identity,
      { autoAlpha: 1, y: 0, duration: 0.75, ease: ease.outExpo },
      0.85,
    )

  return tl
}

export function initScrollStory({ reducedMotion = false } = {}) {
  const cleanups = []

  if (reducedMotion) {
    document.querySelectorAll('[data-reveal], [data-project-card], [data-portrait]').forEach((el) => {
      gsap.set(el, { clearProps: 'all', autoAlpha: 1, y: 0, x: 0 })
    })
    return () => {}
  }

  // Generic section reveals (skip hero — owned by intro)
  document.querySelectorAll('[data-section]:not(#signal)').forEach((section) => {
    const heading = section.querySelectorAll('[data-reveal-heading]')
    const items = section.querySelectorAll('[data-reveal]:not([data-project-card]):not([data-portrait])')

    if (heading.length) {
      gsap.set(heading, { autoAlpha: 0, y: 48 })
      const tl = createNamedTimeline(`heading:${section.id}`)
      tl.to(heading, {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: ease.cinematic,
      })
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        once: true,
        animation: tl,
      })
      registry.triggers.add(trigger)
      cleanups.push(() => trigger.kill())
    }

    if (items.length) {
      gsap.set(items, { autoAlpha: 0, y: 56 })
      const tl = createNamedTimeline(`reveal:${section.id}`)
      tl.to(items, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: ease.out,
      })
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 72%',
        once: true,
        animation: tl,
      })
      registry.triggers.add(trigger)
      cleanups.push(() => trigger.kill())
    }
  })

  // About: portrait clip + parallax (scroll-linked, not pinned on mobile)
  const about = document.getElementById('human')
  const portrait = about?.querySelector('[data-portrait]')
  const portraitImg = portrait?.querySelector('img')

  if (about && portrait) {
    gsap.set(portrait, { autoAlpha: 0, clipPath: 'inset(12% 12% 12% 12%)', scale: 1.06 })
    const enter = createNamedTimeline('about:portrait')
    enter.to(portrait, {
      autoAlpha: 1,
      clipPath: 'inset(0% 0% 0% 0%)',
      scale: 1,
      duration: 1.15,
      ease: ease.cinematic,
    })
    const enterTrigger = ScrollTrigger.create({
      trigger: about,
      start: 'top 75%',
      once: true,
      animation: enter,
    })
    registry.triggers.add(enterTrigger)
    cleanups.push(() => enterTrigger.kill())

    if (portraitImg && window.matchMedia('(min-width: 768px)').matches) {
      const parallax = gsap.to(portraitImg, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: about,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      })
      if (parallax.scrollTrigger) registry.triggers.add(parallax.scrollTrigger)
      cleanups.push(() => parallax.scrollTrigger?.kill())
    }
  }

  // Projects: staggered card enter + light pin highlight on desktop for first card beat
  const proof = document.getElementById('proof')
  const cards = proof ? [...proof.querySelectorAll('[data-project-card]')] : []

  if (proof && cards.length) {
    gsap.set(cards, { autoAlpha: 0, y: 72, rotateX: 4 })

    cards.forEach((card, i) => {
      const tl = createNamedTimeline(`project:${i}`)
      tl.to(card, {
        autoAlpha: 1,
        y: 0,
        rotateX: 0,
        duration: 0.95,
        ease: ease.cinematic,
        onComplete: () => {
          const title = card.querySelector('[data-project-title]')
          if (title) accentProjectTitle(title)
        },
      })
      const trigger = ScrollTrigger.create({
        trigger: card,
        start: 'top 88%',
        once: true,
        animation: tl,
      })
      registry.triggers.add(trigger)
      cleanups.push(() => trigger.kill())
    })

    // Scroll-linked accent: Orbit (first) border/ice wash while in view — not a long pin
    const orbit = cards[0]
    if (orbit && window.matchMedia('(min-width: 1024px)').matches) {
      const wash = orbit.querySelector('[data-project-wash]')
      if (wash) {
        gsap.set(wash, { scaleX: 0, transformOrigin: 'left center' })
        const accent = gsap.to(wash, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: orbit,
            start: 'top 70%',
            end: 'bottom 45%',
            scrub: true,
          },
        })
        if (accent.scrollTrigger) registry.triggers.add(accent.scrollTrigger)
        cleanups.push(() => accent.scrollTrigger?.kill())
      }

      const pinTl = createNamedTimeline('projects:spotlight')
      pinTl
        .fromTo(
          orbit,
          { borderColor: 'rgba(255,255,255,0.08)' },
          { borderColor: 'rgba(165,243,252,0.35)', duration: 0.4 },
        )
        .to(orbit, { borderColor: 'rgba(255,255,255,0.08)', duration: 0.4 })

      const pinTrigger = ScrollTrigger.create({
        trigger: orbit,
        start: 'top 35%',
        end: '+=42%',
        pin: false,
        scrub: true,
        animation: pinTl,
      })
      registry.triggers.add(pinTrigger)
      cleanups.push(() => pinTrigger.kill())
    }
  }

  // Mind / craft: slight horizontal drift on enter for energy
  ;['mind', 'craft'].forEach((id) => {
    const section = document.getElementById(id)
    if (!section) return
    const blocks = section.querySelectorAll('[data-reveal-block]')
    if (!blocks.length) return
    gsap.set(blocks, { autoAlpha: 0, x: id === 'mind' ? -28 : 28 })
    const tl = createNamedTimeline(`block:${id}`)
    tl.to(blocks, {
      autoAlpha: 1,
      x: 0,
      duration: 0.85,
      stagger: 0.12,
      ease: ease.out,
    })
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      once: true,
      animation: tl,
    })
    registry.triggers.add(trigger)
    cleanups.push(() => trigger.kill())
  })

  ScrollTrigger.refresh()

  return () => {
    cleanups.forEach((fn) => fn())
  }
}

export function killAllMotion() {
  registry.triggers.forEach((t) => t.kill())
  registry.triggers.clear()
  registry.timelines.forEach((tl) => tl.kill())
  registry.timelines.clear()
  ScrollTrigger.getAll().forEach((t) => t.kill())
}

export { gsap, ScrollTrigger }
