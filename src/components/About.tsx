import { Briefcase, GraduationCap, MapPin, Target } from 'lucide-react'
import { aboutStrengths, profile } from '../data/profile'
import { Reveal, Section, icons } from './ui'

const facts = [
  { icon: Briefcase, label: 'Currently', value: 'Data Analyst, Foxberry Technology (NMMC project)' },
  { icon: Target, label: 'Focus', value: 'Power BI · SQL · Python · KPI analytics' },
  { icon: MapPin, label: 'Based in', value: profile.location },
  { icon: GraduationCap, label: 'Education', value: 'B.Tech, CGPA 8.37' },
]

export default function About() {
  return (
    <Section
      id="about"
      kicker="About me"
      title="An analyst who starts with the business question and ends with a decision."
      intro={profile.summary}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="grid gap-4 sm:grid-cols-2">
          {aboutStrengths.map((s, i) => {
            const Icon = icons[s.icon]
            return (
              <Reveal key={s.title} delay={i * 0.04}>
                <div className="glass group h-full rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1">
                  <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent-2 transition-colors group-hover:bg-accent-2 group-hover:text-[#061224]">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="mt-1 text-[15px] text-muted">{s.text}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
        <Reveal delay={0.1}>
          <aside className="glass sticky top-24 rounded-2xl p-6">
            <h3 className="font-semibold">At a glance</h3>
            <dl className="mt-4 space-y-4">
              {facts.map((f) => (
                <div key={f.label} className="flex gap-3">
                  <f.icon size={18} className="mt-0.5 flex-none text-accent-2" />
                  <div>
                    <dt className="text-[13px] text-muted">{f.label}</dt>
                    <dd className="font-medium">{f.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <div className="mt-6 border-t border-line pt-5">
              <p className="text-[13px] text-muted">Career path</p>
              <ol className="mt-3 space-y-3 border-l border-line pl-4 text-sm">
                <li><span className="font-medium">2019–2022</span> <span className="text-muted">· B.Tech, Mechanical Engineering</span></li>
                <li><span className="font-medium">2023–2025</span> <span className="text-muted">· Data Analyst (Strategy), Coffee Day Global</span></li>
                <li><span className="font-medium">2025–now</span> <span className="text-muted">· Data Analyst, Foxberry Technology</span></li>
              </ol>
            </div>
          </aside>
        </Reveal>
      </div>
    </Section>
  )
}
