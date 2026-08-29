import { motion } from 'motion/react'
import { Check, Loader2, Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'

export type WithdrawStatus = 'idle' | 'processing' | 'confirmed'

type Props = {
  amount: string
  status: WithdrawStatus
  onPress: () => void
}

export function WithdrawButton({ amount, status, onPress }: Props) {
  const confirmed = status === 'confirmed'
  return (
    <motion.button
      type="button"
      whileTap={status === 'idle' ? { scale: 0.97 } : undefined}
      onClick={onPress}
      disabled={status !== 'idle'}
      aria-disabled={status !== 'idle'}
      className={cn(
        'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white transition-colors duration-300',
        confirmed
          ? 'bg-emerald-500 shadow-[0_18px_36px_-18px_rgba(16,185,129,0.85)]'
          : 'bg-gradient-to-r from-blue-600 to-sky-500 shadow-[0_18px_36px_-18px_rgba(37,99,235,0.6)]',
      )}
    >
      {status === 'processing' ? (
        <Loader2 className="h-4 w-4 shrink-0 animate-spin" strokeWidth={2.4} aria-hidden />
      ) : confirmed ? (
        <Check className="h-4 w-4 shrink-0" strokeWidth={2.8} aria-hidden />
      ) : (
        <Wallet className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      )}
      {status === 'processing' ? 'Processing…' : confirmed ? 'Withdrawal confirmed' : `Withdraw ${amount} to bank`}
    </motion.button>
  )
}
