import { AnimatePresence, motion } from 'motion/react'
import { FlaskConical, Settings2 } from 'lucide-react'
import { Card, Chip, Tile } from '@/components/base/phone/kit'
import { OUTCOME_THEMES } from '@/data/drillOutcomeTheme'
import type { TransactionPhase, DrillRun } from '@/data/system/transactions'
import { cn } from '@/lib/utils'

const TARGETS: Record<number, string> = {
  0: 'Clean run · every write lands',
  1: 'Fails at step 1 · Booking record',
  2: 'Fails at step 2 · Recurring series',
  3: 'Fails at step 3 · Session stubs',
  4: 'Fails at step 4 · Audit event',
  5: 'Fails after commit · Dispatch',
}

interface FailureDrillCardProps {
  selected: number
  phase: TransactionPhase
  lastRun: DrillRun | null
  onOpen: () => void
}

export function FailureDrillCard({ selected, phase, lastRun, onOpen }: FailureDrillCardProps) {
  const destructive = selected > 0
  const busy =
    phase === 'running' || phase === 'failing' || phase === 'rolling-back'
  const outcome = lastRun ? OUTCOME_THEMES[lastRun.outcome] : null
  const intent = outcome ? outcome.intent : destructive ? 'danger' : 'info'
  const tileTone = outcome ? outcome.tile : destructive ? 'danger' : 'info'

  return (
    <Card intent={intent}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <Tile icon={FlaskConical} tone={tileTone} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-bold tracking-tight text-[#0B211B]">Failure drill</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={outcome ? outcome.chipLabel : destructive ? 'armed' : 'idle'}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="shrink-0"
                >
                  {outcome ? (
                    <Chip intent={outcome.intent} dot={lastRun?.outcome !== 'committed'} className="border-transparent">
                      {outcome.chipLabel}
                    </Chip>
                  ) : destructive ? (
                    <Chip intent="danger" dot className="border-transparent">
                      Step {selected} armed
                    </Chip>
                  ) : (
                    <Chip intent="info" className="border-transparent">
                      No failure armed
                    </Chip>
                  )}
                </motion.span>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={outcome ? `run-${lastRun?.outcome}` : `armed-${selected}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="mt-0.5 text-xs font-medium leading-relaxed text-[#0B211B]/55"
              >
                {outcome
                  ? outcome.body
                  : TARGETS[selected]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {outcome && (
          <div className="mt-3 rounded-2xl bg-[#0B211B]/[0.035] px-3.5 py-3">
            <p className="text-[11.5px] font-medium leading-relaxed text-[#0B211B]/70">
              {outcome.detail}
            </p>
          </div>
        )}

        <motion.button
          type="button"
          whileTap={busy ? undefined : { scale: 0.985 }}
          onClick={onOpen}
          disabled={busy}
          className={cn(
            'mt-3.5 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-[13px] font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50',
            busy
              ? 'cursor-wait bg-[#0B211B]/[0.06] text-[#0B211B]/40'
              : 'bg-[#0B211B]/[0.06] text-[#0B211B]/75 hover:bg-[#0B211B]/[0.1]',
          )}
        >
          <Settings2 className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          {outcome ? 'Drill again' : 'Choose where it fails'}
        </motion.button>
      </div>
    </Card>
  )
}
