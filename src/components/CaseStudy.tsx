import { ArrowRight, BrainCircuit, Database, FileSpreadsheet, Gauge, MessagesSquare, ShieldCheck, TrendingDown, TrendingUp } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { collections, defaulterSegments, FY_MONTHS, paymentModes, WARDS } from '../data/sample'
import { inr, useChartColors } from '../lib/theme'
import { Reveal, SampleNote, Section, Segmented, Select } from './ui'

const pipeline = [
  { icon: Database, title: 'Raw sources', text: 'Collections, outstanding demand, property master' },
  { icon: ShieldCheck, title: 'Python validation', text: 'Payment links & mobile numbers, 1M+ rows per run' },
  { icon: FileSpreadsheet, title: 'SQL transformation', text: 'Optimised multi-source extract, clean & model' },
  { icon: Gauge, title: 'KPI layer & Power BI', text: '22+ KPIs, DAX measures, ward & FY views' },
  { icon: BrainCircuit, title: 'Segmentation & LightGBM', text: 'Payer segments + payment-probability scores' },
  { icon: MessagesSquare, title: 'Action', text: 'Prioritised lists for SMS & WhatsApp campaigns' },
]

const FYS = ['FY 2025-26', 'FY 2024-25'] as const
type FY = (typeof FYS)[number]
const VIEWS = ['Monthly', 'Quarterly'] as const

function pct(a: number, b: number) {
  return b === 0 ? 0 : ((a - b) / b) * 100
}

