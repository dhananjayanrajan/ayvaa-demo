import { Check, CheckCircle2, ClipboardList, Lock, ScanLine, TrendingDown, TrendingUp } from 'lucide-react'
import { Chip, Panel } from '@/components/phone/kit'
import { PHASE_THEME, PhaseHero } from '@/components/phone/PhaseHero'
import { HeroTopRow } from '@/components/phone/HeroCells'
import { SHEET_MODES, VITAL_READINGS, type SheetMode, type VitalReading } from '@/data/sheetData'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { StatusStrip } from '@/components/phone/StatusStrip'
import { QuotePanel } from '@/components/phone/QuotePanel'
import { LifecycleButton } from '@/components/phone/LifecycleButton'

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