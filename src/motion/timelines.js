import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { duration, ease } from './tokens'
import { splitChars, splitWords } from './split'
import { accentProjectTitle, clearProjectTitleAccent } from './animeAccent'

gsap.registerPlugin(ScrollTrigger)

const registry = {
  triggers: new Set(),
  timelines: new Set(),
}

function track(tl) {
  registry.timelines.add(tl)
  const prevComplete = tl.eventCallback('onComplete')
  const prevInterrupt = tl.eventCallback('onInterrupt')
  const remove = () => registry.timelines.delete(tl)
  tl.eventCallback('onComplete', () => {
    remove()
    if (typeof prevComplete === 'function') prevComplete()
  })
  tl.eventCallback('onInterrupt', () => {
    remove()
    if (typeof prevInterrupt === 'function') prevInterrupt()
  })
  return tl
}

function registerTrigger(trigger, cleanups, animation) {
  if (!trigger) return
  registry.triggers.add(trigger)
  cleanups.push(() => {
    trigger.kill()
    registry.triggers.delete(trigger)
    animation?.kill()
    if (animation) registry.timelines.delete(animation)
  })
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
  const ctas = heroEl.querySelector('[data-hero="ctas"]')
  const ctaItems = ctas ? [...ctas.children] : []
  const socials = heroEl.querySelector('[data-hero="socials"]')
  const identity = heroEl.querySelector('[data-hero="identity"]')

  // Restore plain text if a prior intro (e.g. StrictMode) already split the nodes.
  if (name?.getAttribute('aria-label')) {
    name.textContent = name.getAttribute('aria-label')
  }
  if (headline?.getAttribute('aria-label')) {
    headline.textContent = headline.getAttribute('aria-label')
  }

  const targets = [eyebrow, name, headline, ctas, socials, identity, ...ctaItems].filter(Boolean)

  if (reducedMotion) {
    gsap.set(targets, { clearProps: 'all', autoAlpha: 1, y: 0 })
    return null
  }

  const nameChars = name ? splitChars(name) : []
  const headlineWords = headline ? splitWords(headline) : []

  gsap.set([eyebrow, ctas, socials, identity].filter(Boolean), {
    autoAlpha: 0,
    y: 30,
  })
  gsap.set(nameChars, { yPercent: 120, autoAlpha: 0 })
  gsap.set(headlineWords, { yPercent: 110, autoAlpha: 0 })
  gsap.set(ctaItems, { autoAlpha: 0, y: 12 })
  const tl = createNamedTimeline('hero:intro')

  tl.to(
    eyebrow,
    { autoAlpha: 1, y: 0, duration: duration.short, ease: ease.out },
    0.06,
  )
    .to(
      nameChars,
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.92,
        stagger: 0.038,
        ease: ease.cinematic,
      },
      0.18,
    )
    .to(
      headlineWords,
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.78,
        stagger: 0.055,
        ease: ease.out,
      },
      0.55,
    )
    .to(
      ctas,
      { autoAlpha: 1, y: 0, duration: duration.short, ease: ease.out },
      0.86,
    )
    .to(
      ctaItems,
      { autoAlpha: 1, y: 0, duration: 0.52, stagger: 0.1, ease: ease.out },
      1.02,
    )
    .to(
      socials,
      { autoAlpha: 1, y: 0, duration: duration.short, ease: ease.out },
      1.16,
    )
    .to(
      identity,
      { autoAlpha: 1, y: 0, duration: duration.medium, ease: ease.outExpo },
      0.9,
    )

  return tl
}

