export type ChecklistStep = {
  id: string
  icon: 'arrived' | 'vitals' | 'meds' | 'walk' | 'meal'
  title: string
  body: string
  done?: boolean
  active?: boolean
  locked?: boolean
}

export const sessionChecklist: ChecklistStep[] = [
  { id: 'cs1', icon: 'arrived', title: 'Checked in at 2:02 PM', body: 'GPS matched the care address · logged permanently', done: true, locked: true },
  { id: 'cs2', icon: 'vitals', title: 'Record vital signs', body: '128 over 76 · pulse 72 · oxygen 97 percent', done: true, locked: true },
  { id: 'cs3', icon: 'meds', title: 'Give morning medication', body: 'Amlodipine 5 mg · verified against prescription', done: true, locked: true },
  { id: 'cs4', icon: 'walk', title: 'Guided walk · 15 minutes', body: 'Running now · started 2:18 PM', active: true },
  { id: 'cs5', icon: 'meal', title: 'Prepare lunch per nutrition plan', body: 'Low salt meal from the diet sheet' },
]

export const medVerification = [
  'Right patient · Ramesh Sharma confirmed',
  'Right drug and dose · label matches prescription',
  'Right time · due now at 2:12 PM',
]

export const proTerms = [
  'I will follow every care plan exactly as written',
  'I accept that all visits are verified and audited',
  'I will report incidents within one hour',
  'I will protect patient records and never share them',
]

export const incidentCauses = ['Near fall', 'Medication', 'Behaviour', 'Equipment']

export const sessionNote =
  'Ramesh walked the full fifteen minutes today without holding the rail. Appetite was good. Slight stiffness in the left knee, worth watching on Friday.'

export const quickTags = ['Good mobility', 'Good appetite', 'Watch knee']
