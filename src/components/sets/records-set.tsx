import { type ReactNode, useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, ChevronRight, Download, Eye, FileText, Loader2, Lock, type LucideIcon, PenLine, ScrollText, ShieldAlert, ShieldCheck } from 'lucide-react'
import { SheetShell } from '@/components/base/phone/sheet-shell'
import { Card, Chip, Tile, TimeChip } from '@/components/base/phone/kit'
import { AUDIT_ENTRIES, AUDIT_FILTERS, type AuditEntry, type AuditFilter, type AuditKind, FILTER_LABELS, RECORD_DOCS, type RecordDoc, VAULT_FACTS, buildExportLines, changeCount, deniedCount, filterCountOf, filterEntries, lockedCount, viewCount } from '@/data/patientRecords'
import { SegmentedTabs } from '@/components/base/phone/segmented-tabs'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { Row } from '@/components/base/phone/row'
import { ExpandRow } from '@/components/base/phone/expand-row'
import { useDemo } from '@/lib/store'
import { AccentHero } from '@/components/base/phone/accent-hero'
import { StatusPill } from '@/components/base/phone/status-pill'
import { HeroHighlight, HeroTopRow } from '@/components/base/phone/hero-cells'

const KIND_ICON: Record<AuditKind, LucideIcon> = {
  view: Eye,
  change: PenLine,
  denied: ShieldAlert,
}

const KIND_TILE: Record<AuditKind, string> = {
  view: 'bg-sky-500/[0.12] text-sky-600',
  change: 'bg-emerald-500 text-white',
  denied: 'bg-rose-500/[0.12] text-rose-600',
}

interface AuditLogSheetProps {
  entries: AuditEntry[]
  initialFilter: AuditFilter
  onClose: () => void
  onOpenConsent: () => void
}

