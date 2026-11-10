export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <header className="max-w-3xl">
      {eyebrow && (
        <p
          data-reveal-heading
          className="font-mono text-[11px] uppercase tracking-[0.28em] text-ice/80"
        >
          {eyebrow}
        </p>
      )}
      <h2
        data-reveal-heading
        data-split-title
        className="mt-3 font-display text-3xl font-medium tracking-[-0.035em] text-soft text-balance sm:text-4xl lg:text-[2.85rem] lg:leading-[1.08]"
      >
        {title}
      </h2>
      {subtitle && (
        <p
          data-reveal-heading
          className="mt-4 max-w-2xl text-base leading-relaxed text-silver sm:text-lg"
        >
          {subtitle}
        </p>
      )}
    </header>
  )
}
