import { education, achievements, certifications } from '../../data/content'
import SectionHeading from '../SectionHeading'

export default function Evolution() {
  return (
    <section
      id="evolution"
      data-section
      className="section-pad relative py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="The Evolution"
          title="Education, milestones, and credentials."
          subtitle="Verified from source documents. Where wording needs confirmation, it is stated plainly."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-3">
          <div data-reveal>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-ice/75">
              Education
            </h3>
            <ul className="mt-5 space-y-6">
              {education.map((item) => (
                <li key={item.title}>
                  <p className="font-display text-lg text-soft">{item.title}</p>
                  <p className="mt-1 text-sm text-silver">{item.place}</p>
                  <p className="mt-1 font-mono text-[11px] text-silver/60">{item.meta}</p>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-ice/75">
              Achievements
            </h3>
            <ul className="mt-5 space-y-6">
              {achievements.map((item) => (
                <li key={item.title}>
                  <p className="font-display text-lg text-soft">{item.title}</p>
                  <p className="mt-1 font-mono text-[11px] text-silver/60">{item.year}</p>
                  <p className="mt-2 text-sm leading-relaxed text-silver">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-ice/75">
              Certifications
            </h3>
            <ul className="mt-5 space-y-5">
              {certifications.map((item) => (
                <li key={item.title}>
                  <p className="font-display text-base text-soft sm:text-lg">{item.title}</p>
                  <p className="mt-1 text-sm text-silver">{item.org}</p>
                  <p className="mt-1 font-mono text-[11px] text-silver/60">{item.when}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
