import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Check, Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ShareButton() {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  const share = () => {
    if (copied) return
    setCopied(true)
    timer.current = setTimeout(() => setCopied(false), 1800)
  }

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.9 }}
      onClick={share}
      aria-label={copied ? 'Booking summary copied' : 'Share booking summary'}
      className={cn(
        'grid size-10 shrink-0 place-items-center rounded-full transition-colors',
        copied ? 'bg-emerald-500/[0.14] text-emerald-700' : 'bg-[#0B211B]/[0.05] text-[#0B211B]/60 hover:bg-[#0B211B]/[0.09]',
      )}
    >
      {copied ? <Check className="size-[18px]" strokeWidth={2.6} aria-hidden /> : <Share2 className="size-[18px]" strokeWidth={2.2} aria-hidden />}
    </motion.button>
  )
}
