import type { LucideIcon } from 'lucide-react'
import { Activity, Footprints, HeartPulse, Pill, Wind } from 'lucide-react'

export const VISIT_SUMMARY = {
  date: 'Thursday, Mar 14',
  timeRange: '2:00 PM to 4:30 PM',
  caregiver: 'Lakshmi Reddy',
  signedAt: '4:05 PM',
  stepsDone: '5 of 5',
  goalsMet: '3 of 3',
  duration: '2h 03m',
  note: 'Raghav walked the full loop without the cane today and his appetite is clearly back. Blood pressure holding steady on the morning dose. Recommend we keep the current plan for another two weeks before review.',
}

export type VitalKind = 'pressure' | 'pulse' | 'oxygen'
export type VitalTrend = 'better' | 'steady' | 'normal'

export interface VitalReading {
  id: string
  kind: VitalKind
  icon: LucideIcon
  label: string
  value: string
  trend: VitalTrend
  shortTrend: string
  trendLabel: string
  prev: string
  recordedAt: string
  detail: string
  meaning: string
  compare: { label: string; value: string; pct: number }[]
}

export const VITAL_READINGS: VitalReading[] = [
  {
    id: 'vr-bp',
    kind: 'pressure',
    icon: HeartPulse,
    label: 'Blood pressure',
    value: '126/78',
    trend: 'better',
    shortTrend: 'Better',
    trendLabel: 'Better than last visit',
    prev: '131/81',
    recordedAt: '2:19 PM',
    detail: 'Upper-arm cuff after ten minutes of rest, seated.',
    meaning: 'Both numbers moved toward the 130 over 80 target. Keep the morning dose timing unchanged.',
    compare: [
      { label: 'Last visit', value: '131/81', pct: 82 },
      { label: 'This visit', value: '126/78', pct: 74 },
    ],
  },
  {
    id: 'vr-pulse',
    kind: 'pulse',
    icon: Activity,
    label: 'Pulse',
    value: '72 bpm',
    trend: 'steady',
    shortTrend: 'Steady',
    trendLabel: 'Steady from last visit',
    prev: '74 bpm',
    recordedAt: '2:21 PM',
    detail: 'Wrist pulse counted over sixty seconds after the cuff reading.',
    meaning: 'A resting pulse in the sixties and seventies is where we want it. No action needed.',
    compare: [
      { label: 'Last visit', value: '74 bpm', pct: 62 },
      { label: 'This visit', value: '72 bpm', pct: 60 },
    ],
  },
  {
    id: 'vr-oxygen',
    kind: 'oxygen',
    icon: Wind,
    label: 'Oxygen level',
    value: '98%',
    trend: 'normal',
    shortTrend: 'Normal',
    trendLabel: 'Within the normal range',
    prev: '97%',
    recordedAt: '2:23 PM',
    detail: 'Fingertip oximeter, averaged over three reads.',
    meaning: '98 percent saturation is comfortably in the normal band. The walk was well tolerated.',
    compare: [
      { label: 'Last visit', value: '97%', pct: 90 },
      { label: 'This visit', value: '98%', pct: 94 },
    ],
  },
]

export const vitalIntent = (trend: VitalTrend): 'success' | 'neutral' =>
  trend === 'steady' ? 'neutral' : 'success'

export interface SessionRow {
  label: string
  value: string
  sub: string
}

export const SESSION_LEDGER: SessionRow[] = [
  { label: 'Checked in', value: '2:02 PM', sub: 'GPS match, home address' },
  { label: 'Checked out', value: '4:05 PM', sub: 'GPS match, home address' },
  { label: 'On site', value: '2h 03m', sub: 'Longest stretch without an alert' },
]

export interface CareStep {
  id: string
  title: string
  summary: string
  detail: string
  time: string
  icon: LucideIcon
}

export const CARE_STEPS: CareStep[] = [
  {
    id: 'cs-checkin',
    title: 'GPS check-in',
    summary: 'Arrival verified against your home address',
    detail: 'Phone GPS matched the home address within the 120 metre radius. Check-in sealed at 2:02 PM.',
    time: '2:02 PM',
    icon: HeartPulse,
  },
  {
    id: 'cs-vitals',
    title: 'Vitals round',
    summary: 'Three readings taken and sealed',
    detail: 'Blood pressure, pulse and oxygen recorded after ten minutes of rest. All three sealed to this record.',
    time: '2:23 PM',
    icon: Activity,
  },
  {
    id: 'cs-walk',
    title: 'Guided walk',
    summary: 'Full community loop, cane not needed',
    detail: 'Fifteen minutes unaided at a steady pace — the goal for week eight, met in full.',
    time: '3:17 PM',
    icon: Footprints,
  },
  {
    id: 'cs-meds',
    title: 'Medication round',
    summary: 'Evening dose given and verified',
    detail: 'Dose checked against the active prescription before administration. No refusals recorded.',
    time: '3:48 PM',
    icon: Pill,
  },
]

export const payment = {
  method: 'HDFC Card',
  last4: '8842',
  charge: '₹1,400',
  taxes: '₹84',
  total: '₹1,484',
}

export const paymentMethodLabel = (): string => `${payment.method} ending ${payment.last4}`

export const paymentBreakdown = (): { label: string; value: string }[] => [
  { label: 'Visit charge', value: payment.charge },
  { label: 'Taxes', value: payment.taxes },
  { label: 'Total captured', value: payment.total },
]

export const summaryShareText = (): string =>
  [
    `Ayvaa visit summary — ${VISIT_SUMMARY.date}`,
    `${VISIT_SUMMARY.timeRange} with ${VISIT_SUMMARY.caregiver}`,
    `Steps ${VISIT_SUMMARY.stepsDone}, goals met ${VISIT_SUMMARY.goalsMet}, duration ${VISIT_SUMMARY.duration}`,
    `Blood pressure 126/78, pulse 72 bpm, oxygen 98%`,
    `Payment captured ${payment.total}`,
    'Sealed record, verified by GPS check-in',
  ].join('\n')
