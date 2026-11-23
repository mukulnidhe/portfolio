import { motion } from 'framer-motion'
import { ArrowRight, Download, Mail } from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { heroStats, profile } from '../data/profile'
import { FY_MONTHS, heroSpark } from '../data/sample'
import { useChartColors } from '../lib/theme'
import { CountUp, LinkedInIcon } from './ui'

const stack = ['Power BI', 'DAX', 'SQL', 'Python', 'Pandas', 'Excel', 'LightGBM']

export default function Hero() {
  const c = useChartColors()
  const spark = heroSpark.map((d, i) => ({ ...d, m: FY_MONTHS[i] }))
  return (
    <section id="top" className="mx-auto max-w-[1240px] px-5 pt-10 pb-16 sm:px-8 md:pt-16">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[13px] text-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pos opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-pos" />
          </span>
          Open to Data Analyst, BI and Business Analyst roles · Mumbai · Pune · Bengaluru
        </div>
        <h1 className="balance max-w-4xl text-[2.5rem] font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.1rem]">
          Turning complex data into{' '}
          <span className="bg-gradient-to-r from-accent-2 to-[#3b82f6] bg-clip-text text-transparent">actionable business intelligence.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted sm:text-xl">
          Hi, I'm <strong className="font-semibold text-ink">{profile.name}</strong> — a Data Analyst with 3.7+ years of experience building intelligent dashboards,
          automating analytics and transforming business data into measurable outcomes.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#projects" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-accent-2 px-5 font-semibold text-[#061224] transition hover:brightness-110">
            Explore my projects <ArrowRight size={18} />
          </a>
          <a href={profile.resume} download="Mukul_Nidhe_Resume.pdf" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-line bg-surface px-5 font-semibold transition hover:border-accent-2">
            <Download size={18} /> Download my resume
          </a>
          <a href="#contact" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-line bg-surface px-5 font-semibold transition hover:border-accent-2">
            <Mail size={18} /> Let's connect
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-line bg-surface px-5 font-semibold transition hover:border-accent-2">
            <LinkedInIcon width={17} height={17} /> View LinkedIn
          </a>
        </div>
      </motion.div>

      {/* The "console": a BI canvas that carries the headline numbers */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="glass mt-12 overflow-hidden rounded-3xl"
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-neg/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#f5b942]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-pos/70" />
            <span className="ml-3 text-sm font-medium text-muted">career_overview.pbix</span>
          </div>
          <div className="hidden flex-wrap gap-1.5 md:flex">
            {stack.map((s) => (
              <span key={s} className="rounded-md bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent-2">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {heroStats.map((s) => (
            <div key={s.label} className="bg-bg/60 px-6 py-6 dark:bg-[#061224]/50">
              <div className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
              </div>
              <div className="mt-1.5 text-sm text-muted">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="grid gap-6 border-t border-line p-5 md:grid-cols-[1fr_280px] md:p-6">
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spark} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
                <defs>
                  <linearGradient id="heroFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={c.a} stopOpacity={0.45} />
                    <stop offset="100%" stopColor={c.a} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="m" tick={{ fill: c.muted, fontSize: 12 }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
                <Tooltip formatter={(v) => [`${v}`, 'Index']} />
                <Area type="monotone" dataKey="v" stroke={c.a} strokeWidth={2.5} fill="url(#heroFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col justify-center gap-3 text-sm">
            <p className="font-semibold text-ink">What I deliver</p>
            {['Dashboards leaders open every morning', 'Automated reports that replace manual work', 'Models that tell teams where to act first'].map((t) => (
              <p key={t} className="flex gap-2 text-muted">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent-2" />
                {t}
              </p>
            ))}
            <p className="text-[12px] text-muted/80">Trend line is decorative sample data.</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
