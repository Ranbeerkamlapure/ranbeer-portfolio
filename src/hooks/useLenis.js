import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../motion/timelines'
import { setLenisInstance } from '../lib/scrollToSection'

export function useLenis({ enabled = true } = {}) {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
      setLenisInstance(null)
      return undefined
    }

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.15,
      wheelMultiplier: 0.95,
    })
    lenisRef.current = lenis
    setLenisInstance(lenis)

    document.documentElement.classList.add('lenis', 'lenis-smooth')

    // Official Lenis ↔ GSAP sync (ticker owns RAF)
    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    const onResize = () => ScrollTrigger.refresh()
    window.addEventListener('resize', onResize)
    ScrollTrigger.refresh()

    return () => {
      window.removeEventListener('resize', onResize)
      gsap.ticker.remove(ticker)
      lenis.destroy()
      lenisRef.current = null
      setLenisInstance(null)
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
    }
  }, [enabled])

  return lenisRef
}
