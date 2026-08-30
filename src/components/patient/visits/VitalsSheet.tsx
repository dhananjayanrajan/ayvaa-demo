import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { BadgeCheck, Check, Loader2 } from 'lucide-react'
import { SheetShell } from '@/components/patient/matching/SheetShell'
import { FactRows } from '@/components/patient/plan/FactRows'
import type { VitalReading } from '@/data/patientVisitSummary'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

type Phase = 'idle' | 'working' | 'done'

export function VitalsSheet({ reading, onClose }: { reading: VitalReading; onClose: () => void }) {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<Phase>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const share = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(setTimeout(() => setPhase('done'), 700))
    timers.current.push(
      setTimeout(() => notify({ title: 'Shared with doctor', body: `${reading.label} reading sent to Dr. Mehta`, kind: 'ok' }), 1200),
    )
  }

  return (
    <SheetShell
      icon={reading.icon}
      title={reading.label}
      subtitle={`Recorded ${reading.recordedAt}, compared with last visit`}
      tone={phase === 'done' ? 'success' : 'info'}
      onClose={onClose}
      footer={
        <motion.button
          type="button"
          whileTap={phase === 'idle' ? { scale: 0.985 } : undefined}
          onClick={share}
          disabled={phase !== 'idle'}
          aria-disabled={phase !== 'idle'}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white transition-colors',
            phase === 'done'
              ? 'bg-emerald-600'
              : phase === 'working'
                ? 'cursor-wait bg-emerald-600/60'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
          )}
        >
          {phase === 'idle' && 'Share with doctor'}
          {phase === 'working' && (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Sharing…
            </>
          )}
          {phase === 'done' && (
            <>
              <Check className="h-4 w-4" strokeWidth={2.6} aria-hidden />
              Shared
            </>
          )}
        </motion.button>
      }
    >
      <div className="flex flex-col gap-3 pb-2">
        <div className="relative overflow-hidden rounded-2xl bg-[#0B231C] p-4">
          <div aria-hidden className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="relative">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">Reading</div>
            <div className="mt-1 text-[20px] font-extrabold leading-none tabular-nums tracking-tight text-white">
              {reading.value}
            </div>
            <div className="mt-1.5 text-[11px] font-bold text-emerald-300">{reading.trendLabel}</div>
            <div className="mt-3.5">
              <FactRows
                rows={[
                  { label: 'Last visit', value: reading.prev },
                  { label: 'Recorded', value: reading.recordedAt },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-[#0B211B]/[0.03] px-4 py-4">
          <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">Against last visit</div>
          <div className="mt-3 flex flex-col gap-3">
            {reading.compare.map((bar, i) => (
              <div key={bar.label}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-[10px] font-bold text-[#0B211B]/55">{bar.label}</span>
                  <span
                    className={cn(
                      'text-[12px] font-extrabold tabular-nums',
                      i === reading.compare.length - 1 ? 'text-emerald-700' : 'text-[#0B211B]/70',
                    )}
                  >
                    {bar.value}
                  </span>
                </div>
                <div aria-hidden className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#0B211B]/[0.06]">
                  <motion.div
                    className={cn('h-full origin-left rounded-full', i === reading.compare.length - 1 ? 'bg-emerald-500' : 'bg-[#0B211B]/25')}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: bar.pct / 100 }}
                    transition={{ duration: 0.45, delay: i * 0.1, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-[#0B211B]/[0.03] px-4 py-3.5">
          <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">What it means</div>
          <div className="mt-1 text-[12px] font-semibold leading-snug text-[#0B211B]/70">{reading.meaning}</div>
        </div>

        <div className="rounded-2xl bg-[#0B211B]/[0.03] px-4 py-3.5">
          <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">How it was taken</div>
          <div className="mt-1 text-[12px] font-semibold leading-snug text-[#0B211B]/70">{reading.detail}</div>
          <div className="mt-2.5 flex items-center gap-2 rounded-xl bg-emerald-500/[0.1] px-3 py-2.5">
            <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-emerald-700" strokeWidth={2.4} aria-hidden />
            <span className="min-w-0 text-[10.5px] font-bold text-emerald-800">
              Sealed {reading.recordedAt} to the immutable visit record
            </span>
          </div>
        </div>
      </div>
    </SheetShell>
  )
}
