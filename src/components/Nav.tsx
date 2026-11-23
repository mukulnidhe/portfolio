import { AnimatePresence, motion } from 'framer-motion'
import { Download, Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { useTheme } from '../lib/theme'

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#case-study', label: 'Case study' },
  { href: '#projects', label: 'Projects' },
  { href: '#analytics', label: 'Live demo' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const ids = links.map((l) => l.href.slice(1))
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  return (
    <header className={`sticky top-0 z-40 transition-all ${scrolled ? 'glass border-x-0 border-t-0' : 'border-b border-transparent'}`}>
      <nav className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-5 sm:px-8" aria-label="Main">
        <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent-2 to-[#3b82f6] text-sm font-bold text-[#061224]">MN</span>
          <span className="hidden sm:inline">Mukul Nidhe</span>
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active === l.href.slice(1) ? 'text-accent-2' : 'text-muted hover:text-ink'
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="grid h-11 w-11 place-items-center rounded-xl border border-line text-muted transition-colors hover:text-ink"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a
            href={profile.resume}
            download="Mukul_Nidhe_Resume.pdf"
            className="hidden min-h-11 items-center gap-2 rounded-xl bg-accent-2 px-4 text-sm font-semibold text-[#061224] transition hover:brightness-110 sm:inline-flex"
          >
            <Download size={16} /> Resume
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Open menu"
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-xl border border-line lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass mx-4 mb-3 overflow-hidden rounded-2xl p-2 lg:hidden"
          >
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 font-medium hover:bg-accent-soft">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href={profile.resume} download="Mukul_Nidhe_Resume.pdf" className="block rounded-xl px-4 py-3 font-medium text-accent-2 hover:bg-accent-soft">
                Download resume (PDF)
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
