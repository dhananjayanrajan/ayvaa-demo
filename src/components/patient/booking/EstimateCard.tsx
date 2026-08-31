import { motion } from 'motion/react'
import { PhaseHero, PHASE_THEME } from '@/components/phone/PhaseHero'
import { fmtINR } from '@/data/patientBooking'
import type { Estimate } from '@/data/patientBooking'

export function EstimateCard({
  estimate,
  cadence,
  lineLabel,
}: {
  estimate: Estimate
  cadence: 'visit' | 'week'
  lineLabel: string
}) {
  return (
    <PhaseHero theme={PHASE_THEME.emerald}>
      <div className="relative">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
            <div className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-emerald-100/50">
              Visits per week
            </div>
            <div className="mt-1 text-[15px] font-extrabold tabular-nums leading-none text-white">
              {estimate.visitCount}
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.06] px-3.5 py-2.5">
            <div className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-emerald-100/50">
              Care hours
            </div>
            <div className="mt-1 text-[15px] font-extrabold tabular-nums leading-none text-white">
              {estimate.hours}
            </div>
          </div>
        </div>
        <div className="mt-2 rounded-2xl bg-white/[0.04] px-4 py-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/50">
              Price per visit
            </span>
            <span className="text-[12px] font-extrabold tabular-nums text-emerald-200">
              {fmtINR(estimate.perVisit)}
            </span>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white/[0.04] p-4">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/60">
            What is included
          </div>
          <div className="mt-2.5 flex flex-col gap-2.5">
            <div className="flex items-baseline justify-between gap-3">
              <span className="min-w-0 text-[11.5px] font-semibold text-emerald-100/70">{lineLabel}</span>
              <span className="shrink-0 text-[12.5px] font-bold tabular-nums text-emerald-50/90">
                {fmtINR(estimate.weekly)}
              </span>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <span className="min-w-0 text-[11.5px] font-semibold text-emerald-100/70">Caregiver matching</span>
              <span className="shrink-0 text-[12.5px] font-bold text-emerald-50/90">Included</span>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <span className="min-w-0 text-[11.5px] font-semibold text-emerald-100/70">Platform fee</span>
              <span className="shrink-0 text-[12.5px] font-bold text-emerald-300">₹0</span>
            </div>
            <div className="flex items-baseline justify-between gap-3">
              <span className="min-w-0 text-[11.5px] font-semibold text-emerald-100/70">Cancellation</span>
              <span className="shrink-0 text-[12.5px] font-bold text-emerald-50/90">Free till 24 h</span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-emerald-400/[0.12] px-3.5 py-3">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-emerald-100">
            Total per {cadence}
          </span>
          <motion.span
            key={estimate.weekly}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="text-[15px] font-black tabular-nums tracking-tight text-white"
          >
            {fmtINR(estimate.weekly)}
          </motion.span>
        </div>
      </div>
    </PhaseHero>
  )
}
