export type AccessKind = 'view' | 'change' | 'consent'

export type AccessEntry = {
  id: string
  kind: AccessKind
  who: string
  role: string
  action: string
  document: string
  time: string
  reason: string
  device: string
  basis: string
}

export const accessEntries: AccessEntry[] = [
  {
    id: 'al1',
    kind: 'view',
    who: 'Dr. Venkatesh',
    role: 'Physiotherapist · Sunrise',
    action: 'Viewed discharge summary',
    document: 'Hospital discharge summary',
    time: 'Today · 10:02 AM',
    reason: 'Planning week five physiotherapy progression',
    device: 'Hospital tablet · Sunrise ward network',
    basis: 'Care team consent signed Jan 12 · physiotherapy scope',
  },
  {
    id: 'al2',
    kind: 'view',
    who: 'Lakshmi Reddy',
    role: 'RN · assigned caregiver',
    action: 'Viewed medication chart',
    document: 'Active prescription chart',
    time: 'Today · 7:58 AM',
    reason: 'Morning medication round · five prescriptions due today',
    device: 'Ayvaa professional app · GPS matched to care address',
    basis: 'Assigned caregiver for the active elderly care plan',
  },
  {
    id: 'al3',
    kind: 'change',
    who: 'Kavya · Care team',
    role: 'Care coordinator',
    action: 'Changed Friday visit time',
    document: 'Recurring series · Friday slot',
    time: 'Today · 12:20 PM',
    reason: 'Guardian requested through ticket t1 · anxiety on Friday afternoons',
    device: 'Ayvaa care console · dual approval logged',
    basis: 'Guardian request verified by call-back to registered number',
  },
  {
    id: 'al4',
    kind: 'view',
    who: 'Priya Sharma',
    role: 'Guardian · own records',
    action: 'Downloaded February statement',
    document: 'February billing statement',
    time: 'Yesterday · 6:40 PM',
    reason: 'Personal records · no approval required for own data',
    device: 'Ayvaa family app · device ID verified',
    basis: 'Own records · guardian of the patient',
  },
  {
    id: 'al5',
    kind: 'consent',
    who: 'Priya Sharma',
    role: 'Guardian',
    action: 'Re-confirmed care consent',
    document: 'Signed care consent · 90-day cycle',
    time: 'Mar 1 · 9:15 AM',
    reason: 'Scheduled renewal · reminder answered on first push',
    device: 'Ayvaa family app · electronic signature',
    basis: 'Guardian of the patient · renewal of consent sealed Jan 12',
  },
]

export const scheduleDiff = {
  title: 'Friday visit time',
  changed: 'Today · 12:20 PM',
  requestedBy: 'Priya Sharma',
  requestedVia: 'Support ticket t1 · "Change Friday start time"',
  approvedBy: 'Kavya · Care team',
  approvedHow: 'Guardian called back · request confirmed verbally',
  effective: 'This Friday · March 15',
  fields: [
    { label: 'Start time', from: '2:00 PM', to: '10:00 AM' },
    { label: 'Day', from: 'Friday', to: 'Friday', unchanged: true },
    { label: 'Caregiver', from: 'Lakshmi Reddy · RN', to: 'Lakshmi Reddy · RN', unchanged: true },
    { label: 'Friday visits affected', from: '4', to: '4', unchanged: true },
  ],
  outcome: 'Both the old schedule and the new one are kept forever. Nothing was overwritten.',
}

export const chainNode = {
  hashLabel: 'Seal',
  algorithm: 'SHA-256 · chained to the previous entry',
}
