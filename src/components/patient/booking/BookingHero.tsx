import { motion } from 'motion/react'
import { CalendarDays } from 'lucide-react'
import { Hero } from '@/components/phone/kit'
import type { Estimate } from '@/data/patientBooking'
import { WizardStepper } from './WizardStepper'
import { ContextPills } from './ContextPills'

export function BookingHero({
  estimate,
  summaryLine,
  lovedFirstName,
  category,
  days,
  windowLabel,
  onOpenWho,
  onOpenTime,
}: {
  estimate: Estimate
  summaryLine: string
  lovedFirstName: string
  category: string
  days: string[]
  windowLabel: string
  onOpenWho: () => void
  onOpenTime: () => void
}) {
  return (
    <Hero>
      <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/60">
        <CalendarDays className="h-3 w-3 text-emerald-300/80" aria-hidden />
        New request, live estimate
      </div>

      <div className="mt-3 flex items-baseline gap-1.5">
        <span className="text-[18px] font-extrabold text-emerald-200/80">₹</span>
        <motion.span
          key={estimate.weekly}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="text-[36px] font-extrabold leading-none tracking-tight text-white"
        >
          {estimate.weekly.toLocaleString('en-IN')}
        </motion.span>
        <span className="text-[12px] font-bold text-emerald-100/50">per week</span>
      </div>

      <p className="mt-1.5 text-pretty text-[11.5px] font-semibold leading-snug text-emerald-100/70">
        {summaryLine}
      </p>

      <div className="mt-4">
        <ContextPills
          lovedFirstName={lovedFirstName}
          category={category}
          days={days}
          windowLabel={windowLabel}
          onOpenWho={onOpenWho}
          onOpenTime={onOpenTime}
        />
      </div>

      <div className="mt-5">
        <WizardStepper activeIndex={0} />
      </div>
    </Hero>
  )
}
