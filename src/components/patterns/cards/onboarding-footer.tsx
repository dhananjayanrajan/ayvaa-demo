import { useState } from 'react'
import { motion } from 'motion/react'
import { Loader2, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface OnboardingFooterProps {
  allAgreed: boolean
  remaining: number
  total: number
  onAccept: () => void
}

export function OnboardingFooter({ allAgreed, remaining, total, onAccept }: OnboardingFooterProps) {
  const [loading, setLoading] = useState(false)
  const isZero = remaining === total

  const handleClick = () => {
    if (loading) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onAccept()
    }, 800)
  }

  return (
    <motion.button
      type="button"
      whileTap={loading || isZero ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      onClick={handleClick}
      disabled={loading || isZero}
      className={cn(
        'flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-2xl py-3.5 text-sm font-bold text-white transition-shadow',
        allAgreed
          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-[0_18px_36px_-18px_rgba(5,150,105,0.75)]'
          : isZero
            ? 'bg-rose-600/80 cursor-not-allowed'
            : 'bg-[#0B211B]/[0.4]',
        loading && 'opacity-80',
      )}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          {allAgreed ? 'Accepting terms…' : 'Saving progress…'}
        </>
      ) : isZero ? (
        <>
          <Lock className="h-4 w-4 shrink-0 opacity-70" strokeWidth={2.4} aria-hidden />
          Accept at least one term to continue
        </>
      ) : (
        <>
          <Lock className={cn('h-4 w-4 shrink-0', !allAgreed && 'opacity-70')} strokeWidth={2.4} aria-hidden />
          {allAgreed ? 'Accept terms and start' : `Accept remaining ${remaining} to start`}
        </>
      )}
    </motion.button>
  )
}