export function AuditLogSheet({ entries, initialFilter, onClose, onOpenConsent }: AuditLogSheetProps) {
  const [filter, setFilter] = useState<AuditFilter>(initialFilter)
  const rows = filterEntries(entries, filter)

  const tabs = AUDIT_FILTERS.map((f) => ({
    id: f,
    label: FILTER_LABELS[f],
    count: filterCountOf(entries, f),
  }))

  return (
    <SheetShell
      icon={ScrollText}
      tone="info"
      title="Full audit log"
      subtitle={`${entries.length} entries since ${VAULT_FACTS.since}`}
      onClose={onClose}
      footer={
        <div>
          <button
            type="button"
            onClick={onOpenConsent}
            className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
          >
            <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Open consent records</span>
          </button>
          <p className="mt-2 text-center text-[10px] font-bold text-[#0B211B]/45">{VAULT_FACTS.retention}</p>
        </div>
      }
    >
      <div className="flex flex-col gap-5 pb-2">
        <SegmentedTabs tabs={tabs} value={filter} onChange={(id) => setFilter(id as AuditFilter)} layoutId="audit-tabs" tone="dark" label="normal" count="baseline" />

        <div className="flex flex-col gap-2.5">
          {rows.map((entry) => {
            const Icon = KIND_ICON[entry.kind]
            return (
              <div
                key={entry.id}
                className={cn(
                  'flex items-start gap-3.5 rounded-2xl p-4 transition-colors duration-200 hover:bg-[#0B211B]/[0.06]',
                  entry.id === initialFilter ? 'bg-[#0B211B]/[0.03]' : 'bg-[#0B211B]/[0.03]',
                )}
              >
                <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-xl', KIND_TILE[entry.kind])}>
                  <Icon className="h-[18px] w-[18px]" strokeWidth={2.4} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block break-words text-[13px] font-extrabold leading-snug tracking-tight text-[#0B211B]">
                    {entry.title}
                  </span>
                  <span className="mt-1 block break-words text-[11.5px] font-medium leading-snug text-[#0B211B]/55">
                    {entry.detail}
                  </span>
                  <span className="mt-2 flex items-center justify-between gap-3">
                    <span className="min-w-0 break-words text-[10px] font-bold uppercase tracking-[0.12em] text-[#0B211B]/40">
                      {entry.actor}
                    </span>
                    <TimeChip>{entry.time}</TimeChip>
                  </span>
                </span>
              </div>
            )
          })}
        </div>

        <div>
          <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#0B211B]/40">Ledger totals</div>
          <div className="mt-3 rounded-2xl bg-[#0B211B]/[0.03] px-4 py-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <span className="flex min-w-0 items-center gap-2">
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
                  <span className="text-[12px] font-semibold text-[#0B211B]/65">Views logged</span>
                </span>
                <span className="shrink-0 text-[12.5px] font-bold text-[#0B211B]/80 tabular-nums">
                  {viewCount(entries)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="flex min-w-0 items-center gap-2">
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  <span className="text-[12px] font-semibold text-[#0B211B]/65">Changes sealed</span>
                </span>
                <span className="shrink-0 text-[12.5px] font-bold text-[#0B211B]/80 tabular-nums">
                  {changeCount(entries)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="flex min-w-0 items-center gap-2">
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
                  <span className="text-[12px] font-semibold text-[#0B211B]/65">Accesses denied</span>
                </span>
                <span className="shrink-0 text-[12.5px] font-bold text-[#0B211B]/80 tabular-nums">
                  {deniedCount(entries)}
                </span>
              </div>
            </div>
            <p className="mt-3.5 break-words text-[10.5px] font-medium leading-snug text-[#0B211B]/50">
              Denied entries stay in the ledger permanently, including who was blocked and why.
            </p>
          </div>
        </div>
      </div>
    </SheetShell>
  )
}

const KIND_UI: Record<AuditKind, { icon: LucideIcon; tile: string }> = {
  view: { icon: Eye, tile: 'bg-sky-500/[0.12] text-sky-600' },
  change: { icon: PenLine, tile: 'bg-emerald-500 text-white' },
  denied: { icon: ShieldAlert, tile: 'bg-rose-500/[0.12] text-rose-600' },
}

interface AuditTimelineProps {
  entries: AuditEntry[]
  freshId: string | null
  onOpenAll: () => void
}

function FactBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/45">{label}</div>
      <div className="mt-0.5 break-words text-[12.5px] font-bold leading-snug text-[#0B211B]/80">{value}</div>
    </div>
  )
}

export function AuditTimeline({ entries, freshId, onOpenAll }: AuditTimelineProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  const openEntry = (id: string) => setOpenId((cur) => (cur === id ? null : id))

  return (
    <Card>
      <div className="p-5">
        <div className="flex items-start gap-3.5">
          <Tile icon={ScrollText} tone="success" size="lg" />
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">Audit ledger</span>
              <Chip intent="success">Immutable</Chip>
            </div>
            <p className="mt-1 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              Tap a segment or an entry to open its sealed record.
            </p>
          </div>
        </div>

        <div className="mt-5">
          <LedgerBar entries={entries} freshId={freshId} onSelect={openEntry} />
        </div>

        <div className="mt-5 flex flex-col gap-2.5">
          {entries.map((entry) => {
            const ui = KIND_UI[entry.kind]
            const open = openId === entry.id
            const fresh = entry.id === freshId
            return (
              <motion.div
                key={entry.id}
                layout
                initial={fresh ? { opacity: 0, y: 12 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className={cn('rounded-2xl', fresh ? 'bg-sky-500/[0.09]' : 'bg-[#0B211B]/[0.03]')}
              >
                <Row
                  align="start"
                  padding="p-4"
                  leading={
                    <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-xl', ui.tile)}>
                      <ui.icon className="h-[18px] w-[18px]" strokeWidth={2.4} aria-hidden />
                    </span>
                  }
                  title={entry.title}
                  titleClassName="text-[13px] font-extrabold"
                  subtitle={entry.detail}
                  subtitleClassName="mt-1 text-[11.5px] font-medium leading-snug text-[#0B211B]/55"
                  expandable
                  open={open}
                  onToggle={() => openEntry(entry.id)}
                  chevronVisible={false}
                  hoverClassName="hover:bg-[#0B211B]/[0.06]"
                  trailing={
                    <span className="flex shrink-0 flex-col items-end gap-1.5">
                      {fresh && (
                        <Chip intent="live" dot>
                          New
                        </Chip>
                      )}
                      <TimeChip>{entry.time}</TimeChip>
                      <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
                        <ChevronDown className="h-4 w-4 text-[#0B211B]/40" aria-hidden />
                      </motion.span>
                    </span>
                  }
                  expansionPadded={false}
                  expansion={
                    <div className="px-4 pb-4">
                      <div className="rounded-2xl bg-white px-4 py-4 shadow-[0_1px_2px_rgba(11,33,27,0.05)]">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                          <FactBlock label="Actor" value={entry.actor} />
                          <FactBlock label="Recorded" value={entry.time} />
                        </div>
                        <div className="mt-3.5">
                          <FactBlock
                            label="Sealed"
                            value={
                              entry.kind === 'denied'
                                ? 'Blocked by the consent gate, refusal kept permanently'
                                : 'Written to the immutable ledger, locked against edits'
                            }
                          />
                        </div>
                      </div>
                    </div>
                  }
                />
              </motion.div>
            )
          })}
        </div>

        <button
          type="button"
        onClick={onOpenAll}
          className="mt-5 w-full rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-[13px] font-bold text-[#0B211B]/75 transition-colors duration-200 hover:bg-[#0B211B]/[0.09]"
        >
          View all {entries.length} entries with filters
        </button>
      </div>
    </Card>
  )
}

export function DarkTimeChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-lg bg-white/[0.08] px-1.5 py-0.5 text-[10px] font-bold tabular-nums tracking-tight text-emerald-100/70">
      {children}
    </span>
  )
}

interface DocRowProps {
  doc: RecordDoc
  open: boolean
  onToggle: () => void
  onRequireConsent?: () => void
}

export function DocRow({ doc, open, onToggle, onRequireConsent }: DocRowProps) {
  const Icon = doc.icon

  return (
    <ExpandRow
      icon={Icon}
      tone={doc.locked ? 'warning' : 'success'}
      dense={false}
      open={open}
      onToggle={onToggle}
      title={doc.name}
      sub={doc.note}
      trailing={
        <span className="flex shrink-0 flex-col items-end gap-1.5">
          {doc.locked ? (
            <Chip intent="warning" icon={Lock}>
              Locked
            </Chip>
          ) : (
            doc.lastOpened && <TimeChip>{doc.lastOpened}</TimeChip>
          )}
        </span>
      }
    >
      <Card className="px-4 py-4">
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          {doc.locked ? (
            <>
              <FactBlock label="Sealed by" value={doc.sealedBy ?? 'Consent gate'} />
              <FactBlock label="Type" value={doc.category} />
            </>
          ) : (
            <>
              <FactBlock label="Last opened" value={doc.lastOpened ?? 'Never'} />
              <FactBlock label="Type" value={doc.category} />
            </>
          )}
        </div>
        <div className="mt-3.5">
          <FactBlock
            label={doc.locked ? 'Unlocks with' : 'Consent basis'}
            value={
              doc.locked
                ? (doc.unlockNote ?? 'Guardian consent')
                : (doc.consentBasis ?? 'Guardian consent')
            }
          />
        </div>
        {!doc.locked && doc.openedBy && (
          <div className="mt-3.5">
            <FactBlock label="Opened by" value={doc.openedBy} />
          </div>
        )}
        {doc.locked && onRequireConsent && (
          <button
            type="button"
            onClick={onRequireConsent}
            className="mt-4 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3 text-[12.5px] font-bold text-white shadow-[0_14px_28px_-14px_rgba(5,150,105,0.75)]"
          >
            <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Review consent to unlock</span>
          </button>
        )}
      </Card>
    </ExpandRow>
  )
}

const SEGMENT: Record<AuditKind, string> = {
  view: 'bg-sky-500',
  change: 'bg-emerald-500',
  denied: 'bg-rose-500',
}

const GLOW: Record<AuditKind, string> = {
  view: 'shadow-[0_0_12px_rgba(14,165,233,0.55)]',
  change: 'shadow-[0_0_12px_rgba(16,185,129,0.55)]',
  denied: 'shadow-[0_0_12px_rgba(244,63,94,0.55)]',
}

interface LedgerBarProps {
  entries: AuditEntry[]
  freshId: string | null
  onSelect: (id: string) => void
}

export function LedgerBar({ entries, freshId, onSelect }: LedgerBarProps) {
  const oldestFirst = [...entries].reverse()

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#0B211B]/40">
          Entry mix, oldest to latest
        </span>
        <span className="text-[10px] font-extrabold tabular-nums text-[#0B211B]/40">{entries.length}</span>
      </div>

      <div className="mt-2 flex h-3 overflow-hidden rounded-full bg-[#0B211B]/[0.05]">
        {oldestFirst.map((entry, i) => {
          const isLatest = entry.id === entries[0].id
          return (
            <motion.button
              key={entry.id}
              type="button"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.05 * i, duration: 0.35, ease: 'easeOut' }}
              style={{ transformOrigin: 'left' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelect(entry.id)}
              aria-label={`Open entry, ${entry.title}`}
              className={cn(
                'h-full min-w-0 flex-1 transition-shadow duration-300',
                SEGMENT[entry.kind],
                isLatest && GLOW[entry.kind],
                entry.id === freshId && 'brightness-125',
              )}
            />
          )
        })}
      </div>

      <div className="mt-1.5 flex items-center justify-between">
        <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/30">Oldest</span>
        <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/30">Just now</span>
      </div>
    </div>
  )
}

