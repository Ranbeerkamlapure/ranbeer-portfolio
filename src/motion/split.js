/** Lightweight word/char split for GSAP — no Club SplitText dependency. */

export function splitWords(el) {
  if (!el) return []
  const text = el.textContent ?? ''
  el.setAttribute('aria-label', text.trim())
  el.innerHTML = ''
  const words = []
  const parts = text.split(/(\s+)/)

  parts.forEach((part) => {
    if (!part) return
    if (/^\s+$/.test(part)) {
      el.appendChild(document.createTextNode(part))
      return
    }
    const word = document.createElement('span')
    word.className = 'split-word'
    word.style.display = 'inline-block'
    word.style.overflow = 'hidden'
    word.style.verticalAlign = 'top'

    const inner = document.createElement('span')
    inner.className = 'split-word-inner'
    inner.style.display = 'inline-block'
    inner.textContent = part
    word.appendChild(inner)
    el.appendChild(word)
    words.push(inner)
  })

  return words
}

/** Char split that keeps words intact (no mid-word wraps). */
export function splitChars(el) {
  if (!el) return []
  const text = el.textContent ?? ''
  el.setAttribute('aria-label', text.trim())
  el.innerHTML = ''
  const chars = []
  const parts = text.split(/(\s+)/)

  parts.forEach((part) => {
    if (!part) return
    if (/^\s+$/.test(part)) {
      const space = document.createElement('span')
      space.className = 'split-space'
      space.style.display = 'inline-block'
      space.innerHTML = '&nbsp;'
      el.appendChild(space)
      return
    }

    const word = document.createElement('span')
    word.className = 'split-word'
    word.style.display = 'inline-block'
    word.style.whiteSpace = 'nowrap'
    word.style.verticalAlign = 'top'

    ;[...part].forEach((ch) => {
      const wrap = document.createElement('span')
      wrap.className = 'split-char-wrap'
      wrap.style.display = 'inline-block'
      wrap.style.overflow = 'hidden'
      wrap.style.verticalAlign = 'top'

      const inner = document.createElement('span')
      inner.className = 'split-char'
      inner.style.display = 'inline-block'
      inner.textContent = ch
      wrap.appendChild(inner)
      word.appendChild(wrap)
      chars.push(inner)
    })

    el.appendChild(word)
  })

  return chars
}
