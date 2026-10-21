import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { projects } from '../../data/content'
import { GitHubIcon } from '../Icons'
import SectionHeading from '../SectionHeading'
import { hoverSpring } from '../../motion/tokens'

export default function Projects() {
  return (
    <section
      id="proof"
      data-section
      className="section-pad relative border-t border-white/5 py-24 sm:py-32"
      style={{ perspective: '1200px' }}
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="The Proof"
          title="Projects that show how I think in code."
          subtitle="Accurate status only. Missing demos and repos are flagged — nothing invented."
        />

        <div className="mt-14 space-y-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              data-project-card
              whileHover={{
                y: -4,
                borderColor: 'rgba(165, 243, 252, 0.28)',
                backgroundColor: 'rgba(16, 20, 27, 0.72)',
              }}
              transition={hoverSpring}
              className="relative grid gap-6 overflow-hidden border border-white/8 bg-graphite/40 p-6 sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:gap-10"
            >
              <div
                data-project-wash
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ice/70 to-transparent"
                aria-hidden
              />

              <div className="font-mono text-[11px] tabular-nums text-silver/50">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3
                    data-project-title
                    className="font-display text-2xl text-soft sm:text-3xl"
                  >
                    {project.title}
                  </h3>
                  <span className="border border-ice/25 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ice/90">
                    {project.status}
                  </span>
                </div>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-silver/65">
                  {project.role}
                </p>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-silver sm:text-base">
                  {project.summary}
                </p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tech, i) => (
                    <li
                      key={tech}
                      className="font-mono text-[11px] uppercase tracking-[0.12em] text-chrome/70"
                    >
                      {i > 0 && (
                        <span className="mr-2 text-white/15" aria-hidden>
                          /
                        </span>
                      )}
                      {tech}
                    </li>
                  ))}
                </ul>

                <ul className="mt-5 space-y-1.5">
                  {project.notes.map((note) => (
                    <li key={note} className="text-sm text-silver/75">
                      <span className="mr-2 text-ice/50" aria-hidden>
                        —
                      </span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-row gap-3 lg:flex-col lg:items-end">
                {project.github ? (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -2, borderColor: 'rgba(165,243,252,0.5)', color: '#a5f3fc' }}
                    whileTap={{ scale: 0.97 }}
                    transition={hoverSpring}
                    className="inline-flex items-center gap-2 border border-chrome/20 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-chrome focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice"
                  >
                    <GitHubIcon size={14} /> Repo
                  </motion.a>
                ) : (
                  <span className="inline-flex items-center gap-2 border border-dashed border-white/15 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-silver/45">
                    Repo pending
                  </span>
                )}
                {project.demo ? (
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -2, borderColor: 'rgba(165,243,252,0.5)', color: '#a5f3fc' }}
                    whileTap={{ scale: 0.97 }}
                    transition={hoverSpring}
                    className="inline-flex items-center gap-2 border border-chrome/20 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-chrome focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice"
                  >
                    <ExternalLink size={14} /> Demo
                  </motion.a>
                ) : (
                  <span className="inline-flex items-center gap-2 border border-dashed border-white/15 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-silver/45">
                    No live demo
                  </span>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