interface RecordsCardProps {
  docs: RecordDoc[]
  onRequireConsent: () => void
}

export function RecordsCard({ docs, onRequireConsent }: RecordsCardProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  const locked = lockedCount(docs)

  return (
    <Card>
      <div className="p-5">
        <div className="flex items-start gap-3.5">
          <Tile icon={FileText} tone="success" size="lg" />
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-[15px] font-extrabold leading-snug tracking-tight text-[#0B211B]">
                Document vault
              </span>
              {locked > 0 ? (
                <Chip intent="warning" dot>
                  {locked} consent locked
                </Chip>
              ) : (
                <Chip intent="success">All open</Chip>
              )}
            </div>
            <p className="mt-1 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              Tap a file to see who opened it and under which consent.
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2.5">
          {docs.map((doc) => (
            <DocRow
              key={doc.id}
              doc={doc}
              open={openId === doc.id}
              onToggle={() => setOpenId((cur) => (cur === doc.id ? null : doc.id))}
              onRequireConsent={doc.locked ? onRequireConsent : undefined}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}

type Phase = 'idle' | 'working' | 'done'

interface RecordsExportSheetProps {
  onClose: () => void
}

export function RecordsExportSheet({ onClose }: RecordsExportSheetProps) {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<Phase>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const urlRef = useRef<string | null>(null)
  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout)
      if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    },
    [],
  )

  const exportRecords = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(
      setTimeout(() => {
        const blob = new Blob([buildExportLines(RECORD_DOCS, AUDIT_ENTRIES)], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        urlRef.current = url
        const anchor = document.createElement('a')
        anchor.href = url
        anchor.download = 'ayvaa-care-records.txt'
        anchor.click()
        setPhase('done')
      }, 900),
    )
    timers.current.push(
      setTimeout(
        () => notify({ title: 'Export saved', body: 'The private export landed in your downloads', kind: 'ok' }),
        1000,
      ),
    )
    timers.current.push(
      setTimeout(() => {
        if (urlRef.current) {
          URL.revokeObjectURL(urlRef.current)
          urlRef.current = null
        }
      }, 4000),
    )
  }

  return (
    <SheetShell
      icon={Download}
      tone={phase === 'done' ? 'success' : 'info'}
      title={phase === 'done' ? 'Export saved' : 'Export records'}
      subtitle="A private copy, watermarked to you"
      onClose={onClose}
      footer={
        <div>
          <motion.button
            type="button"
            whileTap={phase === 'idle' ? { scale: 0.97 } : undefined}
            onClick={exportRecords}
            disabled={phase !== 'idle'}
            aria-disabled={phase !== 'idle'}
            className={cn(
              'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white transition-colors',
              phase === 'done'
                ? 'bg-emerald-600'
                : phase === 'working'
                  ? 'cursor-wait bg-emerald-600/60'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
            )}
          >
            {phase === 'working' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                <span className="truncate">Preparing file…</span>
              </>
            ) : phase === 'done' ? (
              <>
                <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
                <span className="truncate">Saved to downloads</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                <span className="truncate">Download private export</span>
              </>
            )}
          </motion.button>
          <p className="mt-2 text-center text-[10px] font-bold text-[#0B211B]/45">
            The export itself is logged to the audit ledger
          </p>
        </div>
      }
    >
      <div className="flex flex-col gap-5 pb-2">
        <div>
          <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#0B211B]/40">
            <FileText className="h-3 w-3" aria-hidden />
            Included in the file
          </div>
          <div className="mt-3 rounded-2xl bg-[#0B211B]/[0.03] px-4 py-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-baseline justify-between gap-3">
                <span className="shrink-0 text-[12px] font-semibold text-[#0B211B]/65">Documents</span>
                <span className="shrink-0 text-[12.5px] font-bold text-[#0B211B]/80 tabular-nums">
                  {RECORD_DOCS.length}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <span className="shrink-0 text-[12px] font-semibold text-[#0B211B]/65">Audit ledger entries</span>
                <span className="shrink-0 text-[12.5px] font-bold text-[#0B211B]/80 tabular-nums">
                  {AUDIT_ENTRIES.length}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <span className="shrink-0 text-[12px] font-semibold text-[#0B211B]/65">Consent records</span>
                <span className="shrink-0 text-[12.5px] font-bold text-[#0B211B]/80">Summary</span>
              </div>
            </div>
            <p className="mt-3.5 break-words text-[10.5px] font-medium leading-snug text-[#0B211B]/50">
              Locked documents export as sealed placeholders until consent unlocks them.
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-[#0B231C] p-5">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">Chain of custody</div>
          <p className="mt-2.5 break-words text-[12px] font-medium leading-relaxed text-emerald-100/60">
            The export is tied to {VAULT_FACTS.patientFirst}&apos;s record and to your account. Whoever opens the file
            later is your responsibility, but Ayvaa&apos;s ledger always shows that it left the vault today.
          </p>
        </div>
      </div>
    </SheetShell>
  )
}

const VAULT_KIND_UI: Record<AuditKind, { icon: LucideIcon; tile: string }> = {
  view: { icon: Eye, tile: 'bg-sky-400/[0.16] text-sky-200' },
  change: { icon: PenLine, tile: 'bg-emerald-400/[0.18] text-emerald-200' },
  denied: { icon: ShieldAlert, tile: 'bg-rose-400/[0.18] text-rose-200' },
}

const HERO_TONE = {
  sealed: {
    pillTone: 'emerald' as const,
    pillLabel: 'Sealed',
    pillLive: false,
    panel: 'bg-emerald-400/[0.12]',
    panelLabel: 'text-emerald-200/60',
    hint: 'Every open, change and refusal leaves a permanent mark',
  },
  recording: {
    pillTone: 'sky' as const,
    pillLabel: 'Recording',
    pillLive: true,
    panel: 'bg-sky-400/[0.12]',
    panelLabel: 'text-sky-200/70',
    hint: 'A new entry is being written to the ledger right now',
  },
}

interface VaultHeroProps {
  latest: AuditEntry
  recording: boolean
  viewCount: number
  changeCount: number
  deniedCount: number
  retention: string
  onOpenLog: (filter: AuditFilter) => void
}

function TapStat({
  icon: Icon,
  label,
  value,
  onPress,
}: {
  icon: LucideIcon
  label: string
  value: number
  onPress: () => void
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.98 }}
      onClick={onPress}
      className="flex items-center justify-between gap-2 rounded-2xl bg-white/[0.06] px-3.5 py-2.5 text-left transition-colors duration-200 hover:bg-white/[0.11]"
    >
      <span className="min-w-0">
        <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/50">
          <Icon className="h-3 w-3" aria-hidden />
          {label}
        </span>
        <motion.span
          key={value}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="mt-1.5 block text-[20px] font-extrabold leading-none tracking-tight text-white tabular-nums"
        >
          {value}
        </motion.span>
      </span>
      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-emerald-200/60" aria-hidden />
    </motion.button>
  )
}

