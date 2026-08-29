import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { Tile } from '@/components/phone/kit'

type Props = {
  patient: string
  day: string
  time: string
  amount: string
  onPress: () => void
}

export function EarningRow({ patient, day, time, amount, onPress }: Props) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.985 }}
      onClick={onPress}
      className="flex w-full items-start gap-3 rounded-2xl px-2 py-3 text-left transition-colors hover:bg-[#0B211B]/[0.02]"
    >
      <Tile icon={Check} tone="success" size="sm" />
      <span className="min-w-0 flex-1 pt-0.5">
        <span className="block truncate text-[13px] font-extrabold tracking-tight text-[#0B211B]">{patient}</span>
        <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">{day}</span>
      </span>
      <span className="flex w-[74px] shrink-0 flex-col items-end pt-0.5">
        <span className="font-mono text-[13px] font-black tabular-nums tracking-tight text-[#0B211B]">{amount}</span>
        <span className="mt-1 font-mono text-[10px] font-bold tabular-nums text-[#0B211B]/45">{time}</span>
      </span>
    </motion.button>
  )
}
