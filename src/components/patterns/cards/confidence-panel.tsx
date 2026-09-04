import { motion } from 'motion/react'
import { Check, ShieldOff } from 'lucide-react'
import { Meter } from '@/components/base/phone/kit'
import { faceMatchConfidence, faceMatchLabel } from '@/data/patientIdentity'

export function ConfidencePanel() {
  return (
    <motion.div
      key="match"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full rounded-2xl bg-[#0B211B]/[0.04] p-4"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#0B211B]/45">
          Face match confidence
        </span>
        <span className="text-[10px] font-extrabold tabular-nums text-emerald-700">
          {faceMatchLabel}
        </span>
      </div>
      <Meter value={faceMatchConfidence} intent="success" delay={0.1} className="mt-2.5" />
      <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#0B211B]/45">
          <Check className="h-3 w-3 shrink-0 text-emerald-600" strokeWidth={3.5} aria-hidden />
          Threshold passed
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#0B211B]/45">
          <ShieldOff className="h-3 w-3 shrink-0 text-emerald-600" strokeWidth={2.6} aria-hidden />
          Selfie deleted after matching
        </span>
      </div>
    </motion.div>
  )
}
