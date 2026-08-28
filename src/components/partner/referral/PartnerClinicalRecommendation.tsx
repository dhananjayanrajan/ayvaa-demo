import { motion } from 'motion/react'
import { ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RxRow {
  label: string
  value: string
}

interface PartnerClinicalRecommendationProps {
  referredBy: string
  rxRows: RxRow[]
  onRxClick: (label: string, value: string) => void
}

function RxRow({
  label,
  value,
  onClick,
}: {
  label: string
  value: string
  onClick: () => void
}) {
  return (
    <motion.button type="button" whileTap={{ scale: 0.985 }} onClick={onClick} className="flex w-full items-baseline text-left">
      <span className="shrink-0 text-[12.5px] font-bold text-emerald-100/50">{label}</span>
      <span aria-hidden className="mx-2.5 min-w-0 flex-1 -translate-y-1 border-b border-dotted border-white/20" />
      <span className="shrink-0 text-[13px] font-extrabold tracking-tight text-white">{value}</span>
    </motion.button>
  )
}

export function PartnerClinicalRecommendation({
  referredBy,
  rxRows,
  onRxClick,
}: PartnerClinicalRecommendationProps) {
  return (
    <div className="relative overflow-hidden rounded-[24px] bg-[#0B231C] p-5 shadow-[0_24px_56px_-26px_rgba(6,40,30,0.75)]">
      <div aria-hidden className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-emerald-400/15 blur-3xl" />
      <span aria-hidden className="pointer-events-none absolute right-4 top-1 select-none font-serif text-[56px] leading-none text-emerald-300/20">
        Rx
      </span>
      <div className="relative">
        <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">Signed by {referredBy}</div>
        <div className="mt-3 flex flex-col gap-3.5">
          {rxRows.map((row) => (
            <RxRow
              key={row.label}
              label={row.label}
              value={row.value}
              onClick={() => onRxClick(row.label, row.value)}
            />
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-white/[0.07] px-3.5 py-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-200">
            <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
          </span>
          <span className="min-w-0 flex-1 text-[10.5px] font-bold leading-snug text-emerald-50/75">
            Guardian signs consent before any matching begins.
          </span>
        </div>
      </div>
    </div>
  )
}
