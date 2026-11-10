import { animate, splitText } from 'animejs'

const titleAccents = new WeakMap()

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

  const animation = animate(chars, {
    opacity: [0.35, 1],
    y: [8, 0],
    delay: (_el, i) => i * 14,
    duration: 420,
    ease: 'outCubic',
  })
  titleAccents.set(titleEl, { animation, splitter })
  return animation
}

export function clearProjectTitleAccent(titleEl) {
  const accent = titleAccents.get(titleEl)
  accent?.animation?.pause?.()
  accent?.splitter?.revert?.()

  const original = titleEl?.getAttribute('aria-label')
  if (original != null) titleEl.textContent = original
  titleEl?.removeAttribute('aria-label')
  if (titleEl?.dataset) delete titleEl.dataset.accented
  if (titleEl) titleAccents.delete(titleEl)
}
