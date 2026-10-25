import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks } from '../data/content'
import { scrollToSection } from '../lib/scrollToSection'
import { hoverSpring } from '../motion/tokens'

export default function Nav({ ready, visible = true }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (id) => {
    // Unlock scroll immediately — overflow:hidden still applies until the
    // open→false effect runs, which would cancel scrollIntoView on mobile.
    document.body.style.overflow = ''
    setOpen(false)
    window.history.pushState(null, '', `#${id}`)
    // Next frame: menu can start closing and layout is scrollable again.
    requestAnimationFrame(() => {
      scrollToSection(id)
    })
  }

  return (
    <motion.header
      initial={false}
      animate={{
        y: visible ? 0 : -24,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'bg-void/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav
        className="section-pad mx-auto flex h-16 max-w-7xl items-center justify-between"
        aria-label="Primary"
      >
        <motion.button
          type="button"
          onClick={() => go('signal')}
          whileHover={{ color: '#d8e0e8' }}
          transition={hoverSpring}
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-silver"
        >
          Portfolio
        </motion.button>

        <ul className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <motion.button
                type="button"
                onClick={() => go(link.id)}
                whileHover={{ y: -1, color: '#a5f3fc' }}
                whileTap={{ scale: 0.97 }}
                transition={hoverSpring}
                className="relative font-mono text-[11px] uppercase tracking-[0.18em] text-silver/80 after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-ice/70 after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {link.label}
              </motion.button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center text-chrome md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="overflow-hidden border-t border-white/5 bg-void/95 md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="section-pad flex flex-col gap-1 py-4">
              {navLinks.map((link, i) => (
                <li key={link.id}>
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                    onClick={() => go(link.id)}
                    className="w-full py-3 text-left font-display text-lg text-soft"
                  >
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {!ready && <span className="sr-only">Loading</span>}
    </motion.header>
  )
}
