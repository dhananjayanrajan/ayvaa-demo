import type { LucideIcon } from 'lucide-react'
import { Footprints, HeartPulse, MapPin, PenLine, Pill } from 'lucide-react'

export const LIVE_VISIT = {
  patientFirst: 'Raghav',
  category: 'Elderly care',
  startedAt: '2:02 PM',
  signOffEta: '4:30 PM',
  windowMinutes: 150,
  elapsedBaseSeconds: 1905,
  caregiver: {
    name: 'Lakshmi Reddy',
    first: 'Lakshmi',
    initial: 'L',
    role: 'Certified elderly-care nurse',
    visitsWithFamily: 24,
    rating: '4.9',
  },
}

export const SEAL_TIME = '3:02 PM'

export type StepState = 'done' | 'active' | 'todo'

export interface StepReading {
  label: string
  value: string
}

export interface VisitStep {
  id: string
  title: string
  summary: string
  icon: LucideIcon
  state: StepState
  time?: string
  readings?: StepReading[]
}

export const VISIT_STEPS: VisitStep[] = [
  {
    id: 'checkin',
    title: 'GPS check-in',
    summary: 'Arrived and location verified against your home address',
    icon: MapPin,
    state: 'done',
    time: '2:02 PM',
    readings: [
      { label: 'Checked in', value: '2:02 PM' },
      { label: 'Location match', value: 'Home address, 120 m radius' },
    ],
  },
  {
    id: 'vitals',
    title: 'Vitals recorded',
    summary: 'Readings taken and sealed to the visit record',
    icon: HeartPulse,
    state: 'done',
    time: '2:19 PM',
    readings: [
      { label: 'Blood pressure', value: '126/78' },
      { label: 'Pulse', value: '72 bpm' },
    ],
  },
  {
    id: 'walk',
    title: 'Guided walk',
    summary: 'Community loop at a steady pace, cane left behind today',
    icon: Footprints,
    state: 'active',
  },
  {
    id: 'meds',
    title: 'Medication round',
    summary: 'Prescription-verified doses before sign-off',
    icon: Pill,
    state: 'todo',
  },
  {
    id: 'notes',
    title: 'Notes and sign-off',
    summary: 'Caregiver notes sealed, GPS check-out logged',
    icon: PenLine,
    state: 'todo',
  },
]

export const WALK_LAPS_TOTAL = 4
export const WALK_LAPS_START = 2

export const ACTIVE_STEP_META = {
  startedAt: '2:34 PM',
  goalLabel: 'Fifteen minutes unaided',
}

export const activeStepOf = (steps: VisitStep[]): VisitStep =>
  steps.find((s) => s.state === 'active') ?? steps[0]

export const activeStepIndexOf = (steps: VisitStep[]): number =>
  steps.indexOf(activeStepOf(steps)) + 1

export const sealedStepsOf = (steps: VisitStep[]): VisitStep[] => steps.filter((s) => s.state === 'done')

export const todoStepsOf = (steps: VisitStep[]): VisitStep[] => steps.filter((s) => s.state === 'todo')

export const formatElapsed = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  return hours > 0 ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${minutes}:${pad(seconds)}`
}

export interface LedgerRow {
  label: string
  value: string
  state: StepState
}

export const buildLedger = (steps: VisitStep[], lapsDone: number): LedgerRow[] =>
  steps.map((step) => {
    const state = step.state
    let value = 'Pending'
    if (step.id === 'checkin') value = step.time ?? LIVE_VISIT.startedAt
    else if (step.id === 'vitals') value = 'Sealed'
    else if (step.id === 'walk') value = state === 'done' ? 'Sealed' : `Lap ${Math.min(lapsDone + 1, WALK_LAPS_TOTAL)} of ${WALK_LAPS_TOTAL}`
    else if (step.id === 'meds') value = state === 'active' ? 'Underway' : 'Pending'
    else if (step.id === 'notes') value = LIVE_VISIT.signOffEta
    const label = step.id === 'meds' ? 'Medication' : step.id === 'notes' ? 'Sign-off' : step.title
    return { label, value, state }
  })
