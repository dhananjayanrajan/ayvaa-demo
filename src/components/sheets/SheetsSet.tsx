import type { LucideIcon } from 'lucide-react'
import { AlertTriangle, BarChart3, Bell, CalendarClock, Check, CheckCircle2, ChevronRight, ClipboardList, Clock, Download, Eye, FileText, HeartHandshake, Lock, MapPin, MessageSquare, Phone, ReceiptText, ScanLine, Send, ShieldAlert, ShieldCheck, Siren, SlidersHorizontal, Stethoscope, TrendingDown, TrendingUp, UserPlus, Users, X } from 'lucide-react'
import { BottomSheet, SheetShell } from '@/components/phone/SheetShell'
import { Row } from '@/components/phone/Row'
import { motion } from 'motion/react'
import type { TileTone } from '@/components/phone/kit'
import { Chip, Panel, TimeChip } from '@/components/phone/kit'
import { Overline } from '@/components/phone/Overline'
import { FactTile, FactTileGrid } from '@/components/phone/FactTile'
import { MiniTimeline } from '@/components/phone/MiniTimeline'
import { consentReview } from '@/data/seed'
import { PHASE_THEME, PhaseHero } from '@/components/phone/PhaseHero'
import { HeroTopRow } from '@/components/phone/HeroCells'
import { SHEET_MODES, VITAL_READINGS, type SheetMode, type VitalReading } from '@/data/sheetData'
import { cn } from '@/lib/utils'
import { StatusStrip } from '@/components/phone/StatusStrip'
import { QuotePanel } from '@/components/phone/QuotePanel'
import { LifecycleButton } from '@/components/phone/LifecycleButton'
import { useState } from 'react'
import { ActionButton } from '@/components/phone/ActionPair'

type NotifyFn_AccountActionsSheet = (payload: { title: string; body: string; kind: 'ok' | 'warn' | 'info' }) => void

interface AccountActionsSheetProps {
  open: boolean
  onClose: () => void
  notify: NotifyFn_AccountActionsSheet
  accountName: string
}

export function AccountActionsSheet({ open, onClose, notify, accountName }: AccountActionsSheetProps) {
  const actions = [
    {
      key: 'area',
      label: 'Adjust care area',
      sub: 'Widen service area and re-dispatch offers',
      icon: MapPin,
      tone: 'neutral' as const,
      onSelect: () => {
        notify({ title: 'Area adjusted', body: 'Care area widened · new offers will reach more professionals', kind: 'info' })
        onClose()
      },
    },
    {
      key: 'pause',
      label: 'Pause account',
      sub: 'Stop new offers until manually reactivated',
      icon: AlertTriangle,
      tone: 'warning' as const,
      onSelect: () => {
        notify({ title: 'Account paused', body: 'No new offers until reactivated', kind: 'warn' })
        onClose()
      },
    },
  ]

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      icon={SlidersHorizontal}
      title="Manage account"
      subtitle={`Choose an action for ${accountName}`}
    >
      <div className="flex flex-col gap-2">
        {actions.map((a) => (
          <Row
            key={a.key}
            icon={a.icon}
            tone={a.tone}
            tileSize="sm"
            title={a.label}
            subtitle={a.sub}
            showChevron={false}
            surface="inset"
            padding="even"
            hoverClassName="hover:bg-[#0B211B]/[0.06]"
            onClick={a.onSelect}
          />
        ))}
      </div>
    </BottomSheet>
  )
}

interface CloseSheetProps {
  onClose: () => void
  notify: (payload: { title: string; body: string; kind: 'ok' }) => void
  onConfirm: () => void
  decision?: string
}

export function CloseSheet({ onClose, notify, onConfirm, decision }: CloseSheetProps) {
  return (
    <>
      <Panel intent="success" className="p-3.5">
        <div className="flex items-center gap-1.5">
          <TimeChip>Note</TimeChip>
          <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-700/70">Your decision</span>
        </div>
        <p className="mt-1.5 text-pretty text-[12.5px] font-medium leading-relaxed text-[#0B211B]/75">{decision}</p>
      </Panel>

      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          onClose()
          notify({ title: 'Incident closed', body: 'Care plan resumed · family and caregiver notified', kind: 'ok' })
          onConfirm()
        }}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
      >
        <CheckCircle2 className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
        Confirm close
      </motion.button>
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={onClose}
        className="w-full rounded-2xl bg-[#0B211B]/[0.05] py-3.5 text-sm font-bold text-[#0B211B]/70"
      >
        Keep it open
      </motion.button>
    </>
  )
}

