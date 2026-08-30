export interface ReportHighlight {
  label: string
  value: string
}

export interface CareReport {
  id: string
  month: string
  label: string
  visitsCount: number
  sealedOn: string
  author: string
  authorInitial: string
  trend: 'improving' | 'stable'
  trendLabel: string
  highlights: ReportHighlight[]
  conclusion: string
}

export const REPORTS: CareReport[] = [
  {
    id: 'rep-3',
    month: 'March 2026',
    label: 'Month 3 report',
    visitsCount: 13,
    sealedOn: '1 April',
    author: 'Lakshmi Reddy',
    authorInitial: 'L',
    trend: 'improving',
    trendLabel: 'Improving',
    highlights: [
      { label: 'Visits completed', value: '13 of 13' },
      { label: 'Walking goal', value: '15 min unaided' },
      { label: 'Blood pressure', value: '126 over 78 average' },
      { label: 'Incidents', value: 'None recorded' },
    ],
    conclusion:
      'Ramesh walked the full fifteen minutes without support. Recommend continuing the current plan into month four.',
  },
  {
    id: 'rep-2',
    month: 'February 2026',
    label: 'Month 2 report',
    visitsCount: 12,
    sealedOn: '1 March',
    author: 'Lakshmi Reddy',
    authorInitial: 'L',
    trend: 'improving',
    trendLabel: 'Improving',
    highlights: [
      { label: 'Visits completed', value: '12 of 12' },
      { label: 'Walking goal', value: '12 min with light support' },
      { label: 'Blood pressure', value: '131 over 81 average' },
      { label: 'Incidents', value: 'None recorded' },
    ],
    conclusion:
      'Steady progress on mobility. Sodium target met on all but two days, both logged honestly by the family.',
  },
  {
    id: 'rep-1',
    month: 'January 2026',
    label: 'Month 1 report',
    visitsCount: 13,
    sealedOn: '1 February',
    author: 'Lakshmi Reddy',
    authorInitial: 'L',
    trend: 'stable',
    trendLabel: 'Stable',
    highlights: [
      { label: 'Visits completed', value: '13 of 13' },
      { label: 'Walking goal', value: '8 min with cane' },
      { label: 'Blood pressure', value: '138 over 86 average' },
      { label: 'Incidents', value: 'One near fall, resolved' },
    ],
    conclusion:
      'Baseline month. Goals set conservatively and all measured. Blood pressure responding to the morning dose timing.',
  },
]

export const REPORTS_LATEST: CareReport = REPORTS[0]

export const totalReportedVisits = (): number => REPORTS.reduce((sum, r) => sum + r.visitsCount, 0)

export const reportFileLines = (report: CareReport): string[] => [
  `Ayvaa Care Report — ${report.label}`,
  `Month: ${report.month}`,
  `Sealed: ${report.sealedOn}  |  Author: ${report.author}`,
  '',
  ...report.highlights.map((h) => `${h.label}: ${h.value}`),
  '',
  `Caregiver conclusion: "${report.conclusion}"`,
  '',
  'Sealed record. This report is immutable once written.',
]

const monthSlug = (month: string): string => month.toLowerCase().replace(/\s+/g, '-')

export const reportFileName = (report: CareReport): string => `ayvaa-${monthSlug(report.month)}-report.txt`

export const downloadTextFile = (lines: string[], filename: string): void => {
  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export const downloadAllLines = (): string[] => {
  const header = ['Ayvaa Care Reports — complete archive', `${REPORTS.length} sealed reports`, '']
  const body = REPORTS.flatMap((report) => ['', '—'.repeat(40), ...reportFileLines(report)])
  return [...header, ...body]
}
