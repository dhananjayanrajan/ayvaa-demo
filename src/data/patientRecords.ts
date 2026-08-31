import type { LucideIcon } from 'lucide-react'
import { FileText, HeartPulse, Lock, Pill, ShieldCheck } from 'lucide-react'

export const VAULT_FACTS = {
  patientFirst: 'Raghav',
  planCategory: 'Elderly care',
  since: '20 Jan 2026',
  retention: 'Kept 10 years, early deletion blocked',
}

export interface RecordDoc {
  id: string
  name: string
  category: string
  note: string
  icon: LucideIcon
  locked: boolean
  lastOpened?: string
  openedBy?: string
  consentBasis?: string
  sealedBy?: string
  unlockNote?: string
}

export const RECORD_DOCS: RecordDoc[] = [
  {
    id: 'plan',
    name: 'Care plan v3',
    category: 'Care plan',
    note: 'Active elderly care plan, third version',
    icon: FileText,
    locked: false,
    lastOpened: '1:12 PM',
    openedBy: 'You and Nurse Lakshmi',
    consentBasis: 'Guardian consent, renewed 17 Mar',
  },
  {
    id: 'rx',
    name: 'Rx-4471',
    category: 'Prescription',
    note: 'Dr. Meera Nair, four medicines',
    icon: Pill,
    locked: false,
    lastOpened: 'Yesterday',
    openedBy: 'Dr. Meera Nair',
    consentBasis: 'Treatment consent, standing',
  },
  {
    id: 'vitals',
    name: 'Vitals history',
    category: 'Vitals',
    note: 'Sealed readings from every completed visit',
    icon: HeartPulse,
    locked: false,
    lastOpened: 'Today',
    openedBy: 'You',
    consentBasis: 'Guardian consent, renewed 17 Mar',
  },
  {
    id: 'consent',
    name: 'Consent records',
    category: 'Consent',
    note: 'Signed, versioned and sealed',
    icon: ShieldCheck,
    locked: false,
    lastOpened: '17 Mar',
    openedBy: 'You',
    consentBasis: 'Your own record, always visible to you',
  },
  {
    id: 'directive',
    name: 'Advance directive',
    category: 'Legal',
    note: 'Uploaded 12 Feb 2026, sealed at your request',
    icon: Lock,
    locked: true,
    sealedBy: 'Guardian request',
    unlockNote: 'Opens only with your explicit consent signature',
  },
  {
    id: 'claim',
    name: 'Insurance claim pack',
    category: 'Insurance',
    note: 'Partner prepared, waiting on review',
    icon: FileText,
    locked: true,
    sealedBy: 'Consent pending',
    unlockNote: 'The partner sees it only after you grant access',
  },
]

export type AuditKind = 'view' | 'change' | 'denied'

export interface AuditEntry {
  id: string
  kind: AuditKind
  title: string
  detail: string
  actor: string
  time: string
  fresh?: boolean
}

export const AUDIT_ENTRIES: AuditEntry[] = [
  {
    id: 'a1',
    kind: 'change',
    title: 'Vitals appended',
    detail: 'Two readings sealed to the visit record',
    actor: 'Nurse Lakshmi',
    time: '12:58 PM',
  },
  {
    id: 'a2',
    kind: 'view',
    title: 'Care plan opened',
    detail: 'Care plan v3 read from the vault',
    actor: 'You',
    time: '1:12 PM',
  },
  {
    id: 'a3',
    kind: 'view',
    title: 'Prescription viewed',
    detail: 'Rx-4471 opened during the medication round',
    actor: 'Nurse Lakshmi',
    time: '11:47 AM',
  },
  {
    id: 'a4',
    kind: 'denied',
    title: 'Record access denied',
    detail: 'Partner admin requested the insurance claim pack',
    actor: 'Consent gate',
    time: 'Yesterday, 4:02 PM',
  },
  {
    id: 'a5',
    kind: 'view',
    title: 'Insurance claim viewed',
    detail: 'Claim pack summary read by you',
    actor: 'You',
    time: '18 Mar, 6:40 PM',
  },
  {
    id: 'a6',
    kind: 'change',
    title: 'Consent renewed',
    detail: 'Guardian consent re-signed for the care team',
    actor: 'You',
    time: '17 Mar, 9:05 AM',
  },
  {
    id: 'a7',
    kind: 'change',
    title: 'Document uploaded',
    detail: 'Insurance claim pack added to the vault',
    actor: 'Nurse Lakshmi',
    time: '16 Mar, 5:22 PM',
  },
]

export const ENTRY_POOL: Omit<AuditEntry, 'fresh'>[] = [
  {
    id: 'live-v1',
    kind: 'view',
    title: 'Vitals history viewed',
    detail: 'Weekly readings reviewed from the vault',
    actor: 'Dr. Meera Nair',
    time: '3:05 PM',
  },
  {
    id: 'live-c1',
    kind: 'change',
    title: 'Visit note appended',
    detail: 'Afternoon visit note sealed to the care record',
    actor: 'Nurse Lakshmi',
    time: '3:12 PM',
  },
  {
    id: 'live-v2',
    kind: 'view',
    title: 'Care plan reviewed',
    detail: 'Goals and progress checked by the care team',
    actor: 'Nurse Lakshmi',
    time: '3:20 PM',
  },
]

export const viewCount = (entries: AuditEntry[]): number => entries.filter((e) => e.kind === 'view').length
export const changeCount = (entries: AuditEntry[]): number => entries.filter((e) => e.kind === 'change').length
export const deniedCount = (entries: AuditEntry[]): number => entries.filter((e) => e.kind === 'denied').length
export const lockedCount = (docs: RecordDoc[]): number => docs.filter((d) => d.locked).length

export const AUDIT_FILTERS = ['all', 'view', 'change', 'denied'] as const
export type AuditFilter = (typeof AUDIT_FILTERS)[number]

export const FILTER_LABELS: Record<AuditFilter, string> = {
  all: 'All',
  view: 'Views',
  change: 'Edits',
  denied: 'Denied',
}

export const filterEntries = (entries: AuditEntry[], filter: AuditFilter): AuditEntry[] =>
  filter === 'all' ? entries : entries.filter((e) => e.kind === filter)

export const filterCountOf = (entries: AuditEntry[], filter: AuditFilter): number =>
  filterEntries(entries, filter).length

export function buildExportLines(docs: RecordDoc[], entries: AuditEntry[]): string {
  const lines: string[] = []
  lines.push('AYVAA CARE RECORDS - PRIVATE EXPORT')
  lines.push(`Patient: ${VAULT_FACTS.patientFirst} (${VAULT_FACTS.planCategory} plan)`)
  lines.push('Generated: 20 Mar 2026')
  lines.push('')
  lines.push(`DOCUMENTS (${docs.length})`)
  docs.forEach((d) => lines.push(`- ${d.name} | ${d.category} | ${d.locked ? 'Consent locked' : 'Open to care team'}`))
  lines.push('')
  lines.push(`AUDIT LEDGER (${entries.length} entries, immutable)`)
  entries.forEach((e) => lines.push(`- [${e.kind.toUpperCase()}] ${e.title} | ${e.actor} | ${e.time}`))
  lines.push('')
  lines.push(VAULT_FACTS.retention)
  return lines.join('\n')
}
