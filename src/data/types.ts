export type Person = {
  name: string
  role: string
  rating?: number
  visits?: number
  years?: number
  specialty?: string
}

export type LovedOne = {
  id: string
  name: string
  age: number
  category: string
  status: 'active' | 'pending'
}

export type Caregiver = Person & {
  id: string
  licence?: string
  licenceRenews?: string
  backgroundCleared?: boolean
  firstAid?: boolean
}

export type VisitStatus = 'confirmed' | 'live' | 'pending' | 'completed' | 'missed'

export type Visit = {
  id: string
  date: string
  day: string
  time: string
  status: VisitStatus
  caregiver?: string
  note?: string
  refunded?: boolean
}

export type Medication = {
  id: string
  name: string
  dose: string
  purpose: string
  schedule: string
  prescriber: string
  stock: string
  low?: boolean
  refill?: boolean
  takenToday?: boolean
}

export type Consent = {
  signed: string
  sealed: boolean
  reviewDue: string
  cycleDays: number
  covers: string[]
  locationTracking: boolean
}

export type Report = {
  month: string
  label: string
  visits: string
  trend: 'improving' | 'steady'
  highlights: string[]
}

export type SupportTicket = {
  id: string
  title: string
  status: string
  updated: string
}

export type ChatMessage = {
  from: string
  text: string
  time: string
}

export type Offer = {
  id: string
  title: string
  type: 'recurring' | 'one-time' | 'ongoing'
  expiresIn: string
  rate: string
  consentSigned?: boolean
  distance: string
  status: 'active' | 'declined'
}

export type Session = {
  id: string
  title: string
  time: string
  distance?: string
  status: 'live' | 'upcoming' | 'completed'
  detail?: string
}

export type AvailabilityDay = {
  day: string
  hours: string
  off?: boolean
}

export type Payout = {
  date: string
  amount: string
  sessions: number
  status: 'paid' | 'in-transit'
}

export type Certification = {
  name: string
  status: 'valid' | 'in-review'
}

export type Referral = {
  id: string
  name: string
  age: number
  condition: string
  referred: string
  by: string
  progress: string
  visits: string
  caregiver: string
  latest: string
  status: 'active' | 'matching'
}

export type StaffMember = {
  id: string
  name: string
  role: string
  status: 'active' | 'pending' | 'paused'
  stats?: string
  note?: string
}

export type Invoice = {
  month: string
  amount: string
  sessions: number
  status: 'paid' | 'projected'
  paidOn?: string
}

export type Incident = {
  id: string
  patient: string
  severity: 'critical' | 'minor'
  raised: string
  by: string
  summary: string
  tags: string[]
  photo?: string
  linkedVisit?: string
  linkedPlan?: string
  planPaused?: boolean
  decision?: string
}

export type Approval = {
  id: string
  name: string
  role: string
  licence?: string
  applied: string
  waiting: string
  checks: { label: string; state: 'ok' | 'running' | 'none' }[]
  history?: string
  urgent?: boolean
}

export type AuditEntry = {
  id: string
  icon: 'ok' | 'view' | 'approve' | 'error' | 'gavel'
  title: string
  body: string
}

export type RetentionPolicy = {
  type: string
  period: string
}

export type EscalatedTicket = {
  id: string
  title: string
  meta: string
  waiting?: string
  chips: string[]
  quote?: string
  quoteBy?: string
  actions: string[]
}

export type TrailEvent = {
  id: string
  time: string
  title: string
  body: string
  state: 'done' | 'now' | 'pending'
}

export type DispatchOffer = {
  id: string
  label: string
  count: number
  detail: string
  state: 'waiting' | 'declined' | 'recheck'
}

export type AutoNotification = {
  id: string
  time: string
  title: string
  body: string
  state: 'sent'
}