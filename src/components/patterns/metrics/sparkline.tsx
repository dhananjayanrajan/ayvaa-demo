import { motion } from 'motion/react'

interface SparklineProps {
  data: number[]
}

export function Sparkline({ data }: SparklineProps) {
  const safeData = data.length > 0 ? data : [0]
  const max = Math.max(...safeData) || 1
  const denominator = Math.max(safeData.length - 1, 1)

  const pts = safeData.map((v, i) => [
    (i / denominator) * 100,
    36 - (v / max) * 28,
  ] as const)

  const line = pts.map((p) => p.join(',')).join(' ')
  const area = `0,40 ${line} 100,40`
  const last = pts[pts.length - 1]

  return (
    <div className="relative mt-4 h-24 w-full overflow-hidden">
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id="rev-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="rev-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#5eead4" />
          </linearGradient>
        </defs>
        <motion.polygon
          points={area}
          fill="url(#rev-fill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        />
        <motion.polyline
          points={line}
          fill="none"
          stroke="url(#rev-line)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
      </svg>
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 300, damping: 18 }}
        className="pointer-events-none absolute -right-1.5 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-teal-300 shadow-[0_0_0_3px_rgba(45,212,191,0.25)]"
        style={{ top: `${(last[1] / 40) * 100}%` }}
      >
        <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-teal-300/60" />
      </motion.span>
    </div>
  )
}
