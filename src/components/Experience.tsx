import { AnimatePresence, motion } from 'framer-motion'
import { Building2, ChevronDown, MapPin } from 'lucide-react'
import { useState } from 'react'
import { experience } from '../data/profile'
import { Badge, Reveal, Section } from './ui'

export default function Experience() {
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true, 1: true })
  return (
    <Section id="experience" kicker="Professional experience" title="3.7+ years turning operational data into decisions.">
      <ol className="relative ml-3 border-l border-line">
        {experience.map((job, i) => {
          const isOpen = open[i]
          const shown = isOpen ? job.highlights : job.highlights.slice(0, 2)
          return (
            <li key={job.company} className="relative mb-10 pl-8 last:mb-0">
              <span className="absolute -left-[9px] top-6 h-4 w-4 rounded-full border-4 border-bg bg-accent-2 shadow-[0_0_0_4px_var(--accent-soft)]" />
              <Reveal>
                <article className="glass rounded-3xl p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-accent-2">{job.period}</p>
                      <h3 className="mt-1 text-2xl font-semibold tracking-tight">{job.role}</h3>
                      <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-muted">
                        <span className="inline-flex items-center gap-1.5"><Building2 size={16} /> {job.company}</span>
                        <span className="inline-flex items-center gap-1.5"><MapPin size={16} /> {job.location}</span>
                      </p>
                    </div>
                    {i === 0 && <Badge tone="accent">Current role</Badge>}
                  </div>
                  <p className="mt-4 rounded-xl bg-accent-soft px-4 py-2.5 text-[15px] font-medium">{job.context}</p>
                  <ul className="mt-5 space-y-3">
                    <AnimatePresence initial={false}>
                      {shown.map((h) => (
                        <motion.li
                          key={h}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex gap-3 text-[15.5px]"
                        >
                          <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-accent-2" />
                          <span>{h}</span>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                  <button
                    onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))}
                    aria-expanded={isOpen}
                    className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent-2"
                  >
                    {isOpen ? 'Show less' : `Show all ${job.highlights.length} achievements`}
                    <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-5">
                    {job.tools.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                </article>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