type NotifyFn_ConsentRecordSheet = (payload: { title: string; body: string; kind: 'ok' | 'warn' | 'info' }) => void

interface ConsentRecordSheetProps {
  open: boolean
  onClose: () => void
  notify: NotifyFn_ConsentRecordSheet
}

const recordTimeline = [
  { date: 'Jan 14', time: '9:42 AM', label: 'Signed', note: 'Via guardian app', done: true },
  { date: 'Mar 28', time: '6:05 PM', label: 'Reminder sent', note: 'Push + SMS', done: true },
  { date: 'Apr 04', time: '8:00 AM', label: 'Reminder sent', note: 'Push + SMS', done: true },
  { date: 'Apr 18', time: '8:00 AM', label: 'Reminder sent', note: 'Push + SMS', done: true },
  { date: 'May 01', time: '8:00 AM', label: 'Due now', note: 'Awaiting renewal', done: false },
]

export function ConsentRecordSheet({ open, onClose, notify }: ConsentRecordSheetProps) {
  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      icon={FileText}
      title={consentReview.name}
      subtitle={consentReview.category}
      footer={
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            onClose()
            notify({ title: 'Guardian called', body: 'Priya Sharma reached · review scheduled', kind: 'ok' })
          }}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] transition-all duration-200 hover:shadow-[0_22px_40px_-18px_rgba(5,150,105,0.85)] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
        >
          <Phone className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          <span className="break-words">Call guardian now</span>
        </motion.button>
      }
    >
      <div className="rounded-2xl bg-[#0B211B]/[0.03] p-4">
        <Overline>Consent details</Overline>
        <FactTileGrid className="mt-3">
          <FactTile icon={CalendarClock} label="Signed" value={consentReview.signed} />
          <FactTile icon={Clock} label="Pauses" value={consentReview.pauses} />
          <FactTile icon={Phone} label="Reminded" value={`${consentReview.reminded}x`} />
          <FactTile icon={ShieldCheck} label="Status" value={consentReview.due} />
        </FactTileGrid>
      </div>

      <div className="mt-4 rounded-2xl bg-[#0B211B]/[0.03] p-4">
        <Overline>Recent activity</Overline>
        <MiniTimeline
          className="mt-3"
          items={recordTimeline.map((item) => ({
            title: item.label,
            note: item.note,
            done: item.done,
            pending: !item.done,
            trailing: <span className="shrink-0 text-[10px] font-bold text-[#0B211B]/40">{item.date}</span>,
          }))}
        />
      </div>
    </BottomSheet>
  )
}

type EscalateAction = {
  icon: LucideIcon
  tone: 'info' | 'neutral' | 'warning'
  label: string
  sub: string
  body: string
  kind: 'info' | 'warn'
}

const escalateActions: EscalateAction[] = [
  { icon: Siren, tone: 'info', label: 'Page supervisor on call', sub: 'On-call supervisor, immediately', body: 'On-call supervisor notified immediately', kind: 'info' },
  { icon: HeartHandshake, tone: 'neutral', label: 'Notify family', sub: 'Guardian updated with context', body: 'Guardian updated on the incident', kind: 'info' },
  { icon: ShieldAlert, tone: 'warning', label: 'Escalate to senior ops', sub: 'Senior operations takes ownership', body: 'Senior operations team now owns this incident', kind: 'warn' },
]

interface EscalateSheetProps {
  onClose: () => void
  notify: (payload: { title: string; body: string; kind: 'info' | 'warn' }) => void
}

export function EscalateSheet({ onClose, notify }: EscalateSheetProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        {escalateActions.map((a) => (
          <Row
            key={a.label}
            icon={a.icon}
            tone={a.tone}
            tileSize="sm"
            title={a.label}
            subtitle={a.sub}
            surface="inset"
            padding="even"
            hoverClassName="hover:bg-[#0B211B]/[0.06]"
            showChevron={false}
            trailing={
              <ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/25 transition-transform group-hover:translate-x-0.5" aria-hidden />
            }
            onClick={() => {
              onClose()
              notify({ title: a.label, body: a.body, kind: a.kind })
            }}
          />
        ))}
      </div>
      <p className="text-center text-[11px] font-medium leading-relaxed text-[#0B211B]/45">
        Every escalation is timestamped in the audit record.
      </p>
    </>
  )
}

interface PhotoViewSheetProps {
  onClose: () => void
  notify: (payload: { title: string; body: string; kind: 'info' }) => void
}

