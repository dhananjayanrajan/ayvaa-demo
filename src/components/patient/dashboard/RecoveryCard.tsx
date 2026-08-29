import { motion } from 'motion/react'
import { Activity, CalendarCheck, Check } from 'lucide-react'
import { Meter } from '@/components/phone/kit'
import { carePlan } from '@/data/seed'

export function RecoveryCard({
  onPlan,
  onReports,
}: {
  onPlan: () => void
  onReports: () => void
}) {
  return (
    <div className="relative overflow-hidden rounded-[26px] border border-emerald-200/10 bg-[#0B231C] shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
      <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />
      <div className="relative p-5">
        <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
          <Activity className="h-3 w-3" aria-hidden />
          Recovery plan, elderly care
        </div>
        <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
          Week {carePlan.week} of {carePlan.weeks},{' '}
          <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
            on track
          </span>
        </h3>
        <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-emerald-100/70">
          {carePlan.visitsDone} visits completed, goals logged at each one
        </p>

        <div className="mt-4 rounded-2xl bg-white/[0.06] p-4">
          <div className="flex items-center justify-between text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/50">
            <span>Plan progress</span>
            <span className="tabular-nums text-emerald-200">{carePlan.progress}%</span>
          </div>
          <Meter value={carePlan.progress / 100} intent="success" delay={0.2} className="mt-2" />
          <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-300/70">
            <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
            On schedule, zero reschedules
          </div>
        </div>

        <div className="mt-4 flex gap-2.5">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={onPlan}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 text-[13px] font-bold text-white shadow-[0_12px_28px_-12px_rgba(16,185,129,0.8)]"
          >
            <Activity className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Open plan</span>
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={onReports}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-white/[0.1] py-3.5 text-[13px] font-bold text-white transition-colors hover:bg-white/[0.16]"
          >
            <CalendarCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Weekly reports</span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}
