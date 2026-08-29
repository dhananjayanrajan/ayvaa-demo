import { motion } from 'motion/react'
import { Loader2, ScanLine } from 'lucide-react'
import { formatCountdown } from '@/data/patientVerification'

export function ResendRow({
  seconds,
  sending,
  onResend,
}: {
  seconds: number
  sending: boolean
  onResend: () => void
}) {
  if (sending) {
    return (
      <div className="flex items-center justify-center gap-2 text-[11.5px] font-semibold text-[#0B211B]/45">
        <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" aria-hidden />
        Sending a fresh code
      </div>
    )
  }
  if (seconds > 0) {
    return (
      <div className="flex items-center justify-center gap-1.5 text-[11.5px] font-semibold text-[#0B211B]/45">
        <ScanLine className="h-3.5 w-3.5 shrink-0" aria-hidden />
        Resend code in <span className="tabular-nums">{formatCountdown(seconds)}</span>
      </div>
    )
  }
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      onClick={onResend}
      className="mx-auto block rounded-full bg-emerald-500/[0.12] px-4 py-2 text-[12px] font-extrabold text-emerald-700"
    >
      Resend code now
    </motion.button>
  )
}
