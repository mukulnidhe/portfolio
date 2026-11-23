import { Award, Check, Copy, Download, GraduationCap, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { certifications, education, profile } from '../data/profile'
import { GitHubIcon, LinkedInIcon, Reveal, Section } from './ui'

export function Education() {
  return (
    <Section id="education" kicker="Education & certifications" title="Engineering foundations, analytics specialisation.">
      <div className="grid gap-5 md:grid-cols-3">
        <Reveal>
          <div className="glass h-full rounded-3xl p-6">
            <GraduationCap className="text-accent-2" />
            <h3 className="mt-4 text-lg font-semibold">{education.degree}</h3>
            <p className="text-muted">{education.school}</p>
            <p className="mt-3 text-sm">
              <span className="font-semibold">{education.period}</span> <span className="text-muted">· {education.grade}</span>
            </p>
          </div>
        </Reveal>
        {certifications.map((c, i) => (
          <Reveal key={c.name} delay={(i + 1) * 0.06}>
            <div className="glass h-full rounded-3xl p-6">
              <Award className="text-accent-2" />
              <h3 className="mt-4 text-lg font-semibold">{c.name}</h3>
              <p className="text-muted">{c.issuer}</p>
              <p className="mt-3 text-sm font-semibold">{c.year}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

// Optional: set VITE_FORMSPREE_ID (e.g. "xyzabcd") in Vercel to deliver form messages to your inbox.
// Without it, the form opens the visitor's email app with the message pre-filled.
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined

type Status = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent' } | { kind: 'mailto' } | { kind: 'error'; msg: string }

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [copied, setCopied] = useState('')

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const body = `Hi Mukul,\n\n${form.message}\n\n— ${form.name}${form.company ? `, ${form.company}` : ''}\n${form.email}`

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (FORMSPREE_ID) {
      setStatus({ kind: 'sending' })
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error(String(res.status))
        setStatus({ kind: 'sent' })
        setForm({ name: '', email: '', company: '', message: '' })
      } catch {
        setStatus({ kind: 'error', msg: `The message could not be sent. Please email ${profile.email} directly.` })
      }
      return
    }
    const subject = `Opportunity for Mukul Nidhe${form.company ? ` — ${form.company}` : ''}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setStatus({ kind: 'mailto' })
  }

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(''), 1600)
    } catch {
      /* clipboard blocked: the text stays visible to copy by hand */
    }
  }

  const field = 'min-h-12 w-full rounded-xl border border-line bg-surface-strong px-4 text-base text-ink placeholder:text-muted/70 focus:border-accent-2 focus:outline-none'

  return (
    <Section id="contact" kicker="Contact" title="Let's turn data into business impact." intro="I'm always interested in opportunities where I can apply analytics, business intelligence and problem-solving to create meaningful business outcomes.">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <div className="space-y-4">
            {[
              { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
              { icon: Phone, label: 'Phone', value: profile.phone, href: profile.phoneHref },
            ].map((c) => (
              <div key={c.label} className="glass flex items-center gap-4 rounded-2xl p-4">
                <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-accent-soft text-accent-2">
                  <c.icon size={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] text-muted">{c.label}</p>
                  <a href={c.href} className="block truncate font-semibold hover:text-accent-2">
                    {c.value}
                  </a>
                </div>
                <button onClick={() => copy(c.value, c.label)} aria-label={`Copy ${c.label.toLowerCase()}`} className="grid h-11 w-11 flex-none place-items-center rounded-xl border border-line text-muted hover:text-ink">
                  {copied === c.label ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            ))}
            <div className="grid gap-3 sm:grid-cols-3">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="glass flex min-h-12 items-center justify-center gap-2 rounded-2xl font-semibold hover:border-accent-2">
                <LinkedInIcon width={17} height={17} /> LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="glass flex min-h-12 items-center justify-center gap-2 rounded-2xl font-semibold hover:border-accent-2">
                <GitHubIcon width={17} height={17} /> GitHub
              </a>
              <a href={profile.resume} download="Mukul_Nidhe_Resume.pdf" className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-accent-2 font-semibold text-[#061224] hover:brightness-110">
                <Download size={17} /> Resume
              </a>
            </div>
            <div className="glass rounded-2xl p-5">
              <p className="text-[13px] text-muted">Target roles</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {profile.targetRoles.map((r) => (
                  <span key={r} className="rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent-2">
                    {r}
                  </span>
                ))}
              </div>
              <p className="mt-4 flex items-center gap-2 text-[13px] text-muted">
                <MapPin size={15} /> Preferred locations
              </p>
              <p className="mt-1 font-medium">{profile.locations.join(' · ')}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form onSubmit={submit} className="glass space-y-4 rounded-3xl p-6 sm:p-8" noValidate={false}>
            <h3 className="text-lg font-semibold">Send me a message</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-1.5 text-sm font-medium">
                <span>Your name</span>
                <input required value={form.name} onChange={set('name')} className={field} autoComplete="name" placeholder="Priya Sharma" />
              </label>
              <label className="space-y-1.5 text-sm font-medium">
                <span>Work email</span>
                <input required type="email" value={form.email} onChange={set('email')} className={field} autoComplete="email" placeholder="priya@company.com" />
              </label>
            </div>
            <label className="block space-y-1.5 text-sm font-medium">
              <span>Company & role (optional)</span>
              <input value={form.company} onChange={set('company')} className={field} autoComplete="organization" placeholder="Company — Senior Data Analyst opening" />
            </label>
            <label className="block space-y-1.5 text-sm font-medium">
              <span>Message</span>
              <textarea required rows={5} value={form.message} onChange={set('message')} className={`${field} py-3`} placeholder="Tell me about the role or project…" />
            </label>
            <button type="submit" disabled={status.kind === 'sending'} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent-2 px-5 font-semibold text-[#061224] transition hover:brightness-110 disabled:opacity-60">
              <Send size={17} /> {status.kind === 'sending' ? 'Sending…' : FORMSPREE_ID ? 'Send message' : 'Send via email'}
            </button>
            <div aria-live="polite" className="text-sm">
              {status.kind === 'sent' && <p className="text-pos">Thanks — your message was delivered. I'll reply soon.</p>}
              {status.kind === 'error' && <p className="text-neg">{status.msg}</p>}
              {status.kind === 'mailto' && (
                <div className="space-y-2 text-muted">
                  <p>Your email app should have opened with this message ready to send. If it didn't, copy it and email {profile.email}.</p>
                  <button type="button" onClick={() => copy(body, 'msg')} className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-line px-3 font-medium text-ink">
                    {copied === 'msg' ? <Check size={14} /> : <Copy size={14} />} {copied === 'msg' ? 'Copied' : 'Copy message'}
                  </button>
                </div>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© {new Date().getFullYear()} Mukul Nidhe · Data Analyst | Business Analyst | Power BI Developer</p>
        <p>Dashboard visuals on this site use illustrative sample data.</p>
      </div>
    </footer>
  )
}
