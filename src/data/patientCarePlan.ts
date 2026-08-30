import type { LucideIcon } from 'lucide-react'
import { Footprints, HeartPulse, Salad } from 'lucide-react'

export const PLAN = {
  patientName: 'Raghav Mehta',
  patientFirstName: 'Raghav',
  category: 'Elderly care',
  week: 8,
  weeks: 12,
  progress: 66,
  status: 'On track',
  incidents: 0,
}

export const CAREGIVER = {
  name: 'Meera R.',
  firstName: 'Meera',
  role: 'Elderly care',
  rating: 4.9,
  sinceWeek: 1,
  visitsWithPlan: 24,
  goalsLogged: '72 of 72',
  onTime: '100%',
  nextVisit: 'Mon 9:00 AM',
}

export type SessionState = 'met' | 'missed' | 'pending'

export interface GoalSession {
  day: string
  value: string
  state: SessionState
}

export interface Goal {
  id: string
  title: string
  result: string
  icon: LucideIcon
  state: 'met' | 'open'
  note: string
  sessions: GoalSession[]
}

export const GOALS: Goal[] = [
  {
    id: 'walk',
    title: 'Walk fifteen minutes unaided',
    result: 'Achieved at all three visits this week',
    icon: Footprints,
    state: 'met',
    note: 'Full park loop without the cane on Friday — steady stride the whole way.',
    sessions: [
      { day: 'Mon', value: '12 min', state: 'met' },
      { day: 'Wed', value: '15 min', state: 'met' },
      { day: 'Fri', value: '15 min', state: 'met' },
    ],
  },
  {
    id: 'bp',
    title: 'Blood pressure below 130 over 80',
    result: 'Average this week 126 over 78',
    icon: HeartPulse,
    state: 'met',
    note: 'Every reading under target since Tuesday. Keep the morning dose timing as is.',
    sessions: [
      { day: 'Mon', value: '128/79', state: 'met' },
      { day: 'Wed', value: '124/76', state: 'met' },
      { day: 'Fri', value: '126/78', state: 'met' },
    ],
  },
  {
    id: 'diet',
    title: 'Low salt diet every day',
    result: 'Saturday still pending',
    icon: Salad,
    state: 'open',
    note: "Tuesday's takeaway pushed sodium over — logged honestly, family cooking the rest of the week.",
    sessions: [
      { day: 'Mon', value: 'On plan', state: 'met' },
      { day: 'Tue', value: 'Over', state: 'missed' },
      { day: 'Wed', value: 'On plan', state: 'met' },
      { day: 'Thu', value: 'On plan', state: 'met' },
      { day: 'Fri', value: 'On plan', state: 'met' },
      { day: 'Sat', value: 'Pending', state: 'pending' },
    ],
  },
]

export const goalSummary = () => {
  const met = GOALS.filter((g) => g.state === 'met').length
  const sessions = GOALS.flatMap((g) => g.sessions)
  const scored = sessions.filter((s) => s.state !== 'pending')
  return {
    met,
    open: GOALS.length - met,
    total: GOALS.length,
    achieved: scored.filter((s) => s.state === 'met').length,
    scored: scored.length,
  }
}

export interface VisitDay {
  id: string
  day: string
  full: string
  done: boolean
  time?: string
  minutes?: number
  checkedIn?: string
  checkedOut?: string
}

export const WEEK: VisitDay[] = [
  { id: 'mon', day: 'Mon', full: 'Monday', done: true, time: '9:00 AM', minutes: 62, checkedIn: '8:58 AM', checkedOut: '10:02 AM' },
  { id: 'tue', day: 'Tue', full: 'Tuesday', done: false },
  { id: 'wed', day: 'Wed', full: 'Wednesday', done: true, time: '9:15 AM', minutes: 58, checkedIn: '9:12 AM', checkedOut: '10:17 AM' },
  { id: 'thu', day: 'Thu', full: 'Thursday', done: false },
  { id: 'fri', day: 'Fri', full: 'Friday', done: true, time: '9:00 AM', minutes: 64, checkedIn: '8:57 AM', checkedOut: '10:04 AM' },
  { id: 'sat', day: 'Sat', full: 'Saturday', done: false },
  { id: 'sun', day: 'Sun', full: 'Sunday', done: false },
]

