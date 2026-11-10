import { useEffect, useRef } from 'react'
import { ScrollTrigger } from '../motion/timelines'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function NetworkField() {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return undefined

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return undefined

    const compact = window.matchMedia('(max-width: 768px)').matches
    const cols = compact ? 5 : 8
    const rows = compact ? 5 : 7
    const extra = compact ? 5 : 10

    let width = 0
    let height = 0
    let progress = reduced ? 1 : 0
    let running = true
    let inView = false
    let raf = 0
    let renderFrame = () => {}
    let intersectionObserver
    const nodes = []

    const rebuild = () => {
      nodes.length = 0
      const padX = width * 0.1
      const padY = height * 0.16
      const gw = cols > 1 ? (width - padX * 2) / (cols - 1) : width
      const gh = rows > 1 ? (height - padY * 2) / (rows - 1) : height
      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          const tx = padX + x * gw
          const ty = padY + y * gh
          nodes.push({
            tx,
            ty,
            x: Math.random() * Math.max(width, 1),
            y: Math.random() * Math.max(height, 1),
            jx: (Math.random() - 0.5) * 70,
            jy: (Math.random() - 0.5) * 56,
          })
        }
      }
    }

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, compact ? 1.2 : 1.5)
      width = Math.max(rect.width, 1)
      height = Math.max(rect.height, 1)
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      rebuild()
      if (reduced) {
        nodes.forEach((node) => {
          node.x = node.tx
          node.y = node.ty
        })
        renderFrame(0)
      }
    }

    const observer = new ResizeObserver(resize)
    observer.observe(wrap)
    resize()

    const section = wrap.closest('section') || wrap
    let trigger
    if (!reduced) {
      trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top 85%',
        end: 'center 42%',
        scrub: 0.8,
        onUpdate: (self) => {
          progress = self.progress
        },
      })
      progress = trigger.progress
    }

    const draw = (stamp) => {
      raf = 0
      if (!running || (!reduced && !inView)) return
      const t = stamp * 0.001
      const structure = progress * progress * (3 - 2 * progress)
      ctx.clearRect(0, 0, width, height)

      nodes.forEach((node, i) => {
        const targetX = node.tx + Math.sin(t * 0.55 + i) * (1 - structure) * 56 + node.jx * (1 - structure)
        const targetY = node.ty + Math.cos(t * 0.42 + i * 0.65) * (1 - structure) * 42 + node.jy * (1 - structure)
        node.x += (targetX - node.x) * 0.075
        node.y += (targetY - node.y) * 0.075
      })

      if (structure < 0.88) {
        ctx.strokeStyle = `rgba(216, 224, 232, ${0.055 * (1 - structure)})`
        ctx.lineWidth = 0.6
        ctx.beginPath()
        for (let i = 0; i < extra; i += 1) {
          const a = nodes[i % nodes.length]
          const b = nodes[(i * 7 + 5) % nodes.length]
          ctx.moveTo(a.x, a.y)
          ctx.quadraticCurveTo(
            (a.x + b.x) * 0.5 + Math.sin(t + i) * 56 * (1 - structure),
            (a.y + b.y) * 0.5 + Math.cos(t * 0.8 + i) * 48 * (1 - structure),
            b.x,
            b.y,
          )
        }
        ctx.stroke()
      }

      const linkAlpha = 0.05 + structure * 0.16
      ctx.lineWidth = 0.85
      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          const i = y * cols + x
          const node = nodes[i]
          if (x < cols - 1) {
            const right = nodes[i + 1]
            ctx.strokeStyle = `rgba(139, 122, 255, ${linkAlpha})`
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(right.x, right.y)
            ctx.stroke()
          }
          if (y < rows - 1) {
            const down = nodes[i + cols]
            ctx.strokeStyle = `rgba(165, 243, 252, ${linkAlpha * 0.85})`
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(down.x, down.y)
            ctx.stroke()
          }
        }
      }

      nodes.forEach((node, i) => {
        const radius = 1.1 + structure * 1.25
        if (!compact) {
          const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 5.5)
          const hue = i % 3 === 0 ? '139, 122, 255' : '165, 243, 252'
          glow.addColorStop(0, `rgba(${hue}, ${0.18 + structure * 0.22})`)
          glow.addColorStop(1, 'rgba(5, 6, 8, 0)')
          ctx.fillStyle = glow
          ctx.beginPath()
          ctx.arc(node.x, node.y, radius * 5.5, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.fillStyle = `rgba(216, 224, 232, ${0.4 + structure * 0.38})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
        ctx.fill()
      })

      if (reduced) return
      raf = window.requestAnimationFrame(draw)
    }
    renderFrame = draw

    const scheduleDraw = () => {
      if (!raf) raf = window.requestAnimationFrame(draw)
    }

    if (reduced) {
      progress = 1
      nodes.forEach((node) => {
        node.x = node.tx
        node.y = node.ty
      })
      draw(0)
    } else {
      if (typeof IntersectionObserver !== 'undefined') {
        intersectionObserver = new IntersectionObserver(([entry]) => {
          inView = entry.isIntersecting
          if (inView) {
            scheduleDraw()
          } else if (raf) {
            window.cancelAnimationFrame(raf)
            raf = 0
          }
        }, { threshold: 0.05 })
        intersectionObserver.observe(section)
      } else {
        inView = true
        scheduleDraw()
      }
    }

    return () => {
      running = false
      window.cancelAnimationFrame(raf)
      observer.disconnect()
      intersectionObserver?.disconnect()
      trigger?.kill()
    }
  }, [reduced])

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
