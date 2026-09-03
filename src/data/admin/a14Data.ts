export type RecordKind = 'event' | 'access'
export type RecordEntry = { id: string; kind: RecordKind; step: number; timestamp: string; actor: string; role: string; action: string; reference: string; isCurrent: boolean }

export const sealedRecord = { id: 'AUD-20250315-0842', fingerprint: '0x8f3a…c2d1e9b7a4f6c8d2b1a3e5f7' }

export const recordEntries: RecordEntry[] = [
  { id: 'ent-1', kind: 'event', step: 1, timestamp: '10:15 AM', actor: 'Lakshmi Reddy', role: 'Registered Nurse', action: 'Session check-in', reference: '0x2b6e…f8a1', isCurrent: false },
  { id: 'ent-2', kind: 'event', step: 2, timestamp: '10:22 AM', actor: 'Lakshmi Reddy', role: 'Registered Nurse', action: 'Vitals recorded', reference: '0x4e7b…a9e3', isCurrent: false },
  { id: 'ent-3', kind: 'event', step: 3, timestamp: '10:30 AM', actor: 'Lakshmi Reddy', role: 'Registered Nurse', action: 'Session completed', reference: '0x8f3a…c2d1', isCurrent: true },
  { id: 'ent-4', kind: 'access', step: 4, timestamp: '10:31 AM', actor: 'Priya Sharma', role: 'Guardian', action: 'Viewed session summary', reference: '0x1c9d…77f0', isCurrent: false },
  { id: 'ent-5', kind: 'access', step: 5, timestamp: '10:45 AM', actor: 'Dr. Ananya Rao', role: 'Supervisor', action: 'Quality review', reference: '0x3a5e…b2c4', isCurrent: false },
]
