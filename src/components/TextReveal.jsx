import { useEffect, useRef } from 'react'
import { animate, splitText } from 'animejs'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function TextReveal({
  as: Tag = 'span',
  text,
  className = '',
  delay = 0,
  active = true,
}) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || !active) return undefined

    if (reduced) {
      el.textContent = text
      return undefined
    }

    el.textContent = text
    // accessible clone would duplicate visible text in some browsers; we use aria-label instead
    const splitter = splitText(el, { chars: true, accessible: false })
    const chars = splitter.chars

    chars.forEach((char) => {
      char.style.opacity = '0'
      char.style.transform = 'translateY(0.55em)'
      char.style.display = 'inline-block'
    })

    const animation = animate(chars, {
      opacity: [0, 1],
      y: ['0.55em', '0em'],
      delay: (_el, i) => delay + i * 18,
      duration: 620,
      ease: 'outCubic',
    })

    return () => {
      animation?.pause?.()
      splitter.revert()
    }
  }, [text, delay, active, reduced])

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text}
    </Tag>
  )
}