export function initScrollStory({ reducedMotion = false } = {}) {
  const cleanups = []

  if (reducedMotion) {
    document.querySelectorAll('[data-split-title][aria-label]').forEach((el) => {
      el.textContent = el.getAttribute('aria-label')
    })
    document.querySelectorAll('[data-project-title][aria-label]').forEach(clearProjectTitleAccent)
    document.querySelectorAll('[data-reveal], [data-project-card], [data-portrait], [data-reveal-heading], [data-project-content] > *, [data-project-actions]').forEach((el) => {
      gsap.set(el, { clearProps: 'all', autoAlpha: 1, y: 0, x: 0 })
    })
    return () => {}
  }

  // Generic section reveals (skip hero — owned by intro)
  document.querySelectorAll('[data-section]:not(#signal)').forEach((section) => {
    const headingEls = [...section.querySelectorAll('[data-reveal-heading]')]
    const splitTitle = section.querySelector('[data-split-title]')
    const items = section.querySelectorAll('[data-reveal]:not([data-project-card]):not([data-portrait])')

    if (headingEls.length) {
      const rest = headingEls.filter((el) => el !== splitTitle)
      let titleWords = []

      if (splitTitle) {
        if (splitTitle.getAttribute('aria-label')) {
          splitTitle.textContent = splitTitle.getAttribute('aria-label')
        }
        titleWords = splitWords(splitTitle)
        gsap.set(titleWords, { yPercent: 130, autoAlpha: 0 })
      }

      gsap.set(rest, { autoAlpha: 0, y: 28 })
      const tl = createNamedTimeline(`heading:${section.id}`)
      if (rest[0]) {
        tl.to(rest[0], { autoAlpha: 1, y: 0, duration: duration.short, ease: ease.out }, 0)
      }
      if (titleWords.length) {
        tl.to(
          titleWords,
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.88,
            stagger: 0.055,
            ease: ease.cinematic,
          },
          0.08,
        )
      }
      rest.slice(1).forEach((el, i) => {
        tl.to(el, { autoAlpha: 1, y: 0, duration: duration.short, ease: ease.out }, 0.24 + i * 0.07)
      })
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        once: true,
        animation: tl,
      })
      registerTrigger(trigger, cleanups, tl)
    }

    if (items.length) {
      gsap.set(items, { autoAlpha: 0, y: 38 })
      const tl = createNamedTimeline(`reveal:${section.id}`)
      tl.to(items, {
        autoAlpha: 1,
        y: 0,
        duration: 0.82,
        stagger: 0.15,
        ease: ease.out,
      })
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 72%',
        once: true,
        animation: tl,
      })
      registerTrigger(trigger, cleanups, tl)
    }
  })

  // About: portrait clip + parallax (scroll-linked, not pinned on mobile)
  const about = document.getElementById('human')
  const portrait = about?.querySelector('[data-portrait]')
  const portraitImg = portrait?.querySelector('img')

  if (about && portrait) {
    gsap.set(portrait, { autoAlpha: 0, clipPath: 'inset(18% 13% 18% 13%)', scale: 1.055 })
    const enter = createNamedTimeline('about:portrait')
    enter.to(portrait, {
      autoAlpha: 1,
      clipPath: 'inset(0% 0% 0% 0%)',
      scale: 1,
      duration: 1.3,
      ease: ease.cinematic,
    })
    const enterTrigger = ScrollTrigger.create({
      trigger: about,
      start: 'top 75%',
      once: true,
      animation: enter,
    })
    registerTrigger(enterTrigger, cleanups, enter)

    if (portraitImg && window.matchMedia('(min-width: 768px)').matches) {
      const parallax = gsap.to(portraitImg, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: about,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.75,
        },
      })
      registerTrigger(parallax.scrollTrigger, cleanups, parallax)
    }

    const halftone = portrait.querySelector('[data-halftone]')
    if (halftone && window.matchMedia('(min-width: 768px)').matches) {
      const fade = gsap.fromTo(
        halftone,
        { opacity: 0.68 },
        {
          opacity: 0.4,
          ease: 'none',
          scrollTrigger: {
            trigger: about,
            start: 'top 72%',
            end: 'center 38%',
            scrub: 0.45,
          },
        },
      )
      registerTrigger(fade.scrollTrigger, cleanups, fade)
    }
  }

  // Projects: staggered card enter + light pin highlight on desktop for first card beat
  const proof = document.getElementById('proof')
  const cards = proof ? [...proof.querySelectorAll('[data-project-card]')] : []

  if (proof && cards.length) {
    gsap.set(cards, { autoAlpha: 0 })

    cards.forEach((card, i) => {
      const content = card.querySelector('[data-project-content]')
      const contentItems = content ? [...content.children] : []
      const actions = card.querySelector('[data-project-actions]')
      const revealItems = [...contentItems, actions].filter(Boolean)
      gsap.set(revealItems, { autoAlpha: 0, y: 20 })

      const tl = createNamedTimeline(`project:${i}`)
      tl.to(card, { autoAlpha: 1, duration: 0.58, ease: ease.out })
        .to(
          revealItems,
          { autoAlpha: 1, y: 0, duration: 0.62, stagger: 0.09, ease: ease.out },
          '-=0.12',
        )
        .call(() => {
          const title = card.querySelector('[data-project-title]')
          if (title) accentProjectTitle(title)
        })
      const trigger = ScrollTrigger.create({
        trigger: card,
        start: 'top 88%',
        once: true,
        animation: tl,
      })
      registerTrigger(trigger, cleanups, tl)
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
        registerTrigger(accent.scrollTrigger, cleanups, accent)
      }
    }
  }

  // Mind / craft: slight horizontal drift on enter for energy
  ;['mind', 'craft'].forEach((id) => {
    const section = document.getElementById(id)
    if (!section) return
    const blocks = section.querySelectorAll('[data-reveal-block]')
    if (!blocks.length) return
    gsap.set(blocks, { autoAlpha: 0, y: 30 })
    const tl = createNamedTimeline(`block:${id}`)
    tl.to(blocks, {
      autoAlpha: 1,
      y: 0,
      duration: 0.78,
      stagger: 0.14,
      ease: ease.out,
    })
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      once: true,
      animation: tl,
    })
    registerTrigger(trigger, cleanups, tl)
  })

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