export function PhotoViewSheet({ onClose, notify }: PhotoViewSheetProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-rose-200/60">
          <Lock className="h-3 w-3" aria-hidden />
          Incident photo · restricted
        </span>
        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          onClick={onClose}
          className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white"
          aria-label="Close photo"
        >
          <X className="h-5 w-5" aria-hidden />
        </motion.button>
      </div>

      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.08, duration: 0.25 }}
        className="mt-4 grid flex-1 place-items-center rounded-[26px] border border-white/10 bg-white/[0.04]"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-white/[0.06]">
            <Lock className="h-7 w-7 text-white/30" aria-hidden />
          </span>
          <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/30">Encrypted preview</span>
        </div>
      </motion.div>

      <div className="mt-4 flex flex-col gap-2.5 rounded-[20px] bg-white/[0.05] p-4">
        <div className="flex items-baseline justify-between gap-3">
          <span className="shrink-0 text-[11.5px] font-medium text-white/50">Captured</span>
          <span className="text-right text-[12.5px] font-bold leading-snug text-white">9:38 AM · hallway camera</span>
        </div>
        <div aria-hidden className="h-px bg-white/[0.07]" />
        <div className="flex items-baseline justify-between gap-3">
          <span className="shrink-0 text-[11.5px] font-medium text-white/50">Viewed by</span>
          <span className="text-right text-[12.5px] font-bold leading-snug text-white">You · logged in audit</span>
        </div>
      </div>

      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          onClose()
          notify({ title: 'Access logged', body: 'Your view of this photo is written to the audit record', kind: 'info' })
        }}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
      >
        <CheckCircle2 className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
        Close and log my access
      </motion.button>
    </>
  )
}

type Props_EntrySheetsHero = {
  saved: SheetMode[]
  activeMode: SheetMode
  activeProgress: { done: number; total: number }
}

export function EntrySheetsHero({ saved, activeMode, activeProgress }: Props_EntrySheetsHero) {
  const complete = saved.length === SHEET_MODES.length
  const draftInProgress = !saved.includes(activeMode) && activeProgress.done > 0
  return (
    <PhaseHero theme={complete ? PHASE_THEME.emeraldBright : PHASE_THEME.blueDeep}>
      <HeroTopRow
        label="Entry sheets"
        labelClass={complete ? 'text-emerald-200/50' : 'text-blue-200/50'}
        trailing={
          <Chip
            intent={complete ? 'success' : draftInProgress ? 'warning' : 'live'}
            light
            dot={!complete}
            className="border-transparent"
          >
            {complete ? 'All recorded' : draftInProgress ? 'Draft in progress' : 'Visit live'}
          </Chip>
        }
      />

      <h2 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        {saved.length} of 3 sheets{' '}
        <span
          className={cn(
            'bg-gradient-to-r bg-clip-text text-transparent',
            complete ? 'from-emerald-300 to-teal-200' : 'from-sky-300 to-blue-200',
          )}
        >
          recorded
        </span>
      </h2>

      <div className="mt-4 flex gap-1.5">
        {SHEET_MODES.map((m) => (
          <span
            key={m.id}
            className={cn(
              'h-1.5 flex-1 rounded-full',
              saved.includes(m.id) ? 'bg-gradient-to-r from-emerald-400 to-teal-300' : 'bg-white/10',
            )}
          />
        ))}
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {SHEET_MODES.map((m) => {
          const done = saved.includes(m.id)
          const drafting = m.id === activeMode && draftInProgress
          const Icon = m.icon
          return (
            <div
              key={m.id}
              className={cn(
                'rounded-2xl px-3 py-2.5 transition-colors',
                done ? 'bg-emerald-400/[0.12]' : drafting ? 'bg-amber-300/[0.08]' : 'bg-white/[0.06]',
              )}
            >
              <div className="flex items-center justify-between">
                <Icon
                  className={cn(
                    'h-3.5 w-3.5',
                    done ? 'text-emerald-300' : drafting ? 'text-amber-200/80' : 'text-white/40',
                  )}
                  strokeWidth={2.4}
                  aria-hidden
                />
                {done ? (
                  <Check className="h-3 w-3 text-emerald-300" strokeWidth={3.5} aria-hidden />
                ) : drafting ? (
                  <span className="text-[9px] font-extrabold tabular-nums text-amber-200/80">
                    {activeProgress.done}/{activeProgress.total}
                  </span>
                ) : null}
              </div>
              <div
                className={cn(
                  'mt-1.5 text-[10px] font-extrabold uppercase tracking-[0.1em]',
                  done ? 'text-emerald-100' : drafting ? 'text-amber-100/80' : 'text-white/45',
                )}
              >
                {m.label}
              </div>
            </div>
          )
        })}
      </div>
    </PhaseHero>
  )
}

