import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import Loader from './components/Loader'
import Nav from './components/Nav'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Mind from './components/sections/Mind'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Evolution from './components/sections/Evolution'
import Contact from './components/sections/Contact'
import { useLenis } from './hooks/useLenis'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { useHeroIntro } from './hooks/useHeroIntro'
import { useScrollStory } from './hooks/useScrollStory'
import { scrollToSection } from './lib/scrollToSection'

export default function App() {
  const [booting, setBooting] = useState(true)
  const [ready, setReady] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  useLenis({ enabled: ready && !reducedMotion })
  useHeroIntro(ready, reducedMotion)
  useScrollStory(ready, reducedMotion)

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('is-booting', booting)
    document.documentElement.classList.toggle('is-ready', ready)
    return () => {
      document.documentElement.classList.remove('is-booting', 'is-ready')
    }
  }, [booting, ready])

  // Honor deep links / refresh with a section hash once the page is ready
  useEffect(() => {
    if (!ready) return undefined

    const scrollHash = () => {
      const id = window.location.hash.replace(/^#/, '')
      if (!id) return
      requestAnimationFrame(() => scrollToSection(id))
    }

    scrollHash()
    window.addEventListener('hashchange', scrollHash)
    return () => window.removeEventListener('hashchange', scrollHash)
  }, [ready])

  const onLoaded = useCallback(() => {
    setBooting(false)
    setReady(true)
  }, [])

  return (
    <>
      <Loader active={booting} onDone={onLoaded} />
      <Nav ready={ready} visible={ready || reducedMotion} />
      <main>
        <Hero ready={ready} />
        <About />
        <Mind />
        <Skills />
        <Projects />
        <Evolution />
        <Contact />
      </main>
    </>
  )
}
