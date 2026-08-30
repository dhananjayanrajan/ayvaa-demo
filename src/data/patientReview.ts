export const REVIEW_MATCH = {
  name: 'Rani Deshmukh',
  role: 'Certified elderly-care nurse',
  rating: 4.9,
  years: 12,
  sessions: 70,
}

export const REVIEW_PATIENT = {
  name: 'Raghav Mehta',
  firstName: 'Raghav',
  relation: 'Father',
  age: 74,
  category: 'Elderly care',
  language: 'Telugu',
}

export const REVIEW_GUARDIAN = {
  name: 'Priya Mehta',
}

export interface WeekDay {
  short: string
  full: string
  active: boolean
}

export const REVIEW_WEEK: WeekDay[] = [
  { short: 'M', full: 'Mon', active: true },
  { short: 'T', full: 'Tue', active: false },
  { short: 'W', full: 'Wed', active: true },
  { short: 'T', full: 'Thu', active: false },
  { short: 'F', full: 'Fri', active: true },
  { short: 'S', full: 'Sat', active: false },
  { short: 'S', full: 'Sun', active: false },
]

export const REVIEW_SCHEDULE = {
  time: '2:00 PM',
  duration: '2 hours',
  visitsPerWeek: 3,
  weeklyPrice: '₹4,200',
  perVisit: '₹1,400',
  platformFee: '₹0',
}

export const activeDayNames = (): string =>
  REVIEW_WEEK.filter((d) => d.active).map((d) => d.full).join(', ')

export const scheduleValue = (): string => `${activeDayNames()} at ${REVIEW_SCHEDULE.time}`

export const bookingRows = () => [
  { label: 'Category', value: REVIEW_PATIENT.category },
  { label: 'Schedule', value: scheduleValue() },
  { label: 'Duration', value: `${REVIEW_SCHEDULE.duration} per visit` },
  { label: 'Visits per week', value: String(REVIEW_SCHEDULE.visitsPerWeek) },
  { label: 'Weekly price', value: REVIEW_SCHEDULE.weeklyPrice },
  { label: 'Platform fee', value: REVIEW_SCHEDULE.platformFee },
]

export type ConsentId = 'care' | 'meds'

export interface ConsentItem {
  id: ConsentId
  label: string
  sub: string
}

export const CONSENT_ITEMS: ConsentItem[] = [
  {
    id: 'care',
    label: 'I approve care for Raghav under this plan',
    sub: 'Visits, vitals and goal logging as described',
  },
  {
    id: 'meds',
    label: 'I approve medication management by the nurse',
    sub: 'Prescription-verified doses, logged per round',
  },
]

export const consentProgress = (approvals: Record<ConsentId, boolean>) => {
  const done = CONSENT_ITEMS.filter((c) => approvals[c.id]).length
  return { done, total: CONSENT_ITEMS.length, ready: done === CONSENT_ITEMS.length }
}

export const paymentMethod = {
  label: 'HDFC Card',
  last4: '8842',
  note: `Charged ${REVIEW_SCHEDULE.perVisit} after each completed visit, never before`,
}

export const consentScopeRows = () => [
  { label: 'Care approval grants', value: 'Visits, vitals and goal logs' },
  { label: 'Medication approval grants', value: 'Prescription-verified dosing only' },
  { label: 'Records shared with', value: `${REVIEW_MATCH.name} only` },
  { label: 'Withdraw anytime', value: 'Pauses the next visit' },
  { label: 'Sealed as', value: 'Immutable audit entry' },
]

export const dispatchFacts = [
  { label: 'Caregivers notified', value: '14 nearby' },
  { label: 'Family and partner', value: 'Notified' },
  { label: 'Audit log', value: 'Sealed' },
  { label: 'Reminders', value: 'Every visit' },
]

export interface DispatchStep {
  title: string
  note: string
  done: boolean
  live?: boolean
}

export const dispatchSteps: DispatchStep[] = [
  { title: 'Offers dispatched', note: 'Just now, 14 caregivers notified', done: true, live: true },
  { title: 'Caregiver matched', note: 'Usually within 2 hours, you approve', done: false },
  { title: 'Reminders before every visit', note: 'Automatic push, nobody sets them', done: false },
  { title: 'Payment captured', note: 'After each verified visit, never before', done: false },
]

export const recordRows = () => [
  { label: 'Caregiver pool', value: 'Rani and 13 nearby' },
  { label: 'Person cared for', value: REVIEW_PATIENT.name },
  { label: 'Schedule', value: scheduleValue() },
  { label: 'Duration', value: `${REVIEW_SCHEDULE.duration} per visit` },
  { label: 'Weekly price', value: REVIEW_SCHEDULE.weeklyPrice },
  { label: 'Consent record', value: 'Signed today' },
]
