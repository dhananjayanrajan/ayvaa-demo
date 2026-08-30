import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Loader2, Lock } from 'lucide-react'
import { AccentHero } from '@/components/admin/ui/AccentHero'
import { StatusPill } from '@/components/phone/StatusPill'
import { HeroTopRow, HeroHighlight, StatCell } from '@/components/phone/HeroCells'
import { initialsOf } from '@/data/patientMatching'
import { VISIT_SUMMARY } from '@/data/patientVisitSummary'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

type Phase = 'idle' | 'working' | 'done'

export function SummaryHero() {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<Phase>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const acknowledge = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(setTimeout(() => setPhase('done'), 850))
    timers.current.push(
      setTimeout(() => notify({ title: 'Summary reviewed', body: 'Your review is logged to the audit trail', kind: 'ok' }), 950),
    )
  }

  return (
    <AccentHero tone="emerald">
      <HeroTopRow
        icon={Lock}
        label="Sealed summary"
        trailing={
          phase === 'done' ? (
            <StatusPill tone="emerald" label="Reviewed" />
          ) : (
            <StatusPill tone="emerald" label="Verified" />
          )
        }
      />

      <h2 className="mt-1.5 text-[19px] font-extrabold leading-snug tracking-tight text-white">
        Visit sealed, <HeroHighlight>end to end</HeroHighlight>
      </h2>
      <p className="mt-1.5 text-pretty text-[11.5px] font-semibold leading-snug text-emerald-100/70">
        {phase === 'done'
          ? 'Your confirmation is recorded against this sealed record.'
          : 'Every reading and step below belongs to this one sealed record.'}
      </p>

      <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white/[0.06] px-3.5 py-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-400/[0.16] text-[13px] font-extrabold text-emerald-100">
          {initialsOf(VISIT_SUMMARY.caregiver)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-extrabold tracking-tight text-white">
            {VISIT_SUMMARY.caregiver}
          </span>
          <span className="mt-0.5 block text-[10.5px] font-semibold text-emerald-100/55">
            Signed the record at {VISIT_SUMMARY.signedAt}
          </span>
        </span>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <StatCell label="Steps completed" value={VISIT_SUMMARY.stepsDone} />
        <StatCell label="Goals met" value={VISIT_SUMMARY.goalsMet} />
      </div>

      <div className="mt-2 flex items-baseline justify-between gap-3 rounded-2xl bg-white/[0.04] px-3.5 py-2.5">
        <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/40">Duration</span>
        <span className="text-[12.5px] font-extrabold tabular-nums leading-none text-white">{VISIT_SUMMARY.duration}</span>
      </div>

      <AnimatePresence initial={false}>
        {phase === 'done' && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-3 flex items-center gap-2.5 rounded-xl bg-emerald-500/[0.12] px-3.5 py-3"
          >
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400 text-[#04241A]">
              <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
            </span>
            <span className="text-[11.5px] font-bold text-emerald-100">Review logged to your audit trail</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        whileTap={phase === 'idle' ? { scale: 0.985 } : undefined}
        onClick={acknowledge}
        disabled={phase !== 'idle'}
        aria-disabled={phase !== 'idle'}
        className={cn(
          'mt-3 flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-[12.5px] font-extrabold transition-colors',
          phase === 'done'
            ? 'bg-emerald-600 text-white'
            : phase === 'working'
              ? 'cursor-wait bg-white/[0.06] text-emerald-50/60'
              : 'bg-white/[0.08] text-emerald-50 hover:bg-white/[0.12]',
        )}
      >
        {phase === 'idle' && 'Mark as reviewed'}
        {phase === 'working' && (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Recording…
          </>
        )}
        {phase === 'done' && (
          <>
            <Check className="h-4 w-4" strokeWidth={2.6} aria-hidden />
            Reviewed
          </>
        )}
      </motion.button>
    </AccentHero>
  )
}
