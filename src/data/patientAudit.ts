export type AuditKind = 'ok' | 'view' | 'approve' | 'error' | 'gavel'

export type PatientAuditEntry = {
  id: string
  kind: AuditKind
  title: string
  body: string
}

export const patientAuditEntries: PatientAuditEntry[] = [
  { id: 'pa1', kind: 'view', title: 'Discharge summary viewed by you', body: 'Today at 10:02 AM' },
  { id: 'pa2', kind: 'ok', title: 'Dose recorded by Lakshmi Reddy', body: 'Today at 8:10 AM' },
  { id: 'pa3', kind: 'approve', title: 'Consent record re-confirmed', body: 'March 1 at 9:15 AM' },
  { id: 'pa4', kind: 'ok', title: 'Visit signed off · all five steps', body: 'Yesterday at 4:30 PM' },
]

export const patientDocuments = [
  {
    id: 'pd1',
    name: 'Hospital discharge summary',
    meta: 'Sunrise Multispeciality · opened twice · every access logged',
    locked: true,
  },
  { id: 'pd2', name: 'Signed care consent', meta: 'January 12 · sealed · review due March 20', locked: false, chevron: true },
  { id: 'pd3', name: 'Monthly care reports', meta: 'Three reports · one per completed month', locked: false, chevron: true },
]
