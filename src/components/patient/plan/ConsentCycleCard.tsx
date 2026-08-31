import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CalendarClock, Check, ChevronDown, Loader2, ShieldOff } from 'lucide-react'
import { AccentHero } from '@/components/phone/AccentHero'
import { StatusPill } from '@/components/phone/StatusPill'
import { CONSENT_CYCLE, consentScopeRows, consentSteps } from '@/data/patientCarePlan'
import { useDemo } from '@/lib/store'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

function DarkCycleStepper({ steps }: { steps: { label: string; sub: string; done: boolean }[] }) {
  const n = steps.length
  const doneCount = steps.filter((s) => s.done).length
  const startPct = 100 / n / 2
  const endPct = doneCount > 0 ? (100 / n) * (doneCount - 0.5) : startPct

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute top-[7px] h-0.5 rounded-full bg-white/[0.12]"
        style={{ left: `${startPct}%`, right: `${startPct}%` }}
      />
      <div
        aria-hidden
        className="absolute top-[7px] h-0.5 rounded-full bg-emerald-300"
        style={{ left: `${startPct}%`, width: `${endPct - startPct}%` }}
      />
      <div className="relative grid" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
        {steps.map((step) => (
          <div key={step.label} className="flex flex-col items-center">
            {step.done ? (
              <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-400 text-[#04241A]">
                <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" aria-hidden>
                  <path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            ) : (
              <span className="relative grid h-4 w-4 place-items-center">
                <span aria-hidden className="absolute h-4 w-4 animate-ping rounded-full bg-rose-300/50" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-rose-200" />
              </span>
            )}
            <span className="mt-1.5 text-center text-[9px] font-extrabold uppercase tracking-[0.12em] text-white/70">
              {step.label}
            </span>
            <span className="text-center text-[9px] font-bold text-white/35">{step.sub}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ConsentCycleCard() {
  const { notify } = useDemo()
  const { navigate } = useRouter()
  const [scopeOpen, setScopeOpen] = useState(false)
  const [phase, setPhase] = useState<'idle' | 'working' | 'done'>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const acknowledge = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(setTimeout(() => setPhase('done'), 850))
    timers.current.push(
      setTimeout(() => notify({ title: 'Renewal reviewed', body: 'Your acknowledgement is logged in the consent record', kind: 'ok' }), 950),
    )
  }

  return (
    <AccentHero tone="rose">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-rose-200/50">
          <CalendarClock className="h-3 w-3" aria-hidden />
          Consent renewal
        </span>
        {phase === 'done' ? (
          <StatusPill tone="emerald" label="Reviewed" />
        ) : (
          <StatusPill tone="rose" label={`${CONSENT_CYCLE.totalDays - CONSENT_CYCLE.day} days left`} live />
        )}
      </div>

      <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        Auto-renews on{' '}
        <span className="bg-gradient-to-r from-rose-300 to-orange-200 bg-clip-text text-transparent">
          {CONSENT_CYCLE.renewsOn}
        </span>
      </h3>
      <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-rose-100/60">
        {phase === 'done'
          ? 'You reviewed this renewal. It proceeds as an explicit, logged decision.'
          : 'Reviewing now keeps the renewal an explicit decision instead of an automatic one.'}
      </p>

      <div className="mt-5">
        <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em]">
          <span className="text-rose-100/50">90-day cycle</span>
          <span className="tabular-nums text-rose-200">
            Day {CONSENT_CYCLE.day} of {CONSENT_CYCLE.totalDays}
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-rose-400 to-orange-300 transition-[width] duration-700"
            style={{ width: `${(CONSENT_CYCLE.day / CONSENT_CYCLE.totalDays) * 100}%` }}
          />
        </div>
      </div>

      <div className="mt-5">
        <DarkCycleStepper steps={consentSteps} />
      </div>

      <button
        type="button"
        onClick={() => setScopeOpen((v) => !v)}
        aria-expanded={scopeOpen}
        className="mt-5 flex w-full items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3.5 text-left transition-colors hover:bg-white/[0.1]"
      >
        <span className="min-w-0 flex-1">
          <span className="block text-[12.5px] font-bold tracking-tight text-white">What this consent grants</span>
          <span className="block text-[10.5px] font-semibold text-white/45">Caregiver visits, partner referral, audit trail</span>
        </span>
        <motion.span animate={{ rotate: scopeOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="h-4 w-4 shrink-0 text-white/30" aria-hidden />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {scopeOpen && (
          <motion.div
            key="scope"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-2 rounded-2xl bg-white/[0.06] px-4 py-3.5">
              {consentScopeRows().map((row, i) => (
                <div key={row.label} className={i === 0 ? '' : 'mt-2.5'}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-rose-100/40">{row.label}</span>
                    <span className="truncate text-[12.5px] font-bold text-rose-50/90">{row.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'done' && (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mt-3 flex items-center gap-2.5 rounded-xl bg-emerald-500/[0.12] px-3.5 py-3"
          >
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400 text-[#04241A]">
              <Check className="h-3 w-3" strokeWidth={3.5} aria-hidden />
            </span>
            <span className="min-w-0 text-[10.5px] font-bold text-emerald-100">
              Renewal reviewed — logged to your consent record
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-5">
        <motion.button
          type="button"
          whileTap={phase === 'idle' ? { scale: 0.985 } : undefined}
          onClick={acknowledge}
          disabled={phase !== 'idle'}
          aria-disabled={phase !== 'idle'}
          className={cn(
            'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-4 text-[13px] font-bold text-white transition-colors',
            phase === 'done'
              ? 'bg-emerald-600'
              : phase === 'working'
                ? 'cursor-wait bg-rose-500/50'
                : 'bg-rose-500',
          )}
        >
          {phase === 'idle' && <span>Review and acknowledge renewal</span>}
          {phase === 'working' && (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              <span>Recording…</span>
            </>
          )}
          {phase === 'done' && (
            <>
              <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
              <span>Reviewed</span>
            </>
          )}
        </motion.button>

        <motion.button
          type="button"
          whileTap={{ scale: 0.985 }}
          onClick={() => {
            notify({ title: 'Withdrawing', body: 'Withdrawal pauses care at the next visit boundary', kind: 'info' })
            navigate('/patient/p22')
          }}
          className="mt-2.5 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-white/[0.06] py-3 text-[12.5px] font-bold text-rose-100/90 transition-colors hover:bg-white/[0.1]"
        >
          <ShieldOff className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          Withdraw consent
        </motion.button>
      </div>
    </AccentHero>
  )
}
