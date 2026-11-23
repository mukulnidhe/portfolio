import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'dark' | 'light'
const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({ theme: 'dark', toggle: () => {} })

function initialTheme(): Theme {
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    /* storage unavailable */
  }
  return 'dark'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(initialTheme)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* ignore */
    }
  }, [theme])
  return (
    <ThemeCtx.Provider value={{ theme, toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')) }}>
      {children}
    </ThemeCtx.Provider>
  )
}

export const useTheme = () => useContext(ThemeCtx)

// SVG presentation attributes cannot read CSS variables, so charts get hex values per theme.
export function useChartColors() {
  const { theme } = useTheme()
  return theme === 'dark'
    ? { ink: '#e8f1ff', muted: '#93a8c6', grid: 'rgba(148,190,255,0.12)', a: '#38d6f5', b: '#3b82f6', c: '#8fd3ff', d: '#6366f1', neg: '#ff6b95', pos: '#4ade9a', series: ['#38d6f5', '#3b82f6', '#8fd3ff', '#6366f1', '#ff6b95'] }
    : { ink: '#0a1b33', muted: '#4b5e7a', grid: 'rgba(15,45,90,0.1)', a: '#0891b2', b: '#0a6fc2', c: '#38bdf8', d: '#4f46e5', neg: '#d6336c', pos: '#0f8a5f', series: ['#0891b2', '#0a6fc2', '#38bdf8', '#4f46e5', '#d6336c'] }
}

export const inr = (n: number, unit: 'Cr' | 'L') => `₹${n.toLocaleString('en-IN', { maximumFractionDigits: n < 100 ? 1 : 0 })} ${unit}`
