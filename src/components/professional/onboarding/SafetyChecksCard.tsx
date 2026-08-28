import { motion } from 'motion/react'
import { Check, ShieldCheck } from 'lucide-react'
import { Card, Chip, Tile } from '@/components/phone/kit'

interface SafetyCheck {
  title: string
  body: string
  when: string
}

interface SafetyChecksCardProps {
  checks: SafetyCheck[]
  onCheckClick: (check: SafetyCheck) => void
}

export function SafetyChecksCard({ checks, onCheckClick }: SafetyChecksCardProps) {
  return (
    <Card>
      {checks.map((c, i) => (
        <div key={c.title}>
          {i > 0 && <div aria-hidden className="mx-4 h-px bg-[#0B211B]/[0.05]" />}
          <motion.button
            type="button"
            whileTap={{ scale: 0.985 }}
            whileHover={{ scale: 1.005 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={() => onCheckClick(c)}
            className="flex w-full items-start gap-3 px-4 py-3.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
          >
            <Tile icon={ShieldCheck} tone="success" />
            <div className="min-w-0 flex-1">
              <div className="text-[13.5px] font-bold leading-snug tracking-tight text-[#0B211B]">{c.title}</div>
              <div className="mt-0.5 text-[11px] font-semibold leading-snug text-[#0B211B]/45">{c.body}</div>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1.5">
              <Chip intent="success" icon={Check} className="border-transparent">
                Done
              </Chip>
              <span className="font-mono text-[9px] font-bold uppercase tracking-wide text-[#0B211B]/35">{c.when}</span>
            </div>
          </motion.button>
        </div>
      ))}
    </Card>
  )
}
