import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowDownRight } from 'lucide-react'
import { profile } from '../../data/content'
import { GitHubIcon, LinkedInIcon } from '../Icons'
import { hoverSpring } from '../../motion/tokens'

const ChromeScene = lazy(() => import('../ChromeScene'))

export default function Hero({ ready }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="signal"
      data-section
      className="relative flex min-h-[100svh] items-end overflow-hidden chrome-gradient pb-16 pt-28 sm:items-center sm:pb-24 sm:pt-24"
    >
      <div data-hero="scene" className="pointer-events-none absolute inset-0 -z-10">
        <Suspense fallback={null}>{ready && <ChromeScene />}</Suspense>
      </div>

      <div className="section-pad relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
        <div>
          <p
            data-hero="eyebrow"
            className="font-mono text-[11px] uppercase tracking-[0.28em] text-silver/70"
          >
            The Signal
          </p>

          <h1 className="mt-5 font-display text-[clamp(2.75rem,8vw,5.75rem)] font-medium leading-[0.95] tracking-tight text-soft">
            <span data-hero="name" className="block">
              {profile.name}
            </span>
          </h1>

          <p
            data-hero="headline"
            className="mt-6 max-w-xl font-display text-lg text-chrome/90 sm:text-xl"
          >
            {profile.headline}
          </p>

          <p
            data-hero="narrative"
            className="mt-4 max-w-lg text-base leading-relaxed text-silver"
          >
            {profile.narrative}
          </p>

          <div data-hero="ctas" className="mt-9 flex flex-wrap items-center gap-3">
            <motion.button
              type="button"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={hoverSpring}
              onClick={() => scrollTo('proof')}
              className="inline-flex items-center gap-2 bg-chrome px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-void transition-colors hover:bg-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice"
            >
              View projects
              <ArrowDownRight size={16} aria-hidden />
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ y: -3, borderColor: 'rgba(165,243,252,0.55)', color: '#a5f3fc' }}
              whileTap={{ scale: 0.97 }}
              transition={hoverSpring}
              onClick={() => scrollTo('contact')}
              className="inline-flex items-center gap-2 border border-chrome/25 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-chrome focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice"
            >
              Contact
            </motion.button>
          </div>

          <div data-hero="socials" className="mt-8 flex items-center gap-5">
            <motion.a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2, color: '#a5f3fc' }}
              transition={hoverSpring}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-silver"
            >
              <GitHubIcon size={16} /> GitHub
            </motion.a>
            <motion.a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2, color: '#a5f3fc' }}
              transition={hoverSpring}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-silver"
            >
              <LinkedInIcon size={16} /> LinkedIn
            </motion.a>
          </div>
        </div>

        <aside className="hidden lg:block" aria-hidden>
          <div
            data-hero="identity"
            className="relative ml-auto max-w-sm border border-white/8 bg-graphite/40 p-6 backdrop-blur-sm"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-silver/60">
              Identity
            </p>
            <p className="mt-3 font-display text-2xl text-soft">{profile.identity}</p>
            <p className="mt-2 text-sm leading-relaxed text-silver">{profile.secondary}</p>
            <div className="metal-line mt-6 h-px w-full" />
            <p className="mt-6 font-mono text-[11px] leading-relaxed text-silver/80">
              Solapur · WIT · Graduating 2027
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}
