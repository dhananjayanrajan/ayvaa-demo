import { pastSessions } from '@/data/professionalHistory'

export type HistorySession = (typeof pastSessions)[number]

export type ParsedDate = {
  monthKey: string
  monthFull: string
  day: number
  weekday: string
}

const MONTH_ORDER = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export const parseDate = (raw: string): ParsedDate => {
  const weekday = raw.split(',')[0]?.trim() ?? ''
  const match = raw.match(/([A-Za-z]{3,9})\s+(\d{1,2})/)
  const monthRaw = match?.[1] ?? ''
  const day = Number(match?.[2] ?? 0)
  const monthFull = MONTH_ORDER.find((m) => m.startsWith(monthRaw.slice(0, 3))) ?? monthRaw
  return { monthKey: monthFull, monthFull, day, weekday }
}

export type MonthGroup = {
  monthFull: string
  sessions: HistorySession[]
}

export const groupByMonth = (sessions: HistorySession[]): MonthGroup[] => {
  const groups = new Map<string, { sessions: HistorySession[]; day: number }>()
  for (const s of sessions) {
    const d = parseDate(s.date)
    const entry = groups.get(d.monthKey)
    if (entry) {
      entry.sessions.push(s)
    } else {
      groups.set(d.monthKey, { sessions: [s], day: d.day })
    }
  }
  return [...groups.entries()]
    .map(([monthFull, g]) => ({ monthFull, sessions: g.sessions }))
    .sort((a, b) => MONTH_ORDER.indexOf(a.monthFull) - MONTH_ORDER.indexOf(b.monthFull))
}

export const dayOf = (s: HistorySession) => parseDate(s.date).day

export const timeOf = (s: HistorySession) => {
  const parts = s.date.split('·')
  return parts[1]?.trim() ?? ''
}

export const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'notes', label: 'With notes' },
  { id: 'incidents', label: 'Incidents' },
] as const

export type FilterId = (typeof FILTERS)[number]['id']

export const matchesFilter = (s: HistorySession, filter: FilterId) => {
  if (filter === 'notes') return Boolean(s.note)
  if (filter === 'incidents') return Boolean(s.incident)
  return true
}

export const filterCounts = (sessions: HistorySession[]) => ({
  all: sessions.length,
  notes: sessions.filter((s) => s.note).length,
  incidents: sessions.filter((s) => s.incident).length,
})

export const searchSessions = (sessions: HistorySession[], rawQuery: string) => {
  const q = rawQuery.trim().toLowerCase()
  if (!q) return []
  return sessions.filter((s) => `${s.date} ${s.detail} ${s.note ?? ''} ${s.incident ?? ''}`.toLowerCase().includes(q))
}

export const buildTotals = (sessions: HistorySession[]) => ({
  sessions: sessions.length,
  notes: sessions.filter((s) => s.note).length,
  incidents: sessions.filter((s) => s.incident).length,
})

export const downloadFile = (fileName: string, lines: string[]) => {
  const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export const recordToFileLines = (s: HistorySession) => {
  const d = parseDate(s.date)
  return [
    'AYVAA CAREGIVER - SESSION RECORD',
    '',
    `Patient: Ramesh Sharma`,
    `Visit: ${d.weekday}, ${d.monthFull} ${d.day}${timeOf(s) ? `, ${timeOf(s)}` : ''}`,
    `Care delivered: ${s.detail}`,
    s.note ? `Note to family: ${s.note}` : '',
    s.incident ? `Incident: ${s.incident} (resolved)` : '',
    '',
    'Sealed record. Shareable with hospitals or partners only with consent.',
  ].filter(Boolean)
}
