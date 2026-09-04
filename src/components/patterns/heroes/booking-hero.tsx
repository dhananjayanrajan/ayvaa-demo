import { motion } from 'motion/react'
import { AccentHero } from '@/components/base/phone/accent-hero'
import { HeroTopRow, HeroHighlight, StatCell, TapCell } from '@/components/base/phone/hero-cells'
import type { Estimate } from '@/data/patientBooking'

interface BookingHeroProps {
  estimate: Estimate
  summaryLine: string
  lovedFirstName: string
  category: string
  days: string[]
  windowLabel: string
  durationLabel: string
  cadence: 'visit' | 'week'
  onOpenWho: () => void
  onOpenTime: () => void
}

export function BookingHero({
  estimate,
  summaryLine,
  lovedFirstName,
  category,
  days,
  windowLabel,
  durationLabel,
  cadence,
  onOpenWho,
  onOpenTime,
}: BookingHeroProps) {
  const daysValue = days.length > 0 ? days.join(', ') : 'Not set'
  const visitsValue = cadence === 'week' ? `${estimate.visitCount} per week` : 'Single visit'
  const priceLabel = cadence === 'week' ? 'Est. weekly total' : 'Est. total'

  return (
    <AccentHero tone="emerald">
      <HeroTopRow
        label="New care request"
        trailing={
          <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] tabular-nums text-emerald-100/40">
            Step 1 of 3
          </span>
        }
      />

      <h2 className="mt-1.5 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
        Care for <HeroHighlight>{lovedFirstName}</HeroHighlight>
      </h2>
      <p className="mt-1.5 text-pretty text-[11.5px] font-semibold leading-snug text-emerald-100/70">{summaryLine}</p>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <StatCell label="Category" value={category} />
        <StatCell label="Days" value={daysValue} />
      </div>

      <div className="mt-2 flex flex-col gap-2">
        <TapCell label="Receiving care" value={lovedFirstName} onClick={onOpenWho} />
        <TapCell label="Time window" value={windowLabel} onClick={onOpenTime} />
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <StatCell label="Visits" value={visitsValue} />
        <StatCell label="Session length" value={durationLabel} />
      </div>

      <div className="mt-2 flex items-center justify-between gap-3 rounded-2xl bg-white/[0.04] px-3.5 py-2.5">
        <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-100/40">{priceLabel}</span>
        <motion.span
          key={estimate.weekly}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="truncate text-[12.5px] font-extrabold tabular-nums leading-none text-white"
        >
          ₹{estimate.weekly.toLocaleString('en-IN')}
        </motion.span>
      </div>
    </AccentHero>
  )
}
