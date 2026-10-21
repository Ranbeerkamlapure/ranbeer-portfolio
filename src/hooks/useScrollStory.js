import { useLayoutEffect } from 'react'
import { initScrollStory, ScrollTrigger } from '../motion/timelines'

export function useScrollStory(ready, reducedMotion) {
  useLayoutEffect(() => {
    if (!ready) return undefined

    const cleanupStory = initScrollStory({ reducedMotion }) || (() => {})
    ScrollTrigger.refresh()

    return () => {
      // Only tear down scroll-owned triggers — do not kill the hero intro timeline
      cleanupStory()
    }
  }, [ready, reducedMotion])
}
