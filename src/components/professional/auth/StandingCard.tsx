import { motion } from 'motion/react'
import { BadgeCheck } from 'lucide-react'

const standing = [
  { value: '1,204', label: 'Sessions delivered' },
  { value: '4.9', label: 'Family rating' },
  { value: '100%', label: 'On-time rate' },
]

interface StandingCardProps {
  onViewCredentials: () => void
}

export function StandingCard({ onViewCredentials }: StandingCardProps) {
  return (
    <div className="rounded-3xl border border-[#0B211B]/[0.06] bg-white shadow-[0_1px_2px_rgba(11,33,27,0.06),0_20px_44px_-24px_rgba(11,33,27,0.28)]">
      <div className="p-4">
        <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#0B211B]/40">Your standing</div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {standing.map((s) => (
            <div key={s.label} className="flex flex-col gap-1 rounded-xl bg-[#0B211B]/[0.03] px-3 py-3 text-left">
              <span className="text-[15px] font-extrabold tabular-nums leading-none text-[#0B211B]">{s.value}</span>
              <span className="text-[8.5px] font-bold uppercase leading-tight tracking-[0.12em] text-[#0B211B]/45">{s.label}</span>
            </div>
          ))}
        </div>
        <motion.button
          type="button"
          whileTap={{ scale: 0.985 }}
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          onClick={onViewCredentials}
          className="mt-4 flex w-full items-center justify-start gap-1.5 rounded-full bg-gradient-to-r from-emerald-500/[0.12] to-teal-500/[0.12] px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
        >
          <BadgeCheck className="h-3.5 w-3.5 text-emerald-600" strokeWidth={2.6} aria-hidden />
          <span className="text-[10px] font-extrabold uppercase tracking-[0.12em] text-emerald-700">
            Verified professional · view credentials
          </span>
        </motion.button>
      </div>
    </div>
  )
}
