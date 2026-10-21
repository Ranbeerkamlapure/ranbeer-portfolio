import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { profile } from '../../data/content'
import { GitHubIcon, LinkedInIcon } from '../Icons'
import SectionHeading from '../SectionHeading'
import { hoverSpring } from '../../motion/tokens'

export default function Contact() {
  return (
    <section
      id="contact"
      data-section
      className="section-pad relative border-t border-white/5 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="The Next Chapter"
          title="Let’s build something practical."
          subtitle="Email and socials are the primary paths. No fake contact form."
        />

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap" data-reveal>
          <motion.a
            href={`mailto:${profile.email}`}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={hoverSpring}
            className="inline-flex items-center gap-3 bg-chrome px-6 py-4 font-mono text-[12px] uppercase tracking-[0.16em] text-void focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice"
          >
            <Mail size={16} /> {profile.email}
          </motion.a>
          <motion.a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -3, borderColor: 'rgba(165,243,252,0.5)', color: '#a5f3fc' }}
            whileTap={{ scale: 0.98 }}
            transition={hoverSpring}
            className="inline-flex items-center gap-3 border border-chrome/25 px-6 py-4 font-mono text-[12px] uppercase tracking-[0.16em] text-chrome focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice"
          >
            <GitHubIcon size={16} /> GitHub
          </motion.a>
          <motion.a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -3, borderColor: 'rgba(165,243,252,0.5)', color: '#a5f3fc' }}
            whileTap={{ scale: 0.98 }}
            transition={hoverSpring}
            className="inline-flex items-center gap-3 border border-chrome/25 px-6 py-4 font-mono text-[12px] uppercase tracking-[0.16em] text-chrome focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice"
          >
            <LinkedInIcon size={16} /> LinkedIn
          </motion.a>
        </div>

        <p className="mt-10 max-w-xl text-sm text-silver/70" data-reveal>
          Languages: {profile.languages.join(' · ')}
        </p>

        <footer className="mt-20 border-t border-white/5 pt-8" data-reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-silver/45">
            © {new Date().getFullYear()} Ranbeer Kamlapure · CHROME / CONSCIOUSNESS
          </p>
        </footer>
      </div>
    </section>
  )
}
