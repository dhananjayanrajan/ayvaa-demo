import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  FileText,
  Scale,
  ShieldCheck,
  ShieldAlert,
  Unlock,
  Plus,
  Check,
  Loader2,
  X,
  Clock,
  Trash2,
  AlertTriangle,
  Calendar,
  Lock,
  History,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AppBar } from '@/components/phone/AppBar'
import { Screen } from '@/components/phone/Screen'
import { Card, Chip, Tile } from '@/components/phone/kit'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

type RecordType = {
  id: string
  label: string
  icon: LucideIcon
  years: number
  records: number
  lastEdited: string
  nextPurge: string
  purgeCount: number
}

type LegalHold = {
  id: string
  patient: string
  initials: string
  caseRef: string
  reason: string
  placedOn: string
  status: 'active' | 'lifted'
}

type AuditEvent = {
  id: string
  action: string
  actor: string
  when: string
  icon: LucideIcon
}

const INITIAL_POLICY: RecordType = {
  id: 'session-notes',
  label: 'Clinical session notes',
  icon: FileText,
  years: 7,
  records: 14208,
  lastEdited: '12 days ago',
  nextPurge: '23 days',
  purgeCount: 842,
}

const INITIAL_HOLDS: LegalHold[] = [
  { id: 'h1', patient: 'Ramesh Rao', initials: 'RR', caseRef: 'LGL-2026-041', reason: 'Pending litigation review with external counsel regarding treatment protocol dispute.', placedOn: 'Mar 02, 2026', status: 'active' },
  { id: 'h2', patient: 'Shanta Iyer', initials: 'SI', caseRef: 'LGL-2026-038', reason: 'Insurance claim dispute awaiting adjudication from Star Health.', placedOn: 'Feb 18, 2026', status: 'active' },
  { id: 'h3', patient: 'Arjun Deshmukh', initials: 'AD', caseRef: 'LGL-2026-022', reason: 'Regulatory audit request from state medical board.', placedOn: 'Jan 10, 2026', status: 'lifted' },
]

const AUDIT_EVENTS: AuditEvent[] = [
  { id: 'e1', action: 'Policy sealed after edit', actor: 'Priya Menon', when: '2 hours ago', icon: ShieldCheck },
  { id: 'e2', action: 'Legal hold lifted', actor: 'Ravi Shankar', when: 'Yesterday', icon: Unlock },
  { id: 'e3', action: 'Retention updated to 7 yrs', actor: 'Priya Menon', when: '3 days ago', icon: Scale },
  { id: 'e4', action: 'Legal hold placed', actor: 'Admin System', when: '5 days ago', icon: ShieldAlert },
]

const PATIENTS = [
  { name: 'Mr. Ramesh Rao', initials: 'RR', age: 68, ward: 'Cardiology' },
  { name: 'Mrs. Shanta Iyer', initials: 'SI', age: 74, ward: 'Geriatrics' },
  { name: 'Lakshmi Narayan', initials: 'LN', age: 82, ward: 'Neurology' },
  { name: 'Kavya Reddy', initials: 'KR', age: 59, ward: 'Oncology' },
]

const PRESETS = [1, 3, 5, 7, 10, 15]

function SectionMarker({ label, trail, tone = 'emerald' }: { label: string; trail?: React.ReactNode; tone?: 'emerald' | 'rose' | 'blue' }) {
  const toneClass = tone === 'rose' ? 'bg-rose-500' : tone === 'blue' ? 'bg-blue-500' : 'bg-emerald-500'
  return (
    <div className="flex items-center gap-2.5 px-1">
      <div className={cn('h-3 w-1 rounded-full', toneClass)} />
      <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/55">{label}</span>
      <div className="h-px flex-1 bg-[#0B211B]/[0.08]" />
      {trail}
    </div>
  )
}

