import { motion } from 'motion/react'
import { Check, Pill, ScrollText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { doseRounds } from '@/data/patientDashboard'

export function MedicationCard({
  caregiverFirstName,
  onSchedule,
  onPrescriptions,
}: {
  caregiverFirstName: string
  onSchedule: () => void
  onPrescriptions: () => void
}) {
  const given = doseRounds.filter((r) => r.given).length
  return (
    <div className="relative overflow-hidden rounded-[26px] border border-amber-200/10 bg-[#241A0B] shadow-[0_28px_64px_-30px_rgba(60,40,10,0.7)]">
      <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-amber-400/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-orange-400/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
      <div className="relative p-5">
        <div className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-amber-200/50">
          <Pill className="h-3 w-3" aria-hidden />
          Medication, evening round
        </div>
        <h3 className="mt-2 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
          Next dose 6:00 PM,{' '}
          <span className="bg-gradient-to-r from-amber-300 to-orange-200 bg-clip-text text-transparent">
            due in 2 hours
          </span>
        </h3>
        <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-amber-100/70">
          Two medicines, given by {caregiverFirstName} during the live visit
        </p>

        <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-amber-400/[0.12] px-3.5 py-3">
          <span aria-hidden className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-300" />
          </span>
          <span className="min-w-0 flex-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-amber-100">
            Dose window 6 to 7 PM
          </span>
          <span className="shrink-0 text-[10px] font-extrabold tabular-nums text-amber-200/80">
            {given} of {doseRounds.length} given
          </span>
        </div>

        <div className="mt-3 rounded-2xl bg-white/[0.06] p-4">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-amber-200/60">
            Today's rounds
          </div>
          <div className="mt-2.5 flex flex-col gap-2.5">
            {doseRounds.map((round) => (
              <div key={round.key} className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[12px] font-bold text-amber-50/90">{round.slot}</div>
                  <div className="mt-0.5 text-[10px] font-semibold tabular-nums text-amber-100/60">
                    {round.time}
                  </div>
                </div>
                {round.given ? (
                  <span className="flex shrink-0 items-center gap-1.5 text-[11px] font-extrabold text-emerald-300">
                    <Check className="h-3 w-3" strokeWidth={3.2} aria-hidden />
                    Given
                  </span>
                ) : (
                  <span className="shrink-0 rounded-full bg-amber-400/[0.16] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-amber-200">
                    Pending
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex gap-2.5">
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={onSchedule}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-[13px] font-bold text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]"
          >
            <Pill className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Dose schedule</span>
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={onPrescriptions}
            className="flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-2xl bg-white/[0.1] py-3.5 text-[13px] font-bold text-white transition-colors hover:bg-white/[0.16]"
          >
            <ScrollText className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
            <span className="truncate">Prescriptions</span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}
