// ILLUSTRATIVE SAMPLE DATA ONLY.
// Generated deterministically for the dashboard mock-ups. None of it is real NMMC,
// Coffee Day or client data, and no property- or citizen-level information is used.

function rng(seed: number) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

export const FY_MONTHS = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']
export const WARDS = ['Ward 1', 'Ward 2', 'Ward 3', 'Ward 4', 'Ward 5', 'Ward 6', 'Ward 7', 'Ward 8']

// ---------- Property-tax style collection mock-up (₹ crore) ----------
export type CollectionRow = { fy: string; ward: string; month: string; collection: number; demand: number }

const seasonal = [1.9, 1.5, 1.3, 0.8, 0.7, 0.9, 1.1, 0.8, 0.7, 0.8, 1.0, 1.9] // Apr–Jun rebate rush, March year-end push
const wardWeight = [1.35, 1.2, 1.1, 1.0, 0.95, 0.85, 0.8, 0.75]

function buildCollections(): CollectionRow[] {
  const r = rng(7)
  const rows: CollectionRow[] = []
  const years = [
    { fy: 'FY 2024-25', growth: 1 },
    { fy: 'FY 2025-26', growth: 1.11 },
  ]
  for (const y of years) {
    WARDS.forEach((ward, w) => {
      FY_MONTHS.forEach((month, m) => {
        const base = 6.2 * wardWeight[w] * seasonal[m] * y.growth
        const collection = +(base * (0.92 + r() * 0.16)).toFixed(2)
        const demand = +(collection * (1.25 + r() * 0.35)).toFixed(2)
        rows.push({ fy: y.fy, ward, month, collection, demand })
      })
    })
  }
  return rows
}
export const collections = buildCollections()

export const defaulterSegments = [
  { name: 'Regular', value: 46 },
  { name: 'Semi-Regular', value: 24 },
  { name: 'Irregular', value: 17 },
  { name: 'Defaulter', value: 13 },
]

export const paymentModes = [
  { name: 'Online / UPI', value: 58 },
  { name: 'Counter (cash)', value: 17 },
  { name: 'Cheque / DD', value: 14 },
  { name: 'Card', value: 11 },
]

// ---------- Retail sales dashboard mock-up (₹ lakh) ----------
export const REGIONS = ['North', 'South', 'East', 'West'] as const
export const CATEGORIES = ['Beverages', 'Snacks', 'Bakery', 'Merchandise'] as const
export const YEARS = ['2024', '2025'] as const
export type SalesRow = { year: string; month: number; region: string; category: string; revenue: number; profit: number; orders: number }

function buildSales(): SalesRow[] {
  const r = rng(42)
  const rows: SalesRow[] = []
  const regionW = [1.1, 1.3, 0.8, 1.0]
  const catW = [1.4, 1.0, 0.8, 0.45]
  const margin = [0.32, 0.27, 0.22, 0.4]
  YEARS.forEach((year, yi) => {
    for (let month = 0; month < 12; month++) {
      const season = 1 + 0.18 * Math.sin(((month - 2) / 12) * Math.PI * 2)
      REGIONS.forEach((region, ri) => {
        CATEGORIES.forEach((category, ci) => {
          const revenue = +(9 * regionW[ri] * catW[ci] * season * (1 + yi * 0.09) * (0.88 + r() * 0.24)).toFixed(2)
          rows.push({
            year,
            month,
            region,
            category,
            revenue,
            profit: +(revenue * margin[ci] * (0.9 + r() * 0.2)).toFixed(2),
            orders: Math.round(revenue * 38 * (0.9 + r() * 0.2)),
          })
        })
      })
    }
  })
  return rows
}
export const sales = buildSales()
export const CAL_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// ---------- Small illustrative series for project previews ----------
export const rfmSegments = [
  { segment: 'Champions', share: 18 },
  { segment: 'Loyal', share: 24 },
  { segment: 'Potential', share: 21 },
  { segment: 'Needs attention', share: 17 },
  { segment: 'At risk (top 20%)', share: 20 },
]

export const retailCategories = [
  { cat: 'Category A', yoy: 8 },
  { cat: 'Category B', yoy: 4 },
  { cat: 'Category C', yoy: 1 },
  { cat: 'Category D', yoy: -6 },
  { cat: 'Line X', yoy: -15 },
]

export const forecastSeries = [
  { m: 'M1', actual: 100 }, { m: 'M2', actual: 104 }, { m: 'M3', actual: 101 }, { m: 'M4', actual: 109 },
  { m: 'M5', actual: 112 }, { m: 'M6', actual: 110 }, { m: 'M7', actual: 117 }, { m: 'M8', actual: 119 },
  { m: 'M9', actual: 118, forecast: 118 }, { m: 'M10', forecast: 123 }, { m: 'M11', forecast: 126 }, { m: 'M12', forecast: 129 },
]

export const heroSpark = [42, 48, 45, 53, 58, 55, 63, 67, 64, 72, 78, 84].map((v, i) => ({ i, v }))
