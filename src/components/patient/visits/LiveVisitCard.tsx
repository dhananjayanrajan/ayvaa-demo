import { motion } from 'motion/react'
import { ChevronRight, Radio } from 'lucide-react'
import { AccentHero } from '@/components/admin/ui/AccentHero'
import { StatusPill } from '@/components/patient/matching/StatusPill'
import { useRouter } from '@/lib/router'
import { LIVE_VISIT } from '@/data/patientVisits'

export function LiveVisitCard() {
  const { navigate } = useRouter()
  if (!LIVE_VISIT) return null

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.985 }}
      onClick={() => navigate('/patient/p16')}
      className="block w-full text-left"
      aria-label="Live visit in progress, open tracking"
    >
      <AccentHero tone="emerald">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.22em] text-emerald-200/50">
            <Radio className="h-3 w-3" aria-hidden />
            Happening today
          </span>
          <StatusPill tone="emerald" label="In progress" live />
        </div>

        <div className="mt-4 flex items-center gap-3.5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-400/[0.16] text-[14px] font-black text-emerald-100">
            {LIVE_VISIT.caregiver?.[0] ?? 'N'}
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-[15px] font-extrabold tracking-tight text-white">
              {LIVE_VISIT.caregiver} arrived at {LIVE_VISIT.arrivedAt}
            </div>
            <div className="mt-0.5 text-[11.5px] font-semibold leading-snug text-emerald-100/60">
              {LIVE_VISIT.locationNote}, {LIVE_VISIT.minutes} minutes in
            </div>
          </div>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-emerald-400/[0.14]">
            <ChevronRight className="h-4 w-4 text-emerald-200" strokeWidth={2.4} aria-hidden />
          </span>
        </div>
      </AccentHero>
    </motion.button>
  )
}
