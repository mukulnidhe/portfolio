import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { projects, type Project } from '../data/profile'
import { forecastSeries, retailCategories, rfmSegments } from '../data/sample'
import { useChartColors } from '../lib/theme'
import { Badge, GitHubIcon, Reveal, Section } from './ui'

// Add real links here when they exist. Empty strings render as "coming soon".
const projectLinks: Record<string, { repo: string; demo: string }> = {
  'ecommerce-eda': { repo: '', demo: '' },
  'churn-rfm': { repo: '', demo: '' },
  'retail-insights': { repo: '', demo: '' },
  'sales-forecast': { repo: '', demo: '' },
}

function Visual({ kind, compact = false }: { kind: Project['visual']; compact?: boolean }) {
  const c = useChartColors()
  const h = compact ? 'h-36' : 'h-64'
  const axis = { tick: { fill: c.muted, fontSize: 12 }, axisLine: false, tickLine: false } as const
  if (kind === 'weekend') {
    const data = [
      { d: 'Weekdays', share: 35 },
      { d: 'Weekends', share: 65 },
    ]
    return (
      <div className={h}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 8, right: 24, top: 8, bottom: 8 }}>
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis type="category" dataKey="d" {...axis} width={76} />
            <Tooltip formatter={(v) => `${v}% of sales`} cursor={{ fill: c.grid }} />
            <Bar dataKey="share" radius={[0, 8, 8, 0]} label={{ position: 'right', fill: c.ink, fontSize: 13, formatter: (v: unknown) => `${v}%` }}>
              {data.map((x) => (
                <Cell key={x.d} fill={x.d === 'Weekends' ? c.a : c.grid} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
  if (kind === 'rfm') {
    return (
      <div className={h}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rfmSegments} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
            <CartesianGrid stroke={c.grid} vertical={false} />
            <XAxis dataKey="segment" {...axis} interval={0} tickFormatter={(s: string) => (compact ? s.split(' ')[0] : s.replace(' (top 20%)', ''))} />
            <YAxis {...axis} width={44} unit="%" />
            <Tooltip formatter={(v) => `${v}% of customers`} cursor={{ fill: c.grid }} />
            <Bar dataKey="share" radius={[6, 6, 0, 0]}>
              {rfmSegments.map((s) => (
                <Cell key={s.segment} fill={s.segment.startsWith('At risk') ? c.neg : c.b} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
  if (kind === 'retail') {
    return (
      <div className={h}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={retailCategories} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
            <CartesianGrid stroke={c.grid} vertical={false} />
            <XAxis dataKey="cat" {...axis} interval={0} tickFormatter={(s: string) => (compact ? s.replace('Category ', '') : s)} />
            <YAxis {...axis} width={44} unit="%" />
            <ReferenceLine y={0} stroke={c.muted} />
            <Tooltip formatter={(v) => `${v}% YoY`} cursor={{ fill: c.grid }} />
            <Bar dataKey="yoy" radius={[6, 6, 6, 6]}>
              {retailCategories.map((r) => (
                <Cell key={r.cat} fill={r.yoy < 0 ? c.neg : c.a} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
  return (
    <div className={h}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={forecastSeries} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
          <CartesianGrid stroke={c.grid} vertical={false} />
          <XAxis dataKey="m" {...axis} interval={compact ? 2 : 0} />
          <YAxis {...axis} width={40} domain={[90, 135]} />
          <Tooltip />
          <Line type="monotone" dataKey="actual" name="Actual" stroke={c.b} strokeWidth={2.5} dot={false} />
          <Line type="monotone" dataKey="forecast" name="Forecast" stroke={c.a} strokeWidth={2.5} strokeDasharray="6 4" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

const visualNote: Record<Project['visual'], string> = {
  weekend: 'Weekend share (65%) is the project result; chart is a simplified recreation.',
  rfm: 'Segment sizes are illustrative; the top-20% churn-risk group is the project result.',
  retail: 'Category bars are illustrative; the 15% decline in specific lines is the project result.',
  forecast: 'Illustrative series showing the forecasting approach, not the original data.',
}

function ProjectModal({ p, onClose }: { p: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const links = projectLinks[p.slug]
  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const block = (title: string, items: string[]) => (
    <div>
      <h4 className="font-semibold">{title}</h4>
      <ul className="mt-2 space-y-2">
        {items.map((i) => (
          <li key={i} className="flex gap-2.5 text-[15px] text-muted">
            <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-accent-2" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <motion.div className="fixed inset-0 z-50 flex items-end justify-center bg-[#020814]/70 p-0 backdrop-blur-sm sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border border-line bg-surface-strong sm:rounded-3xl"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-surface-strong/95 p-6 backdrop-blur">
          <div>
            <p className="text-sm font-semibold text-accent-2">
              Case study · {p.tag} · {p.date}
            </p>
            <h3 id="project-title" className="mt-1 text-2xl font-semibold tracking-tight">
              {p.title}
            </h3>
          </div>
          <button ref={closeRef} onClick={onClose} aria-label="Close case study" className="grid h-11 w-11 flex-none place-items-center rounded-xl border border-line">
            <X size={18} />
          </button>
        </div>
        <div className="space-y-8 p-6">
          <p className="text-[17px]">{p.overview}</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {p.impact.map((m) => (
              <div key={m.label} className="rounded-2xl bg-accent-soft p-4">
                <p className="tnum text-3xl font-semibold tracking-tight text-accent-2">{m.value}</p>
                <p className="text-sm text-muted">{m.label}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h4 className="font-semibold">Business problem</h4>
              <p className="mt-2 text-[15px] text-muted">{p.problem}</p>
            </div>
            {block('Objectives', p.objectives)}
            {block('Analytical approach', p.approach)}
            {block('Key findings', p.findings)}
            {block('Business recommendations', p.recommendations)}
            <div>
              <h4 className="font-semibold">Tools & technologies</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tools.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-line p-5">
            <p className="mb-2 font-semibold">Visual preview</p>
            <Visual kind={p.visual} />
            <p className="mt-2 text-[13px] text-muted">{visualNote[p.visual]}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {links.repo ? (
              <a href={links.repo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line px-4 font-semibold hover:border-accent-2">
                <GitHubIcon width={16} height={16} /> View repository
              </a>
            ) : (
              <span className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-dashed border-line px-4 text-sm text-muted">
                <GitHubIcon width={16} height={16} /> Repository link coming soon
              </span>
            )}
            {links.demo ? (
              <a href={links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line px-4 font-semibold hover:border-accent-2">
                <ExternalLink size={16} /> Live demo
              </a>
            ) : (
              <span className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-dashed border-line px-4 text-sm text-muted">
                <ExternalLink size={16} /> Live demo / screenshots on request
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  // Deep-linkable case studies: #project-<slug>
  useEffect(() => {
    const read = () => {
      const h = window.location.hash.replace('#project-', '')
      setOpenSlug(projects.some((p) => p.slug === h) ? h : null)
    }
    read()
    window.addEventListener('hashchange', read)
    return () => window.removeEventListener('hashchange', read)
  }, [])

  const open = (slug: string) => {
    window.location.hash = `project-${slug}`
  }
  const close = () => {
    history.replaceState(null, '', '#projects')
    setOpenSlug(null)
  }
  const current = projects.find((p) => p.slug === openSlug)

  return (
    <Section id="projects" kicker="Featured projects" title="Four projects, four tools, one habit: finish with a business result." intro="Open any card for the full case study — the problem, approach, findings, recommendations and impact.">
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05}>
            <button onClick={() => open(p.slug)} className="glass group flex h-full w-full flex-col rounded-3xl p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-accent-2/60">
              <div className="flex items-center justify-between gap-3">
                <Badge tone="accent">{p.tag}</Badge>
                <span className="text-sm text-muted">{p.date}</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-1 text-[17px] font-medium text-accent-2">{p.headline}</p>
              <div className="mt-4 rounded-2xl border border-line bg-bg/40 p-3">
                <Visual kind={p.visual} compact />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.impact.map((m) => (
                  <span key={m.label} className="text-sm text-muted">
                    <strong className="tnum font-semibold text-ink">{m.value}</strong> {m.label}
                    <span className="mx-2 text-line">|</span>
                  </span>
                ))}
              </div>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-accent-2">
                Read case study <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </Reveal>
        ))}
      </div>
      <AnimatePresence>{current && <ProjectModal p={current} onClose={close} />}</AnimatePresence>
    </Section>
  )
}
