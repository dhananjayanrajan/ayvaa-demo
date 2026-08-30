import { motion } from 'motion/react'
import { KeyRound, Lock, Trash2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { rise } from '@/components/phone/kit'

const cryptoRules: { icon: LucideIcon; text: string }[] = [
  { icon: Trash2, text: 'Files shredded beyond recovery' },
  { icon: KeyRound, text: 'Keys rotated after every purge' },
  { icon: Lock, text: 'Unrecoverable — by design' },
]

export function CryptoDeletionCard() {
  return (
    <motion.div variants={rise}>
      <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 p-5 shadow-[0_28px_64px_-30px_rgba(5,40,30,0.85)]">
        <div aria-hidden className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-emerald-500/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-teal-400/10 blur-3xl" />

        <div className="relative">
          <div className="flex items-start gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-[0_10px_20px_-12px_rgba(5,40,30,0.8)]">
              <KeyRound className="h-5 w-5" strokeWidth={2.2} aria-hidden />
            </span>
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="text-sm font-extrabold leading-snug tracking-tight text-white">Cryptographic deletion</div>
              <p className="mt-1 text-pretty text-xs font-medium leading-relaxed text-emerald-100/55">
                Nothing is recoverable — not by us, not by anyone.
              </p>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl bg-white/[0.06]">
            {cryptoRules.map((rule, i) => (
              <div key={rule.text}>
                {i > 0 && <div aria-hidden className="mx-3.5 h-px bg-white/[0.07]" />}
                <div className="flex items-center gap-3 px-3.5 py-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] bg-emerald-400/15 text-emerald-200">
                    <rule.icon className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1 break-words text-[12.5px] font-semibold leading-snug text-emerald-50/80">{rule.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
