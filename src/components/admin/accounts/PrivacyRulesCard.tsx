import { motion } from 'motion/react'
import { Eye, Lock, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Chip, Hero, Tile, rise } from '@/components/phone/kit'

const privacyRules: { icon: LucideIcon; text: string }[] = [
  { icon: Eye, text: 'Every view is logged with your name' },
  { icon: ShieldCheck, text: 'Flagged accounts are supervisor-only' },
  { icon: Lock, text: 'Access writes to the immutable audit record' },
]

export function PrivacyRulesCard() {
  return (
    <motion.div variants={rise}>
      <Hero>
        <div className="flex items-start gap-3.5">
          <Tile icon={Eye} tone="white" size="lg" />
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="text-[15px] font-extrabold leading-snug tracking-tight text-white">Private by default</div>
            <p className="mt-1 text-pretty text-xs font-medium leading-relaxed text-emerald-100/55">
              Account access is never silent. Each rule below is enforced by the platform itself.
            </p>
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl bg-white/[0.06]">
          {privacyRules.map((r, i) => (
            <motion.div
              key={r.text}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
              className="transition-colors duration-200"
            >
              {i > 0 && <div aria-hidden className="mx-3.5 h-px bg-white/[0.07]" />}
              <div className="flex items-center gap-3 px-3.5 py-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] bg-emerald-400/15 text-emerald-200 transition-transform duration-200 group-hover:scale-110">
                  <r.icon className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
                </span>
                <span className="min-w-0 flex-1 text-[12.5px] font-semibold leading-snug text-emerald-50/80">{r.text}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          <Chip intent="neutral" light icon={Lock}>Audit-grade</Chip>
          <Chip intent="success" light>Zero silent access</Chip>
        </div>
      </Hero>
    </motion.div>
  )
}
