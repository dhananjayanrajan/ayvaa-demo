import { motion } from 'motion/react'
import { Eye, Lock } from 'lucide-react'

export function PartnerChartConsentNote() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex items-start gap-2.5 rounded-2xl bg-[#0B211B]/[0.035] px-4 py-3"
    >
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
        <Eye className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
      </span>
      <p className="min-w-0 flex-1 text-pretty text-[11px] font-medium leading-relaxed text-[#0B211B]/55">
        Sunrise sees this chart because the guardian consented to sharing. Entries are verbatim and visible only after each visit
        is verified.
      </p>
      <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0B211B]/30" aria-hidden />
    </motion.div>
  )
}
