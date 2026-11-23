import { Check, Copy, RotateCcw, TrendingDown, TrendingUp } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { CAL_MONTHS, CATEGORIES, REGIONS, sales, YEARS } from '../data/sample'
import { inr, useChartColors } from '../lib/theme'
import { Reveal, SampleNote, Section, Segmented } from './ui'

const DAX = `Total Revenue = SUM ( Sales[Revenue] )

Profit Margin % =
DIVIDE ( SUM ( Sales[Profit] ), [Total Revenue] )

Revenue PY =
CALCULATE ( [Total Revenue], SAMEPERIODLASTYEAR ( 'Date'[Date] ) )

Revenue YoY % =
DIVIDE ( [Total Revenue] - [Revenue PY], [Revenue PY] )

Category Share % =
DIVIDE (
    [Total Revenue],
    CALCULATE ( [Total Revenue], ALL ( Sales[Category] ) )
)`

const GRAINS = ['Monthly', 'Quarterly'] as const

export default function Showcase() {
  const c = useChartColors()
  const [year, setYear] = useState<string>('2025')
  const [region, setRegion] = useState<string>('All')
  const [cats, setCats] = useState<string[]>([...CATEGORIES])
  const [grain, setGrain] = useState<(typeof GRAINS)[number]>('Monthly')
  const [showDax, setShowDax] = useState(false)
  const [copied, setCopied] = useState(false)

  const filtered = (y: string) => sales.filter((r) => r.year === y && (region === 'All' || r.region === region) && cats.includes(r.category))

  const m = useMemo(() => {
    const cur = filtered(year)
    const prev = year === '2025' ? filtered('2024') : []
    const s = (rows: typeof cur, k: 'revenue' | 'profit' | 'orders') => rows.reduce((a, r) => a + r[k], 0)
    const rev = s(cur, 'revenue')
    const profit = s(cur, 'profit')
    const orders = s(cur, 'orders')
    const yoy = (a: number, b: number) => (prev.length && b ? ((a - b) / b) * 100 : null)
    const monthly = CAL_MONTHS.map((name, i) => ({ name, revenue: +s(cur.filter((r) => r.month === i), 'revenue').toFixed(1) }))
    const quarterly = [0, 1, 2, 3].map((q) => ({ name: `Q${q + 1}`, revenue: +monthly.slice(q * 3, q * 3 + 3).reduce((a, r) => a + r.revenue, 0).toFixed(1) }))
    const allCats = sales.filter((r) => r.year === year && (region === 'All' || r.region === region))
    const total = s(allCats, 'revenue')
    const byCat = CATEGORIES.map((cat) => ({ name: cat, value: +s(allCats.filter((r) => r.category === cat), 'revenue').toFixed(1), share: (s(allCats.filter((r) => r.category === cat), 'revenue') / total) * 100 }))
    const byRegion = REGIONS.map((reg) => {
      const rows = sales.filter((r) => r.year === year && r.region === reg && cats.includes(r.category))
      const p = year === '2025' ? sales.filter((r) => r.year === '2024' && r.region === reg && cats.includes(r.category)) : []
      return { name: reg, revenue: +s(rows, 'revenue').toFixed(1), growth: yoy(s(rows, 'revenue'), s(p, 'revenue')) }
    })
    return {
      kpis: [
        { label: 'Revenue', value: inr(rev, 'L'), d: yoy(rev, s(prev, 'revenue')) },
        { label: 'Profit', value: inr(profit, 'L'), d: yoy(profit, s(prev, 'profit')) },
        { label: 'Profit margin', value: `${((profit / rev) * 100).toFixed(1)}%`, d: null as number | null },
        { label: 'Orders', value: Math.round(orders).toLocaleString('en-IN'), d: yoy(orders, s(prev, 'orders')) },
      ],
      monthly,
      quarterly,
      byCat,
      byRegion,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, region, cats])

  const toggleCat = (cat: string) =>
    setCats((cs) => (cs.includes(cat) ? (cs.length > 1 ? cs.filter((x) => x !== cat) : cs) : [...cs, cat]))
  const reset = () => {
    setYear('2025')
    setRegion('All')
    setCats([...CATEGORIES])
  }
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(DAX)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Section
      id="analytics"
      kicker="Interactive analytics showcase"
      title="Try a dashboard the way a stakeholder would."
      intro="Slice by year, region and category. Every visual cross-filters the way a Power BI report does. Click a category in the donut to isolate it."
    >
      <Reveal>
        <div className="glass overflow-hidden rounded-3xl">
          <div className="flex flex-col gap-4 border-b border-line p-5 sm:p-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-semibold">Retail Sales Performance — sample report</p>
              <SampleNote>Illustrative sample data. Revenue and profit in ₹ lakh.</SampleNote>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Segmented label="Year" value={year} options={YEARS} onChange={setYear} />
              <Segmented label="Region" value={region} options={['All', ...REGIONS]} onChange={setRegion} />
              <button onClick={reset} className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-line px-3 text-sm font-medium text-muted hover:text-ink">
                <RotateCcw size={15} /> Reset
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 border-b border-line px-5 py-3 sm:px-6" role="group" aria-label="Category slicer">
            {CATEGORIES.map((cat, i) => {
              const on = cats.includes(cat)
              return (
                <button
                  key={cat}
                  onClick={() => toggleCat(cat)}
                  aria-pressed={on}
                  className={`inline-flex min-h-9 items-center gap-2 rounded-full border px-3 text-sm font-medium transition ${on ? 'border-transparent bg-accent-soft text-ink' : 'border-line text-muted line-through'}`}
                >
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.series[i] }} />
                  {cat}
                </button>
              )
            })}
          </div>

          <div className="grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-4">
            {m.kpis.map((k) => (
              <div key={k.label} className="bg-surface-strong/70 p-5">
                <p className="text-[13px] text-muted">{k.label}</p>
                <p className="tnum mt-1 text-[1.7rem] font-semibold tracking-tight">{k.value}</p>
                {k.d === null ? (
                  <p className="text-[13px] text-muted">{k.label === 'Profit margin' ? 'Profit ÷ revenue' : 'No prior year in sample'}</p>
                ) : (
                  <p className={`inline-flex items-center gap-1 text-[13px] font-semibold ${k.d >= 0 ? 'text-pos' : 'text-neg'}`}>
                    {k.d >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {k.d >= 0 ? '+' : ''}
                    {k.d.toFixed(1)}% <span className="font-normal text-muted">vs 2024</span>
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <p className="font-semibold">Revenue trend</p>
                <Segmented label="Trend granularity" value={grain} options={GRAINS} onChange={setGrain} />
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  {grain === 'Monthly' ? (
                    <AreaChart data={m.monthly} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={c.b} stopOpacity={0.4} />
                          <stop offset="100%" stopColor={c.b} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke={c.grid} vertical={false} />
                      <XAxis dataKey="name" tick={{ fill: c.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: c.muted, fontSize: 12 }} axisLine={false} tickLine={false} width={44} />
                      <Tooltip formatter={(v) => inr(Number(v), 'L')} />
                      <Area type="monotone" dataKey="revenue" name="Revenue" stroke={c.b} strokeWidth={2.5} fill="url(#revFill)" />
                    </AreaChart>
                  ) : (
                    <BarChart data={m.quarterly} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                      <CartesianGrid stroke={c.grid} vertical={false} />
                      <XAxis dataKey="name" tick={{ fill: c.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: c.muted, fontSize: 12 }} axisLine={false} tickLine={false} width={44} />
                      <Tooltip formatter={(v) => inr(Number(v), 'L')} cursor={{ fill: c.grid }} />
                      <Bar dataKey="revenue" name="Revenue" fill={c.b} radius={[8, 8, 0, 0]} />
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <p className="mb-3 font-semibold">Revenue contribution by category</p>
              <div className="flex flex-wrap items-center gap-4">
                <div className="h-52 w-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={m.byCat}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={58}
                        outerRadius={92}
                        paddingAngle={2}
                        stroke="none"
                        cursor="pointer"
                        onClick={(e: { name?: string }) => e.name && setCats((cs) => (cs.length === 1 && cs[0] === e.name ? [...CATEGORIES] : [e.name as string]))}
                      >
                        {m.byCat.map((x, i) => (
                          <Cell key={x.name} fill={c.series[i]} opacity={cats.includes(x.name) ? 1 : 0.25} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v) => inr(Number(v), 'L')} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <ul className="space-y-2 text-sm">
                  {m.byCat.map((x, i) => (
                    <li key={x.name} className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-sm" style={{ background: c.series[i] }} />
                      <span className="w-24">{x.name}</span>
                      <span className="tnum font-semibold">{x.share.toFixed(1)}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="lg:col-span-2">
              <p className="mb-3 font-semibold">Regional performance</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {m.byRegion.map((r) => {
                  const max = Math.max(...m.byRegion.map((x) => x.revenue))
                  const active = region === 'All' || region === r.name
                  return (
                    <button key={r.name} onClick={() => setRegion(region === r.name ? 'All' : r.name)} aria-pressed={region === r.name} className={`rounded-2xl border p-4 text-left transition ${active ? 'border-line bg-surface' : 'border-line opacity-45'} hover:border-accent-2`}>
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-semibold">{r.name}</span>
                        {r.growth !== null && (
                          <span className={`tnum text-[13px] font-semibold ${r.growth >= 0 ? 'text-pos' : 'text-neg'}`}>
                            {r.growth >= 0 ? '+' : ''}
                            {r.growth.toFixed(1)}%
                          </span>
                        )}
                      </div>
                      <p className="tnum mt-1 text-xl font-semibold">{inr(r.revenue, 'L')}</p>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-accent-soft">
                        <div className="h-full rounded-full bg-gradient-to-r from-accent-2 to-[#3b82f6] transition-all duration-500" style={{ width: `${(r.revenue / max) * 100}%` }} />
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="border-t border-line p-5 sm:p-6">
            <button onClick={() => setShowDax((s) => !s)} aria-expanded={showDax} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent-2">
              {showDax ? 'Hide' : 'Show'} the DAX measures behind these KPIs
            </button>
            {showDax && (
              <div className="relative mt-3">
                <button onClick={copy} className="absolute right-3 top-3 inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line bg-surface-strong px-3 text-[13px] font-medium">
                  {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
                </button>
                <pre className="overflow-x-auto rounded-2xl border border-line bg-bg p-5 text-[13.5px] leading-relaxed text-ink">
                  <code>{DAX}</code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
