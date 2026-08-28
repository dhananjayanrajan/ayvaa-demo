import { motion } from 'motion/react'
import {
  Gavel,
  Lock,
  ScrollText,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Hero, Tile, rise } from '@/components/phone/kit'

const governance: { icon: LucideIcon; text: string }[] = [
  { icon: Gavel, text: 'Who decided, when, on what evidence' },
  { icon: ScrollText, text: 'Rejections require a written reason' },
  { icon: Lock, text: 'Instantly written to the audit log' },
]

export function GovernanceCard() {
  return (
    <motion.div variants={rise}>
      <Hero>
        <div className="flex items-start gap-3.5">
          <Tile icon={Gavel} tone="white" size="lg" />
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="text-[15px] font-extrabold leading-snug tracking-tight text-white">Decisions on the record</div>
            <p className="mt-1 text-pretty text-xs font-medium leading-relaxed text-emerald-100/55">
              Approvals and rejections both carry full accountability.
            </p>
          </div>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl bg-white/[0.06]">
          {governance.map((r, i) => (
            <div key={r.text}>
              {i > 0 && <div aria-hidden className="mx-3.5 h-px bg-white/[0.07]" />}
              <div className="flex items-center gap-3 px-3.5 py-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] bg-emerald-400/15 text-emerald-200">
                  <r.icon className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                </span>
                <span className="min-w-0 flex-1 text-[12.5px] font-semibold leading-snug text-emerald-50/80">{r.text}</span>
              </div>
            </div>
          ))}
        </div>
      </Hero>
    </motion.div>
  )
}
