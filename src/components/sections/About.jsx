import { profile } from '../../data/content'
import SectionHeading from '../SectionHeading'

export default function About() {
  return (
    <section id="human" data-section className="section-pad relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:items-start">
        <div className="relative" data-portrait>
          <div className="overflow-hidden bg-graphite">
            <picture>
              <source
                type="image/webp"
                srcSet="/ranbeer-portrait-sm.webp 480w, /ranbeer-portrait.webp 960w"
                sizes="(max-width: 1024px) 90vw, 420px"
              />
              <img
                src="/ranbeer-portrait.jpg"
                alt="Ranbeer Kamlapure, outdoor waist-up portrait in a white shirt"
                width={960}
                height={1280}
                className="aspect-[3/4] w-full object-cover object-[50%_18%] opacity-95 will-change-transform"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </picture>
          </div>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-silver/60">
            {profile.location}
          </p>
        </div>

        <div>
          <SectionHeading
            eyebrow="The Human"
            title="Building systems that connect interface, API, and data."
            subtitle="Student engineer. Practical builder. Backend-curious full-stack developer."
          />
          <div className="mt-8 space-y-5 text-base leading-relaxed text-silver sm:text-lg">
            {profile.about.map((para) => (
              <p key={para.slice(0, 32)} data-reveal>
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
