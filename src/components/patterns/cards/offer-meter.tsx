import { motion } from 'motion/react'

interface OfferMeterProps {
  value: number
  fillClass: string
  className?: string
}

export function OfferMeter({ value, fillClass, className = '' }: OfferMeterProps) {
  const clamped = Math.min(1, Math.max(0, value))
  return (
    <div aria-hidden className={`h-1.5 overflow-hidden rounded-full bg-white/[0.08] ${className}`}>
      <motion.div
        className={`h-full origin-left rounded-full transition-colors duration-500 ${fillClass}`}
        initial={false}
        animate={{ scaleX: clamped }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      />
    </div>
  )
}