function PolicyHero({
  policy,
  holdsCount,
  onEdit,
}: {
  policy: RecordType
  holdsCount: number
  onEdit: () => void
}) {
  const Icon = policy.icon
  return (
    <div className="shrink-0 relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
      <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <div className="h-3 w-1 rounded-full bg-emerald-400" />
              <span className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/60">Active retention policy</span>
            </div>
            <h2 className="mt-1.5 text-[20px] font-extrabold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-emerald-100 via-emerald-200 to-teal-100 bg-clip-text text-transparent">
                {policy.label}
              </span>
            </h2>
          </div>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-400/10 text-emerald-200">
            <Icon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
          </span>
        </div>

        <div className="mt-3.5 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-white/[0.04] px-3 py-2.5">
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/50">Retention</div>
            <div className="mt-0.5 flex items-baseline gap-1">
              <span className="text-[20px] font-extrabold tabular-nums leading-none tracking-tight text-white">{policy.years}</span>
              <span className="text-[10px] font-bold text-emerald-100/60">years</span>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] px-3 py-2.5">
            <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/50">Records</div>
            <div className="mt-0.5 flex items-baseline gap-1">
              <span className="text-[20px] font-extrabold tabular-nums leading-none tracking-tight text-white">{(policy.records / 1000).toFixed(1)}k</span>
            </div>
          </div>
        </div>

        <div className="mt-2.5 flex items-center gap-2.5 rounded-2xl bg-amber-400/[0.06] px-3 py-2.5">
          <Clock className="h-3.5 w-3.5 shrink-0 text-amber-300" strokeWidth={2.2} aria-hidden />
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-bold text-amber-100">
              Next purge in <span className="tabular-nums">{policy.nextPurge}</span>
            </div>
            <div className="text-[9.5px] font-semibold text-amber-100/60">
              <span className="tabular-nums">{policy.purgeCount}</span> records scheduled
            </div>
          </div>
          <Chip intent="warning" className="shrink-0 border-transparent bg-amber-400/15 text-amber-200">
            Soon
          </Chip>
        </div>

        <div className="mt-2.5 grid grid-cols-1 gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={onEdit}
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-2.5 shadow-[0_14px_28px_-14px_rgba(16,185,129,0.7)]"
          >
            <Scale className="h-3.5 w-3.5 text-white" strokeWidth={2.4} aria-hidden />
            <span className="text-[11.5px] font-bold text-white">Edit policy</span>
          </motion.button>
        </div>

        <div className="mt-2 flex items-center gap-2 rounded-xl bg-white/[0.03] px-3 py-2">
          <History className="h-3 w-3 text-emerald-300/60" strokeWidth={2.4} aria-hidden />
          <span className="text-[10px] font-semibold text-emerald-100/50">Audit trail sealed</span>
          <span className="h-0.5 w-0.5 rounded-full bg-emerald-100/20" aria-hidden />
          <span className="text-[10px] font-semibold tabular-nums text-emerald-100/50">{holdsCount} holds override</span>
        </div>
      </div>
    </div>
  )
}

