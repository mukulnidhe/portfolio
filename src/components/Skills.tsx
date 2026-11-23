import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { skillEvidence, skillGroups, whyMe } from '../data/profile'
import { Reveal, Section, icons } from './ui'

const ALL = 'all'

export function Skills() {
  const [tab, setTab] = useState<string>(ALL)
  const groups = tab === ALL ? skillGroups : skillGroups.filter((g) => g.id === tab)
  return (
    <Section
      id="skills"
      kicker="Technical skills"
      title="The toolkit, and where each tool has been used."
      intro="No self-rated percentages — each skill shows where it appears in my work, so you can ask me about it in an interview."
    >
      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Skill categories">
        {[{ id: ALL, name: 'All skills' }, ...skillGroups].map((g) => (
          <button
            key={g.id}
            role="tab"
            aria-selected={tab === g.id}
            onClick={() => setTab(g.id)}
            className={`min-h-11 rounded-xl border px-4 text-sm font-semibold transition ${tab === g.id ? 'border-transparent bg-accent-2 text-[#061224]' : 'border-line text-muted hover:text-ink'}`}
          >
            {g.name}
          </button>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {groups.map((g) => {
            const Icon = icons[g.icon]
            return (
              <motion.div key={g.id} layout initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.25 }} className="glass rounded-3xl p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent-2">
                    <Icon size={20} />
                  </span>
                  <h3 className="text-lg font-semibold">{g.name}</h3>
                </div>
                <ul className="space-y-2.5">
                  {g.skills.map((s) => {
                    const ev = skillEvidence[s] ?? []
                    return (
                      <li key={s} className="group flex items-center justify-between gap-3">
                        <span className="font-medium">{s}</span>
                        <span className="flex items-center gap-1.5" title={ev.join(' · ')}>
                          <span className="hidden text-[12px] text-muted sm:inline">{ev.join(' · ')}</span>
                          <span className="flex gap-0.5" aria-label={`Used in ${ev.length} place${ev.length === 1 ? '' : 's'}`}>
                            {[0, 1, 2].map((i) => (
                              <span key={i} className={`h-2 w-2 rounded-full ${i < ev.length ? 'bg-accent-2' : 'bg-line'}`} />
                            ))}
                          </span>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
      <p className="mt-6 text-[13px] text-muted">Dots show how many roles or projects on my resume use the skill (up to three).</p>
    </Section>
  )
}

export function WhyMe() {
  return (
    <Section id="why-me" kicker="Why work with me?" title="What a hiring team gets on day one.">
      <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
        {whyMe.map((w, i) => (
          <Reveal key={w.title} delay={(i % 5) * 0.04} className="bg-bg">
            <div className="h-full bg-surface p-6 transition-colors hover:bg-accent-soft">
              <CheckCircle2 size={20} className="text-accent-2" />
              <h3 className="mt-3 font-semibold leading-snug">{w.title}</h3>
              <p className="mt-2 text-[14.5px] text-muted">{w.proof}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
