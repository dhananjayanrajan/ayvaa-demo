import { motion } from 'motion/react'
import { Bell, Link2, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { rise } from '@/components/phone/kit'
import { WarnHero } from '@/components/admin/escalations/WarnHero'

const guarantees: { icon: LucideIcon; text: string }[] = [
  { icon: Link2, text: 'Sessions, receipts and messages stay linked' },
  { icon: ShieldCheck, text: 'Decisions logged with your name' },
  { icon: Bell, text: 'The family sees the outcome' },
]

export function AccountabilityCard() {
  return (
    <motion.div variants={rise}>
      <WarnHero>
        <div className="flex items-start gap-3.5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-amber-700 shadow-[0_10px_20px_-12px_rgba(60,42,8,0.8)]">
            <ShieldCheck className="h-5 w-5" strokeWidth={2.2} aria-hidden />
          </span>
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="text-[15px] font-extrabold leading-snug tracking-tight text-white">Every call is on the record</div>
            <p className="mt-1 text-pretty text-xs font-medium leading-relaxed text-amber-100/55">
              Linking is automatic — so is accountability.
            </p>
          </div>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl bg-white/[0.06]">
          {guarantees.map((r, i) => (
            <div key={r.text}>
              {i > 0 && <div aria-hidden className="mx-3.5 h-px bg-white/[0.07]" />}
              <div className="flex items-center gap-3 px-3.5 py-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] bg-amber-400/15 text-amber-200">
                  <r.icon className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                </span>
                <span className="min-w-0 flex-1 text-[12.5px] font-semibold leading-snug text-amber-50/80">{r.text}</span>
              </div>
            </div>
          ))}
        </div>
      </WarnHero>
    </motion.div>
  )
}