function Delta({ v, label }: { v: number; label: string }) {
  const up = v >= 0
  return (
    <span className={`inline-flex items-center gap-1 text-[13px] font-semibold ${up ? 'text-pos' : 'text-neg'}`}>
      {up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
      {up ? '+' : ''}
      {v.toFixed(1)}% <span className="font-normal text-muted">{label}</span>
    </span>
  )
}

function PTaxDashboard() {
  const c = useChartColors()
  const [fy, setFy] = useState<FY>('FY 2025-26')
  const [ward, setWard] = useState('All wards')
  const [view, setView] = useState<(typeof VIEWS)[number]>('Monthly')
  const [momMonth, setMomMonth] = useState('Feb')

  const prevFy: FY | null = fy === 'FY 2025-26' ? 'FY 2024-25' : null
  const inWard = (r: { ward: string }) => ward === 'All wards' || r.ward === ward

  const d = useMemo(() => {
    const cur = collections.filter((r) => r.fy === fy && inWard(r))
    const prev = prevFy ? collections.filter((r) => r.fy === prevFy && inWard(r)) : []
    const sum = (rows: typeof cur, k: 'collection' | 'demand') => rows.reduce((a, r) => a + r[k], 0)
    const total = sum(cur, 'collection')
    const demand = sum(cur, 'demand')
    const prevTotal = sum(prev, 'collection')
    const byMonth = FY_MONTHS.map((m) => ({
      m,
      current: +sum(cur.filter((r) => r.month === m), 'collection').toFixed(1),
      previous: prevFy ? +sum(prev.filter((r) => r.month === m), 'collection').toFixed(1) : undefined,
    }))
    const byQuarter = [0, 1, 2, 3].map((q) => ({
      m: `Q${q + 1}`,
      current: +byMonth.slice(q * 3, q * 3 + 3).reduce((a, r) => a + r.current, 0).toFixed(1),
      previous: prevFy ? +byMonth.slice(q * 3, q * 3 + 3).reduce((a, r) => a + (r.previous ?? 0), 0).toFixed(1) : undefined,
    }))
    const byWard = WARDS.map((w) => {
      const rows = collections.filter((r) => r.fy === fy && r.ward === w)
      return { ward: w.replace('Ward ', 'W'), full: w, collection: +sum(rows, 'collection').toFixed(1) }
    })
    const mi = FY_MONTHS.indexOf(momMonth)
    const mom = mi > 0 ? pct(byMonth[mi].current, byMonth[mi - 1].current) : null
    return { total, outstanding: demand - total, efficiency: (total / demand) * 100, yoy: prevFy ? pct(total, prevTotal) : null, mom, byMonth, byQuarter, byWard }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fy, ward, momMonth])

  const trend = view === 'Monthly' ? d.byMonth : d.byQuarter
  const kpis = [
    { label: 'Total collection', value: inr(d.total, 'Cr'), delta: d.yoy !== null ? <Delta v={d.yoy} label="YoY" /> : <span className="text-[13px] text-muted">No prior FY in sample</span> },
    { label: 'Outstanding amount', value: inr(d.outstanding, 'Cr'), delta: <span className="text-[13px] text-muted">Demand − collection</span> },
    { label: 'Collection efficiency', value: `${d.efficiency.toFixed(1)}%`, delta: <span className="text-[13px] text-muted">Collection ÷ demand</span> },
    {
      label: `MoM growth — ${momMonth}`,
      value: d.mom === null ? '—' : `${d.mom >= 0 ? '+' : ''}${d.mom.toFixed(1)}%`,
      delta: d.mom === null ? <span className="text-[13px] text-muted">April starts the FY</span> : <span className="text-[13px] text-muted">vs {FY_MONTHS[FY_MONTHS.indexOf(momMonth) - 1]}</span>,
    },
  ]

  return (
    <div className="glass overflow-hidden rounded-3xl">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line p-5 sm:p-6">
        <div>
          <p className="text-sm font-semibold">Property Tax Revenue Dashboard — mock-up</p>
          <SampleNote>Illustrative sample data with anonymised wards — not actual NMMC figures. Values in ₹ crore.</SampleNote>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <Select label="Financial year" value={fy} options={FYS} onChange={(v) => setFy(v as FY)} />
          <Select label="Ward" value={ward} options={['All wards', ...WARDS]} onChange={setWard} />
          <Select label="MoM month" value={momMonth} options={FY_MONTHS.slice(1)} onChange={setMomMonth} />
        </div>
      </div>

      <div className="grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-surface-strong/70 p-5">
            <p className="text-[13px] text-muted">{k.label}</p>
            <p className="tnum mt-1 text-[1.7rem] font-semibold tracking-tight">{k.value}</p>
            <div className="mt-1">{k.delta}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <p className="font-semibold">{view} collection trend</p>
            <Segmented label="Trend granularity" value={view} options={VIEWS} onChange={setView} />
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke={c.grid} vertical={false} />
                <XAxis dataKey="m" tick={{ fill: c.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: c.muted, fontSize: 12 }} axisLine={false} tickLine={false} width={44} />
                <Tooltip formatter={(v) => inr(Number(v), 'Cr')} />
                <Legend wrapperStyle={{ fontSize: 13, color: c.muted }} />
                <Line name={fy} type="monotone" dataKey="current" stroke={c.a} strokeWidth={2.5} dot={false} />
                {prevFy && <Line name={prevFy} type="monotone" dataKey="previous" stroke={c.muted} strokeDasharray="5 4" strokeWidth={1.8} dot={false} />}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <p className="mb-1 font-semibold">Ward-wise collection</p>
          <p className="mb-3 text-[13px] text-muted">Click a bar to filter the dashboard.</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={d.byWard} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
                <CartesianGrid stroke={c.grid} vertical={false} />
                <XAxis dataKey="ward" tick={{ fill: c.muted, fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: c.muted, fontSize: 12 }} axisLine={false} tickLine={false} width={44} />
                <Tooltip formatter={(v) => inr(Number(v), 'Cr')} cursor={{ fill: c.grid }} />
                <Bar dataKey="collection" name="Collection" radius={[6, 6, 0, 0]} cursor="pointer" onClick={(e: { payload?: { full: string } }) => e.payload && setWard(ward === e.payload.full ? 'All wards' : e.payload.full)}>
                  {d.byWard.map((w) => (
                    <Cell key={w.full} fill={ward === 'All wards' || ward === w.full ? c.b : c.grid} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <p className="mb-3 font-semibold">Payer segmentation</p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="h-48 w-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={defaulterSegments} dataKey="value" nameKey="name" innerRadius={52} outerRadius={84} paddingAngle={2} stroke="none">
                    {defaulterSegments.map((s, i) => (
                      <Cell key={s.name} fill={[c.a, c.b, c.d, c.neg][i]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => `${v}% of properties`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="space-y-2 text-sm">
              {defaulterSegments.map((s, i) => (
                <li key={s.name} className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-sm" style={{ background: [c.a, c.b, c.d, c.neg][i] }} />
                  <span className="w-28">{s.name}</span>
                  <span className="tnum font-semibold">{s.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <p className="mb-3 font-semibold">Payment mode analysis</p>
          <ul className="space-y-3">
            {paymentModes.map((p) => (
              <li key={p.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{p.name}</span>
                  <span className="tnum font-semibold">{p.value}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-accent-soft">
                  <div className="h-full rounded-full bg-gradient-to-r from-accent-2 to-[#3b82f6]" style={{ width: `${p.value}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function CaseStudy() {
  return (
    <Section
      id="case-study"
      kicker="Featured case study · NMMC Property Tax"
      title="Enterprise Property Tax Analytics & Revenue Intelligence Platform"
      intro="My current work at Foxberry Technology for the Navi Mumbai Municipal Corporation: one platform that turns property-tax data into collection decisions — who owes, where revenue is slipping and whom to contact first."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ['358K+', 'property records analysed'],
          ['22+', 'KPIs tracked'],
          ['8', 'wards in ward-level reporting'],
          ['1M+', 'rows validated in a single run'],
        ].map(([v, l], i) => (
          <Reveal key={l} delay={i * 0.05}>
            <div className="glass rounded-2xl p-5">
              <p className="tnum text-4xl font-semibold tracking-tight text-accent-2">{v}</p>
              <p className="mt-1 text-muted">{l}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          { h: 'The problem', p: 'Collection, outstanding and property data sat in separate sources. Defaulters, payment trends and revenue gaps were hard to see, and recovery lists were built by hand.' },
          { h: 'What I built', p: 'Python validation tools, optimised SQL pipelines, a 22+ KPI layer, Power BI dashboards with DAX and KPI cards, automated ward-wise defaulter lists, payer segmentation and a LightGBM payment-prediction model.' },
          { h: 'The result', p: 'Leadership gets live visibility into property-wise collections, outstanding dues, ward-wise pending amounts and fiscal-year performance — and recovery teams get prioritised lists instead of hours of manual work.' },
        ].map((b, i) => (
          <Reveal key={b.h} delay={i * 0.06}>
            <div className="h-full border-t-2 border-accent-2 pt-4">
              <h3 className="text-lg font-semibold">{b.h}</h3>
              <p className="mt-2 text-muted">{b.p}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-12">
          <p className="mb-4 font-semibold">How the platform works</p>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {pipeline.map((s, i) => (
              <li key={s.title} className="glass relative rounded-2xl p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-accent-2">
                    <s.icon size={18} />
                  </span>
                  {i < pipeline.length - 1 && <ArrowRight size={16} className="hidden text-muted lg:block" />}
                </div>
                <p className="font-semibold leading-snug">{s.title}</p>
                <p className="mt-1 text-[13.5px] text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-12">
          <PTaxDashboard />
        </div>
      </Reveal>

      <Reveal>
        <div className="glass mt-6 grid gap-6 rounded-3xl p-6 md:grid-cols-[auto_1fr] md:items-center">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent-soft text-accent-2">
            <BrainCircuit size={28} />
          </span>
          <div>
            <h3 className="text-lg font-semibold">AI/ML payment prediction & recovery optimisation</h3>
            <p className="mt-1 text-muted">
              A LightGBM classification model predicts each property's payment probability. Built with Pandas, NumPy and Scikit-learn (cleaning, feature
              engineering and selection), tuned with Optuna, and evaluated on AUC, Gini, KS statistics and cross-validation. Its prioritised lists drive targeted SMS
              and WhatsApp campaigns.
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
