import { motion } from 'motion/react'
import { Download, Lock, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Hero, Tile, rise } from '@/components/phone/kit'

const promises: { icon: LucideIcon; text: string }[] = [
  { icon: Lock, text: 'No edits, no deletes — for anyone' },
  { icon: ShieldCheck, text: 'Sealed and timestamped on write' },
  { icon: Download, text: 'Full export, anytime' },
]

export function AppendOnlyCard() {
  return (
    <motion.div variants={rise}>
      <Hero>
        <div className="flex items-start gap-3.5">
          <Tile icon={ShieldCheck} tone="white" size="lg" />
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="text-[15px] font-extrabold leading-snug tracking-tight text-white">Append-only by design</div>
            <p className="mt-1 text-pretty text-xs font-medium leading-relaxed text-emerald-100/55">
              Writes are forever — edits are impossible.
            </p>
          </div>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl bg-white/[0.06]">
          {promises.map((r, i) => (
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
