import {
  Check,
  ClipboardList,
  HeartPulse,
  Pill as PillIcon,
  Utensils,
  type LucideIcon,
} from 'lucide-react'

export type StepKind = 'arrived' | 'vitals' | 'meds' | 'walk' | 'meal'

export type StepState = 'done' | 'active' | 'locked' | 'todo'

export type SessionStep = {
  id: string
  title: string
  body: string
  icon: StepKind
  state: StepState
}

export const STEP_ICONS: Record<StepKind, LucideIcon> = {
  arrived: Check,
  vitals: HeartPulse,
  meds: PillIcon,
  walk: ClipboardList,
  meal: Utensils,
}

export const QUICK_ACTIONS: { key: StepKind; label: string; body: string }[] = [
  { key: 'vitals', label: 'Vitals', body: 'Pressure, pulse, oxygen and temperature · compared with last visit' },
  { key: 'meds', label: 'Meds', body: 'Three-point verification before any dose is given' },
  { key: 'walk', label: 'Notes', body: 'The family sees your notes in the visit summary' },
]