export function VaultHero({ latest, recording, viewCount, changeCount, deniedCount, retention, onOpenLog }: VaultHeroProps) {
  const tone = recording ? HERO_TONE.recording : HERO_TONE.sealed
  const ui = VAULT_KIND_UI[latest.kind]
  const LatestIcon = ui.icon

  return (
    <AccentHero tone={recording ? 'sky' : 'emerald'}>
      <HeroTopRow
        icon={ShieldCheck}
        label="Records vault"
        trailing={<StatusPill tone={tone.pillTone} label={tone.pillLabel} live={tone.pillLive} />}
      />

      <h2 className="mt-1.5 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        Consent gates the vault, <HeroHighlight>the ledger remembers</HeroHighlight>
      </h2>
      <p className="mt-1 text-[11.5px] font-semibold leading-snug text-white/55">{tone.hint}</p>

      <div className={cn('mt-4 rounded-2xl p-4 transition-colors duration-500', tone.panel)}>
        <div className="flex items-center justify-between gap-3">
          <span className={cn('text-[9px] font-extrabold uppercase tracking-[0.18em]', tone.panelLabel)}>
            {recording ? 'Just recorded' : 'Latest entry'}
          </span>
          <DarkTimeChip>{latest.time}</DarkTimeChip>
        </div>
        <motion.div
          key={latest.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="mt-3 flex items-start gap-3"
        >
          <span className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-xl', ui.tile)}>
            <LatestIcon className="h-4 w-4" strokeWidth={2.4} aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[14px] font-extrabold tracking-tight text-white">{latest.title}</span>
            <span className="mt-0.5 block break-words text-[11px] font-medium leading-snug text-white/60">
              {latest.detail}
            </span>
            <span className="mt-1 block text-[10px] font-semibold text-white/45">By {latest.actor}</span>
          </span>
        </motion.div>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <TapStat icon={Eye} label="Views sealed" value={viewCount} onPress={() => onOpenLog('view')} />
        <TapStat icon={PenLine} label="Edits sealed" value={changeCount} onPress={() => onOpenLog('change')} />
      </div>

      {deniedCount > 0 && (
        <motion.button
          type="button"
          whileTap={{ scale: 0.985 }}
          onClick={() => onOpenLog('denied')}
          className="mt-2 flex w-full items-start gap-3 rounded-2xl bg-rose-400/[0.14] px-4 py-3 text-left transition-colors duration-200 hover:bg-rose-400/[0.2]"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-rose-400/[0.2] text-rose-200">
            <ShieldAlert className="h-4 w-4" strokeWidth={2.4} aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[12.5px] font-extrabold tracking-tight text-white">
              Access denied {deniedCount === 1 ? 'once' : `${deniedCount} times`}
            </span>
            <span className="mt-0.5 block break-words text-[10.5px] font-semibold leading-snug text-rose-100/60">
              The consent gate blocked these requests, and the refusals stay on record
            </span>
          </span>
          <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-rose-200/70" aria-hidden />
        </motion.button>
      )}

      <div className="mt-2 flex items-start gap-2 rounded-2xl bg-white/[0.04] px-4 py-2.5">
        <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300/70" strokeWidth={2.4} aria-hidden />
        <span className="min-w-0 break-words text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-100/55">
          {retention}
        </span>
      </div>
    </AccentHero>
  )
}