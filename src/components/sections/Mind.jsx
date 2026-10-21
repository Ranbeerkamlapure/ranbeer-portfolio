import { mindPoints } from '../../data/content'
import SectionHeading from '../SectionHeading'

export default function Mind() {
  return (
    <section
      id="mind"
      data-section
      className="section-pad relative border-t border-white/5 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="The Mind"
          title="How I learn and build."
          subtitle="No fabricated frameworks — just the habits that show up in my projects and coursework."
        />

        <ol className="mt-14 grid gap-6 sm:grid-cols-2">
          {mindPoints.map((point, index) => (
            <li
              key={point.title}
              data-reveal-block
              className="border border-white/8 bg-graphite/50 p-6 sm:p-7"
            >
              <span className="font-mono text-[11px] tabular-nums text-ice/70">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-display text-xl text-soft sm:text-2xl">{point.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-silver sm:text-base">{point.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
