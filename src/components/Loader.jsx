import { useEffect, useRef } from 'react'
import { playLoaderTimeline } from '../motion/timelines'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function Loader({ onDone, active = true }) {
  const rootRef = useRef(null)
  const barRef = useRef(null)
  const percentRef = useRef(null)
  const labelRef = useRef(null)
  const themeRef = useRef(null)
  const reduced = usePrefersReducedMotion()
  const doneRef = useRef(false)

  useEffect(() => {
    if (!active || !rootRef.current) return undefined

    doneRef.current = false
    const tl = playLoaderTimeline(
      {
        root: rootRef.current,
        bar: barRef.current,
        percent: percentRef.current,
        label: labelRef.current,
        theme: themeRef.current,
      },
      {
        reducedMotion: reduced,
        onComplete: () => {
          if (doneRef.current) return
          doneRef.current = true
          onDone?.()
        },
      },
    )

    return () => {
      tl?.kill()
    }
  }, [active, onDone, reduced])

  if (!active) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void will-change-transform"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="absolute inset-0 chrome-gradient opacity-90" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px metal-line opacity-60"
        aria-hidden
      />
      <div className="relative z-10 w-full max-w-sm px-8">
        <p
          ref={labelRef}
          className="font-mono text-[11px] uppercase tracking-[0.28em] text-silver/80"
        >
          Establishing signal
        </p>
        <div className="mt-6 h-px w-full overflow-hidden bg-slate">
          <div
            ref={barRef}
            className="h-full w-full origin-left bg-gradient-to-r from-chrome/40 via-ice to-chrome/40"
          />
        </div>
        <div className="mt-4 flex items-baseline justify-between">
          <span
            ref={themeRef}
            className="font-mono text-xs text-silver/70"
          >
            CHROME / CONSCIOUSNESS
          </span>
          <span className="font-mono text-sm tabular-nums text-chrome">
            <span ref={percentRef}>0</span>%
          </span>
        </div>
      </div>
    </div>
  )
}
