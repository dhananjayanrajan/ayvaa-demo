import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Check, Loader2, Share2 } from 'lucide-react'
import { summaryShareText } from '@/data/patientVisitSummary'
import { useDemo } from '@/lib/store'
import { cn } from '@/lib/utils'

type Phase = 'idle' | 'working' | 'done'

export function ShareSummaryButton() {
  const { notify } = useDemo()
  const [phase, setPhase] = useState<Phase>('idle')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const share = () => {
    if (phase !== 'idle') return
    setPhase('working')
    timers.current.push(setTimeout(() => setPhase('done'), 700))
    timers.current.push(
      setTimeout(() => {
        void navigator.clipboard?.writeText(summaryShareText())
        notify({ title: 'Summary copied', body: 'Visit record copied to clipboard', kind: 'ok' })
      }, 1200),
    )
    timers.current.push(setTimeout(() => setPhase('idle'), 2600))
  }

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.92 }}
      onClick={share}
      aria-label="Share visit summary"
      className={cn(
        'grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors',
        phase === 'done' ? 'bg-emerald-500/[0.14] text-emerald-700' : 'bg-[#0B211B]/[0.05] text-[#0B211B]/60',
      )}
    >
      {phase === 'idle' && <Share2 className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />}
      {phase === 'working' && <Loader2 className="h-[18px] w-[18px] animate-spin" aria-hidden />}
      {phase === 'done' && <Check className="h-[18px] w-[18px]" strokeWidth={2.6} aria-hidden />}
    </motion.button>
  )
}
