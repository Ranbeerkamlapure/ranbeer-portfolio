import { animate, splitText } from 'animejs'

/** Selective Anime.js title accent — only after GSAP has revealed the card. */
export function accentProjectTitle(titleEl) {
  if (!titleEl || titleEl.dataset.accented === '1') return null
  titleEl.dataset.accented = '1'

  const original = titleEl.textContent || ''
  titleEl.setAttribute('aria-label', original)

  const splitter = splitText(titleEl, { chars: true, accessible: false })
  const chars = splitter.chars
  if (!chars?.length) return null

  chars.forEach((ch) => {
    ch.style.display = 'inline-block'
    ch.style.opacity = '0.35'
  })

  return animate(chars, {
    opacity: [0.35, 1],
    y: [8, 0],
    delay: (_el, i) => i * 14,
    duration: 420,
    ease: 'outCubic',
  })
}
