import { skillGroups, interests } from '../../data/content'
import SectionHeading from '../SectionHeading'
import SkillIcon from '../SkillIcon'

export default function Skills() {
  return (
    <section id="craft" data-section className="section-pad section-rule relative py-28 sm:py-36 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="The Craft"
          title="Skills grouped by how I use them."
          subtitle="No proficiency bars or invented percentages — only tools I can explain from projects and practice."
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.label} data-reveal-block>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-ice/75">
                {group.label}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <span className="group inline-flex items-center gap-2 border border-white/10 bg-slate/40 px-3 py-1.5 font-mono text-[12px] text-chrome/90 transition-[border-color,color,background-color,transform,box-shadow] duration-250 ease-out hover:-translate-y-px hover:border-iris/30 hover:bg-slate/65 hover:text-soft hover:shadow-[0_0_12px_rgba(139,122,255,0.07)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                      <SkillIcon name={item} size={16} />
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-white/5 pt-10" data-reveal>
          <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-silver/70">
            Current interests
          </h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {interests.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-silver">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
