import type { LucideIcon } from 'lucide-react'
import { BedDouble, Droplets, HeartPulse, Pill, Syringe } from 'lucide-react'

export type RxKind = 'pressure' | 'diabetes' | 'cholesterol' | 'bone' | 'insulin'

export interface Prescription {
  id: string
  kind: RxKind
  icon: LucideIcon
  name: string
  dose: string
  purpose: string
  schedule: string
  prescriber: string
  stock: string
  low: boolean
  takenToday: boolean
  verifiedBy: string
  uploadedAt: string
  viewsLogged: number
  detail: string
  meaning: string
  nextDose: string
  stockPct: number
  week: boolean[]
  lastRefill: string
}

export const PRESCRIPTIONS: Prescription[] = [
  {
    id: 'rx-amlodipine',
    kind: 'pressure',
    icon: HeartPulse,
    name: 'Amlodipine',
    dose: '5 mg',
    purpose: 'Blood pressure',
    schedule: 'Morning',
    prescriber: 'Dr. Venkatesh',
    stock: '60 tabs',
    low: false,
    takenToday: true,
    verifiedBy: 'Doctor + nurse',
    uploadedAt: 'Mar 10',
    viewsLogged: 3,
    detail: 'One tablet after breakfast, same time every day.',
    meaning: 'Keeps the morning reading under 130 over 80.',
    nextDose: 'Tomorrow, 8:30 AM',
    stockPct: 0.85,
    week: [true, true, true, true, true, true, true],
    lastRefill: 'Mar 10',
  },
  {
    id: 'rx-metformin',
    kind: 'diabetes',
    icon: Droplets,
    name: 'Metformin',
    dose: '500 mg',
    purpose: 'Diabetes',
    schedule: 'Twice daily',
    prescriber: 'Dr. Rao',
    stock: '24 tabs',
    low: false,
    takenToday: true,
    verifiedBy: 'Doctor + nurse',
    uploadedAt: 'Mar 10',
    viewsLogged: 3,
    detail: 'One tablet with breakfast and one with dinner.',
    meaning: 'Holds the fasting sugar in range between meals.',
    nextDose: 'Today, 8:00 PM',
    stockPct: 0.4,
    week: [true, true, false, true, true, true, true],
    lastRefill: 'Feb 28',
  },
  {
    id: 'rx-atorvastatin',
    kind: 'cholesterol',
    icon: BedDouble,
    name: 'Atorvastatin',
    dose: '10 mg',
    purpose: 'Cholesterol',
    schedule: 'Nightly',
    prescriber: 'Dr. Rao',
    stock: '38 tabs',
    low: false,
    takenToday: true,
    verifiedBy: 'Doctor + nurse',
    uploadedAt: 'Mar 10',
    viewsLogged: 3,
    detail: 'One tablet at night, after the evening meal.',
    meaning: 'Keeps LDL trending down on the next lipid panel.',
    nextDose: 'Tonight, 9:00 PM',
    stockPct: 0.63,
    week: [true, true, true, true, true, true, true],
    lastRefill: 'Mar 5',
  },
  {
    id: 'rx-vitamind',
    kind: 'bone',
    icon: Pill,
    name: 'Vitamin D drops',
    dose: '0.5 ml',
    purpose: 'Bone health',
    schedule: 'Due lunch',
    prescriber: 'Dr. Venkatesh',
    stock: '1 bottle',
    low: false,
    takenToday: false,
    verifiedBy: 'Doctor + nurse',
    uploadedAt: 'Mar 10',
    viewsLogged: 3,
    detail: 'Five drops with lunch, directly under the tongue.',
    meaning: 'Supports bone density through the winter months.',
    nextDose: 'Today, 1:00 PM',
    stockPct: 0.5,
    week: [false, true, true, false, true, true, true],
    lastRefill: 'Mar 1',
  },
  {
    id: 'rx-insulin',
    kind: 'insulin',
    icon: Syringe,
    name: 'Insulin pen',
    dose: 'Per chart',
    purpose: 'Diabetes',
    schedule: '8:30 PM',
    prescriber: 'Dr. Rao',
    stock: '4 days left',
    low: true,
    takenToday: false,
    verifiedBy: 'Doctor + nurse',
    uploadedAt: 'Mar 10',
    viewsLogged: 3,
    detail: 'Evening dose given by the nurse, charted before each visit.',
    meaning: 'Keeps the overnight sugar steady; dose follows the chart.',
    nextDose: 'Today, 8:30 PM',
    stockPct: 0.15,
    week: [true, true, true, true, true, true, true],
    lastRefill: 'Mar 10',
  },
]

export const activeOf = (list: Prescription[]): Prescription[] => list.filter((p) => !p.low)

export const lowOf = (list: Prescription[]): Prescription[] => list.filter((p) => p.low)

export const takenIntent = (taken: boolean): 'success' | 'neutral' => (taken ? 'success' : 'neutral')

export const weekTakenOf = (week: boolean[]): number => week.filter(Boolean).length

export const PRESCRIBERS = ['Dr. Rao', 'Dr. Venkatesh']

export const RX_SCHEDULES = ['Morning', 'Twice daily', 'Nightly']

export const RX_MESSAGES: { from: 'doctor' | 'family'; text: string; time: string }[] = [
  { from: 'doctor', text: 'The morning reading is holding under 130 over 80. Keep the dose unchanged.', time: '9:12 AM' },
  { from: 'family', text: 'He walked the full loop today without the cane.', time: '9:40 AM' },
  { from: 'doctor', text: 'That is excellent progress. Continue the current plan for two more weeks.', time: '10:05 AM' },
]

export const newPrescription = (name: string, dose: string, schedule: string, prescriber: string): Prescription => ({
  id: `rx-${Date.now()}`,
  kind: 'pressure',
  icon: HeartPulse,
  name,
  dose,
  purpose: 'Blood pressure',
  schedule,
  prescriber,
  stock: '30 tabs',
  low: false,
  takenToday: false,
  verifiedBy: 'Doctor + nurse',
  uploadedAt: 'Today',
  viewsLogged: 0,
  detail: 'One tablet after breakfast, same time every day.',
  meaning: 'Keeps the morning reading under 130 over 80.',
  nextDose: 'Tomorrow, 8:30 AM',
  stockPct: 0.85,
  week: [true, true, true, true, true, true, true],
  lastRefill: 'Today',
})

export const RX_DOCUMENTS: { title: string; doctor: string; uploadedAt: string }[] = [
  { title: 'Insulin prescription', doctor: 'Dr. Rao', uploadedAt: 'Uploaded Mar 10' },
]

export const RX_LEDGER_STRIP = 'Sealed to the Rx ledger'