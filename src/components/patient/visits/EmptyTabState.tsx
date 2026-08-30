import { motion } from 'motion/react'
import { CheckCircle2, SlidersHorizontal } from 'lucide-react'
import { Card } from '@/components/phone/kit'

interface EmptyTabStateProps {
  cause: 'filters' | 'all-good'
  label: string
  onClearFilters: () => void
}

export function EmptyTabState({ cause, label, onClearFilters }: EmptyTabStateProps) {
  if (cause === 'all-good') {
    return (
      <Card>
        <div className="p-5 text-center">
          <span className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-emerald-500/[0.12]">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" strokeWidth={2.2} aria-hidden />
          </span>
          <div className="mt-3 text-[14px] font-extrabold tracking-tight text-[#0B211B]">Nothing here, and that is good</div>
          <p className="mx-auto mt-1.5 max-w-[28ch] text-pretty text-[12px] font-medium leading-snug text-[#0B211B]/55">
            No visits were ever missed on this plan. Every scheduled session has been delivered.
          </p>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <div className="p-5 text-center">
        <span className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-[#0B211B]/[0.05]">
          <SlidersHorizontal className="h-5 w-5 text-[#0B211B]/40" strokeWidth={2.2} aria-hidden />
        </span>
        <div className="mt-3 text-[14px] font-extrabold tracking-tight text-[#0B211B]">Your filters hide every {label}</div>
        <p className="mx-auto mt-1.5 max-w-[28ch] text-pretty text-[12px] font-medium leading-snug text-[#0B211B]/55">
          Visits are excluded by the active filters. Clear them to see the full ledger.
        </p>
        <motion.button
          type="button"
          whileTap={{ scale: 0.985 }}
          onClick={onClearFilters}
          className="mt-4 w-full rounded-2xl bg-[#0B211B]/[0.05] py-3 text-[12.5px] font-extrabold text-[#0B211B]/75"
        >
          Clear filters
        </motion.button>
      </div>
    </Card>
  )
}
