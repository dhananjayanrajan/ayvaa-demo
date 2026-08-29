import { motion } from 'motion/react'
import { Check, Loader2, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

export type SignOffStatus = 'idle' | 'signing' | 'signed'

type Props = {
  remaining: number
  status: SignOffStatus
  onPress: () => void
}

export function SignOffButton({ remaining, status, onPress }: Props) {
  const gated = remaining > 0
  const signed = status === 'signed'
  return (
    <motion.button
      type="button"
      whileTap={gated || status === 'signing' ? undefined : { scale: 0.97 }}
      onClick={onPress}
      disabled={gated || status === 'signing'}
      aria-disabled={gated || status === 'signing'}
      className={cn(
        'flex flex-[1.4] items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-[13px] font-bold transition-colors duration-300',
        signed && 'bg-emerald-500 text-white shadow-[0_18px_36px_-18px_rgba(16,185,129,0.85)]',
        !signed && status === 'signing' && 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
        !signed && status === 'idle' && gated && 'bg-[#0B211B]/[0.05] text-[#0B211B]/45 cursor-not-allowed',
        !signed && status === 'idle' && !gated && 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]',
      )}
    >
      {status === 'signing' ? (
        <Loader2 className="h-4 w-4 shrink-0 animate-spin" strokeWidth={2.4} aria-hidden />
      ) : signed ? (
        <Check className="h-4 w-4 shrink-0" strokeWidth={2.8} aria-hidden />
      ) : (
        <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
      )}
      <span className="truncate">
        {status === 'signing'
          ? 'Signing off…'
          : signed
            ? 'Signed off'
            : gated
              ? `${remaining} step${remaining === 1 ? '' : 's'} left`
              : 'Complete and sign off'}
      </span>
    </motion.button>
  )
}
