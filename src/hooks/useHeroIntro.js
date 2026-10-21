import { useLayoutEffect } from 'react'
import { playHeroIntro } from '../motion/timelines'

export function useHeroIntro(ready, reducedMotion) {
  useLayoutEffect(() => {
    if (!ready) return undefined

    const hero = document.getElementById('signal')
    if (!hero) return undefined

    const tl = playHeroIntro(hero, { reducedMotion })

    return () => {
      tl?.kill()
    }
  }, [ready, reducedMotion])
}
