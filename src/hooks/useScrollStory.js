import { useLayoutEffect } from 'react'
import { initScrollStory } from '../motion/timelines'

export function useScrollStory(ready, reducedMotion) {
  useLayoutEffect(() => {
    if (!ready) return undefined

    const cleanupStory = initScrollStory({ reducedMotion }) || (() => {})

    return () => {
      // Only tear down scroll-owned triggers — do not kill the hero intro timeline
      cleanupStory()
    }
  }, [ready, reducedMotion])
}