type Props_MedVerificationPanel = {
  checks: string[]
  allChecked: boolean
  saved: boolean
  scanned: boolean
  verifications: string[]
  total: number
  onToggleCheck: (label: string) => void
  onRescan: () => void
}

export function MedVerificationPanel({ checks, allChecked, saved, scanned, verifications, total, onToggleCheck, onRescan }: Props_MedVerificationPanel) {
  const verified = allChecked || saved
  return (
    <div className="flex flex-col gap-2.5">
      <Panel intent={verified ? 'success' : 'warning'} className="p-4">
        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              'text-[9px] font-extrabold uppercase tracking-[0.18em]',
              verified ? 'text-emerald-700/80' : 'text-amber-700/80',
            )}
          >
            {verified ? 'Verification complete' : 'Verification · all three required'}
          </span>
          <Chip intent={verified ? 'success' : 'warning'} dot={!verified}>
            {verified ? 'Done' : `${checks.length}/${total}`}
          </Chip>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          {verifications.map((v) => {
            const on = checks.includes(v)
            return (
              <motion.button
                key={v}
                type="button"
                whileTap={{ scale: 0.985 }}
                onClick={() => onToggleCheck(v)}
                aria-pressed={on}
                className={cn(
                  'flex items-center gap-3 rounded-2xl px-3.5 py-3 text-left transition-colors',
                  on ? 'bg-emerald-500/[0.1]' : 'bg-white hover:bg-[#0B211B]/[0.02]',
                )}
              >
                <span
                  className={cn(
                    'grid h-5 w-5 shrink-0 place-items-center rounded-lg transition-colors',
                    on ? 'bg-emerald-500 text-white' : 'bg-[#0B211B]/[0.1] text-transparent',
                  )}
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={3.5} aria-hidden />
                </span>
                <span
                  className={cn(
                    'min-w-0 flex-1 text-[12.5px] font-semibold leading-snug',
                    on ? 'text-emerald-800' : 'text-[#0B211B]/70',
                  )}
                >
                  {v}
                </span>
              </motion.button>
            )
          })}
        </div>
      </Panel>

      <motion.button
        type="button"
        whileTap={{ scale: 0.985 }}
        onClick={onRescan}
        className={cn(
          'flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left',
          scanned ? 'bg-emerald-500/[0.1]' : 'bg-amber-500/[0.1]',
        )}
      >
        <ScanLine
          className={cn('h-5 w-5 shrink-0', scanned ? 'text-emerald-600' : 'text-amber-600')}
          strokeWidth={2.2}
          aria-hidden
        />
        <span className="min-w-0 flex-1">
          <span className={cn('block text-[13px] font-bold tracking-tight', scanned ? 'text-emerald-800' : 'text-amber-800')}>
            {scanned ? 'Pack barcode scanned · matched' : 'Scan pack barcode to verify'}
          </span>
          <span className={cn('mt-0.5 block text-[10.5px] font-semibold', scanned ? 'text-emerald-700/60' : 'text-amber-700/60')}>
            {scanned ? 'Tap to rescan' : 'Required before confirming the dose'}
          </span>
        </span>
        {scanned && <Check className="h-4 w-4 shrink-0 text-emerald-600" strokeWidth={3} aria-hidden />}
      </motion.button>

      {saved ? (
        <StatusStrip>Dose confirmed · Amlodipine 5 mg given · recorded permanently</StatusStrip>
      ) : (
        !allChecked && (
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700">
            <Lock className="h-3.5 w-3.5" aria-hidden />
            Confirm stays locked · complete all three checks first
          </div>
        )
      )}

      {allChecked && !saved && (
        <Panel intent="success" className="flex items-start gap-2.5 p-3.5">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.6} aria-hidden />
          <p className="min-w-0 flex-1 text-pretty text-[11.5px] font-semibold leading-relaxed text-[#0B211B]/70">
            All three checks done and the pack is matched. Confirming records the dose permanently.
          </p>
        </Panel>
      )}
    </div>
  )
}

type Props_NotesPanel = {
  note: string
  quickTags: string[]
  tags: string[]
  onToggleTag: (tag: string) => void
  onPressNote: () => void
}

