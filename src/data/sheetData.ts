import { ClipboardList, HeartPulse, Pill as PillIcon, type LucideIcon } from 'lucide-react'

export type SheetMode = 'vitals' | 'meds' | 'notes'

export const SHEET_MODES: { id: SheetMode; label: string; icon: LucideIcon }[] = [
  { id: 'vitals', label: 'Vitals', icon: HeartPulse },
  { id: 'meds', label: 'Meds', icon: PillIcon },
  { id: 'notes', label: 'Notes', icon: ClipboardList },
]

export const MODE_META: Record<SheetMode, { title: string; subtitle: string; tile: 'success' | 'warning' | 'info'; icon: LucideIcon }> = {
  vitals: {
    title: 'Record vital signs',
    subtitle: 'Saved to the visit log and compared with last visit',
    tile: 'success',
    icon: HeartPulse,
  },
  meds: {
    title: 'Give Amlodipine 5 mg',
    subtitle: 'Once daily, morning · prescribed by Dr. Venkatesh',
    tile: 'warning',
    icon: PillIcon,
  },
  notes: {
    title: 'Session notes',
    subtitle: 'The family sees these in the visit summary',
    tile: 'info',
    icon: ClipboardList,
  },
}

export type VitalReading = {
  key: string
  label: string
  value: string
  delta: string
  down: boolean
}

export const VITAL_READINGS: VitalReading[] = [
  { key: 'bp', label: 'Blood pressure', value: '128/76', delta: '4 pts lower than Monday', down: true },
  { key: 'pulse', label: 'Pulse', value: '72 bpm', delta: 'Steady vs Monday', down: true },
  { key: 'spo2', label: 'Oxygen', value: '97%', delta: 'Stable all week', down: false },
  { key: 'temp', label: 'Temperature', value: '36.7°C', delta: 'Normal range', down: true },
]

export const SAVE_LABELS: Record<SheetMode, string> = {
  vitals: 'Save readings',
  meds: 'Confirm dose given',
  notes: 'Save notes',
}
