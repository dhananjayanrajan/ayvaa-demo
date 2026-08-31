import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Check, Clock, Loader2, Pill as PillIcon, ShoppingCart } from 'lucide-react'
import { AccentHero } from '@/components/phone/AccentHero'
import { MiniBadge } from '@/components/phone/kit'
import type { Prescription } from '@/data/patientPrescriptions'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

type Phase = 'idle' | 'working' | 'done'

export function RefillCard({ rx, onRefilled }: { rx: Prescription; onRefilled: () => void }) {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<Phase>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const done = phase === 'done'

  const order = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(
      setTimeout(() => {
        setPhase('done')
        onRefilled()
      }, 700),
    )
    timers.current.push(
      setTimeout(() => notify({ title: 'Refill ordered', body: 'Sunrise pharmacy delivers within 24 hours', kind: 'ok' }), 1200),
    )
  }

  return (
    <AccentHero tone={done ? 'emerald' : 'rose'}>
      <div
        className={cn(
          'flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em]',
          done ? 'text-emerald-200/50' : 'text-rose-200/50',
        )}
      >
        <PillIcon className="h-3 w-3" aria-hidden />
        {done ? 'Refill ordered' : 'Running low'}
      </div>
      <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        {rx.name},{' '}
        <span
          className={cn(
            'bg-clip-text text-transparent',
            done ? 'bg-gradient-to-r from-emerald-300 to-teal-200' : 'bg-gradient-to-r from-rose-300 to-red-200',
          )}
        >
          {done ? 'on the way' : 'refill ready'}
        </span>
      </h3>
      <p className={cn('mt-1.5 text-pretty text-[12px] font-medium leading-relaxed', done ? 'text-emerald-100/60' : 'text-rose-100/60')}>
        {rx.stock} left
      </p>
      <p className={cn('mt-0.5 text-[11px] font-semibold', done ? 'text-emerald-100/45' : 'text-rose-100/45')}>
        Prescribed by {rx.prescriber}
      </p>

      {done ? (
        <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-emerald-400/[0.12] px-3.5 py-3">
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400 text-[#04241A]">
            <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
          </span>
          <span className="min-w-0 flex-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-emerald-100">
            Refill on the way
          </span>
          <MiniBadge icon={Clock} tone="emerald" dark>
            24 h
          </MiniBadge>
        </div>
      ) : (
        <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-rose-400/[0.12] px-3.5 py-3">
          <span aria-hidden className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-300 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-300" />
          </span>
          <span className="min-w-0 flex-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-rose-100">
            Care is not interrupted
          </span>
          <MiniBadge icon={Clock} tone="rose" dark>
            24 h
          </MiniBadge>
        </div>
      )}

      <motion.button
        type="button"
        whileTap={phase === 'idle' ? { scale: 0.97 } : undefined}
        onClick={order}
        disabled={phase !== 'idle'}
        aria-disabled={phase !== 'idle'}
        className={cn(
          'mt-4 flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white transition-colors',
          phase === 'done'
            ? 'bg-emerald-600'
            : phase === 'working'
              ? 'cursor-wait bg-rose-500/60'
              : 'bg-gradient-to-r from-rose-500 to-red-500 shadow-[0_18px_36px_-18px_rgba(244,63,94,0.75)]',
        )}
      >
        {phase === 'idle' && (
          <>
            <ShoppingCart className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Order refill</span>
          </>
        )}
        {phase === 'working' && (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Ordering…
          </>
        )}
        {phase === 'done' && (
          <>
            <Check className="h-4 w-4 shrink-0" strokeWidth={2.6} aria-hidden />
            <span className="truncate">Ordered</span>
          </>
        )}
      </motion.button>
      <p
        className={cn(
          'mt-2.5 text-center text-[10.5px] font-semibold leading-relaxed',
          done ? 'text-emerald-100/40' : 'text-rose-100/40',
        )}
      >
        Refills follow the prescribing doctor&apos;s instruction — never guessed.
      </p>
    </AccentHero>
  )
}