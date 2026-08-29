import { motion } from 'motion/react'
import { MailCheck } from 'lucide-react'
import { guardian } from '@/data/seed'

export function RecoveryHero() {
  return (
    <div className="relative overflow-hidden rounded-[26px] bg-[#0B231C] p-5 shadow-[0_28px_64px_-30px_rgba(6,40,30,0.7)]">
      <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-400/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-300/15 blur-3xl" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />
      <div className="relative flex flex-col items-center pt-2 text-center">
        <motion.span
          className="relative grid h-20 w-20 place-items-center rounded-2xl bg-emerald-400/15 text-emerald-200"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span aria-hidden className="absolute inset-0 animate-ping rounded-2xl bg-emerald-400/10" />
          <MailCheck className="relative h-9 w-9" strokeWidth={1.8} aria-hidden />
        </motion.span>
        <h2 className="mt-4 text-balance text-[19px] font-extrabold leading-snug tracking-tight text-white">
          One secure link,{' '}
          <span className="bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent">
            straight to you
          </span>
        </h2>
        <p className="mt-1.5 text-pretty text-[12px] font-medium leading-relaxed text-emerald-100/70">
          The link works once and expires in 30 minutes. Nothing else changes.
        </p>
        <div className="mt-4 w-full rounded-2xl bg-white/[0.06] px-3.5 py-3">
          <div className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/45">
            Recovery destination
          </div>
          <div className="mt-1 truncate font-mono text-[13px] font-bold text-emerald-50/90">
            {guardian.email}
          </div>
        </div>
      </div>
    </div>
  )
}