export const completedVisits = (): number => WEEK.filter((d) => d.done).length

export const maxVisitMinutes = (): number =>
  WEEK.reduce((max, d) => Math.max(max, d.minutes ?? 0), 0)

export const dayDetailLine = (d: VisitDay): string =>
  d.done
    ? `${CAREGIVER.firstName} arrived ${d.time}, stayed ${d.minutes} minutes`
    : `Rest day, plan resumes Monday 9:00 AM`

export const visitFacts = (d: VisitDay): { label: string; value: string }[] =>
  d.done
    ? [
        { label: 'Caregiver', value: CAREGIVER.name },
        { label: 'Checked in', value: `${d.checkedIn}, within 120 m` },
        { label: 'Checked out', value: d.checkedOut ?? '' },
        { label: 'Diet logged', value: 'On plan' },
        { label: 'Payment captured', value: '₹1,400' },
      ]
    : []

export const VITALS = [
  { label: 'Blood pressure', value: '126/78' },
  { label: 'Pulse', value: '72 bpm' },
  { label: 'Walk', value: '15 min unaided' },
]

export const GOALS_LOGGED = { done: 3, total: 3 }

export const CONSENT_CYCLE = {
  signedOn: '12 Feb 2026',
  renewsOn: '12 May 2026',
  day: 78,
  totalDays: 90,
}

export const consentSteps = [
  { label: 'Signed', sub: '12 Feb', done: true },
  { label: 'Reminded', sub: '2x', done: true },
  { label: 'Renews', sub: '12 May', done: false },
]

export const consentScopeRows = () => [
  { label: 'Signed', value: CONSENT_CYCLE.signedOn },
  { label: 'Renews', value: CONSENT_CYCLE.renewsOn },
  { label: 'Caregiver', value: `${CAREGIVER.name}, visits only` },
  { label: 'Partner', value: 'Sunrise Hospital' },
]

export type MetricId = 'bp' | 'steps' | 'weight'

export interface Metric {
  id: MetricId
  tab: string
  unit: string
  delta: string
  target?: number
  targetLabel: string
  seriesA: { label: string; values: number[] }
  seriesB?: { label: string; values: number[] }
}

export const METRICS: Metric[] = [
  {
    id: 'bp',
    tab: 'Blood pressure',
    unit: '',
    delta: '−12 pts',
    target: 130,
    targetLabel: 'Target 130',
    seriesA: { label: 'Systolic', values: [138, 134, 130, 126] },
    seriesB: { label: 'Diastolic', values: [86, 82, 80, 78] },
  },
  {
    id: 'steps',
    tab: 'Steps',
    unit: '',
    delta: '+1,680',
    target: 1500,
    targetLabel: 'Goal 1,500',
    seriesA: { label: 'Daily average', values: [420, 900, 1450, 2100] },
  },
  {
    id: 'weight',
    tab: 'Weight',
    unit: ' kg',
    delta: '−1.9 kg',
    target: 76,
    targetLabel: 'Goal 76 kg',
    seriesA: { label: 'Weekly reading', values: [78.4, 77.6, 77.1, 76.5] },
  },
]

export const axisLabels = (count: number): string[] => {
  const weeks = Array.from({ length: count - 1 }, (_, i) => `Wk ${i + 1}`)
  return [...weeks, 'Now']
}

export const formatValue = (metric: Metric, index: number): string => {
  const a = metric.seriesA.values[index]
  const b = metric.seriesB?.values[index]
  if (b != null) return `${a}/${b}`
  if (metric.unit === ' kg') return a.toFixed(1)
  return a.toLocaleString('en-IN')
}

export const planLinks = [
  { id: 'reports', title: 'Weekly reports', sub: 'One sealed report per completed month, 3 available', target: '/patient/p14' },
  { id: 'timeline', title: 'Visit timeline', sub: `Next, Monday 9:00 AM with ${CAREGIVER.name}`, target: '/patient/p15' },
  { id: 'manage', title: 'Manage plan', sub: 'Change days, pause with auto-resume, end series', target: '/patient/p34' },
]
