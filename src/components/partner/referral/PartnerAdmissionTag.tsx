import { motion } from 'motion/react'
import { Copy, Info } from 'lucide-react'

interface PartnerAdmissionTagProps {
  patient: {
    name: string
    age: number
    condition: string
    referredBy: string
    careArea: string
    guardian: string
    guardianPhone: string
    refCode: string
  }
  onCopyRef?: (code: string) => void
  onViewDetails?: () => void
}

const barcode = [3, 1, 2, 1, 1, 3, 2, 1, 3, 1, 2, 2, 1, 1, 3, 1, 2, 1, 3, 2, 1, 1]

export function PartnerAdmissionTag({ patient, onCopyRef, onViewDetails }: PartnerAdmissionTagProps) {
  return (
    <div className="relative overflow-hidden rounded-[24px] bg-[#0B231C] shadow-[0_24px_56px_-26px_rgba(6,40,30,0.75)]">
      <div aria-hidden className="pointer-events-none absolute -left-10 -top-12 h-36 w-36 rounded-full bg-teal-400/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-10 -bottom-12 h-36 w-36 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="relative p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-emerald-200/50">Admission tag · draft</div>
            <div className="mt-1.5 truncate text-[18px] font-extrabold tracking-tight text-white">{patient.name}</div>
          </div>
          <div className="flex items-center gap-1">
            {onViewDetails && (
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={onViewDetails}
                className="grid h-8 w-8 place-items-center rounded-full bg-white/[0.08] text-emerald-200/70"
                aria-label="View patient details"
              >
                <Info className="h-4 w-4" aria-hidden />
              </motion.button>
            )}
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/[0.08] text-[16px] font-extrabold text-emerald-200 ring-1 ring-inset ring-white/10">
              {patient.age}
            </span>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
          <div className="min-w-0">
            <div className="text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/35">Condition</div>
            <div className="truncate text-[12px] font-bold text-emerald-50/85">{patient.condition}</div>
          </div>
          <div className="min-w-0">
            <div className="text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/35">Referred by</div>
            <div className="truncate text-[12px] font-bold text-emerald-50/85">{patient.referredBy}</div>
          </div>
          <div className="min-w-0">
            <div className="text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/35">Care area</div>
            <div className="truncate text-[12px] font-bold text-emerald-50/85">{patient.careArea}</div>
          </div>
          <div className="min-w-0">
            <div className="text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/35">Guardian</div>
            <div className="truncate text-[12px] font-bold text-emerald-50/85">{patient.guardian}</div>
          </div>
        </div>
        <div className="mt-4 flex items-end justify-between gap-3 rounded-2xl bg-white/[0.04] p-3">
          <div className="flex h-6 items-end gap-[2.5px]" aria-hidden>
            {barcode.map((w, i) => (
              <span key={i} className="h-6 bg-emerald-200/50" style={{ width: w }} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="shrink-0 font-mono text-[10px] font-bold tracking-[0.14em] text-emerald-100/40">
              {patient.refCode}
            </span>
            {onCopyRef && (
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => onCopyRef(patient.refCode)}
                className="grid h-6 w-6 place-items-center rounded-full bg-white/[0.08] text-emerald-200/60"
                aria-label="Copy referral code"
              >
                <Copy className="h-3 w-3" aria-hidden />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