function HoldsList({ holds, onLift }: { holds: LegalHold[]; onLift: (id: string) => void }) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const activeHolds = holds.filter((h) => h.status === 'active')
  const liftedHolds = holds.filter((h) => h.status === 'lifted')

  return (
    <div className="shrink-0 flex flex-col gap-3">
      <SectionMarker
        label="Active legal holds"
        trail={
          <Chip intent="danger" dot className="border-transparent">
            {activeHolds.length}
          </Chip>
        }
        tone="rose"
      />
      <Card>
        <div className="p-5">
          <p className="mb-4 text-[11px] font-semibold leading-relaxed text-[#0B211B]/55">
            Frozen records exempt from auto-purge. Lifted only by admin with case ref.
          </p>
          <div className="flex flex-col gap-2">
            {activeHolds.map((h) => {
              const isExpanded = expandedId === h.id
              return (
                <div key={h.id} className="overflow-hidden rounded-2xl bg-[#0B211B]/[0.03] transition-colors hover:bg-[#0B211B]/[0.05]">
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : h.id)}
                    className="flex w-full items-start gap-3 px-4 py-3.5 text-left"
                  >
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-rose-400 to-red-500 text-[11px] font-extrabold text-white shadow-[0_6px_12px_-6px_rgba(225,29,72,0.5)]">
                      {h.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-[13px] font-extrabold tracking-tight text-[#0B211B]">{h.patient}</span>
                        <Chip intent="danger" className="shrink-0 border-transparent bg-rose-500/[0.08] text-rose-600">
                          Frozen
                        </Chip>
                      </div>
                      <div className="mt-1 text-[10px] font-semibold tabular-nums text-[#0B211B]/50">
                        {h.caseRef}
                      </div>
                      <div className="text-[10px] font-semibold text-[#0B211B]/40">
                        Placed {h.placedOn}
                      </div>
                    </div>
                    <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0 pt-1 text-[#0B211B]/40">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-[#0B211B]/[0.06] px-4 pb-4 pt-3.5">
                          <div className="rounded-xl bg-[#0B211B]/[0.03] px-3.5 py-3">
                            <div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">Reason for hold</div>
                            <p className="mt-1.5 text-pretty text-[11.5px] font-semibold leading-relaxed text-[#0B211B]/75">{h.reason}</p>
                          </div>
                          <motion.button
                            type="button"
                            whileTap={{ scale: 0.97 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              onLift(h.id)
                            }}
                            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-rose-500/[0.08] py-2.5 text-[12px] font-bold text-rose-600 transition-colors hover:bg-rose-500/[0.14]"
                          >
                            <Unlock className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
                            Lift legal hold
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          {liftedHolds.length > 0 && (
            <div className="mt-5">
              <div className="mb-2.5 flex items-center gap-2">
                <div className="h-2.5 w-0.5 rounded-full bg-[#0B211B]/25" />
                <span className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Lifted</span>
                <span className="text-[9.5px] font-bold tabular-nums text-[#0B211B]/30">{liftedHolds.length}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {liftedHolds.map((h) => (
                  <div key={h.id} className="flex items-center gap-2.5 rounded-xl bg-[#0B211B]/[0.02] px-3.5 py-2.5">
                    <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#0B211B]/[0.05] text-[9px] font-extrabold text-[#0B211B]/40">
                      {h.initials}
                    </div>
                    <span className="min-w-0 flex-1 truncate text-[11.5px] font-semibold text-[#0B211B]/55 line-through decoration-[#0B211B]/20">{h.patient}</span>
                    <Chip intent="neutral" className="shrink-0 border-transparent bg-[#0B211B]/[0.05] text-[#0B211B]/45">
                      Resolved
                    </Chip>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

function PurgePreview({ policy }: { policy: RecordType }) {
  const windows = [
    { label: 'Next 30 days', count: 124, pct: 14 },
    { label: 'Next 60 days', count: 318, pct: 37 },
    { label: 'Next 90 days', count: 842, pct: 100 },
  ]
  return (
    <div className="shrink-0 flex flex-col gap-3">
      <SectionMarker
        label="Purge preview"
        trail={<Chip intent="info" dot className="border-transparent">Scheduled</Chip>}
        tone="blue"
      />
      <Card>
        <div className="p-5">
          <div className="mb-4 flex items-start gap-3">
            <Tile icon={Trash2} tone="info" size="md" />
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-extrabold tracking-tight text-[#0B211B]">Upcoming deletions</div>
              <p className="mt-1 text-[11px] font-medium leading-relaxed text-[#0B211B]/55">
                Records past the retention window are auto-sealed before purge.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {windows.map((w) => (
              <div key={w.label} className="rounded-2xl bg-[#0B211B]/[0.03] p-3.5">
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="text-[11.5px] font-bold text-[#0B211B]/75">{w.label}</span>
                  <span className="text-[13px] font-extrabold tabular-nums text-[#0B211B]">{w.count}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[#0B211B]/[0.06]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${w.pct}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-sky-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}

function AuditTimeline() {
  return (
    <div className="shrink-0 flex flex-col gap-3">
      <SectionMarker
        label="Recent activity"
        trail={
          <Chip intent="neutral" className="border-transparent bg-[#0B211B]/[0.05] text-[#0B211B]/55">
            This policy
          </Chip>
        }
      />
      <Card>
        <div className="p-5">
          <div className="flex flex-col">
            {AUDIT_EVENTS.map((e, idx) => {
              const Icon = e.icon
              return (
                <div key={e.id} className="relative flex gap-3 py-3">
                  {idx < AUDIT_EVENTS.length - 1 && (
                    <div aria-hidden className="absolute left-[17px] top-[44px] h-[calc(100%-12px)] w-px bg-[#0B211B]/[0.08]" />
                  )}
                  <div className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-500/[0.08]">
                    <Icon className="h-4 w-4 text-emerald-600" strokeWidth={2.2} aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="text-[12px] font-bold tracking-tight text-[#0B211B]">{e.action}</div>
                    <div className="mt-1 text-[10px] font-semibold text-[#0B211B]/50">
                      {e.actor}
                    </div>
                    <div className="text-[10px] font-bold tabular-nums text-[#0B211B]/35">
                      {e.when}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Card>
    </div>
  )
}

function EditPolicySheet({
  currentYears,
  records,
  onClose,
  onSave,
}: {
  currentYears: number
  records: number
  onClose: () => void
  onSave: (years: number) => void
}) {
  const [years, setYears] = useState(currentYears)
  const [autoSeal, setAutoSeal] = useState(true)
  const [status, setStatus] = useState<'idle' | 'working' | 'done'>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout)
    },
    [],
  )

  const canSave = years !== currentYears && status === 'idle'
  const affectedRecords = Math.round(records * (years / currentYears))

  const handleSave = () => {
    if (!canSave) return
    setStatus('working')
    timers.current.push(
      setTimeout(() => setStatus('done'), 1100),
      setTimeout(() => {
        onSave(years)
        onClose()
      }, 2500),
    )
  }

  const tileTone = status === 'done' ? 'success' : status === 'working' ? 'info' : 'info'

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={status === 'idle' ? onClose : undefined}
        className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
      />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 380, damping: 40 }}
        className="absolute inset-x-0 bottom-0 z-50 flex h-[86%] flex-col overflow-hidden rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
      >
        <div className="shrink-0 px-5 pb-3.5 pt-4">
          <div aria-hidden className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
          <div className="flex items-start gap-3">
            <Tile icon={Scale} tone={tileTone} size="lg" />
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">
                {status === 'done' ? 'Policy sealed' : status === 'working' ? 'Sealing policy...' : 'Edit retention rules'}
              </div>
              <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                {status === 'done'
                  ? 'Changes written to the audit chain'
                  : 'Changes will be sealed immutably on save'}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={status !== 'idle'}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50 transition-colors hover:bg-[#0B211B]/[0.09] disabled:opacity-40"
              aria-label="Close sheet"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4 pt-3.5">
          <div className="flex flex-col gap-5">
            <div>
              <label className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/40">Retention duration</label>
              <div className="mt-2.5 grid grid-cols-3 gap-2">
                {PRESETS.map((y) => {
                  const isActive = years === y
                  return (
                    <motion.button
                      key={y}
                      type="button"
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setYears(y)}
                      disabled={status !== 'idle'}
                      className={cn(
                        'relative overflow-hidden rounded-2xl py-3 transition-all duration-300',
                        isActive
                          ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_10px_24px_-10px_rgba(16,185,129,0.7)]'
                          : 'bg-[#0B211B]/[0.04] text-[#0B211B] hover:bg-[#0B211B]/[0.08]',
                        status !== 'idle' && 'cursor-not-allowed opacity-60',
                      )}
                    >
                      {isActive && (
                        <div aria-hidden className="pointer-events-none absolute -right-2 -top-2 h-8 w-8 rounded-full bg-white/20 blur-md" />
                      )}
                      <div className="relative">
                        <div className={cn('text-[17px] font-extrabold tabular-nums leading-none', isActive ? 'text-white' : 'text-[#0B211B]')}>
                          {y}
                        </div>
                        <div className={cn('mt-1 text-[9px] font-bold uppercase tracking-[0.12em]', isActive ? 'text-white/80' : 'text-[#0B211B]/50')}>
                          Years
                        </div>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            <div className="rounded-2xl bg-[#0B211B]/[0.03] p-4">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#0B211B]/55">Records affected</span>
                <motion.span
                  key={affectedRecords}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[20px] font-extrabold tabular-nums leading-none text-[#0B211B]"
                >
                  {affectedRecords.toLocaleString()}
                </motion.span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#0B211B]/[0.06]">
                <motion.div
                  animate={{ width: `${Math.min(100, (years / 15) * 100)}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                />
              </div>
              <div className="mt-2 text-[10.5px] font-semibold text-[#0B211B]/50">
                <span className="tabular-nums">{records.toLocaleString()}</span> total records under this policy
              </div>
            </div>

            <button
              type="button"
              onClick={() => setAutoSeal(!autoSeal)}
              disabled={status !== 'idle'}
              className="flex items-center justify-between gap-3 rounded-2xl bg-[#0B211B]/[0.03] px-4 py-3.5 text-left transition-colors hover:bg-[#0B211B]/[0.06]"
            >
              <div className="flex items-center gap-3">
                <div className={cn('grid h-9 w-9 place-items-center rounded-xl transition-colors', autoSeal ? 'bg-emerald-500/15 text-emerald-600' : 'bg-[#0B211B]/[0.06] text-[#0B211B]/40')}>
                  <Lock className="h-4 w-4" strokeWidth={2.4} aria-hidden />
                </div>
                <div className="min-w-0">
                  <div className="text-[12.5px] font-bold text-[#0B211B]">Auto-seal on save</div>
                  <div className="text-[10.5px] font-semibold text-[#0B211B]/50">Lock changes in audit chain</div>
                </div>
              </div>
              <div className={cn('relative h-6 w-10 shrink-0 rounded-full transition-colors', autoSeal ? 'bg-emerald-500' : 'bg-[#0B211B]/[0.15]')}>
                <motion.div
                  animate={{ x: autoSeal ? 16 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
                />
              </div>
            </button>

            <div className="flex items-start gap-2.5 rounded-2xl bg-blue-500/[0.06] px-3.5 py-3 ring-1 ring-blue-500/10">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" strokeWidth={2.2} aria-hidden />
              <p className="min-w-0 flex-1 text-[11px] font-semibold leading-relaxed text-blue-700">
                This change is immutable once sealed. Any future modification requires a new policy version.
              </p>
            </div>

            {status === 'done' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2.5 rounded-2xl bg-emerald-500/[0.10] px-3.5 py-3 ring-1 ring-emerald-500/20"
              >
                <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[12px] font-extrabold text-emerald-700">Sealed in audit chain</div>
                  <p className="mt-0.5 text-[10.5px] font-semibold leading-relaxed text-emerald-700/80">
                    Closing automatically...
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div className="shrink-0 border-t border-[#0B211B]/[0.06] bg-white px-5 pb-6 pt-4">
          <motion.button
            type="button"
            whileTap={status === 'idle' && canSave ? { scale: 0.97 } : {}}
            onClick={handleSave}
            disabled={!canSave}
            className={cn(
              'relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl py-3.5 text-[13px] font-bold transition-all duration-300',
              status === 'done'
                ? 'bg-emerald-500 text-white shadow-[0_18px_36px_-18px_rgba(16,185,129,0.85)]'
                : status === 'working'
                ? 'cursor-wait bg-[#0B211B]/[0.30] text-white/80'
                : canSave
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
                : 'bg-[#0B211B]/[0.08] text-[#0B211B]/30 cursor-not-allowed',
            )}
          >
            {status === 'done' && (
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700" style={{ transform: 'translateX(100%)' }} />
            )}
            {status === 'working' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Sealing policy...
              </>
            ) : status === 'done' ? (
              <>
                <Check className="h-4 w-4" strokeWidth={2.8} aria-hidden />
                Sealed in audit chain
              </>
            ) : (
              <>
                <Scale className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                Save & seal policy
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </>
  )
}

function PlaceHoldSheet({
  onClose,
  onPlace,
}: {
  onClose: () => void
  onPlace: (patient: string, caseRef: string, reason: string, severity: 'low' | 'med' | 'high') => void
}) {
  const [patientIdx, setPatientIdx] = useState<number | null>(null)
  const [caseRef, setCaseRef] = useState('')
  const [reason, setReason] = useState('')
  const [severity, setSeverity] = useState<'low' | 'med' | 'high'>('med')
  const [status, setStatus] = useState<'idle' | 'working' | 'done'>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout)
    },
    [],
  )

  const canSave = patientIdx !== null && caseRef.trim().length >= 3 && reason.trim().length >= 5 && status === 'idle'

  const handleSave = () => {
    if (!canSave || patientIdx === null) return
    setStatus('working')
    timers.current.push(
      setTimeout(() => setStatus('done'), 1100),
      setTimeout(() => {
        const p = PATIENTS[patientIdx]
        onPlace(p.name, caseRef, reason, severity)
        onClose()
      }, 2500),
    )
  }

  const severityOptions: { value: 'low' | 'med' | 'high'; label: string; desc: string; intent: 'info' | 'warning' | 'danger' }[] = [
    { value: 'low', label: 'Low', desc: 'Administrative freeze', intent: 'info' },
    { value: 'med', label: 'Medium', desc: 'Dispute or audit', intent: 'warning' },
    { value: 'high', label: 'High', desc: 'Litigation or legal', intent: 'danger' },
  ]

  const tileTone = status === 'done' ? 'success' : 'warning'

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={status === 'idle' ? onClose : undefined}
        className="absolute inset-0 z-40 bg-[rgba(15,26,22,0.5)] backdrop-blur-[2px]"
      />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 380, damping: 40 }}
        className="absolute inset-x-0 bottom-0 z-50 flex h-[86%] flex-col overflow-hidden rounded-t-[28px] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.35)]"
      >
        <div className="shrink-0 px-5 pb-3.5 pt-4">
          <div aria-hidden className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-[#0B211B]/15" />
          <div className="flex items-start gap-3">
            <Tile icon={ShieldAlert} tone={tileTone} size="lg" />
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">
                {status === 'done' ? 'Hold sealed' : status === 'working' ? 'Sealing hold...' : 'Place legal hold'}
              </div>
              <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
                {status === 'done' ? 'Records frozen immediately' : 'Freeze records to prevent auto-deletion'}
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={status !== 'idle'}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50 transition-colors hover:bg-[#0B211B]/[0.09] disabled:opacity-40"
              aria-label="Close sheet"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4 pt-3.5">
          <div className="flex flex-col gap-5">
            <div>
              <label className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/40">Patient record</label>
              <div role="radiogroup" className="mt-2.5 flex flex-col gap-1.5">
                {PATIENTS.map((p, idx) => {
                  const isActive = patientIdx === idx
                  return (
                    <motion.button
                      key={p.name}
                      type="button"
                      role="radio"
                      aria-checked={isActive}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPatientIdx(idx)}
                      disabled={status !== 'idle'}
                      className={cn(
                        'flex items-center gap-3 rounded-2xl p-3 text-left transition-all duration-200',
                        isActive
                          ? 'bg-emerald-500/[0.08] ring-1 ring-emerald-500/30'
                          : 'bg-[#0B211B]/[0.03] hover:bg-[#0B211B]/[0.06]',
                        status !== 'idle' && 'cursor-not-allowed opacity-60',
                      )}
                    >
                      <div
                        className={cn(
                          'grid h-10 w-10 shrink-0 place-items-center rounded-xl text-[11px] font-extrabold text-white transition-all',
                          isActive ? 'bg-gradient-to-br from-emerald-500 to-teal-500 shadow-[0_6px_12px_-6px_rgba(16,185,129,0.5)]' : 'bg-gradient-to-br from-[#0B211B]/20 to-[#0B211B]/10 text-[#0B211B]/50',
                        )}
                      >
                        {p.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[12.5px] font-bold text-[#0B211B]">{p.name}</div>
                        <div className="mt-0.5 flex items-center gap-1.5 text-[10px] font-semibold text-[#0B211B]/50">
                          <span>Age {p.age}</span>
                          <span className="h-0.5 w-0.5 rounded-full bg-[#0B211B]/30" aria-hidden />
                          <span>{p.ward}</span>
                        </div>
                      </div>
                      <div className={cn('grid h-5 w-5 shrink-0 place-items-center rounded-full transition-all', isActive ? 'bg-emerald-500' : 'border border-[#0B211B]/20')}>
                        {isActive && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 25 }}>
                            <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/40">Case reference</label>
              <div className="mt-2 flex items-center gap-2 rounded-2xl bg-[#0B211B]/[0.04] px-4 py-3 ring-1 ring-transparent transition-all focus-within:bg-[#0B211B]/[0.06] focus-within:ring-emerald-500/20">
                <Calendar className="h-4 w-4 shrink-0 text-[#0B211B]/40" strokeWidth={2.2} aria-hidden />
                <input
                  type="text"
                  value={caseRef}
                  onChange={(e) => setCaseRef(e.target.value)}
                  disabled={status !== 'idle'}
                  placeholder="Case ref..."
                  className="min-w-0 flex-1 bg-transparent text-[13px] font-bold text-[#0B211B] placeholder:text-[#0B211B]/25 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/40">Reason for hold</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                disabled={status !== 'idle'}
                rows={3}
                placeholder="Reason..."
                className="mt-2 w-full resize-none rounded-2xl bg-[#0B211B]/[0.04] px-4 py-3 text-[13px] font-medium text-[#0B211B] placeholder:text-[#0B211B]/25 outline-none transition-colors focus:bg-[#0B211B]/[0.06]"
              />
            </div>

            <div>
              <label className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/40">Severity</label>
              <div role="radiogroup" className="mt-2.5 grid grid-cols-3 gap-1.5">
                {severityOptions.map((opt) => {
                  const isActive = severity === opt.value
                  const intentClass =
                    opt.intent === 'danger'
                      ? 'bg-rose-500/[0.12] ring-rose-500/30 text-rose-600'
                      : opt.intent === 'warning'
                      ? 'bg-amber-500/[0.12] ring-amber-500/30 text-amber-600'
                      : 'bg-blue-500/[0.12] ring-blue-500/30 text-blue-600'
                  return (
                    <motion.button
                      key={opt.value}
                      type="button"
                      role="radio"
                      aria-checked={isActive}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setSeverity(opt.value)}
                      disabled={status !== 'idle'}
                      className={cn(
                        'rounded-2xl py-3 text-center transition-all duration-200',
                        isActive ? cn(intentClass, 'ring-1') : 'bg-[#0B211B]/[0.04] text-[#0B211B]/60 hover:bg-[#0B211B]/[0.07]',
                        status !== 'idle' && 'cursor-not-allowed opacity-60',
                      )}
                    >
                      <div className="text-[13px] font-extrabold leading-none">{opt.label}</div>
                      <div className="mt-1 text-[9px] font-semibold uppercase tracking-wider opacity-70">{opt.desc}</div>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {status === 'done' && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2.5 rounded-2xl bg-emerald-500/[0.10] px-3.5 py-3 ring-1 ring-emerald-500/20"
              >
                <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[12px] font-extrabold text-emerald-700">Hold sealed in audit log</div>
                  <p className="mt-0.5 text-[10.5px] font-semibold leading-relaxed text-emerald-700/80">
                    Records are frozen · closing automatically
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div className="shrink-0 border-t border-[#0B211B]/[0.06] bg-white px-5 pb-6 pt-4">
          <motion.button
            type="button"
            whileTap={status === 'idle' && canSave ? { scale: 0.97 } : {}}
            onClick={handleSave}
            disabled={!canSave}
            className={cn(
              'relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl py-3.5 text-[13px] font-bold transition-all duration-300',
              status === 'done'
                ? 'bg-emerald-500 text-white shadow-[0_18px_36px_-18px_rgba(16,185,129,0.85)]'
                : status === 'working'
                ? 'cursor-wait bg-[#0B211B]/[0.30] text-white/80'
                : canSave
                ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-[0_18px_36px_-18px_rgba(225,29,72,0.65)]'
                : 'bg-[#0B211B]/[0.08] text-[#0B211B]/30 cursor-not-allowed',
            )}
          >
            {status === 'working' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Sealing hold...
              </>
            ) : status === 'done' ? (
              <>
                <Check className="h-4 w-4" strokeWidth={2.8} aria-hidden />
                Hold sealed in audit log
              </>
            ) : (
              <>
                <ShieldAlert className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                Place & seal hold
              </>
            )}
          </motion.button>
          {!canSave && status === 'idle' && (
            <div className="mt-2 text-center text-[10.5px] font-semibold text-[#0B211B]/40">
              {patientIdx === null ? 'Select a patient to continue' : caseRef.trim().length < 3 ? 'Case reference must be at least 3 chars' : 'Add a reason to continue'}
            </div>
          )}
        </div>
      </motion.div>
    </>
  )
}

export function A16() {
  const { navigate } = useRouter()
  const { notify } = useDemo()

  const [policy, setPolicy] = useState<RecordType>(INITIAL_POLICY)
  const [holds, setHolds] = useState<LegalHold[]>(INITIAL_HOLDS)
  const [editOpen, setEditOpen] = useState(false)
  const [holdOpen, setHoldOpen] = useState(false)

  const activeHoldsCount = holds.filter((h) => h.status === 'active').length

  const handleSavePolicy = (years: number) => {
    setPolicy((prev) => ({
      ...prev,
      years,
      lastEdited: 'Just now',
      purgeCount: Math.round(prev.purgeCount * (years / prev.years)),
    }))
    notify({ title: 'Policy sealed', body: `Retention updated to ${years} years`, kind: 'ok' })
  }

  const handlePlaceHold = (patient: string, caseRef: string, reason: string) => {
    const p = PATIENTS.find((pt) => pt.name === patient)
    const newHold: LegalHold = {
      id: `h-${Date.now()}`,
      patient,
      initials: p?.initials ?? 'XX',
      caseRef,
      reason,
      placedOn: 'Today',
      status: 'active',
    }
    setHolds((prev) => [newHold, ...prev])
    notify({ title: 'Hold sealed', body: `${patient}'s records are frozen`, kind: 'ok' })
  }

  const handleLiftHold = (id: string) => {
    setHolds((prev) => prev.map((h) => (h.id === id ? { ...h, status: 'lifted' as const } : h)))
    notify({ title: 'Hold lifted', body: 'Records will resume normal retention', kind: 'info' })
  }

  return (
    <Screen>
      <AppBar
        title="Policy editor"
        onBack={() => navigate('/admin/a07')}
        trailing={
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setHoldOpen(true)}
            className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_8px_16px_-8px_rgba(16,185,129,0.6)]"
            aria-label="Place new hold"
          >
            <Plus className="h-4 w-4" strokeWidth={2.6} aria-hidden />
          </motion.button>
        }
      />

      <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-4 pb-8 pt-3">
        <PolicyHero
          policy={policy}
          holdsCount={activeHoldsCount}
          onEdit={() => setEditOpen(true)}
        />

        <HoldsList holds={holds} onLift={handleLiftHold} />

        <PurgePreview policy={policy} />

        <AuditTimeline />

        <div className="h-2 shrink-0" />
      </div>

      <AnimatePresence>
        {editOpen && (
          <EditPolicySheet
            currentYears={policy.years}
            records={policy.records}
            onClose={() => setEditOpen(false)}
            onSave={handleSavePolicy}
          />
        )}
        {holdOpen && <PlaceHoldSheet onClose={() => setHoldOpen(false)} onPlace={handlePlaceHold} />}
      </AnimatePresence>
    </Screen>
  )
}