export function NotesPanel({ note, quickTags, tags, onToggleTag, onPressNote }: Props_NotesPanel) {
  return (
    <div className="flex flex-col gap-2.5">
      <motion.button
        type="button"
        whileTap={{ scale: 0.985 }}
        onClick={onPressNote}
        className="relative overflow-hidden rounded-2xl bg-[#0B231C] p-4 text-left shadow-[0_20px_44px_-24px_rgba(6,40,30,0.7)]"
      >
        <div aria-hidden className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="relative">
          <QuotePanel
            bare
            kicker="Your note · verbatim to family"
            kickerIcon={ClipboardList}
            quote={note}
          />
        </div>
      </motion.button>

      <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">Quick tags</div>
      <div className="flex flex-wrap gap-2">
        {quickTags.map((t) => {
          const on = tags.includes(t)
          return (
            <motion.button
              key={t}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => onToggleTag(t)}
              aria-pressed={on}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-bold transition-colors',
                on ? 'bg-emerald-500/[0.14] text-emerald-700' : 'bg-[#0B211B]/[0.045] text-[#0B211B]/55',
              )}
            >
              {on && <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />}
              {t}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

type Props_ReopenSheetsBar = {
  saved: SheetMode[]
  onPress: () => void
}

export function ReopenSheetsBar({ saved, onPress }: Props_ReopenSheetsBar) {
  const doneCount = SHEET_MODES.filter((m) => saved.includes(m.id)).length
  const complete = doneCount === SHEET_MODES.length
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      onClick={onPress}
      className={cn(
        'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold transition-colors',
        complete
          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
          : 'bg-[#0B211B]/[0.06] text-[#0B211B]/75',
      )}
    >
      <ClipboardList
        className={cn('h-4 w-4 shrink-0', complete ? 'text-white' : 'text-[#0B211B]/45')}
        strokeWidth={2.4}
        aria-hidden
      />
      <span className="truncate">{complete ? 'All sheets recorded · review' : 'Open entry sheets'}</span>
      {doneCount > 0 && (
        <span
          className={cn(
            'flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-extrabold tabular-nums',
            complete ? 'bg-white/15 text-white' : 'bg-emerald-500/[0.12] text-emerald-700',
          )}
        >
          {complete && <Check className="h-2.5 w-2.5" strokeWidth={4} aria-hidden />}
          {doneCount}/{SHEET_MODES.length}
        </span>
      )}
    </motion.button>
  )
}

export type SaveStatus = 'idle' | 'saving' | 'saved'

type Props_SaveSheetButton = {
  label: string
  disabled: boolean
  status: SaveStatus
  onPress: () => void
}

export function SaveSheetButton({ label, disabled, status, onPress }: Props_SaveSheetButton) {
  return (
    <LifecycleButton
      phase={status === 'idle' ? 'idle' : status === 'saved' ? 'done' : 'working'}
      className="mt-auto"
      gated={disabled && status === 'idle'}
      idleIcon={CheckCircle2}
      idleLabel={label}
      workingLabel="Saving…"
      doneLabel="Saved · sealed at sign off"
      onPress={onPress}
    />
  )
}

type Props_VitalsPanel = {
  recorded: string[]
  onRecord: (reading: VitalReading) => void
}

export function VitalsPanel({ recorded, onRecord }: Props_VitalsPanel) {
  const allRecorded = recorded.length === VITAL_READINGS.length
  return (
    <div className="flex flex-col gap-2.5">
      <div className="grid grid-cols-2 gap-2.5">
        {VITAL_READINGS.map((v) => {
          const on = recorded.includes(v.key)
          return (
            <motion.button
              key={v.key}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => onRecord(v)}
              aria-pressed={on}
              className={cn(
                'relative flex flex-col items-start rounded-2xl p-3.5 text-left transition-colors',
                on ? 'bg-emerald-500/[0.09]' : 'bg-[#0B211B]/[0.04] hover:bg-[#0B211B]/[0.07]',
              )}
            >
              {on && (
                <span className="absolute right-3 top-3 grid h-4 w-4 place-items-center rounded-full bg-emerald-500">
                  <Check className="h-2.5 w-2.5 text-white" strokeWidth={4} aria-hidden />
                </span>
              )}
              <span className={cn('text-[9px] font-extrabold uppercase tracking-[0.12em]', on ? 'text-emerald-700/70' : 'text-[#0B211B]/40')}>
                {v.label}
              </span>
              <span
                className={cn(
                  'mt-1.5 text-[19px] font-extrabold tabular-nums leading-none tracking-tight',
                  on ? 'text-emerald-900' : 'text-[#0B211B]',
                )}
              >
                {v.value}
              </span>
              <span className="mt-2 flex items-center gap-1">
                {v.down ? (
                  <TrendingDown className="h-3 w-3 text-emerald-600" strokeWidth={2.6} aria-hidden />
                ) : (
                  <TrendingUp className="h-3 w-3 text-sky-600" strokeWidth={2.6} aria-hidden />
                )}
                <span className="text-[9px] font-bold text-[#0B211B]/45">{v.delta}</span>
              </span>
            </motion.button>
          )
        })}
      </div>

      <Panel intent={allRecorded ? 'success' : 'info'} className="flex items-start gap-2.5 p-3.5">
        {allRecorded ? (
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" strokeWidth={3} aria-hidden />
        ) : (
          <TrendingDown className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" strokeWidth={2.6} aria-hidden />
        )}
        <p className="min-w-0 flex-1 text-pretty text-[11.5px] font-semibold leading-relaxed text-[#0B211B]/70">
          {allRecorded
            ? 'All four readings logged. Blood pressure is 4 points lower than Monday and within normal range for his plan.'
            : 'Tap each reading to log it. Blood pressure is tracking 4 points lower than Monday so far.'}
        </p>
        <Chip intent={allRecorded ? 'success' : 'info'} dot={!allRecorded}>
          {recorded.length}/{VITAL_READINGS.length}
        </Chip>
      </Panel>
    </div>
  )
}

export interface AlertItem {
  icon: LucideIcon
  tone: TileTone
  title: string
  body: string
  time: string
}

interface PartnerAlertsSheetProps {
  alerts: AlertItem[]
  onClose: () => void
  onMarkAllRead: () => void
}

export function PartnerAlertsSheet({ alerts, onClose, onMarkAllRead }: PartnerAlertsSheetProps) {
  return (
    <SheetShell
      icon={Bell}
      tone="warning"
      title="Partner alerts"
      subtitle="Everything that moved while you were away"
      onClose={onClose}
      height="auto"
    >
      {alerts.length > 0 ? (
        <div className="flex flex-col">
          {alerts.map((a) => (
            <div key={a.title}>
              <Row
                icon={a.icon}
                tone={a.tone}
                title={a.title}
                subtitle={a.body}
                subtitleClassName="truncate text-xs"
                time={a.time}
                surface="none"
                padding="none"
                className="px-1"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <CheckCircle2 className="h-8 w-8 text-emerald-500" strokeWidth={2} />
          <p className="mt-2 text-sm font-bold text-[#0B211B]">You're all caught up</p>
          <p className="mt-0.5 text-xs font-medium text-[#0B211B]/55">No new alerts to show.</p>
        </div>
      )}

      <button
        type="button"
        onClick={onMarkAllRead}
        disabled={alerts.length === 0}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] disabled:opacity-50"
      >
        <CheckCircle2 className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
        Mark all as read
      </button>
      <p className="text-center text-[10.5px] font-semibold text-[#0B211B]/45">
        Alerts are quiet between 9 PM and 8 AM unless urgent.
      </p>
    </SheetShell>
  )
}

interface PartnerBillingSheetProps {
  invoiceAmount: string
  invoiceSessions: string
  onClose: () => void
  onViewBilling: () => void
}

export function PartnerBillingSheet({
  invoiceAmount,
  invoiceSessions,
  onClose,
  onViewBilling,
}: PartnerBillingSheetProps) {
  return (
    <SheetShell
      icon={ReceiptText}
      tone="warning"
      title="Billing summary"
      subtitle="February invoice is paid"
      onClose={onClose}
      height="auto"
    >
      <div className="rounded-2xl bg-[#0B211B]/[0.03] p-4">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-bold text-[#0B211B]">February invoice</span>
          <span className="font-mono text-lg font-black text-[#0B211B]">{invoiceAmount}</span>
        </div>
        <div className="mt-1 text-xs font-medium text-[#0B211B]/55">{invoiceSessions}</div>
      </div>
      <button
        type="button"
        onClick={onViewBilling}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.05] py-3 text-sm font-bold text-[#0B211B]/75"
      >
        View billing details
        <ChevronRight className="h-4 w-4" />
      </button>
    </SheetShell>
  )
}

interface PartnerDischargeFileSheetProps {
  onClose: () => void
  onView: () => void
  onDownload: () => void
}

export function PartnerDischargeFileSheet({ onClose, onView, onDownload }: PartnerDischargeFileSheetProps) {
  return (
    <SheetShell
      icon={FileText}
      tone="ink"
      title="Discharge file"
      subtitle="Latest summary PDF"
      onClose={onClose}
      height="auto"
    >
      <div className="rounded-2xl bg-[#0B211B]/[0.03] p-4">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-bold text-[#0B211B]">Discharge Summary.pdf</span>
          <span className="text-[11px] font-medium text-[#0B211B]/45">2.4 MB</span>
        </div>
        <div className="mt-1 text-xs font-medium text-[#0B211B]/55">Last updated · today, 9:15 AM</div>
      </div>

      <div className="flex gap-2">
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={onView}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.05] py-3 text-sm font-bold text-[#0B211B]/75 transition-colors hover:bg-[#0B211B]/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
        >
          <Eye className="h-4 w-4" />
          View
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={onDownload}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
        >
          <Download className="h-4 w-4" />
          Download
        </motion.button>
      </div>
    </SheetShell>
  )
}

export interface PartnerInfoSheetData {
  type: 'step' | 'category' | 'rx' | 'file' | 'patient'
  title: string
  body: string
  icon: LucideIcon
  actionLabel?: string
  onAction?: () => void
}

interface PartnerInfoSheetProps {
  data: PartnerInfoSheetData | null
  onClose: () => void
}

export function PartnerInfoSheet({ data, onClose }: PartnerInfoSheetProps) {
  return (
    <SheetShell open={!!data} onClose={onClose} height="auto">
      {data && (
        <>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <data.icon className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">{data.title}</div>
              <p className="mt-1 text-xs font-medium leading-relaxed text-[#0B211B]/60">{data.body}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
              aria-label="Close information"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
          {data.actionLabel && data.onAction && (
            <button
              type="button"
              onClick={data.onAction}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3 text-sm font-bold text-white"
            >
              {data.actionLabel}
            </button>
          )}
        </>
      )}
    </SheetShell>
  )
}

interface PartnerMessageSheetProps {
  onClose: () => void
  onSend: (message: string) => void
}

const quickReplies = [
  'How is the patient doing today?',
  'Please update the care plan.',
  'When is the next visit scheduled?',
  'Can we get a summary of recent progress?',
]

export function PartnerMessageSheet({ onClose, onSend }: PartnerMessageSheetProps) {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (message.trim()) {
      onSend(message)
      setMessage('')
      onClose()
    }
  }

  return (
    <SheetShell
      icon={MessageSquare}
      tone="live"
      title="Message care team"
      subtitle="Send a note to the assigned care team"
      onClose={onClose}
      height="auto"
    >
      <div className="flex flex-wrap gap-2">
        {quickReplies.map((reply) => (
          <ActionButton
            key={reply}
            status="idle"
            onPress={() => setMessage(reply)}
            idleLabel={reply}
            tapScale={0.95}
            className="rounded-full bg-[#0B211B]/[0.04] px-3 py-1.5 text-[11px] font-bold text-[#0B211B]/60 transition-colors hover:bg-[#0B211B]/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
          />
        ))}
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your message…"
        rows={4}
        className="w-full resize-none rounded-2xl bg-[#0B211B]/[0.03] px-4 py-3 text-sm font-medium text-[#0B211B] placeholder:text-[#0B211B]/35 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
      />

      <motion.button
        type="button"
        whileTap={{ scale: message.trim() ? 0.98 : 1 }}
        onClick={handleSend}
        disabled={!message.trim()}
        className={cn(
          'flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)] transition-opacity',
          !message.trim() && 'opacity-50'
        )}
      >
        <Send className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
        Send message
      </motion.button>
    </SheetShell>
  )
}

interface PartnerReferralSheetProps {
  onClose: () => void
  onNewReferral: () => void
  onContinueDraft: () => void
  onViewRecent: () => void
}

export function PartnerReferralSheet({
  onClose,
  onNewReferral,
  onContinueDraft,
  onViewRecent,
}: PartnerReferralSheetProps) {
  const options = [
    { icon: UserPlus, tile: 'bg-emerald-100 text-emerald-700', title: 'Refer new patient', sub: 'Start a fresh 4-step referral wizard', onSelect: onNewReferral },
    { icon: FileText, tile: 'bg-amber-100 text-amber-700', title: 'Continue draft', sub: 'Pick up where you left off', onSelect: onContinueDraft },
    { icon: Send, tile: 'bg-sky-100 text-sky-700', title: 'View recent referrals', sub: 'See all submitted referrals', onSelect: onViewRecent },
  ]
  return (
    <SheetShell
      icon={UserPlus}
      tone="live"
      title="Referral options"
      subtitle="Choose how you want to proceed"
      onClose={onClose}
      height="auto"
    >
      <div className="flex flex-col">
        {options.map((o) => (
          <Row
            key={o.title}
            leading={
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${o.tile}`}>
                <o.icon className="h-5 w-5" strokeWidth={2.2} />
              </span>
            }
            title={o.title}
            subtitle={o.sub}
            subtitleClassName="text-xs"
            surface="none"
            padding="none"
            className="px-1"
            showChevron={false}
            trailing={<ChevronRight className="h-4 w-4 shrink-0 text-[#0B211B]/30" aria-hidden />}
            onClick={o.onSelect}
          />
        ))}
      </div>
    </SheetShell>
  )
}

interface PartnerSessionsSheetProps {
  sessionsCount: number
  onClose: () => void
  onViewHistory: () => void
}

export function PartnerSessionsSheet({ sessionsCount, onClose, onViewHistory }: PartnerSessionsSheetProps) {
  return (
    <SheetShell
      icon={Stethoscope}
      tone="ink"
      title="Sessions this month"
      subtitle={`${sessionsCount} verified sessions`}
      onClose={onClose}
      height="auto"
    >
      <div className="flex items-center justify-between rounded-2xl bg-[#0B211B]/[0.03] p-4">
        <span className="text-[13px] font-bold text-[#0B211B]">Completed</span>
        <span className="font-mono text-lg font-black text-[#0B211B]">{sessionsCount}</span>
      </div>
      <button
        type="button"
        onClick={onViewHistory}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.05] py-3 text-sm font-bold text-[#0B211B]/75"
      >
        View session history
        <ChevronRight className="h-4 w-4" />
      </button>
    </SheetShell>
  )
}

interface StaffMember {
  name: string
  role: string
  seed: string
}

interface PartnerStaffSheetProps {
  staffList: StaffMember[]
  staffCount: number
  onClose: () => void
  onViewAllStaff: () => void
}

export function PartnerStaffSheet({ staffList, staffCount, onClose, onViewAllStaff }: PartnerStaffSheetProps) {
  return (
    <SheetShell
      icon={Users}
      tone="info"
      title="Staff on Ayvaa"
      subtitle={`${staffCount} team members active`}
      onClose={onClose}
      height="auto"
    >
      <div className="flex flex-col">
        {staffList.map((staff) => (
          <div key={staff.name}>
            <Row
              leading={
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                  <Users className="h-5 w-5" strokeWidth={2} />
                </span>
              }
              title={staff.name}
              subtitle={staff.role}
              subtitleClassName="truncate text-xs"
              surface="none"
              padding="none"
              className="px-1"
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onViewAllStaff}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0B211B]/[0.05] py-3 text-sm font-bold text-[#0B211B]/75"
      >
        View all staff
        <ChevronRight className="h-4 w-4" />
      </button>
    </SheetShell>
  )
}

interface PartnerStatsSheetProps {
  weeklySessions: number[]
  onClose: () => void
}

export function PartnerStatsSheet({ weeklySessions, onClose }: PartnerStatsSheetProps) {
  const maxSessions = Math.max(...weeklySessions)

  return (
    <SheetShell onClose={onClose} height="auto">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <BarChart3 className="h-5 w-5" strokeWidth={2.2} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[15px] font-extrabold tracking-tight text-[#0B211B]">Weekly sessions</div>
          <div className="mt-0.5 text-xs font-medium text-[#0B211B]/55">Last 7 days verified activity</div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0B211B]/[0.05] text-[#0B211B]/50"
          aria-label="Close details"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div className="flex items-end justify-between gap-2 rounded-2xl bg-[#0B211B]/[0.03] p-4">
        {weeklySessions.map((s, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(s / maxSessions) * 80}px` }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="w-full max-w-6 rounded-lg bg-gradient-to-t from-emerald-500 to-teal-300"
            />
            <span className="text-[8px] font-extrabold uppercase tracking-wide text-[#0B211B]/40">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#0B211B]/40">Total this week</span>
        <span className="font-mono text-lg font-black tabular-nums text-[#0B211B]">
          {weeklySessions.reduce((a, b) => a + b, 0)}
        </span>
      </div>
    </SheetShell>
  )
}
