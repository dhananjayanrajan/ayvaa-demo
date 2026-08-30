import { AnimatePresence, motion } from 'motion/react'
import { FlaskConical, Loader2, Play, RotateCcw, TriangleAlert } from 'lucide-react'
import { Chip, Panel, Tile } from '@/components/phone/kit'
import { LifecycleButton } from '@/components/phone/LifecycleButton'
import { BottomSheet } from '@/components/phone/SheetShell'
import { OUTCOME_THEMES } from '@/components/system/drills/drillOutcomeTheme'
import type { TransactionPhase, DrillRun } from '@/data/system/transactions'
import { cn } from '@/lib/utils'

const OPTIONS = [
  { value: 0, label: 'No failure' },
  { value: 1, label: 'Step 1 · Booking' },
  { value: 2, label: 'Step 2 · Series' },
  { value: 3, label: 'Step 3 · Sessions' },
  { value: 4, label: 'Step 4 · Audit' },
  { value: 5, label: 'After commit · Dispatch' },
]

function copyFor(selected: number) {
  if (selected === 0)
    return 'Clean run. Every write lands, the record seals, and dispatch offers go out.'
  if (selected < 5)
    return `Step ${selected} fails mid-transaction. Later writes never happen and completed writes unwind in reverse order.`
  return 'Dispatch fails after the commit. The booking stays sealed — only delivery retries.'
}

interface FailureDrillSheetProps {
  open: boolean
  onClose: () => void
  selected: number
  onSelect: (value: number) => void
  phase: TransactionPhase
  lastRun: DrillRun | null
  onRun: () => void
}

export function FailureDrillSheet({
  open,
  onClose,
  selected,
  onSelect,
  phase,
  lastRun,
  onRun,
}: FailureDrillSheetProps) {
  const busy =
    phase === 'running' || phase === 'failing' || phase === 'rolling-back'
  const destructive = selected > 0
  const outcome = lastRun ? OUTCOME_THEMES[lastRun.outcome] : null
  const idleIcon = lastRun ? RotateCcw : destructive ? TriangleAlert : Play
  const idleLabel = lastRun ? 'Run again' : destructive ? 'Run until it fails' : 'Run the transaction'

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      icon={FlaskConical}
      title="Failure drill"
      subtitle={lastRun ? 'Last run complete · arm the next one' : 'Arm a failure, then run the transaction'}
    >
      <AnimatePresence initial={false}>
        {outcome && lastRun && (
          <motion.div
            key={`result-${lastRun.outcome}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Panel intent={outcome.intent} className="p-4">
              <div className="flex items-start gap-3">
                <Tile icon={FlaskConical} tone={outcome.tile} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[13.5px] font-bold tracking-tight text-[#0B211B]">
                      {outcome.title}
                    </span>
                    <Chip
                      intent={outcome.intent}
                      dot={lastRun.outcome !== 'committed'}
                      className="border-transparent"
                    >
                      {outcome.chipLabel}
                    </Chip>
                  </div>
                  <p className="mt-0.5 text-[11.5px] font-medium leading-relaxed text-[#0B211B]/60">
                    {lastRun.failureAt === 0
                      ? 'Drill ran clean · no failure armed'
                      : `Drill armed · ${OPTIONS[lastRun.failureAt]?.label}`}
                  </p>
                  <p className="mt-2 text-[11.5px] font-medium leading-relaxed text-[#0B211B]/70">
                    {outcome.detail}
                  </p>
                </div>
              </div>
            </Panel>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={cn('flex flex-wrap gap-1.5', outcome && 'mt-4')}>
        {OPTIONS.map((o) => {
          const isActive = o.value === selected
          return (
            <button
              key={o.value}
              type="button"
              disabled={busy}
              onClick={() => onSelect(o.value)}
              className={cn(
                'relative rounded-full px-3.5 py-1.5 text-[12px] font-bold outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-emerald-500/50',
                isActive ? 'text-white' : 'text-[#0B211B]/55 hover:text-[#0B211B]/80',
                busy && !isActive && 'opacity-50',
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="failure-option"
                  transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                  className={cn(
                    'absolute inset-0 rounded-full',
                    o.value === 0
                      ? 'bg-[#0B211B]'
                      : o.value === 5
                        ? 'bg-amber-500 shadow-[0_8px_16px_-8px_rgba(245,158,11,0.7)]'
                        : 'bg-rose-600 shadow-[0_8px_16px_-8px_rgba(225,29,72,0.7)]',
                  )}
                />
              )}
              <span className="relative">{o.label}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-3 rounded-2xl bg-[#0B211B]/[0.035] px-3.5 py-3">
        <p className="text-[11.5px] font-medium leading-relaxed text-[#0B211B]/70">
          {copyFor(selected)}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {destructive ? (
          <Chip intent="danger" dot className="border-transparent">
            Fails at {OPTIONS.find((o) => o.value === selected)?.label}
          </Chip>
        ) : (
          <Chip intent="info" className="border-transparent">
            Clean transaction ahead
          </Chip>
        )}
        <Chip intent="success" className="border-transparent">
          Family never sees a broken state
        </Chip>
      </div>

      <LifecycleButton
        phase={busy ? 'working' : 'idle'}
        tone={destructive ? 'danger' : 'success'}
        className="mt-4"
        idleIcon={idleIcon}
        idleLabel={idleLabel}
        workingLabel="Transaction in motion"
        doneLabel="Run complete"
        onPress={onRun}
      />
    </BottomSheet>
  )
}
