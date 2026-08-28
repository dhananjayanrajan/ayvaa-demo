import { motion } from 'motion/react'
import { ShieldCheck, Phone } from 'lucide-react'

interface RxRow {
  label: string
  value: string
  detail: string
}

interface PartnerClinicalRecommendationProps {
  referredBy: string
  referredPhone: string
  rxRows: RxRow[]
  onRxInfo: (row: RxRow) => void
  onCallDoctor: () => void
}

function RxRowItem({
  label,
  value,
  onClick,
}: {
  label: string
  value: string
  onClick: () => void
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      className="flex w-full items-baseline gap-3 text-left"
    >
      <span className="shrink-0 text-[12.5px] font-bold text-emerald-100/50">{label}</span>
      <span className="min-w-0 flex-1 text-right text-[13px] font-extrabold tracking-tight text-white">{value}</span>
    </motion.button>
  )
}

export function PartnerClinicalRecommendation({
  referredBy,
  referredPhone,
  rxRows,
  onRxInfo,
  onCallDoctor,
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
            <RxRowItem
              key={row.label}
              label={row.label}
              value={row.value}
              onClick={() => onRxInfo(row)}
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
        <button
          type="button"
          onClick={onCallDoctor}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/[0.08] py-2.5 text-xs font-bold text-emerald-100/80"
        >
          <Phone className="h-3.5 w-3.5" />
          Call {referredBy} · {referredPhone}
        </button>
      </div>
    </div>
  )
}
