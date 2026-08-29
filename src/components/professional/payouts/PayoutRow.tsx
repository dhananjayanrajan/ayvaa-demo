import { motion } from 'motion/react'
import { ReceiptText } from 'lucide-react'
import { Chip, Tile } from '@/components/phone/kit'

type Props = {
  date: string
  sessions: number
  amount: string
  paid: boolean
  onPress: () => void
}

export function PayoutRow({ date, sessions, amount, paid, onPress }: Props) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.985 }}
      onClick={onPress}
      className="flex w-full items-start gap-3 rounded-2xl px-2 py-3 text-left transition-colors hover:bg-[#0B211B]/[0.02]"
    >
      <Tile icon={ReceiptText} tone="neutral" size="sm" />
      <span className="min-w-0 flex-1 pt-0.5">
        <span className="block truncate text-[13px] font-extrabold tracking-tight text-[#0B211B]">{date}</span>
        <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.14em] text-[#0B211B]/40">{sessions} sessions</span>
      </span>
      <span className="flex w-[92px] shrink-0 flex-col items-end gap-1.5">
        <span className="font-mono text-[13px] font-black tabular-nums tracking-tight text-[#0B211B]">{amount}</span>
        <Chip intent={paid ? 'success' : 'warning'} dot={!paid} className="whitespace-nowrap">
          {paid ? 'Paid' : 'In transit'}
        </Chip>
      </span>
    </motion.button>
  )
}
