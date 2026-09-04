import { motion } from 'motion/react'
import { Tile } from '@/components/base/phone/kit'
import { QUICK_ACTIONS, STEP_ICONS } from '@/data/sessionExecution'

type Props = {
  onPressAction: (label: string, body: string) => void
}

export function QuickActionsGrid({ onPressAction }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {QUICK_ACTIONS.map((q) => {
        const Icon = STEP_ICONS[q.key]
        return (
          <motion.button
            key={q.label}
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => onPressAction(q.label, q.body)}
            className="flex flex-col items-start gap-2.5 rounded-2xl bg-[#0B211B]/[0.04] p-3.5 transition-colors hover:bg-[#0B211B]/[0.07]"
          >
            <Tile icon={Icon} tone="info" size="sm" />
            <span className="text-[12px] font-extrabold tracking-tight text-[#0B211B]">{q.label}</span>
          </motion.button>
        )
      })}
    </div>
  )
}
