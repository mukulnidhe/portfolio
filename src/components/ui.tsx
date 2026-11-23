import { motion, useInView, useReducedMotion } from 'framer-motion'
import {
  Brain, Code2, Database, Gauge, Layers, Lightbulb, MessagesSquare, Presentation, Target, Workflow,
  type LucideIcon,
} from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode, type SVGProps } from 'react'

export const icons: Record<string, LucideIcon> = {
  brain: Brain, gauge: Gauge, target: Target, presentation: Presentation, database: Database,
  workflow: Workflow, messages: MessagesSquare, lightbulb: Lightbulb, code: Code2, layers: Layers,
}

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

export function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57v-2c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22v3.29c0 .31.21.69.82.57A12 12 0 0 0 12 .3" />
    </svg>
  )
}

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Section({ id, kicker, title, intro, children }: { id: string; kicker: string; title: ReactNode; intro?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 md:py-24">
      <Reveal>
        <p className="mb-3 text-sm font-semibold text-accent-2">{kicker}</p>
        <h2 className="balance max-w-3xl text-3xl font-semibold leading-[1.08] tracking-tight sm:text-[2.6rem]">{title}</h2>
        {intro && <p className="mt-4 max-w-2xl text-[17px] text-muted">{intro}</p>}
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  )
}

export function Badge({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'accent' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[13px] font-medium leading-none ${
        tone === 'accent' ? 'border-transparent bg-accent-soft text-accent-2' : 'border-line text-muted'
      }`}
    >
      {children}
    </span>
  )
}

export function CountUp({ value, decimals = 0, suffix = '' }: { value: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? value : 0)
  useEffect(() => {
    if (!inView || reduce) {
      if (reduce) setN(value)
      return
    }
    let raf = 0
    const start = performance.now()
    const dur = 1400
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur)
      setN(value * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduce, value])
  return (
    <span ref={ref} className="tnum">
      {n.toFixed(decimals)}
      {suffix}
    </span>
  )
}

export function SampleNote({ children = 'Illustrative sample data — not real company or NMMC figures.' }: { children?: ReactNode }) {
  return <p className="text-[13px] text-muted">{children}</p>
}

export function Segmented<T extends string>({ value, options, onChange, label }: { value: T; options: readonly T[]; onChange: (v: T) => void; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex flex-wrap gap-1 rounded-xl border border-line bg-surface p-1">
      {options.map((o) => (
        <button
          key={o}
          role="radio"
          aria-checked={value === o}
          onClick={() => onChange(o)}
          className={`min-h-9 rounded-lg px-3 text-sm font-medium transition-colors ${
            value === o ? 'bg-accent-soft text-accent-2' : 'text-muted hover:text-ink'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

export function Select({ value, options, onChange, label }: { value: string; options: readonly string[]; onChange: (v: string) => void; label: string }) {
  return (
    <label className="flex flex-col gap-1 text-[13px] text-muted">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-11 rounded-xl border border-line bg-surface-strong px-3 text-base text-ink"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}
