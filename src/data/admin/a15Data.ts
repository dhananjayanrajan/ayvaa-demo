export type ConsentState = 'active' | 'pending' | 'withdrawn' | 'expired'
export type VersionStatus = 'current' | 'superseded' | 'withdrawn'
export type Scope = { id: string; name: string; granted: boolean }
export type Version = { id: string; version: number; date: string; status: VersionStatus; summary: string; signatories: string[]; changes: string[]; scopes: Scope[] }
export type AccessEntry = { id: string; actor: string; role: string; time: string; reason: string; detail: string }

export const record = { id: 'CON-20240312-014', patient: 'Ramesh Rao', guardian: 'Priya Sharma', lastSigned: 'Mar 12, 2025', renewalDue: 'Jun 10, 2025', activeVersion: 3 }

export const versions: Version[] = [
  { id: 'v3', version: 3, date: 'Mar 12, 2025', status: 'current', summary: 'Renewed with reduced scope after hospital discharge', signatories: ['Priya Sharma', 'Dr. Ananya Rao'], changes: ['Removed wound care', 'Added mobility assistance', 'Extended to June 2025'], scopes: [{ id: 's1', name: 'Personal care', granted: true }, { id: 's2', name: 'Medication management', granted: true }, { id: 's3', name: 'Mobility assistance', granted: true }, { id: 's4', name: 'Health monitoring', granted: true }, { id: 's5', name: 'Wound care', granted: false }] },
  { id: 'v2', version: 2, date: 'Dec 01, 2024', status: 'superseded', summary: 'Added wound care after surgery', signatories: ['Priya Sharma'], changes: ['Added wound care', 'Extended schedule'], scopes: [{ id: 's1', name: 'Personal care', granted: true }, { id: 's2', name: 'Medication management', granted: true }, { id: 's5', name: 'Wound care', granted: true }] },
  { id: 'v1', version: 1, date: 'Aug 15, 2024', status: 'superseded', summary: 'Initial consent for home care', signatories: ['Priya Sharma', 'Lakshmi Reddy'], changes: ['Initial scope set'], scopes: [{ id: 's1', name: 'Personal care', granted: true }, { id: 's2', name: 'Medication management', granted: true }] },
]

export const accessEntries: AccessEntry[] = [
  { id: 'acc1', actor: 'Dr. Ananya Rao', role: 'Supervisor', time: '10:45 AM', reason: 'Renewal review', detail: 'Opened record to review consent scopes before renewal approval.' },
  { id: 'acc2', actor: 'Priya Sharma', role: 'Guardian', time: '10:31 AM', reason: 'Viewed consent summary', detail: 'Guardian reviewed the active consent after session completion.' },
  { id: 'acc3', actor: 'System', role: 'Automated', time: '10:30 AM', reason: 'Version update logged', detail: 'Consent record updated to v3 after discharge.' },
]

export function stateTone(state: ConsentState) {
  if (state === 'active') return 'emerald' as const
  if (state === 'pending') return 'amber' as const
  if (state === 'withdrawn') return 'rose' as const
  return 'sky' as const
}
export function versionStatusTone(status: VersionStatus) {
  if (status === 'current') return 'success' as const
  if (status === 'withdrawn') return 'danger' as const
  return 'neutral' as const
}
