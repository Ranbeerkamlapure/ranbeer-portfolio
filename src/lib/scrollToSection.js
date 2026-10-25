/** Shared section scroller — works with native scroll and Lenis. */

let lenisInstance = null

const HEADER_OFFSET = -72

export function setLenisInstance(instance) {
  lenisInstance = instance
}

export function scrollToSection(id, { immediate = false } = {}) {
  if (!id) return
  const el = typeof id === 'string' ? document.getElementById(id) : id
  if (!el) return

  if (lenisInstance) {
    lenisInstance.scrollTo(el, {
      offset: HEADER_OFFSET,
      immediate,
      duration: immediate ? 0 : 1.15,
    })
    return
  }

  const top = el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET
  window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' })
}
