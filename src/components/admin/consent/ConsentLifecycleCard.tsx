import { motion } from 'motion/react'
import { Ban, CalendarClock, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Hero, Tile, rise } from '@/components/phone/kit'

const lifecycle: { icon: LucideIcon; text: string }[] = [
  { icon: CalendarClock, text: 'Re-confirmed every 90 days' },
  { icon: Ban, text: 'Withdrawals stop care immediately' },
  { icon: ShieldCheck, text: 'Sealed record, immutable' },
]

export function ConsentLifecycleCard() {
  return (
    <motion.div variants={rise}>
      <Hero>
        <div className="flex items-start gap-3.5">
          <Tile icon={ShieldCheck} tone="white" size="lg" />
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="text-[15px] font-extrabold leading-snug tracking-tight text-white">Consent is a living record</div>
            <p className="mt-1 text-pretty text-xs font-medium leading-relaxed text-emerald-100/55">
              The ledger enforces itself — no chasing, no expiry surprises.
            </p>
          </div>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl bg-white/[0.06]">
          {lifecycle.map((r) => (
            <div key={r.text} className="flex items-center gap-3 border-t border-white/[0.07] px-3.5 py-3 first:border-t-0">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] bg-emerald-400/15 text-emerald-200">
                <r.icon className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
              </span>
              <span className="min-w-0 flex-1 text-[12.5px] font-semibold leading-snug text-emerald-50/80">{r.text}</span>
            </div>
          ))}
        </div>
      </Hero>
    </motion.div>
  )
}
