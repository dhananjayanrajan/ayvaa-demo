import { motion } from 'motion/react'
import {
  Route,
  ScrollText,
  Siren,
  Smartphone,
  Stethoscope,
  TrendingUp,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import {
  Chip,
  Hero,
  Tile,
  rise,
} from '@/components/base/phone/kit'
import { cn } from '@/lib/utils'

const destinations: { icon: LucideIcon; label: string; sub: string }[] = [
  { icon: Smartphone, label: "Family's phone", sub: 'Instant push' },
  { icon: Stethoscope, label: "Caregiver's app", sub: 'Live shift' },
  { icon: TrendingUp, label: "Partner's metrics", sub: 'Realtime' },
  { icon: ScrollText, label: 'Audit log', sub: 'Immutable record' },
  { icon: Siren, label: 'Escalation pager', sub: 'Supervisors, in seconds' },
]

export function EventFanOutCard() {
  return (
    <motion.div variants={rise}>
      <Hero>
        <div className="flex items-center gap-3">
          <Tile icon={Route} tone="white" />
          <div className="min-w-0">
            <div className="text-sm font-bold tracking-tight text-white">Single source of truth</div>
            <div className="mt-0.5 text-[11px] font-medium text-emerald-100/55">One event fans out · zero drift</div>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center">
          <Chip intent="live" light dot>1 event emitted</Chip>
          <span aria-hidden className="my-1 h-4 w-px bg-gradient-to-b from-emerald-300/60 to-transparent" />
          <div className="grid w-full grid-cols-2 gap-2">
            {destinations.map((d, i) => (
              <motion.div
                key={d.label}
                className={cn(
                  'rounded-2xl bg-white/[0.06] p-3',
                  i === destinations.length - 1 && 'col-span-2',
                )}
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] bg-emerald-400/15 text-emerald-200">
                    <d.icon className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-[11px] font-bold text-white">{d.label}</div>
                    <div className="truncate text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/40">{d.sub}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Hero>
    </motion.div>
  )
}
