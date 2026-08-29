import { motion } from 'motion/react'
import { MailCheck } from 'lucide-react'

export function DeliveryStrip({ email }: { email: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      className="flex items-start gap-3 rounded-xl bg-emerald-500/[0.08] px-3.5 py-2.5"
    >
      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
        <MailCheck className="h-3 w-3" strokeWidth={2.8} aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-emerald-700/60">
          Email fallback delivered
        </div>
        <div className="mt-0.5 break-words text-[12px] font-bold tracking-tight text-emerald-700">
          {email}
        </div>
      </div>
    </motion.div>
  )
}
