import type { LucideIcon } from 'lucide-react'
import { MoonStar, Pill, Sun, Sunrise, Syringe } from 'lucide-react'

export const MED_DAY = {
  patientFirst: 'Raghav',
  dateLabel: 'Wednesday, March 13',
  nurse: { name: 'Lakshmi Reddy', first: 'Lakshmi' },
}

export const SEAL_TIME = '2:41 PM'

export type DayPartId = 'morning' | 'afternoon' | 'evening'

export type DoseState = 'sealed' | 'due' | 'scheduled'

export interface MedInteraction {
  title: string
  body: string
}

export interface MedDose {
  id: string
  name: string
  dose: string
  purpose: string
  part: DayPartId
  window: string
  state: DoseState
  icon: LucideIcon
  rxId: string
  prescriber: string
  instruction: string
  takenAt?: string
  givenBy?: string
  dueAt?: string
  dosesLeft?: number
  fresh?: boolean
  interaction?: MedInteraction
}

export const MED_DOSES: MedDose[] = [
  {
    id: 'amlodipine',
    name: 'Amlodipine',
    dose: '5 mg',
    purpose: 'Blood pressure',
    part: 'morning',
    window: '8 AM',
    state: 'sealed',
    takenAt: '8:05 AM',
    givenBy: 'Nurse Lakshmi',
    icon: Pill,
    rxId: 'Rx-4471',
    prescriber: 'Dr. Meera Nair',
    instruction: 'Before food, with water',
  },
  {
    id: 'metformin',
    name: 'Metformin',
    dose: '500 mg',
    purpose: 'Blood sugar',
    part: 'morning',
    window: '8 AM',
    state: 'sealed',
    takenAt: '8:20 AM',
    givenBy: 'Nurse Lakshmi',
    icon: Pill,
    rxId: 'Rx-4471',
    prescriber: 'Dr. Meera Nair',
    instruction: 'After breakfast',
  },
  {
    id: 'calcium',
    name: 'Calcium citrate',
    dose: '500 mg',
    purpose: 'Bone health',
    part: 'afternoon',
    window: '2 PM',
    state: 'due',
    dueAt: '2:15 PM',
    icon: Pill,
    rxId: 'Rx-4471',
    prescriber: 'Dr. Meera Nair',
    instruction: 'With lunch, alongside food',
    interaction: {
      title: 'Interaction check',
      body: 'Calcium can blunt the morning amlodipine, so this dose sits two hours apart from it.',
    },
  },
  {
    id: 'insulin',
    name: 'Insulin glargine',
    dose: '10 units',
    purpose: 'Blood sugar',
    part: 'evening',
    window: '8:30 PM',
    state: 'scheduled',
    icon: Syringe,
    rxId: 'Rx-4471',
    prescriber: 'Dr. Meera Nair',
    instruction: 'Subcutaneous injection, rotate the site',
    dosesLeft: 2,
  },
]

const DAY_PARTS: { id: DayPartId; label: string; icon: LucideIcon }[] = [
  { id: 'morning', label: 'Morning', icon: Sunrise },
  { id: 'afternoon', label: 'Afternoon', icon: Sun },
  { id: 'evening', label: 'Evening', icon: MoonStar },
]

export type PartCell = {
  id: DayPartId
  label: string
  status: 'done' | 'due' | 'scheduled'
  sub: string
}

export const buildPartCells = (meds: MedDose[]): PartCell[] => {
  const due = dueMedOf(meds)
  return DAY_PARTS.map((part) => {
    const partMeds = meds.filter((m) => m.part === part.id)
    const sealedN = partMeds.filter((m) => m.state === 'sealed').length
    if (due && due.part === part.id) {
      return { id: part.id, label: part.label, status: 'due', sub: 'Due now' }
    }
    if (partMeds.length > 0 && sealedN === partMeds.length) {
      return { id: part.id, label: part.label, status: 'done', sub: `${sealedN} given` }
    }
    const scheduled = partMeds.find((m) => m.state === 'scheduled')
    return { id: part.id, label: part.label, status: 'scheduled', sub: scheduled ? scheduled.window : part.label }
  })
}

export const sealedMedsOf = (meds: MedDose[]): MedDose[] => meds.filter((m) => m.state === 'sealed')

export const dueMedOf = (meds: MedDose[]): MedDose | undefined => meds.find((m) => m.state === 'due')

export const scheduledMedsOf = (meds: MedDose[]): MedDose[] => meds.filter((m) => m.state === 'scheduled')

export interface FactRow {
  label: string
  value: string
}

export const buildDoseFacts = (med: MedDose): FactRow[] => {
  const rows: FactRow[] = []
  if (med.takenAt) rows.push({ label: 'Given at', value: med.takenAt })
  if (med.givenBy) rows.push({ label: 'Given by', value: med.givenBy })
  if (med.dueAt) rows.push({ label: 'Due at', value: med.dueAt })
  rows.push({ label: 'Window', value: med.window })
  rows.push({ label: 'Prescription', value: med.rxId })
  rows.push({ label: 'Prescriber', value: med.prescriber })
  return rows
}

export function formatWindow(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}
