import { AnimatePresence, motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'
import { AlertTriangle, BadgeCheck, BellRing, CalendarCheck, CalendarDays, Check, CheckCircle2, ClipboardCheck, Clock, Copy, CreditCard, Download, Eye, FileCheck2, FileClock, FilePenLine, Flag, FolderOpen, Gavel, Link2, Loader2, Lock, RotateCcw, Search, ShieldCheck, Smartphone, UserCheck, Wallet, Zap } from 'lucide-react'
import type { Intent, TileTone } from '@/components/phone/kit'
import { Card, Chip, Hero, Kicker, LiveDot, Panel, Section, StatStrip, Tile, rise } from '@/components/phone/kit'
import { ListRow } from '@/components/admin/ui/ListRow'
import { useRouter } from '@/lib/router'
import { Fragment, useState } from 'react'
import { Overline } from '@/components/phone/Overline'
import { cn } from '@/lib/utils'
import { BottomSheet } from '@/components/phone/SheetShell'
import { FactTile, FactTileGrid } from '@/components/phone/FactTile'
import { MiniTimeline } from '@/components/phone/MiniTimeline'
import type { AccessEntry, AccessKind } from '@/data/system/auditLog'
import { accessEntries, chainNode } from '@/data/system/auditLog'
import { Row } from '@/components/phone/Row'
import { PHASE_THEME, PhaseHero } from '@/components/phone/PhaseHero'
import { FactRows } from '@/components/phone/FactRows'
import type { StepItem } from '@/components/phone/StepList'
import { StepList } from '@/components/phone/StepList'
import type { CaptureIcon, PaymentPhase } from '@/data/system/payments'
import { captureSteps, paymentMeta } from '@/data/system/payments'
import { auditEntries } from '@/data/seed'

const iconMap: Record<string, { icon: LucideIcon; tone: TileTone }> = {
  ok: { icon: CheckCircle2, tone: 'success' },
  view: { icon: Eye, tone: 'neutral' },
  approve: { icon: UserCheck, tone: 'success' },
  error: { icon: AlertTriangle, tone: 'danger' },
  gavel: { icon: Gavel, tone: 'warning' },
}

type AuditEntry = {
  id: string
  title: string
  body: string
  icon: string
}


interface AuditEntryListProps {
  entries: AuditEntry[]
  totalEntries: number
  rangeLabel: string
  notify: NotifyFn
}

export function AuditEntryList({ entries, totalEntries, rangeLabel, notify }: AuditEntryListProps) {
  return (
    <>
      <motion.div variants={rise}>
        <Section label={rangeLabel} trailing={<Chip intent="neutral">{totalEntries} entries</Chip>} />
      </motion.div>

      <motion.div variants={rise}>
        <Card>
          {entries.map((e) => {
            const { icon, tone } = iconMap[e.icon] ?? iconMap.view
            return (
              <div key={e.id}>
                <ListRow
                  icon={icon}
                  tone={tone}
                  title={e.title}
                  subtitle={e.body}
                  onClick={() =>
                    notify(
                      e.icon === 'error'
                        ? { title: e.title, body: `${e.body} · flagged for review`, kind: 'warn' }
                        : { title: e.title, body: `${e.body} · opened from ${rangeLabel} log`, kind: 'info' },
                    )
                  }
                  trailing={
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/35 transition-colors group-hover:bg-[#0B211B]/[0.08]">
                      <Lock className="h-3 w-3" strokeWidth={2.4} aria-hidden />
                    </span>
                  }
                  showChevron={false}
                />
              </div>
            )
          })}
        </Card>
      </motion.div>
    </>
  )
}

export function ComplianceToolsList() {
  const { navigate } = useRouter()
  return (
    <motion.div variants={rise}>
      <Card>
        <div>
          <ListRow
            icon={ShieldCheck}
            tone="success"
            title="Consent tracking"
            subtitle="1,102 active · 18 due · 2 withdrawn"
            onClick={() => navigate('/admin/a06')}
          />
        </div>
        <div>
          <ListRow
            icon={Lock}
            tone="ink"
            title="Retention policies"
            subtitle="7 policies · deletion queue running"
            onClick={() => navigate('/admin/a07')}
          />
        </div>
      </Card>
    </motion.div>
  )
}


interface CustomRangePickerProps {
  notify: NotifyFn
}

const presets = [
  { id: 'last7', label: 'Last 7 days', from: 'Mar 1', to: 'Mar 7' },
  { id: 'last30', label: 'Last 30 days', from: 'Feb 6', to: 'Mar 7' },
  { id: 'thisMonth', label: 'This month', from: 'Mar 1', to: 'Mar 31' },
]

export function CustomRangePicker({ notify }: CustomRangePickerProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [applied, setApplied] = useState<string | null>(null)

  const activePreset = presets.find((p) => p.id === selected)

  return (
    <>
      <motion.div variants={rise}>
        <Section label="Custom range" trailing={<Chip intent="info">Picker</Chip>} />
      </motion.div>

      <motion.div variants={rise}>
        <Card>
          <div className="p-4">
            <Overline>Pick a window</Overline>
            <div className="mt-3 grid gap-2.5">
              {presets.map((p) => {
                const isSelected = selected === p.id
                const isApplied = applied === p.id
                return (
                  <motion.button
                    key={p.id}
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelected(p.id)}
                    className={cn(
                      'flex items-center justify-between gap-3 rounded-2xl px-3.5 py-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40',
                      isSelected
                        ? 'bg-emerald-500/[0.08] ring-2 ring-emerald-500/40'
                        : 'bg-[#0B211B]/[0.04] hover:bg-[#0B211B]/[0.07]',
                    )}
                  >
                    <span className="min-w-0">
                      <span className="block text-[13px] font-bold text-[#0B211B]">{p.label}</span>
                      <span className="mt-0.5 block text-[11px] font-medium text-[#0B211B]/45">
                        {p.from} – {p.to}
                      </span>
                    </span>
                    {isApplied && <Chip intent="success">Applied</Chip>}
                  </motion.button>
                )
              })}
            </div>

            {selected && activePreset && (
              <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-[#0B211B]/50">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                <span>
                  {activePreset.from} – {activePreset.to}
                </span>
              </div>
            )}

            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              disabled={!selected}
              onClick={() => {
                setApplied(selected)
                notify({
                  title: 'Range applied',
                  body: `${activePreset?.from} – ${activePreset?.to} · sealed entries loaded`,
                  kind: 'info',
                })
              }}
              className={cn(
                'mt-3 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-[13px] font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60',
                selected
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] hover:shadow-[0_22px_40px_-18px_rgba(5,150,105,0.85)] hover:brightness-105'
                  : 'cursor-not-allowed bg-[#0B211B]/[0.05] text-[#0B211B]/35',
              )}
            >
              <CalendarDays className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
              Apply range
            </motion.button>
          </div>
        </Card>
      </motion.div>
    </>
  )
}

const blocks = ['1F', '20', '21', '22', '23']

interface LedgerChainHeroProps {
  todayCount: number
}

export function LedgerChainHero({ todayCount }: LedgerChainHeroProps) {
  const sealedCount = 4
  const totalBlocks = blocks.length
  const health = Math.round((sealedCount / totalBlocks) * 100)

  return (
    <Hero>
      <Kicker>The ledger · sealed on write</Kicker>
      <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        Nothing here can be{' '}
        <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">erased</span>
      </h2>

      <div className="mt-4 rounded-2xl bg-white/[0.05] p-3.5">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-100/50">Ledger chain</span>
          <span className="inline-flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-emerald-300">
            <LiveDot className="text-emerald-300" />
            Appending
          </span>
        </div>
        <div className="mt-3 flex items-center">
          {blocks.map((b, i) => {
            const writing = i === blocks.length - 1
            const sealed = i < sealedCount
            return (
              <Fragment key={b}>
                {i > 0 && <span aria-hidden className="h-px w-3 shrink-0 bg-emerald-300/30" />}
                {writing ? (
                  <motion.span
                    className="relative grid h-9 min-w-0 flex-1 place-items-center overflow-hidden rounded-xl bg-emerald-400/20 text-[10px] font-extrabold tabular-nums text-emerald-100 ring-1 ring-inset ring-emerald-300/30"
                    animate={{ boxShadow: ['0 0 0px rgba(16,185,129,0)', '0 0 12px rgba(16,185,129,0.35)', '0 0 0px rgba(16,185,129,0)'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <motion.span
                      aria-hidden
                      className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-emerald-300/25 to-transparent"
                      animate={{ x: ['-100%', '220%'] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <span className="relative">{b}</span>
                  </motion.span>
                ) : (
                  <motion.span
                    className={cn(
                      'grid h-9 min-w-0 flex-1 place-items-center rounded-xl text-[10px] font-extrabold tabular-nums ring-1 ring-inset transition-transform duration-200',
                      sealed
                        ? 'bg-white/[0.06] text-emerald-100/60 ring-white/10'
                        : 'bg-white/[0.02] text-emerald-100/30 ring-white/5',
                    )}
                  >
                    {b}
                  </motion.span>
                )}
              </Fragment>
            )
          })}
        </div>
        <div className="mt-2.5 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-100/35">
          <span>{sealedCount} of {totalBlocks} sealed</span>
          <span>{health}% health</span>
        </div>
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300"
            animate={{ width: `${health}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>

      <StatStrip
        className="mt-5"
        cells={[
          { key: 'today', value: todayCount, label: 'Today' },
          { key: 'health', value: `${health}%`, label: 'Health' },
          { key: 'gaps', value: '0', label: 'Gaps · 90 d' },
        ]}
      />

      <div className="mt-4 flex flex-wrap gap-1.5">
        <Chip intent="neutral" light className="border-transparent">Append-only</Chip>
        <Chip intent="success" light className="border-transparent">SHA-sealed</Chip>
      </div>
    </Hero>
  )
}

type NotifyFn = (payload: { title: string; body: string; kind: 'ok' | 'warn' | 'info' }) => void

const KIND_THEME: Record<AccessKind, { intent: Intent; tile: TileTone; chipLabel: string; banner: string; accent: string }> = {
  view: { intent: 'info', tile: 'info', chipLabel: 'Viewed', banner: 'bg-sky-500/[0.07]', accent: 'bg-sky-500/[0.08]' },
  change: { intent: 'warning', tile: 'warning', chipLabel: 'Changed', banner: 'bg-amber-500/[0.07]', accent: 'bg-amber-500/[0.1]' },
  consent: { intent: 'success', tile: 'success', chipLabel: 'Consented', banner: 'bg-emerald-500/[0.07]', accent: 'bg-emerald-500/[0.08]' },
}

function initialsOf(name: string) {
  return name
    .split(' ')
    .filter((w) => w !== '·')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const sealTimeline = [
  { title: 'Accessed', note: 'The reason was already attached the moment the record opened', done: true },
  { title: 'Sealed instantly', note: 'Hashed and chained before the screen finished loading', done: true },
  { title: 'Patient-visible', note: 'This exact entry appears in the family audit log today', done: true },
]

interface AccessDetailSheetProps {
  entry: AccessEntry | null
  flagged: boolean
  onClose: () => void
  onFlag: (id: string) => void
  notify: NotifyFn
}

export function AccessDetailSheet({ entry, flagged, onClose, onFlag, notify }: AccessDetailSheetProps) {
  const { navigate } = useRouter()
  const [copied, setCopied] = useState(false)

  if (!entry) return <BottomSheet open={false} onClose={onClose}>{null}</BottomSheet>

  const kind = KIND_THEME[entry.kind]

  const downloadReceipt = () => {
    const receipt = [
      'AYVAA ACCESS RECEIPT',
      '================================',
      `Entry: ${entry.id}`,
      `Action: ${entry.action}`,
      `Person: ${entry.who} (${entry.role})`,
      `Document: ${entry.document}`,
      `When: ${entry.time}`,
      `Reason: ${entry.reason}`,
      `Device: ${entry.device}`,
      `Consent basis: ${entry.basis}`,
      'Sealed to the Ayvaa immutable ledger',
    ].join('\n')
    const blob = new Blob([receipt], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ayvaa-access-${entry.id}.txt`
    a.click()
    URL.revokeObjectURL(url)
    notify({
      title: 'Receipt downloaded',
      body: `${entry.id} · every field of the record included`,
      kind: 'ok',
    })
  }

  const copyReference = async () => {
    const ref = `ayvaa-access://${entry.id}`
    try {
      await navigator.clipboard.writeText(ref)
    } catch {
      const el = document.createElement('textarea')
      el.value = ref
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <BottomSheet
      open
      onClose={onClose}
      icon={Eye}
      title={entry.action}
      subtitle={`Access record · ${entry.id}`}
      footer={
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={downloadReceipt}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] transition-all duration-200 hover:shadow-[0_22px_40px_-18px_rgba(5,150,105,0.85)] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
        >
          <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          <span className="break-words">Download access receipt</span>
        </motion.button>
      }
    >
      <div className={cn('flex items-start gap-3 rounded-2xl p-4', kind.banner)}>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-[14px] font-black tracking-tight text-brand-ink">
          {initialsOf(entry.who)}
        </span>
        <div className="min-w-0 flex-1 pt-0.5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-[13.5px] font-extrabold leading-snug tracking-tight text-[#0B211B]">
              {entry.who}
            </span>
            <Chip intent={kind.intent} className="border-transparent">
              {kind.chipLabel}
            </Chip>
          </div>
          <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">{entry.role}</p>
          <p className="mt-1 text-[11px] font-semibold text-[#0B211B]/40">{entry.time}</p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-[#0B211B]/[0.03] p-4">
        <Overline icon={BadgeCheck}>Access details</Overline>
        <FactTileGrid className="mt-3">
          <FactTile icon={Eye} label="Kind" value={kind.chipLabel} />
          <FactTile icon={Clock} label="When" value={entry.time} />
          <FactTile icon={ShieldCheck} label="Status" value="Sealed" />
          <FactTile icon={FileCheck2} label="Retention" value="10 years" />
        </FactTileGrid>
      </div>

      <div className="mt-4 rounded-2xl bg-[#0B211B]/[0.03] p-4">
        <Overline icon={FileCheck2}>What was accessed</Overline>
        <div className="mt-3 flex items-start gap-3 rounded-xl bg-white p-3">
          <Tile icon={FileCheck2} tone="ink" size="sm" />
          <div className="min-w-0 flex-1">
            <div className="text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">
              {entry.document}
            </div>
            <div className="mt-0.5 text-[11px] font-medium leading-snug text-[#0B211B]/55">
              Sensitive record · access requires a recorded reason
            </div>
          </div>
          <Chip intent="success" icon={Check} className="shrink-0 border-transparent">
            Verified
          </Chip>
        </div>
      </div>

      <Panel intent={kind.intent === 'info' ? 'neutral' : kind.intent} className="mt-4 p-3.5">
        <Overline icon={Gavel}>Recorded reason</Overline>
        <p className={cn('mt-2 rounded-xl p-3 break-words text-[12.5px] font-medium leading-relaxed text-[#0B211B]/85', kind.accent)}>
          {entry.reason}
        </p>
      </Panel>

      <Panel intent="neutral" className="mt-3 p-3.5">
        <Overline icon={ShieldCheck}>Consent basis</Overline>
        <p className="mt-2 text-pretty break-words text-[12.5px] font-medium leading-relaxed text-[#0B211B]/75">
          {entry.basis}
        </p>
      </Panel>

      <div className="mt-4 rounded-2xl bg-[#0B211B]/[0.03] p-4">
        <Overline icon={Smartphone}>Device</Overline>
        <div className="mt-3 flex items-start gap-3 rounded-xl bg-white p-3">
          <Tile icon={Smartphone} tone="neutral" size="sm" />
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-bold leading-snug tracking-tight text-[#0B211B]">
              {entry.device}
            </div>
            <div className="mt-0.5 text-[11px] font-medium leading-snug text-[#0B211B]/55">
              Device identity and location captured with the access
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-[#0B211B]/[0.03] p-4">
        <Overline>Seal trail</Overline>
        <MiniTimeline className="mt-3" items={sealTimeline} />
      </div>

      <div className="mt-4 flex gap-2.5">
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={copyReference}
          aria-label="Copy access reference"
          className={cn(
            'flex flex-1 items-center justify-center gap-2 rounded-2xl px-3 py-3.5 text-[13px] font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50',
            copied
              ? 'bg-emerald-500/[0.12] text-emerald-700'
              : 'bg-[#0B211B]/[0.05] text-[#0B211B]/70 hover:bg-[#0B211B]/[0.1] hover:text-[#0B211B]',
          )}
        >
          {copied ? (
            <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
          ) : (
            <Copy className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          )}
          <span className="truncate">{copied ? 'Copied' : 'Copy reference'}</span>
        </motion.button>

        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            onClose()
            navigate('/patient/p21')
          }}
          aria-label="Open family records"
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.05] px-3 py-3.5 text-[13px] font-bold text-[#0B211B]/70 transition-all hover:bg-[#0B211B]/[0.1] hover:text-[#0B211B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
        >
          <FolderOpen className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          <span className="truncate">Family records</span>
        </motion.button>
      </div>

      <motion.button
        type="button"
        whileTap={flagged ? undefined : { scale: 0.97 }}
        onClick={() => {
          if (!flagged) onFlag(entry.id)
        }}
        disabled={flagged}
        aria-label={flagged ? 'Entry flagged for review' : 'Flag entry for supervisor review'}
        className={cn(
          'mt-2.5 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-[13px] font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50',
          flagged
            ? 'bg-emerald-500/[0.12] text-emerald-700'
            : 'bg-rose-500/[0.08] text-rose-700 hover:bg-rose-500/[0.14]',
        )}
      >
        {flagged ? (
          <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
        ) : (
          <Flag className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
        )}
        <span className="break-words">
          {flagged ? 'Flagged · supervisors notified' : 'Flag for supervisor review'}
        </span>
      </motion.button>

      <div className="mt-3.5 flex items-center justify-center gap-1.5 px-4 text-center">
        <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600/70" aria-hidden />
        <span className="text-[10.5px] font-semibold leading-snug text-[#0B211B]/40">
          The patient sees this exact entry in their own audit log. Secrecy and care do not mix.
        </span>
      </div>
    </BottomSheet>
  )
}

const KIND_ICON: Record<AccessKind, LucideIcon> = {
  view: Eye,
  change: FilePenLine,
  consent: ShieldCheck,
}

const KIND_TILE: Record<AccessKind, 'info' | 'warning' | 'success'> = {
  view: 'info',
  change: 'warning',
  consent: 'success',
}

const KIND_CHIP: Record<AccessKind, { intent: 'info' | 'warning' | 'success'; label: string }> = {
  view: { intent: 'info', label: 'Viewed' },
  change: { intent: 'warning', label: 'Changed' },
  consent: { intent: 'success', label: 'Consented' },
}

type Filter = 'all' | AccessKind

const FILTERS: { value: Filter; label: string; icon: LucideIcon }[] = [
  { value: 'all', label: 'All', icon: FileClock },
  { value: 'view', label: 'Views', icon: Eye },
  { value: 'change', label: 'Changes', icon: FilePenLine },
  { value: 'consent', label: 'Consents', icon: ShieldCheck },
]

interface AccessLogCardProps {
  filter: Filter
  flagged: string[]
  onFilter: (f: Filter) => void
  onEntryTap: (entry: AccessEntry) => void
}

export function AccessLogCard({ filter, flagged, onFilter, onEntryTap }: AccessLogCardProps) {
  const visible = accessEntries.filter((e) => filter === 'all' || e.kind === filter)

  return (
    <Card>
      <div className="p-4">
        <div className="flex items-center gap-2.5">
          <Tile icon={FileClock} tone="ink" />
          <div className="min-w-0 flex-1">
            <span className="block truncate text-sm font-bold tracking-tight text-[#0B211B]">Access log</span>
            <span className="block text-xs font-medium text-[#0B211B]/55">
              Every read of a sensitive record is written down
            </span>
          </div>
          <Chip intent="info" className="border-transparent">
            {visible.length} shown
          </Chip>
        </div>

        <div className="mt-3.5 flex flex-wrap gap-1.5">
          {FILTERS.map((f) => {
            const active = filter === f.value
            const count =
              f.value === 'all' ? accessEntries.length : accessEntries.filter((e) => e.kind === f.value).length
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => onFilter(f.value)}
                className={cn(
                  'relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] font-bold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500/50',
                  active ? 'text-white' : 'bg-[#0B211B]/[0.05] text-[#0B211B]/55 hover:bg-[#0B211B]/[0.09]',
                )}
              >
                {active && (
                  <motion.span
                    layoutId="access-filter"
                    transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                    className="absolute inset-0 rounded-full bg-[#0B211B]"
                  />
                )}
                <f.icon className="relative h-3 w-3" strokeWidth={2.6} aria-hidden />
                <span className="relative">
                  {f.label} · {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {visible.map((entry) => {
            const Icon = KIND_ICON[entry.kind]
            const chip = KIND_CHIP[entry.kind]
            const isFlagged = flagged.includes(entry.id)
            return (
              <div key={entry.id}>
                <Row
                  icon={Icon}
                  tone={KIND_TILE[entry.kind]}
                  align="start"
                  title={entry.action}
                  subtitle={entry.who}
                  subtitleClassName="text-[11px] font-medium"
                  body={
                    <span className="mt-0.5 block truncate text-[11px] font-medium text-[#0B211B]/45">
                      {entry.document}
                    </span>
                  }
                  trailing={
                    <span className="flex shrink-0 flex-col items-end gap-1.5">
                      <Chip intent={chip.intent} className="border-transparent">
                        {chip.label}
                      </Chip>
                      {isFlagged && (
                        <Chip intent="warning" icon={Flag} className="border-transparent">
                          Flagged
                        </Chip>
                      )}
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wide text-[#0B211B]/35">
                        {entry.time}
                      </span>
                    </span>
                  }
                  onClick={() => onEntryTap(entry)}
                  showChevron={false}
                />
              </div>
            )
          })}
          {visible.length === 0 && (
            <div className="flex items-center justify-center gap-2 px-4 pb-5 pt-1">
              <Search className="h-4 w-4 text-[#0B211B]/30" aria-hidden />
              <span className="text-xs font-medium text-[#0B211B]/40">No entries of this kind yet</span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center gap-2 px-4 pb-4 pt-1">
        <CalendarCheck className="h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden />
        <span className="min-w-0 flex-1 text-[10.5px] font-semibold leading-snug text-emerald-700/80">
          Access entries live for ten years. Deleting one is impossible by design.
        </span>
      </div>
    </Card>
  )
}

export type ChainPhase = 'sealed' | 'verifying' | 'verified'

type HeroTheme = {
  theme: (typeof PHASE_THEME)[keyof typeof PHASE_THEME]
  kicker: string
  gradient: string
  sub: string
  label: string
  chipIntent: Intent
  chipLabel: string
  chipDot: boolean
  statDot: string
  statLabel: string
  chips: { intent: Intent; label: string }[]
}

const THEMES: Record<ChainPhase, HeroTheme> = {
  sealed: {
    theme: PHASE_THEME.emerald,
    kicker: 'text-emerald-200/50',
    gradient: 'from-emerald-300 to-teal-200',
    sub: 'text-emerald-100/55',
    label: 'text-emerald-100/45',
    chipIntent: 'info',
    chipLabel: 'Ledger sealed',
    chipDot: false,
    statDot: 'bg-teal-300',
    statLabel: 'text-emerald-100/45',
    chips: [
      { intent: 'info', label: 'Immutable' },
      { intent: 'success', label: 'Tamper-evident' },
    ],
  },
  verifying: {
    theme: PHASE_THEME.amber,
    kicker: 'text-amber-200/60',
    gradient: 'from-amber-200 to-orange-200',
    sub: 'text-amber-100/60',
    label: 'text-amber-100/50',
    chipIntent: 'warning',
    chipLabel: 'Verifying seals',
    chipDot: true,
    statDot: 'bg-amber-300',
    statLabel: 'text-amber-100/50',
    chips: [
      { intent: 'warning', label: 'Re-hashing' },
      { intent: 'warning', label: 'Link by link' },
    ],
  },
  verified: {
    theme: PHASE_THEME.emeraldBright,
    kicker: 'text-emerald-300/70',
    gradient: 'from-emerald-300 to-teal-200',
    sub: 'text-emerald-100/65',
    label: 'text-emerald-100/50',
    chipIntent: 'success',
    chipLabel: 'Chain verified',
    chipDot: false,
    statDot: 'bg-emerald-300',
    statLabel: 'text-emerald-100/50',
    chips: [
      { intent: 'success', label: 'Every seal intact' },
      { intent: 'success', label: 'Zero tampering' },
    ],
  },
}

const HEADLINES: Record<ChainPhase, { pre: string; accent: string }> = {
  sealed: { pre: 'Reads are', accent: 'records too' },
  verifying: { pre: 'Re-hashing', accent: 'the whole chain' },
  verified: { pre: 'Verified —', accent: 'not one seal broken' },
}

const SUBS: Record<ChainPhase, string> = {
  sealed: 'Every access, change and consent is sealed the moment it happens.',
  verifying: 'Each entry is re-hashed and compared to the seal of the one before it.',
  verified: 'Every seal matches. The ledger has never been touched.',
}

interface AuditHeroProps {
  phase: ChainPhase
  verifiedCount: number
  totalCount: number
  onVerify: () => void
}

export function AuditHero({ phase, verifiedCount, totalCount }: AuditHeroProps) {
  const t = THEMES[phase]
  const headline = HEADLINES[phase]

  return (
    <PhaseHero theme={t.theme}>
      <div className="flex items-center justify-between gap-3">
        <div className={cn('flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] transition-colors duration-500', t.kicker)}>
          Personal audit ledger · 24 hours
        </div>
        <Chip intent={t.chipIntent} light dot={t.chipDot} className="border-transparent">
          {t.chipLabel}
        </Chip>
      </div>

      <h2 className="mt-2 text-[19px] font-extrabold leading-snug tracking-tight text-white">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={phase}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="inline"
          >
            {headline.pre}{' '}
            <span className={cn('bg-gradient-to-r bg-clip-text text-transparent transition-all duration-500', t.gradient)}>
              {headline.accent}
            </span>
          </motion.span>
        </AnimatePresence>
      </h2>

      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={phase}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className={cn('mt-1 text-[12px] font-medium leading-relaxed transition-colors duration-500', t.sub)}
        >
          {SUBS[phase]}
        </motion.p>
      </AnimatePresence>

      <div className="mt-4">
        <div className="flex items-center justify-between gap-2">
          <span className={cn('text-[9px] font-extrabold uppercase tracking-[0.18em] transition-colors duration-500', t.label)}>
            Seals verified
          </span>
          <span className="text-[10px] font-extrabold tabular-nums text-white">
            {verifiedCount}/{totalCount}
          </span>
        </div>
        <div className="mt-2 flex gap-1">
          {Array.from({ length: totalCount }).map((_, i) => (
            <span
              key={i}
              className={cn(
                'h-1.5 flex-1 rounded-full transition-colors duration-300',
                i < verifiedCount
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-300'
                  : phase === 'verifying' && i === verifiedCount
                    ? 'relative overflow-hidden bg-amber-300/25'
                    : 'bg-white/15',
              )}
            >
              {phase === 'verifying' && i === verifiedCount && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-amber-300"
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
            </span>
          ))}
        </div>
      </div>

      <StatStrip
        className="mt-5"
        cells={[
          { key: 'accesses', value: 12, label: 'Accesses', dot: cn('transition-colors duration-500', t.statDot), labelClassName: cn('transition-colors duration-500', t.statLabel) },
          { key: 'changes', value: 3, label: 'Changes', dot: cn('transition-colors duration-500', t.statDot), labelClassName: cn('transition-colors duration-500', t.statLabel) },
          { key: 'tampered', value: 0, label: 'Tampered', dot: cn('transition-colors duration-500', t.statDot), labelClassName: cn('transition-colors duration-500', t.statLabel) },
        ]}
      />

      <div className="mt-4 flex flex-wrap gap-1.5">
        {t.chips.map((c) => (
          <Chip key={c.label} intent={c.intent} light className="border-transparent">
            {c.label}
          </Chip>
        ))}
      </div>
    </PhaseHero>
  )
}

const STEP_ICONS: Record<CaptureIcon, LucideIcon> = {
  signoff: ClipboardCheck,
  auth: CreditCard,
  capture: Wallet,
  receipt: BellRing,
}

type StepVisual = 'pending' | 'active' | 'done' | 'failed'

interface CaptureChainCardProps {
  phase: PaymentPhase
  doneSteps: number
  failedAt: number | null
  drill: boolean
  onDrill: (v: boolean) => void
  onStepTap: (title: string, detail: string) => void
  onDownloadReceipt: () => void
  onReplay: () => void
}

export function CaptureChainCard({
  phase,
  doneSteps,
  failedAt,
  drill,
  onDrill,
  onStepTap,
  onDownloadReceipt,
  onReplay,
}: CaptureChainCardProps) {
  const { navigate } = useRouter()
  const busy = phase === 'capturing' || phase === 'retrying'

  const chipFor = () => {
    if (phase === 'captured') return { intent: 'success' as const, label: 'Settled', dot: false }
    if (phase === 'capturing') return { intent: 'warning' as const, label: 'In motion', dot: true }
    if (phase === 'retrying') return { intent: 'warning' as const, label: 'Retrying', dot: true }
    return { intent: 'info' as const, label: 'Not charged', dot: false }
  }
  const chip = chipFor()

  const stateFor = (i: number): StepVisual => {
    if (phase === 'awaiting') return 'pending'
    if (phase === 'captured') return 'done'
    if (failedAt !== null && i === failedAt) return 'failed'
    if (phase === 'capturing') {
      if (i < doneSteps) return 'done'
      if (i === doneSteps) return 'active'
      return 'pending'
    }
    if (phase === 'retrying') return i < 2 ? 'done' : 'pending'
    return 'pending'
  }

  return (
    <Card>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-sm font-extrabold leading-snug tracking-tight text-[#0B211B]">
              Capture chain
            </div>
            <div className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              Four automatic steps after the sign-off
            </div>
          </div>
          <Chip intent={chip.intent} dot={chip.dot} className="shrink-0 border-transparent">
            {chip.label}
          </Chip>
        </div>

        <StepList
          className="mt-4"
          nodeStyle="circle"
          nodeSize="sm"
          theme="light"
          steps={captureSteps.map((step, i) => {
            const state = stateFor(i)
            const Icon = STEP_ICONS[step.icon]
            const last = i === captureSteps.length - 1
            return {
              key: step.title,
              state: state === 'pending' ? 'pending' : state === 'active' ? 'active' : 'done',
              node: (
                <span
                  className={cn(
                    'relative mt-1 grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full',
                    state === 'done' && 'bg-emerald-500',
                    state === 'active' && 'bg-white',
                    state === 'failed' && 'bg-rose-500',
                    state === 'pending' && 'bg-white ring-1 ring-[#0B211B]/15',
                  )}
                >
                  {state === 'done' && <Check className="h-2.5 w-2.5 text-white" strokeWidth={4} aria-hidden />}
                  {state === 'active' && (
                    <>
                      <span aria-hidden className="absolute h-4 w-4 animate-ping rounded-full bg-emerald-400/50" />
                      <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                    </>
                  )}
                  {state === 'failed' && <Lock className="h-2 w-2 text-white" strokeWidth={3.5} aria-hidden />}
                </span>
              ),
              railClassName:
                state === 'done'
                  ? 'bg-gradient-to-b from-emerald-500/50 via-emerald-400/25 to-emerald-300/15'
                  : 'bg-[#0B211B]/[0.1]',
              title: step.title,
              titleClassName: 'transition-colors duration-300',
              trailingTitle: (
                <span className="flex shrink-0 items-center gap-1.5">
                  <span
                    className={cn(
                      'font-mono text-[10px] font-bold uppercase tracking-wide transition-colors duration-300',
                      state === 'pending' ? 'text-[#0B211B]/25' : 'text-[#0B211B]/40',
                    )}
                  >
                    {step.time}
                  </span>
                  <Icon
                    className={cn(
                      'h-3.5 w-3.5 transition-colors duration-300',
                      state === 'done' && 'text-emerald-600',
                      state === 'active' && 'text-emerald-600',
                      state === 'failed' && 'text-rose-500',
                      state === 'pending' && 'text-[#0B211B]/20',
                    )}
                    strokeWidth={2.2}
                    aria-hidden
                  />
                </span>
              ),
              body: step.detail,
              bodyClassName: 'transition-colors duration-300',
              contentClassName: last ? '' : 'pb-5',
              onClick: () => onStepTap(step.title, step.detail),
            }
          })}
        />

        <div className="mt-2">
          <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#0B211B]/40">
            Tonight's run
          </div>
          <div className="mt-2 flex rounded-xl bg-[#0B211B]/[0.05] p-1">
            {[
              { value: false, label: 'Clean run', icon: Zap },
              { value: true, label: 'Forced failure', icon: Lock },
            ].map((opt) => {
              const active = drill === opt.value
              return (
                <button
                  key={opt.label}
                  type="button"
                  disabled={busy}
                  onClick={() => onDrill(opt.value)}
                  className={cn(
                    'relative flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-[10px] font-extrabold uppercase tracking-[0.12em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40',
                    active ? 'text-white' : 'text-[#0B211B]/50 hover:text-[#0B211B]/80',
                    busy && !active && 'opacity-40',
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="drill-mode"
                      transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                      className={cn(
                        'absolute inset-0 rounded-lg',
                        drill ? 'bg-rose-600 shadow-[0_6px_14px_-6px_rgba(225,29,72,0.7)]' : 'bg-[#0B211B]',
                      )}
                    />
                  )}
                  <opt.icon className="relative h-3 w-3" strokeWidth={2.6} aria-hidden />
                  <span className="relative">{opt.label}</span>
                </button>
              )
            })}
          </div>
          <p className="mt-2 text-[11px] font-medium leading-relaxed text-[#0B211B]/50">
            {drill
              ? 'The bank will not answer at first. The ladder climbs on its own.'
              : 'The charge lands on the first attempt. The receipt goes out.'}
          </p>
        </div>

        <AnimatePresence>
          {phase === 'captured' && (
            <motion.div
              key="receipt"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mt-4"
            >
              <div className="rounded-3xl bg-[#0B231C] p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">
                    Receipt {paymentMeta.id}
                  </span>
                  <span className="shrink-0 font-mono text-[20px] font-black tracking-tight text-white">
                    {paymentMeta.amount}
                  </span>
                </div>
                <div aria-hidden className="my-3 h-px bg-white/[0.08]" />
<FactRows mono labelClassName="text-[10px]" rows={[{ label: "Visit", value: paymentMeta.session }]} />
                <div className="mt-2">
<FactRows mono labelClassName="text-[10px]" rows={[{ label: "Card", value: `${paymentMeta.card} ··${paymentMeta.cardLast4}` }]} />
                </div>
                <div className="mt-2">
<FactRows mono labelClassName="text-[10px]" rows={[{ label: "Charges", value: "One" }]} />
                </div>
                <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-emerald-400/[0.12] px-3 py-2.5">
                  <span className="flex min-w-0 items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 shrink-0 text-emerald-300" strokeWidth={2.4} aria-hidden />
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-emerald-100">
                      Linked to the session
                    </span>
                  </span>
                  <Check className="h-4 w-4 shrink-0 text-emerald-300" strokeWidth={3} aria-hidden />
                </div>
              </div>

              <div className="mt-2.5 flex gap-2.5">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={onDownloadReceipt}
                  aria-label="Download payment receipt"
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.05] px-3 py-3.5 text-[13px] font-bold text-[#0B211B]/70 transition-all hover:bg-[#0B211B]/[0.1] hover:text-[#0B211B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                >
                  <Download className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                  <span className="truncate">Receipt</span>
                </motion.button>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={onReplay}
                  aria-label="Replay the capture"
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.05] px-3 py-3.5 text-[13px] font-bold text-[#0B211B]/70 transition-all hover:bg-[#0B211B]/[0.1] hover:text-[#0B211B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
                >
                  <RotateCcw className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
                  <span className="truncate">Replay</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Row
          leading={
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-400/[0.12] text-emerald-600">
              <Wallet className="h-4 w-4" strokeWidth={2.2} aria-hidden />
            </span>
          }
          title="Family billing"
          subtitle="The same charge, as Priya sees it"
          trailing={<span className="shrink-0 text-[11px] font-bold text-emerald-600">Open</span>}
          surface="none"
          padding="none"
          className="mt-4 rounded-2xl bg-[#0B211B]/[0.04]"
          hoverClassName="hover:bg-[#0B211B]/[0.07]"
          showChevron={false}
          onClick={() => navigate('/patient/p23')}
        />
      </div>
    </Card>
  )
}

const HASH_FRAGMENTS = ['a94f…c31d', '7b2e…9a08', 'e1c5…44f7', '39d8…b6a2', 'c07a…18e9']

const NODE_TONE: Record<string, string> = {
  ok: 'bg-emerald-500',
  view: 'bg-sky-500',
  approve: 'bg-emerald-500',
  error: 'bg-rose-500',
  gavel: 'bg-rose-500',
}

interface SealChainCardProps {
  phase: ChainPhase
  verifiedCount: number
  onEntryTap: (title: string, body: string) => void
}

export function SealChainCard({ phase, verifiedCount, onEntryTap }: SealChainCardProps) {
  const stateFor = (i: number): 'done' | 'active' | 'pending' => {
    if (phase === 'verified') return 'done'
    if (phase === 'verifying') return i < verifiedCount ? 'done' : i === verifiedCount ? 'active' : 'pending'
    return 'pending'
  }

  const steps: StepItem[] = auditEntries.map((entry, i) => {
    const state = stateFor(i)
    const last = i === auditEntries.length - 1
    const waiting = state === 'pending'
    return {
      key: entry.id,
      title: entry.title,
      body: entry.body,
      state,
      onClick: () => onEntryTap(entry.title, `${entry.body} · seal ${HASH_FRAGMENTS[i]}`),
      node: (
        <span
          className={cn(
            'relative grid h-8 w-8 shrink-0 place-items-center rounded-full text-white transition-all duration-300',
            state === 'done' && `${NODE_TONE[entry.icon]} shadow-[0_0_12px_rgba(52,211,153,0.35)]`,
            state === 'active' && 'bg-amber-400',
            waiting && 'bg-[#0B211B]/[0.08] text-[#0B211B]/30',
          )}
        >
          {state === 'done' && <Check className="h-4 w-4" strokeWidth={3} aria-hidden />}
          {state === 'active' && <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.6} aria-hidden />}
          {waiting && <ShieldCheck className="h-4 w-4" strokeWidth={2.2} aria-hidden />}
        </span>
      ),
      nodeClassName: '',
      railClassName: state === 'done' ? 'bg-emerald-500/30' : 'bg-[#0B211B]/[0.08]',
      titleClassName: cn(
        'text-[13px] transition-colors duration-300',
        waiting ? 'text-[#0B211B]/40' : 'text-[#0B211B]',
      ),
      contentClassName: last ? 'pb-0.5' : 'pb-3.5',
      bodyClassName: cn(
        'mt-0.5 text-[11px] transition-colors duration-300',
        waiting ? 'text-[#0B211B]/30' : 'text-[#0B211B]/55',
      ),
      trailingTitle: (
        <span
          className={cn(
            'shrink-0 font-mono text-[9px] font-bold uppercase tracking-wide transition-colors duration-300',
            state === 'done' ? 'text-emerald-600/70' : 'text-[#0B211B]/25',
          )}
        >
          {HASH_FRAGMENTS[i]}
        </span>
      ),
    }
  })

  return (
    <Card>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <Tile icon={Link2} tone={phase === 'sealed' ? 'neutral' : phase === 'verifying' ? 'warning' : 'success'} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-bold tracking-tight text-[#0B211B]">Seal chain</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={phase}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="shrink-0"
                >
                  {phase === 'sealed' && (
                    <Chip intent="info" className="border-transparent">
                      Ready to verify
                    </Chip>
                  )}
                  {phase === 'verifying' && (
                    <Chip intent="warning" dot className="border-transparent">
                      Verifying
                    </Chip>
                  )}
                  {phase === 'verified' && (
                    <Chip intent="success" icon={Check} className="border-transparent">
                      All seals match
                    </Chip>
                  )}
                </motion.span>
              </AnimatePresence>
            </div>
            <p className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55">
              {chainNode.algorithm}
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="rounded-2xl bg-[#0B211B]/[0.03] p-3.5">
          <StepList
            steps={steps}
            nodeStyle="circle"
            nodeSize="lg"
            activeStyle="spinner"
          />
        </div>

        <AnimatePresence>
          {phase === 'verified' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mt-3 flex items-start gap-2.5 rounded-2xl bg-emerald-500/[0.08] px-3.5 py-3"
            >
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.4} aria-hidden />
              <p className="min-w-0 flex-1 text-[11.5px] font-semibold leading-relaxed text-emerald-700">
                Every entry hashes to its recorded seal. If anyone had altered even one record, the chain would break here.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  )
}
